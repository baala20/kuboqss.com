import logging
from dataclasses import dataclass

import geoip2.webservice

from app.core.config import Settings

logger = logging.getLogger(__name__)

ALLOWED_COUNTRY = "LY"


@dataclass
class GeoCheckResult:
    allowed: bool
    country_code: str | None = None
    is_vpn: bool = False
    is_suspicious: bool = False
    risk_score: float = 0.0
    reason: str = ""


async def check_ip_geolocation(ip: str, settings: Settings) -> GeoCheckResult:
    """Query MaxMind GeoIP2 Insights to validate the customer IP."""
    if not settings.maxmind_account_id or not settings.maxmind_license_key:
        logger.warning("MaxMind credentials not configured – skipping geo check")
        return GeoCheckResult(allowed=True, reason="geo_check_disabled")

    try:
        with geoip2.webservice.Client(
            account_id=int(settings.maxmind_account_id),
            license_key=settings.maxmind_license_key,
            host="geolite.info",
        ) as client:
            response = client.insights(ip)

        country_code = response.country.iso_code
        is_vpn = (
            getattr(response.traits, "is_anonymous_proxy", False)
            or getattr(response.traits, "is_anonymous_vpn", False)
            or getattr(response.traits, "is_hosting_provider", False)
            or getattr(response.traits, "is_tor_exit_node", False)
        )
        risk_score = getattr(response, "risk_score", 0.0) or 0.0
        is_suspicious = risk_score > 50

        if country_code != ALLOWED_COUNTRY:
            return GeoCheckResult(
                allowed=False,
                country_code=country_code,
                is_vpn=is_vpn,
                is_suspicious=is_suspicious,
                risk_score=risk_score,
                reason=f"blocked_country:{country_code}",
            )

        if is_vpn:
            return GeoCheckResult(
                allowed=False,
                country_code=country_code,
                is_vpn=True,
                is_suspicious=is_suspicious,
                risk_score=risk_score,
                reason="vpn_detected",
            )

        if is_suspicious:
            return GeoCheckResult(
                allowed=False,
                country_code=country_code,
                is_vpn=is_vpn,
                is_suspicious=True,
                risk_score=risk_score,
                reason=f"suspicious_risk_score:{risk_score}",
            )

        return GeoCheckResult(
            allowed=True,
            country_code=country_code,
            is_vpn=False,
            is_suspicious=False,
            risk_score=risk_score,
            reason="passed",
        )

    except Exception as e:
        logger.error("MaxMind GeoIP2 check failed: %s", e)
        return GeoCheckResult(allowed=True, reason=f"geo_check_error:{e}")

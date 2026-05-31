import httpx

from app.core.config import Settings
from app.models.order import Order


async def send_order_to_sheet(order: Order, settings: Settings) -> tuple[bool, str]:
    if not settings.google_sheets_webhook_url:
        return False, "GOOGLE_SHEETS_WEBHOOK_URL is empty"

    payload = {
        "secret": settings.order_webhook_secret,
        "order": {
            "order_number": order.order_number,
            "created_at": order.created_at.isoformat() if order.created_at else "",
            "status": order.status,
            "customer_name": order.customer_name,
            "phone_raw": order.phone_raw,
            "phone_e164": order.phone_e164,
            "phone_local": order.phone_local,
            "items": order.items,
            "subtotal_lyd": order.subtotal_lyd,
            "discount_lyd": order.discount_lyd,
            "total_lyd": order.total_lyd,
            "currency": order.currency,
            "source": order.source,
            "landing_page": order.landing_page,
            "referrer": order.referrer,
            "utm_source": order.utm_source,
            "utm_medium": order.utm_medium,
            "utm_campaign": order.utm_campaign,
            "utm_content": order.utm_content,
            "utm_term": order.utm_term,
            "fbclid": order.fbclid,
            "fbc": order.fbc,
            "fbp": order.fbp,
            "ttclid": order.ttclid,
            "ttp": order.ttp,
            "snapclid": order.snapclid,
            "event_id": order.event_id,
            "client_ip": order.client_ip,
            "user_agent": order.user_agent,
            "sheet_sync_status": order.sheet_sync_status,
            "notes": order.notes,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.post(settings.google_sheets_webhook_url, json=payload)
            response.raise_for_status()
            return True, ""
    except Exception as exc:
        return False, str(exc)

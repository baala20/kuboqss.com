import json
import logging
from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings, get_settings
from app.db.session import get_session
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderOut
from app.services.geolocation import check_ip_geolocation
from app.services.phone import normalize_libya_phone
from app.services.sheets import send_order_to_sheet
from app.services.tracking import send_purchase_events

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/orders", tags=["orders"])


def make_order_number() -> str:
    return f"KBQ-{datetime.utcnow().strftime('%y%m%d%H%M%S')}-{uuid4().hex[:4].upper()}"


@router.post("", response_model=OrderOut)
async def create_order(
    payload: OrderCreate,
    request: Request,
    session: AsyncSession = Depends(get_session),
    settings: Settings = Depends(get_settings),
) -> OrderOut:
    phone = normalize_libya_phone(payload.phone)
    if phone is None:
        raise HTTPException(status_code=422, detail="رقم الهاتف الليبي غير صحيح.")

    # Geo-fraud check (whitelisted phones bypass)
    is_whitelisted = payload.phone.replace(" ", "").replace("-", "") in [
        p.replace(" ", "") for p in settings.whitelisted_phones_list
    ]
    if not is_whitelisted:
        client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
        if not client_ip:
            client_ip = request.client.host if request.client else ""
        geo = await check_ip_geolocation(client_ip, settings)
        if not geo.allowed:
            logger.warning(
                "Order blocked | phone=%s ip=%s reason=%s country=%s vpn=%s risk=%.1f",
                payload.phone, client_ip, geo.reason, geo.country_code, geo.is_vpn, geo.risk_score,
            )
            raise HTTPException(
                status_code=403,
                detail="عذراً، لا يمكن إتمام الطلب من موقعك الحالي.",
            )

    subtotal = sum(item.unit_price_lyd * item.quantity for item in payload.items)
    order = Order(
        order_number=make_order_number(),
        customer_name=payload.customer_name.strip(),
        phone_raw=payload.phone,
        phone_e164=phone.e164,
        phone_local=phone.local,
        items=[item.model_dump() for item in payload.items],
        subtotal_lyd=subtotal,
        discount_lyd=0,
        total_lyd=subtotal,
        currency="LYD",
        source=payload.source,
        landing_page=payload.landing_page,
        referrer=payload.referrer,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        utm_content=payload.utm_content,
        utm_term=payload.utm_term,
        fbclid=payload.fbclid,
        fbc=payload.fbc,
        fbp=payload.fbp,
        ttclid=payload.ttclid,
        ttp=payload.ttp,
        snapclid=payload.snapclid,
        event_id=payload.event_id,
        client_ip=request.client.host if request.client else "",
        user_agent=request.headers.get("user-agent", ""),
    )

    session.add(order)
    await session.commit()
    await session.refresh(order)

    capi_result = await send_purchase_events(order, settings)
    sheet_ok, sheet_error = await send_order_to_sheet(order, settings)
    order.sheet_sync_status = "sent_to_sheet" if sheet_ok else "sheet_failed"
    order.sheet_sync_error = sheet_error
    order.notes = json.dumps({"capi": capi_result}, ensure_ascii=False)
    await session.commit()

    return OrderOut(order_number=order.order_number, thank_you_url="/thank-you")

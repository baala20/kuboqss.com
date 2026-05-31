import asyncio
import time
from typing import Any

import httpx

from app.core.config import Settings
from app.models.order import Order
from app.services.hashing import sha256_hex


def _contents(order: Order) -> list[dict[str, Any]]:
    contents: list[dict[str, Any]] = []
    for item in order.items:
        contents.append(
            {
                "id": item.get("product_id") or item.get("slug"),
                "content_id": item.get("product_id") or item.get("slug"),
                "content_name": item.get("name_ar", ""),
                "quantity": item.get("quantity", 1),
                "item_price": item.get("unit_price_lyd", 0),
                "price": item.get("unit_price_lyd", 0),
            }
        )
    return contents


def build_hashed_user_data(order: Order) -> dict[str, str]:
    phone_digits = order.phone_e164.replace("+", "")
    return {
        "meta_phone_hash": sha256_hex(phone_digits),
        "snap_phone_hash": sha256_hex(phone_digits),
        "tiktok_phone_hash": sha256_hex(order.phone_e164),
    }


async def _post_json(url: str, payload: dict[str, Any], headers: dict[str, str] | None = None) -> str:
    try:
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.post(url, json=payload, headers=headers or {})
            if response.status_code >= 400:
                return f"error_{response.status_code}:{response.text[:300]}"
            return "sent"
    except Exception as exc:
        return f"error:{exc}"


async def _send_meta_purchase(order: Order, settings: Settings, hashes: dict[str, str]) -> str:
    if not settings.meta_access_token or not settings.meta_pixel_id:
        return "skipped_missing_config"

    payload: dict[str, Any] = {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": int(time.time()),
                "event_id": order.event_id,
                "event_source_url": order.landing_page or settings.frontend_url,
                "action_source": "website",
                "user_data": {
                    "ph": [hashes["meta_phone_hash"]],
                    "client_ip_address": order.client_ip,
                    "client_user_agent": order.user_agent,
                    "fbp": order.fbp or None,
                    "fbc": order.fbc or None,
                },
                "custom_data": {
                    "currency": order.currency,
                    "value": order.total_lyd,
                    "order_id": order.order_number,
                    "content_type": "product",
                    "content_ids": [item.get("product_id") for item in order.items],
                    "contents": _contents(order),
                },
            }
        ]
    }
    if settings.meta_test_event_code:
        payload["test_event_code"] = settings.meta_test_event_code

    url = f"https://graph.facebook.com/v21.0/{settings.meta_pixel_id}/events?access_token={settings.meta_access_token}"
    return await _post_json(url, payload)


async def _send_tiktok_purchase(order: Order, settings: Settings, hashes: dict[str, str]) -> str:
    if not settings.tiktok_access_token or not settings.tiktok_pixel_code:
        return "skipped_missing_config"

    payload: dict[str, Any] = {
        "event_source": "web",
        "event_source_id": settings.tiktok_pixel_code,
        "data": [
            {
                "event": "CompletePayment",
                "event_time": int(time.time()),
                "event_id": order.event_id,
                "user": {
                    "phone": hashes["tiktok_phone_hash"],
                    "ttclid": order.ttclid or None,
                    "ttp": order.ttp or None,
                    "ip": order.client_ip,
                    "user_agent": order.user_agent,
                },
                "properties": {
                    "currency": order.currency,
                    "value": order.total_lyd,
                    "order_id": order.order_number,
                    "content_type": "product",
                    "contents": _contents(order),
                },
                "page": {
                    "url": order.landing_page or settings.frontend_url,
                    "referrer": order.referrer,
                },
            }
        ],
    }
    if settings.tiktok_test_event_code:
        payload["test_event_code"] = settings.tiktok_test_event_code

    return await _post_json(
        "https://business-api.tiktok.com/open_api/v1.3/event/track/",
        payload,
        headers={"Access-Token": settings.tiktok_access_token, "Content-Type": "application/json"},
    )


async def _send_snap_purchase(order: Order, settings: Settings, hashes: dict[str, str]) -> str:
    if not settings.snap_access_token or not settings.snap_pixel_id:
        return "skipped_missing_config"

    payload = {
        "data": [
            {
                "event_name": "PURCHASE",
                "event_time": int(time.time()),
                "event_id": order.event_id,
                "action_source": "WEB",
                "event_source_url": order.landing_page or settings.frontend_url,
                "user_data": {
                    "ph": hashes["snap_phone_hash"],
                    "client_ip_address": order.client_ip,
                    "client_user_agent": order.user_agent,
                },
                "custom_data": {
                    "currency": order.currency,
                    "value": order.total_lyd,
                    "order_id": order.order_number,
                    "content_ids": [item.get("product_id") for item in order.items],
                    "contents": _contents(order),
                },
            }
        ]
    }
    url = f"https://tr.snapchat.com/v3/{settings.snap_pixel_id}/events?access_token={settings.snap_access_token}"
    return await _post_json(url, payload)


async def send_purchase_events(order: Order, settings: Settings) -> dict[str, str]:
    # Store order first, then fire CAPI best-effort. Failed ad APIs must not break COD checkout.
    hashes = build_hashed_user_data(order)
    meta, tiktok, snapchat = await asyncio.gather(
        _send_meta_purchase(order, settings, hashes),
        _send_tiktok_purchase(order, settings, hashes),
        _send_snap_purchase(order, settings, hashes),
    )
    return {"meta": meta, "tiktok": tiktok, "snapchat": snapchat}

# Backend Specification

## Stack

Use:

- Python 3.12
- FastAPI
- Uvicorn
- SQLAlchemy 2.x async
- Asyncpg
- Alembic
- Pydantic v2
- pydantic-settings
- httpx
- python-dotenv for local development

## App Structure

```text
backend/
  app/
    main.py
    api/
      routes_health.py
      routes_products.py
      routes_orders.py
      routes_events.py
    core/
      config.py
      security.py
      logging.py
    db/
      session.py
      base.py
      migrate.py
    models/
      product.py
      order.py
      event.py
    schemas/
      product.py
      order.py
      event.py
    services/
      phone.py
      sheets.py
      capi_meta.py
      capi_tiktok.py
      capi_snapchat.py
      tracking.py
  alembic/
  Dockerfile
  requirements.txt
```

## Startup Behavior

On backend start:

1. Load env.
2. Connect to Postgres.
3. Run Alembic migrations automatically.
4. Start FastAPI.

EasyPanel deployments should not require manual migration commands.

## Environment

Required:

- `DATABASE_URL`
- `FRONTEND_URL`
- `BACKEND_URL`
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `ORDER_WEBHOOK_SECRET`

Optional tracking:

- `META_PIXEL_ID`
- `META_ACCESS_TOKEN`
- `META_TEST_EVENT_CODE`
- `TIKTOK_PIXEL_CODE`
- `TIKTOK_ACCESS_TOKEN`
- `TIKTOK_TEST_EVENT_CODE`
- `SNAP_PIXEL_ID`
- `SNAP_ACCESS_TOKEN`
- `SNAP_TEST_EVENT_CODE`

## Product API

`GET /api/products`

Returns active products sorted by priority.

`GET /api/products/{slug}`

Returns a single product with offers, proof blocks, FAQs, and cross-sell IDs.

## Order API

`POST /api/orders`

Input:

- `customer_name`
- `phone`
- `items`
- `total_lyd`
- `event_id`
- UTM/click IDs
- browser cookies where available
- page/referrer data

Backend responsibilities:

1. Validate name.
2. Normalize and validate Libya mobile number.
3. Recalculate totals server-side.
4. Create order in Postgres.
5. Send CAPI purchase/order event.
6. Send Google Sheet webhook.
7. Return order number and thank-you URL.

Never trust frontend totals.

## Phone Normalization

Accept:

- `0912345678`
- `091 234 5678`
- `+218912345678`
- `218912345678`
- `00218912345678`

Normalize:

- Remove spaces, dashes, parentheses.
- If starts with `00`, convert to `+`.
- If starts with `0`, replace leading `0` with `+218`.
- If starts with `218`, prefix `+`.
- Validate as `+2189[1-6]xxxxxxx`.

Return:

- `phone_e164`: `+218912345678`
- `phone_digits`: `218912345678`
- `phone_local`: `0912345678`

## Hashing

Use SHA-256 lowercase hex.

Meta:

- Phone input before hashing: digits only with country code, no `+`.
- Example: `218912345678`

Snapchat:

- Phone input before hashing: digits only with country code, no `+`.
- Example: `218912345678`

TikTok:

- Phone input before hashing: E.164 with `+`.
- Example: `+218912345678`

## Order Statuses

Use:

- `new`
- `sent_to_sheet`
- `sheet_failed`
- `confirmed`
- `shipped`
- `delivered`
- `cancelled`
- `returned`

V1 only needs order creation and sheet sync status.

## Database Tables

Minimum:

- `products`
- `product_offers`
- `orders`
- `order_items`
- `tracking_events`

Optional later:

- `customers`
- `inventory`
- `admin_users`

## Reliability Rules

- Store the order before external API calls.
- If Google Sheet webhook fails, keep the order and mark sync failed.
- Log CAPI responses but do not block checkout if one ad platform fails.
- Use short outbound timeouts.
- Do not expose tokens to frontend.
- Do not store raw access tokens in logs.

## CORS

Allow:

- `https://kuboqss.com`
- `https://www.kuboqss.com`
- local dev URL only in development

## Security

- Validate request body with Pydantic.
- Rate-limit order endpoint if possible.
- Use webhook secret when sending to Google Apps Script.
- Do not expose admin/order list endpoints publicly in v1.

## Dockerfile Requirements

Backend Dockerfile should:

- Use slim Python image.
- Install dependencies from `requirements.txt`.
- Run as non-root if possible.
- Start with `uvicorn app.main:app --host 0.0.0.0 --port 8000`.

Healthcheck path:

```text
/health
```

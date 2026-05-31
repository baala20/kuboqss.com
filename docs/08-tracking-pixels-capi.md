# Tracking, Pixels, And CAPI

## Goal

Implement browser pixels and server-side CAPI for:

- Meta/Facebook
- TikTok
- Snapchat

Use event deduplication so the same event fired from browser and backend is counted once.

## Events

Track:

- `PageView`
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Purchase`

For COD, `Purchase` means order submitted, not delivered. Internally, also track order status in database.

## Deduplication

Every meaningful event must have an `event_id`.

Flow:

1. Frontend creates UUID event ID.
2. Browser pixel fires event with that ID.
3. Frontend sends event/order to backend with same ID.
4. Backend sends CAPI with same ID.

Meta:

- Browser: `eventID`
- CAPI: `event_id`

TikTok:

- Browser: `event_id`
- Events API: `event_id`

Snapchat:

- Browser pixel: `client_dedup_id`
- CAPI: `event_id`

## Script Loading

Pixels must be deferred for speed.

Rules:

- Do not block first render.
- Load with Next.js `Script` using `afterInteractive` or lazy/idle strategy.
- Only initialize pixels when env IDs exist.
- Keep all browser tracking in `frontend/lib/tracking.ts`.

## Libya Phone Normalization

Accepted local:

```text
0912345678
```

E.164:

```text
+218912345678
```

Digits with country code:

```text
218912345678
```

Valid mobile prefixes:

- 091
- 092
- 093
- 094
- 095
- 096

Regex after E.164 normalization:

```text
^\+2189[1-6]\d{7}$
```

## Hashing Rules

Always normalize before hashing.

SHA-256 lowercase hex.

Meta:

- Phone before hashing: digits only with country code.
- Example input: `218912345678`
- Do not include `+`.

TikTok:

- Phone before hashing: E.164 with plus sign.
- Example input: `+218912345678`
- Include `+`.

Snapchat:

- Phone before hashing: digits only with country code.
- Example input: `218912345678`
- Do not include `+`.

## Browser Pixel Data

Capture:

- `fbclid`
- `_fbp`
- `_fbc`
- `ttclid`
- `_ttp`
- `ScCid` or Snap click ID if available
- UTM params
- landing page
- referrer

Store attribution in localStorage/sessionStorage so checkout can send it to backend.

## Meta Events

Browser:

```ts
fbq("track", "ViewContent", payload, { eventID });
fbq("track", "AddToCart", payload, { eventID });
fbq("track", "InitiateCheckout", payload, { eventID });
fbq("track", "Purchase", payload, { eventID });
```

CAPI:

- Endpoint: Meta Graph API events endpoint.
- Include:
  - `event_name`
  - `event_time`
  - `event_id`
  - `action_source: "website"`
  - `event_source_url`
  - `user_data`
  - `custom_data`

User data:

- `ph`: SHA-256 of `2189xxxxxxx`
- `fbp`
- `fbc`
- `client_ip_address`
- `client_user_agent`

Custom data:

- `currency: "LYD"`
- `value`
- `content_ids`
- `contents`
- `order_id`

## TikTok Events

Browser:

- Initialize TikTok pixel if `NEXT_PUBLIC_TIKTOK_PIXEL_CODE` exists.
- Send `ViewContent`, `AddToCart`, `InitiateCheckout`, `CompletePayment` or platform-supported equivalent.
- Include `event_id`.

CAPI:

- Include:
  - `event`
  - `event_id`
  - `timestamp`
  - `context`
  - `properties`

User matching:

- phone SHA-256 of E.164 with `+`
- `ttclid`
- `_ttp`
- IP
- User agent

Currency:

- `LYD`

## Snapchat Events

Browser:

- Initialize Snap pixel if ID exists.
- Use `client_dedup_id` matching backend `event_id`.

CAPI:

- Include:
  - `event_name`
  - `event_time`
  - `event_id`
  - user data
  - custom data

Phone:

- SHA-256 of digits with country code, no `+`.

Dedup:

- `client_dedup_id` in browser must match `event_id` in server payload.

## Backend Tracking Services

Create:

- `services/capi_meta.py`
- `services/capi_tiktok.py`
- `services/capi_snapchat.py`
- `services/tracking.py`

`tracking.py` should:

- Build common event object.
- Normalize phone once.
- Hash per platform rules.
- Send platform calls independently.
- Log failures without blocking order creation.

## Testing

Before launch:

- Use Meta Test Events.
- Use TikTok test event code if available.
- Use Snapchat test/debug if available.
- Confirm browser and server events dedupe.
- Confirm phone hash is generated from correct platform-specific format.
- Confirm no raw phone is sent in CAPI user data.

## Privacy

Privacy policy must disclose:

- Analytics and advertising pixels.
- Server-side conversion tracking.
- COD order processing.
- Phone use for order confirmation.

Do not expose access tokens to frontend.

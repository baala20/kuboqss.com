# Site Architecture

## Target Structure

The AI coder should deliver two deployable apps:

```text
frontend/
  app/
  components/
  lib/
  data/
  public/
  Dockerfile
  next.config.ts
  package.json
  .env.example

backend/
  app/
    api/
    core/
    db/
    models/
    schemas/
    services/
    main.py
  alembic/
  Dockerfile
  requirements.txt
  .env.example

templates/
  google-sheets-webhook.js
  orders_sheet_columns.csv

docs/
```

## Frontend Routes

Use Next.js App Router.

Routes:

- `/` home page
- `/collections` all active products
- `/products/[slug]` product landing page
- `/about` brand story
- `/contact` contact and support
- `/thank-you` post-order confirmation
- `/privacy` privacy policy
- `/terms` terms and COD policy
- `/delivery-returns` delivery and returns policy

## Backend Routes

Health:

- `GET /health`

Catalog:

- `GET /api/products`
- `GET /api/products/{slug}`

Orders:

- `POST /api/orders`
- `GET /api/orders/{order_id}` only if protected/admin later

Tracking:

- `POST /api/events/view-content`
- `POST /api/events/add-to-cart`
- `POST /api/events/initiate-checkout`
- `POST /api/events/purchase`

Webhook:

- Backend sends order to Google Apps Script URL after order is stored.
- Never rely on Google Sheet as the primary database.

## Data Model

Products must be dynamic enough for testing.

Product fields:

- `id`
- `slug`
- `status`
- `name_ar`
- `name_en`
- `short_headline_ar`
- `subheadline_ar`
- `category`
- `niche`
- `description_ar`
- `benefits`
- `ingredients_or_materials`
- `usage_steps`
- `warnings`
- `proof_points`
- `faq`
- `images`
- `offers`
- `cross_sell_product_ids`
- `created_at`
- `updated_at`

Offer fields:

- `id`
- `product_id`
- `label_ar`
- `quantity`
- `price_lyd`
- `compare_at_price_lyd`
- `badge_ar`
- `is_default`

Order fields:

- `id`
- `order_number`
- `customer_name`
- `phone_raw`
- `phone_e164`
- `phone_meta_snap_digits`
- `city`
- `address`
- `items`
- `subtotal_lyd`
- `discount_lyd`
- `total_lyd`
- `currency`
- `status`
- `source`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `fbc`
- `fbp`
- `ttclid`
- `ttp`
- `snapclid`
- `event_id`
- `client_ip`
- `user_agent`
- `sheet_sync_status`
- `sheet_sync_error`
- `created_at`
- `updated_at`

## Currency And Prices

Use LYD as the display currency.

Because products are unknown, do not hardcode fixed prices globally. Each product should define its own offers.

Recommended testing offer template:

- 1 piece: premium anchor price
- 2 pieces: best seller/best value
- 3 pieces: family or full routine offer

Example only:

```text
قطعة واحدة: 79 د.ل
قطعتان: 129 د.ل
ثلاث قطع: 169 د.ل
```

The operator must adjust prices based on supplier cost, delivery cost, confirmation rate, return rate, and ad CPA.

## Event Flow

Every conversion event needs a stable `event_id`.

Frontend:

- Generate event ID for ViewContent/AddToCart/InitiateCheckout/Purchase.
- Send browser pixel event with that ID.
- Send server event with the same ID.

Backend:

- Store order first.
- Send CAPI events.
- Send Google Sheet webhook.
- Return success response.

## UX State Flow

Product page:

1. User selects offer.
2. Click CTA.
3. Offer is added to cart.
4. Cart drawer opens.
5. Cross-sells appear.

Cart:

1. User can update quantity or remove item.
2. Cross-sell cards can add to cart with one click.
3. CTA opens checkout popup.

Checkout:

1. Name field.
2. Libya phone field.
3. Optional city/address can be added later, but keep initial version minimal if supplier confirms by phone.
4. Submit validates phone.
5. Create order.
6. Redirect to thank-you page.

Thank you:

- Show order number.
- Tell user a confirmation call/message will come.
- Reinforce COD.
- Ask user to keep phone available.

## Admin

Do not build a full admin in v1 unless requested.

Products can start from seed data or a JSON/TS data file in frontend plus matching backend seed. The backend database should still support products/orders properly so admin can be added later.

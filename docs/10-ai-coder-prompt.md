# Prompt For The AI Coder

Use this prompt with the implementation AI coder.

```text
You are building Kuboqss.com, a premium Arabic RTL DTC/COD store for Libya.

Read all docs before coding:

- docs/00-master-brief.md
- docs/01-brand-positioning-icp.md
- docs/02-site-architecture.md
- docs/03-frontend-spec.md
- docs/04-backend-spec.md
- docs/05-cro-copywriting.md
- docs/06-product-system.md
- docs/07-checkout-cod-aov.md
- docs/08-tracking-pixels-capi.md
- docs/09-deployment-easypanel.md

Deliver two deployable folders:

1. frontend/
   - Next.js App Router
   - React + TypeScript
   - Tailwind CSS
   - Arabic RTL
   - Premium Kuboqss design
   - Header with K circle, Arabic logo كوبوكس, English Kuboqss
   - Home, collection, product, about, contact, thank-you, policy pages
   - Product landing page system
   - Cart drawer with cross-sells
   - Checkout modal with name + Libya phone validation
   - Browser pixels for Meta, TikTok, Snapchat, deferred for speed
   - Event IDs for deduplication
   - Dockerfile
   - .env.example

2. backend/
   - Python FastAPI
   - PostgreSQL database named kuboqss
   - SQLAlchemy async + Alembic
   - Run migrations on backend start
   - Order API
   - Product API
   - Tracking/CAPI services for Meta, TikTok, Snapchat
   - Google Sheets webhook sender
   - Libya phone normalization
   - Platform-specific SHA-256 hashing
   - Dockerfile
   - .env.example

Database:

DATABASE_URL=postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable

Domains:

Frontend: https://kuboqss.com
Backend: https://api.kuboqss.com

Important business rules:

- This is a COD-only store.
- The brand must look like a serious Libyan premium beauty/self-care brand, not a dropshipping store.
- Products are not final yet, so create a flexible product system and seed with realistic beauty/self-care placeholder products.
- Use LYD currency.
- Default offer should encourage higher AOV, usually selecting the 2-piece offer.
- Product CTA adds selected offer to cart and opens cart drawer.
- Cart drawer shows relevant cross-sells.
- Cart CTA opens checkout popup.
- Checkout requires only name and valid Libya mobile number in v1.
- After successful order, redirect to thank-you page.
- Store order in Postgres before sending Google Sheet webhook or CAPI.
- Send order info to Google Sheets using templates/google-sheets-webhook.js.
- Use templates/orders_sheet_columns.csv as the sheet column template.

Phone validation:

- Accept 091-096 Libya mobile prefixes.
- Accept local 0912345678, +218912345678, 218912345678, and 00218912345678.
- Normalize to +2189xxxxxxx and digits 2189xxxxxxx.

Tracking:

- Implement Meta Pixel + CAPI.
- Implement TikTok Pixel + Events API.
- Implement Snapchat Pixel + CAPI.
- Use deferred/lazy browser script loading.
- Use the same event ID in browser and server events for deduplication.
- Meta phone hash input: digits with country code, no plus.
- Snapchat phone hash input: digits with country code, no plus.
- TikTok phone hash input: E.164 with plus.
- Never expose access tokens in frontend.

Design:

- Arabic RTL.
- Premium beauty/self-care look.
- Suggested colors: deep plum #4B173D, rose gold #C99A6B, warm ivory #FFF8F1, soft blush #F4DDE7, charcoal #211A1F.
- Mobile-first.
- Desktop sections should alternate text/image layouts.
- Use image placeholders until real product images are supplied.

Quality bar:

- Type-safe frontend.
- Validated backend schemas.
- Clean component structure.
- No secrets committed.
- Dockerized frontend and backend.
- EasyPanel-ready.
- README with local dev and deploy instructions.
- Do not fake medical claims or fake reviews. Use placeholders until real proof exists.
```

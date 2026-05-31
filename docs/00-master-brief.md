# Kuboqss Master Brief

## Project

Build `Kuboqss.com`, a premium Arabic RTL DTC store for Libya.

Kuboqss sells cash-on-delivery products from the operator's supplier/company, but the website must present the business as a serious local brand, not a dropshipping middleman.

## Strategic Direction

Primary recommendation: build Kuboqss around a **premium beauty, self-care, and wellness niche for Libyan women**.

Reasoning:

- Women-led beauty/self-care purchases are emotional, recurring, and trust-driven.
- Product pages can use pain, aspiration, proof, routines, ingredients, before/after style storytelling, and UGC.
- Higher AOV is easier with bundles, routines, cross-sells, and "complete the result" offers.
- Gadgets can work for impulse sales, but they often create more delivery refusal, support questions, and lower brand loyalty.
- Kuboqss can later test gadgets under a separate collection only if the data proves it, but the main brand should stay coherent.

## Brand

- Brand name: Kuboqss
- Arabic logo text: كوبوكس
- Domain: `Kuboqss.com`
- Backend: `api.kuboqss.com`
- Market: Libya
- Language: Arabic RTL with Libyan-friendly tone
- Business model: COD only
- Position: "Libya's trusted destination for premium beauty and self-care solutions"

## Technical Stack

Frontend:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or Radix UI primitives
- Zustand for cart/checkout state
- React Hook Form + Zod for checkout validation
- Framer Motion for subtle premium interactions

Backend:

- Python FastAPI
- PostgreSQL database named `kuboqss`
- SQLAlchemy 2.x async
- Alembic migrations
- Pydantic settings
- httpx for outbound webhooks and CAPI
- Docker-ready for EasyPanel

Database:

```text
postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable
```

## Core Pages

- Home
- Collection
- Product landing pages
- About
- Contact
- Thank you
- Privacy policy
- Terms and COD policy
- Delivery/returns policy

## Checkout Flow

1. Product page CTA adds selected offer to cart.
2. Cart drawer opens immediately.
3. Cart drawer shows relevant cross-sells.
4. Cart CTA opens checkout popup.
5. Checkout popup asks only for name and Libyan phone number.
6. Valid Libya mobile number is required.
7. Order is saved in Postgres.
8. Purchase/order event is sent to pixels and CAPI with deduplication.
9. Order is sent to Google Sheet via Apps Script webhook.
10. User is redirected to thank-you page with confirmation expectations.

## Premium Conversion Principles

- Sell the outcome, not the product.
- Use local trust: Libya COD, clear phone validation, fast confirmation, local delivery wording, no fake global claims.
- Make Kuboqss the authority: curated products, quality review, routine guidance, transparent promises.
- Use proof everywhere: reviews, UGC placeholders, ratings, social mentions, safety/quality notes, ingredient or material explainers.
- Avoid medical claims unless backed and legally safe. Use "helps support", "designed for", "part of a routine", not guaranteed cures.
- High AOV comes from bundles, routines, cross-sells, and scarcity, not random discounts.

## Initial Product Strategy

Because the exact winning products are not known yet, build a product system that supports fast testing.

Recommended starting test categories:

- Hair care and anti-hair-fall beauty support
- Skin glow, collagen, anti-aging style beauty
- Under-eye/dark-circle care
- Body shaping/self-care tools
- Premium home beauty devices only if supplier quality is good

Do not hardcode one product as the brand identity. Kuboqss is the trusted curator; products are campaigns under the brand.

## Non-Negotiables

- Arabic RTL everywhere.
- Mobile-first, because TikTok/Snapchat traffic will be mobile.
- Fast page loads.
- Deferred web pixels.
- Server-side CAPI events.
- Event deduplication between browser and server.
- COD checkout must be extremely short.
- Every product page must have enough proof, not just a title and button.
- Every order must be stored locally before calling external webhooks.
- All environment variables must be documented.

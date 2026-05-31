# Frontend Specification

## Stack

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or Radix UI primitives
- Zustand for cart and checkout state
- React Hook Form + Zod
- Framer Motion for subtle transitions
- `next/font` for Arabic fonts

Avoid:

- Heavy animation libraries.
- Client-side rendering for all pages.
- Fake timers that reset on refresh unless clearly labeled as campaign timers.
- Too many third-party scripts in the critical path.

## Rendering Strategy

- Product and collection pages should be server-rendered or statically generated when possible.
- Cart drawer, checkout modal, and pixels are client components.
- Pixel scripts must load after interaction or after page idle where possible.
- Use image placeholders until real assets are provided.

## Layout Direction

Global document:

- `lang="ar"`
- `dir="rtl"`

English brand line `Kuboqss` can stay LTR inside logo block.

## Header

Desktop:

- Right side brand block:
  - Circle badge with `K`.
  - Arabic logo text: `كوبوكس`.
  - English subline: `Kuboqss`.
- Center/right navigation:
  - الرئيسية
  - المنتجات
  - من نحن
  - تواصل معنا
- Left cart button with item count.

Mobile:

- Logo right.
- Cart icon left.
- Menu drawer.

Sticky header:

- Use subtle blur and border.
- Do not consume too much vertical height on mobile.

## Home Page Structure

Recommended sections:

1. Hero: premium promise, COD, Libya trust, CTA to collection.
2. Trust bar: دفع عند الاستلام, توصيل داخل ليبيا, تأكيد الطلب, منتجات مختارة.
3. Featured products/testing campaigns.
4. Brand authority: how Kuboqss selects products.
5. Problem-solution section for the current niche.
6. Social proof grid with review placeholders.
7. "Why Kuboqss" section.
8. UGC/video placeholder section for TikTok/Snap proof.
9. FAQ.
10. Final CTA.

Hero copy example:

```text
جمالك يستاهل اختيارات أوثق
منتجات عناية مختارة بعناية للمرأة الليبية، مع دفع عند الاستلام وتجربة طلب بسيطة وواضحة.
```

CTA:

```text
تصفحي المنتجات
```

## Collection Page

Purpose:

- Let traffic browse current winning tests.
- Still feel branded, not a random product dump.

Sections:

- Collection hero.
- Filters by concern/category.
- Product cards.
- Trust strip.
- FAQ.

Product card requirements:

- Strong Arabic heading.
- Outcome-driven subheading.
- Star rating/reviews count placeholder.
- Price/offer preview.
- Badge: الأكثر طلباً, عرض محدود, اختيار كوبوكس.
- CTA: شاهدي التفاصيل.

## Product Landing Page

Every product page must feel like a landing page, not a basic ecommerce PDP.

Sections:

1. Hero with product image, rating, headline, offer selector, CTA.
2. Problem agitation: pain and daily frustration.
3. Solution explanation.
4. Benefit cards.
5. Ingredient/material/science explainer.
6. How to use.
7. Before/after or UGC placeholders.
8. Reviews.
9. Bundle/offer block.
10. Cross-sell routine suggestion.
11. FAQ.
12. Sticky mobile CTA.

Desktop layout:

- Alternate sections: text right/image left, then image right/text left.
- Keep reading width comfortable.

Mobile:

- CTA must be visible quickly.
- Offer cards must be easy to tap.
- Sticky bottom CTA after scroll.

## Cart Drawer

Requirements:

- Opens from right side in RTL.
- Shows item image, title, selected offer, price, quantity.
- Shows subtotal.
- Shows cross-sells with one-tap add.
- Shows trust microcopy:

```text
الدفع عند الاستلام - سيتم تأكيد طلبك قبل الشحن
```

CTA:

```text
إتمام الطلب
```

## Checkout Modal

Fields for v1:

- Name
- Libya mobile phone

Optional hidden/captured:

- UTM parameters
- Click IDs
- Browser IDs
- Landing page URL
- Referrer

Phone validation:

- Accept local format: `0912345678`
- Accept international: `+218912345678`
- Accept `218912345678`
- Normalize to:
  - E.164 for TikTok: `+218912345678`
  - digits for Meta/Snap: `218912345678`

Validation regex after normalization:

```ts
/^\+2189[1-6]\d{7}$/
```

CTA:

```text
أكدي الطلب الآن
```

## Accessibility

- All buttons need accessible labels.
- Modal must trap focus.
- Cart drawer and menu drawer must be keyboard accessible.
- Color contrast must pass basic readability.

## Performance

- Use `next/image`.
- Lazy load non-critical media.
- Defer pixels.
- Avoid large JS for decorative effects.
- Keep fonts limited to 1-2 families and required weights.

## Frontend Coding Rules

- Use TypeScript strictly.
- Keep components small and composable.
- Use `lib/phone.ts` for phone normalization.
- Use `lib/tracking.ts` for browser pixel event IDs.
- Use `lib/api.ts` for backend calls.
- Do not scatter pixel code across components.
- Put product seed data in `data/products.ts` if backend catalog is not ready on day one.

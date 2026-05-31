# Product Testing And Landing Page System

## Niche Recommendation

Kuboqss should start as a beauty/self-care brand, not a general store.

Core niche:

```text
Premium beauty, self-care, and wellness products for Libyan women.
```

Allowed product angles:

- Hair confidence
- Skin glow
- Anti-aging appearance support
- Under-eye care
- Body care
- Beauty tools
- Feminine self-care

Avoid mixing unrelated gadgets into the main navigation at launch. If a gadget is tested, frame it as a beauty/self-care tool or keep it in a separate hidden campaign page.

## Product Selection Scorecard

Before adding any product, score it from 1-5:

- Visual demonstration potential for TikTok/Snap.
- Clear problem/pain.
- Easy to explain in 5 seconds.
- High perceived value.
- Supplier quality consistency.
- Low breakage/return risk.
- Easy COD confirmation script.
- Cross-sell potential.
- Margin after delivery and ads.
- Compliance and claim safety.

Only test products with strong total score.

## Product Data Template

Each product needs:

- Arabic name.
- Slug.
- Category.
- Main concern.
- Hero headline.
- Subheadline.
- Short description.
- Benefits.
- Ingredients/materials.
- Usage steps.
- Warnings.
- Offer cards.
- Cross-sells.
- Review placeholders.
- FAQ.
- Images.
- UGC video placeholders.

## Example Product Placeholder

Use this as seed content until real supplier products are selected.

```json
{
  "slug": "premium-beauty-test-product",
  "name_ar": "منتج عناية مختار من كوبوكس",
  "name_en": "Kuboqss Selected Beauty Product",
  "category": "beauty",
  "headline_ar": "اختيار بسيط لروتين جمال أوضح",
  "subheadline_ar": "منتج مختار بعناية للمرأة الليبية مع دفع عند الاستلام.",
  "badges": ["اختيار كوبوكس", "دفع عند الاستلام", "عرض محدود"],
  "offers": [
    {
      "quantity": 1,
      "label_ar": "قطعة واحدة",
      "price_lyd": 79,
      "badge_ar": "للتجربة"
    },
    {
      "quantity": 2,
      "label_ar": "قطعتان",
      "price_lyd": 129,
      "badge_ar": "الأكثر طلباً"
    },
    {
      "quantity": 3,
      "label_ar": "ثلاث قطع",
      "price_lyd": 169,
      "badge_ar": "أفضل قيمة"
    }
  ]
}
```

## Landing Page Section Order

### 1. Hero

- Product image placeholder.
- Badge.
- Headline.
- Subheadline.
- Rating.
- Offer selector.
- CTA.
- COD microtrust.

### 2. Pain Section

Example:

```text
أحياناً المشكلة ليست في كثرة المنتجات، بل في اختيار منتج واضح وسهل الاستعمال يناسب روتينك.
```

### 3. Why This Product

Explain mechanism without overclaiming.

### 4. Benefits

Use benefit cards:

- سهل الاستخدام
- مناسب للروتين اليومي
- اختيار عملي
- تجربة طلب مريحة

### 5. Proof And Authority

Depending on product:

- Ingredient explainer.
- Material quality.
- Usage demonstration.
- UGC/video placeholder.
- Customer reviews.
- Quality checklist.

### 6. Usage Steps

Use three steps:

```text
1. افتحي المنتج واتّبعي التعليمات.
2. استخدميه ضمن روتينك اليومي أو حسب الحاجة.
3. تابعي النتيجة مع الاستخدام المنتظم.
```

### 7. Offers

Repeat offer selector lower on page.

### 8. Cross-Sell

Use "complete the routine":

```text
أكملي روتينك مع اختيار مناسب من كوبوكس
```

### 9. FAQ

Answer objections.

### 10. Final CTA

```text
اختاري العرض المناسب واطلبي بالدفع عند الاستلام
```

## Image Plan

Until real images are provided:

- Use clean placeholder cards with gradient background and product silhouette.
- Do not use random stolen product photos.
- Use `/public/placeholders/` for generated neutral placeholders.

Needed per product:

- Hero product image.
- Lifestyle/usage image.
- Ingredient/material close-up image.
- UGC/review placeholder image.

## Product Page Components

Build reusable components:

- `ProductHero`
- `OfferSelector`
- `TrustBadges`
- `BenefitGrid`
- `AlternatingSection`
- `ProofBlock`
- `ReviewGrid`
- `UsageSteps`
- `ProductFaq`
- `StickyMobileCTA`
- `CrossSellStrip`

## Testing Roadmap

Phase 1:

- Launch with 3 product placeholders or first supplier products.
- Track view content, add to cart, initiate checkout, purchase/order.
- Use COD confirmation data to judge quality, not only website conversion.

Phase 2:

- Kill products with high cancellation or refusal.
- Scale products with good confirmation and delivery rate.
- Add stronger UGC and real reviews.

Phase 3:

- Build bundles around winners.
- Add upsell/cross-sell routines.
- Improve landing pages based on objections from calls.

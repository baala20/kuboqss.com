# COD Checkout, AOV, And Delivery Quality

## Goal

The checkout must maximize:

- Completed orders.
- Average order value.
- Confirmation rate.
- Delivery success.
- Clean tracking.

Because this is COD, a website "purchase" is really an order lead. The business should still track it as Purchase for ad platforms, but internally monitor confirmation and delivery quality.

## Product CTA Behavior

Every product CTA should:

1. Add selected offer to cart.
2. Open cart drawer.
3. Fire AddToCart browser pixel with `event_id`.
4. Send server AddToCart event with the same `event_id` if configured.

CTA text:

```text
أضيفي العرض للسلة
```

or:

```text
اختاري العرض واطلبي الآن
```

## Cart Drawer

Must include:

- Product summary.
- Quantity controls.
- Selected offer.
- Subtotal.
- Cross-sells.
- COD trust line.
- Checkout CTA.

Cross-sell title:

```text
منتجات تكمل روتينك
```

Cross-sell CTA:

```text
أضيفي للسلة
```

## Checkout Modal

Keep v1 minimal:

- Full name.
- Libya mobile phone.

Optional later:

- City.
- Address.
- Delivery note.

Reason: if the supplier/operator confirms by phone, extra fields can reduce conversion. If logistics needs city/address before confirmation, add them as required.

## Phone Validation

Accepted examples:

- `0912345678`
- `0922345678`
- `0932345678`
- `0942345678`
- `0952345678`
- `0962345678`
- `+218912345678`
- `218912345678`

Reject:

- Landlines.
- Numbers outside Libya.
- Too short/long numbers.
- Fake repeated digits if desired later.

Frontend validation:

```ts
const libyaMobileE164Regex = /^\+2189[1-6]\d{7}$/;
```

## Name Validation

Simple:

- At least 2 characters.
- Arabic or Latin accepted.
- Trim whitespace.

Do not overvalidate names.

## Order Submission

Frontend sends:

- Customer name.
- Phone raw.
- Items.
- Current URL.
- Referrer.
- UTM params.
- Click IDs.
- Browser IDs/cookies.
- Event ID.
- User agent available client-side.

Backend:

- Recalculate total.
- Validate phone.
- Store order.
- Send CAPI.
- Send Google Sheet webhook.
- Return order number.

## Thank You Page

Content:

```text
تم استلام طلبك بنجاح
شكراً لكِ. سيقوم فريق كوبوكس بالتواصل معك لتأكيد الطلب قبل الشحن.
```

Trust reminders:

```text
الدفع عند الاستلام فقط.
```

```text
يرجى إبقاء الهاتف متاحاً حتى لا يتأخر تأكيد الطلب.
```

Show:

- Order number.
- Items.
- Total.
- Expected confirmation note.
- WhatsApp/contact button if available.

## AOV System

Use these levers:

- Default offer: 2 pieces.
- 3-piece offer with strongest savings.
- Cross-sell in cart.
- Product page routine bundle section.
- Post-purchase upsell can be added later if operations can handle it.

Since user did not request upsell timer for Libya version, do not add a forced 10-15s upsell in v1 unless requested. Instead keep clean COD order flow to protect confirmation quality.

## Offer Template

Prices must be configurable per product.

Recommended layout:

```text
قطعة واحدة
للتجربة

قطعتان
الأكثر طلباً

ثلاث قطع
أفضل قيمة
```

Use LYD display:

```text
79 د.ل
```

## Confirmation Rate Improvements

Add these to thank-you and checkout:

- "سنتواصل معك لتأكيد الطلب".
- "الرجاء إدخال رقم هاتف صحيح".
- "إذا لم يتم الرد قد يتأخر الشحن".
- "الدفع عند الاستلام".

After launch, add call center tags:

- Confirmed
- No answer
- Wrong number
- Cancelled price
- Cancelled delivery
- Duplicate

These tags will reveal which landing page promises need adjustment.

## Delivery Rate Improvements

Avoid:

- Overpromising results.
- Hiding total price.
- Fake discounts.
- Unclear COD.

Do:

- Show total clearly.
- Repeat COD.
- Let user know confirmation call is coming.
- Keep product claims realistic.
- Use real product images as soon as possible.

## Cross-Sell Rules

A cross-sell must be relevant.

Good:

- Hair product + hair accessory/routine product.
- Skin product + under-eye/self-care product.
- Beauty tool + refill/companion product.

Bad:

- Random kitchen gadget inside a beauty cart.
- Unrelated cheap item that weakens premium brand perception.

## Metrics To Track

Frontend:

- Product view rate.
- Add to cart rate.
- Checkout open rate.
- Order submit rate.

Backend/business:

- Valid phone rate.
- Confirmation rate.
- Delivery rate.
- Cancellation reasons.
- AOV.
- CPA by product.
- Profit per delivered order.

Decision rule:

Do not scale a product only because website orders are high. Scale when delivered-order profit is healthy.

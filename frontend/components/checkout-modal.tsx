"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { submitOrder as createOrder } from "@/lib/api";
import { useCartStore } from "@/lib/cart-store";
import { isValidLibyaPhone } from "@/lib/phone";
import { createEventId, readAttribution, trackBrowserEvent } from "@/lib/tracking";
import { formatLyd } from "@/lib/utils";

export function CheckoutModal() {
  const router = useRouter();
  const { items, isCheckoutOpen, closeCheckout, subtotal, clear } = useCartStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  async function submitOrder() {
    setError("");

    if (name.trim().length < 2) {
      setError("اكتبي الاسم بشكل صحيح.");
      return;
    }

    if (!isValidLibyaPhone(phone)) {
      setError("اكتبي رقم هاتف ليبي صحيح مثل 0912345678.");
      return;
    }

    const eventId = createEventId("purchase");
    setIsSubmitting(true);

    try {
      const result = await createOrder({
        customer_name: name.trim(),
        phone,
        items: items.map((item) => ({
          product_id: item.product.id,
          slug: item.product.slug,
          name_ar: item.product.nameAr,
          offer_id: item.offer.id,
          offer_label: item.offer.label,
          quantity: item.quantity,
          unit_price_lyd: item.offer.priceLyd,
        })),
        total_lyd: subtotal(),
        currency: "LYD",
        event_id: eventId,
        ...readAttribution(),
      });

      trackBrowserEvent("Purchase", {
        eventId,
        value: subtotal(),
        contentIds: items.map((item) => item.product.id),
      });

      clear();
      closeCheckout();
      router.push(`${result.thank_you_url}?order=${encodeURIComponent(result.order_number)}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "تعذر إرسال الطلب.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4" style={{ backgroundColor: "rgba(33, 26, 31, 0.45)" }}>
      <div className="w-full max-w-lg rounded-[2rem] bg-ivory p-6 shadow-premium">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-plum">تأكيد الطلب</h2>
            <p className="mt-1 text-sm text-taupe">الدفع عند الاستلام، وسنتواصل معك قبل الشحن.</p>
          </div>
          <button onClick={closeCheckout} className="rounded-full bg-white p-2" aria-label="اغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between font-black text-plum">
            <span>ملخص الطلب</span>
            <span>{formatLyd(subtotal())}</span>
          </div>
          <p className="mt-2 text-sm text-taupe">{items.length} منتج في السلة</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-plum">الاسم الكامل</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-gold"
              style={{ borderColor: "rgba(75, 23, 61, 0.15)" }}
              placeholder="مثال: سارة محمد"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black text-plum">رقم الهاتف الليبي</span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-gold"
              style={{ borderColor: "rgba(75, 23, 61, 0.15)" }}
              placeholder="0912345678"
              inputMode="tel"
            />
          </label>
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          <button
            onClick={submitOrder}
            disabled={isSubmitting}
            className="w-full rounded-full bg-plum px-6 py-4 font-black text-ivory disabled:opacity-60"
          >
            {isSubmitting ? "جاري إرسال الطلب..." : "أكدي الطلب الآن"}
          </button>
        </div>
      </div>
    </div>
  );
}

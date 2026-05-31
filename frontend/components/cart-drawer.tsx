"use client";

import { X } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import { createEventId, trackBrowserEvent } from "@/lib/tracking";
import { formatLyd } from "@/lib/utils";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, openCheckout, addOffer, removeItem, subtotal } = useCartStore();
  const crossSells = products.filter((product) => !items.some((item) => item.product.id === product.id)).slice(0, 2);

  if (!isCartOpen) return null;

  function handleCheckout() {
    const eventId = createEventId("checkout");
    trackBrowserEvent("InitiateCheckout", {
      eventId,
      value: subtotal(),
      contentIds: items.map((item) => item.product.id),
    });
    openCheckout();
  }

  return (
    <div className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(33, 26, 31, 0.35)" }}>
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-premium">
        <div className="flex items-center justify-between border-b p-5" style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}>
          <h2 className="text-xl font-black text-plum">سلة الطلب</h2>
          <button onClick={closeCart} aria-label="اغلاق السلة" className="rounded-full bg-white p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {items.length === 0 ? <p className="text-taupe">السلة فارغة الآن.</p> : null}
          {items.map((item) => (
            <div key={`${item.product.id}-${item.offer.id}`} className="rounded-2xl bg-white p-4">
              <div className="flex gap-3">
                <img src={item.product.image} alt="" className="h-16 w-16 rounded-xl bg-blush object-contain p-2" />
                <div className="flex-1">
                  <h3 className="font-black text-plum">{item.product.nameAr}</h3>
                  <p className="text-sm text-taupe">{item.offer.label}</p>
                  <strong className="text-plum">{formatLyd(item.offer.priceLyd)}</strong>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.product.id, item.offer.id)}
                className="mt-3 text-sm font-bold text-taupe underline"
                type="button"
              >
                إزالة
              </button>
            </div>
          ))}

          {crossSells.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-black text-plum">منتجات تكمل روتينك</h3>
              {crossSells.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addOffer(product, product.offers[0])}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-right"
                  type="button"
                >
                  <img src={product.image} alt="" className="h-14 w-14 rounded-xl bg-blush object-contain p-2" />
                  <span className="flex-1">
                    <span className="block font-bold text-plum">{product.nameAr}</span>
                    <span className="text-sm text-taupe">أضيفي للسلة</span>
                  </span>
                  <strong className="text-plum">{formatLyd(product.offers[0].priceLyd)}</strong>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="border-t p-5" style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}>
          <div className="mb-4 flex items-center justify-between font-black text-plum">
            <span>المجموع</span>
            <span>{formatLyd(subtotal())}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={handleCheckout}
            className="w-full rounded-full bg-plum px-6 py-4 font-black text-ivory disabled:cursor-not-allowed disabled:opacity-50"
          >
            إتمام الطلب
          </button>
          <p className="mt-3 text-center text-xs font-bold text-taupe">الدفع عند الاستلام - سيتم تأكيد طلبك قبل الشحن</p>
        </div>
      </aside>
    </div>
  );
}

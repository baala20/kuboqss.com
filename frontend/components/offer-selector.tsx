"use client";

import { useState } from "react";
import type { Product, ProductOffer } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import { createEventId, trackBrowserEvent } from "@/lib/tracking";
import { cn, formatLyd } from "@/lib/utils";

export function OfferSelector({ product }: { product: Product }) {
  const [selected, setSelected] = useState<ProductOffer>(product.offers[1] || product.offers[0]);
  const addOffer = useCartStore((state) => state.addOffer);

  function handleAdd() {
    const eventId = createEventId("atc");
    addOffer(product, selected);
    trackBrowserEvent("AddToCart", {
      eventId,
      value: selected.priceLyd,
      contentIds: [product.id],
      contentName: product.nameAr,
    });
  }

  return (
    <>
      <div className="space-y-4">
        <div className="grid gap-3">
          {product.offers.map((offer) => (
            <button
              key={offer.id}
              type="button"
              onClick={() => setSelected(offer)}
              className={cn(
                "flex items-center justify-between rounded-2xl border bg-white p-4 text-right transition",
                selected.id === offer.id ? "border-gold shadow-glow ring-2 ring-gold/25" : "border-plum/10 hover:border-plum/20",
              )}
            >
              <span>
                <span className="block font-black text-plum">{offer.label}</span>
                <span className="mt-1 inline-block rounded-full bg-blush px-3 py-1 text-xs font-bold text-plum">{offer.badge}</span>
              </span>
              <span className="text-left">
                <strong className="block text-xl text-plum">{formatLyd(offer.priceLyd)}</strong>
                {offer.compareAtPriceLyd ? <del className="text-sm text-taupe">{formatLyd(offer.compareAtPriceLyd)}</del> : null}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={handleAdd}
          className="hidden w-full rounded-full bg-plum px-6 py-4 text-base font-black text-ivory shadow-premium transition hover:bg-plum-dark md:block"
        >
          اختاري العرض واطلبي الآن
        </button>
        <p className="hidden text-center text-sm font-bold text-taupe md:block">الدفع عند الاستلام — تأكيد الطلب قبل الشحن</p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 animate-slide-up border-t border-plum/10 bg-ivory/95 p-4 backdrop-blur-xl md:hidden">
        <div className="container-page flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-taupe">{selected.label}</p>
            <strong className="text-xl text-plum">{formatLyd(selected.priceLyd)}</strong>
          </div>
          <button
            onClick={handleAdd}
            className="shrink-0 rounded-full bg-plum px-6 py-3.5 text-sm font-black text-ivory shadow-premium"
          >
            اطلبي الآن
          </button>
        </div>
        <p className="container-page mt-2 text-center text-xs font-bold text-taupe">COD · تأكيد قبل الشحن</p>
      </div>
      <div className="h-24 md:hidden" aria-hidden="true" />
    </>
  );
}

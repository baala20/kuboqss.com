"use client";

import { create } from "zustand";
import type { Product, ProductOffer } from "@/data/products";

export type CartItem = {
  product: Product;
  offer: ProductOffer;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  addOffer: (product: Product, offer: ProductOffer) => void;
  removeItem: (productId: string, offerId: string) => void;
  subtotal: () => number;
  clear: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  addOffer: (product, offer) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id && item.offer.id === offer.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.offer.id === offer.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
          isCartOpen: true,
        };
      }
      return { items: [...state.items, { product, offer, quantity: 1 }], isCartOpen: true };
    }),
  removeItem: (productId, offerId) =>
    set((state) => ({ items: state.items.filter((item) => item.product.id !== productId || item.offer.id !== offerId) })),
  subtotal: () => get().items.reduce((total, item) => total + item.offer.priceLyd * item.quantity, 0),
  clear: () => set({ items: [] }),
}));

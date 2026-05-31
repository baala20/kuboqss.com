"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ borderColor: "rgba(75, 23, 61, 0.1)", backgroundColor: "rgba(255, 248, 241, 0.9)" }}>
        <div className="brand-gradient-bar" />
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-plum text-xl font-black text-gold shadow-card">K</div>
            <div className="leading-tight">
              <div className="text-xl font-black text-plum">كوبوكس</div>
              <div dir="ltr" className="text-sm font-semibold tracking-[0.22em] text-taupe">
                Kuboqss
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-ink md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-plum">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full border bg-white px-4 py-3 text-plum shadow-sm transition hover:shadow-card"
              style={{ borderColor: "rgba(75, 23, 61, 0.15)" }}
              aria-label="افتح السلة"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 ? (
                <span className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gold text-xs font-black text-plum">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-full border bg-white p-3 text-plum md:hidden"
              style={{ borderColor: "rgba(75, 23, 61, 0.15)" }}
              aria-label="افتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: "rgba(33, 26, 31, 0.4)" }}>
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-ivory shadow-premium">
            <div className="flex items-center justify-between border-b p-5" style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}>
              <span className="font-black text-plum">كوبوكس</span>
              <button onClick={() => setMobileOpen(false)} aria-label="اغلاق القائمة" className="rounded-full bg-white p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 font-bold text-ink transition hover:bg-blush hover:text-plum"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t p-5 text-sm text-taupe" style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}>
              دفع عند الاستلام · تأكيد قبل الشحن
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-plum/10 bg-plum text-ivory">
      <div className="brand-gradient-bar" />
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold font-black text-plum">K</div>
            <div>
              <div className="text-xl font-black">كوبوكس</div>
              <div dir="ltr" className="text-xs tracking-[0.22em] text-ivory/70">
                Kuboqss
              </div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-ivory/75">
            متجر ليبي لمنتجات الجمال والعناية المختارة بعناية. تجربة طلب واضحة، دفع عند الاستلام، وتأكيد قبل الشحن.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["COD", "تأكيد قبل الشحن", "داخل ليبيا"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-gold">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 text-sm">
          <strong className="text-gold">روابط</strong>
          <Link href="/collections" className="text-ivory/85 transition hover:text-gold">
            المنتجات
          </Link>
          <Link href="/about" className="text-ivory/85 transition hover:text-gold">
            من نحن
          </Link>
          <Link href="/contact" className="text-ivory/85 transition hover:text-gold">
            تواصل معنا
          </Link>
        </div>
        <div className="grid gap-3 text-sm">
          <strong className="text-gold">الثقة والسياسات</strong>
          <Link href="/privacy" className="text-ivory/85 transition hover:text-gold">
            سياسة الخصوصية
          </Link>
          <Link href="/terms" className="text-ivory/85 transition hover:text-gold">
            الشروط والدفع عند الاستلام
          </Link>
          <Link href="/delivery-returns" className="text-ivory/85 transition hover:text-gold">
            التوصيل والاسترجاع
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ivory/60">
        © {new Date().getFullYear()} Kuboqss · كوبوكس — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

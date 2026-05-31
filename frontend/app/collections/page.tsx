import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { TrustStrip } from "@/components/ui/trust-strip";
import { products } from "@/data/products";

const trustItems = [
  { title: "دفع عند الاستلام", desc: "لا دفع مسبق — تدفعي عند وصول الطلب.", icon: "💳" },
  { title: "تأكيد قبل الشحن", desc: "نتواصل معك لتأكيد الرقم والعنوان.", icon: "📞" },
  { title: "اختيار بعناية", desc: "كل منتج له صفحة كاملة وproof blocks.", icon: "✓" },
  { title: "براند ليبي", desc: "تجربة مصممة للعميلات داخل ليبيا.", icon: "🇱🇾" },
];

export default function CollectionsPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#F4DDE7,transparent_40%),linear-gradient(180deg,#FFF8F1,#fff)] py-16 md:py-20">
        <div className="brand-gradient-bar absolute inset-x-0 top-0" />
        <div className="container-page max-w-3xl">
          <SectionHeader
            eyebrow="مجموعة كوبوكس"
            title="منتجات عناية مختارة تحت براند واحد"
            description="كل منتج مبني كصفحة بيع كاملة: عروض، ثقة، تقييمات، FAQ، وكروس سيل — مش مجرد قائمة منتجات."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="trust-chip">COD فقط</span>
            <span className="trust-chip">{products.length} منتجات مختارة</span>
            <span className="trust-chip">تأكيد قبل الشحن</span>
          </div>
        </div>
      </section>

      <TrustStrip items={trustItems} />

      <section className="container-page py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <p className="text-sm font-bold text-taupe">مرتبة حسب اختيار كوبوكس</p>
          <Link href="/" className="hidden text-sm font-black text-plum underline decoration-gold underline-offset-4 md:block">
            العودة للرئيسية
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

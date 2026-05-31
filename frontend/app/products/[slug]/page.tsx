import Link from "next/link";
import { notFound } from "next/navigation";
import { OfferSelector } from "@/components/offer-selector";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionHeader } from "@/components/ui/section-header";
import { StarRating } from "@/components/ui/star-rating";
import { getCrossSells, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const crossSells = getCrossSells(product.crossSellSlugs);

  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#F4DDE7,transparent_35%),linear-gradient(135deg,#FFF8F1,#fff)] py-14 md:py-20">
        <div className="brand-gradient-bar absolute inset-x-0 top-0" />
        <div className="container-page grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="premium-card order-2 rounded-[2.75rem] p-5 md:order-1 md:p-8">
            <div className="relative rounded-[2.25rem] bg-gradient-to-br from-blush to-ivory p-8">
              <div className="absolute right-5 top-5 rounded-full bg-plum px-4 py-2 text-sm font-black text-gold">اختيار كوبوكس</div>
              <img src={product.image} alt={product.nameAr} className="mx-auto h-80 w-full object-contain" />
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs font-black text-plum">
                <span className="rounded-2xl bg-white p-3 shadow-sm">COD</span>
                <span className="rounded-2xl bg-white p-3 shadow-sm">تأكيد</span>
                <span className="rounded-2xl bg-white p-3 shadow-sm">عرض</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="mb-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-plum/10 bg-white px-4 py-2 text-sm font-black text-plum shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-black leading-tight text-plum md:text-6xl">{product.headline}</h1>
            <p className="mt-5 text-lg leading-9 text-taupe">{product.subheadline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="rounded-full bg-white px-4 py-2 shadow-sm">
                <StarRating rating={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
              </div>
              <span className="trust-chip font-bold">دفع عند الاستلام</span>
            </div>
            <div className="mt-8 rounded-[2rem] border border-plum/10 bg-white p-5 shadow-card">
              <OfferSelector product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-16 md:grid-cols-2">
        <div className="rounded-[2.5rem] border border-plum/8 bg-white p-8 shadow-card">
          <SectionHeader eyebrow="المشكلة" title="أنتِ لا تحتاجين ضجيج منتجات. تحتاجين اختيار واضح." />
          <p className="mt-5 text-lg leading-9 text-taupe">{product.description}</p>
        </div>
        <div className="rounded-[2.5rem] bg-plum p-8 text-ivory shadow-premium">
          <p className="section-eyebrow text-gold">لماذا كوبوكس؟</p>
          <h2 className="mt-2 text-3xl font-black text-ivory">نختار المنتج بناءً على قابلية الثقة والبيع، لا على الترند فقط.</h2>
          <div className="mt-6 grid gap-3">
            {product.proofPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-bold">{point}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <SectionHeader eyebrow="الفوائد" title="لماذا هذا المنتج مناسب للتجربة؟" className="mb-6" />
        <div className="grid gap-4 md:grid-cols-4">
          {product.benefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl border border-plum/8 bg-white p-5 font-black text-plum shadow-card">{benefit}</div>
          ))}
        </div>
      </section>

      <section className="container-page grid items-center gap-8 py-16 md:grid-cols-2">
        <div className="rounded-[2.5rem] bg-blush p-8">
          <SectionHeader eyebrow="Quality Standard" title="Checklist قبل ما يدخل المنتج لكوبوكس" />
          <div className="mt-6 grid gap-3">
            {product.qualityChecks.map((item) => (
              <div key={item} className="rounded-2xl bg-white p-4 font-bold text-plum">✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] border border-plum/8 bg-white p-8 shadow-card">
          <SectionHeader eyebrow="المكونات / آلية الاختيار" title="نشرح لكِ ما تحتاجين معرفته قبل الطلب" />
          <div className="mt-6 grid gap-3">
            {product.ingredients.map((item) => (
              <div key={item} className="rounded-2xl bg-ivory p-4 font-bold text-plum">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid items-center gap-8 py-8 md:grid-cols-2">
        <div>
          <SectionHeader eyebrow="طريقة الاستخدام" title="روتين بسيط وواضح" />
          <div className="mt-6 grid gap-4">
            {product.usageSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-plum/8 bg-white p-5 shadow-card">
                <span className="text-sm font-black text-gold">خطوة {index + 1}</span>
                <p className="mt-2 font-bold text-plum">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid aspect-video place-items-center rounded-[2.5rem] bg-plum p-8 text-center text-ivory shadow-premium">
          <div>
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-gold text-3xl font-black text-plum shadow-glow">▶</div>
            <p className="text-2xl font-black">مكان فيديو UGC حقيقي</p>
            <p className="mt-3 text-ivory/70">فيديو استعمال / testimonial / routine قبل وبعد</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeader
          align="center"
          eyebrow="تجارب وثقة"
          title="ماذا تقول العميلات؟"
          description="نماذج proof للواجهة — يتم تبديلها بتجارب موثقة بعد أول طلبات حقيقية."
          className="mb-8"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {product.reviews.map((review) => (
            <ReviewCard key={`${review.name}-${review.city}`} {...review} />
          ))}
        </div>
      </section>

      <section className="container-page rounded-[2.5rem] border border-plum/8 bg-white p-8 shadow-card md:p-12">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="اعتراضات قبل الطلب"
            title="أسئلة مهمة"
            description="نوضح قبل الطلب لأن الثقة أهم من order سريع يلغي بعد الاتصال."
          />
          <div className="grid gap-4">
            {product.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-ivory p-5">
                <h3 className="font-black text-plum">{faq.question}</h3>
                <p className="mt-2 leading-7 text-taupe">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {crossSells.length > 0 ? (
        <section className="container-page py-16">
          <SectionHeader eyebrow="Complete The Routine" title="أكملي روتينك مع اختيارات مناسبة" className="mb-6" />
          <div className="grid gap-4 md:grid-cols-2">
            {crossSells.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="rounded-[2rem] border border-plum/8 bg-white p-6 font-black text-plum shadow-card transition hover:-translate-y-1 hover:shadow-lift"
              >
                {item.nameAr}
                <p className="mt-2 text-sm font-normal leading-7 text-taupe">{item.headline}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

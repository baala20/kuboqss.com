import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { FaqGrid } from "@/components/ui/faq-grid";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionHeader } from "@/components/ui/section-header";
import { TrustStrip } from "@/components/ui/trust-strip";
import { products } from "@/data/products";

const trustItems = [
  { title: "دفع عند الاستلام", desc: "لا تدفعي أي شيء قبل وصول الطلب.", icon: "💳" },
  { title: "تأكيد قبل الشحن", desc: "نتواصل معك لتأكيد الرقم والتفاصيل.", icon: "📞" },
  { title: "اختيار وفحص", desc: "نختار ما يستحق العرض تحت براند كوبوكس.", icon: "✓" },
  { title: "داخل ليبيا", desc: "تجربة مصممة لسوق ليبيا وعميلات ليبيا.", icon: "🇱🇾" },
];

const stats = [
  { value: "+300", label: "طلب وتجربة قيد التوثيق" },
  { value: "4.8/5", label: "متوسط تقييم تجربة الطلب" },
  { value: "24h", label: "متابعة وتأكيد الطلبات" },
  { value: "COD", label: "دفع عند الاستلام فقط" },
];

const reviews = [
  { name: "م.س", city: "طرابلس", text: "حسيت أن كوبوكس متجر مرتب، مش صفحة عشوائية. طريقة الطلب واضحة والدفع عند الاستلام عطاني ثقة." },
  { name: "ه.ع", city: "بنغازي", text: "أكثر شيء عجبني أنهم يشرحوا المنتج بدون مبالغة، والتأكيد قبل الشحن يخليك مطمئنة." },
  { name: "ر.م", city: "مصراتة", text: "التصميم والتغليف حسسوني أن البراند جدي. نحب نشوف منتجات أكثر بنفس المستوى." },
];

const faqs = [
  { q: "هل كوبوكس متجر ليبي؟", a: "نعم، كوبوكس مبني كبراند موجه للعميلات داخل ليبيا مع تجربة COD واضحة." },
  { q: "كيف أعرف أن الطلب حقيقي؟", a: "بعد ملء الاسم ورقم الهاتف، يتم التواصل معك لتأكيد الطلب قبل الشحن. الدفع عند الاستلام فقط." },
  { q: "هل هناك ضمان نتائج؟", a: "لا نبيع وعوداً طبية أو مبالغاً فيها. نوضح طريقة الاستخدام ونبني الثقة بالتجارب الواقعية." },
  { q: "متى تصل الطلبية؟", a: "يتم التواصل معك لتأكيد الطلب أولاً، ثم الشحن حسب المدينة والتوفر." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#F4DDE7,transparent_35%),linear-gradient(135deg,#FFF8F1,#fff,#F4DDE7)] pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="brand-gradient-bar absolute inset-x-0 top-0" />
        <div className="container-page grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="trust-chip border font-black" style={{ borderColor: "rgba(201, 154, 107, 0.25)" }}>
              الوجهة الجديدة للجمال والعناية داخل ليبيا
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-plum md:text-6xl">
              كوبوكس ليست صفحة منتجات. كوبوكس براند عناية موثوق للمرأة الليبية.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-taupe">
              نختار منتجات عناية قابلة للشرح، سهلة الاستخدام، وتناسب تجربة الطلب داخل ليبيا: دفع عند الاستلام، تأكيد قبل الشحن، وصف واضح، وواجهة premium تعطي ثقة من أول زيارة.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collections" className="btn-primary">
                شاهدي اختيارات كوبوكس
              </Link>
              <Link href="#proof" className="btn-secondary">
                لماذا يثقون بنا؟
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-plum">
              {["بدون دفع مسبق", "مراجعة المورد", "تأكيد الطلب", "لغة واضحة بدون مبالغة"].map((item) => (
                <span key={item} className="trust-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="premium-card rounded-[2.75rem] p-5 md:p-8">
            <div className="rounded-[2.25rem] bg-gradient-to-br from-plum via-[#642653] to-[#2b0f25] p-7 text-ivory">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-gold">Kuboqss Beauty Standard</p>
                  <h2 className="mt-2 text-3xl font-black">اختيار، ثقة، تجربة طلب واضحة</h2>
                </div>
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gold text-4xl font-black text-plum shadow-glow">K</div>
              </div>
              <div className="mt-8 grid gap-3">
                {["منتج مفهوم قبل الطلب", "عرض واضح بدون إخفاء السعر", "كروس سيل يكمل الروتين", "تأكيد هاتفي قبل الشحن"].map((item) => (
                  <div key={item} className="rounded-2xl border p-4 font-bold" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.1)" }}>{item}</div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-white p-5 text-plum">
                <p className="font-black">تجربة عميلة</p>
                <p className="mt-2 leading-7 text-taupe">&ldquo;أول مرة نحس صفحة COD شكلها براند حقيقي، مش إعلان وخلاص.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip items={trustItems} />

      <section className="container-page py-16">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-plum text-ivory shadow-premium md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b p-7 md:border-b-0 md:border-l" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <strong className="text-4xl font-black text-gold">{stat.value}</strong>
              <p className="mt-2 text-sm leading-6" style={{ color: "rgba(255, 248, 241, 0.75)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="مجموعة مختارة بعناية"
            title="منتجات عناية مبنية كروتين، مش كمنتجات عشوائية"
            description="كل منتج عنده زاوية بيع، عروض AOV، كروس سيل، proof blocks، وFAQ باش الزائرة تفهم وتثق قبل ما تطلب."
          />
          <Link href="/collections" className="hidden shrink-0 font-black text-plum underline decoration-gold underline-offset-4 md:block">
            كل المنتجات
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="proof" className="container-page grid items-center gap-10 rounded-[2.75rem] border bg-white p-8 shadow-card md:grid-cols-2 md:p-12" style={{ borderColor: "rgba(75, 23, 61, 0.08)" }}>
        <SectionHeader
          eyebrow="منهجية كوبوكس"
          title="كيف نبني الثقة قبل البيع؟"
          description="كوبوكس لا يعتمد على سعر رخيص وخلاص. نعتمد على وضوح الفائدة، لغة واقعية، تجربة دفع آمنة، ومتابعة اعتراضات العميلات بعد الاتصال."
        />
        <div className="grid gap-4">
          {["نشرح المنتج بلغة مفهومة", "نمنع claims طبية مبالغ فيها", "نستخدم تقييمات وتجارب قابلة للتوثيق", "نقيس confirmation وdelivery مش فقط orders"].map((item) => (
            <div key={item} className="rounded-2xl border bg-ivory p-5 font-black text-plum" style={{ borderColor: "rgba(75, 23, 61, 0.08)" }}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeader
          align="center"
          eyebrow="Social Proof"
          title="انطباعات عميلات من ليبيا"
          description="نماذج proof للواجهة — يتم استبدالها بتقييمات حقيقية بعد أول دفعات الطلبات."
          className="mb-8"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>

      <section className="container-page grid gap-6 rounded-[2.5rem] bg-blush p-8 md:grid-cols-3 md:p-12">
        {["Snapchat UGC", "TikTok Review", "Before / Routine"].map((label) => (
          <div key={label} className="grid aspect-[4/5] place-items-center rounded-[2rem] border bg-white text-center text-plum shadow-card" style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}>
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-plum text-gold shadow-card">▶</div>
              <p className="text-xl font-black">{label}</p>
              <p className="mt-2 text-sm text-taupe">مكان فيديو حقيقي بعد التصوير</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container-page py-16">
        <SectionHeader eyebrow="أسئلة شائعة" title="أسئلة مهمة قبل الطلب" className="mb-6" />
        <FaqGrid items={faqs} />
      </section>
    </div>
  );
}

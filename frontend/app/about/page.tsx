import Link from "next/link";
import { ReviewCard } from "@/components/ui/review-card";
import { SectionHeader } from "@/components/ui/section-header";

const values = [
  { title: "اختيار قبل العرض", desc: "لا نعرض كل شيء. نختار منتجات قابلة للشرح والثقة والبيع." },
  { title: "لغة واقعية", desc: "بدون claims طبية مبالغ فيها. نوضح الفائدة والاستخدام بوضوح." },
  { title: "تجربة COD محترمة", desc: "تأكيد قبل الشحن، متابعة الطلب، ودفع عند الاستلام فقط." },
  { title: "براند طويل المدى", desc: "كوبوكس مبني كوجهة عناية ليبية، مش صفحة إعلان مؤقتة." },
];

const reviews = [
  { name: "ن.أ", city: "طرابلس", text: "الفرق واضح بين متجر منظم وصفحة منتج عشوائية. كوبوكس يعطي انطباع براند." },
  { name: "س.ب", city: "بنغازي", text: "أحببت أنهم يشرحوا قبل ما يبيعوا. حسيت بالثقة قبل ما أكتب رقمي." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#F4DDE7,transparent_40%),linear-gradient(180deg,#FFF8F1,#fff)] py-16 md:py-24">
        <div className="brand-gradient-bar absolute inset-x-0 top-0" />
        <div className="container-page max-w-3xl">
          <SectionHeader
            eyebrow="من نحن"
            title="كوبوكس — براند عناية ليبي يبني الثقة قبل البيع"
            description="هدف كوبوكس هو تقديم منتجات مختارة بعناية للمرأة الليبية، مع تجربة طلب واضحة ودفع عند الاستلام وتأكيد قبل الشحن."
          />
        </div>
      </section>

      <section className="container-page grid gap-6 py-16 md:grid-cols-2">
        {values.map((value) => (
          <div key={value.title} className="rounded-[2rem] border border-plum/8 bg-white p-8 shadow-card">
            <h2 className="text-xl font-black text-plum">{value.title}</h2>
            <p className="mt-3 leading-8 text-taupe">{value.desc}</p>
          </div>
        ))}
      </section>

      <section className="container-page rounded-[2.5rem] bg-plum p-8 text-ivory shadow-premium md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="font-black text-gold">رؤيتنا</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">أن تكون كوبوكس الوجهة الأولى للعناية داخل ليبيا</h2>
            <p className="mt-5 leading-8 text-ivory/75">
              نبني متجراً يشبه أفضل براندات DTC في العالم — لكن بلغة، ثقة، وطريقة دفع تناسب السوق الليبي.
            </p>
            <Link href="/collections" className="btn-primary mt-8 inline-flex bg-gold text-plum hover:bg-gold-light">
              شاهدي المنتجات
            </Link>
          </div>
          <div className="grid h-48 place-items-center rounded-[2rem] border border-white/10 bg-white/10">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gold text-5xl font-black text-plum">K</div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeader
          align="center"
          eyebrow="انطباعات"
          title="ماذا يقولون عن تجربة كوبوكس؟"
          description="نماذج proof — تُستبدل بتقييمات حقيقية بعد الطلبات."
          className="mb-8"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>
    </div>
  );
}

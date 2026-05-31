import { SectionHeader } from "@/components/ui/section-header";

const channels = [
  { label: "الهاتف / واتساب", value: "أضيفي الرقم هنا", note: "للتأكيد والمتابعة" },
  { label: "فيسبوك", value: "أضيفي الرابط", note: "صفحة كوبوكس الرسمية" },
  { label: "تيك توك / سناب", value: "أضيفي الرابط", note: "UGC وتجارب حقيقية" },
  { label: "البريد", value: "support@kuboqss.com", note: "للاستفسارات العامة" },
];

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#F4DDE7,transparent_40%),linear-gradient(180deg,#FFF8F1,#fff)] py-16 md:py-24">
        <div className="brand-gradient-bar absolute inset-x-0 top-0" />
        <div className="container-page max-w-3xl">
          <SectionHeader
            eyebrow="تواصل معنا"
            title="فريق كوبوكس هنا لمساعدتك"
            description="للاستفسار عن الطلب، التأكيد، أو أي سؤال قبل الشراء — تواصلي معنا عبر القنوات التالية."
          />
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {channels.map((channel) => (
            <div key={channel.label} className="rounded-[2rem] border border-plum/8 bg-white p-6 shadow-card">
              <p className="text-sm font-black text-gold">{channel.label}</p>
              <p className="mt-2 text-xl font-black text-plum">{channel.value}</p>
              <p className="mt-2 text-sm text-taupe">{channel.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-blush p-8 text-center">
          <p className="font-black text-plum">ساعات المتابعة</p>
          <p className="mt-2 text-taupe">يومياً · 10:00 – 22:00 · تأكيد الطلبات خلال 24 ساعة</p>
          <p className="mt-4 text-sm font-bold text-plum">الدفع عند الاستلام · تأكيد قبل الشحن</p>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

export default function ThankYouPage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <section className="container-page grid min-h-[65vh] place-items-center py-16">
      <div className="max-w-2xl rounded-[2.5rem] border border-plum/8 bg-white p-10 text-center shadow-premium">
        <div className="brand-gradient-bar mx-auto mb-8 h-1 w-24 rounded-full" />
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-plum text-4xl font-black text-gold shadow-glow">
          ✓
        </div>
        <p className="section-eyebrow">Thank You</p>
        <h1 className="mt-2 text-4xl font-black text-plum">تم استلام طلبك بنجاح</h1>
        {searchParams.order ? (
          <p className="mt-4 rounded-2xl bg-blush px-5 py-3 font-black text-plum">
            رقم الطلب: <span className="text-gold">{searchParams.order}</span>
          </p>
        ) : null}
        <p className="mt-5 leading-8 text-taupe">
          شكراً لكِ. سيقوم فريق كوبوكس بالتواصل معك لتأكيد الطلب قبل الشحن. الدفع عند الاستلام فقط — يرجى
          إبقاء الهاتف متاحاً.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["تأكيد هاتفي", "شحن بعد التأكيد", "دفع عند الاستلام"].map((step) => (
            <span key={step} className="trust-chip text-xs">
              {step}
            </span>
          ))}
        </div>
        <Link href="/collections" className="btn-primary mt-8 inline-flex">
          العودة للمنتجات
        </Link>
      </div>
    </section>
  );
}

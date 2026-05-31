type FaqItem = {
  q: string;
  a: string;
};

export function FaqGrid({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((faq) => (
        <div key={faq.q} className="rounded-2xl border border-plum/8 bg-white p-6 shadow-card">
          <h3 className="font-black text-plum">{faq.q}</h3>
          <p className="mt-3 leading-7 text-taupe">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}

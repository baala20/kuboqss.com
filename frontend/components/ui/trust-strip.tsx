type TrustItem = {
  title: string;
  desc: string;
  icon?: string;
};

export function TrustStrip({ items }: { items: TrustItem[] }) {
  return (
    <div className="container-page relative z-10 -mt-10 grid gap-3 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
          style={{ borderColor: "rgba(75, 23, 61, 0.1)" }}
        >
          {item.icon ? (
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-blush text-lg">{item.icon}</div>
          ) : null}
          <h3 className="font-black text-plum">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-taupe">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

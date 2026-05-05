function CaseCard({ client, location, challenge, impact }) {
  return (
    <div className="bg-white/[0.07] border border-white/[0.14] rounded-[10px] p-8 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold text-white">{client}</div>
        <div className="text-[13px] text-teal-400 font-medium">{location}</div>
      </div>
      <div>
        <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8] mb-[6px]">
          Challenge
        </div>
        <p className="text-[13px] text-blue-300 leading-normal">{challenge}</p>
      </div>
      <div>
        <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8] mb-[10px]">
          Impact
        </div>
        <ul className="flex flex-col gap-2">
          {impact.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[13px] text-blue-200
                         before:content-['↑'] before:text-emerald-600 before:font-bold before:shrink-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CaseStudies({ items }) {
  return (
    <section className="section section--dark">
      <div className="section__header">
        <span className="section__tag">Client Success</span>
        <h2 className="section__title">Results that speak for themselves</h2>
        <p className="section__subtitle">
          Real OmniServe outcomes from clients in production.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CaseCard key={item.client} {...item} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ number, title, description, highlights, differentiators, benefit }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_auto] gap-8 items-start bg-white/[0.07] border border-white/[0.14] rounded-[10px] p-9">
      <div className="text-[48px] font-extrabold text-teal-400/[0.35] leading-none tabular-nums">
        {number}
      </div>
      <div>
        <h3 className="text-[22px] font-bold text-white mb-[10px]">{title}</h3>
        <p className="text-[15px] text-blue-300 leading-[1.65] mb-5">{description}</p>
        <div className="flex flex-col sm:flex-row gap-12">
          <div>
            <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8] mb-[10px]">
              Includes
            </div>
            <ul>
              {highlights.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-blue-200 py-1 pl-4 relative
                             before:content-['✓'] before:absolute before:left-0
                             before:text-teal-400 before:text-[12px] before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8] mb-[10px]">
              What sets us apart
            </div>
            <ul>
              {differentiators.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-blue-200 py-1 pl-4 relative
                             before:content-['✓'] before:absolute before:left-0
                             before:text-teal-400 before:text-[12px] before:font-bold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-teal-500/[0.15] border border-teal-500/[0.25] rounded-[6px] py-4 px-5 whitespace-nowrap self-center">
        <div className="text-[12px] text-[#7BAAC8] uppercase tracking-[0.05em] mb-1">Key benefit</div>
        <div className="text-[13px] font-semibold text-teal-400">{benefit}</div>
      </div>
    </div>
  );
}

export default function Services({ items }) {
  return (
    <section id="modules" className="section section--dark">
      <div className="section__header">
        <span className="section__tag">Platform Modules</span>
        <h2 className="section__title">Three modules. One unified platform.</h2>
        <p className="section__subtitle">
          OmniServe is built around three tightly integrated modules — each solving a distinct operational challenge, all sharing one dashboard.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {items.map((service) => (
          <ServiceCard key={service.number} {...service} />
        ))}
      </div>
    </section>
  );
}

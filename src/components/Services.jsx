const INDUSTRY_ICON = {
  Healthcare: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 14h-5v5h-4v-5H5v-4h5V5h4v5h5v4z"
    />
  ),
  Construction: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-8h6v8"
    />
  ),
  Logistics: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7h13v10H3zM16 10h3l2 3v4h-5M6 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"
    />
  ),
};

function IndustryCard({ title, description, highlights, benefit }) {
  return (
    <article className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.10] rounded-[14px] p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 transition-colors duration-200 hover:border-teal-400/[0.40]">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"
      />
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-[10px] bg-teal-400/[0.12] border border-teal-400/[0.24] flex items-center justify-center">
          <svg className="w-5 h-5 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {INDUSTRY_ICON[title]}
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-teal-300 bg-teal-400/[0.10] border border-teal-400/[0.20] py-[5px] px-3 rounded-full">
          {benefit}
        </span>
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-white mb-3 tracking-[-0.01em]">{title}</h3>
        <p className="text-[14px] text-blue-200 leading-[1.65]">{description}</p>
      </div>
      <div className="border-t border-white/[0.08] pt-5">
        <ul className="flex flex-col gap-[10px]">
          {highlights.map((item) => (
            <li
              key={item}
              className="text-[13px] text-blue-100 pl-5 relative
                         before:content-['✓'] before:absolute before:left-0 before:top-0
                         before:text-teal-300 before:font-bold before:text-[12px]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services({ items }) {
  return (
    <section id="industries" className="section section--dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(20,184,166,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(37,99,235,0.20) 0%, transparent 70%)",
        }}
      />
      <div className="section__header relative">
        <span className="section__tag">Built for industry</span>
        <h2 className="section__title text-white">Tuned for Healthcare, Construction, and Logistics.</h2>
        <p className="section__subtitle">
          OmniServe ships with industry modules that bake compliance into the workflow and connect field teams to office systems in real time.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative">
        {items.map((item) => (
          <IndustryCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

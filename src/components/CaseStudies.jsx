function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FeaturedCase({ client, location, challenge, impact }) {
  const [primary, ...rest] = impact;
  const match = primary.match(/^(\S+)\s+(.*)$/);
  const primaryNumber = match ? match[1] : primary;
  const primaryRest = match ? match[2] : "";

  return (
    <article className="card p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="p-10 lg:p-12 flex flex-col gap-7 border-b lg:border-b-0 lg:border-r border-line">
        <div className="eyebrow text-blue-700">Featured client</div>
        <div>
          <div className="text-[15px] font-semibold text-ink">{client}</div>
          <div className="text-[13px] text-ink-mute">{location}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-mute mb-2">
            Challenge
          </div>
          <p className="text-[15px] text-ink-soft leading-[1.65]">{challenge}</p>
        </div>
      </div>

      <div className="bg-[#F8FAFF] p-10 lg:p-12 flex flex-col gap-6">
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-700">
          Impact with OmniServe
        </div>
        <div>
          <div className="text-[clamp(56px,7vw,80px)] font-extrabold text-blue-700 leading-[1] tracking-[-0.03em]">
            {primaryNumber}
          </div>
          <div className="text-[15px] text-ink mt-2 max-w-[260px]">{primaryRest}</div>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          {rest.map((line) => (
            <div key={line} className="flex items-start gap-3 text-[14px] text-ink">
              <span className="w-[18px] h-[18px] rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-[2px]">
                <CheckIcon />
              </span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="section section--muted">
      <div className="section__header">
        <span className="section__tag">Client outcome</span>
        <h2 className="section__title">Audit-ready, in production.</h2>
        <p className="section__subtitle">
          A real OmniServe deployment with measured results.
        </p>
      </div>
      <div className="max-w-[1100px] mx-auto">
        <FeaturedCase {...items[0]} />
      </div>
    </section>
  );
}

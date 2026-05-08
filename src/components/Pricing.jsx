function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Pricing({ rows, discounts, includes }) {
  const plan = rows[0];

  return (
    <section id="pricing" className="section bg-white">
      <div className="section__header">
        <span className="section__tag">Pricing</span>
        <h2 className="section__title">One platform. One transparent rate.</h2>
        <p className="section__subtitle">
          OmniServe is priced per user / month in GBP. Talk to us for a quote tailored to your modules and team size.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 sm:gap-6 items-stretch">
        <div className="card p-7 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-7 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[22px] font-bold text-ink tracking-[-0.01em]">{plan.service}</span>
              <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-blue-700 bg-blue-50 border border-blue-100 py-1 px-3 rounded-full">
                Full Platform
              </span>
            </div>
            <div className="text-[clamp(48px,6vw,72px)] font-extrabold text-ink leading-none tracking-[-0.03em] mt-5">
              {plan.rate}
            </div>
            <div className="text-[14px] text-ink-soft mt-2">{plan.model}</div>
            {plan.rateNote && (
              <div className="text-[13px] text-ink-mute leading-relaxed mt-3 max-w-[440px]">
                {plan.rateNote.split("contact us").map((part, i) =>
                  i === 0 ? part : (
                    <span key={i}>
                      <a href="#contact" className="text-blue-700 font-medium underline decoration-dotted">contact us</a>
                      {part}
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          <div className="border-t border-line" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 relative">
            {includes.map((item) => (
              <div key={item} className="flex items-start gap-3 text-[14px] text-ink">
                <span className="w-[18px] h-[18px] rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-[3px]">
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn--primary self-start mt-2">
            Get a tailored quote →
          </a>
        </div>

        <div className="bg-[#F5F8FF] border border-line rounded-[12px] p-6 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6">
          <div>
            <span className="eyebrow text-blue-700">Discounts available</span>
            <p className="text-[18px] font-bold text-ink mt-3 leading-snug">Three ways to bring it down.</p>
          </div>
          <ul className="flex flex-col gap-4">
            {discounts.map((item, i) => (
              <li key={item} className="flex gap-4 items-start">
                <span className="text-[13px] font-bold text-blue-700 tabular-nums w-6 shrink-0 pt-[1px]">
                  0{i + 1}
                </span>
                <span className="text-[14px] text-ink leading-[1.55]">{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line mt-auto" />
          <a href="#contact" className="text-[13px] font-semibold text-blue-700 inline-flex items-center gap-2">
            Talk to sales <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

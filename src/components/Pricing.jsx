export default function Pricing({ rows, discounts, includes }) {
  const plan = rows[0];

  return (
    <section id="pricing" className="section section--muted">
      <div className="section__header">
        <span className="section__tag">Transparent Pricing</span>
        <h2 className="section__title">No surprises. Just clear, competitive rates.</h2>
        <p className="section__subtitle">
          All pricing in GBP. Enterprise and custom scopes quoted on request.
        </p>
      </div>

      <div className="max-w-[800px] mx-auto">
        <div className="bg-navy border border-white/[0.14] rounded-2xl p-10 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-teal-500/[0.07] translate-x-[35%] -translate-y-1/2 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[24px] font-extrabold text-white tracking-[-0.03em]">
                {plan.service}
              </span>
              <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-teal-400 bg-teal-400/[0.15] border border-teal-400/[0.25] py-[3px] px-3 rounded-full">
                Full Platform
              </span>
            </div>

            <div className="pb-8 mb-8 border-b border-white/[0.10]">
              <div className="text-[52px] font-extrabold text-white leading-none tracking-[-0.04em] mb-2">
                {plan.rate}
              </div>
              <div className="text-[14px] text-[#7BAAC8]">{plan.model}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mb-10">
              {includes.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-[10px] text-[13px] text-blue-200
                             before:content-['✓'] before:text-teal-400 before:font-bold before:shrink-0 before:text-[12px]"
                >
                  {item}
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn--primary w-full justify-center py-4 text-[15px]">
              Get Early Access →
            </a>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-[10px] py-7 px-8">
          <div className="text-[13px] font-bold text-navy uppercase tracking-[0.05em] mb-4">
            Discounts available
          </div>
          <ul className="flex flex-col gap-[10px]">
            {discounts.map((item) => (
              <li
                key={item}
                className="flex items-start gap-[10px] text-[13px] text-[#526A96]
                           before:content-['→'] before:text-teal-500 before:font-bold before:shrink-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

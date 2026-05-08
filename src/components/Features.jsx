const ICONS = {
  link: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  ),
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
  chart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  card: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  ),
  building: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  ),
};

function FeatureIcon({ name, large }) {
  return (
    <div className={`flex items-center justify-center rounded-[10px] bg-blue-50 ${large ? "w-12 h-12" : "w-10 h-10"}`}>
      <svg
        className={`text-blue-700 ${large ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {ICONS[name]}
      </svg>
    </div>
  );
}

function HeroFeatureCard({ iconName, title, description }) {
  return (
    <article className="card p-9 flex flex-col gap-5 lg:row-span-2 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
      />
      <FeatureIcon name={iconName} large />
      <h3 className="text-[22px] font-bold text-ink leading-[1.2] tracking-[-0.01em]">{title}</h3>
      <p className="text-[15px] text-ink-soft leading-[1.65]">{description}</p>
    </article>
  );
}

function CompactFeatureCard({ iconName, title, description }) {
  return (
    <article className="card p-7 flex gap-5 items-start hover:shadow-card-lift hover:-translate-y-px transition-all duration-200">
      <FeatureIcon name={iconName} />
      <div>
        <h3 className="text-[15px] font-semibold text-ink mb-2">{title}</h3>
        <p className="text-[14px] text-ink-soft leading-[1.55]">{description}</p>
      </div>
    </article>
  );
}

export default function Features({ items }) {
  const [hero, ...rest] = items;
  return (
    <section id="features" className="section bg-white">
      <div className="section__header">
        <span className="section__tag">What it does</span>
        <h2 className="section__title">Everything your business runs on, in one hub.</h2>
        <p className="section__subtitle">
          OmniServe replaces disconnected tools with a single source of truth.
        </p>
      </div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-[1fr]">
        <HeroFeatureCard {...hero} />
        {rest.map((feature) => (
          <CompactFeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

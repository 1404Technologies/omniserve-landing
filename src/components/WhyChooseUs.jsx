export default function WhyChooseUs({ items }) {
  return (
    <section className="section bg-white">
      <div className="section__header">
        <span className="section__tag">Why OmniServe</span>
        <h2 className="section__title">Built for scale. Loved by operators.</h2>
        <p className="section__subtitle">
          Seven reasons growing businesses replace their tool stack with OmniServe.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 max-w-[1200px] mx-auto px-6">
        {items.map(({ stat, label }) => (
          <div
            key={label}
            className="bg-[#F5F8FF] border border-blue-100 rounded-2xl py-8 px-6 text-center transition-all duration-[250ms] hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="text-2xl font-extrabold text-blue-600 tracking-[-0.03em] mb-2">{stat}</div>
            <div className="text-[13px] text-[#354E7A] leading-normal">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

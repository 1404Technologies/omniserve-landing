export default function IntegrationsStrip({ items, caption }) {
  return (
    <section className="bg-white border-b border-line py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
        <div className="eyebrow text-blue-700 mb-3">Universal integration layer</div>
        <p className="text-[15px] text-ink-soft max-w-[640px] mb-8 leading-[1.6]">{caption}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          {items.map((name) => (
            <span
              key={name}
              className="bg-[#F5F8FF] border border-line rounded-full py-2 px-4 text-[13px] font-semibold text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

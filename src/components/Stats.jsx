export default function Stats({ items }) {
  return (
    <section className="bg-[#0F1A40] border-y border-white/[0.08] px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ value, label }, i) => (
          <div
            key={value}
            className={`py-9 px-6 ${i > 0 ? "lg:border-l border-white/[0.08]" : ""} ${
              i === 1 || i === 3 ? "border-l border-white/[0.08]" : ""
            } ${i >= 2 ? "border-t lg:border-t-0 border-white/[0.08]" : ""}`}
          >
            <div className="text-[26px] font-extrabold text-white leading-none mb-2 tracking-[-0.02em]">
              {value}
            </div>
            <div className="text-[12px] text-blue-200 leading-snug">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

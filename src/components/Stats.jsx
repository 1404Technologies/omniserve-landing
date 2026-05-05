export default function Stats({ items }) {
  return (
    <section className="bg-[#06101C] border-y border-white/[0.08] px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.08]">
        {items.map(({ value, label }) => (
          <div key={value} className="flex flex-col gap-[6px] py-8 px-8">
            <div className="flex items-center gap-[8px]">
              <span className="w-[6px] h-[6px] rounded-full bg-teal-400 shrink-0" />
              <span className="text-[14px] font-bold text-white tracking-[-0.01em]">{value}</span>
            </div>
            <div className="text-[12px] text-[#7BAAC8] leading-snug pl-[14px]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

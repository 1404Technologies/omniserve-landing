function TestimonialCard({ quote, author, role, featured }) {
  return (
    <div
      className={`bg-white border border-blue-100 rounded-2xl text-center shadow-sm flex flex-col
        ${featured ? "p-12 shadow-lg" : "p-8"}`}
    >
      <div className={`leading-none text-blue-600 opacity-20 font-serif mb-2 select-none ${featured ? "text-[64px]" : "text-[48px]"}`}>
        "
      </div>
      <p className={`leading-[1.7] text-navy italic mb-6 flex-1 ${featured ? "text-xl" : "text-[15px]"}`}>
        {quote}
      </p>
      <div>
        <div className={`font-bold text-navy ${featured ? "text-[15px]" : "text-[14px]"}`}>{author}</div>
        <div className="text-[13px] text-[#526A96] mt-1">{role}</div>
      </div>
    </div>
  );
}

export default function Testimonials({ items, certifications }) {
  const [featured, ...rest] = items;

  return (
    <section id="testimonials" className="section section--muted">
      <div className="section__header">
        <span className="section__tag">Testimonials</span>
        <h2 className="section__title">Trusted by businesses across the globe</h2>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <div className="max-w-[800px] mx-auto w-full">
          <TestimonialCard {...featured} featured />
        </div>

        {rest.length > 0 && (
          <div className={`grid gap-6 ${rest.length === 1 ? "grid-cols-1 max-w-[800px] mx-auto w-full" : "grid-cols-1 md:grid-cols-2"}`}>
            {rest.map(({ quote, author, role }) => (
              <TestimonialCard key={author} quote={quote} author={author} role={role} />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1200px] mx-auto mt-16 flex justify-center items-center gap-4 flex-wrap">
        <span className="text-[13px] text-[#526A96] font-medium mr-2">Certified &amp; compliant:</span>
        {certifications.map((cert) => (
          <span
            key={cert}
            className="inline-flex items-center gap-[6px] bg-[#F5F8FF] border border-blue-100
                       rounded-full py-2 px-4 text-[13px] font-semibold text-navy
                       before:content-['✓'] before:text-teal-500 before:font-bold before:text-[12px]"
          >
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
}

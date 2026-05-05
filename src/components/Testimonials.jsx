export default function Testimonials({ items, certifications }) {
  return (
    <section id="testimonials" className="section section--muted">
      <div className="section__header">
        <span className="section__tag">Testimonials</span>
        <h2 className="section__title">Trusted by businesses across the globe</h2>
      </div>

      <div className="max-w-[800px] mx-auto">
        {items.map(({ quote, author, role }) => (
          <div key={author} className="bg-white border border-blue-100 rounded-2xl p-12 text-center shadow-lg">
            <div className="text-[64px] leading-none text-blue-600 opacity-30 font-serif mb-2">"</div>
            <p className="text-xl leading-[1.7] text-navy italic mb-8">{quote}</p>
            <div className="text-[15px] font-bold text-navy">{author}</div>
            <div className="text-[13px] text-[#526A96] mt-1">{role}</div>
          </div>
        ))}
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

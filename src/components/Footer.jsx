import { contact, nav, parent, certifications } from "../data/content";

function Column({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-blue-300">{title}</div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#162050] text-white border-t border-white/[0.08] pt-14 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-12">
          <div>
            <img src="/logos/omniserve_logo_dark.svg" alt="OmniServe" className="h-11 w-auto mb-5" />
            <div className="text-[13px] text-blue-200 leading-relaxed max-w-[320px] mb-6">
              A unified operations platform by{" "}
              <a
                href={parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:underline font-medium"
              >
                {parent.name}
              </a>
              . Built for UK and U.S. SMEs.
            </div>

            <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-blue-300 mb-3">
              Compliant with
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {certifications.map(({ label }) => (
                <span
                  key={label}
                  className="text-[11px] font-semibold text-blue-100 bg-white/[0.05] border border-white/[0.10] rounded py-[4px] px-[10px]"
                >
                  {label.replace(" Compliant", "")}
                </span>
              ))}
            </div>
          </div>

          <Column title="Navigation">
            {nav.links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[13px] text-blue-200 hover:text-white transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </Column>

          <Column title="Offices">
            {contact.offices.map(({ label, tag }) => (
              <div key={label} className="flex items-center gap-2 text-[13px] text-blue-200">
                <span className="text-[10px] font-semibold text-teal-300 bg-white/[0.05] border border-white/[0.10] rounded py-[2px] px-[6px] tabular-nums">
                  {tag}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </Column>

          <Column title="Contact">
            <a href={`mailto:${contact.email}`} className="text-[13px] text-blue-200 hover:text-white transition-colors">
              {contact.email}
            </a>
            {contact.phones.map(({ tag, number }) => (
              <div key={number} className="flex items-center gap-2 text-[13px] text-blue-200">
                <span className="text-[10px] font-semibold text-teal-300 w-9 shrink-0">{tag}</span>
                <a href={`tel:${number.replace(/\s+/g, "")}`} className="hover:text-white">{number}</a>
              </div>
            ))}
            <a
              href={parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-teal-300 hover:underline font-medium mt-1"
            >
              {contact.website}
            </a>
          </Column>
        </div>

        <div className="border-t border-white/[0.08] mt-12 pt-6 text-[12px] text-blue-300/80 leading-relaxed">
          {parent.name} Limited &middot; Registered office: {contact.offices[0].address}
        </div>

        <div className="border-t border-white/[0.08] mt-6 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[12px] text-blue-300/70">
            © {new Date().getFullYear()} {parent.name} Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-blue-300/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-blue-300/80 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

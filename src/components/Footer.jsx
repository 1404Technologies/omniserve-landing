import { contact, nav } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/[0.11] py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <img src="/logos/omniserve_logo_dark.svg" alt="OmniServe" className="h-16 w-auto mb-2" />
            <div className="text-[12px] text-[#7BAAC8]">
              A product of{" "}
              <a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                1404 Technologies
              </a>
            </div>
            <div className="text-[12px] text-[#7BAAC8] mt-1">HQ: London · U.S. · Nigeria</div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8]">Platform</div>
            <ul className="flex flex-col gap-2">
              {nav.links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[13px] text-[#7BAAC8] hover:text-teal-400 transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#7BAAC8]">Contact</div>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="text-[13px] text-[#7BAAC8] hover:text-teal-400 transition-colors duration-150"
              >
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <span key={phone} className="text-[13px] text-[#7BAAC8]">{phone}</span>
              ))}
              <a
                href={`https://${contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-teal-400 hover:underline"
              >
                {contact.website}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[12px] text-[#7BAAC8]">
            © {new Date().getFullYear()} OmniServe. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-[#7BAAC8] hover:text-teal-400 transition-colors duration-150"
            >
              Privacy Policy
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-[#7BAAC8] hover:text-teal-400 transition-colors duration-150"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

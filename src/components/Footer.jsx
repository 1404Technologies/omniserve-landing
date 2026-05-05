import { contact } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/[0.11] py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-6 flex-wrap">
        <div>
          <img src="/logos/omniserve_logo_dark.svg" alt="OmniServe" className="h-16 w-auto mb-1" />
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
        </div>
        <div className="text-[13px] text-[#7BAAC8] text-right">
          <div>© {new Date().getFullYear()} OmniServe. All rights reserved.</div>
          <div>HQ: London · U.S. · Nigeria</div>
          <a
            href={`https://${contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            {contact.website}
          </a>
        </div>
      </div>
    </footer>
  );
}

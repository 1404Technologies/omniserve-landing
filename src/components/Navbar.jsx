import { useState, useEffect } from "react";
import { parent } from "../data/content";

export default function Navbar({ links }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = links.map((l) => l.toLowerCase());
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-line shadow-[0_1px_2px_rgba(15,27,58,0.04)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[64px] sm:h-[72px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          <a
            href={parent.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${parent.name} (parent company)`}
            title={`Visit ${parent.name}`}
            className="hidden sm:block shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <img src={parent.logo} alt={parent.name} className="h-8 sm:h-9 w-auto" />
          </a>
          <span aria-hidden="true" className="hidden sm:block h-7 w-px bg-line" />
          <a href="#" aria-label="OmniServe — home" className="shrink-0">
            <img src="/logos/omniserve_logo_light.svg" alt="OmniServe" className="h-8 sm:h-10 w-auto" />
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`text-[13px] font-medium transition-colors duration-150 relative
                    ${isActive ? "text-blue-700" : "text-ink-soft hover:text-ink"}`}
                >
                  {link}
                  {isActive && (
                    <span className="absolute -bottom-[24px] left-0 right-0 h-[2px] bg-blue-700 rounded-full" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href="#contact"
            className="btn btn--primary py-[9px] px-3 sm:px-5 text-[12px] sm:text-[13px] whitespace-nowrap"
          >
            <span className="sm:hidden">Get access</span>
            <span className="hidden sm:inline">Get Early Access</span>
          </a>
          <button
            type="button"
            className="md:hidden relative flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-ink origin-center transition-transform duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink origin-center transition-transform duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-line shadow-[0_8px_16px_rgba(15,27,58,0.06)]">
          <ul className="flex flex-col px-5 pt-2 pb-4">
            {links.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <li key={link} className="border-b border-line/70 last:border-b-0">
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`block py-4 text-[17px] font-medium transition-colors duration-150
                      ${isActive ? "text-blue-700" : "text-ink-soft hover:text-ink"}`}
                  >
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/[0.94] backdrop-blur-md border-b border-line shadow-[0_1px_2px_rgba(15,27,58,0.04)]">
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={parent.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${parent.name} (parent company)`}
            title={`Visit ${parent.name}`}
            className="shrink-0 transition-opacity duration-150 hover:opacity-80"
          >
            <img src={parent.logo} alt={parent.name} className="h-9 w-auto" />
          </a>
          <span aria-hidden="true" className="h-7 w-px bg-line" />
          <a href="#" aria-label="OmniServe — home" className="shrink-0">
            <img src="/logos/omniserve_logo_light.svg" alt="OmniServe" className="h-10 w-auto" />
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8">
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

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn--primary py-[10px] px-5 text-[13px]">
            Get Early Access
          </a>
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-ink origin-center transition-transform duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink origin-center transition-transform duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-[220ms] ease-in-out
          ${open ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border-t border-line px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium transition-colors duration-150
                ${activeSection === link.toLowerCase() ? "text-blue-700" : "text-ink-soft hover:text-ink"}`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

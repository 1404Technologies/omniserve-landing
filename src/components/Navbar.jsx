import { useState, useEffect } from "react";

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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/[0.92] backdrop-blur-md shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <a href="#" className="shrink-0">
          <img src="/logos/omniserve_logo_light.svg" alt="OmniServe" className="h-12 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {links.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`text-[13px] font-medium transition-colors duration-150 relative
                    ${isActive ? "text-blue-600" : "text-[#526A96] hover:text-blue-600"}`}
                >
                  {link}
                  {isActive && (
                    <span className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn--primary py-[10px] px-5 text-[13px]">
            Get Early Access
          </a>
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block w-5 h-[2px] bg-navy origin-center transition-transform duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-navy transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-navy origin-center transition-transform duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-[220ms] ease-in-out
          ${open ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white/[0.97] border-t border-blue-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium transition-colors duration-150
                ${activeSection === link.toLowerCase() ? "text-blue-600" : "text-[#526A96] hover:text-blue-600"}`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

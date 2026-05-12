import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { parent } from "../data/content";
import { ease, duration } from "../lib/motion";

export default function Navbar({ links }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.toLowerCase());
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  return (
    <motion.nav
      initial={reduced ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: duration.base, ease: ease.out }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.92] backdrop-blur-xl shadow-[0_1px_0_rgba(15,27,58,0.06),0_8px_24px_-12px_rgba(15,27,58,0.18)]"
          : "bg-white/[0.70] backdrop-blur-md"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 transition-[height] duration-300 ${
          scrolled ? "h-[60px]" : "h-[76px]"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          <a
            href={parent.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${parent.name} (parent company)`}
            title={`Visit ${parent.name}`}
            className="hidden sm:block shrink-0"
          >
            <motion.img
              src={parent.logo}
              alt={parent.name}
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-7" : "h-8"}`}
              whileHover={reduced ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.2 }}
            />
          </a>
          <span aria-hidden="true" className="hidden sm:block h-7 w-px bg-line" />
          <a href="#" aria-label="OmniServe — home" className="shrink-0">
            <motion.img
              src="/logos/omniserve_logo_light.svg"
              alt="OmniServe"
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-8" : "h-10"}`}
              whileHover={reduced ? undefined : { scale: 1.03 }}
              transition={{ duration: 0.2 }}
            />
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeId === id;
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  className={`relative inline-flex text-[13px] font-medium tracking-[-0.005em] py-2 px-3.5 rounded-lg transition-colors duration-200 ${
                    isActive ? "text-blue-700" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && !reduced && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-blue-600/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <motion.a
            href="#contact"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="btn btn--primary py-[9px] px-3 sm:px-5 text-[12px] sm:text-[13px] whitespace-nowrap"
          >
            <span className="sm:hidden">Get access</span>
            <span className="hidden sm:inline">Get Early Access</span>
            <span aria-hidden>→</span>
          </motion.a>
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: ease.inOut }}
              className="block w-5 h-[2px] bg-ink origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-[2px] bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: ease.inOut }}
              className="block w-5 h-[2px] bg-ink origin-center"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: ease.inOut }}
            className="md:hidden overflow-hidden bg-white/[0.97] backdrop-blur-xl border-t border-line"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="px-6 py-5 flex flex-col gap-3"
            >
              {links.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: ease.out } },
                  }}
                  className="text-[15px] font-medium text-ink-soft hover:text-blue-700 transition-colors duration-150"
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

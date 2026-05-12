import { motion, useReducedMotion } from "framer-motion";
import { contact, nav, parent, certifications } from "../data/content";
import { ease, container, fadeUp } from "../lib/motion";

function HoverLink({ href, children, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="text-[13px] text-blue-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
    >
      <span
        aria-hidden
        className="w-1 h-1 rounded-full bg-teal-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      />
      {children}
    </a>
  );
}

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="bg-navy-2 text-white border-t border-white/[0.08] pt-14 sm:pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 0%, #000, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 0%, #000, transparent 80%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container(0.08)}
        className="max-w-[1200px] mx-auto relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-12 mb-12">
          <motion.div variants={fadeUp}>
            <a href="#" className="inline-block mb-5 group">
              <motion.img
                src="/logos/omniserve_logo_dark.svg"
                alt="OmniServe"
                className="h-11 w-auto"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                transition={{ duration: 0.25 }}
              />
            </a>
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
              {certifications.map(({ label }, i) => (
                <motion.span
                  key={label}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: ease.out }}
                  whileHover={reduced ? undefined : { y: -2, borderColor: "rgba(94,234,212,0.40)" }}
                  className="text-[11px] font-semibold text-blue-100 bg-white/[0.05] border border-white/[0.10] rounded py-[4px] px-[10px] cursor-default"
                >
                  {label.replace(" Compliant", "")}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-blue-300">Navigation</div>
            <div className="flex flex-col gap-[10px]">
              {nav.links.map((link) => (
                <HoverLink key={link} href={`#${link.toLowerCase()}`}>{link}</HoverLink>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-blue-300">Offices</div>
            <div className="flex flex-col gap-[10px]">
              {contact.offices.map(({ label, tag }) => (
                <div key={label} className="flex items-center gap-2 text-[13px] text-blue-200">
                  <span className="text-[10px] font-semibold text-teal-300 bg-white/[0.05] border border-white/[0.10] rounded py-[2px] px-[6px] tabular-nums">
                    {tag}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-blue-300">Contact</div>
            <div className="flex flex-col gap-[10px]">
              <a href={`mailto:${contact.email}`} className="text-[13px] text-blue-200 hover:text-white transition-colors duration-200">
                {contact.email}
              </a>
              {contact.phones.map(({ tag, number }) => (
                <div key={number} className="flex items-center gap-2 text-[13px] text-blue-200">
                  <span className="text-[10px] font-semibold text-teal-300 w-9 shrink-0">{tag}</span>
                  <a href={`tel:${number.replace(/\s+/g, "")}`} className="hover:text-white transition-colors duration-200">{number}</a>
                </div>
              ))}
              <motion.a
                href={parent.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? undefined : { x: 2 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] text-teal-300 hover:underline font-medium mt-1"
              >
                {contact.website}
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="border-t border-white/[0.08] pt-6 text-[12px] text-blue-300/80 leading-relaxed">
          {parent.name} Limited &middot; Registered office: {contact.offices[0].address}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="border-t border-white/[0.08] mt-6 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <div className="text-[12px] text-blue-300/70">
            © {new Date().getFullYear()} {parent.name} Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-2 -my-2">
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-blue-300/80 hover:text-white transition-colors duration-200 py-2 px-2"
            >
              Privacy Policy
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-[12px] text-blue-300/80 hover:text-white transition-colors duration-200 py-2 px-2"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

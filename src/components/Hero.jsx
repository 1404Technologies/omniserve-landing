import { motion, useReducedMotion } from "framer-motion";
import CertPill from "./CertPill";
import HubVisual from "./HubVisual";
import BackgroundBeams from "./ui/BackgroundBeams";
import MagneticButton from "./ui/MagneticButton";
import TextReveal from "./ui/TextReveal";
import { ease, duration, container, fadeUp } from "../lib/motion";

export default function Hero({ tag, headline, headlineAccent, subheadline, cta, ctaSecondary, certifications }) {
  const reduced = useReducedMotion();

  return (
    <section className="bg-navy text-white relative overflow-hidden pt-[100px] sm:pt-[120px] pb-16 sm:pb-20 px-4 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 78% 30%, rgba(20,184,166,0.13) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 10% 75%, rgba(37,99,235,0.16) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black 0%, transparent 75%)",
        }}
      />
      <BackgroundBeams className="opacity-60" />

      <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] gap-10 sm:gap-12 lg:gap-16 items-center relative">
        <motion.div initial="hidden" animate="visible" variants={container(0.1, 0.05)}>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-[10px] text-[11px] font-semibold tracking-[0.14em] uppercase text-teal-300 bg-teal-400/[0.10] border border-teal-400/[0.30] py-[7px] pl-[10px] pr-4 rounded-full mb-6 sm:mb-7 backdrop-blur-sm"
          >
            <motion.span
              className="w-[6px] h-[6px] rounded-full bg-teal-300"
              animate={reduced ? undefined : { opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            {tag}
          </motion.div>

          <h1 className="text-[clamp(28px,5.6vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] mb-5 sm:mb-6">
            <TextReveal text={headline} as="span" className="block" />{" "}
            <span className="block">
              <TextReveal
                text={headlineAccent}
                as="span"
                className="text-teal-300 font-semibold"
                delayChildren={headline.split(" ").length * 0.06 + 0.05}
              />
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-[15px] sm:text-[16px] text-blue-200 leading-[1.7] mb-7 sm:mb-8 max-w-[520px]"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={container(0.06, 0.15)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-7 sm:mb-8"
          >
            {certifications.map(({ label, color }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: duration.fast, ease: ease.out } },
                }}
                whileHover={reduced ? undefined : { y: -2, scale: 1.04 }}
                transition={{ duration: 0.2, ease: ease.out }}
              >
                <CertPill label={label} color={color} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
            <MagneticButton as="a" href="#contact" className="btn btn--primary" strength={12}>
              <span>{cta}</span>
              <motion.span
                aria-hidden
                className="inline-block"
                animate={reduced ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </MagneticButton>
            <MagneticButton as="a" href="#features" className="btn btn--outline-white" strength={10}>
              {ctaSecondary}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.25 }}
          className="order-first lg:order-last"
        >
          <HubVisual />
        </motion.div>
      </div>
    </section>
  );
}

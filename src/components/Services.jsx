import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import Reveal, { RevealItem } from "./ui/Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import TextReveal from "./ui/TextReveal";
import { ease, container, fadeUp } from "../lib/motion";

const INDUSTRY_ICON = {
  Healthcare: "healthcare",
  Construction: "construction",
  Logistics: "logistics",
};

function IndustryCard({ title, description, highlights, benefit }) {
  const reduced = useReducedMotion();
  return (
    <RevealItem className="h-full">
      <SpotlightCard
        spotlightColor="rgba(94, 234, 212, 0.12)"
        size={360}
        className="group h-full bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.10] rounded-[14px] p-6 sm:p-8 overflow-hidden hover:border-teal-400/[0.40] hover:bg-white/[0.04] transition-[border-color,background-color] duration-500"
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"
        />

        <div className="flex items-center justify-between mb-5">
          <motion.div
            whileHover={reduced ? undefined : { rotate: -8, scale: 1.06 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="w-11 h-11 rounded-[10px] bg-teal-400/[0.12] border border-teal-400/[0.24] flex items-center justify-center"
          >
            <Icon name={INDUSTRY_ICON[title]} className="w-5 h-5 text-teal-300" />
          </motion.div>
          <span className="relative inline-flex items-center text-[10px] font-bold tracking-[0.12em] uppercase text-teal-300 bg-teal-400/[0.10] border border-teal-400/[0.20] py-[5px] px-3 rounded-full overflow-hidden">
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(94,234,212,0.55) 50%, transparent 70%)",
                }}
                animate={{ x: ["-100%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
            )}
            <span className="relative">{benefit}</span>
          </span>
        </div>

        <h3 className="text-[20px] font-bold text-white mb-3 tracking-[-0.01em]">{title}</h3>
        <p className="text-[14px] text-blue-200 leading-[1.65] mb-5">{description}</p>

        <div className="border-t border-white/[0.08] pt-5">
          <ul className="flex flex-col gap-[10px]">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] text-blue-100">
                <span className="text-teal-300 shrink-0 mt-[3px]">
                  <Icon name="check" className="w-[12px] h-[12px]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </RevealItem>
  );
}

export default function Services({ items }) {
  return (
    <section id="industries" className="section section--dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 100%, rgba(20,184,166,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(37,99,235,0.20) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container(0.08)}
        className="section__header relative"
      >
        <motion.span variants={fadeUp} className="section__tag">Built for industry</motion.span>
        <motion.h2 variants={fadeUp} className="section__title text-white">
          <TextReveal text="Tuned for Healthcare, Construction, and Logistics." />
        </motion.h2>
        <motion.p variants={fadeUp} className="section__subtitle">
          OmniServe ships with industry modules that bake compliance into the workflow and connect field teams to office systems in real time.
        </motion.p>
      </motion.div>

      <Reveal
        staggerChildrenMode
        gap={0.09}
        amount={0.1}
        className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative"
      >
        {items.map((item) => (
          <IndustryCard key={item.title} {...item} />
        ))}
      </Reveal>
    </section>
  );
}

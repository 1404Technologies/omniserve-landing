import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import Reveal, { RevealItem } from "./ui/Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import TextReveal from "./ui/TextReveal";
import { ease, container, fadeUp } from "../lib/motion";

function FeatureIcon({ name, large }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { rotate: -6, scale: 1.06 }}
      transition={{ duration: 0.4, ease: ease.out }}
      className={`flex items-center justify-center rounded-[10px] bg-blue-50 ${large ? "w-12 h-12" : "w-10 h-10"}`}
    >
      <Icon
        name={name}
        className={`text-blue-700 ${large ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]"}`}
      />
    </motion.div>
  );
}

function HeroFeatureCard({ iconName, title, description }) {
  return (
    <RevealItem className="sm:col-span-2 lg:col-span-1 lg:row-span-2 h-full">
      <SpotlightCard
        spotlightColor="rgba(37, 99, 235, 0.10)"
        size={420}
        className="group card p-7 sm:p-9 gap-5 h-full overflow-hidden hover:shadow-card-lift transition-shadow duration-500"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
        />
        <FeatureIcon name={iconName} large />
        <h3 className="text-[20px] sm:text-[22px] font-bold text-ink leading-[1.2] tracking-[-0.01em] mt-5">{title}</h3>
        <p className="text-[15px] text-ink-soft leading-[1.65] mt-3">{description}</p>
      </SpotlightCard>
    </RevealItem>
  );
}

function CompactFeatureCard({ iconName, title, description }) {
  return (
    <RevealItem className="h-full">
      <SpotlightCard
        spotlightColor="rgba(37, 99, 235, 0.10)"
        size={320}
        className="group card p-6 sm:p-7 h-full hover:shadow-card-lift hover:border-line-strong transition-[box-shadow,border-color] duration-500"
      >
        <div className="flex gap-4 sm:gap-5 items-start">
          <FeatureIcon name={iconName} />
          <div>
            <h3 className="text-[15px] font-semibold text-ink mb-2">{title}</h3>
            <p className="text-[14px] text-ink-soft leading-[1.55]">{description}</p>
          </div>
        </div>
      </SpotlightCard>
    </RevealItem>
  );
}

export default function Features({ items }) {
  const [hero, ...rest] = items;
  return (
    <section id="features" className="section bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container(0.08)}
        className="section__header"
      >
        <motion.span variants={fadeUp} className="section__tag">What it does</motion.span>
        <motion.h2 variants={fadeUp} className="section__title">
          <TextReveal text="Everything your business runs on, in one hub." />
        </motion.h2>
        <motion.p variants={fadeUp} className="section__subtitle">
          OmniServe replaces disconnected tools with a single source of truth.
        </motion.p>
      </motion.div>

      <Reveal
        staggerChildrenMode
        gap={0.08}
        amount={0.1}
        className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:auto-rows-[1fr]"
      >
        <HeroFeatureCard {...hero} />
        {rest.map((feature) => (
          <CompactFeatureCard key={feature.title} {...feature} />
        ))}
      </Reveal>
    </section>
  );
}

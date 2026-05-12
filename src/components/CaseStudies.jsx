import { motion } from "framer-motion";
import Icon from "./Icon";
import Reveal from "./ui/Reveal";
import NumberTicker from "./ui/NumberTicker";
import TextReveal from "./ui/TextReveal";
import { ease, duration, container, fadeUp } from "../lib/motion";

function FeaturedCase({ client, location, challenge, impact }) {
  const [primary, ...rest] = impact;
  const match = primary.match(/^(\S+)\s+(.*)$/);
  const primaryNumber = match ? match[1] : primary;
  const primaryRest = match ? match[2] : "";

  return (
    <motion.article
      className="card p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container(0.1, 0.05)}
    >
      <motion.div
        variants={fadeUp}
        className="p-7 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-7 border-b lg:border-b-0 lg:border-r border-line"
      >
        <div className="eyebrow text-blue-700">Featured client</div>
        <div>
          <div className="text-[15px] font-semibold text-ink">{client}</div>
          <div className="text-[13px] text-ink-mute">{location}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-mute mb-2">
            Challenge
          </div>
          <p className="text-[15px] text-ink-soft leading-[1.65]">{challenge}</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="bg-surface-tint2 p-7 sm:p-10 lg:p-12 flex flex-col gap-6"
      >
        <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-700">
          Impact with OmniServe
        </div>
        <div>
          <div className="text-[clamp(56px,7vw,80px)] font-extrabold text-blue-700 leading-[1] tracking-[-0.03em]">
            <NumberTicker>{primaryNumber}</NumberTicker>
          </div>
          <div className="text-[15px] text-ink mt-2 max-w-[260px]">{primaryRest}</div>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          {rest.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: 0.3 + i * 0.08, duration: duration.fast, ease: ease.out }}
              className="flex items-start gap-3 text-[14px] text-ink"
            >
              <span className="w-[18px] h-[18px] rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-[2px]">
                <Icon name="check" className="w-3 h-3" />
              </span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function CaseStudies({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="section section--muted">
      <Reveal className="section__header">
        <span className="section__tag">Client outcome</span>
        <h2 className="section__title">
          <TextReveal text="Audit-ready, in production." />
        </h2>
        <p className="section__subtitle">
          A real OmniServe deployment with measured results.
        </p>
      </Reveal>
      <div className="max-w-[1100px] mx-auto">
        <FeaturedCase {...items[0]} />
      </div>
    </section>
  );
}

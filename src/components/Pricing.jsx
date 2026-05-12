import { motion } from "framer-motion";
import Icon from "./Icon";
import Reveal, { RevealItem } from "./ui/Reveal";
import BorderBeam from "./ui/BorderBeam";
import MagneticButton from "./ui/MagneticButton";
import TextReveal from "./ui/TextReveal";
import { ease, duration, container, fadeUp } from "../lib/motion";

export default function Pricing({ rows, discounts, includes }) {
  const plan = rows[0];

  return (
    <section id="pricing" className="section bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container(0.08)}
        className="section__header"
      >
        <motion.span variants={fadeUp} className="section__tag">Pricing</motion.span>
        <motion.h2 variants={fadeUp} className="section__title">
          <TextReveal text="One platform. One transparent rate." />
        </motion.h2>
        <motion.p variants={fadeUp} className="section__subtitle">
          OmniServe is priced per user / month in GBP. Talk to us for a quote tailored to your modules and team size.
        </motion.p>
      </motion.div>

      <Reveal
        staggerChildrenMode
        gap={0.1}
        amount={0.1}
        className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 sm:gap-6 items-stretch"
      >
        <RevealItem className="h-full">
          <div className="relative card p-7 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-7 overflow-hidden h-full">
            <BorderBeam color="#2563EB" duration={9} glowOpacity={0.45} thickness={1.4} />
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[22px] font-bold text-ink tracking-[-0.01em]">{plan.service}</span>
                <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-blue-700 bg-blue-50 border border-blue-100 py-1 px-3 rounded-full">
                  Full Platform
                </span>
              </div>
              <div className="text-[clamp(48px,6vw,72px)] font-extrabold text-ink leading-none tracking-[-0.03em] mt-5">
                {plan.rate}
              </div>
              <div className="text-[14px] text-ink-soft mt-2">{plan.model}</div>
              {plan.rateNote && (
                <div className="text-[13px] text-ink-mute leading-relaxed mt-3 max-w-[440px]">
                  {plan.rateNote.split("contact us").map((part, i) =>
                    i === 0 ? part : (
                      <span key={i}>
                        <a href="#contact" className="text-blue-700 font-medium underline decoration-dotted">contact us</a>
                        {part}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-line" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 relative">
              {includes.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3 text-[14px] text-ink"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: 0.2 + i * 0.04, duration: duration.fast, ease: ease.out }}
                >
                  <span className="w-[18px] h-[18px] rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-[3px]">
                    <Icon name="check" className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <MagneticButton as="a" href="#contact" className="btn btn--primary self-start mt-2" strength={12}>
              <span>Get a tailored quote</span>
              <motion.span
                aria-hidden
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </MagneticButton>
          </div>
        </RevealItem>

        <RevealItem className="h-full">
          <div className="bg-surface-tint border border-line rounded-[12px] p-6 sm:p-8 lg:p-10 flex flex-col gap-5 sm:gap-6 h-full">
            <div>
              <span className="eyebrow text-blue-700">Discounts available</span>
              <p className="text-[18px] font-bold text-ink mt-3 leading-snug">Three ways to bring it down.</p>
            </div>
            <ul className="flex flex-col gap-4">
              {discounts.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: 0.3 + i * 0.07, duration: duration.fast, ease: ease.out }}
                >
                  <span className="text-[13px] font-bold text-blue-700 tabular-nums w-6 shrink-0 pt-[1px]">
                    0{i + 1}
                  </span>
                  <span className="text-[14px] text-ink leading-[1.55]">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-line mt-auto" />
            <a href="#contact" className="text-[13px] font-semibold text-blue-700 inline-flex items-center gap-2 group">
              Talk to sales
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { ease, duration } from "../../lib/motion";

export default function TextReveal({
  text,
  as = "span",
  className = "",
  delayChildren = 0,
  staggerChildren = 0.06,
  wordClassName = "",
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  const Component = motion[as] || motion.span;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block overflow-hidden align-bottom ${wordClassName}`}
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: { duration: duration.slow, ease: ease.out } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

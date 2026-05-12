import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, container, stagger } from "../../lib/motion";

export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  amount = 0.18,
  gap = stagger.default,
  staggerChildrenMode = false,
  variants,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduced) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }

  const finalVariants =
    variants ||
    (staggerChildrenMode
      ? container(gap, delay)
      : { ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } });

  return (
    <Component
      className={className}
      variants={finalVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, as = "div", className = "", ...rest }) {
  const reduced = useReducedMotion();
  if (reduced) {
    const Static = as;
    return <Static className={className} {...rest}>{children}</Static>;
  }
  const Component = motion[as] || motion.div;
  return (
    <Component className={className} variants={fadeUp} {...rest}>
      {children}
    </Component>
  );
}

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { magneticSpring } from "../../lib/motion";

export default function MagneticButton({
  children,
  as = "a",
  strength = 18,
  className = "",
  innerClassName = "",
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, magneticSpring);
  const sy = useSpring(y, magneticSpring);

  function handleMove(e) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    const max = Math.max(rect.width, rect.height) / 2;
    x.set((px / max) * strength);
    y.set((py / max) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Component = motion[as] || motion.a;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={className}
      {...rest}
    >
      <motion.span
        className={`inline-flex items-center gap-2 ${innerClassName}`}
        style={reduced ? undefined : { x: sx, y: sy }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

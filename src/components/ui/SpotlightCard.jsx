import { useRef } from "react";
import { useMotionValue, useMotionTemplate, motion, useReducedMotion } from "framer-motion";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(37, 99, 235, 0.12)",
  size = 360,
  as = "div",
  ...rest
}) {
  const ref = useRef(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const reduced = useReducedMotion();

  function handleMove(e) {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }
  function handleLeave() {
    mx.set(-9999);
    my.set(-9999);
  }

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, ${spotlightColor}, transparent 60%)`;
  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
      {...rest}
    >
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: bg }}
        />
      )}
      <span className="relative z-[1] flex flex-col h-full">{children}</span>
    </Component>
  );
}

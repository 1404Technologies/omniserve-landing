import { motion } from "framer-motion";

const BEAMS = [
  { d: "M-100 200 Q 200 80 500 220 T 1100 180", delay: 0 },
  { d: "M-120 360 Q 250 260 600 380 T 1200 340", delay: 1.2 },
  { d: "M-80 520 Q 220 420 560 540 T 1180 500", delay: 2.4 },
  { d: "M-140 100 Q 300 0 660 120 T 1240 80", delay: 3.6 },
];

export default function BackgroundBeams({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0" />
          <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-gradient-2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
          <stop offset="50%" stopColor="#5EEAD4" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {BEAMS.map((beam, i) => (
        <g key={i}>
          <path
            d={beam.d}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            d={beam.d}
            stroke={i % 2 === 0 ? "url(#beam-gradient)" : "url(#beam-gradient-2)"}
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1] }}
            transition={{
              duration: 7,
              delay: beam.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}
    </svg>
  );
}

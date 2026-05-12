import { motion, useReducedMotion } from "framer-motion";
import AnimatedBeam from "./ui/AnimatedBeam";
import { ease, duration } from "../lib/motion";

const NODES = [
  { label: "Salesforce", logo: "/logos/integrations/salesforce.svg", x: 50, y: 10, anchor: "bottom", delay: 0.0, drift: -3 },
  { label: "QuickBooks", logo: "/logos/integrations/quickbooks.svg", x: 78, y: 32, anchor: "left", delay: 0.4, drift: 4 },
  { label: "MS Project", logo: "/logos/integrations/ms-project.svg", x: 68, y: 88, anchor: "top", delay: 0.8, drift: -3 },
  { label: "Trello", logo: "/logos/integrations/trello.svg", x: 32, y: 88, anchor: "top", delay: 1.2, drift: 3 },
  { label: "Xero", logo: "/logos/integrations/xero.svg", x: 14, y: 32, anchor: "right", delay: 0.6, drift: -4 },
];

const ANCHOR_CLASSES = {
  bottom: "-translate-x-1/2 -translate-y-full",
  top: "-translate-x-1/2",
  left: "-translate-y-1/2",
  right: "-translate-x-full -translate-y-1/2",
};

function IntegrationChip({ label, logo, x, y, anchor, delay, drift, reduce }) {
  return (
    <motion.div
      className={`absolute z-10 ${ANCHOR_CLASSES[anchor]}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration.base, ease: ease.out, delay: 0.6 + delay * 0.25 }}
    >
      <motion.div
        animate={reduce ? {} : { rotate: [0, drift, 0, -drift, 0], y: [0, -4, 0, 4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <motion.div
          whileHover={reduce ? {} : { scale: 1.05, y: -2 }}
          transition={{ duration: 0.3, ease: ease.out }}
          className="group relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(94,234,212,0.35) 0%, rgba(37,99,235,0.18) 45%, transparent 75%)",
              filter: "blur(12px)",
            }}
          />
          <div
            className="relative flex items-center gap-[10px] py-[10px] pl-[10px] pr-[14px] rounded-[14px] backdrop-blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(94,234,212,0.04)",
            }}
          >
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              <img src={logo} alt="" className="w-[22px] h-[22px] object-contain" />
            </div>
            <span className="text-[12.5px] font-semibold text-white whitespace-nowrap leading-none tracking-[-0.005em]">
              {label}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function NodeLines() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {NODES.map(({ x, y, label }, i) => (
        <AnimatedBeam
          key={label}
          id={`beam-${label.replace(/\s+/g, "")}`}
          x1={50}
          y1={50}
          x2={x}
          y2={y}
          delay={i * 0.3}
        />
      ))}
    </svg>
  );
}

export default function HubVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto">
      <motion.div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(37,99,235,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={reduce ? {} : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <NodeLines />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[24%] rounded-full border border-white/[0.10] pointer-events-none"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full border border-white/[0.05] pointer-events-none"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 -m-12 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(20,184,166,0.45) 0%, rgba(20,184,166,0.15) 35%, transparent 70%)",
              filter: "blur(10px)",
            }}
            animate={reduce ? {} : { opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/logos/omniserve_symbol_dark.svg"
            alt="OmniServe"
            className="relative w-[130px] h-[130px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
            animate={reduce ? {} : { scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      {NODES.map((node) => (
        <IntegrationChip key={node.label} {...node} reduce={reduce} />
      ))}
    </div>
  );
}

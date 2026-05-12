import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ease } from "../../lib/motion";

export default function ScrollProgress() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const dash = useTransform(scrollYProgress, (v) => 100 - v * 100);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="stt"
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.3, ease: ease.out }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-7 right-7 z-[60] w-12 h-12 rounded-full bg-blue-600 text-white
                     shadow-[0_8px_28px_-6px_rgba(37,99,235,0.55)] hover:bg-blue-700
                     transition-colors duration-200 flex items-center justify-center group"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44" aria-hidden>
            <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
            <motion.circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              style={{ strokeDashoffset: dash }}
            />
          </svg>
          <svg
            className="w-4 h-4 relative transition-transform duration-200 group-hover:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

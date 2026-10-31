"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useLenis } from "./providers/SmoothScroll";

/** Top progress bar + circular back-to-top button with progress ring. */
export default function ScrollUI() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.08));

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[120] h-[3px] origin-left bg-puma" style={{ scaleX: progress }} />
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -4 }}
            onClick={toTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-[90] grid h-14 w-14 place-items-center rounded-full bg-coal/80 text-bone backdrop-blur"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#e10600" strokeWidth="2" style={{ pathLength: progress }} />
            </svg>
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

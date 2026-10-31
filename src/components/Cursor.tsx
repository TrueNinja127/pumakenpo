"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Two-part custom cursor: a precise dot plus a lagging ring that grows over interactive elements. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      setHover(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 84 : hover ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center rounded-full border border-puma mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(225,6,0,1)" : hover ? "rgba(225,6,0,0.18)" : "rgba(225,6,0,0)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && <span className="font-display text-sm tracking-widest text-white">{label}</span>}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 rounded-full bg-puma"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </>
  );
}

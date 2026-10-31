"use client";

import { motion, useTransform, type HTMLMotionProps } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useRef } from "react";
import { clsx } from "clsx";

type Dir = "up" | "down" | "left" | "right" | "none";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 60 },
  right: { x: -60 },
  none: {},
};

type Props = HTMLMotionProps<"div"> & { delay?: number; dir?: Dir; once?: boolean; amount?: number };

export function Reveal({ delay = 0, dir = "up", once = true, amount = 0.25, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offset[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct `StaggerItem` children into view. */
export function Stagger({ children, className, stagger = 0.1, delay = 0 }: { children: React.ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image wrapper that wipes in with a clip-path and a slow scale-down, then keeps
 * drifting inside its frame as the page scrolls (parallax depth).
 */
export function ImageReveal({ children, className, delay = 0, from = "bottom", parallax = 9 }: { children: React.ReactNode; className?: string; delay?: number; from?: "bottom" | "left" | "right"; parallax?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const start = {
    bottom: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  // The clip-path lives on the inner layer: a fully clipped element never reports as in view,
  // so the outer wrapper owns the viewport trigger and drives the children through variants.
  return (
    <motion.div ref={ref} className={clsx("relative", className)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        variants={{ hidden: { clipPath: start }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay } } }}
      >
        <motion.div style={{ y, top: `-${parallax}%`, bottom: `-${parallax}%` }} className="absolute inset-x-0">
          <motion.div
            className="relative h-full w-full"
            variants={{ hidden: { scale: 1.3 }, show: { scale: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay } } }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

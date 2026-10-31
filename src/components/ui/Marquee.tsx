"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "motion/react";
import { clsx } from "clsx";
import { useRef } from "react";

type Props = {
  items: string[];
  reverse?: boolean;
  /** Seconds to travel one copy of the row at rest. */
  duration?: number;
  className?: string;
  variant?: "solid" | "outline" | "band" | "plain";
};

function Star({ light }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={clsx("h-[0.5em] w-[0.5em] shrink-0", light ? "fill-white" : "fill-puma")} aria-hidden>
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
    </svg>
  );
}

/** Infinite marquee whose speed, direction and skew respond to scroll velocity. */
export default function Marquee({ items, reverse, duration = 30, className, variant = "solid" }: Props) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7]);
  const hover = useSpring(1, { stiffness: 120, damping: 20 });
  const direction = useRef(reverse ? 1 : -1);

  // 4 identical copies; wrapping inside one copy (25%) keeps the loop seamless.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const speed = 25 / duration; // % per second

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    // Scrolling up flips the direction; scrolling down restores it.
    if (b < -0.05) direction.current = reverse ? -1 : 1;
    else if (b > 0.05) direction.current = reverse ? 1 : -1;
    const step = direction.current * speed * (Math.min(delta, 50) / 1000);
    baseX.set(baseX.get() + (step + step * Math.abs(b)) * hover.get());
  });

  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className={clsx((variant === "outline" || (variant === "solid" && i % 2 === 1)) && "text-outline")}>{t}</span>
          <Star light={variant === "band"} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={clsx("relative flex overflow-hidden font-display uppercase leading-none select-none", variant === "band" && "bg-puma py-5 text-white", className)}
      onPointerEnter={() => hover.set(0.15)}
      onPointerLeave={() => hover.set(1)}
    >
      <span className="sr-only">{items.join(", ")}</span>
      <motion.div className="flex w-max" style={{ x, skewX }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}

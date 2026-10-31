"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { clsx } from "clsx";
import { useRef } from "react";

/** 3D tilt-on-hover wrapper with a soft glare that follows the pointer. Mouse only. */
export default function Tilt({ children, className, max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, (v) => v * 100);
  const gy = useTransform(sy, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 60%)`;
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div className={clsx("[perspective:1100px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {children}
        <motion.div aria-hidden style={{ backgroundImage: glare, opacity: glareOpacity }} className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]" />
      </motion.div>
    </div>
  );
}

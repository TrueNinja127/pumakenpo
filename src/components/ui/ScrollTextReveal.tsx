"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useRef } from "react";

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className={accent ? "inline-block text-puma" : "inline-block"}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Pinned statement: words brighten one by one as the section scrolls past.
 * Words wrapped in *asterisks* are highlighted in red.
 */
export default function ScrollTextReveal({ text, eyebrow, children }: { text: string; eyebrow?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref);
  const words = text.split(" ");
  const bar = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-x">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <p className="mt-8 max-w-6xl font-display text-[2.6rem] uppercase leading-[1.02] tracking-wide sm:text-6xl lg:text-[5.5rem]" aria-label={text.replace(/\*/g, "")}>
            {words.map((w, i) => {
              const start = (i / words.length) * 0.85;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 0.85 / words.length + 0.02]} accent={w.startsWith("*")}>
                  {w.replace(/\*/g, "")}
                </Word>
              );
            })}
          </p>
          <div className="mt-12 flex items-center gap-6">
            <div className="h-[2px] w-40 overflow-hidden bg-white/10">
              <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-puma" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

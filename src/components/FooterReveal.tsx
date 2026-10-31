"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useRef } from "react";

/** The footer rises from underneath the page as it scrolls into view. */
export default function FooterReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, "enter");
  const y = useTransform(scrollYProgress, [0, 1], ["-28%", "0%"]);
  const shade = useTransform(scrollYProgress, [0, 0.9], [0.75, 0]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
      <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-ink" />
    </div>
  );
}

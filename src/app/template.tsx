"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { markNavigated } from "@/lib/ready";

// The first page load is covered by the Preloader; only later navigations get the curtain.
let navigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [curtain] = useState(() => navigated);
  if (curtain) markNavigated();

  useEffect(() => {
    navigated = true;
  }, []);

  return (
    <>
      {curtain && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[180] flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 bg-ink"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 + i * 0.05 }}
            >
              <span className="absolute inset-x-0 bottom-0 h-1 bg-puma" />
            </motion.div>
          ))}
        </div>
      )}
      <motion.div
        initial={curtain ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}

"use client";

import { AnimatePresence, motion, animate } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLenis } from "./providers/SmoothScroll";
import { setReady } from "@/lib/ready";

const KEY = "puma-preloaded";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setTimeout(() => setShow(false), 250);
      },
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (!show) setReady();
  }, [show]);

  useEffect(() => {
    if (show) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show, lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          exit={{ pointerEvents: "none" }}
          transition={{ duration: 1.1 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full bg-ink"
              style={{ left: `${i * 20}%`, width: "20.5%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
            />
          ))}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/images/brand/logo-light.png" alt="Puma Kenpo" width={180} height={150} priority className="h-auto w-36 md:w-44" />
            </motion.div>
            <div className="w-56 md:w-72">
              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <div className="h-full bg-puma transition-[width] duration-75" style={{ width: `${count}%` }} />
              </div>
              <div className="mt-3 flex justify-between font-display text-sm tracking-[0.3em] text-mute">
                <span>LOADING</span>
                <span className="text-bone tabular-nums">{String(count).padStart(3, "0")}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

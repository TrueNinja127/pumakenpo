"use client";

import Lenis from "lenis";
import { MotionConfig, cancelFrame, frame } from "motion/react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      autoRaf: false,
      anchors: { offset: -90 },
    });
    // Drive Lenis from Motion's frame loop so scroll position and every
    // scroll-linked transform are computed in the same frame (no parallax jitter).
    const update = ({ timestamp }: { timestamp: number }) => instance.raf(timestamp);
    frame.update(update, true);
    setLenis(instance);
    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    </MotionConfig>
  );
}

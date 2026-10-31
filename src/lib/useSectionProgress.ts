"use client";

import { useScroll, useTransform } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

/**
 * Scroll progress (0→1) of an element, computed from page scroll and measured offsets.
 * Used instead of target-based `useScroll`, which drifted for pinned/sticky layouts.
 *
 * - "pin":     element top hits viewport top → element bottom hits viewport bottom
 * - "through": element top enters at viewport bottom → element bottom leaves at viewport top
 * - "enter":   element top enters at viewport bottom → element bottom hits viewport bottom
 * - "exit":    element top at viewport top → element bottom leaves at viewport top
 */
export type ProgressMode = "pin" | "through" | "enter" | "exit";

export function useSectionProgress(ref: RefObject<HTMLElement | null>, mode: ProgressMode = "pin") {
  const { scrollY } = useScroll();
  const box = useRef({ start: 0, range: 1 });

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      const [start, end] =
        mode === "pin" ? [top, top + h - vh] : mode === "through" ? [top - vh, top + h] : mode === "enter" ? [top - vh, top + h - vh] : [top, top + h];
      box.current = { start, range: Math.max(1, end - start) };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, mode]);

  return useTransform(scrollY, (y) => Math.min(1, Math.max(0, (y - box.current.start) / box.current.range)));
}

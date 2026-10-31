"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gallery } from "@/lib/content";
import Button from "../ui/Button";

/** Pinned section whose photo row scrolls horizontally as the page scrolls vertically. */
export default function GalleryStrip() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  // Each photo drifts the opposite way inside its frame for extra depth.
  const innerX = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const measure = () => track.current && distance.set(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);
  const items = gallery.slice(0, 8);

  return (
    <section ref={ref} className="relative h-[300vh] bg-coal/40">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ y: headY }} className="container-x mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-wide sm:text-6xl lg:text-7xl">
              Life on <span className="text-puma">the mat</span>
            </h2>
          </div>
          <Button href="/gallery" variant="outline">
            Full Gallery
          </Button>
        </motion.div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 md:pl-8">
          {items.map((g, i) => (
            <div
              key={g.src}
              className={`group relative h-[52vh] shrink-0 overflow-hidden rounded-[2rem] ${i % 2 ? "mt-12" : ""}`}
              style={{ width: `calc(52vh * ${Math.min(Math.max(g.w / g.h, 0.7), 1.5)})` }}
            >
              <motion.div style={{ x: innerX }} className="absolute inset-y-0 -left-[10%] -right-[10%]">
                <Image src={g.src} alt={g.alt} fill sizes="45vw" className="photo object-cover group-hover:scale-105" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-5 left-5 translate-y-3 font-display text-xl uppercase tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

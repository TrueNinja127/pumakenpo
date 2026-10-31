"use client";

import { motion, useMotionTemplate, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

/** Pinned image that grows from a rounded card to a full-bleed frame while its caption scales in. */
export default function ZoomImage({ src, alt, kicker, title }: { src: string; alt: string; kicker: string; title: [string, string] }) {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);

  const insetY = useTransform(p, [0, 0.55], [22, 0]);
  const insetX = useTransform(p, [0, 0.55], [26, 0]);
  const radius = useTransform(p, [0, 0.55], [3, 0]);
  const clip = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}rem)`;
  const imgScale = useTransform(p, [0, 0.55, 1], [1.18, 1.04, 1]);
  const overlay = useTransform(p, [0.3, 0.7], [0.15, 0.6]);
  const titleScale = useTransform(p, [0.35, 0.8], [0.85, 1]);
  const titleOpacity = useTransform(p, [0.35, 0.65], [0, 1]);
  const titleY = useTransform(p, [0.35, 0.8], [60, 0]);
  const leftX = useTransform(p, [0, 0.4], ["0%", "-80%"]);
  const rightX = useTransform(p, [0, 0.4], ["0%", "80%"]);
  const sideOpacity = useTransform(p, [0.05, 0.3], [1, 0]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Side words that part as the image grows */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 md:px-10">
          <motion.span style={{ x: leftX, opacity: sideOpacity }} className="inline-block font-display text-5xl uppercase text-bone md:text-8xl">
            {title[0].split(" ")[0]}
          </motion.span>
          <motion.span style={{ x: rightX, opacity: sideOpacity }} className="inline-block font-display text-5xl uppercase text-puma md:text-8xl">
            {title[1].split(" ").slice(-1)[0]}
          </motion.span>
        </div>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />
          <div className="grain absolute inset-0" />
        </motion.div>

        <motion.div style={{ scale: titleScale, opacity: titleOpacity, y: titleY }} className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <span className="eyebrow justify-center">{kicker}</span>
          <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-wide sm:text-8xl lg:text-[9rem]">
            {title[0]}
            <br />
            <span className="text-puma">{title[1]}</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

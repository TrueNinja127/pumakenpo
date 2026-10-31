"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { useRef } from "react";
import Button from "../ui/Button";
import SplitText from "../ui/SplitText";
import { Reveal } from "../ui/Reveal";

export default function CTA({
  title = ["Join the PumaKenpo", "Academy Today!"],
  text = "Experience the art of martial arts and self-defense with us.",
}: {
  title?: string[];
  text?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [64, 32]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container-x">
        <motion.div style={{ scale, borderRadius: radius }} className="grain relative overflow-hidden bg-puma px-8 py-20 md:px-16 md:py-24">
          <motion.div style={{ x: imgX }} className="absolute -right-10 bottom-0 top-0 hidden w-[45%] md:block">
            <Image src="/images/home/hero-1.jpg" alt="" fill sizes="45vw" className="object-cover opacity-40 mix-blend-multiply grayscale" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-puma via-puma/90 to-transparent" />
          <div aria-hidden className="absolute -bottom-10 -left-4 whitespace-nowrap font-display text-[16vw] leading-none text-black/10">
            PUMA
          </div>
          <div className="relative max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                <span className="h-[2px] w-8 bg-white" /> Membership
              </span>
            </Reveal>
            <SplitText text={title} className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-wide text-white sm:text-6xl lg:text-7xl" />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lg text-white/85">{text}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
              <Button href="/form" variant="light">
                Become a Member Now
              </Button>
              <Button href="/schedule" variant="outline" className="!border-white/40 !text-white">
                See Class Schedule
              </Button>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { testimonial } from "@/lib/content";
import { Reveal } from "../ui/Reveal";

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const words = testimonial.quote.join(" ").split(" ");

  return (
    <section ref={ref} className="grain relative overflow-hidden py-32 md:py-44">
      <motion.div style={{ y: bgY }} className="absolute inset-[-15%_0]">
        <Image src="/images/home/hero-3.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20 grayscale" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow justify-center">Testimonial</span>
        </Reveal>
        <Reveal delay={0.1}>
          <Quote className="mx-auto mt-8 h-16 w-16 fill-puma text-puma" />
        </Reveal>
        <motion.blockquote
          className="mx-auto mt-8 max-w-5xl font-display text-4xl uppercase leading-[1.05] tracking-wide md:text-6xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025 } } }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              className={i < 4 ? "text-puma" : undefined}
              variants={{ hidden: { opacity: 0.12 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
            >
              {w}{" "}
            </motion.span>
          ))}
        </motion.blockquote>
        <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-puma ring-offset-4 ring-offset-ink">
              <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="64px" className="object-cover" />
            </span>
            <span className="text-left">
              <span className="block font-display text-2xl tracking-wide">{testimonial.name}</span>
              <span className="text-sm text-mute">{testimonial.role}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

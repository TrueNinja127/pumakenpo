"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import SplitText from "./SplitText";
import { introDelay, useReady } from "@/lib/ready";

type Props = {
  title: string;
  eyebrow?: string;
  image?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
};

/** Banner used at the top of every inner page: parallax photo, giant outline word, breadcrumb. */
export default function PageHero({ title, eyebrow, image = "/images/home/hero-3.jpg", crumbs = [], children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, "exit");
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ready = useReady();

  return (
    <section ref={ref} className="grain relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 md:min-h-[70vh] md:pb-24">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45 grayscale" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-transparent to-transparent" />
      <motion.div
        aria-hidden
        style={{ x: wordX }}
        className="text-outline pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap font-display text-[22vw] uppercase leading-none"
      >
        {title}
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container-x relative z-10">
        {eyebrow && (
          <motion.span initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : undefined} transition={{ duration: 0.8, delay: 0.2 + introDelay() }} className="eyebrow">
            {eyebrow}
          </motion.span>
        )}
        <SplitText
          as="h1"
          animateOnMount
          delay={0.25}
          text={title}
          className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-wide sm:text-7xl md:text-8xl lg:text-9xl"
        />
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.6 + introDelay() }}
          className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2.5 text-sm text-mute backdrop-blur"
        >
          <Link href="/" className="transition-colors hover:text-puma">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-puma" />
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-puma">
                  {c.label}
                </Link>
              ) : (
                <span className="text-bone">{c.label}</span>
              )}
            </span>
          ))}
        </motion.nav>
        {children}
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { instructors } from "@/lib/content";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import Button from "../ui/Button";
import Tilt from "../ui/Tilt";

export default function Instructors() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  // Columns travel at different speeds for a staggered depth effect (md+ only via CSS var).
  const speeds = [useTransform(scrollYProgress, [0, 1], [40, -40]), useTransform(scrollYProgress, [0, 1], [120, -90]), useTransform(scrollYProgress, [0, 1], [10, -70])];
  const portrait = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="relative overflow-hidden bg-coal/40 py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our Instructors" title={["Learn from", "the masters"]} accentLine={1} />
          <Reveal delay={0.2}>
            <Button href="/bios" variant="outline">
              All Instructor BIOs
            </Button>
          </Reveal>
        </div>

        <div ref={ref}>
          <Stagger className="mt-16 grid gap-6 md:grid-cols-3 md:pb-20" stagger={0.15}>
            {instructors.map((p, i) => (
              <StaggerItem key={p.slug}>
                <motion.div style={{ y: speeds[i] }} className="max-md:!transform-none">
                  <Tilt className="rounded-[2rem]" max={6}>
                    <Link href={`/bios#${p.slug}`} data-cursor="Read" className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-iron">
                        <motion.div style={{ y: portrait }} className="absolute inset-x-0 -bottom-[6%] -top-[6%]">
                          <Image src={p.image} alt={p.name} fill sizes="(min-width:768px) 33vw, 100vw" className="photo object-cover object-top group-hover:scale-105" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-6 p-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateZ(40px)] group-hover:translate-y-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-puma-300">{p.styles.slice(0, 2).join(" · ")}</p>
                          <h3 className="mt-2 font-display text-4xl uppercase tracking-wide">{p.name}</h3>
                          <p className="mt-1 text-sm text-mute">{p.title}</p>
                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            Read bio <ArrowUpRight className="h-4 w-4 text-puma" />
                          </span>
                        </div>
                        <span className="absolute right-5 top-5 h-3 w-3 animate-pulse rounded-full bg-puma shadow-[0_0_0_6px_rgba(225,6,0,0.2)]" />
                      </div>
                    </Link>
                  </Tilt>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

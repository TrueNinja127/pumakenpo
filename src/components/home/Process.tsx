"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, CalendarCheck, ClipboardList, Flame } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

const steps = [
  { icon: ClipboardList, title: "Register", text: "Fill out the participation form online — it only takes a few minutes.", href: "/form", cta: "Participation Form" },
  { icon: CalendarCheck, title: "Pick a Class", text: "Choose from Kenpo, Hapkido, Silat, Kickboxing or Warrior Scholar.", href: "/schedule", cta: "View Schedule" },
  { icon: Flame, title: "Step on the Mat", text: "Train with expert instructors and unlock your potential.", href: "/contact", cta: "Contact Us" },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const line = useTransform(scrollYProgress, [0.2, 0.75], [0, 1]);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="How to Join" title={["Three steps", "to your first class"]} accentLine={1} />

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-[2px] bg-white/10 md:block">
            <motion.div style={{ scaleX: line }} className="h-full origin-left bg-puma" />
          </div>
          <Stagger className="grid gap-12 md:grid-cols-3" stagger={0.2}>
            {steps.map((s, i) => (
              <StaggerItem key={s.title} className="group relative text-center">
                <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-line bg-ink transition-colors duration-500 group-hover:border-puma">
                  <span className="absolute inset-2 rounded-full bg-puma/0 transition-colors duration-500 group-hover:bg-puma" />
                  <s.icon className="relative h-9 w-9 text-puma transition-colors duration-500 group-hover:text-white" />
                  <span className="absolute -right-1 -top-1 grid h-9 w-9 place-items-center rounded-full bg-puma font-display text-lg">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-4xl uppercase tracking-wide">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-mute">{s.text}</p>
                <Link href={s.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bone transition-colors hover:text-puma">
                  {s.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

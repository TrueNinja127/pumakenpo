"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import { categories, classes, type ClassCategory } from "@/lib/classes";
import { getInstructor } from "@/lib/content";
import SectionHeading from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import Tilt from "../ui/Tilt";

export function ClassCard({ c, index = 0 }: { c: (typeof classes)[number]; index?: number }) {
  const inst = getInstructor(c.instructor);
  return (
    <Link href={`/training/${c.slug}`} data-cursor="Explore" className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-line bg-coal">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={c.image} alt={c.name} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="photo object-cover group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/10 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
          {categories.find((k) => k.id === c.category)?.label}
        </span>
        <span className="absolute right-5 top-5 font-display text-5xl leading-none text-white/20">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="relative p-7">
        <span className="absolute -top-7 right-7 grid h-14 w-14 place-items-center rounded-full bg-puma text-white shadow-[0_10px_30px_-5px_rgba(225,6,0,0.6)] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight className="h-6 w-6" />
        </span>
        <h3 className="font-display text-4xl uppercase tracking-wide transition-colors group-hover:text-puma">{c.name}</h3>
        <p className="mt-2 text-mute">{c.short}</p>
        <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          <span className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={inst.image} alt="" fill sizes="40px" className="object-cover object-top" />
          </span>
          <span className="text-sm leading-tight">
            <span className="block font-semibold">{inst.name}</span>
            <span className="text-mute">Instructor</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ClassesTabs() {
  const [tab, setTab] = useState<ClassCategory | "all">("all");
  const list = tab === "all" ? classes : classes.filter((c) => c.category === tab);

  return (
    <section id="classes" className="relative scroll-mt-24 bg-coal/40 py-28 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our Classes" title={["Train in the art", "that fits you"]} accentLine={1} />
          <Reveal delay={0.2}>
            <LayoutGroup>
              <div className="flex flex-wrap gap-2 rounded-full border border-line bg-ink/60 p-1.5" role="tablist" aria-label="Class categories">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={tab === c.id}
                    onClick={() => setTab(c.id)}
                    className={clsx("relative rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors", tab === c.id ? "text-white" : "text-mute hover:text-bone")}
                  >
                    {tab === c.id && <motion.span layoutId="class-tab" className="absolute inset-0 rounded-full bg-puma" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{c.label}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.div
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <Tilt className="h-full rounded-[1.75rem]">
                  <ClassCard c={c} index={classes.indexOf(c)} />
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

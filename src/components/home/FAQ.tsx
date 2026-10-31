"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";
import { MessageCircle, Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import SectionHeading from "../ui/SectionHeading";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import Button from "../ui/Button";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="FAQ" title={["Frequently asked", "questions"]} accentLine={1} />
          <div className="relative mt-12 hidden h-[360px] lg:block">
            <ImageReveal className="group absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem]">
              <Image src="/images/home/faq.jpg" alt="Kickboxing on the heavy bag" fill sizes="30vw" className="photo object-cover" />
            </ImageReveal>
            <Reveal delay={0.3} className="absolute bottom-0 right-0 w-[62%] rounded-[1.5rem] border border-line bg-coal/90 p-6 shadow-2xl backdrop-blur">
              <MessageCircle className="h-8 w-8 text-puma" />
              <p className="mt-3 font-display text-2xl uppercase leading-tight">Do you have any lingering inquiries?</p>
              <p className="mt-2 text-sm text-mute">Experiencing difficulty locating the desired information? Reach out for a discussion.</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Stagger className="space-y-3" stagger={0.07}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <StaggerItem key={f.q}>
                  <div className={clsx("overflow-hidden rounded-2xl border transition-colors duration-500", isOpen ? "border-puma/50 bg-puma/[0.06]" : "border-line bg-white/[0.02]")}>
                    <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 p-6 text-left">
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-lg text-puma">0{i + 1}</span>
                        <span className="text-lg font-semibold">{f.q}</span>
                      </span>
                      <span className={clsx("grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500", isOpen ? "rotate-45 bg-puma text-white" : "bg-white/5")}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="px-6 pb-6 pl-[3.75rem] leading-relaxed text-mute">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6 lg:hidden">
            <p className="text-mute">Do you have any lingering inquiries? Reach out for a discussion.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <Button href="/contact">Engage in a Chat</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

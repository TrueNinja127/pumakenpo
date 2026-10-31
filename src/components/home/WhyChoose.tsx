"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { useRef } from "react";
import { Brain, Dumbbell, HeartHandshake, ShieldCheck, Trophy, Users } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import Button from "../ui/Button";
import Counter from "../ui/Counter";

const points = [
  { icon: ShieldCheck, label: "Self-Defense Skills" },
  { icon: Trophy, label: "Confidence" },
  { icon: Brain, label: "Discipline" },
  { icon: Users, label: "Programs for All Ages" },
  { icon: HeartHandshake, label: "Supportive Environment" },
  { icon: Dumbbell, label: "Physical Fitness" },
];

const stats = [
  { to: 8, suffix: "th", label: "Degree black belt — Chinese Kenpo" },
  { to: 40, suffix: "+", label: "Years on the Hapkido path" },
  { to: 5, suffix: "", label: "Martial arts disciplines" },
  { to: 6, suffix: "", label: "Training days every week" },
];

export default function WhyChoose() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(12% 12% 12% 12% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Why Choose PumaKenpo?"
            title={["Skills. Confidence.", "Discipline."]}
            accentLine={1}
            text="We focus on building skills, confidence, and discipline through martial arts. Our programs are structured to cater to individuals of all ages, ensuring a supportive environment for learning and growth. Join us today!"
          />
          <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
            {points.map((p) => (
              <StaggerItem key={p.label} className="group flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-puma transition-all duration-500 group-hover:border-puma group-hover:bg-puma group-hover:text-white">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{p.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <Button href="/about">Learn More</Button>
            <Button href="/contact" variant="outline">
              Get in Touch
            </Button>
          </Reveal>
        </div>

        <motion.div style={{ clipPath: clip }} className="group relative order-1 h-[460px] overflow-hidden md:h-[600px] lg:order-2">
          <motion.div style={{ y: imgY }} className="absolute inset-[-12%_0]">
            <Image src="/images/home/why.jpg" alt="Puma Academy instructors" fill sizes="(min-width:1024px) 50vw, 100vw" className="photo object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <p className="absolute bottom-8 left-8 right-8 font-display text-3xl uppercase leading-tight md:text-4xl">
            A supportive environment
            <span className="block text-puma">for learning and growth.</span>
          </p>
        </motion.div>
      </div>

      <div className="container-x mt-24">
        <Stagger className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <StaggerItem key={s.label} className={`group relative p-8 md:p-10 ${i > 0 ? "border-line lg:border-l" : ""} ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-puma transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <p className="relative font-display text-6xl leading-none md:text-7xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="relative mt-3 text-sm uppercase tracking-[0.15em] text-mute transition-colors group-hover:text-white">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

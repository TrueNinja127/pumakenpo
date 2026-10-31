"use client";

import { motion, useTransform } from "motion/react";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { Award, Layers, Users } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import { ImageReveal, Stagger, StaggerItem } from "../ui/Reveal";
import Button from "../ui/Button";

const features = [
  { icon: Layers, title: "Unique Offerings", text: "Discover the unique offerings of PumaKenpo, designed to enhance your martial arts journey." },
  { icon: Users, title: "Expert Instructors", text: "Join our community and experience the best in martial arts training with expert instructors." },
  { icon: Award, title: "Every Skill Level", text: "Our academy provides a comprehensive curriculum tailored for all skill levels." },
];

export default function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-28 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto h-[520px] w-full max-w-[560px] md:h-[620px]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[78%] w-[66%]">
            <ImageReveal className="group h-full w-full overflow-hidden rounded-[2rem]">
              <Image src="/images/home/about.jpg" alt="Student training on the heavy bag" fill sizes="(min-width:1024px) 30vw, 70vw" className="photo object-cover" />
            </ImageReveal>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-[52%] w-[58%]">
            <ImageReveal from="right" delay={0.2} className="group h-full w-full overflow-hidden rounded-[2rem] border-[6px] border-ink">
              <Image src="/images/home/why.jpg" alt="Puma Academy instructors" fill sizes="(min-width:1024px) 25vw, 60vw" className="photo object-cover" />
            </ImageReveal>
          </motion.div>
          <motion.div
            style={{ rotate }}
            className="absolute bottom-[18%] left-[8%] z-10 rounded-2xl bg-puma px-6 py-5 shadow-[0_20px_60px_-15px_rgba(225,6,0,0.7)]"
          >
            <p className="font-display text-5xl leading-none">PUMA</p>
            <p className="mt-1 max-w-[9rem] text-xs font-semibold uppercase leading-snug tracking-[0.18em]">Practical Unified Martial Arts</p>
          </motion.div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Explore Our Features"
            title={["Built for your", "martial arts journey"]}
            accentLine={1}
            text="Dedicated to providing high-quality martial arts training for individuals of all ages — self-defense, discipline and physical fitness in a supportive community where students reach their personal goals."
          />
          <Stagger className="mt-10 grid gap-4">
            {features.map((f, i) => (
              <StaggerItem key={f.title}>
                <div className="group relative flex gap-5 overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors duration-500 hover:border-puma/50">
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-puma transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-puma/10 text-puma transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-puma group-hover:text-white">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide">
                      <span className="mr-2 text-puma">0{i + 1}.</span>
                      {f.title}
                    </h3>
                    <p className="mt-1 text-mute">{f.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10">
            <Button href="/about">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

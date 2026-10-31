import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import Instructors from "@/components/home/Instructors";
import WhyChoose from "@/components/home/WhyChoose";
import CTA from "@/components/home/CTA";
import { classes } from "@/lib/classes";
import Link from "next/link";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";

export const metadata: Metadata = {
  title: "About",
  description: "Puma Kenpo Academy is dedicated to providing high-quality martial arts training for individuals of all ages.",
};

const keyFeatures = [
  {
    icon: ShieldCheck,
    title: "Expert Instructors",
    text: "Our instructors bring years of martial arts experience and are focused on student success and safety.",
  },
  {
    icon: GraduationCap,
    title: "Comprehensive Curriculum",
    text: "A comprehensive curriculum covering techniques, forms and self-defense strategies for all skill levels.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About" eyebrow="Who we are" image="/images/home/why.jpg" crumbs={[{ label: "About" }]} />

      <section className="py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <ImageReveal className="group relative aspect-[682/834] w-full max-w-[520px] overflow-hidden rounded-[2rem]">
              <Image src="/images/home/about.jpg" alt="Training at Puma Kenpo Academy" fill sizes="(min-width:1024px) 40vw, 90vw" className="photo object-cover" />
            </ImageReveal>
            <Reveal delay={0.4} className="absolute -bottom-8 right-0 rounded-[1.5rem] bg-white p-5 shadow-2xl md:right-6">
              <Image src="/images/brand/logo.jpg" alt="Puma Kenpo logo" width={140} height={131} className="h-auto w-28 md:w-32" />
            </Reveal>
          </div>
          <div>
            <SectionHeading
              eyebrow="About"
              title={["Puma Kenpo", "Academy"]}
              accentLine={1}
              text="Puma Kenpo Academy is dedicated to providing high-quality martial arts training for individuals of all ages. Our instructors teach self-defense, discipline, and physical fitness, in a supportive community where students reach their personal goals."
            />
            <Reveal delay={0.2}>
              <h3 className="mt-12 font-display text-3xl uppercase tracking-wide">Key Features of Our Academy</h3>
            </Reveal>
            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
              {keyFeatures.map((f) => (
                <StaggerItem key={f.title} className="group rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors duration-500 hover:border-puma/50">
                  <f.icon className="h-9 w-9 text-puma transition-transform duration-500 group-hover:-translate-y-1" />
                  <h4 className="mt-4 font-display text-2xl uppercase tracking-wide">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{f.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2} className="mt-10">
              <Button href="/training/kenpo">Learn More</Button>
            </Reveal>
          </div>
        </div>
      </section>

      <ScrollTextReveal
        eyebrow="Our mission"
        text="Our instructors teach *self-defense,* *discipline,* and *physical fitness* — a supportive community where every student reaches their personal goals."
      />

      <section className="relative overflow-hidden border-y border-line bg-coal/40 py-28 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our system" title={["What is", "PUMA?"]} accentLine={1} />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-mute lg:col-span-7">
            <Reveal>
              <p>
                <span className="font-semibold text-bone">PUMA — Practical Unified Martial Arts</span> — was co-developed by Sifu Joe alongside his brother Joshua.
                Its foundation is a practical Kenpo style based on Greg Payne&apos;s blend of Shotokan, American, and Chinese Kenpo.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Teaching emphasizes solid fundamentals, an open approach to applying motion, and spontaneity — enriched by the multi-disciplinary experience of our
                instructors in Kodokan Judo, Goju-Ryu, Shotokan Karate, Chinese Kenpo Karate and Cheong Kyum Hapkido.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-3xl uppercase leading-tight tracking-wide text-bone">
                Making average people, <span className="text-puma">great martial artists.</span>
              </p>
            </Reveal>
          </div>
        </div>
        <Stagger className="container-x mt-16 grid grid-cols-2 gap-3 md:grid-cols-5">
          {classes.slice(0, 5).map((c) => (
            <StaggerItem key={c.slug}>
              <Link href={`/training/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={c.image} alt={c.name} fill sizes="20vw" className="photo object-cover group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-2xl uppercase tracking-wide transition-colors group-hover:text-puma">{c.name}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <WhyChoose />
      <Marquee items={["Discipline", "Confidence", "Fitness", "Self-Defense", "Community"]} className="py-6 text-7xl md:text-9xl" duration={40} />
      <Instructors />
      <CTA />
    </>
  );
}

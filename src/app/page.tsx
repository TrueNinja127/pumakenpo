import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import ClassesTabs from "@/components/home/ClassesTabs";
import WhyChoose from "@/components/home/WhyChoose";
import Instructors from "@/components/home/Instructors";
import Process from "@/components/home/Process";
import Testimonial from "@/components/home/Testimonial";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import GalleryStrip from "@/components/home/GalleryStrip";
import ContactSection from "@/components/home/ContactSection";
import ScheduleBoard from "@/components/ScheduleBoard";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import ZoomImage from "@/components/ui/ZoomImage";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="relative z-10 h-48 overflow-hidden md:h-60">
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg]">
          <Marquee reverse variant="plain" items={["Expert Martial Arts Training", "Join Our Community Today", "Unlock Your Potential Now"]} className="bg-bone py-4 text-3xl text-ink md:text-5xl" duration={40} />
        </div>
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]">
          <Marquee variant="band" items={["Kenpo", "Hapkido", "Silat", "Kickboxing", "Warrior Scholar", "Seminars"]} className="text-5xl md:text-6xl" duration={28} />
        </div>
      </div>

      <AboutIntro />
      <ScrollTextReveal
        eyebrow="Our philosophy"
        text="We focus on building *skills,* *confidence,* and *discipline* through martial arts — for individuals of all ages, in a supportive environment for learning and growth."
      >
        <Button href="/about" variant="outline">
          Join us today
        </Button>
      </ScrollTextReveal>
      <ClassesTabs />
      <ZoomImage src="/images/classes/warrior-scholar.jpg" alt="Self-defense practice at Puma Academy" kicker="Puma Academy" title={["Making average people,", "great martial artists."]} />
      <WhyChoose />

      <section className="relative py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Time & Table" title={["Weekly class", "schedule"]} accentLine={1} />
            <Reveal delay={0.2}>
              <Button href="/schedule" variant="outline">
                Full Schedule
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ScheduleBoard />
          </Reveal>
        </div>
      </section>

      <Instructors />
      <Process />
      <Marquee variant="outline" items={["Discipline", "Confidence", "Fitness", "Self-Defense", "Community"]} className="py-6 text-7xl md:text-9xl" duration={45} />
      <Testimonial />
      <GalleryStrip />
      <FAQ />
      <CTA />
      <ContactSection />
    </>
  );
}

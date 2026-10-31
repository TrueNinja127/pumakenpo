import type { Metadata } from "next";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ScheduleBoard from "@/components/ScheduleBoard";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import CTA from "@/components/home/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Class Schedule",
  description: "Weekly class schedule for Kenpo, CKA Hapkido, Silat, Kickboxing and Ninja Cubs & Little Samurais at Puma Academy.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero title="Schedule" eyebrow="Time & Table" image="/images/home/hero-1.jpg" crumbs={[{ label: "About", href: "/about" }, { label: "Schedule" }]} />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Classes" title={["Weekly class", "schedule"]} accentLine={1} text="Getting ready for school? How about after school? Check in with us about our programs — find your class below." />
            <Reveal delay={0.2} className="flex items-center gap-3 text-mute">
              <MapPin className="h-5 w-5 text-puma" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ScheduleBoard />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-coal/40 py-28 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Printable" title={["Official", "schedules"]} accentLine={1} />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {[
              { src: "/images/schedule/schedule-2026-08.jpg", label: "Current schedule" },
              { src: "/images/schedule/schedule-class.png", label: "Previous schedule" },
            ].map((s, i) => (
              <div key={s.src}>
                <ImageReveal delay={i * 0.15} className="aspect-[1427/1102] overflow-hidden rounded-[1.5rem] border border-line">
                  <Image src={s.src} alt={`Puma Academy class schedule — ${s.label}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-contain" />
                </ImageReveal>
                <a href={s.src} download className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-colors hover:text-puma">
                  <Download className="h-4 w-4 text-puma" /> Download {s.label.toLowerCase()}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

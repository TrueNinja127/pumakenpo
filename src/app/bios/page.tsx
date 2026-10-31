import type { Metadata } from "next";
import Image from "next/image";
import { Award } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import CTA from "@/components/home/CTA";
import { instructors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Instructor BIOs",
  description: "Meet Sifu Joe, Greg Payne and Master Zarate — the instructors of Puma Academy.",
};

export default function BiosPage() {
  return (
    <>
      <PageHero title="BIOs" eyebrow="Our Instructors" image="/images/home/why.jpg" crumbs={[{ label: "About", href: "/about" }, { label: "BIOs" }]} />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Our Instructors" title={["Decades of", "martial discipline"]} accentLine={1} className="mb-24" />

          <div className="space-y-28 md:space-y-40">
            {instructors.map((p, i) => (
              <article key={p.slug} id={p.slug} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={`relative lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                  <span aria-hidden className="text-outline absolute -top-16 left-0 font-display text-[9rem] leading-none md:text-[12rem]">
                    0{i + 1}
                  </span>
                  <ImageReveal from={i % 2 ? "right" : "left"} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-iron">
                    <Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 40vw, 100vw" className="photo object-cover object-top" />
                  </ImageReveal>
                  <Reveal delay={0.4} className={`absolute -bottom-6 ${i % 2 ? "-left-2 md:-left-6" : "-right-2 md:-right-6"} rounded-2xl bg-puma px-5 py-4 shadow-[0_20px_50px_-10px_rgba(225,6,0,0.6)]`}>
                    <Award className="h-6 w-6" />
                    <p className="mt-1 max-w-[12rem] text-sm font-semibold leading-snug">{p.ranks[0]}</p>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <Reveal>
                    <span className="eyebrow">{p.title}</span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="mt-4 font-display text-6xl uppercase leading-none tracking-wide md:text-8xl">{p.name}</h2>
                  </Reveal>
                  <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
                    {p.bio.map((para, k) => (
                      <Reveal key={k} delay={0.15 + k * 0.08}>
                        <p>{para}</p>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-2">
                    {p.styles.map((s) => (
                      <span key={s} className="rounded-full border border-line px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-puma hover:text-puma">
                        {s}
                      </span>
                    ))}
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

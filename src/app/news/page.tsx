import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Megaphone, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CTA from "@/components/home/CTA";
import { announcements } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "News",
  description: "Closures, announcements and class news from Puma Academy.",
};

const special = [
  { title: "After-School Program", text: "Getting ready for school? How about after school? Check in with us about the Warrior-Scholar program.", href: "/training/warrior-scholar", image: "/images/classes/warrior-scholar.jpg" },
  { title: "Featured Seminar", text: "Special training with advanced instruction and focused topics — July 1, 2026 · 5:00 pm – 7:00 pm.", href: "/training/featured-seminar", image: "/images/classes/featured-seminar.jpg" },
  { title: "Special Events", text: "Upcoming seminars hosted by Puma Academy — August 6, 2026 · 5:00 pm – 8:00 pm.", href: "/training/upcoming-seminars", image: "/images/classes/upcoming-seminars.jpg" },
];

export default function NewsPage() {
  return (
    <>
      <PageHero title="News" eyebrow="Closures · Announcements · Classes" image="/images/classes/featured-seminar.jpg" crumbs={[{ label: "About", href: "/about" }, { label: "News" }]} />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Special Announcements" title={["What's happening", "at the academy"]} accentLine={1} />
            <Reveal delay={0.2}>
              <Button href="/schedule" variant="outline">
                See Class Schedule
              </Button>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {special.map((s) => (
              <StaggerItem key={s.title}>
                <Link href={s.href} data-cursor="Read" className="group block h-full overflow-hidden rounded-[2rem] border border-line bg-coal">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill sizes="(min-width:768px) 33vw, 100vw" className="photo object-cover group-hover:scale-110" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-puma px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                      <Megaphone className="h-3.5 w-3.5" /> News
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-3xl uppercase tracking-wide transition-colors group-hover:text-puma">{s.title}</h3>
                    <p className="mt-3 text-mute">{s.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
                      Read more <ArrowUpRight className="h-4 w-4 text-puma transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line bg-coal/40 py-28 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Class Announcements" title={["Classes &", "programs"]} accentLine={1} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {announcements.map((a) => (
              <StaggerItem key={a.name}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[1.5rem] border p-7 transition-all duration-500 hover:-translate-y-2 ${a.highlight ? "border-puma/50 bg-puma/[0.07]" : "border-line bg-white/[0.02] hover:border-puma/40"}`}
                >
                  {a.highlight && <Sparkles className="absolute right-6 top-6 h-5 w-5 text-puma" />}
                  <h3 className="font-display text-4xl uppercase tracking-wide">{a.name}</h3>
                  <p className="mt-3 text-mute">{a.info}</p>
                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-puma transition-all duration-700 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CTA />
    </>
  );
}

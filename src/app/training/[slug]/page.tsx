import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Check, Clock, DollarSign, MapPin, Phone, User } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTA from "@/components/home/CTA";
import { ClassCard } from "@/components/home/ClassesTabs";
import { classes, getClass } from "@/lib/classes";
import { getInstructor } from "@/lib/content";
import { sessionsFor } from "@/lib/schedule";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getClass((await params).slug);
  if (!c) return {};
  return { title: c.name, description: c.intro[0], openGraph: { images: [c.image] } };
}

export default async function TrainingPage({ params }: Params) {
  const c = getClass((await params).slug);
  if (!c) notFound();
  const inst = getInstructor(c.instructor);
  const sessions = c.scheduleKey ? sessionsFor(c.scheduleKey) : [];
  const related = classes.filter((x) => x.slug !== c.slug).slice(0, 3);

  const info = [
    ...(c.event
      ? [
          { icon: CalendarDays, label: "Date", value: c.event.date },
          { icon: Clock, label: "Time", value: c.event.time },
        ]
      : []),
    { icon: User, label: "Instructor", value: inst.name },
    { icon: MapPin, label: "Location", value: "Puma Academy Training Center" },
    { icon: DollarSign, label: "Pricing", value: "Contact the academy for current pricing" },
  ];

  return (
    <>
      <PageHero title={c.name} eyebrow="Classes" image={c.image} crumbs={[{ label: "Classes", href: "/#classes" }, { label: c.name }]} />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ImageReveal className="group relative aspect-[16/10] overflow-hidden rounded-[2rem]">
              <Image src={c.image} alt={c.name} fill priority sizes="(min-width:1024px) 60vw, 100vw" className="photo object-cover" />
            </ImageReveal>

            <div className="mt-14">
              <SectionHeading eyebrow={c.event ? c.event.note : "Program overview"} title={c.name} />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-mute">
                {c.intro.map((p, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {c.highlights.map((h) => (
                <StaggerItem key={h} className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-puma/15">
                    <Check className="h-5 w-5 text-puma" />
                  </span>
                  <span className="font-display text-2xl uppercase tracking-wide">{h}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10 rounded-[1.5rem] border-l-4 border-puma bg-puma/[0.06] p-6 md:p-8">
              <p className="font-display text-2xl uppercase tracking-wide">What to bring</p>
              <p className="mt-2 text-mute">{c.bring}</p>
            </Reveal>

            {(sessions.length > 0 || c.scheduleNote) && (
              <Reveal className="mt-14">
                <h3 className="font-display text-4xl uppercase tracking-wide">
                  Class <span className="text-puma">times</span>
                </h3>
                {sessions.length > 0 ? (
                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-line">
                    {sessions.map((s) => (
                      <div key={s.day} className="flex flex-col justify-between gap-2 border-b border-line px-6 py-5 last:border-b-0 sm:flex-row sm:items-center">
                        <span className="font-display text-2xl uppercase tracking-wide">{s.day}</span>
                        <span className="flex flex-wrap gap-2">
                          {s.times.map((t) => (
                            <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-sm font-semibold">
                              {t}
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-mute">{c.scheduleNote}</p>
                )}
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <Reveal dir="left" className="overflow-hidden rounded-[2rem] border border-line bg-coal">
                <div className="bg-puma px-7 py-5">
                  <p className="font-display text-3xl uppercase tracking-wide">Class Information</p>
                </div>
                <ul className="divide-y divide-line">
                  {info.map((i) => (
                    <li key={i.label} className="flex gap-4 px-7 py-5">
                      <i.icon className="mt-0.5 h-5 w-5 shrink-0 text-puma" />
                      <span>
                        <span className="block text-xs uppercase tracking-[0.2em] text-mute">{i.label}</span>
                        <span className="mt-0.5 block font-semibold">{i.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 p-7 pt-2">
                  <Button href="/form" full>
                    Register Now
                  </Button>
                  <Button href="/contact" variant="outline" full>
                    Contact Instructor
                  </Button>
                </div>
              </Reveal>

              <Reveal dir="left" delay={0.1}>
                <Link href={`/bios#${inst.slug}`} className="group flex items-center gap-5 rounded-[2rem] border border-line p-5 transition-colors hover:border-puma/50">
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={inst.image} alt={inst.name} fill sizes="80px" className="object-cover object-top" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-[0.2em] text-mute">Instructor</span>
                    <span className="block font-display text-2xl uppercase tracking-wide">{inst.name}</span>
                    <span className="text-sm text-mute">{inst.ranks[0]}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-puma transition-transform group-hover:rotate-45" />
                </Link>
              </Reveal>

              <Reveal dir="left" delay={0.2} className="grain relative overflow-hidden rounded-[2rem] bg-iron p-7">
                <Phone className="h-8 w-8 text-puma" />
                <p className="mt-4 font-display text-3xl uppercase leading-tight">Questions? Call us</p>
                <a href={site.phoneHref} className="mt-2 block text-2xl font-semibold transition-colors hover:text-puma">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="mt-1 block text-mute hover:text-bone">
                  {site.email}
                </a>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-coal/40 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Keep exploring" title={["Other", "programs"]} accentLine={1} />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <ClassCard c={r} index={classes.indexOf(r)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CTA />
    </>
  );
}

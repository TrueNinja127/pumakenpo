import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ParticipationForm from "@/components/forms/ParticipationForm";
import { Reveal } from "@/components/ui/Reveal";
import Socials from "@/components/Socials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participation Form",
  description: "Register for classes at Puma Academy.",
};

export default function FormPage() {
  return (
    <>
      <PageHero title="Register" eyebrow="Participation Form" image="/images/home/hero-2.jpg" crumbs={[{ label: "Membership", href: "/membership" }, { label: "Participation Form" }]} />
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="rounded-[2rem] border border-line bg-coal/60 p-6 md:p-12">
              <h2 className="font-display text-5xl uppercase tracking-wide">
                Participation <span className="text-puma">Form</span>
              </h2>
              <p className="mb-10 mt-3 text-mute">Fields marked * are required.</p>
              <ParticipationForm />
            </div>
          </Reveal>
          <aside className="space-y-6 lg:col-span-4">
            <Reveal dir="left" className="rounded-[2rem] border border-line p-7">
              <Clock className="h-7 w-7 text-puma" />
              <h3 className="mt-4 font-display text-3xl uppercase tracking-wide">Hours</h3>
              <ul className="mt-4 space-y-3">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0">
                    <span className="font-semibold">{h.days}</span>
                    <span className="text-mute">{h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal dir="left" delay={0.1} className="rounded-[2rem] border border-line p-7">
              <h3 className="font-display text-3xl uppercase tracking-wide">Contact</h3>
              <a href={`mailto:${site.email}`} className="mt-4 flex items-center gap-3 text-mute hover:text-bone">
                <Mail className="h-4 w-4 text-puma" /> {site.email}
              </a>
              <a href={site.phoneHref} className="mt-3 flex items-center gap-3 text-mute hover:text-bone">
                <Phone className="h-4 w-4 text-puma" /> {site.phone}
              </a>
            </Reveal>
            <Reveal dir="left" delay={0.2} className="grain relative overflow-hidden rounded-[2rem] bg-puma p-7">
              <h3 className="font-display text-3xl uppercase tracking-wide">Let&apos;s Connect</h3>
              <p className="mt-2 text-white/80">Follow the academy for news, seminars and closures.</p>
              <Socials className="mt-6" />
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipboardList, CreditCard, LogIn } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import { classes } from "@/lib/classes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: "Become a member of Puma Academy — register, log in or pay your bill.",
};

const actions = [
  { icon: ClipboardList, title: "Participation Form", text: "New to the academy? Register online in a few minutes.", href: "/form", cta: "Register" },
  { icon: LogIn, title: "Member Login", text: "Already a member? Sign in to your account.", href: site.memberLogin, cta: "Login" },
  { icon: CreditCard, title: "Pay Bill", text: "Keep your membership active and up to date.", href: site.payBill, cta: "Pay Bill" },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero title="Membership" eyebrow="Join the academy" image="/images/home/hero-3.jpg" crumbs={[{ label: "Membership" }]} />

      <section className="py-28 md:py-36">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title={["Join the PumaKenpo", "Academy Today!"]}
            accentLine={1}
            text="Experience the art of martial arts and self-defense with us. Contact the academy for current pricing — we'll help you choose the right program."
          />
          <Stagger className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {actions.map((a, i) => (
              <StaggerItem key={a.title}>
                <div className={`group relative h-full overflow-hidden rounded-[2rem] border p-9 transition-all duration-500 hover:-translate-y-2 ${i === 0 ? "border-puma bg-puma/[0.08]" : "border-line bg-white/[0.02]"}`}>
                  <span className="absolute -right-6 -top-10 font-display text-[10rem] leading-none text-white/[0.04]">0{i + 1}</span>
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-puma text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <a.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-8 font-display text-4xl uppercase tracking-wide">{a.title}</h3>
                  <p className="mt-3 text-mute">{a.text}</p>
                  <div className="mt-8">
                    <Button href={a.href} variant={i === 0 ? "primary" : "outline"}>
                      {a.cta}
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-line bg-coal/40 py-28 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Programs included" title={["Choose your", "discipline"]} accentLine={1} />
          <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {classes.map((c) => (
              <StaggerItem key={c.slug}>
                <Link href={`/training/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image src={c.image} alt={c.name} fill sizes="15vw" className="photo object-cover group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 font-display text-xl uppercase leading-none tracking-wide group-hover:text-puma">{c.name}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 text-center">
            <Button href="/contact">Ask About Pricing</Button>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}

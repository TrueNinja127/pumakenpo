import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { quickLinks, site } from "@/lib/site";
import { classes } from "@/lib/classes";
import Marquee from "./ui/Marquee";
import Socials from "./Socials";
import { Reveal } from "./ui/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-coal">
      <Marquee
        items={["Kenpo", "Hapkido", "Silat", "Kickboxing", "Warrior Scholar", "Self-Defense"]}
        className="border-b border-line py-8 text-6xl md:text-8xl"
        duration={40}
      />

      <div className="container-x relative py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image src="/images/brand/logo-light.png" alt="Puma Kenpo" width={110} height={92} className="h-auto w-20" />
              <span className="font-display text-3xl leading-none tracking-wider">
                PUMA
                <br />
                ACADEMY
              </span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-mute">
              Dedicated to providing high-quality martial arts training for individuals of all ages.
            </p>
            <p className="mt-4 font-display text-2xl uppercase tracking-wide text-puma">{site.motto}</p>
            <Socials className="mt-8" />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <h3 className="font-display text-2xl uppercase tracking-wider">Quick Link</h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-start gap-2 text-mute transition-colors hover:text-bone">
                    <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-puma transition-transform group-hover:rotate-45" />
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-2">
            <h3 className="font-display text-2xl uppercase tracking-wider">Classes</h3>
            <ul className="mt-6 space-y-3">
              {classes.map((c) => (
                <li key={c.slug}>
                  <Link href={`/training/${c.slug}`} className="text-mute transition-colors hover:text-puma">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3} className="lg:col-span-3">
            <h3 className="font-display text-2xl uppercase tracking-wider">Let&apos;s talk</h3>
            <ul className="mt-6 space-y-4 text-mute">
              <li>
                <a href={site.phoneHref} className="flex gap-3 transition-colors hover:text-bone">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-puma" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 break-all transition-colors hover:text-bone">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-puma" /> {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-puma" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-puma" />
                <span className="space-y-1">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      <span className="text-bone">{h.days}:</span> {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-mute md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.copyright}
          </p>
          <div className="flex gap-6">
            <a href={site.payBill} className="hover:text-bone">Pay Bill</a>
            <a href={site.memberLogin} className="hover:text-bone">Member Login</a>
            <Link href="/form" className="hover:text-bone">Registration</Link>
            <Link href="/contact" className="hover:text-bone">Contact Us</Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="text-outline -mb-[3vw] text-center font-display text-[19vw] leading-none tracking-tight">PUMAKENPO</p>
      </div>
    </footer>
  );
}

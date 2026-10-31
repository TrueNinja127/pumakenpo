import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import ContactForm from "../forms/ContactForm";
import Socials from "../Socials";

export default function ContactSection({ showMap = false }: { showMap?: boolean }) {
  const info = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Visit", value: `${site.address.line1}, ${site.address.line2}`, href: `https://maps.google.com/?q=${encodeURIComponent(site.mapQuery)}` },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Let's talk" title={["Ready to", "start training?"]} accentLine={1} text="Experiencing difficulty locating the desired information? Reach out for a discussion — we're happy to help." />
          <Stagger className="mt-10 space-y-4">
            {info.map((i) => (
              <StaggerItem key={i.label}>
                <a href={i.href} target={i.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-5 rounded-2xl border border-line p-5 transition-colors duration-500 hover:border-puma/50 hover:bg-puma/[0.05]">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-puma text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.25em] text-mute">{i.label}</span>
                    <span className="mt-1 block font-semibold">{i.value}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="flex items-start gap-5 rounded-2xl border border-line p-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/5 text-puma">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <span className="block text-xs uppercase tracking-[0.25em] text-mute">Hours</span>
                  <ul className="mt-2 space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 text-sm">
                        <span className="font-semibold">{h.days}</span>
                        <span className="text-mute">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
          <Reveal delay={0.2} className="mt-8">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-mute">Let&apos;s connect</p>
            <Socials />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="rounded-[2rem] border border-line bg-coal/60 p-6 md:p-10">
            <h3 className="font-display text-4xl uppercase tracking-wide">Send us a message</h3>
            <p className="mb-8 mt-2 text-mute">Fields marked * are required.</p>
            <ContactForm />
          </div>
          {showMap && (
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-line">
              <iframe
                title="Puma Academy location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
                className="h-[360px] w-full grayscale invert-[0.92] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Puma Academy — 19725 Germantown Road, Suite G, Germantown, MD 20874 · (301) 569-1335.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" eyebrow="Let's talk" image="/images/home/faq.jpg" crumbs={[{ label: "Contact" }]} />
      <ContactSection showMap />
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from classes, seminars and training at Puma Academy.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" eyebrow="Life on the mat" image="/images/gallery/gallery-2.jpg" crumbs={[{ label: "Gallery" }]} />
      <section className="py-28 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Moments" title={["Sweat, focus", "& community"]} accentLine={1} className="mb-16" />
          <GalleryGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollUI from "@/components/ScrollUI";
import FooterReveal from "@/components/FooterReveal";
import { site } from "@/lib/site";

const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"], display: "swap" });
const dm = DM_Sans({ variable: "--font-dm", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Kenpo, Hapkido, Silat & Kickboxing in Germantown, MD`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/home/hero-3.jpg", width: 960, height: 640 }],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#09090a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Germantown",
    addressRegion: "MD",
    postalCode: "20874",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dm.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <ScrollUI />
          <Header />
          <main>{children}</main>
          <FooterReveal>
            <Footer />
          </FooterReveal>
        </SmoothScroll>
      </body>
    </html>
  );
}

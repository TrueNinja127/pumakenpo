export const site = {
  name: "Puma Academy",
  brand: "PumaKenpo",
  url: "https://pumakenpo.com",
  tagline: "Join the Fight for Fitness",
  motto: "Making average people, great martial artists",
  description:
    "Puma Academy (PumaKenpo) is dedicated to providing high-quality martial arts training for individuals of all ages — Kenpo, Hapkido, Silat, Kickboxing and the Warrior-Scholar after-school program in Germantown, MD.",
  phone: "(301) 569-1335",
  phoneHref: "tel:+13015691335",
  email: "contact@pumakenpo.com",
  address: {
    line1: "19725 Germantown Road, Suite G",
    line2: "Germantown, MD 20874",
  },
  mapQuery: "19725 Germantown Road, Suite G, Germantown, MD 20874",
  hours: [
    { days: "Mon – Fri", time: "10:00 am — 9:00 pm" },
    { days: "Saturday", time: "9:00 am — 5:00 pm" },
    { days: "Sunday", time: "11:00 am — 2:00 pm" },
  ],
  // The current site lists these networks without URLs — set the real profile links here.
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "X / Twitter", href: "#" },
  ],
  // External links carried over from the current WordPress site.
  memberLogin: "https://pumakenpo.com/wp-login.php",
  payBill: "#",
  copyright: "All rights reserved by pumakenpo",
};

export type NavChild = { label: string; href: string; description?: string; image?: string };
export type NavItem = { label: string; href: string; children?: NavChild[]; mega?: boolean };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Schedule", href: "/schedule" },
      { label: "BIOs", href: "/bios" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Classes", href: "/training/kenpo", mega: true },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Membership", href: "/membership" },
      { label: "Participation Form", href: "/form" },
      { label: "Member Login", href: site.memberLogin },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const quickLinks = [
  { label: "Newsletter", href: "/news" },
  { label: "News (Closures, Announcements, Classes)", href: "/news" },
  { label: "Instructor BIOs", href: "/bios" },
  { label: "After-School Program (Warrior-Scholar)", href: "/training/warrior-scholar" },
  { label: "Membership", href: "/membership" },
];

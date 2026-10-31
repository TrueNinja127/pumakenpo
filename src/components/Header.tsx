"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ChevronDown, Mail, MapPin, Phone, Plus } from "lucide-react";
import { nav, site, type NavItem } from "@/lib/site";
import { classes } from "@/lib/classes";
import Button from "./ui/Button";
import { useLenis } from "./providers/SmoothScroll";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lenis = useLenis();

  // Always visible; it just compacts into a glass bar once the page is scrolled.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));
  useEffect(() => setScrolled(window.scrollY > 40), []);

  useEffect(() => {
    setOpen(false);
    setActive(null);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const isActive = (item: NavItem) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) || item.children?.some((c) => pathname === c.href) || (item.mega && pathname.startsWith("/training"));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={() => setActive(null)}>
        {/* Utility bar */}
        <motion.div
          className="hidden overflow-hidden border-b border-line bg-ink/60 backdrop-blur lg:block"
          animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4, ease }}
        >
          <div className="container-x flex h-10 items-center justify-between text-xs text-mute">
            <div className="flex items-center gap-6">
              <a href={site.phoneHref} className="flex items-center gap-2 transition-colors hover:text-bone">
                <Phone className="h-3.5 w-3.5 text-puma" /> Office: {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-bone">
                <Mail className="h-3.5 w-3.5 text-puma" /> {site.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-puma" /> {site.address.line1}, {site.address.line2}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a href={site.payBill} className="transition-colors hover:text-bone">Pay Bill</a>
              <Link href="/schedule" className="transition-colors hover:text-bone">Schedule</Link>
              <Link href="/form" className="transition-colors hover:text-bone">Registration</Link>
            </div>
          </div>
        </motion.div>

        {/* Main bar */}
        <div className={clsx("transition-all duration-500", scrolled ? "bg-ink/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl" : "bg-transparent")}>
          <div className={clsx("container-x flex items-center justify-between transition-all duration-500", scrolled ? "h-20" : "h-24")}>
            <Link href="/" className="relative z-10 flex items-center gap-3" aria-label="Puma Academy home">
              <Image src="/images/brand/logo-light.png" alt="Puma Kenpo" width={120} height={100} priority className={clsx("h-auto transition-all duration-500", scrolled ? "w-[58px]" : "w-[72px]")} />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-2xl tracking-wider">PUMA ACADEMY</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-mute">Practical Unified Martial Arts</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {nav.map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => setActive(item.children || item.mega ? item.label : null)}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "group relative flex items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors xl:px-4",
                      isActive(item) ? "text-bone" : "text-bone/70 hover:text-bone",
                    )}
                  >
                    {item.label}
                    {(item.children || item.mega) && <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform duration-300", active === item.label && "rotate-180")} />}
                    <span className={clsx("absolute bottom-1.5 left-3 right-3 h-[2px] xl:left-4 xl:right-4 origin-left bg-puma transition-transform duration-500", isActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
                  </Link>

                  <AnimatePresence>
                    {active === item.label && item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        transition={{ duration: 0.35, ease }}
                        className="absolute left-0 top-full w-60 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-line bg-coal/95 p-2 shadow-2xl backdrop-blur-xl">
                          {item.children.map((c, i) => (
                            <motion.div key={c.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                              <Link
                                href={c.href}
                                className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-bone/80 transition-colors hover:bg-white/5 hover:text-bone"
                              >
                                {c.label}
                                <span className="h-1.5 w-1.5 scale-0 rounded-full bg-puma transition-transform group-hover:scale-100" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a href={site.phoneHref} className="hidden items-center gap-3 whitespace-nowrap 2xl:flex" data-cursor="Call">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line">
                  <Phone className="h-4 w-4 text-puma" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-mute">Call us</span>
                  <span className="text-sm font-semibold">{site.phone}</span>
                </span>
              </a>
              <div className="hidden sm:block">
                <Button href="/form" className="!px-6 !py-3.5">Join Now</Button>
              </div>
              <button
                onClick={() => setOpen((v) => !v)}
                className="relative z-[110] grid h-12 w-12 place-items-center rounded-full border border-line bg-white/5 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-5">
                  <motion.span className="absolute left-0 top-0 h-[2px] w-full bg-bone" animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
                  <motion.span className="absolute bottom-0 left-0 h-[2px] w-full bg-bone" animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Classes mega menu */}
        <AnimatePresence>
          {active === "Classes" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x pt-2">
                <div className="grid grid-cols-4 gap-3 rounded-3xl border border-line bg-coal/95 p-4 shadow-2xl backdrop-blur-xl xl:grid-cols-7">
                  {classes.map((c, i) => (
                    <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5, ease }}>
                      <Link href={`/training/${c.slug}`} className="group block">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                          <Image src={c.image} alt="" fill sizes="200px" className="photo object-cover group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                          <span className="absolute bottom-3 left-3 right-3 font-display text-xl uppercase leading-none tracking-wide">{c.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = nav.map((n) => (n.mega ? { ...n, children: classes.map((c) => ({ label: c.name, href: `/training/${c.slug}` })) } : n));

  return (
    <motion.div
      className="fixed inset-0 z-[95] overflow-y-auto bg-ink lg:hidden"
      data-lenis-prevent
      initial={{ clipPath: "circle(0% at calc(100% - 44px) 48px)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 44px) 48px)" }}
      exit={{ clipPath: "circle(0% at calc(100% - 44px) 48px)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="container-x relative flex min-h-full flex-col pb-10 pt-28">
        <nav className="flex-1" aria-label="Mobile">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}
              className="border-b border-line"
            >
              <div className="flex items-center justify-between">
                <Link href={item.href} onClick={onClose} className="py-4 font-display text-5xl uppercase tracking-wide">
                  <span className="mr-3 align-top font-sans text-xs text-puma">0{i + 1}</span>
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line"
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <Plus className={clsx("h-4 w-4 transition-transform duration-300", expanded === item.label && "rotate-45")} />
                  </button>
                )}
              </div>
              <AnimatePresence initial={false}>
                {expanded === item.label && item.children && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5 pl-8">
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} onClick={onClose} className="text-mute transition-colors hover:text-puma">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 space-y-3 text-sm text-mute">
          <a href={site.phoneHref} className="flex items-center gap-3"><Phone className="h-4 w-4 text-puma" /> {site.phone}</a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3"><Mail className="h-4 w-4 text-puma" /> {site.email}</a>
          <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-puma" /> {site.address.line1}, {site.address.line2}</p>
          <div className="pt-4">
            <Button href="/form">Become a Member</Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

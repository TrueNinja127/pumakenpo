"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Award, Phone, Users, Zap } from "lucide-react";
import Button from "../ui/Button";
import { site } from "@/lib/site";
import { introDelay, useReady } from "@/lib/ready";
import { useSectionProgress } from "@/lib/useSectionProgress";

const slides = [
  { label: "Kenpo", caption: "Practical self-defense", image: "/images/home/hero-3.jpg", position: "50% 40%" },
  { label: "Self-Defense", caption: "Real-world application", image: "/images/classes/warrior-scholar.jpg", position: "50% 35%" },
  { label: "Kickboxing", caption: "Strength & conditioning", image: "/images/home/faq.jpg", position: "50% 45%" },
  { label: "All Ages", caption: "Kids, teens & adults", image: "/images/classes/silat.jpg", position: "50% 40%" },
];

const bullets = [
  { icon: Award, label: "Expert Martial Arts Training" },
  { icon: Users, label: "Join Our Community Today" },
  { icon: Zap, label: "Unlock Your Potential Now" },
];

const SLIDE_MS = 6500;
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useReady();
  const d = introDelay();
  const inView = useInView(ref, { amount: 0.2 });
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  // Autoplay — paused while the hero is off-screen or the preloader is up.
  useEffect(() => {
    if (!ready || !inView) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, ready, inView]);

  // Scroll: background sinks and zooms, content lifts and fades.
  const p = useSectionProgress(ref, "exit");
  const bgY = useTransform(p, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(p, [0, 1], [1, 1.12]);
  const contentY = useTransform(p, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(p, [0, 0.55], [1, 0]);
  const shade = useTransform(p, [0, 1], [0, 0.7]);

  // Subtle pointer parallax on the background.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 40, damping: 20 });
  const my = useSpring(py, { stiffness: 40, damping: 20 });
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    px.set((e.clientX / window.innerWidth - 0.5) * -24);
    py.set((e.clientY / window.innerHeight - 0.5) * -16);
  };

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease, delay: delay + d },
  });

  return (
    <section ref={ref} onPointerMove={onMove} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink" aria-roledescription="carousel" aria-label="Puma Academy highlights">
      {/* Background slideshow */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 isolate">
        <motion.div style={{ x: mx, y: my }} className="absolute -inset-8">
          {/* All slides stay mounted (and preloaded); the active one fades in with a slow push-in. */}
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <motion.div
                key={s.image}
                aria-hidden={!active}
                className="absolute inset-0"
                initial={false}
                animate={active ? { opacity: 1, scale: 1.02 } : { opacity: 0, scale: 1.16 }}
                transition={
                  active
                    ? { opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" } }
                    : { opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 0, delay: 1.4 } }
                }
                style={{ zIndex: active ? 1 : 0 }}
              >
                <Image src={s.image} alt="" fill priority={i === 0} loading={i === 0 ? undefined : "eager"} sizes="100vw" className="object-cover" style={{ objectPosition: s.position }} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Readability + mood layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/60" />
      <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-puma/25 blur-[150px]" />
      <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-ink" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative z-10 flex h-full flex-col justify-end pb-36 pt-36 md:pb-40">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-8">
            <motion.p {...intro(0.1)} className="eyebrow">
              Welcome to {site.name}
              <span className="hidden sm:inline">· Germantown, MD</span>
            </motion.p>

            <h1 className="mt-6 font-display uppercase leading-[0.86] tracking-wide" aria-label="Join the fight for fitness">
              {["Join the fight", "for fitness"].map((line, i) => (
                <span key={line} aria-hidden className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className={clsx("block text-[16vw] sm:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]", i === 1 && "text-puma")}
                    initial={{ y: "105%" }}
                    animate={ready ? { y: "0%" } : undefined}
                    transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.12 + d }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Rotating discipline line, synced with the slideshow */}
            <motion.div {...intro(0.55)} className="mt-6 flex items-center gap-4 font-display text-3xl uppercase tracking-wide md:text-4xl">
              <span className="h-[2px] w-10 bg-puma" />
              <span className="text-bone/70">Train in</span>
              <span className="relative inline-flex h-[1.1em] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={slide.label}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease }}
                    className="block text-bone"
                  >
                    {slide.label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p {...intro(0.7)} className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75">
              Dedicated to providing high-quality martial arts training for individuals of all ages.
            </motion.p>

            <motion.div {...intro(0.85)} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/form">Become a Member</Button>
              <Button href="/schedule" variant="outline">
                View Class Schedule
              </Button>
              <a href={site.phoneHref} className="group ml-1 hidden items-center gap-3 sm:flex" data-cursor="Call">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-puma group-hover:bg-puma">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-mute">Call us</span>
                  <span className="font-semibold">{site.phone}</span>
                </span>
              </a>
            </motion.div>
          </div>

          {/* Slide navigation (desktop) */}
          <motion.nav
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 1.1, ease, delay: 0.9 + d }}
            className="hidden lg:col-span-4 lg:block"
            aria-label="Hero slides"
          >
            <ul className="ml-auto max-w-xs space-y-1">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <li key={s.label}>
                    <button onClick={() => setIndex(i)} aria-current={active} className="group w-full py-3 text-left">
                      <span className="flex items-baseline gap-4">
                        <span className={clsx("font-display text-lg transition-colors", active ? "text-puma" : "text-mute")}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={clsx("font-display text-3xl uppercase tracking-wide transition-all duration-500", active ? "translate-x-1 text-bone" : "text-bone/35 group-hover:text-bone/70")}>
                          {s.label}
                        </span>
                      </span>
                      <span className={clsx("ml-10 block text-xs uppercase tracking-[0.2em] transition-colors", active ? "text-mute" : "text-transparent")}>{s.caption}</span>
                      <span className="ml-10 mt-3 block h-[2px] overflow-hidden bg-white/10">
                        {active && (
                          <motion.span
                            key={`bar-${index}-${inView && ready}`}
                            className="block h-full origin-left bg-puma"
                            initial={{ scaleX: 0 }}
                            animate={inView && ready ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ y: "100%" }}
        animate={ready ? { y: "0%" } : undefined}
        transition={{ duration: 1, ease, delay: 1 + d }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-ink/40 backdrop-blur-md"
      >
        <div className="container-x flex h-20 items-center justify-between gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {bullets.map((b) => (
              <li key={b.label} className="flex items-center gap-3 text-sm font-medium text-bone/85">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-puma/15 text-puma">
                  <b.icon className="h-4 w-4" />
                </span>
                {b.label}
              </li>
            ))}
          </ul>

          {/* Mobile slide bars */}
          <div className="flex flex-1 gap-2 md:hidden">
            {slides.map((s, i) => (
              <button key={s.label} onClick={() => setIndex(i)} aria-label={`Show ${s.label}`} className="h-8 flex-1">
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                  <motion.span
                    key={`m-${index}-${i}`}
                    className="block h-full origin-left bg-puma"
                    initial={{ scaleX: i < index ? 1 : 0 }}
                    animate={{ scaleX: i < index ? 1 : i === index && inView && ready ? 1 : 0 }}
                    transition={{ duration: i === index ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="font-display text-xl tracking-widest text-mute">
              <span className="text-bone">{String(index + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
            </span>
            <span className="hidden h-10 w-[1px] bg-white/15 md:block" />
            <span className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-mute md:flex">
              Scroll
              <span className="relative h-8 w-[1px] overflow-hidden bg-white/20">
                <motion.span className="absolute left-0 top-0 h-1/2 w-full bg-puma" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gallery } from "@/lib/content";
import { useLenis } from "./providers/SmoothScroll";

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const lenis = useLenis();

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));
    },
    [],
  );

  useEffect(() => {
    if (index === null) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, lenis]);

  const current = index !== null ? gallery[index] : null;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {gallery.map((g, i) => (
          <motion.button
            key={g.src}
            onClick={() => {
              setDir(0);
              setIndex(i);
            }}
            data-cursor="View"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
            className="group relative mb-5 block w-full overflow-hidden rounded-[1.5rem] break-inside-avoid"
            aria-label={`Open image: ${g.alt}`}
          >
            <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="photo h-auto w-full group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute right-4 top-4 grid h-11 w-11 scale-50 place-items-center rounded-full bg-puma opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
            <span className="absolute bottom-4 left-5 translate-y-4 text-left font-display text-xl uppercase tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {g.alt}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                key={current.src}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 120, scale: d === 0 ? 0.9 : 1 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -120 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[80vh] w-[90vw] max-w-6xl"
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <Image src={current.src} alt={current.alt} fill sizes="90vw" className="pointer-events-none object-contain" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-6 top-6 font-display text-2xl tracking-widest text-mute">
              <span className="text-bone">{String(index + 1).padStart(2, "0")}</span> / {String(gallery.length).padStart(2, "0")}
            </div>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm uppercase tracking-[0.25em] text-mute">{current.alt}</p>
            <button onClick={() => setIndex(null)} aria-label="Close" className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-line bg-white/5 transition-colors hover:bg-puma">
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/5 transition-colors hover:bg-puma md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/5 transition-colors hover:bg-puma md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

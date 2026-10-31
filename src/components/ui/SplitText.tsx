"use client";

import { motion, type MotionStyle } from "motion/react";
import { clsx } from "clsx";
import { introDelay, useReady } from "@/lib/ready";

type Props = {
  text: string | string[];
  className?: string;
  /** Extra class per line, by index. */
  lineClasses?: (string | undefined)[];
  /** Scroll-linked style per line (client callers only). */
  lineStyles?: (MotionStyle | undefined)[];
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animateOnMount?: boolean;
};

/** Masked word-by-word slide-up reveal. Pass an array to force line breaks. */
export default function SplitText({ text, className, lineClasses, lineStyles, delay = 0, stagger = 0.06, as = "h2", animateOnMount = false }: Props) {
  const lines = Array.isArray(text) ? text : [text];
  const Tag = motion[as];
  const ready = useReady();
  const trigger = animateOnMount ? { animate: ready ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  let index = 0;

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      aria-label={lines.join(" ")}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay + (animateOnMount ? introDelay() : 0) } } }}
    >
      {lines.map((line, li) => (
        <motion.span key={li} aria-hidden style={lineStyles?.[li]} className={clsx("block", lineClasses?.[li])}>
          {line.split(" ").map((word, wi) => {
            index++;
            return (
              <span key={`${wi}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", rotate: 6 },
                    show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {word}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </motion.span>
      ))}
    </Tag>
  );
}

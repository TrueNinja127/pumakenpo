"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  full?: boolean;
  onClick?: () => void;
};

const styles = {
  primary: "bg-puma text-white before:bg-white hover:text-ink",
  outline: "border border-white/25 text-bone before:bg-puma hover:border-puma hover:text-white",
  light: "bg-bone text-ink before:bg-puma hover:text-white",
  ghost: "text-bone before:bg-white/10",
};

/** Magnetic pill button with a fill-sweep hover. Renders a Link when `href` is set. */
export default function Button({ href, children, variant = "primary", className, icon = true, type = "button", disabled, onClick, full }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 15 });
  const y = useSpring(my, { stiffness: 220, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.25);
    my.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = clsx(
    "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-500",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-full before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-y-100",
    "disabled:pointer-events-none disabled:opacity-60",
    styles[variant],
    full && "w-full",
    className,
  );

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0" aria-hidden>
          {children}
        </span>
      </span>
      {icon && <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:rotate-45" />}
    </>
  );

  const external = href?.startsWith("http");

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={full ? "block w-full" : "inline-block"}>
      {href ? (
        external ? (
          <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {inner}
          </Link>
        )
      ) : (
        <button type={type} className={cls} disabled={disabled} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

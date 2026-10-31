import { clsx } from "clsx";
import { site } from "@/lib/site";

const paths: Record<string, string> = {
  Facebook: "M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z",
  Instagram:
    "M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.9a3.1 3.1 0 110-6.2 3.1 3.1 0 010 6.2zM17 5.8a1.1 1.1 0 100 2.3 1.1 1.1 0 000-2.3zM21.9 7c-.1-1.6-.4-3-1.6-4.2S17.6 1.2 16 1.1C14.4 1 9.6 1 8 1.1 6.4 1.2 5 1.5 3.8 2.7S2.2 5.4 2.1 7C2 8.6 2 13.4 2.1 15c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4.2-8zm-2.1 9.8a3.3 3.3 0 01-1.8 1.8c-1.3.5-4.3.4-5.7.4s-4.4.1-5.7-.4a3.3 3.3 0 01-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.3 3.3 0 016 3.6c1.3-.5 4.3-.4 5.7-.4s4.4-.1 5.7.4a3.3 3.3 0 011.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7z",
  YouTube:
    "M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.5 12 31 31 0 001 16.8a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.5-4.8 31 31 0 00-.5-4.8zM9.7 15V9l5.8 3-5.8 3z",
  "X / Twitter": "M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-7-6.1 7H.9l7.9-9.1L.5 2h7l4.8 6.4L17.8 2zm-1.2 18h1.9L6.5 3.9H4.5L16.6 20z",
};

export default function Socials({ className }: { className?: string }) {
  return (
    <div className={clsx("flex gap-3", className)}>
      {site.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="group grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 hover:-translate-y-1 hover:border-puma hover:bg-puma"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-bone/80 transition-colors group-hover:fill-white" aria-hidden>
            <path d={paths[s.label]} />
          </svg>
        </a>
      ))}
    </div>
  );
}

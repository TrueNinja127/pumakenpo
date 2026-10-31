import { clsx } from "clsx";
import SplitText from "./SplitText";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string | string[];
  text?: string;
  align?: "left" | "center";
  className?: string;
  accentLine?: number;
};

export default function SectionHeading({ eyebrow, title, text, align = "left", className, accentLine }: Props) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <span className={clsx("eyebrow", align === "center" && "justify-center")}>{eyebrow}</span>
      </Reveal>
      <SplitText
        text={title}
        className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-wide text-bone sm:text-6xl lg:text-7xl"
        lineClasses={accentLine === undefined ? undefined : Array.from({ length: accentLine + 1 }, (_, i) => (i === accentLine ? "text-puma" : undefined))}
      />
      {text && (
        <Reveal delay={0.2}>
          <p className={clsx("mt-6 text-lg leading-relaxed text-mute", align === "center" && "mx-auto max-w-2xl")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

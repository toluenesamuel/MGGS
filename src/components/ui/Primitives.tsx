import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Container({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)} {...rest}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-coral-ink",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow className={light ? "text-brand-gold" : undefined}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "font-display mt-2 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl",
          light ? "text-white" : "text-brand-green-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/85" : "text-ink/75")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Tag({
  children,
  tone = "coral",
}: {
  children: ReactNode;
  tone?: "coral" | "green" | "gold" | "outline";
}) {
  const tones: Record<string, string> = {
    coral: "bg-brand-coral text-ink",
    green: "bg-brand-green-900 text-white",
    gold: "bg-brand-gold text-brand-green-900",
    outline: "border border-brand-green-900 text-brand-green-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ColorBand({
  tone,
  className,
  children,
}: {
  tone: "green" | "coral" | "sky" | "gold" | "lime" | "white";
  className?: string;
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    green: "bg-brand-green-900 text-white",
    coral: "bg-brand-coral text-ink",
    sky: "bg-brand-sky text-brand-green-900",
    gold: "bg-brand-gold text-brand-green-900",
    lime: "bg-brand-lime text-brand-green-900",
    white: "bg-paper text-ink",
  };
  return <section className={cn(tones[tone], className)}>{children}</section>;
}

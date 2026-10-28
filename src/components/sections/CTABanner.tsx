import type { ReactNode } from "react";
import { Container } from "@/components/ui/Primitives";
import { cn } from "@/utils/cn";

export function CTABanner({
  eyebrow,
  title,
  description,
  actions,
  tone = "coral",
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions: ReactNode;
  tone?: "coral" | "green" | "gold";
  image?: string;
}) {
  const toneClasses: Record<string, string> = {
    coral: "bg-brand-coral text-ink",
    green: "bg-brand-green-900 text-white",
    gold: "bg-brand-gold text-brand-green-900",
  };
  return (
    <section data-reveal className={cn(toneClasses[tone])}>
      <Container className={cn("grid items-center gap-8 py-14 sm:py-16", image && "lg:grid-cols-[1.4fr_1fr]")}>
        <div>
          {eyebrow && <p className="font-display text-xs font-bold uppercase tracking-[0.18em] opacity-80">{eyebrow}</p>}
          <h2 className="font-display mt-2 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{title}</h2>
          {description && <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-90 sm:text-base">{description}</p>}
          <div className="mt-6 flex flex-wrap gap-3">{actions}</div>
        </div>
        {image && (
          <div className="overflow-hidden rounded-lg">
            <img src={image} alt="" className="h-48 w-full object-cover sm:h-60" loading="lazy" />
          </div>
        )}
      </Container>
    </section>
  );
}

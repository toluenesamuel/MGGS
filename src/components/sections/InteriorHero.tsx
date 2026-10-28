import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Primitives";
import { cn } from "@/utils/cn";

const toneClasses: Record<string, string> = {
  green: "bg-brand-green-900 text-white",
  coral: "bg-brand-coral text-ink",
  sky: "bg-brand-sky text-brand-green-900",
  gold: "bg-brand-gold text-brand-green-900",
};

export function InteriorHero({
  eyebrow,
  title,
  description,
  trail,
  tone = "green",
  actions,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  trail: Crumb[];
  tone?: "green" | "coral" | "sky" | "gold";
  actions?: ReactNode;
  image?: string;
}) {
  return (
    <section className={cn(toneClasses[tone])}>
      <Container className="py-10 sm:py-14">
        <Breadcrumbs trail={trail} />
        <div className={cn("mt-6 grid gap-8", image && "lg:grid-cols-[1.3fr_1fr] lg:items-center")}>
          <div>
            {eyebrow && (
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] opacity-80">{eyebrow}</p>
            )}
            <h1 className="font-display mt-2 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">{description}</p>}
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {image && (
            <div className="overflow-hidden rounded-lg">
              <img src={image} alt="" className="h-56 w-full object-cover sm:h-72 lg:h-80" loading="eager" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

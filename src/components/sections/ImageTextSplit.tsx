import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { cn } from "@/utils/cn";

export function ImageTextSplit({
  id,
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
  tone = "white",
  actions,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  tone?: "white" | "green" | "sky" | "coral" | "gold";
  actions?: ReactNode;
}) {
  const toneClasses: Record<string, string> = {
    white: "bg-paper text-ink",
    green: "bg-brand-green-900 text-white",
    sky: "bg-brand-sky text-brand-green-900",
    coral: "bg-brand-coral text-white",
    gold: "bg-brand-gold text-brand-green-900",
  };
  return (
    <section data-reveal id={id} className={cn("py-16 sm:py-20 scroll-mt-24", toneClasses[tone])}>
      <Container>
        <div className={cn("grid items-center gap-10 lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2")}>
          <div className="overflow-hidden rounded-lg">
            <img src={image} alt={imageAlt} className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]" loading="lazy" />
          </div>
          <div>
            {eyebrow && <Eyebrow className={tone !== "white" ? "text-current" : undefined}>{eyebrow}</Eyebrow>}
            <h2 className="font-display mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed opacity-90 sm:text-base">{children}</div>
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}

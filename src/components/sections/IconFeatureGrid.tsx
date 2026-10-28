import { Container, SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/utils/cn";

export interface IconFeature {
  icon: string;
  title: string;
  description: string;
}

export function IconFeatureGrid({
  eyebrow,
  title,
  description,
  features,
  tone = "white",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  features: IconFeature[];
  tone?: "white" | "green";
  id?: string;
}) {
  const isDark = tone === "green";
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-20", isDark ? "bg-brand-green-900 text-white" : "bg-paper")}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" light={isDark} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div
                className={cn(
                  "mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl",
                  isDark ? "bg-white/10" : "bg-brand-green-100",
                )}
                aria-hidden="true"
              >
                {f.icon}
              </div>
              <h3 className="font-display mt-4 text-base font-bold">{f.title}</h3>
              <p className={cn("mt-2 text-sm leading-relaxed", isDark ? "text-white/75" : "text-ink/70")}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

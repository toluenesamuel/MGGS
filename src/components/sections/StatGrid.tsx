import { Container } from "@/components/ui/Primitives";

export interface Stat {
  value: string;
  label: string;
}

export function StatGrid({
  title,
  stats,
  tone = "white",
}: {
  title?: string;
  stats: Stat[];
  tone?: "white" | "green";
}) {
  const isDark = tone === "green";
  return (
    <section className={isDark ? "bg-brand-green-900 text-white" : "bg-paper"}>
      <Container className="py-16 sm:py-20">
        {title && (
          <h2 className={`font-display mb-10 text-center text-2xl font-extrabold uppercase tracking-wide sm:text-3xl ${isDark ? "text-white" : "text-brand-green-900"}`}>
            {title}
          </h2>
        )}
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className={`font-display text-3xl font-extrabold sm:text-4xl ${isDark ? "text-brand-gold" : "text-brand-coral"}`}>
                {stat.value}
              </dd>
              <p className={`mt-2 text-sm leading-snug ${isDark ? "text-white/80" : "text-ink/70"}`}>{stat.label}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import type { GenericPageContent } from "@/data/genericPages";

export default function SectionPage({ content }: { content: GenericPageContent }) {
  return (
    <>
      <InteriorHero
        eyebrow={content.section}
        title={content.title}
        trail={[{ label: content.trailLabel }]}
        tone={content.tone}
      />
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{content.summary}</p>
          <p className="mt-6 rounded border border-dashed border-brand-green-900/25 bg-brand-green-100/60 p-4 text-xs leading-relaxed text-ink/60">
            This page is being completed. Further details — including any dates, arrangements or contacts
            specific to this part of school life — will be added as soon as they are confirmed by the school
            office.
          </p>
          <h2 className="font-display mt-10 text-lg font-bold text-brand-green-900">{content.relatedLabel}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {content.related.map((r) => (
              <li key={r.to}>
                <LinkButton to={r.to} variant="outline-green" size="sm">
                  {r.label}
                </LinkButton>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

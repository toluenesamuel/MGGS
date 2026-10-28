import { useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export interface StoryCard {
  name: string;
  role: string;
  blurb: string;
  image: string;
  tone: "sky" | "gold" | "lime" | "coral";
  to: string;
}

const toneClasses: Record<StoryCard["tone"], string> = {
  sky: "bg-brand-sky",
  gold: "bg-brand-gold",
  lime: "bg-brand-lime",
  coral: "bg-brand-coral text-white",
};

export function StoryCarousel({ title, description, cards }: { title: string; description?: string; cards: StoryCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  function scrollToIndex(next: number) {
    const clamped = Math.max(0, Math.min(cards.length - 1, next));
    setIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section className="bg-paper py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Make way for the next generation" title={title} description={description} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(index - 1)}
              disabled={index === 0}
              aria-label="Previous story"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-brand-green-900/30 text-brand-green-900 hover:bg-brand-green-100 disabled:opacity-30"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(index + 1)}
              disabled={index === cards.length - 1}
              aria-label="Next story"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-brand-green-900/30 text-brand-green-900 hover:bg-brand-green-100 disabled:opacity-30"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {cards.map((card) => (
            <li
              key={card.name}
              className={cn(
                "w-64 shrink-0 snap-start overflow-hidden rounded-lg sm:w-72",
                toneClasses[card.tone],
              )}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img src={card.image} alt={`Portrait representing ${card.name}, ${card.role}`} className="h-full w-full object-cover mix-blend-luminosity" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-extrabold uppercase">Meet {card.name}</p>
                <p className="mt-1 text-sm opacity-90">{card.blurb}</p>
                <LinkButton to={card.to} variant="outline-green" size="sm" className="mt-4 border-current text-current hover:bg-current hover:text-white">
                  {card.role}
                </LinkButton>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label="Story slides">
          {cards.map((card, i) => (
            <button
              key={card.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${card.name}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all focus-ring",
                i === index ? "w-6 bg-brand-coral" : "w-1.5 bg-brand-green-900/20",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

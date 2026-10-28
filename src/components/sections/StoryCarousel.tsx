import { useEffect, useRef, useState } from "react";
import { Link } from "@/router/router";
import { cn } from "@/utils/cn";

export interface StoryCard {
  name: string;
  /** Optional card heading. Falls back to "Meet {name}". */
  title?: string;
  /** Optional link label. Falls back to "Meet {role}". */
  linkLabel?: string;
  role: string;
  blurb: string;
  image: string;
  tone: "sky" | "gold" | "lime" | "coral" | "green";
  to: string;
}

const toneClasses: Record<StoryCard["tone"], string> = {
  sky: "bg-brand-sky text-brand-green-900",
  gold: "bg-brand-gold-light text-brand-green-900",
  lime: "bg-brand-lime text-brand-green-900",
  coral: "bg-brand-coral text-ink",
  green: "bg-brand-green-900 text-white",
};

export function StoryCarousel({ title, description, cards }: { title: string; description?: string; cards: StoryCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      setAtEnd(track.scrollLeft >= max - 2);
      const children = Array.from(track.children) as HTMLElement[];
      if (!children.length) return;
      const left = track.getBoundingClientRect().left;
      const nearest = children.reduce((best, card, i) =>
        Math.abs(card.getBoundingClientRect().left - left) < Math.abs(children[best].getBoundingClientRect().left - left) ? i : best, 0);
      setIndex(nearest);
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(sync);
    resize?.observe(track);
    window.addEventListener("resize", sync);
    return () => { track.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); resize?.disconnect(); };
  }, [cards.length]);

  function scrollToIndex(next: number) {
    const clamped = Math.max(0, Math.min(cards.length - 1, next));
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section data-reveal className="story-section bg-white py-16 sm:py-20" aria-labelledby="story-section-title">
      <div className="story-layout">
        <div className="story-intro">
          <h2 id="story-section-title" className="story-section-title">{title}</h2>
          {description && <p className="mt-7 max-w-xs text-sm leading-relaxed text-ink/80">{description}</p>}
        </div>
        <div className="story-carousel min-w-0">
          <ul ref={trackRef} tabIndex={0} aria-label="Student and alumni stories" onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); scrollToIndex(index + 1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); scrollToIndex(index - 1); }
          }} className="story-track focus-ring scrollbar-none flex snap-x snap-mandatory overflow-x-auto">
            {cards.map((card, i) => (
              <li key={card.name} className="story-card shrink-0 snap-start">
                <div className={cn("story-card-panel", toneClasses[card.tone], i === index && "is-active")}>
                  <img src={card.image} alt="" className="story-portrait" loading="lazy" />
                  <div className="story-card-content">
                    <p className="story-card-title">{card.title ?? `Meet ${card.name}`}</p>
                    <p className="story-card-copy">{card.blurb}</p>
                    <Link to={card.to} className="focus-ring story-card-link">{card.linkLabel ?? `Meet ${card.role}`} <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="story-controls">
            <div className="story-progress" role="group" aria-label="Story slides">
              {cards.map((card, i) => <button key={card.name} type="button" onClick={() => scrollToIndex(i)} aria-label={`Go to ${card.title ?? card.name}`} aria-current={i === index ? "true" : undefined} className="story-progress-button focus-ring"><span className={cn("story-progress-segment", i <= index && "is-active")} /></button>)}
            </div>
            <button type="button" onClick={() => scrollToIndex(index - 1)} disabled={index === 0} aria-label="Previous story" className="story-arrow focus-ring">←</button>
            <button type="button" onClick={() => scrollToIndex(index + 1)} disabled={atEnd} aria-label="Next story" className="story-arrow focus-ring">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect } from "react";

/** Enhance visible content; without an observer, CSS or JS every element remains visible. */
export function useScrollReveal(route: string) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // `data-reveal="repeat"` replays its animation on every entry, which is
        // handy for sections whose motion is the point (and for reviewing it).
        const replays = (entry.target as HTMLElement).dataset.reveal === "repeat";
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          if (!replays) observer.unobserve(entry.target);
        } else if (replays) {
          entry.target.classList.remove("is-revealed");
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [route]);
}

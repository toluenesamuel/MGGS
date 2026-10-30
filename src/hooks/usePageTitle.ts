import { useEffect } from "react";
import { siteInfo } from "@/data/site";

const MAX_TITLE = 62;

/**
 * Keeps the browser tab / search-result title in step with the page being shown,
 * derived from the page's own <h1> so titles never drift from the content.
 * Long page names fall back to the MGGS abbreviation so titles stay readable in
 * search results and browser tabs.
 */
export function usePageTitle(route: string) {
  useEffect(() => {
    let cancelled = false;
    const apply = () => {
      if (cancelled) return;
      const heading = document.querySelector<HTMLHeadingElement>("main h1");
      const label = heading?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (document.title !== compose(route, label)) document.title = compose(route, label);
    };
    // After the page has rendered, so its own heading is present.
    const frame = window.requestAnimationFrame(apply);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [route]);
}

function compose(route: string, label: string): string {
  if (route === "/" || !label) {
    return fit(`${siteInfo.name} | ${siteInfo.motto}`, `${siteInfo.shortName} | ${siteInfo.motto}`);
  }
  const full = `${label} | ${siteInfo.name}`;
  if (full.length <= MAX_TITLE) return full;
  const short = `${label} | ${siteInfo.shortName}`;
  if (short.length <= MAX_TITLE) return short;
  const room = MAX_TITLE - siteInfo.shortName.length - 6;
  return `${label.slice(0, room).trimEnd()}… | ${siteInfo.shortName}`;
}

function fit(long: string, short: string): string {
  return long.length <= MAX_TITLE ? long : short;
}

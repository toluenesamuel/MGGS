# Marvellous Greatness Group of Schools (MGGS) — Website

A React + Vite + Tailwind implementation of the Marvellous Greatness Group of
Schools (MGGS) website. MGGS is a school in the **Akobo–Ojurin** area of
**Ibadan, Oyo State, Nigeria**. Its motto is **“Towards Greatness.”** and its
guiding values are **Discipline**, **Dedication** and **Excellent Performance**.

The design system, layouts, animations, transitions, responsive behaviour and
component architecture are retained from the original build; the school-specific
content, navigation labels and routes have been adapted for MGGS.

## Run locally

```bash
npm install
npm run dev      # dev server (Vite)
npm run build    # production build (single-file output in dist/)
npm run preview  # preview the production build
```

## Hero media (film + image sequence)

The homepage hero plays a 15-second school film — a slow aerial push-in over
the campus that resolves on the MGGS badge, the school name and the motto — then
crossfades through five still frames and loops back to the film. It is driven by
`src/data/hero.ts` and rendered by `src/components/sections/HeroBackdrop.tsx`.

- Film: `public/media/mggs-hero.mp4`, poster `public/media/mggs-hero-poster.jpg`.
- Rebuild it with `python3 scripts/render-hero-video.py` (see
  `public/media/README.md`); the same script generates the MGGS badge
  (`public/images/mggs-logo.png`) used by the header/footer and the favicon.
- To use the school's own footage instead, replace the MP4 — no code changes.
- If the film is missing or cannot be decoded, the hero runs the still-frame
  sequence on its own, so nothing ever renders blank. Under
  `prefers-reduced-motion: reduce` the hero holds one frame and does not
  autoplay. Every interior page also carries a hero image.

## Where the content lives

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | School identity, motto, values, location, admissions steps |
| `src/data/navigation.ts` | Primary navigation, footer columns, news link |
| `src/data/news.ts` | News and announcement examples, filter types/topics |
| `src/data/genericPages.ts` | Summary copy plus hero image for the long-tail navigation routes |
| `src/data/hero.ts` | Homepage hero film and still-frame sequence |
| `scripts/render-hero-video.py` | Builds the hero film, poster, badge and favicon |
| `src/pages/**` | Bespoke page templates (Home, About, Admissions, Values…) |

## Content still to be supplied by the school

The copy avoids inventing facts. The following items are shown as clearly
identifiable placeholders or neutral wording and should be replaced once the
school confirms them:

1. **Street address** (`siteInfo.address.streetPlaceholder`) — shown on the
   Contact page and noted in the footer.
2. **Telephone number, email address and office hours**
   (`siteInfo.contact.*`) — shown as placeholders on the Contact page.
3. **Official social media accounts** (`siteInfo.socials`) — currently empty;
   footer icons appear automatically once accounts are added.
4. **Fee schedule, payment terms and any additional costs** — the Fees &
   Financial Information page states that figures are provided by the school
   office, with a labelled “awaiting confirmation” panel.
5. **Scholarship / financial support arrangements** — described neutrally, with
   no eligibility criteria or amounts published.
6. **School history** — the Our Story page says a fuller account will be
   published once compiled from school records.
7. **Class levels, programmes and facilities** — content is written in
   grade-neutral language (“pupils”, “every learner”); specific class ranges and
   facilities should be added when confirmed.
8. **News items** — `src/data/news.ts` contains evergreen example notices with
   no dates, results, fees or statistics. Replace with the school's real news.
9. **Campus photography** — current images are carried over from the original
   design. Replace with photographs of the MGGS campus when available. Every
   page hero uses one of these images; swap the `src` values in
   `src/data/hero.ts` and `src/data/genericPages.ts` to change them.
10. **Hero film and logo** — the current film, campus image and MGGS badge are
    placeholders produced for this build. Supply the school's own footage and
    official logo artwork when available (`public/media/mggs-hero.mp4`,
    `public/images/mggs-logo.png`).

## Checks

```bash
npx tsc --noEmit            # types
npm run build               # production build

# content regression (all routes: headings, page titles, no outdated copy,
# image + internal link integrity) — needs jsdom, installed on demand:
npm install --no-save jsdom@25.0.1
npx esbuild src/main.tsx --bundle --format=iife --outfile=/tmp/app.js \
  --loader:.css=text --jsx=automatic --alias:@=./src \
  --define:process.env.NODE_ENV='"production"'
node tests/content-check.mjs /tmp/app.js
```

## Notes

- `docs/` contains research and motion notes from the original design study
  (see `docs/mggs-content-adaptation.md` for what changed). The screenshots in
  `docs/screenshots/` were captured **before** the content adaptation and show
  the earlier school name; they document the animation/interaction work only.
- `tests/` holds optional checks. `content-check.mjs` needs `jsdom`;
  `browser.cjs`, `menu.cjs` and `story-carousel.cjs` need `playwright-core`,
  `@axe-core/playwright` and a Chromium binary (`CHROMIUM_PATH`, default
  `/tmp/chromium`). None are installed by default.
- Page titles follow the route: the homepage leads with the school name,
  interior pages lead with the page (e.g. `Our Values | MGGS`), keeping every
  title under ~62 characters. Social preview (Open Graph/Twitter) tags live in
  `index.html` and use the hero poster as the share image.

# Marvelous Greatness Schools (MGGS) — Website

A React + Vite + Tailwind implementation of the Marvelous Greatness Schools website.
MGGS is a school in the **Akobo–Ojurin** area of **Ibadan, Oyo State, Nigeria**.
Its motto is **“Towards Greatness.”** and its guiding values are **Discipline**,
**Dedication** and **Excellent Performance**.

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

The homepage hero plays the school film first, then crossfades through five
still frames and loops back to the film. It is driven by `src/data/hero.ts`
and rendered by `src/components/sections/HeroBackdrop.tsx`.

To add the film:

1. Save it as **`public/media/mggs-hero.mp4`** (H.264/MP4), optionally
   `public/media/mggs-hero.webm`. See `public/media/README.md` for guidance.
2. That's all — the hero loads it automatically and moves to the still frames
   when it ends. Edit `heroFrames` / `heroImageDuration` in `src/data/hero.ts`
   to change the pictures or timing.

Until the file is present (or if it cannot be decoded), the hero gracefully runs
the still-frame sequence on its own, so nothing ever renders blank. With
`prefers-reduced-motion: reduce`, the hero holds on one frame and does not
autoplay the film. Every interior page also carries a hero image.

## Where the content lives

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | School identity, motto, values, location, admissions steps |
| `src/data/navigation.ts` | Primary navigation, footer columns, news link |
| `src/data/news.ts` | News and announcement examples, filter types/topics |
| `src/data/genericPages.ts` | Summary copy plus hero image for the long-tail navigation routes |
| `src/data/hero.ts` | Homepage hero film and still-frame sequence |
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
10. **Hero film** — the video itself has not been added: save it as
    `public/media/mggs-hero.mp4`.

## Notes

- `docs/` contains research and motion notes from the original design study
  (see `docs/mggs-content-adaptation.md` for what changed). The screenshots in
  `docs/screenshots/` were captured **before** the content adaptation and show
  the earlier school name; they document the animation/interaction work only.
- `tests/` holds optional browser checks. They require `playwright-core`,
  `@axe-core/playwright` and a Chromium binary (`CHROMIUM_PATH`, default
  `/tmp/chromium`), which are not installed by default.

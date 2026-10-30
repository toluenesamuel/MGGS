# MGGS Content Adaptation

This project began as a design/animation study. It now presents the
**Marvellous Greatness Group of Schools (MGGS)** — a school in Akobo–Ojurin,
Ibadan, Oyo State, Nigeria — with the motto **“Towards Greatness.”** and the
values **Discipline**, **Dedication** and **Excellent Performance**.

**Nothing about the visual implementation changed:** layouts, section
components, colour and type scales, scroll-reveal and hero motion, menu/search
transitions, the story carousel, the filterable news grid, forms, focus
management, reduced-motion handling and responsive breakpoints are all the
original work. The only component edits were the minimum needed to display new
content (see “Small component adjustments” below).

## What was adapted

### Identity and shared data
- `src/data/site.ts` — replaced the previous school's facts with MGGS identity
  (name, `MGGS` monogram, motto, values, Akobo–Ojurin/Ibadan location), plus a
  step-by-step admissions sequence. The previous numeric “by the numbers”,
  enrolment, university and timeline data was removed rather than re-labelled,
  because none of it is confirmed for MGGS.
- `index.html` — title and meta description now describe MGGS and its location.

### Navigation and routing
All section groups were re-labelled to sections MGGS can genuinely fill, and
country/curriculum-specific routes were replaced rather than renamed:

| Previous group | Now | Notes |
| --- | --- | --- |
| Admissions | Admissions | Boarding programme route replaced by **Parent Partnership**; tuition route replaced by **Fees & Financial Information** |
| Learning | Academics | IB programme routes replaced with academic approach, teaching, moral instruction, co-curricular, student support and preparation for the future |
| Innovation | Student Life | Centre/academy routes replaced with Arts & Culture, Sports & Fitness, Clubs & Societies, Leadership & Service |
| Community | Community | Alums → Parents & Families / Student & Alumni Stories / Our Educators |
| The Campus | Our Campus | Reworked around Akobo–Ojurin; venue rentals and camps removed |
| Giving | Giving | Kept (donation form is clearly marked as a demonstration) |
| About | About | “The Branksome Difference” → **The MGGS Difference**; history → **Our Story**; new **Our Values** page; principal page dropped (leadership covered under Leadership & Governance) |
| `Branksome News` | `MGGS News` (`#/mggs-news`) | All card and article links updated |

News article URLs (`/mggs-news/<slug>`) are generated from `src/data/news.ts`.

### Pages rewritten with MGGS copy
- `src/pages/Home.tsx` — hero, welcome, admissions band, academic section,
  three programme cards (now academic / character / co-curricular), values grid
  (replacing the numeric stat band), student-life feature, story carousel,
  news and both closing calls to action.
- `src/pages/about/MGGSDifference.tsx` (was `BranksomeDifference.tsx`)
- `src/pages/about/OurStory.tsx` (was `OurHistory.tsx`) — no invented founding
  dates or names; a labelled note says a fuller history will be published.
- `src/pages/about/OurValues.tsx` (new)
- `src/pages/about/ContactUs.tsx` — Canada-specific directions, portal link,
  security line and venue-rental card replaced with school office, admissions
  and careers information plus an enquiry form.
- `src/pages/admissions/StartHere.tsx` — “Important Dates” timeline replaced by
  “How Admissions Works”; “Our Programs” cards re-pointed.
- `src/pages/admissions/HowToApply.tsx` — grade-band tabs (JK–6, 7–10, 11–12,
  Boarding) replaced with process tabs: Before You Apply / Completing Your
  Application / After You Apply / Visiting the School.
- `src/pages/admissions/VisitUs.tsx` — campus description, virtual tour and
  open-house claims replaced with neutral visit options.
- `src/pages/admissions/FeesAndFinancialInformation.tsx` (was
  `TuitionFinancialSupport.tsx`) — no fees, bursaries or scholarships invented;
  a labelled “awaiting confirmation” panel explains where figures will appear.
- `src/pages/admissions/ParentPartnership.tsx` (was `BoardingProgram.tsx`) —
  the same hero/image-split/feature/CTA layout, repurposed to the
  home–school partnership value.
- `src/data/genericPages.ts` — all 24 summary pages rewritten for MGGS sections.
- `src/data/news.ts` — 12 evergreen example notices, no dates or results.

### Small component adjustments (content-driven only)
- `HeaderBrand` / `Footer` — MGGS monogram and school name; the name/size
  classes were reduced slightly so the longer name still fits at 320 px. The
  land acknowledgement (specific to the previous school's location) was replaced
  with the school motto; social icons render only when accounts exist.
- `MobileMenu` / `SearchOverlay` — nav order, quick links and search copy.
- `StoryCarousel` — added optional `title` / `linkLabel` fields so cards can be
  headed by a value or theme instead of “Meet {name}”; the carousel mechanics,
  progress controls, keyboard handling and active-card scaling are untouched.
- `InquiryForm` — “Grade of Interest” select (Canadian/IB grade bands) became a
  “Class of Interest” text field; validation and layout unchanged.
- `DonationForm` — NGN currency, school-appropriate designations and preset
  amounts; still a clearly labelled demonstration form.
- `SectionPage` — the internal “shared content template” note became a
  school-facing “this page is being completed” note, and now passes the
  page's hero image through.
- Brand lockups now use the generated MGGS badge (`public/images/mggs-logo.png`)
  in the header and footer, plus a favicon; the header wordmark is two lines
  ("Marvellous Greatness" / "Group of Schools") to fit the longer official name,
  and the homepage hero eyebrow wraps on narrow screens.
- `usePageTitle` (new) — sets a per-route document title derived from the page's
  own `<h1>`, falling back to the MGGS abbreviation so titles stay under ~62
  characters; `index.html` also carries Open Graph/Twitter link-preview tags.
- `HeroBackdrop` skips the film entirely on data-saver / 2G connections and uses
  the still frames instead.
- `scripts/render-hero-video.py` (new) renders the hero film, poster, badge and
  favicon from `scripts/assets/hero-aerial.png`.
- `HeroBackdrop` (new, `src/components/sections/` ) — the homepage hero
  backdrop plays the school film, then crossfades through five still frames and
  loops, using the existing `hero-visual` reveal animation plus a new
  `hero-frame` crossfade/drift defined in `src/index.css`. It falls back to the
  still frames when no film is available and holds a single frame under
  reduced-motion. Every interior page hero now receives an image
  (`content.image` for shared templates, explicit `image` props elsewhere).

### Tests
`tests/*.cjs` were updated for the new carousel card names and the
`#process` timeline anchor. The reference-site fetch in `tests/browser.cjs` was
removed. The screenshots under `docs/screenshots/` predate this adaptation and
still show the earlier school name; they document motion/interaction behaviour
only.

### Checks added later
- `tests/content-check.mjs` — walks every route in jsdom and fails on missing
  headings, missing/duplicate/overlong page titles, outdated organisation copy,
  missing images or links to unknown routes. (It caught an 82-character news
  title, now fixed.)

## Verification performed

- `npx tsc --noEmit` — clean.
- `npm run build` — clean production build.
- DOM smoke test of all 39 routes (jsdom + esbuild bundle): every route renders
  its expected `<h1>`, with no runtime errors, no missing image references and
  no residual references to the previous school, city, country, curriculum,
  boarding or single-sex wording.
- Internal link crawl across every route: no unknown `#/…` targets.
- Menu groups, tabs, accordions, page menu, news topic filtering, search,
  enquiry-form validation/submission and donation-form amounts all exercised
  successfully. A real browser was not available in this environment, so
  pixel-level screenshot review was not possible; layout classes were not
  altered beyond the header type sizes noted above.

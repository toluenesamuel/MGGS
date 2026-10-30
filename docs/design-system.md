# Design System — MGGS

The layout and component vocabulary were reconstructed from a design reference (see `branksome-reference-audit.md`); the **colour system is the school's own**, derived from the MGGS uniform and documented in [`colour-system.md`](./colour-system.md). This is the official-style site for Marvellous Greatness Group of Schools, Ibadan.

## Colour

The palette is **derived from the MGGS school uniform** (rose-pink blouse, hue 350°,
over a near-black charcoal skirt/trousers) and organised as semantic design tokens in
the `@theme` block of `src/index.css`. The full token table, provenance, contrast
figures and usage rules live in [`colour-system.md`](./colour-system.md); validate
with `python3 scripts/check-contrast.py --strict`.

| Role | Token | Hex |
|---|---|---|
| Primary | `--color-primary` | `#A8324F` |
| Primary dark | `--color-primary-dark` | `#6E1F38` |
| Primary light | `--color-primary-light` | `#F7E4EA` |
| Secondary | `--color-secondary` | `#3A2A31` |
| Accent | `--color-accent` / `--color-accent-soft` | `#C68A2E` / `#E3B65E` |
| Background / surface | `--color-background` / `--color-surface` | `#FBF7F7` / `#FFFFFF` |
| Text | `--color-text` / `--color-text-muted` | `#1E1720` / `#5C4A50` |
| Borders | `--color-border` / `--color-control-border` | `#E9DCDF` / `#9F8288` |

Usage rule: **one flat colour per full-bleed section**, never gradients, never two
accents mixed in one band. Most sections use light tints (`primary-light`,
`surface-muted`); solid `primary` is reserved for CTAs and `primary-dark` for the
footer and one or two dark bands.

## Typography

- Headings: **Archivo**, 700/800 weight, uppercase or sentence case depending on level, tight tracking — approximates the condensed grotesque used on the reference (unverified exact family, documented assumption).
- Body: **Inter**, 400/500/600 — clean humanist sans matching the reference's body copy.
- Scale: `text-sm` (14px) meta/labels, `text-base`/`text-lg` body, `text-3xl`–`text-6xl` display headings with `clamp()`-like responsive steps via Tailwind breakpoints.
- All-caps is used sparingly and only for short labels/eyebrows/buttons (as on reference), never for full paragraphs (accessibility: avoid long all-caps runs).

## Layout

- Max content width: `1280px` (`max-w-7xl`) for standard sections, `1600px` for full-bleed media bands that still cap text columns.
- Section vertical rhythm: `py-16` mobile → `py-24` desktop, consistent across templates.
- Grid: 12-col implicit via Tailwind `grid-cols-*`; content split patterns are 1-col mobile → 2-col (image/text) or 3–4-col (cards) at `md`/`lg`.
- Full-bleed alternating colour bands between modules (primary → primary-light → surface-muted → gold → white…) reproduce the reference's rhythm in the school's own palette.

## Components (see `src/components`)

- `Header` / `MobileMenu` — sticky, mega-menu dropdowns per top-level nav item, search overlay, "Request Info" text link + "Apply Now" solid button, hamburger on mobile with slide-in panel, full keyboard support (Escape closes, focus trap, arrow/Tab order).
- `Breadcrumbs` — "Home / Section / Page" trail on every interior page.
- `PageMenu` — collapsible in-page jump-link accordion directly under interior hero, mirroring the reference's "PAGE MENU" control.
- `Hero` — full-bleed color band + headline + supporting copy + 1–2 CTAs, variant prop for primary/primary-light/surface bands.
- `StatBlock` — icon + number + label grid ("Branksome by the Numbers" pattern).
- `StoryCarousel` — horizontally scrollable card carousel with prev/next buttons + dot/progress indicator, keyboard arrow support.
- `NewsCard` / `NewsGrid` / `NewsFilters` — tag pills, excerpt, read time, checkbox facet filters, client-side filtering + pagination.
- `Timeline` — bordered accordion rows for dated milestones (iCAST construction history / Admissions important dates).
- `ImageTextSplit` — alternating image/text 2-col editorial module.
- `IconFeatureGrid` — 3–4 col icon+title+copy grid.
- `CTABanner` — full-bleed colored strip with heading + button, used for "Make a Gift", "Start Your Journey".
- `Accordion` — generic expand/collapse, used for FAQ-style content and PageMenu.
- `Footer` — `primary-dark`, multi-column link grid + social + accreditation row + legal line, built from the verified link graph.

## Motion

- Reduced, purposeful motion only: hover elevation/translate on cards and buttons, smooth-scroll for in-page anchors, carousel slide transition.
- `prefers-reduced-motion: reduce` respected — a global CSS rule disables non-essential transitions/animations.

## Accessibility baseline (target WCAG 2.2 AA)

- All 28 text/UI colour pairings checked for WCAG AA (4.5:1 text, 3:1 borders and focus rings) by `scripts/check-contrast.py --strict`.
- All interactive controls reachable by keyboard, with visible focus rings (`focus-visible` ring in `--color-focus`, which clears 3:1 on both light and dark surfaces).
- Menus use `aria-expanded`, `aria-controls`, `aria-haspopup`; mobile menu traps focus and returns focus to the trigger on close.
- Images carry descriptive `alt` text; decorative SVG icons are `aria-hidden`.
- Form fields have associated `<label>`s and live validation messages with `aria-live`/`role="alert"`.
- Touch targets ≥ 44×44px on mobile nav and buttons.

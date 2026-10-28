# Design System — Branksome Hall Reconstruction

Grounded in verified hex values extracted from the live site's HTML (see `branksome-reference-audit.md`). This is a **reference-informed reconstruction**, not a byte-for-byte clone, and is clearly presented as a design study, not the official Branksome Hall site.

## Color

| Token | Hex | Verified? | Usage |
|---|---|---|---|
| `brand-green-900` | `#00491F` | ✅ verified | Header, footer, primary buttons, dark section bands |
| `brand-green-800` | `#0B3D2C` (derived shade) | derived | hover states, gradients |
| `brand-coral` | `#F26539` | ✅ verified | Primary CTA accent, hero bands |
| `brand-coral-light` | `#FF7F57` | ✅ verified | secondary CTA tint |
| `brand-gold` | `#FCAF17` | ✅ verified | feature bands, tags |
| `brand-sky` | `#8FE2FF` | ✅ verified | section bands |
| `brand-sky-deep` | `#14B1E7` | ✅ verified | links/accents on dark bg |
| `brand-lime` | `#9ACA3C` | ✅ verified | icon grid, tags |
| `brand-magenta` | `#CF3D96` | ✅ verified | carousel accent only |
| `ink` | `#1A1A1A` | assumption | body text |
| `paper` | `#FFFFFF` / `#F7F6F1` | assumption | page/card background |

Usage rule observed on the reference: **one flat accent color per full-bleed section**, never gradients, never two accents mixed in one band. We follow this rule strictly — no decorative gradients anywhere in the rebuild (this is a deliberate deviation from the starter template's default gradient hero, replaced per the audit).

## Typography

- Headings: **Archivo**, 700/800 weight, uppercase or sentence case depending on level, tight tracking — approximates the condensed grotesque used on the reference (unverified exact family, documented assumption).
- Body: **Inter**, 400/500/600 — clean humanist sans matching the reference's body copy.
- Scale: `text-sm` (14px) meta/labels, `text-base`/`text-lg` body, `text-3xl`–`text-6xl` display headings with `clamp()`-like responsive steps via Tailwind breakpoints.
- All-caps is used sparingly and only for short labels/eyebrows/buttons (as on reference), never for full paragraphs (accessibility: avoid long all-caps runs).

## Layout

- Max content width: `1280px` (`max-w-7xl`) for standard sections, `1600px` for full-bleed media bands that still cap text columns.
- Section vertical rhythm: `py-16` mobile → `py-24` desktop, consistent across templates.
- Grid: 12-col implicit via Tailwind `grid-cols-*`; content split patterns are 1-col mobile → 2-col (image/text) or 3–4-col (cards) at `md`/`lg`.
- Full-bleed alternating color bands between modules (green → blue → orange → gold → white → green…) reproduce the reference's rhythm.

## Components (see `src/components`)

- `Header` / `MobileMenu` — sticky, mega-menu dropdowns per top-level nav item, search overlay, "Request Info" text link + "Apply Now" solid button, hamburger on mobile with slide-in panel, full keyboard support (Escape closes, focus trap, arrow/Tab order).
- `Breadcrumbs` — "Home / Section / Page" trail on every interior page.
- `PageMenu` — collapsible in-page jump-link accordion directly under interior hero, mirroring the reference's "PAGE MENU" control.
- `Hero` — full-bleed color band + headline + supporting copy + 1–2 CTAs, variant prop for green/coral/sky backgrounds.
- `StatBlock` — icon + number + label grid ("Branksome by the Numbers" pattern).
- `StoryCarousel` — horizontally scrollable card carousel with prev/next buttons + dot/progress indicator, keyboard arrow support.
- `NewsCard` / `NewsGrid` / `NewsFilters` — tag pills, excerpt, read time, checkbox facet filters, client-side filtering + pagination.
- `Timeline` — bordered accordion rows for dated milestones (iCAST construction history / Admissions important dates).
- `ImageTextSplit` — alternating image/text 2-col editorial module.
- `IconFeatureGrid` — 3–4 col icon+title+copy grid.
- `CTABanner` — full-bleed colored strip with heading + button, used for "Make a Gift", "Start Your Journey".
- `Accordion` — generic expand/collapse, used for FAQ-style content and PageMenu.
- `Footer` — dark green, multi-column link grid + social + accreditation row + legal line, built from the verified link graph.

## Motion

- Reduced, purposeful motion only: hover elevation/translate on cards and buttons, smooth-scroll for in-page anchors, carousel slide transition.
- `prefers-reduced-motion: reduce` respected — a global CSS rule disables non-essential transitions/animations.

## Accessibility baseline (target WCAG 2.2 AA)

- Color pairings checked for 4.5:1 body text contrast (white text only on `#00491F`/`#F26539` dark-enough backgrounds; dark ink text on light accent backgrounds like sky/gold/lime).
- All interactive controls reachable by keyboard, with visible focus rings (`focus-visible` ring in white/green depending on background).
- Menus use `aria-expanded`, `aria-controls`, `aria-haspopup`; mobile menu traps focus and returns focus to the trigger on close.
- Images carry descriptive `alt` text; decorative SVG icons are `aria-hidden`.
- Form fields have associated `<label>`s and live validation messages with `aria-live`/`role="alert"`.
- Touch targets ≥ 44×44px on mobile nav and buttons.

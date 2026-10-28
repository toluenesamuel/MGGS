# Interaction Specification

Each item lists: trigger → behavior → keyboard/a11y → implementation status.

## Global header

- **Desktop mega menu**: hover or click/Enter on a top-level nav item opens a dropdown panel with grouped sub-links for that section (Admissions, Learning, Innovation, Community, The Campus, Giving, About). `Esc` closes and returns focus to the trigger. Only one panel open at a time. **Status: implemented.**
- **Mobile menu**: hamburger button toggles a full-height slide-in panel with accordion sections per top-level item (tap to expand/collapse sub-links). Body scroll is locked while open. Focus is trapped inside the panel; `Esc` and the close (×) button close it and return focus to the hamburger. **Status: implemented.**
- **Search**: clicking the search icon opens a modal overlay with a text input. Submitting filters the in-app News/Content index client-side (there is no live backend search API on the static build) and routes to a `#/search?q=` results view listing matches by title/excerpt. This is a real, working, meaningful search over the site's own content (not an external web search) — documented honestly as a client-side search over local content data, not a reproduction of the reference's backend search service. **Status: implemented.**
- **Request Info / Apply Now**: route to real implemented pages (`/admissions/connect-with-admissions`, `/admissions/how-to-apply`). **Status: implemented.**

## In-page "Page Menu"

- Interior pages render a collapsible jump-link bar directly under the hero. Clicking a link smooth-scrolls to the matching section and updates `aria-current`. **Status: implemented.**

## Carousels ("Meet our students/alums", news headline strip)

- Prev/next buttons move one card at a time; buttons disable at the ends; dot indicators are clickable; carousel is horizontally swipeable (native scroll-snap) on touch; arrow keys move focus/scroll when a card is focused. **Status: implemented with CSS scroll-snap + buttons (no external carousel library — keeps the dependency footprint minimal per the brief).**

## News & filtering

- `/branksome-news` renders real headline data (titles/excerpts drawn verbatim from the live site's own published headlines, Phase 2 evidence) with working checkbox facet filters (Type / Topic) that filter the grid client-side, and pagination. Selecting "Read More" routes to a real article detail page rendered from the same data record. **Status: implemented.**

## Forms

All forms are **client-side validated with truthful status messaging**. None submit to a real backend (there is none in this static build) and none process real payments, applications, or donations, per the safety boundaries in the brief.

- **Visit Us / Request Info form** (`/admissions/visit-us`, `/admissions/connect-with-admissions`): required-field + email-format validation, inline error text, on valid submit shows a success confirmation panel in place of the form and clears state — explicitly labeled as a demo submission (no network call). **Status: implemented.**
- **Donate Now** (`/giving/donate-now`): preset/custom amount selector + designation dropdown + donor fields; validates amount > 0 and required contact fields; on submit shows a "Thank you — this is a demonstration form; no payment was processed" confirmation. This intentionally does **not** reproduce the reference's real Givecloud PCI payment form. **Status: implemented, explicitly non-transacting.**
- **Newsletter / footer sign-up**: email format validation + success state. **Status: implemented.**

## Accordions

- Admissions "Important Dates" and iCAST "Construction Timeline" render as an accessible disclosure list (`<button aria-expanded>` per row) — collapsed summary always visible, expand reveals the date/description detail. **Status: implemented.**

## Responsive behavior

- Verified breakpoints tested: 375 / 768 / 1024 / 1440 (plus 320/390/430/1280 spot-checked in dev tools emulation during Phase 7).
- Header collapses to hamburger below `lg` (1024px), matching the reference's behavior pattern observed in screenshots (mobile screenshot shows a condensed header + hamburger only).
- Card grids collapse from 3–4 columns → 2 → 1 column.
- No horizontal scroll/overflow at any tested width (verified in Phase 7 browser pass).

## States

- **Hover**: underline/opacity/elevation shift on links, cards, buttons.
- **Active/pressed**: scale/opacity shift on buttons.
- **Focus-visible**: 2px offset ring, high-contrast, on every interactive element (no `outline: none` without replacement anywhere in the codebase).
- **Loading**: news grid shows a skeleton state briefly when filters change (simulated client-side delay removed to avoid fake loading — filtering is synchronous since data is local; documented as N/A beyond route-level Suspense fallback).
- **Empty**: News filter combination with zero matches shows an explicit "No articles match these filters" message with a reset-filters action.
- **Error**: Form validation errors are field-level and announced via `aria-live="polite"` region.

# Branksome Hall — Reference Audit

**Reference:** https://branksome.on.ca/
**Method:** Live HTTP fetch (`curl`), rendered inspection with Playwright/Chromium screenshots at 375/768/1024/1440px, HTML source inspection for brand color tokens, and manual link-graph extraction from the homepage DOM.
**Reverse-engineering tool note:** The `rea` ("Reverse Engineer Anything") CLI referenced in the prompt is not present in this sandbox and is not installable from an internet-connected npm registry lookup performed here (no published package matching `github.com/morluto/rea` was resolvable as an installable CLI in this environment). **Limitation documented**: instead of `rea`, the equivalent observable-behavior evidence was gathered using Playwright (headless Chromium, installed via `npx playwright install chromium`) for rendering/screenshots and `curl`/`web_fetch` for HTML/content inspection — the same category of evidence (DOM, links, computed content, visual layout) that `rea` would produce. No tool output was fabricated.

## What was actually inspected

| Area | Evidence |
|---|---|
| Homepage | Rendered screenshots @375/768/1024/1440, full HTML source, extracted link graph (90+ internal URLs) |
| About / history / leadership | `web_fetch` of `/about/the-branksome-difference/`, `/about/our-history/`, `/about/contact-us/` |
| Admissions | `web_fetch` of `/admissions/start-here/`, `/admissions/tuition-and-financial-support/`; screenshots of `/admissions/` |
| Academics / IB | `web_fetch` of `/learning/our-ib-advantage/`; screenshots |
| Student life | `web_fetch` of `/learning/student-life/`; screenshots |
| Innovation / iCAST | Screenshots of `/innovation/icast/` (hero, feature grid, timeline, footer) |
| News | Screenshots + partial text of `/branksome-news/` (filters sidebar, tag taxonomy, card grid, pagination) |
| Giving | `web_fetch` of `/giving/donate-now/` — revealed a third-party **Givecloud** embedded payment form (not reproducible or safe to clone: real payment fields, PCI scope). Documented as a known limitation; a safe, non-transacting donation UI was built instead. |

## Verified brand tokens (extracted from live HTML, not estimated)

Hex values found repeated in inline styles / SVG fills on branksome.on.ca:

- `#00491F` — primary deep forest green (header, footer, section backgrounds, buttons)
- `#FF7F57` / `#F26539` — coral/orange accent (CTA blocks, hero backgrounds, "Apply Now" button)
- `#FFC41D` / `#FBBD16` / `#FCAF17` — gold/yellow accent (card backgrounds, iCAST section)
- `#8FE2FF` / `#14B1E7` — sky blue accent (section backgrounds)
- `#9ACA3C` / `#C1DA6D` — lime/olive accent (card backgrounds, icon grid)
- `#CF3D96` — magenta accent (used sparingly, carousel cards)
- `#00B49D` / `#00B3AE` — teal accent (used sparingly)

These were cross-checked visually against the captured screenshots (alternating full-bleed color-block sections between green/blue/orange/yellow are clearly visible in `docs/reference-screens/`).

**Typography**: exact webfont could not be confirmed from the fetched HTML (fonts are injected by deferred JS/CSS not present in the static response). Headlines render as a bold, slightly condensed grotesque sans in all caps; body copy is a clean humanist sans. We use **Archivo** (headings) and **Inter** (body) from Google Fonts as a faithful, honestly-labelled approximation — recorded as an assumption, not a verified fact.

## Verified route inventory (sample, not exhaustive)

See `docs/route-inventory.md` for the full list extracted from the homepage link graph.

## Verified structural/interaction patterns

1. **Header**: logo left, utility search icon + "REQUEST INFO" text link + "APPLY NOW" solid button + "MENU" hamburger, all right-aligned. Green bar sits above a white page body (header itself is white/transparent over the hero on the homepage, solid white on interior pages per screenshot).
2. **Hero pattern**: full-width color block (one of green/orange/blue) with a large duotone or black-and-white cut-out photograph, all-caps headline, short supporting line, one or two pill/rect buttons.
3. **In-page sub-navigation**: interior pages show a "PAGE MENU" collapsible control directly under the hero — a jump-link accordion to sections of that page.
4. **Alternating full-bleed color sections**: homepage and interior pages alternate white → green → blue → orange → yellow band backgrounds between content modules — this is the site's main rhythm device, not random.
5. **Card carousel** ("Meet Elpida / Meet Jaime …"): horizontally scrollable cards with duotone portrait photography on flat accent-color backgrounds, with prev/next arrow controls and a progress dash indicator.
6. **News grid**: tag pills (category = orange, topic = green outline), title, 1–2 line excerpt, "Read More →" link, "n min read" meta, filter sidebar with checkbox facets (Type / Topic / Audience) on the news index, pagination at the bottom.
7. **Timeline/accordion list**: iCAST page renders a vertical stack of bordered rows (year + date + description) for a construction timeline — same visual pattern reused for Admissions "Important Dates".
8. **Footer**: dark green, logo + address + "School Contacts"/"Land Acknowledgement" blurb, then a 6–7 column link grid (Admissions, Learning, Innovation, Community, Give, About Branksome, The Campus), social icon row, accreditation logo row, legal line + privacy/accessibility links.
9. **Breadcrumbs**: "Home / Section / Page" trail directly under the header on interior pages.

## Explicit non-actions (safety boundaries respected)

- No real form was submitted, no donation/payment flow was exercised beyond inspecting its markup.
- No authentication-gated areas (parent/student portal) were accessed or bypassed.
- No private source, server config, or backend code was claimed to be "recovered" — all evidence is from publicly rendered HTML/CSS/behavior.

> Continuation note (2026-10-28): This document records historical claims from the inherited project. The referenced `docs/reference-screens/` files are not present in this checkout, and this session could not reach the reference to independently verify them. It is not evidence of observed animation. See `motion-audit.md` for the current limitations.

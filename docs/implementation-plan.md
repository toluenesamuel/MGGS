# Implementation Plan

## Environment & constraints discovered (Phase 1)

- Fresh Vite 7 + React 19 + TypeScript + Tailwind CSS v4 project. No router, no state library, no test runner pre-installed.
- `vite-plugin-singlefile` is configured — production build is a **single static HTML file** (all JS/CSS inlined). This rules out server-based routing (`BrowserRouter` + rewrites); a hash-based client router is the correct, dependency-light choice.
- No `AGENTS.md`/`CLAUDE.md`/README with extra constraints were present.
- No git repository exists in the working directory (`git status` → "not a git repository"). Phase 8's git-diff check is therefore N/A; this is recorded rather than worked around by initializing a new repo (avoids an irreversible/unrequested action).
- Browser automation: Playwright is not pre-installed but **is installable** via `npx playwright install chromium` and works (internet access confirmed). Used for reference screenshots (Phase 2) and local implementation testing (Phase 7).
- Agent "skills" referenced (Frontend Design, Web Design Guidelines, Spec Miner) are GitHub repos of prompt/process guidance rather than installable npm packages; there is no package manager or skill-runtime in this sandbox to "install" them into. Their **guidance was applied manually**: deliberate, non-generic visual direction grounded in real brand evidence (Frontend Design), accessibility/semantic rigor (Web Design Guidelines), and evidence-first spec extraction before building (Spec Miner's methodology). This is recorded as a limitation on literal "installation" while the intended working method was still followed.
- REA (`github.com/morluto/rea`) is not an installed/available CLI in this sandbox; its public repo was not fetched as an installable tool. Equivalent observable-behavior evidence was produced with Playwright + curl/web_fetch instead (see audit doc).

## Build approach

1. Keep the existing project skeleton (`src/App.tsx` entry point, Tailwind v4 `@import "tailwindcss"`, path alias `@/*`).
2. Add a minimal in-house hash router (`src/router/router.tsx`) — no new routing dependency.
3. Model real content as typed data modules (`src/data/*.ts`) sourced from Phase 2 evidence (homepage, about, admissions, IB advantage, student life, contact, news headlines all use verbatim or lightly-trimmed real copy with citation comments pointing at the source URL).
4. Build shared layout chrome (Header/MobileMenu/Footer/Breadcrumbs/PageMenu) once, reused by every page.
5. Build reusable content modules (Hero, StatBlock, StoryCarousel, NewsGrid/Filters, Timeline/Accordion, ImageTextSplit, IconFeatureGrid, CTABanner, forms) once, composed differently per page — mirrors the reference's own template-reuse pattern.
6. Implement bespoke pages for the highest-evidence routes (Home, About×3, Admissions×4, Learning×5, Innovation×1, Campus×1, Community×1, News list+detail, Giving×2) and a generic `SectionPage` template (still built from real nav labels + real cross-links, never fabricated statistics) for the remaining long-tail routes in the nav so **no nav link is ever dead**.
7. Images: no stock photography of real Branksome students/campus is scraped or reused (licensing risk). Generated neutral, non-identifying illustrative photography/SVG iconography instead, styled with the verified accent palette, and clearly original to this build.
8. Run `npm run build` after each major milestone to catch TypeScript/build regressions early, not only at the end.

## Acceptance criteria

- `npm run build` succeeds with zero errors.
- Every link in the header mega-menu and footer resolves to an implemented route (no 404 / dead `href="#"`).
- Mobile menu, search overlay, carousels, accordions and forms are operable by mouse, touch (scroll-snap/tap) and keyboard.
- No horizontal overflow at 375/768/1024/1440px.
- Lighthouse-style manual a11y pass: heading order, labels, contrast, focus rings, alt text — all pass (Phase 6).
- Visual rhythm (alternating verified accent-color bands, dark green header/footer, coral/gold/blue section backgrounds) matches the reference pattern (Phase 7 screenshot comparison).

## Continuation (October 2026)

The initial checkout contained many components and page modules, but `App.tsx` still displayed the Vite starter screen. The continuation connects the hash router, layout, existing bespoke pages, news, search, and demonstration forms. Several planned bespoke routes are still short shared-template pages, not complete reproductions; see the code for the current route map. The existing audit is historical and should not be read as proof of fresh reference-site inspection in this session. The live reference could not be directly inspected from this sandbox because outbound access is restricted to approved package and GitHub hosts.

The four requested repositories were downloaded under `/home/user/agent-skills` and their relevant guidance consulted. REA is available via `npx rea-agents`; its web inspection requires a browser/CDP connection and access to the target. No REA capture of the reference was made in this session. The earlier assertion that REA had no npm package is incorrect: the official package is `rea-agents`. The current agent environment cannot invoke Claude or register new MCP tools into the running session.

## Verification continuation

The 2026-10-28 continuation recovered a working Chromium using user-scoped libraries, installed a compatible user-scoped Node, ran REA CLI against the local app, and performed the browser smoke tests documented in `animation-test-report.md`. A page-fetch service reached the reference's text, but the sandbox browser still could not reach its origin; actual reference motion remains unverified. Standalone REA MCP startup succeeded, but Arena integration remains unverified and unsupported by REA's setup client list.

# Animation implementation and recovery

Updated 2026-10-28.

## Recovery / observed specification

- The baseline (`9ceb4bc`) mounted the “Ready to build” starter from `main.tsx`; existing homepage, layout, hash router and page modules were unreachable. The earlier workspace continuation replaced `App.tsx` with a route resolver; that work and the existing components, data and generated assets were preserved.
- The app uses hash routes, e.g. `/#/admissions/how-to-apply`. Several routes remain short shared templates, not complete reference replicas. Search and inquiry/donation forms are local demonstrations and do not connect to school services.
- Existing button transitions, accordion and native snap carousel were retained. `src/hooks/useScrollReveal.ts` enhances visible content via a one-shot IntersectionObserver, cleaned up on route changes. It never hides content as a prerequisite. `src/index.css` holds motion tokens and keyframes; the hero is staged and sections/news are selectively revealed.
- Carousel controls use native scrolling; the indicator follows the card closest to the leading edge and the next button disables at the scroll limit. Reduced motion uses instant scrolling. Carousel indicators now have 32px targets.
- Search and mobile drawer trap focus, restore focus and unlock the body on close. `useExitPresence` retains their visuals briefly for an exit while making the closing layer inert and pointer-transparent immediately. Reduced motion removes the delay. Desktop dropdown closes immediately. Existing accordions use a grid-row transition; page-menu jumps honor reduced motion.
- A responsive-header fix removed detected overflow. News image links have names, stats have valid definition-list structure, and coral text treatments were adjusted for contrast. Archivo and Inter Latin font assets are self-hosted in `public/fonts` with licenses, eliminating the Google Fonts network dependency.
- Reference text extraction was used to correct the hero heading and the four story names and blurbs. The portrait is a generic illustration, not a photograph of the named people. The reference's motion remains unverified; no count-up, autoplay, parallax or cutout-image motion has been invented.

## Skills and REA

Official `skills` installed frontend-design, web-design-guidelines and spec-miner to the project `.agents/skills/` and the universal global `/home/user/.agents/skills/`. The REA skill is also in the project directory. Installer lists these locations but reports no agent for `universal`; it rejects `--agent arena`, so automatic Arena discovery is **not verified**. We read the installed files directly and used their instructions. Web guidelines were retrieved from the official GitHub API because the raw host is blocked; they informed the automated and manual review.

Official REA README currently requires Node 22.23.4+, 24.22.1+ in its respective major, or 26.12.1+. Node 24.22.1 was installed under `/home/user/node-runtime` through the official npm `node` package; system Node was not replaced. With that Node, REA 6.8.0 `mcp doctor --json` successfully initialized its standalone stdio MCP server, verified 229 tools and six prompts, and passed a target-free request. REA CLI `list-browser-targets` and `inspect-web-page` were then used against the local MGGS app (evidence IDs `ev_c25eb817c772241d3797b7de64c28fed95db5b1649333b72bf633ba30ce87231` and `ev_cf9e91fdd264f7897ba4b31bab4cb37a7fb9d1d580aa1a7083c9af5ec7a60bc7`). This is not a reference capture.

REA setup rejects `--client arena` and the exposed Arena tool interface here has no custom MCP registration/restart mechanism. Therefore the standalone MCP test is **not** an Arena connection and REA tools are not available as Arena MCP calls; the CLI was used instead. No unrelated agent configuration was changed.

## Git dependencies

The baseline tracks 2,932 `node_modules` paths. `.gitignore` prevents new untracked dependency files but does not untrack them. Removing them from the index would stage thousands of deletions, so that repository-wide operation remains deferred; local dependencies and the lockfile were preserved.

## Recording handover implementation

`Home.tsx` now has a lower-left, large-heading hero with a delayed `campus-reveal` image fade and a separate blue admissions section with independently staged illustration and copy. Both use existing progressive-enhancement/reduced-motion practices. `StoryCarousel.tsx` now uses larger colored cards, a scrollable focusable track with arrow-key control, native snapping, trailing scroll space so the last card can align, and scroll-derived indicators. The source illustration files and cutout derivatives are in `public/images/`; images were generated as fictional stand-ins, not recovered from the school or recording. The supplied video could not be accessed, so any match to its actual easing, timing, behavior or imagery is unverified; see `motion-audit.md`.

## Screenshot-led navigation

The navigation now uses the user's menu screenshot as visual guidance: a white utility header above a full-height forest-green menu, condensed white category labels, right arrows and a monochrome group image. The group image is a generated fictional stand-in, not photography of real Branksome students. Menu sections expand to existing routes; the desktop uses a second column and mobile uses inline links. Opening uses a short panel entrance with staggered labels and image; closing removes interaction immediately and fades out. Keyboard focus is contained and restored, Escape closes, and reduced motion suppresses nonessential animations.

## Screenshot-led story section

The story section now follows the supplied screenshot: condensed heading and introduction at left, colorful staggered cards at right, and a progress line with square arrow controls below. Card movement remains native snap scrolling; active cards grow from the bottom while inactive cards remain smaller. The real student photographs are not reproduced: the different cut-out portraits are fictional generated illustrations, decorative rather than identifications of the named students and alumnae. Dark text on the light cards is intentional for contrast.

# Animation test report

Updated 2026-10-28. Tests ran against the Vite development application using headless Chromium 153 and Playwright.

## Environment recovery

APT has no local package indexes and the Debian mirrors are blocked, so `apt-get install libnss3 libnspr4` could not locate packages. To run a browser without changing system Node or project dependencies, Chromium and Playwright were installed under `/home/user/browser-tools`; Mozilla NSPR was built from its official GitHub source there, and NSS libraries were obtained from the `chrome-aws-lambda` npm package. Chromium launched with those local library paths and without its single-process flag. These external tool installations are session environment tooling, not project runtime dependencies.

## Results

- `npx tsc --noEmit`: pass.
- `npm run build`: pass.
- `tests/browser.cjs`: pass at widths 320, 375, 390, 430, 768, 1024, 1280 and 1440px, height 850px. Each had zero document horizontal overflow, a `motion-rise` hero animation reaching opacity 1, all 12 marked homepage reveals activated after scroll, and no broken loaded images.
- Interaction checks passed: mobile drawer, nested admissions group, Escape, focus restoration and exit animation/inert state; search submission; page menu; accordion collapse/reopen; direct hash navigation; next story with indicator update; reduced-motion hero animation disabled; desktop menu and Escape at 1600px.
- Homepage axe-core WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tagged checks at 1600px: zero automated violations after fixes. Initial scan found contrast, definition-list structure, unnamed news image links, header accessible-name and carousel target-size violations; these were addressed and retested. This does not constitute full WCAG conformance or cover every page and state.
- No page JavaScript errors or failed requests were recorded on the eight homepage viewport runs. Fonts are local; earlier external Google Fonts requests failed in this network.
- Screenshots: `screenshots/viewport-375.png` and `screenshots/viewport-1440.png` show the actual implementation after entrance, not the reference. No animation video was captured.
- The fetched reference supplied text only; browser access failed (`net::ERR_CONNECTION_CLOSED`) and HTTP probes of both hostnames failed (`SSL_ERROR_SYSCALL`). No reference motion or visual comparison was verified.

## Reproducing

Run the dev server on port 5175 (or set `BASE_URL`), supply `playwright-core`, `@axe-core/playwright` and Chromium in your test environment, then run `node tests/browser.cjs`. `CHROMIUM_PATH` overrides `/tmp/chromium`. In this session the command used `NODE_PATH=/home/user/browser-tools/node_modules` and `LD_LIBRARY_PATH=/home/user/browser-tools/nspr-build/lib:/home/user/browser-tools/lib`; these paths are environment-specific and need not exist on another machine.

## Remaining limitations

No direct rendered inspection of the reference, reference screenshot or video exists. Match of movement, durations, mobile behavior and autoplay cannot be claimed. Touch swipes, every internal route, all forms, other interior page accessibility, animation under all network failures and all assistive technologies were not exhaustively tested. Several interior pages are generic templates, and forms are non-transacting demonstrations. The homepage smoke test and automated accessibility scan are not a substitute for manual visual and WCAG evaluation.

## Recording handover retest

After the hero, admissions and carousel changes, `npx tsc --noEmit` and `npm run build` passed. Headless Chromium test `tests/browser.cjs` passed at 320, 375, 390, 430, 768, 1024, 1280 and 1440px: zero horizontal overflow, 13 marked reveals activated, images loaded, heading animation completed, campus animation name/delay/final opacity checked, and no homepage page errors or failed requests. Mobile carousel Next was tested through Jaime, Titoluwa and Milla, then Previous; indicator tracked each. A separate browser check exercised keyboard ArrowRight on the desktop carousel and checked that section content remains visible when IntersectionObserver is absent. Existing menu, search, page-menu, accordion and reduced-motion checks passed. The homepage axe WCAG-tagged scan at 1600px found no automated violations after correcting one card-button contrast issue; this does not establish full accessibility conformance.

Actual implementation screenshots: `screenshots/viewport-375.png`, `screenshots/viewport-1440.png`, `screenshots/admissions-1440.png`, `screenshots/carousel-390.png`, and `screenshots/carousel-1440.png`. These are not reference images. No direct touch swipe, video recording, or motion comparison with the supplied video was performed. The Drive video and direct reference site remained inaccessible to the browser; user-provided visual descriptions are recorded separately in `motion-audit.md`.

## Screenshot-led menu

Headless Chromium tested the full-screen menu at 320, 390, 768, 1365 and 1600px. Checks passed for overflow, opening, Admissions submenu, Escape, focus restoration, reduced motion and internal navigation. Automated axe WCAG-tagged checks reported no violations in those menu states; this is not a full accessibility audit. The broader browser smoke test and TypeScript/build also passed. Actual implementation screenshots: `screenshots/menu-390.png` and `screenshots/menu-1365.png`.

## Screenshot-led story section

`tests/story-carousel.cjs` exercised the section in Chromium at widths 320, 390, 768, 1024, 1365 and 1440px: no document overflow or page errors; next controls reached all four stories, the previous control returned to the third, and the current progress indicator followed the visible card. A scoped automated axe WCAG-tagged scan reported no violations at those sizes. The section screenshots are `screenshots/stories-390.png` and `screenshots/stories-1365.png`. Automated checks are not a full accessibility audit.

# Route Inventory

Extracted from the live homepage link graph (`curl` + regex extraction of internal `<a href>` targets) and manual navigation. This is the **reference site's** route map. The "Implemented?" column shows what exists in this project's reconstruction (Phase 5).

Legend: ✅ bespoke template · 🟡 shared generic content template (real nav label + real section links, no bespoke layout) · — not built (out of scope for this pass)

## Global

| Reference route | Implemented route | Status |
|---|---|---|
| `/` | `#/` | ✅ Home |
| `/about/the-branksome-difference/` | `#/about/the-branksome-difference` | ✅ |
| `/about/our-history/` | `#/about/our-history` | ✅ |
| `/about/contact-us/` | `#/about/contact-us` | ✅ |
| `/about/leadership-and-governance/` | `#/about/leadership-and-governance` | 🟡 |
| `/about/meet-our-principal/` | `#/about/meet-our-principal` | 🟡 |
| `/about/career-opportunities/` | `#/about/career-opportunities` | 🟡 |
| `/about/community-inclusion-belonging/` | `#/about/community-inclusion-belonging` | 🟡 |

## Admissions

| Reference route | Implemented route | Status |
|---|---|---|
| `/admissions/start-here/` | `#/admissions/start-here` | ✅ incl. real "Important Dates" |
| `/admissions/how-to-apply/` | `#/admissions/how-to-apply` | ✅ grade-band tabs |
| `/admissions/tuition-and-financial-support/` | `#/admissions/tuition-and-financial-support` | ✅ |
| `/admissions/tuition-and-financial-support/financial-assistance/` | `#/admissions/tuition-and-financial-support/financial-assistance` | 🟡 |
| `/admissions/tuition-and-financial-support/scholarships/` | `#/admissions/tuition-and-financial-support/scholarships` | 🟡 |
| `/admissions/boarding-program/` | `#/admissions/boarding-program` | ✅ |
| `/admissions/visit-us/` | `#/admissions/visit-us` | ✅ form |
| `/admissions/connect-with-admissions/` | `#/admissions/connect-with-admissions` | 🟡 |

## Learning / Academics

| Reference route | Implemented route | Status |
|---|---|---|
| `/learning/our-ib-advantage/` | `#/learning/our-ib-advantage` | ✅ |
| `/learning/our-ib-advantage/primary-years-programme/` | `#/learning/our-ib-advantage/primary-years-programme` | ✅ |
| `/learning/our-ib-advantage/middle-years-programme/` | `#/learning/our-ib-advantage/middle-years-programme` | ✅ |
| `/learning/our-ib-advantage/ib-pathways-in-grades-11-12/` | `#/learning/our-ib-advantage/ib-pathways-in-grades-11-12` | ✅ |
| `/learning/student-life/` | `#/learning/student-life` | ✅ |
| `/learning/student-life/arts/` | `#/learning/student-life/arts` | 🟡 |
| `/learning/student-life/athletics/` | `#/learning/student-life/athletics` | 🟡 |
| `/learning/student-life/clubs-and-co-curriculars/` | `#/learning/student-life/clubs-and-co-curriculars` | 🟡 |
| `/learning/student-support/` | `#/learning/student-support` | 🟡 |
| `/learning/how-we-teach/` | `#/learning/how-we-teach` | 🟡 |
| `/learning/heading-to-university/` | `#/learning/heading-to-university` | 🟡 |

## Innovation

| Reference route | Implemented route | Status |
|---|---|---|
| `/innovation/icast/` | `#/innovation/icast` | ✅ incl. real construction timeline |
| `/innovation/innovation-spaces/` | `#/innovation/innovation-spaces` | 🟡 |
| `/innovation/slingshot-innovation-academy/` | `#/innovation/slingshot-innovation-academy` | 🟡 |
| `/innovation/centre-for-strategic-leadership/` | `#/innovation/centre-for-strategic-leadership` | 🟡 |
| `/innovation/chandaria-research-centre/` | `#/innovation/chandaria-research-centre` | 🟡 |

## The Campus

| Reference route | Implemented route | Status |
|---|---|---|
| `/the-campus/our-campus/` | `#/the-campus/our-campus` | ✅ |
| `/the-campus/virtual-tours/` | `#/the-campus/virtual-tours` | 🟡 |
| `/the-campus/branksome-camps/` | `#/the-campus/branksome-camps` | 🟡 |
| `/the-campus/venue-rentals/` | `#/the-campus/venue-rentals` | 🟡 |

## Community / Alums

| Reference route | Implemented route | Status |
|---|---|---|
| `/community/alums/` | `#/community/alums` | ✅ |
| `/community/alums/alum-stories/` | `#/community/alums/alum-stories` | 🟡 |
| `/community/educators/` | `#/community/educators` | 🟡 |
| `/community/visiting-speakers/` | `#/community/visiting-speakers` | 🟡 |

## News

| Reference route | Implemented route | Status |
|---|---|---|
| `/branksome-news/` | `#/branksome-news` | ✅ filterable grid, real headlines from live site |
| `/branksome-news/<slug>/` | `#/branksome-news/:slug` | ✅ article detail template |

## Giving

| Reference route | Implemented route | Status |
|---|---|---|
| `/giving/donate-now/` | `#/giving/donate-now` | ✅ simulated, non-transacting donation form (see limitations) |
| `/giving/giving-opportunities-and-priorities/` | `#/giving/giving-opportunities` | ✅ |
| `/giving/how-to-give/` | `#/giving/how-to-give` | 🟡 |
| `/giving/your-impact/` | `#/giving/your-impact` | 🟡 |
| `/giving/make-way-campaign/` | `#/giving/make-way-campaign` | 🟡 |

## Not built

- `calendar` (events calendar — backed by The Events Calendar plugin on reference; no public API consumed)
- parent portal login (`branksome.myschoolapp.com`) — authentication-gated, out of scope
- Branksome Hall Asia (separate domain/brand)

**Note on routing implementation:** The project does not use `react-router`. Because the build is produced with `vite-plugin-singlefile` (an existing project convention that outputs one static `dist/index.html` with no server-side rewrites), a lightweight custom hash-based router (`src/router`) is used instead so every route in this table is a real, shareable, bookmarkable `#/...` URL that works from a single static file with no server configuration.

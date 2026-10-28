# Motion audit

Updated 2026-10-28. Scope: reference content and motion, plus the MGGS fallback.

## Evidence and limits

The page-fetch service successfully returned the public homepage for both `https://branksome.on.ca/` and its `www` variant (which resolved to the non-www URL). Its text confirms the heading “Leading the Way in Girls' Education”, the IB program, eight statistics, the iCAST section, the Elpida/Jaime/Titoluwa/Milla stories and Previous/Next controls. This is a text extraction, **not a recording or a rendered interaction**, and cannot establish motion.

Direct sandbox `curl` for both hostnames failed with `SSL_ERROR_SYSCALL`, and Chromium navigation to the non-www site failed with `net::ERR_CONNECTION_CLOSED`. Thus no reference screenshots, computed styles or motion measurements are available. Older audit claims about screenshots refer to missing files and remain unverified. Do not treat the fallback as a measured match.

| Reference area | Observed motion | MGGS fallback (not verified as matching) |
|---|---|---|
| Hero, imagery and calls to action | Trigger, states, timing, direction, repeat and mobile/reduced-motion behavior unknown | Hero image fade; heading/copy 12px entrance with 40–220ms stagger. No parallax or letter animation. |
| Editorial sections and images | Unknown | Once-only 600ms 12px section rise on intersection; no clipping or layout animation. |
| Statistics | Count-up unknown | Static original formatted values; no invented count-up. |
| Student stories | Text extraction shows Previous/Next; motion, autoplay and touch behavior unknown | Native manual snap scroll with controls and current indicator; no autoplay. |
| Desktop menu, mobile drawer, search | All transitions and keyboard behavior unknown | Desktop menu enters with a short fade; mobile drawer and search enter and exit. Closing overlays become inert immediately. |
| News, CTAs, footer | Motion and hover behavior unknown | Selective reveals and restrained news image hover on hover-capable devices; footer static. |

A future motion audit still requires a browser able to reach the reference and recordings at desktop/mobile and with reduced motion. Record timing, easing, offsets, sequencing and repetition from those observations rather than extrapolating from extracted text.

## Recording handover continuation

The user supplied a Google Drive recording and described its sequence. The page-fetch service followed the share link to a Drive download URL but returned no video bytes. Direct Drive access from the sandbox failed with `SSL_ERROR_SYSCALL`; the Google Drive connector is disconnected. Therefore the recording was not watched and no frame-by-frame measurements are claimed. The description in the request is user-provided evidence, not independently observed motion: green hero, then white heading, then aerial photo; blue admissions feature with left jumping student and right copy; large colored story cards. Whether image/text movement in the blue section, numerical counts, and other effects actually occur remains unknown.

The implementation follows the described sequencing with a short, deliberately chosen 200ms delay and 1100ms image fade (not measured reference timing), visible heading and a green image-failure fallback. The admissions image and copy receive restrained independent entrance motions; these are design approximations, not verified reference behavior. Statistics remain static. Carousel uses native smooth scrolling and snap, no autoplay. Original fictional AI-generated campus and student assets are illustrative and do not depict real Branksome people or buildings. The same fictional portrait is reused on all story cards; it is decorative, not an identification of the named student/alum.

# Hero video

Drop the school's hero film here as **`mggs-hero.mp4`** (H.264/MP4 is the most
widely supported format). Optionally add a **`mggs-hero.webm`** version — the
browser will pick whichever it can play.

Recommended: 8–20 seconds, 1920×1080, no audio track needed (the hero plays it
muted), ideally under ~6 MB so the homepage stays quick on mobile data.

The hero is driven by `src/data/hero.ts`:

1. the film plays first,
2. when it ends (or if the file is missing / cannot be decoded) the hero
   crossfades through the still frames listed in `heroFrames`,
3. the sequence then loops back to the film.

Nothing in the layout or animation code needs to change.

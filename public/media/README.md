# Hero video

`mggs-hero.mp4` is the homepage hero film (15 s, 1920×1080, H.264, silent, ~3 MB)
and `mggs-hero-poster.jpg` is its poster frame. Both are generated — do not edit
them by hand.

## What the film shows

A slow cinematic push-in across an aerial view of the school campus
(`scripts/assets/hero-aerial.png`), with the school identity — MGGS badge,
**Marvellous Greatness Group of Schools**, Akobo–Ojurin · Ibadan, Oyo State and
the motto **“Towards Greatness.”** — fading up in the final seconds and holding
on the last frame so it loops cleanly into the still-frame sequence.

## Regenerate

```bash
pip install pillow imageio-ffmpeg fonttools brotli   # one-off
python3 scripts/render-hero-video.py
```

The script also regenerates the brand assets:

- `public/images/mggs-logo.png` — transparent MGGS badge (header, footer)
- `public/favicon.png`, `public/favicon-32.png` — favicon

## Using the school's own footage instead

Replace `public/media/mggs-hero.mp4` with the real film (H.264/MP4, ideally
8–20 s, 1920×1080, no audio, under ~6 MB), optionally add
`public/media/mggs-hero.webm`, and update `heroVideoPoster` in
`src/data/hero.ts` if you want a new poster frame. No layout or animation code
needs to change: the hero plays the film, then crossfades through the still
frames listed in `heroFrames` and loops back.

If the file is missing or cannot be decoded, the hero falls back to the
still-frame sequence alone.

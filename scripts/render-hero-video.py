#!/usr/bin/env python3
"""Render the MGGS hero film and its poster frame.

Source: scripts/assets/hero-aerial.png (aerial view of the school campus)
Output: public/media/mggs-hero.mp4, public/media/mggs-hero-poster.jpg

The film is a slow cinematic push-in across the aerial frame; the school
identity (badge, name, motto) fades up over the final seconds, then the film
settles on a held frame so the loop back to the hero is seamless.

Usage:  python3 scripts/render-hero-video.py
"""
from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts/assets/hero-aerial.png"
OUT_MP4 = ROOT / "public/media/mggs-hero.mp4"
OUT_POSTER = ROOT / "public/media/mggs-hero-poster.jpg"

W, H = 1920, 1080
FPS = 30
HOLD_SECONDS = 4.0
MOVE_SECONDS = 11.0
DURATION = MOVE_SECONDS + HOLD_SECONDS

GREEN = (0, 73, 31)
GREEN_DEEP = (0, 54, 23)
GOLD = (252, 175, 23)
WHITE = (255, 255, 255)
CORAL = (242, 101, 57)

FONT_DISPLAY = "/tmp/fonts/Archivo-ExtraBold.ttf"
FONT_SEMI = "/tmp/fonts/Archivo-SemiBold.ttf"
FONT_BODY = "/tmp/fonts/Inter-Regular.ttf"

SCHOOL_NAME_1 = "MARVELLOUS GREATNESS"
SCHOOL_NAME_2 = "GROUP OF SCHOOLS"
SCHOOL_LOCATION = "AKOBO–OJURIN · IBADAN, OYO STATE"
SCHOOL_MOTTO = "Towards Greatness."


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def ease(t: float) -> float:
    """Smooth ease-in-out for the camera move."""
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def camera_frame(source: Image.Image, progress: float) -> Image.Image:
    """Slow push-in with a gentle drift to the right, kept above 1080p."""
    p = ease(progress)
    zoom = 1.06 + 0.16 * p          # 1.06 -> 1.22
    offset_x = 0.02 + 0.10 * p      # drift right
    offset_y = 0.04 + 0.02 * p      # slight rise

    crop_w = source.width / zoom
    crop_h = source.height / zoom
    cx = source.width * (0.5 + (offset_x - 0.06))
    cy = source.height * (0.5 + (offset_y - 0.03))
    left = max(0, min(source.width - crop_w, cx - crop_w / 2))
    top = max(0, min(source.height - crop_h, cy - crop_h / 2))
    crop = source.crop((int(left), int(top), int(left + crop_w), int(top + crop_h)))
    return crop.resize((W, H), Image.LANCZOS)


def draw_badge(canvas: Image.Image, cx: int, cy: int, radius: int, scale: float = 1.0) -> None:
    """Circular MGGS badge: deep green disc, gold ring, white monogram."""
    size = int(radius * 2 * scale)
    if size < 24:
        return
    badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(badge)
    pad = max(2, size // 22)
    d.ellipse((pad, pad, size - pad, size - pad), fill=GREEN + (255,))
    ring = max(3, size // 26)
    d.ellipse((pad, pad, size - pad, size - pad), outline=GOLD + (255,), width=ring)
    inner = pad + ring * 1.7
    if size - 2 * inner > 2:
        d.ellipse((inner, inner, size - inner, size - inner), outline=WHITE + (110,), width=max(1, int(ring * 0.6)))

    f = font(FONT_DISPLAY, max(8, int(size * 0.185)))
    text = "MGGS"
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    d.text(((size - (r - l)) / 2 - l, (size - (b - t)) / 2 - t - size * 0.075), text, font=f, fill=WHITE + (255,))

    # small gold star beneath the monogram
    star_size = size * 0.062
    sx, sy = size / 2, size * 0.70
    pts = []
    import math
    for i in range(10):
        angle = -math.pi / 2 + i * math.pi / 5
        rad = star_size if i % 2 == 0 else star_size * 0.45
        pts.append((sx + rad * math.cos(angle), sy + rad * math.sin(angle)))
    d.polygon(pts, fill=GOLD + (255,))

    canvas.alpha_composite(badge, (int(cx - size / 2), int(cy - size / 2)))


def draw_identity(canvas: Image.Image, reveal: float) -> None:
    """Fade/slide in the school lockup (top right) so the hero headline stays clear."""
    if reveal <= 0.001:
        return
    ease_rev = ease(reveal)
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    margin = 96
    right = W - margin
    top = 74

    # soft scrim from the top-right corner so the type always reads cleanly
    scrim = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(0, int(H * 0.62)):
        a = int(150 * (1 - y / (H * 0.62)) ** 1.35 * ease_rev)
        sd.line([(int(W * 0.42), y), (W, y)], fill=GREEN_DEEP + (a,))
    scrim = scrim.filter(ImageFilter.GaussianBlur(60))
    overlay.alpha_composite(scrim)

    slide = int(26 * (1 - ease_rev))
    text_right = right - slide

    name1 = font(FONT_DISPLAY, 78)
    name2 = font(FONT_DISPLAY, 58)
    loc = font(FONT_SEMI, 23)
    motto = font(FONT_BODY, 31)
    alpha = int(255 * ease_rev)

    y = top
    d.text((text_right - d.textlength(SCHOOL_NAME_1, font=name1), y), SCHOOL_NAME_1, font=name1, fill=WHITE + (alpha,))
    y += 92
    d.text((text_right - d.textlength(SCHOOL_NAME_2, font=name2), y), SCHOOL_NAME_2, font=name2, fill=GOLD + (alpha,))
    y += 82
    d.text((text_right - d.textlength(SCHOOL_LOCATION, font=loc), y), SCHOOL_LOCATION, font=loc, fill=WHITE + (int(210 * ease_rev),))
    y += 44

    # motto in a coral pill, right aligned
    m_w = d.textlength(SCHOOL_MOTTO, font=motto)
    pill_pad_x, pill_pad_y = 26, 14
    pill_w = m_w + pill_pad_x * 2
    d.rounded_rectangle(
        (text_right - pill_w, y, text_right, y + 62),
        radius=31,
        fill=CORAL + (alpha,),
    )
    d.text((text_right - pill_w + pill_pad_x, y + pill_pad_y + 1), SCHOOL_MOTTO, font=motto,
           fill=(25, 35, 29, alpha))

    # badge sits beneath the lockup, right aligned
    badge_r = 62
    badge_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw_badge(badge_layer, text_right - badge_r, y + 62 + 26 + badge_r, badge_r, scale=max(0.001, ease_rev))
    overlay.alpha_composite(badge_layer)

    canvas.alpha_composite(overlay)


def write_logo_assets() -> None:
    """Standalone transparent badge + favicon, used by the site header/footer."""
    size = 1024
    logo = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw_badge(logo, size / 2, size / 2, size / 2, scale=1.0)
    (ROOT / "public/images").mkdir(parents=True, exist_ok=True)
    logo.save(ROOT / "public/images/mggs-logo.png", optimize=True)
    logo.resize((180, 180), Image.LANCZOS).save(ROOT / "public/favicon.png", optimize=True)
    logo.resize((32, 32), Image.LANCZOS).save(ROOT / "public/favicon-32.png", optimize=True)
    print("wrote public/images/mggs-logo.png, public/favicon.png, public/favicon-32.png")


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"missing source image: {SRC}")

    source = Image.open(SRC).convert("RGB")
    # normalise to 16:9 before the camera move
    target_ratio = W / H
    ratio = source.width / source.height
    if ratio > target_ratio:
        new_w = int(source.height * target_ratio)
        left = (source.width - new_w) // 2
        source = source.crop((left, 0, left + new_w, source.height))
    elif ratio < target_ratio:
        new_h = int(source.width / target_ratio)
        top = (source.height - new_h) // 2
        source = source.crop((0, top, source.width, top + new_h))
    # upscale a little so the push-in never softens
    source = source.resize((int(source.width * 1.35), int(source.height * 1.35)), Image.LANCZOS)

    frames = int(DURATION * FPS)
    move_end = MOVE_SECONDS / DURATION
    reveal_start = 0.52  # identity begins fading in a little over halfway

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    OUT_MP4.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        ffmpeg, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{W}x{H}", "-pix_fmt", "rgb24", "-r", str(FPS),
        "-i", "-",
        "-an",
        "-c:v", "libx264", "-profile:v", "high", "-preset", "medium",
        "-crf", "25", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(OUT_MP4),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

    poster_saved = False
    for i in range(frames):
        t = i / max(1, frames - 1)
        if t <= move_end:
            progress = t / move_end
        else:
            progress = 1.0
        base = camera_frame(source, progress).convert("RGBA")

        reveal = 0.0
        if t > reveal_start:
            reveal = min(1.0, (t - reveal_start) / 0.22)
        draw_identity(base, reveal)

        frame = base.convert("RGB")
        if not poster_saved and t >= 0.93:
            poster = frame.resize((1600, 900), Image.LANCZOS)
            poster.save(OUT_POSTER, quality=80, optimize=True, progressive=True)
            poster_saved = True
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    stderr = proc.stderr.read().decode("utf-8", "ignore")
    code = proc.wait()
    if code != 0:
        raise SystemExit(f"ffmpeg failed ({code}):\n{stderr[-2000:]}")

    size_mb = OUT_MP4.stat().st_size / (1024 * 1024)
    print(f"wrote {OUT_MP4.relative_to(ROOT)} ({size_mb:.2f} MB, {DURATION:.0f}s)")
    print(f"wrote {OUT_POSTER.relative_to(ROOT)}")
    write_logo_assets()


if __name__ == "__main__":
    main()

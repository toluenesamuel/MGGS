#!/usr/bin/env python3
"""Sample the dominant uniform colour from a photograph of MGGS pupils.

Usage:
    python3 scripts/sample-uniform-colour.py path/to/uniform-photo.jpg
    python3 scripts/sample-uniform-colour.py path/to/photo.jpg --region 0.3,0.2,0.7,0.6

The script is deliberately conservative:

  * the background near the frame edges is estimated and excluded,
  * very light (sky/walls) and near-neutral (skin, white shirts in shadow)
    clusters are deprioritised rather than picked blindly,
  * the fabric is assumed to be a saturated, mid-to-dark colour, which is what
    school uniform cloth typically is.

It prints the dominant fabric colours with HEX/RGB values, the HSL of each, and a
recommended primary. It also writes a swatch image so the result can be checked
by eye. Nothing is written into the site — the colour is only adopted after a
human has looked at the swatches and confirmed they match the uniform.

Requirements: pillow  (pip install pillow)
"""
from __future__ import annotations

import argparse
import colorsys
import sys
from pathlib import Path

from PIL import Image

MAX_SIDE = 480  # downsample before clustering; plenty for colour statistics


def load(path: Path, region: tuple[float, float, float, float] | None) -> Image.Image:
    image = Image.open(path).convert("RGB")
    if region:
        left, top, right, bottom = region
        image = image.crop(
            (
                int(left * image.width),
                int(top * image.height),
                int(right * image.width),
                int(bottom * image.height),
            )
        )
    image.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    return image


def edge_background(image: Image.Image) -> tuple[float, float, float]:
    """Average colour of a thin border — a proxy for the scene background."""
    w, h = image.size
    pixels = image.load()
    samples = []
    band = max(1, min(w, h) // 40)
    for x in range(w):
        for y in list(range(band)) + list(range(h - band, h)):
            samples.append(pixels[x, y])
    for y in range(h):
        for x in list(range(band)) + list(range(w - band, w)):
            samples.append(pixels[x, y])
    count = len(samples) or 1
    return (
        sum(p[0] for p in samples) / count,
        sum(p[1] for p in samples) / count,
        sum(p[2] for p in samples) / count,
    )


def distance(a: tuple[float, float, float], b: tuple[float, float, float]) -> float:
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5


def quantise(image: Image.Image, colours: int) -> list[tuple[tuple[int, int, int], int]]:
    palette = image.convert("P", palette=Image.ADAPTIVE, colors=colours)
    palette = palette.convert("RGB")
    counts: dict[tuple[int, int, int], int] = {}
    for pixel in palette.getdata():
        counts[pixel] = counts.get(pixel, 0) + 1
    return sorted(counts.items(), key=lambda item: item[1], reverse=True)


def describe(rgb: tuple[int, int, int]) -> dict[str, float]:
    r, g, b = (channel / 255 for channel in rgb)
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return {"h": h * 360, "l": l, "s": s}


def hexcode(rgb: tuple[int, int, int]) -> str:
    return "#{:02X}{:02X}{:02X}".format(*rgb)


def darken(rgb: tuple[int, int, int], factor: float = 0.62) -> tuple[int, int, int]:
    return tuple(max(0, int(channel * factor)) for channel in rgb)  # type: ignore[return-value]


def lighten(rgb: tuple[int, int, int], factor: float = 0.86) -> tuple[int, int, int]:
    return tuple(int(channel + (255 - channel) * factor) for channel in rgb)  # type: ignore[return-value]


def luminance(rgb: tuple[int, int, int]) -> float:
    def channel(value: int) -> float:
        c = value / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (channel(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    la, lb = luminance(a), luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def write_swatches(candidates, path: Path) -> None:
    swatch_w, swatch_h = 220, 96
    canvas = Image.new("RGB", (swatch_w, swatch_h * len(candidates)), (245, 244, 240))
    for index, (rgb, share) in enumerate(candidates):
        block = Image.new("RGB", (swatch_w, swatch_h), rgb)
        canvas.paste(block, (0, index * swatch_h))
    canvas.save(path)
    print(f"\nswatches written to {path}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Sample the dominant uniform colour from a photo.")
    parser.add_argument("photo", type=Path, help="photograph of MGGS pupils in uniform")
    parser.add_argument(
        "--region",
        help="optional crop as left,top,right,bottom fractions (e.g. 0.25,0.15,0.75,0.75) "
        "to isolate the uniform from the rest of the frame",
    )
    parser.add_argument("--colours", type=int, default=10, help="palette size before filtering")
    parser.add_argument("--min-saturation", type=float, default=0.18)
    parser.add_argument("--min-lightness", type=float, default=0.08)
    parser.add_argument("--max-lightness", type=float, default=0.72)
    args = parser.parse_args()

    if not args.photo.exists():
        print(f"photo not found: {args.photo}", file=sys.stderr)
        return 1

    region = None
    if args.region:
        try:
            region = tuple(float(part) for part in args.region.split(","))  # type: ignore[assignment]
            if len(region) != 4:
                raise ValueError
        except ValueError:
            print("--region must be four comma-separated fractions", file=sys.stderr)
            return 1

    image = load(args.photo, region)
    background = edge_background(image)
    total = sum(count for _, count in quantise(image, args.colours))

    candidates: list[tuple[tuple[int, int, int], int]] = []
    rejected: list[str] = []
    for rgb, count in quantise(image, args.colours):
        share = count / total
        hls = describe(rgb)
        reason = None
        if share < 0.02:
            reason = "too little of the frame"
        elif distance(rgb, background) < 40:
            reason = "matches the background"
        elif hls["s"] < args.min_saturation:
            reason = "near-neutral (skin, white, grey)"
        elif not (args.min_lightness <= hls["l"] <= args.max_lightness):
            reason = "too light or too dark for fabric"
        if reason:
            rejected.append(f"  {hexcode(rgb)} {share:5.1%}  {reason}")
            continue
        candidates.append((rgb, share))

    print(f"photo: {args.photo}")
    print(f"sampled region: {region or 'whole frame'}")
    print(f"estimated background: {hexcode(tuple(int(c) for c in background))}\n")

    if not candidates:
        print("No fabric-like colour found. Try --region to crop onto the uniform,", file=sys.stderr)
        print("or loosen --min-saturation / --max-lightness.", file=sys.stderr)
        print("\nRejected clusters:", file=sys.stderr)
        print("\n".join(rejected) or "  (none)", file=sys.stderr)
        return 2

    print("candidate uniform colours (most common first):")
    print(f"  {'HEX':8} {'share':>6}  {'HSL':>18}  contrast vs white / black")
    for rgb, share in candidates:
        hls = describe(rgb)
        print(
            f"  {hexcode(rgb):8} {share:5.1%}  "
            f"H{hls['h']:5.1f} S{hls['s']:4.0%} L{hls['l']:4.0%}  "
            f"{contrast(rgb, (255, 255, 255)):5.2f} / {contrast(rgb, (0, 0, 0)):4.2f}"
        )

    primary = candidates[0][0]
    print("\nsuggested primary:", hexcode(primary))
    print("  primary-dark  :", hexcode(darken(primary)))
    print("  primary-light :", hexcode(lighten(primary)))
    white_contrast = contrast(primary, (255, 255, 255))
    print(
        "  white text on primary: "
        f"{white_contrast:.2f}:1 — {'AA for normal text' if white_contrast >= 4.5 else 'large text / UI only'}"
    )

    write_swatches(candidates, Path("/tmp/uniform-swatches.png"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

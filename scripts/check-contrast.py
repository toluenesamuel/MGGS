#!/usr/bin/env python3
"""Validate the MGGS colour system against WCAG 2.1 contrast requirements.

Reads the design tokens straight out of src/index.css (so the report always
reflects what ships), then checks the pairings the interface actually uses.

Usage:
    python3 scripts/check-contrast.py            # report
    python3 scripts/check-contrast.py --strict   # exit 1 on any AA failure

Thresholds (WCAG 2.1):
  AA  normal text   4.5:1
  AA  large text    3.0:1   (>= 18.66px bold or >= 24px)
  AA  UI components 3.0:1   (borders, icons, focus rings)
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parents[1] / "src/index.css"

# (foreground token, background token, requirement, where it is used)
PAIRS: list[tuple[str, str, str, str]] = [
    # --- body and heading text on light surfaces ---
    ("text", "background", "normal", "body text on page background"),
    ("text", "surface", "normal", "body text on cards"),
    ("text-muted", "background", "normal", "secondary text on page background"),
    ("text-muted", "surface", "normal", "secondary text on cards"),
    ("primary-dark", "background", "normal", "headings on page background"),
    ("primary-dark", "surface", "normal", "headings on cards"),
    ("primary-dark", "primary-light", "normal", "headings on tinted panels"),
    ("primary-dark", "brand-sky", "normal", "headings on soft panels"),
    ("primary-dark", "brand-lime", "normal", "headings on warm panels"),
    ("brand-coral-ink", "background", "normal", "accent text links on page background"),
    ("brand-coral-ink", "surface", "normal", "accent text links on cards"),
    # --- text on filled brand surfaces ---
    ("on-primary", "primary", "normal", "white text on primary buttons/blocks"),
    ("brand-green-800", "on-primary", "normal", "hover fill of the primary button"),
    ("on-primary", "primary-dark", "normal", "white text on dark sections/footer"),
    ("on-primary", "brand-green-800", "normal", "white text on dark hover"),
    ("primary-dark", "brand-gold", "normal", "text on gold notice surfaces"),
    ("brand-gold", "primary-dark", "normal", "gold eyebrow text on dark sections"),
    ("on-accent", "accent", "normal", "text on the deeper accent"),
    # --- validation and UI boundaries ---
    ("danger", "surface", "normal", "form validation messages"),
    ("control-border", "surface", "ui", "form field boundaries"),
    ("control-border", "background", "ui", "form field boundaries on paper"),
    ("border-strong", "surface", "decorative", "card edges and dividers (not state-carrying)"),
    ("border", "background", "decorative", "hairline dividers"),
    ("focus", "background", "ui", "focus ring on page background"),
    ("focus", "surface", "ui", "focus ring on cards"),
    ("focus", "primary-dark", "ui", "focus ring on dark sections"),
    ("accent-ink", "surface", "normal", "accent text on cards"),
    ("accent-ink", "background", "normal", "accent text on page background"),
]
THRESHOLDS = {"normal": 4.5, "large": 3.0, "ui": 3.0, "decorative": 0.0}


def load_tokens() -> dict[str, str]:
    """Read every --color-* token, resolving var(...) aliases to their hex value."""
    css = CSS.read_text()
    raw = dict(re.findall(r"--color-([a-z0-9-]+):\s*([^;]+);", css))

    def resolve(name: str, seen: frozenset[str] = frozenset()) -> str | None:
        value = raw.get(name)
        if value is None or name in seen:
            return None
        value = value.strip()
        if value.startswith("#"):
            return value
        alias = re.fullmatch(r"var\(\s*--color-([a-z0-9-]+)\s*\)", value)
        if alias:
            return resolve(alias.group(1), seen | {name})
        return None

    return {
        name: hex_value
        for name, hex_value in ((name, resolve(name)) for name in raw)
        if hex_value
    }


def rgb(hex_value: str) -> tuple[int, int, int]:
    value = hex_value.lstrip("#")
    if len(value) == 3:
        value = "".join(character * 2 for character in value)
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def luminance(colour: tuple[int, int, int]) -> float:
    def channel(value: int) -> float:
        c = value / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (channel(v) for v in colour)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    la, lb = luminance(a), luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true", help="exit non-zero if any pair fails AA")
    args = parser.parse_args()

    tokens = load_tokens()
    if not tokens:
        print(f"no colour tokens found in {CSS}", file=sys.stderr)
        return 1

    missing = {
        token
        for pair in PAIRS
        for token in pair[:2]
        if token not in tokens
    }
    if missing:
        print(f"tokens referenced but not defined: {', '.join(sorted(missing))}", file=sys.stderr)
        return 1

    print(f"{len(tokens)} colour tokens in {CSS.relative_to(CSS.parents[2])}\n")
    print(f"{'pair':46} {'ratio':>7}  {'need':>5}  result")
    failures = 0
    for fg, bg, requirement, usage in PAIRS:
        ratio = contrast(rgb(tokens[fg]), rgb(tokens[bg]))
        needed = THRESHOLDS[requirement]
        ok = ratio >= needed
        if not ok:
            failures += 1
        print(
            f"{fg + ' on ' + bg:46} {ratio:6.2f}:1  {needed:4.1f}  "
            f"{'PASS' if ok else 'FAIL'}  ({usage})"
        )

    print()
    if failures:
        print(f"{failures} pair(s) below WCAG AA")
    else:
        print(f"all {len(PAIRS)} pairings meet WCAG AA")

    return 1 if (failures and args.strict) else 0


if __name__ == "__main__":
    raise SystemExit(main())

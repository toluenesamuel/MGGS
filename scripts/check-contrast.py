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
    ("ink", "paper", "normal", "body text on page background"),
    ("ink", "surface", "normal", "body text on cards"),
    ("ink-muted", "paper", "normal", "secondary text on page background"),
    ("ink-muted", "surface", "normal", "secondary text on cards"),
    ("primary-dark", "paper", "normal", "headings on page background"),
    ("primary-dark", "surface", "normal", "headings on cards"),
    ("primary-dark", "primary-light", "normal", "headings on tinted panels"),
    ("on-primary", "primary", "normal", "white text on primary surfaces"),
    ("on-primary", "primary-dark", "normal", "white text on dark primary"),
    ("primary", "paper", "normal", "primary text links on page background"),
    ("primary", "primary-light", "normal", "primary text on tinted panels"),
    ("on-secondary", "secondary", "normal", "text on secondary surfaces"),
    ("on-accent", "accent", "normal", "text on accent call-to-action buttons"),
    ("accent-ink", "surface", "normal", "accent text links on cards"),
    ("accent-ink", "paper", "normal", "accent text links on page background"),
    ("on-warning", "warning", "normal", "text on gold notice surfaces"),
    ("primary", "surface", "ui", "button + input borders on cards"),
    ("primary", "paper", "ui", "button + input borders on page background"),
    ("border", "surface", "ui", "card and divider boundaries"),
    ("border-strong", "paper", "ui", "emphasised dividers"),
    ("warning", "primary-dark", "ui", "focus ring on dark sections"),
]
THRESHOLDS = {"normal": 4.5, "large": 3.0, "ui": 3.0}


def load_tokens() -> dict[str, str]:
    css = CSS.read_text()
    tokens = {}
    for name, value in re.findall(r"--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})", css):
        tokens[name] = value
    return tokens


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

# MGGS Colour System

The site palette is derived from the **school uniform**, not from the Branksome Hall
reference the layout was first reconstructed from. The definitions live in the
`@theme` block of `src/index.css` as plain CSS variables, which Tailwind v4 turns
into utilities (`bg-primary`, `text-text-muted`, `border-control-border`, …).

## 1. Where the colour came from

| Source | Detail |
|---|---|
| Photograph | `scripts/assets/uniform-reference.png` — MGGS junior students in school uniform |
| Blouse (fabric) | `#EFCED3` — hue **350°**, the identified uniform primary |
| Blouse (shade) | `#E0B2B5` |
| Blouse (highlight) | `#FDE3E8` |
| Skirt / trousers | `#17151A` — near-black charcoal |

Sampling was done with `scripts/sample-uniform-colour.py` (raw 16-colour adaptive
quantisation, no lightness filtering, so the pale fabric is not discarded):

```bash
python3 scripts/sample-uniform-colour.py scripts/assets/uniform-reference.png --quantise 16
```

A rose at 87 % lightness cannot carry white text (≈1.4:1), so the system keeps the
uniform hue but steps it down into three usable tones: `primary` (buttons, blocks),
`primary-dark` (headings, footer, hover) and `primary-light` (tinted panels). The
charcoal of the skirt/trousers supplies the neutral text and secondary colours.

## 2. Palette

### Brand roles

| Token | Hex | Intended use |
|---|---|---|
| `--color-primary` | `#A8324F` | Primary buttons, active states, solid CTA blocks |
| `--color-primary-dark` | `#6E1F38` | Headings, footer, dark section bands |
| `--color-primary-hover` | `#7E2745` | Hover/active fill for primary controls |
| `--color-primary-light` | `#F7E4EA` | Tinted panels, cards, selected menu items |
| `--color-secondary` | `#3A2A31` | Charcoal-plum for secondary surfaces and emphasis type |
| `--color-accent` | `#C68A2E` | Restrained metallic accent: eyebrows, rules, small marks |
| `--color-accent-soft` | `#E3B65E` | Gold notice bars, chips (pairs with dark text only) |
| `--color-accent-ink` | `#7A5410` | Accent-coloured text where it must read as body copy |

### Surfaces and text

| Token | Hex | Intended use |
|---|---|---|
| `--color-background` | `#FBF7F7` | Page background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Cards, forms, dialogs |
| `--color-surface-muted` | `#FAF1F3` | Alternating section bands, table striping |
| `--color-text` | `#1E1720` | Body copy |
| `--color-text-muted` | `#5C4A50` | Meta, captions, helper text |
| `--color-on-primary` | `#FFFFFF` | Text/icons on `primary` / `primary-dark` |
| `--color-on-accent` | `#33180A` | Text on `accent-soft` |

### Borders, states, semantics

| Token | Hex | Intended use |
|---|---|---|
| `--color-border` | `#E9DCDF` | Hairline dividers, card edges (decorative) |
| `--color-border-strong` | `#CBB6BC` | Emphasised dividers (decorative only) |
| `--color-control-border` | `#9F8288` | Input/select/textarea boundaries — ≥3:1, state-carrying |
| `--color-focus` | `#B87F22` | Single focus ring usable on light **and** dark surfaces |
| `--color-danger` | `#9E1B34` | Form validation messages |
| `--color-danger-soft` | `#FBE9ED` | Error panel background |

### Legacy aliases

`brand-green-900/800/700/100`, `brand-coral*`, `brand-gold*`, `brand-sky*`,
`brand-lime*`, `brand-magenta`, `ink` and `paper` are kept as aliases of the roles
above so every existing component re-skins in place without markup churn. New work
should use the role tokens; the aliases exist only for back-compatibility.

## 3. Contrast verification

`scripts/check-contrast.py` parses the `@theme` block, resolves `var()` aliases and
checks 28 real text/UI pairings against WCAG 2.2 AA (`--strict` exits non-zero on
failure):

```bash
python3 scripts/check-contrast.py --strict
# all 28 pairings meet WCAG AA
```

Text pairs target 4.5:1; control borders and focus rings target 3:1 (WCAG 1.4.11);
purely decorative hairlines are recorded without a threshold.

## 4. Rules of thumb

- **One dominant colour per band.** Use `primary-light` / `surface-muted` tints for
  most sections, reserve solid `primary` for calls to action and `primary-dark` for
  the footer and one or two dark bands.
- **Deep text on light tints.** Body copy is always `text` / `text-muted`; coloured
  text uses `primary-dark` or `accent-ink`.
- **Accent is a garnish.** Gold appears in eyebrows, rules, badges and the motto
  pill — never as a large fill behind white text.
- **Never put white on `primary-light` or on `accent-soft`.**
- **No gradients** — flat colour bands match the site's design language.
- **Images stay untinted.** The palette sits around photography; no blend modes or
  colour washes are applied.

## 5. Where it is applied

Header and mega-menu, mobile menu, hero (headline, eyebrow, CTAs, scrims), buttons
and their hover/active/disabled states, links and inline CTAs, cards and story
carousel, values and feature grids, news list and filters, forms (labels, fields,
validation, submit), footer, breadcrumbs, page menu accordion and focus rings.

Generated media (`public/media/mggs-hero.mp4`, `mggs-hero-poster.jpg`,
`public/images/mggs-logo.png`, favicons) is rendered by
`scripts/render-hero-video.py`, which uses the same rose/gold values, so the film and
badge stay in step with the tokens.

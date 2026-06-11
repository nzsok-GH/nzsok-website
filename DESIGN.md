# Design System — NZSOK Website

This is the source-of-truth design reference for the site. **Follow it for any UI work.**
The canonical implementation lives in [`src/styles/index.css`](src/styles/index.css) — the
`@theme {}` block, the `:root {}` mirror, and the component classes below them. When this
document and the CSS disagree, the CSS wins (and this doc should be updated to match).

---

## Core principles

These are non-negotiable and define the look of the site:

1. **Pastel only.** Every colour is soft and low-saturation. No pure black, no high-chroma
   accents. New colours must fit within the approved families below.
2. **No elevation / no shadows.** Depth is created with **colour and 1px borders**, never
   `box-shadow` or `text-shadow`. There are no exceptions.
3. **One typeface for UI: SUIT.** All headings, body, and labels use SUIT. The decorative
   fonts are reserved for the specific cases noted under Typography.
4. **Generous whitespace, calm rhythm.** Large section gaps, centered max-width content,
   restrained type scale. Inspired by the Tiny Voices NZ palette (tinyvoices.co.nz).

---

## Colour

Declared in `@theme {}` (usable as Tailwind utilities, e.g. `bg-purple-100`, `text-bg-400`)
and mirrored in `:root {}` as CSS variables (e.g. `var(--purple-400)`) for use inside custom
CSS. Inline styles in components use the hex values directly — always in the **canonical
lowercase spelling** shown in the tables below (e.g. `#9278d6`, not `#9278D6`), so the same
colour reads as one value across the codebase.

### Warm Ivory — backgrounds & surfaces
| Token | Hex | Use |
|---|---|---|
| `bg-50` | `#fdfcfa` | Page background, lightest surface |
| `bg-100` | `#faf7f2` | Cards / nav background |
| `bg-200` | `#f5efe3` | Subtle fills, zebra rows |
| `bg-300` | `#ede4d3` | Borders, dividers |
| `bg-400` | `#e2d5be` | Strongest ivory |

### Pale Pastel Purple — brand, interactive, accents
| Token | Hex | Use |
|---|---|---|
| `purple-50` | `#f4f1fc` | Faint tint |
| `purple-100` | `#e8e0f7` | Accent surfaces, highlight cards |
| `purple-200` | `#d0bfef` | Borders, gradients |
| `purple-300` | `#b49ee4` | Hover state |
| `purple-400` | `#9278d6` | **Primary brand colour** |

Semantic shortcuts (in `:root`): `--primary: #9278d6`, `--primary-dark: #7c5ecf`,
`--primary-hover: #b49ee4`.

### Pastel category accents (light tint → mid tone)
| Family | 100 | 200 | Typical use |
|---|---|---|---|
| Mint | `#d5eee3` | `#a8d4b8` | positive / nature |
| Sky | `#d5e8f5` | `#a8c4e8` | calm / info |
| Yellow | `#fef5d0` | `#f5e09a` | highlight / warm |
| Peach | `#ffe5d5` | `#f5b8a0` | warm accent |

### Text & neutral
| Token | Hex | Use |
|---|---|---|
| `text-main` / `--text` | `#1c2b3a` | Primary text, headings |
| `text-light` / `--text-light` | `#4a5f75` | Body / secondary text |
| `--gray` | `#8a9ab0` | Muted labels, captions, meta |

> When adding a colour, reach for an existing token first. A genuinely new colour must be a
> pastel that sits alongside these families — add it to **both** `@theme` and `:root`.
>
> **No off-palette greys.** Muted labels, captions, meta text, and placeholder marks all use
> `--gray` (`#8a9ab0`) — never a one-off grey like `#9ca3af` or `#c8d4de`.

---

## Typography

| Family | Weights | Where |
|---|---|---|
| **SUIT** | 300–900 (`font-display: swap`) | All UI text — the default (`--font-sans`) |
| **KerisKedyuche** | 400, 700 (`font-display: block`) | Display only — the hero canvas glyphs |
| **Paperlogy** | 500–900 (`font-display: block`) | Reserved decorative display |

All three load from jsDelivr via `@font-face` in `index.css` (no local font files).

**Section heading pattern** — every page-section `<h2>` uses the shared `H2_STYLE` token,
exported once from [`src/lib/styles.ts`](src/lib/styles.ts) and imported by every content
component (`import { H2_STYLE } from "../lib/styles"`). Don't redefine it inline or override
`marginBottom` per heading — the 32px heading→content gap is baked into the token, so call
sites are just `<h2 style={H2_STYLE}>`:

```ts
// src/lib/styles.ts
export const H2_STYLE: CSSProperties = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)",
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
  marginBottom: HEADING_GAP, // 32 — gap to the section's content
};
```

**Type scale (observed conventions):**
- Section heading `h2`: `clamp(24px,3vw,36px)`, 700
- Card / sub heading: 17px, 700
- Body: 15–16px, 400, line-height ~1.7
- Meta / caption: 12–14px, `--gray`
- Eyebrow label: 12–13px, 700, `text-transform: uppercase`, `letter-spacing: 0.06–0.1em`, purple
- Display numbers (e.g. price): SUIT 800, `clamp(36px,5vw,52px)`

---

## Layout & spacing

The section-level spacing values live as named tokens in
[`src/lib/styles.ts`](src/lib/styles.ts) (`SECTION_GAP`, `HEADING_GAP`, `SCROLL_MARGIN_TOP`),
imported by the content components instead of hard-coded inline. Change them there, and keep
this table in sync.

| Token | Value | Use |
|---|---|---|
| `SECTION_GAP` | `80` | Vertical gap between major sections (a `<section>`'s `marginBottom`, or `marginTop` for the first stacked island). |
| `HEADING_GAP` | `32` | Gap between a section `<h2>` and its content. Baked into `H2_STYLE` — never re-specify per heading. |
| `SCROLL_MARGIN_TOP` | `76` | Anchor offset (~50px sticky tab bar + gap) so hash links land below the chrome. The nav lives outside the `.page-scroll` region, so it isn't counted here. Every new scroll-target section needs it. |

- **Content container:** `max-width: 1200px; margin: 0 auto`.
- **Page `<main>` padding:** `140px 48px 120px` desktop, `120px 20px 80px` on mobile
  (≤767px). The large top padding clears the fixed 72px nav. See `.about-main`,
  `.education-main`, `.media-main`, `.enrol-main`.
- **Breakpoints:** mobile ≤767px, tablet 768–1023px, desktop ≥1024px (grids collapse
  4→2→1 columns accordingly).

---

## Components & patterns

- **Cards:** `border-radius: 16px` (`rounded-2xl`), `1px solid` border in a low-alpha colour,
  background `#faf7f2` or `#fff`. **No shadow.** Hover = `transform: translateY(-3px/-4px)`
  and a slightly stronger purple border (`.card-hover`, `.album-card`).
- **Primary button** (`.btn-primary`): background `#9278d6`, white text, hover `#7a62c0`,
  rounded. Used for the 입학안내 CTA and form links.
- **Eyebrow / section labels** (`.section-label-line`, `.section-label-pill`): uppercase,
  tracked-out, purple — a short kicker above a heading.
- **Navigation** (`.nav-main`): fixed, 72px tall, translucent ivory with `backdrop-filter:
  blur(12px)`; on the home page it is opaque (`transparent` variant). Desktop dropdowns
  appear on hover (`.dropdown`); mobile uses the slide-down `.mobile-menu` + hamburger.
- **Section tabs** (`.section-tab`): sticky bar at `top: 72px`; active tab = bold + 3px purple
  bottom border. Scroll-spy driven (the `SectionTabs` island).
- **Pills / badges:** fully rounded (`border-radius: 999px` or `20px`), purple-tinted
  background, small tracked text.
- **Dividers / borders:** prefer low-alpha rgba over solid greys, e.g. `rgba(0,0,0,0.05–0.08)`
  for table/cell borders, `bg-300` for structural dividers.

---

## Motion

Keyframes in `index.css` (keep animations subtle, pastel-calm): `hint-breathe` (opacity pulse)
and `logoReveal` (clip-path wipe — the intro `LoadingScreen`). The home hero's panning rows use
`hero-pan-left` / `hero-pan-right`, defined inline in `HeroSection.tsx`. Cross-page transitions
are handled by Astro View Transitions (`<ClientRouter />`), so don't reintroduce a manual
page-fade wrapper.

---

## Quick checklist before shipping UI

- [ ] Colours come from the tokens above (pastel, on-palette), written in canonical lowercase hex; muted text uses `--gray`, never a one-off grey
- [ ] No `box-shadow` / `text-shadow` — depth via colour + 1px border
- [ ] Text uses SUIT; section `h2` is `<h2 style={H2_STYLE}>` (no inline `marginBottom` override)
- [ ] Section spacing uses the `SECTION_GAP` / `SCROLL_MARGIN_TOP` tokens from `src/lib/styles.ts`, not raw numbers
- [ ] Content sits in the 1200px container with the standard page padding
- [ ] Responsive: grids collapse sensibly at 1023px and 767px
- [ ] New tokens (if truly needed) added to **both** `@theme` and `:root`

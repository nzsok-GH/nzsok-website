# NZSOK design system — conventions

The NZSOK (뉴질랜드 한민족 한글학교) website design system. Soft, pastel,
Korean-school brand. Components are **full-bleed page sections** with their
content baked in — compose them top-to-bottom to build a page, and use the
tokens below for any layout glue you write around them.

## Setup

- **No provider/wrapper is needed** — components read no React context. Import
  and render directly: `import { HeroSection } from 'nzsok-website'`.
- The bundle attaches every component to `window.NZSOK.*`.
- `Navigation` is `position: fixed` at the top (`--nav-h` = 72px tall). On a
  real page the scrolling content lives in a region pinned below it; when you
  compose a page, leave 72px of top space (or a `--nav-h` offset) under it.

## Palette — pastel only

Every color comes from these tokens. **Never introduce off-palette or
high-chroma colors.** All are defined as CSS custom properties (use
`var(--token)`); the same names exist as Tailwind v4 theme colors
(`bg-purple-400`, `text-text-light`, etc.).

| Family | Tokens | Use |
|---|---|---|
| Warm Ivory | `--bg-50` `--bg-100` `--bg-200` `--bg-300` `--bg-400` | backgrounds, surfaces |
| Pale Purple | `--purple-50`…`--purple-400` | brand, interactive, accents |
| Semantic purple | `--primary` (#9278d6) `--primary-dark` `--primary-hover` | buttons, links, emphasis |
| Pastel Mint | `--mint-100` `--mint-200` | positive / category A |
| Pastel Sky | `--sky-100` `--sky-200` | calm / info / category B |
| Pastel Yellow | `--yellow-100` `--yellow-200` | highlight / category C |
| Pastel Peach | `--peach-100` `--peach-200` | warm accent / category D |
| Text | `--text` (#1c2b3a) `--text-light` (#4a5f75) | headings / body |

## Styling idiom

- **Font: SUIT** for all text (`font-family: 'SUIT', 'Noto Sans KR', sans-serif`,
  or the `font-sans` utility). Weights 300–900 are loaded. Headings are heavy
  (700–800) dark `--text`; eyebrows are 13px uppercase `--purple-400`.
- **No `box-shadow`, no `text-shadow`** — anywhere. Create depth with color and
  **1px low-alpha borders** (e.g. `1px solid var(--bg-300)`), and `border-radius`
  (cards ~12px).
- **`.btn-primary`** is the canonical button: a purple pill
  (`background: var(--primary)`, white text, rounded-full). Use it for CTAs.
- Korean copy uses `word-break: keep-all` (wrap at spaces, never mid-word).

## Where the truth lives

Read these in the bound copy before styling: **`_ds/<folder>/styles.css`** (and
its `@import`s — tokens, `@font-face`, and `_ds_bundle.css` component styles) is
the authoritative token + class source. Each component's `*.d.ts` is its prop
contract and `*.prompt.md` its usage notes.

## Example

```tsx
import { HeroSection, EnrolContent } from 'nzsok-website';

export default function Page() {
  return (
    <main style={{ background: 'var(--bg-50)', color: 'var(--text)',
                   fontFamily: "'SUIT', sans-serif" }}>
      <HeroSection photos={heroPhotos} />
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px',
                        borderTop: '1px solid var(--bg-300)' }}>
        <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.08em', color: 'var(--purple-400)' }}>
          ENROLMENT
        </p>
        <EnrolContent />
      </section>
    </main>
  );
}
```

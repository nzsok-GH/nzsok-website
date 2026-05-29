# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Astro dev server (HMR)
npm run build      # astro build → static site in dist/
npm run preview    # preview the production build locally
```

## Architecture

This is an **Astro** static site deployed on **Vercel**. Astro renders every route to real HTML at build time (`output: "static"`), so there is no SPA redirect — each route is its own `.html` file. Client-side navigation and the cross-page fade are handled by Astro's View Transitions (`<ClientRouter />` in the layout).

**Routing** is file-based in `src/pages/`: `index.astro` (`/`), `about.astro`, `education.astro`, `enrol.astro`, `media.astro`.

**Layout** (`src/layouts/Layout.astro`): wraps every page. Holds the `<head>` (meta/OG tags, favicons, fonts preconnect, the Behold Instagram widget script), `<ClientRouter />`, the `<Navigation>` island, and Vercel `<Analytics>`. Pages pass `title` / `description` / `canonical` / `transparentNav` props.

**Islands vs. static.** Astro renders React components to static HTML with **zero client JS unless given a `client:*` directive**. The pattern here:

- **Hydrated islands** (interactive): `HeroPhysics.tsx` (`client:only="react"`, Matter.js canvas, home only), `Navigation.tsx` (`client:load`, mobile menu state), `SectionTabs.tsx` (`client:load`, scroll-spy on about/education/enrol), `HistorySection.tsx` (`client:visible`, auto-scrolling 연혁 timeline), `ClassDojoSection.tsx` (`client:visible`, auto carousel).
- **Static React content** (no directive → server-rendered, no JS shipped): `AboutSections.tsx` (intro/hymn + board/staff/campus), `EducationSections.tsx` (schedule/programs/annual), `EnrolContent.tsx`. These hold the page data as plain consts and render the markup; keep them directive-free.
- `Footer.astro` is a plain Astro component (links only).

When editing a page's static content, edit the corresponding `*Sections.tsx` / `*Content.tsx` component, not the `.astro` page (the page just composes islands + static components + Footer inside `<main>`).

**Styling** (`src/styles/index.css`, imported by `Layout.astro`): Tailwind v4 via the `@tailwindcss/vite` plugin (wired in `astro.config.mjs`). Brand colors/fonts are declared in `@theme { }` (available as utilities) and mirrored in `:root { }` as `var(--…)` for use in the custom CSS rules below. Fonts are loaded from jsDelivr via `@font-face`. Per-page hover effects that can't be CSS live inside the relevant island.

### Design system — follow [`DESIGN.md`](DESIGN.md)

Before writing or editing ANY UI (new sections, components, styling tweaks), read and follow
[`DESIGN.md`](DESIGN.md) — it is the source-of-truth design reference. Key rules that are easy
to violate:

- **Pastel palette only**, from the tokens in `@theme {}` / `:root {}`. Don't introduce
  off-palette or high-chroma colors; reach for an existing token first.
- **No `box-shadow` / `text-shadow`** anywhere (the hero canvas is the only exception). Create
  depth with color and 1px low-alpha borders.
- **SUIT for all UI text**; section `<h2>`s use the shared `H2_STYLE` values (SUIT,
  `clamp(24px,3vw,36px)`, 700, `#1c2b3a`).
- New scroll-target section ids need `scroll-margin-top: 148px`; content sits in the 1200px
  container with the standard page padding.
- A genuinely new design token must be added to **both** `@theme` and `:root`, and `DESIGN.md`
  updated to match.

**Media page** (`media.astro`): Instagram only — the `<behold-widget>` web component (script loaded in the layout head). There is no photo-album gallery or CMS.

## Deployment

Vercel auto-detects Astro (`astro build` → `dist/`). No `vercel.json` rewrite is needed since routes are real HTML files. `public/` holds static assets (logo, favicons, `classdojo/`, `sherwood-school/`, `robots.txt`). The sitemap is generated automatically at build by `@astrojs/sitemap` (`sitemap-index.xml`) from the actual routes — no manual upkeep.

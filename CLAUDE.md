# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite HMR)
npm run build      # build-albums.js → tsc -b → vite build
npm run preview    # preview production build locally
```

The build command runs three steps in sequence: generate `public/albums.json` from `_albums/*.md`, type-check, then bundle.

## Architecture

This is a single-page application deployed on Netlify. React Router handles client-side routing; Netlify's `/* → /index.html` redirect makes deep links work.

**Routing** (`src/App.tsx`): four routes — `/`, `/about`, `/admission`, `/gallery` — each mapped to a page component in `src/pages/`.

**Home page** (`src/pages/Home.tsx`): single full-viewport Hero section only — school name, tagline, CTA buttons, and key stats. No other sections.

**Shared components** (`src/components/`):

- `Navigation.tsx` — takes a `variant` prop: `'full'` (home/about, with dropdown nav), `'simple'` (admission, logo + back link), `'gallery'` (gallery page, logo + back + admin link)
- `Footer.tsx` — single unified design, no variant prop; used on all pages

**Styling** (`src/index.css`): Tailwind v4 loaded via `@import "tailwindcss"`. Brand colors and fonts are declared in `@theme { }` (makes them available as Tailwind utilities like `bg-navy`, `text-gold`) and mirrored in `:root { }` as `var(--navy)` etc. for use inside custom CSS rules. Animations, pseudo-elements, and complex gradients are written as regular CSS classes below the theme block.

**Gallery + CMS pipeline**:

- `_albums/*.md` — frontmatter-only markdown files created/edited by Decap CMS at `/admin`
- `build-albums.js` — ES module script run at build time; parses the frontmatter and writes `public/albums.json`
- `src/pages/Gallery.tsx` — fetches `/albums.json` at runtime; falls back to `SAMPLE_ALBUMS` if the fetch fails
- `public/admin/` — static Decap CMS files served as-is (bypasses Vite); uses Netlify Identity + Git Gateway for auth

**Types** (`src/types/album.ts`): `Album`, `AlbumPhoto`, and `FilterCategory` — import from here when working with album data.

## CMS content editing

Albums are managed via `/admin` (Decap CMS). The CMS writes to `_albums/` and `images/albums/`. A new Netlify deploy is triggered automatically on each publish, which re-runs `build-albums.js` to regenerate `public/albums.json`.

To add a `published: false` field to hide an album without deleting it, add it in the CMS or directly in the `.md` file — `build-albums.js` filters those out.

# design-sync notes — nzsok-website

This repo is an **Astro static website** (the NZSOK school site), not a reusable
component library. It was synced to claude.ai/design as the "package" shape in
**synth-entry mode** (no published `dist/` component entry, no `.d.ts`). Read
this before any re-sync.

## How the build is wired

- **No package entry exists.** Components are page-section React islands under
  `src/components/`. We hand-author `.design-sync/entry.tsx` with explicit
  **named re-exports** (incl. `export { default as X }`) so default-exported
  components land on `window.NZSOK.*`. The converter's synth-entry `export *`
  drops defaults — that's why the explicit entry is required.
  - Pass it on every build/driver run: `--entry ./.design-sync/entry.tsx`.
- **Component list** comes from `cfg.componentSrcMap` (the `.d.ts` scan finds 0
  exports). Every synced component is pinned there; `LoadingScreen: null`
  excludes it.
- **Props** are hand-written in `cfg.dtsPropsFor` (no real `.d.ts` to extract
  from). Empty string = no-prop component → clean `{}` interface.
- **CSS**: Tailwind v4 (`@import "tailwindcss"`) only compiles at site build.
  `cfg.buildCmd` runs `npm run build` then copies the single hashed
  `dist/_astro/*.css` to `.design-sync/.cache/compiled.css`, which is
  `cfg.cssEntry`. Re-run `buildCmd` before the converter so the compiled CSS is
  fresh.
- **Assets**: components reference site-absolute paths (`/logo.png`,
  `/classdojo/*`, `/sherwood-school/*`, `/reading/*`) and the hero needs built
  WebPs. `package-build.mjs` wipes `ds-bundle/`, so run
  **`bash .design-sync/copy-assets.sh ./ds-bundle` after every build** to stage
  those into the bundle root (and `/hero/h1..9.webp`). Add the asset globs to
  the upload plan's writes (`logo.png`, `classdojo/**`, `sherwood-school/**`,
  `reading/**`, `hero/**`).

## Render verification

- Playwright/Chromium was **not installed** for this sync (user opted to review
  in-browser). Builds run `package-validate.mjs --no-render-check`; the
  `[RENDER_SKIPPED]` warning is expected, not new.
- Previews were verified by a human + an MCP-browser screenshot of
  `.review.html`. Grades in `.cache/review/*.grade.json` reflect that.

## Component-specific

- **LoadingScreen — excluded.** One-shot intro overlay that sets
  `display:none` after 1.35s, so its static card is always blank. Re-add by
  restoring it in `entry.tsx`, `componentSrcMap`, and authoring a preview — but
  it can't render a meaningful static card without freezing its timer.
- **Navigation** renders its **mobile** layout in a card (card width < the `md`
  768px breakpoint → hamburger + logo, desktop links/dropdowns hidden). Honest
  responsive behavior; widen via an override viewport if the desktop bar is
  wanted.
- **CampusSection / ClassDojoSection** log React "unique key prop" warnings —
  pre-existing in the source, non-blocking, render fine.

## Known render warns

- `[RENDER_SKIPPED]` — expected every run (no browser installed).

## Re-sync risks (what can silently go stale)

- **`cfg.dtsPropsFor` is hand-written.** If a component's real props change in
  source, the synced `.d.ts` won't follow — re-check `HeroSection`,
  `Navigation`, `SectionTabs` props against source on a re-sync.
- **`entry.tsx` is hand-maintained.** New components added to
  `src/components/` won't sync until added to BOTH `entry.tsx` and
  `componentSrcMap`. Removed components must be dropped from both.
- **Hashed CSS filename**: `buildCmd` copies `dist/_astro/*.css` head-1. If a
  future build emits more than one CSS file, the copy may grab the wrong one —
  revisit the glob.
- **copy-assets.sh** mirrors the public asset paths the components reference. If
  a component starts referencing a new `/public` path, add it there or its card
  image 404s.
- Brand fonts load from **jsDelivr at runtime** (`[FONT_REMOTE]`); no font
  files ship. If jsDelivr URLs rot, every card falls back to system fonts.

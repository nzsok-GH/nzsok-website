# NZSOK Website

Official website for the New Zealand School of Korea (뉴질랜드 한민족 한글학교).

Built with Vite 6, React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + React Router v7 |
| Build tool | Vite 6 (with `@tailwindcss/vite`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme {}` for brand tokens) |
| CMS | Decap CMS at `/admin` (Netlify Identity + Git Gateway) |
| Hosting | Vercel |

---

## Project Structure

```
nzsok-website/
├── src/
│   ├── App.tsx            ← routes: /, /about, /education, /enrol, /gallery, /media
│   ├── pages/             ← one file per route
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Enrol.tsx
│   │   ├── Media.tsx
│   │   └── Gallery.tsx    ← fetches /albums.json at runtime
│   ├── components/
│   │   ├── Navigation.tsx ← variant: 'full' | 'simple' | 'gallery'
│   │   ├── Footer.tsx
│   │   ├── SectionTabs.tsx
│   │   ├── HeroPhysics.tsx
│   │   └── LoadingScreen.tsx
│   ├── types/
│   │   └── album.ts       ← Album, AlbumPhoto, FilterCategory
│   ├── index.css          ← Tailwind v4 + @theme {} brand tokens
│   └── main.tsx
├── public/
│   ├── albums.json        ← generated at build time (do not edit manually)
│   └── admin/             ← Decap CMS static files
├── _albums/               ← CMS-managed album frontmatter (.md files)
├── images/albums/         ← CMS-uploaded photos
├── build-albums.js        ← build-time script: parses _albums/*.md → albums.json
├── vercel.json            ← SPA fallback rewrite (/* → /index.html)
└── vite.config.ts
```

---

## Commands

```bash
npm run dev        # start dev server with HMR
npm run build      # build-albums.js → tsc -b → vite build
npm run preview    # preview production build locally
```

---

## Gallery CMS Pipeline

Albums are managed through the CMS at `/admin`. The flow:

1. Editor logs in at `/admin` and creates or edits an album.
2. Decap CMS commits a `.md` file to `_albums/` and photos to `images/albums/`.
3. Vercel detects the new commit and triggers a build.
4. `build-albums.js` parses all `.md` frontmatter and writes `public/albums.json`.
5. `Gallery.tsx` fetches `/albums.json` at runtime; falls back to `SAMPLE_ALBUMS` if the fetch fails.

To hide an album without deleting it, add `published: false` to its `.md` file — `build-albums.js` filters those out.

---

## Styling Conventions

Brand tokens are declared once in `src/index.css` under `@theme {}` (available as Tailwind utilities like `bg-navy`, `text-gold`) and mirrored in `:root {}` as CSS custom properties (`var(--navy)`) for use in custom CSS rules.

Animations, pseudo-elements, and complex gradients are written as regular CSS classes below the theme block — not in Tailwind config.

---

## Contact

admin@nzsok.school.nz

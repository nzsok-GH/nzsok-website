// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nzsok.school.nz",
  // 301 redirects from old URLs that Google still has indexed, so stale search
  // results / sitelinks don't 404 and link equity carries over. The Korean-slug
  // paths are the ones Google actually indexed (verified via site: search +
  // live 404 checks); the English ones are from an even older static structure.
  redirects: {
    // Korean-slug site (currently indexed; drives the broken sitelinks)
    "/입학안내": "/enrol",
    "/학교소개": "/about",
    "/학교소개/Teachers": "/about#staff",
    "/학교소개/Song": "/about#song",
    "/학교소개/BOT": "/about#board",
    "/이사회": "/about#board",
    "/교육": "/education",
    "/교육/class-time": "/education#schedule",
    "/교육/preschool": "/education#programs",
    "/교육/primary": "/education#programs",
    "/교육/middle": "/education#programs",
    "/교육/커리큘럼": "/education#programs",
    "/교육/yearlyplan": "/education#annual",
    // Older English-slug static structure (also live 404s)
    "/admission": "/enrol",
    "/gallery": "/media",
    "/admin": "/",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
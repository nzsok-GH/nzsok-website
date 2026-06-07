// Shared loader for the hero photo set. Globs src/assets/hero/hero-*.jpg and
// re-encodes each to a small WebP at build time (getImage). Used by the home
// hero and every hero variant page so the optimization lives in one place.
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export type HeroPhoto = { src: string; w: number; h: number };

const DEFAULT_WIDTH = 440;

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/hero/hero-*.jpg",
  { eager: true },
);

export async function getHeroPhotos(width = DEFAULT_WIDTH): Promise<HeroPhoto[]> {
  return Promise.all(
    Object.keys(modules)
      .sort()
      .map(async (key) => {
        const meta = modules[key].default;
        const h = Math.round((meta.height / meta.width) * width);
        const optimized = await getImage({
          src: meta,
          width,
          format: "webp",
          quality: 72,
        });
        return { src: optimized.src, w: width, h };
      }),
  );
}

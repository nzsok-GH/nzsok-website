import { HeroSection } from "nzsok-website";

// The hero is a CSS-only panning photo mosaic behind a left-weighted ivory
// scrim. `photos` are build-optimized WebPs; here we point at the staged
// /hero/ copies (see .design-sync/copy-assets.sh) so the mosaic is visible.
const photos = Array.from({ length: 9 }, (_, i) => ({
  src: `/hero/h${i + 1}.webp`,
  w: 440,
  h: 300,
}));

export const Default = () => <HeroSection photos={photos} />;

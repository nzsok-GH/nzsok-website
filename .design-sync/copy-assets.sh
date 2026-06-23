#!/usr/bin/env bash
# Copy the site-absolute assets the components reference (/logo.png,
# /classdojo/*, /sherwood-school/*, /reading/*) into the DS bundle root so the
# preview cards' absolute <img src> paths resolve. Also stages a handful of
# build-optimized hero photos under /hero/ for the HeroSection preview.
# Run after every package-build.mjs (the build wipes ds-bundle). Idempotent.
set -euo pipefail
OUT="${1:-./ds-bundle}"

cp public/logo.png "$OUT/logo.png"
cp -r public/classdojo "$OUT/classdojo"
cp -r public/sherwood-school "$OUT/sherwood-school"
cp -r public/reading "$OUT/reading"

# Hero photos: the built WebPs live under dist/_astro/hero-*.webp (hashed).
# Copy ~9 to a stable /hero/ for the HeroSection preview.
mkdir -p "$OUT/hero"
i=1
for f in $(find dist/_astro -name 'hero-*.webp' | sort | head -9); do
  cp "$f" "$OUT/hero/h$i.webp"
  i=$((i + 1))
done
echo "copied public assets + $((i - 1)) hero photos into $OUT"

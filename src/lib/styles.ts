import type { CSSProperties } from "react";

/**
 * Shared layout + typography tokens for the section content components.
 * These are the single source of truth for the values documented in
 * DESIGN.md → "Layout & spacing". Change them here, not inline.
 */

/** Vertical gap between major page sections (a section's `marginBottom`). */
export const SECTION_GAP = 80;

/** Gap between a section `<h2>` and the content beneath it (baked into `H2_STYLE`). */
export const HEADING_GAP = 32;

/** Anchor offset so hash links land below the sticky tab bar. The nav sits
 *  outside the `.page-scroll` region, so only the tab bar (+ gap) is offset. */
export const SCROLL_MARGIN_TOP = 76;

/**
 * Canonical section-heading style — every page-section `<h2>` uses this as-is.
 * The `HEADING_GAP` below it is part of the token, so call sites are just
 * `<h2 style={H2_STYLE}>`; don't re-specify `marginBottom` per heading.
 */
export const H2_STYLE: CSSProperties = {
  fontFamily: "'SUIT', sans-serif",
  fontSize: "clamp(24px,3vw,36px)",
  fontWeight: 700,
  color: "#1c2b3a",
  lineHeight: 1.3,
  marginBottom: HEADING_GAP,
};

/**
 * Canonical optimized SVGs live under `src/assets/brand/`.
 * Identical files are served from `public/brand/` for `<img src="…">` (no bundler SVG rule).
 * When updating the mark or lockup, edit `src/assets/brand/*.svg` then copy bytes to `public/brand/`.
 */
export const TALKS_LOGO_MARK_SRC = "/brand/talks-logo.svg" as const;
export const TALKS_LOGO_LOCKUP_SRC = "/brand/talks-logo-lockup.svg" as const;

/** Matchar beskuren `viewBox` i `*.svg` (grafikens faktiska bbox, inte 1536×1024-canvas). */
export const TALKS_LOGO_MARK_DIM = { w: 1222, h: 1004 } as const;
export const TALKS_LOGO_LOCKUP_DIM = { w: 1222, h: 1004 } as const;

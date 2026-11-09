// Font utilities. The font files are loaded in PassportJourney.tsx with these
// CSS variable names, so nothing in globals.css needs to change.
export const FONT_DISPLAY = "font-(family-name:--font-hero-display)";
export const FONT_EDITORIAL = "font-(family-name:--font-hero-editorial)";
export const FONT_BODY = "font-(family-name:--font-hero-body)";

/** Thin red-tint highlight behind the accent word ("Here."). */
export const HIGHLIGHT =
  "px-[0.06em] [background:linear-gradient(to_bottom,transparent_56%,color-mix(in_srgb,var(--color-accent)_90%,transparent)_46%)] ";
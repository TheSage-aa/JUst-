/**
 * Design tokens -- Saabi Bible, Appendix A (authoritative, supersedes any
 * value stated informally elsewhere in the Bible). Every value here is
 * copied verbatim from Appendix A.1-A.5. Do not invent new colors, sizes,
 * or radii here -- per Ch.7 SS7.2, any new value requires a Bible update
 * first, not a code-first addition.
 */

export const color = {
  bg: {
    dark: "#150E1B",
    light: "#F7F5F2",
  },
  text: {
    onDark: "#FFFFFF",
    onLight: {
      primary: "#1E1720",
      secondary: "#6B6270",
    },
  },
  border: {
    subtle: "#E5E1DC",
  },
  // success/warn are documented in the Bible as a base hex + opacity over
  // bg.light. We resolve that here as 8-digit hex (alpha suffix) so screens
  // can use a single flat color value rather than re-deriving the blend.
  // 0.70 -> B3, 0.55 -> 8C (standard alpha-to-hex rounding).
  success: {
    muted: "#4E9E6FB3", // color.success.muted, 70% opacity over bg.light (Ch.42 SS42.3)
  },
  warn: {
    muted: "#D98A5F8C", // color.warn.muted, 55% opacity over bg.light (Rule 42.3, Ch.1 SS1.3.1)
  },
  streak: {
    flameLit: "#F5A623",
    flameUnlit: "#B8B2AC",
    // color.streak.flame.frozen: 40% overlay of #8FC7DE on flameLit (Ch.43 SS43.2).
    // Resolved flat value for direct use; recompute if flameLit ever changes.
    flameFrozen: "#B4CBD4",
  },
  track: {
    hiv: "#E8385C", // HIV & Stigma Basics
    srh: "#F2A93B", // Sexual & Reproductive Health
    mentalHealth: "#8B6FD8", // Mental Health
    sti: "#2FB6A8", // STIs Beyond HIV
    chronic: "#5CA855", // Chronic Conditions
  },
  character: {
    bello: "#9ACD3C", // cross-track, non-host
  },
} as const;

export type TrackId =
  | "track-1-hiv-stigma"
  | "track-2-srh"
  | "track-3-mental-health"
  | "track-4-stis"
  | "track-5-chronic";

/** Maps each track to its single accent color (Ch.7 SS7.2 -- one accent per track). */
export const trackAccent: Record<TrackId, string> = {
  "track-1-hiv-stigma": color.track.hiv,
  "track-2-srh": color.track.srh,
  "track-3-mental-health": color.track.mentalHealth,
  "track-4-stis": color.track.sti,
  "track-5-chronic": color.track.chronic,
};

export const type = {
  display: {
    xl: { size: 34, weight: "700" as const }, // Cover/splash headline, Track Complete headline
    lg: { size: 26, weight: "600" as const }, // Screen headlines, character-hero headline lines
    md: { size: 20, weight: "600" as const }, // Card titles, lesson titles
  },
  body: {
    lg: { size: 17, weight: "400" as const }, // Primary lesson/dialogue reading text
    md: { size: 15, weight: "400" as const }, // Secondary body text, descriptions
  },
  caption: { size: 13, weight: "500" as const }, // Labels, tags, timestamps, badge condition text
  accentItalic: { size: 24, weight: "400" as const, italic: true }, // matches paired display size, 20-26
} as const;

/** Base unit 4px (Appendix A.4). */
export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8, // buttons, chips
  md: 16, // cards
  lg: 24, // modals, sheets
  full: 9999, // avatars, badge circles
} as const;

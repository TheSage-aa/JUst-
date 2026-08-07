/**
 * Character registry -- Saabi Bible Book III (Ch.21-28). Identity/color data
 * transcribed verbatim. Voice Test checklists live as comments next to each
 * character for quick reference during content authoring/review (Ch.67
 * SS67.2's compliance-check habit) -- the checklists themselves are run
 * manually against dialogue, not mechanically enforced here.
 */

import { color } from "../design/tokens";

export type CharacterId = "buggy" | "zara" | "kemi" | "nana" | "dr_ayo" | "tunde" | "bello";

export interface Character {
  id: CharacterId;
  name: string;
  /** Track this character hosts, or null (Buggy, Bello -- cross-track). */
  hostsTrackId: string | null;
  accentColor: string;
  tagline: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  buggy: {
    id: "buggy",
    name: "Buggy",
    hostsTrackId: null,
    // Buggy has no single track accent; uses the app's streak-gold as his
    // signature glow color per the source deck's "mascot-glow gold" note
    // (Appendix A.1, color.streak.flame.lit).
    accentColor: color.streak.flameLit,
    tagline: "Not human, and doesn't try to be. Saabi's memory, made into a character.",
  },
  zara: {
    id: "zara",
    name: "Zara",
    hostsTrackId: "track-1-hiv-stigma",
    accentColor: color.track.hiv,
    tagline: "The thing everyone's aunty got wrong.",
  },
  kemi: {
    id: "kemi",
    name: "Kemi",
    hostsTrackId: "track-2-srh",
    accentColor: color.track.srh,
    tagline: "New to a lot of this, on purpose.",
  },
  nana: {
    id: "nana",
    name: "Nana",
    hostsTrackId: "track-3-mental-health",
    accentColor: color.track.mentalHealth,
    tagline: "Brings quiet instead of energy.",
  },
  dr_ayo: {
    id: "dr_ayo",
    name: "Dr. Ayo",
    hostsTrackId: "track-4-stis",
    accentColor: color.track.sti,
    tagline: "The facts don't have to sound like a lecture.",
  },
  tunde: {
    id: "tunde",
    name: "Tunde",
    hostsTrackId: "track-5-chronic",
    accentColor: color.track.chronic,
    tagline: "Eating well shouldn't feel like punishment.",
  },
  bello: {
    id: "bello",
    name: "Bello",
    hostsTrackId: null,
    accentColor: color.character.bello,
    tagline: "Doesn't own a track, owns the timing.",
  },
};

/*
 * Voice Test quick-reference (Book III):
 *
 * BUGGY (Ch.21 SS21.7): short (1-2 sentences); references something
 * specific/real about the user's state when memory data exists; emotional
 * intensity stays within Buggy's narrow stable range; streak-loss/absence
 * beats follow acknowledge-briefly-then-pivot-forward; recognizable as
 * Buggy through warmth-through-specificity, not warmth-through-volume.
 *
 * ZARA (Ch.22 SS22.6): directness aimed at the myth, never the reader;
 * myth named in general/third-person terms; short, quick-paced rhythm;
 * humor amused-at-the-myth's-ubiquity, never mocking-of-the-believer.
 *
 * KEMI (Ch.23 SS23.5): genuine curiosity, not performed ignorance;
 * consent-adjacent content stated with direct clarity; question-first
 * pattern makes the reader's own question feel equally welcome.
 *
 * NANA (Ch.24 SS24.5): noticeably slower/gentler pacing; no diagnostic
 * language; heavy beats close with actionable framing or a support
 * pointer; never solicits personal disclosure.
 *
 * DR. AYO (Ch.25 SS25.5): no second-person directives ("you should/need
 * to"); would sound normal said out loud to a friend, not textbook-hedged;
 * factual precision fully intact despite the casual register.
 *
 * TUNDE (Ch.26 SS26.5): frames management around enablement, not
 * restriction/punishment; difficulty acknowledged then pivots to something
 * concrete in the same beat; severity/complication language absent or
 * minimal, never a scare tactic.
 *
 * BELLO (Ch.27 SS27.5): appears at a genuine tension-break point, not by
 * default; joke aimed at relatable absurdity, never at the topic's
 * seriousness or the reader; never delivers the lesson's core fact/
 * correction -- that always belongs to the track's host.
 */

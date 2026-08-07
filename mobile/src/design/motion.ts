/**
 * Motion system -- Saabi Bible Book VI (Ch.41-46), transcribed verbatim.
 * Every animation in the app should read its parameters from here rather
 * than inventing a duration/easing on the fly (Ch.41.1's "small,
 * deliberate set of motion primitives" requirement). This pass (Ch.68
 * step 6) wires these exact values into the animated surfaces that
 * already exist -- see the module comment in each consuming file for
 * which Book VI section it implements, and this file's own trailing
 * comment for what Book VI specifies but isn't wired up anywhere yet.
 */

/** Ch.41.1 item 1 -- Spring-Bounce. Reanimated/Animated spring config. */
export const SPRING_BOUNCE = { damping: 12, stiffness: 180, mass: 1 } as const;

/** Ch.41.1 item 2 -- Soft-Fade-Slide. Standard eased curve, no overshoot. */
export const SOFT_FADE_SLIDE = {
  durationMs: 280,
  // cubic-bezier(0.25, 0.1, 0.25, 1.0) -- a standard ease-out curve.
  bezier: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
};

/** Ch.41.1 item 3 -- Gentle-Shake. Reserved exclusively for incorrect-quiz-
 * answer feedback (Ch.42.3) and locked-node tap rejection (Ch.45.3). The
 * 6px amplitude ceiling is a hard constitutional constraint (Ch.1 SS1.3.1
 * non-punitive requirement), not a design suggestion -- never widen it. */
export const GENTLE_SHAKE = {
  amplitudePx: 6,
  cycles: 3,
  durationMs: 320,
  // "linear-decay": each successive cycle's amplitude decays linearly
  // toward 0 rather than holding constant, so the motion settles rather
  // than looking like a mechanical buzz.
};

/** Ch.41.1 item 4 -- Idle-Loop. Buggy's continuous presence animation
 * (Ch.42.1) and any other "alive and waiting" signal. */
export const IDLE_LOOP = {
  verticalRangePx: 4, // range is +-4px around rest, i.e. an 8px total span
  periodMs: 2400,
};

/** Ch.42.1's secondary wing-flutter micro-loop, layered on top of the
 * primary Idle-Loop so Buggy reads as a living firefly, not a bobbing
 * sticker. */
export const WING_FLUTTER = { periodMs: 900, opacityScalePulsePct: 3 };

/** Ch.41.2's Global Timing Standards table, by interaction category. */
export const TIMING = {
  buttonTapMs: 100, // Spring-Bounce, scale 0.96x -> 1.0x
  screenTransitionMs: SOFT_FADE_SLIDE.durationMs,
  chatBubbleRevealMs: 220, // Soft-Fade-Slide, slide up 12px + fade
  chatBubbleSlideDistancePx: 12,
  typingIndicatorMinMs: 600,
  typingIndicatorMaxMs: 1000, // randomized within range per bubble, deliberately non-mechanical
  dramaPanelSwipeMs: 240,
  progressFillMs: 500, // never an instant snap, per Ch.7 SS7.4
  correctFeedbackInMs: 180,
  correctFeedbackHoldMs: 600, // then auto-advances -- 780ms total before advance
  incorrectShakeMs: GENTLE_SHAKE.durationMs,
  incorrectCorrectionFadeMs: 220, // fades in immediately after the shake completes, no overlap
} as const;

/** Ch.44.1's celebration-tier proportionality table. */
export const CELEBRATION_TIER = {
  lessonComplete: { tier: 1, durationMs: 400 }, // Spring-Bounce on checkmark only, no Lottie
  streakMilestone: { tier: 2, durationMs: 1200 },
  badgeUnlocked: { tier: 2, durationMs: 1400 },
  trackComplete: { tier: 3, durationMs: 2200 },
  fullCircle: { tier: 3, durationMs: 2800 },
} as const;

/** Ch.46.1's reduced-motion fallback values. */
export const REDUCED_MOTION = {
  crossfadeMs: 150,
  celebrationStaticHoldMs: 800,
  buggyOpacityPulsePct: 8, // Ch.46.2.1 -- Buggy's idle loop under reduced motion
  buggyOpacityPulsePeriodMs: 3000,
};

/*
 * NOT YET WIRED (flagged honestly rather than silently skipped -- Ch.68
 * step 6 scope note):
 * - Lottie confetti/sparkle layers for Tier 2/3 celebrations (Ch.44) --
 *   no Lottie asset pipeline exists yet; celebration moments currently
 *   have no visual treatment beyond what LessonCompleteScreen already
 *   shows statically.
 * - Host character expression-state crossfades (Ch.42.2) -- needs three
 *   art variants per host character that don't exist yet (avatars are
 *   still the initial-letter-circle placeholder).
 * - Streak counter increment/freeze/reset animations (Ch.43.1-43.3) and
 *   XP count-up (Ch.43.4) -- Profile/Lesson Complete currently render
 *   these as static final values, not animated deltas.
 * - Global button-tap Spring-Bounce (Ch.41.2 row 1) across every
 *   touchable -- applied so far only to the specific elements this pass
 *   touched, not retrofitted onto every existing TouchableOpacity.
 */

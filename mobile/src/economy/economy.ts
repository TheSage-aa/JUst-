/**
 * Economy engine -- Saabi Bible Book IV (Ch.29-32), transcribed to exact
 * numeric rules. Every function here is pure (no Date.now()/storage access
 * internally) so it can be unit-tested deterministically against Book IX
 * Ch.62's QA-ECON test cases -- see economy.test.ts, which is written to
 * assert those exact cases by ID.
 *
 * Per Ch.29 SS29.1: XP only ever increases. Any function here that could
 * decrement xpTotal is a bug by definition, not a valid code path.
 */

import type { BadgeId, Economy } from "../types/models";

// ---------------------------------------------------------------------------
// Shared local-date helper (Rule 31.1: streak evaluation always uses the
// device's *current* local time, never a timezone captured once at signup --
// structurally guaranteed here by never storing a timezone anywhere in the
// Economy type and always deriving from a fresh Date's local getters).
// ---------------------------------------------------------------------------

export function getLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ---------------------------------------------------------------------------
// XP -- Ch.29
// ---------------------------------------------------------------------------

export interface CompleteLessonParams {
  /** Has this specific lesson never been completed by this user before?
   * Rule 29.3.1: replay awards zero XP, full stop. */
  isFirstCompletion: boolean;
  /** Lesson 10 of any track (Ch.5 SS5.3 mixed review) -> 15 XP base instead of 10. */
  isMixedReviewLesson: boolean;
  /** 100% correct, first attempt, no hint/retry used (Ch.29 SS29.2). Only
   * meaningful when isFirstCompletion is true -- a replay is never "first
   * attempt" by definition, so callers should pass false on replay. */
  isPerfectFirstAttempt: boolean;
  /** True only on the completion event that finishes a track's 10th lesson
   * for the first time (Ch.29 SS29.2's "once per track" bonus, tied to
   * Lesson 10's own first-completion event per Rule 29.3.1). */
  isTrackCompletingEvent: boolean;
  /** Device-local calendar date string (YYYY-MM-DD), via getLocalDateString. */
  today: string;
}

export interface CompleteLessonResult {
  economy: Economy;
  xpAwarded: number;
  dailyBonusAwarded: boolean;
}

/** Ch.29 SS29.2 XP Award Table + Rule 29.3.1 replay idempotency. */
export function applyLessonCompletionXP(economy: Economy, params: CompleteLessonParams): CompleteLessonResult {
  if (!params.isFirstCompletion) {
    // QA-ECON-03: replay awards zero XP, regardless of accuracy.
    return { economy, xpAwarded: 0, dailyBonusAwarded: false };
  }

  let xp = params.isMixedReviewLesson ? 15 : 10;
  if (params.isPerfectFirstAttempt) xp += 5;
  if (params.isTrackCompletingEvent) xp += 25;

  const dailyBonusAwarded = economy.lastDailyBonusDate !== params.today;
  if (dailyBonusAwarded) xp += 5;

  const nextEconomy: Economy = {
    ...economy,
    xpTotal: economy.xpTotal + xp, // never decrements -- Ch.29 SS29.1
    lastDailyBonusDate: dailyBonusAwarded ? params.today : economy.lastDailyBonusDate,
    perfectFirstAttemptCount: economy.perfectFirstAttemptCount + (params.isPerfectFirstAttempt ? 1 : 0),
  };

  return { economy: nextEconomy, xpAwarded: xp, dailyBonusAwarded };
}

/** Rule 29.4.1 -- Level is derived, read-only, never independently settable.
 * Phase 1 starting curve exactly as specified in Ch.29 SS29.4. */
const LEVEL_THRESHOLDS = [0, 50, 120, 220, 350, 500, 700] as const;

export function deriveLevel(xpTotal: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xpTotal >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return level;
}

// ---------------------------------------------------------------------------
// Hearts -- Ch.30
// ---------------------------------------------------------------------------

export const HEARTS_CAP = 5;
const HEART_REGEN_HOURS = 4;

/** Ch.30 SS30.3 -- one heart per incorrect answer, floor 0. Replays never
 * consume hearts (Ch.16 SS16.5) -- callers must not invoke this on replay. */
export function consumeHeart(economy: Economy): Economy {
  return { ...economy, heartsCurrent: Math.max(0, economy.heartsCurrent - 1) };
}

/** Rule 30.4.1 -- one heart every 4 hours, capped at 5, timer runs
 * continuously including while the app is closed (caller passes elapsed
 * wall-clock time via `now`, not a foreground-only timer). */
export function regenerateHearts(economy: Economy, now: Date): Economy {
  if (economy.heartsCurrent >= HEARTS_CAP) {
    return economy; // QA-ECON-07: no overflow, nothing to advance
  }
  const lastRegenMs = new Date(economy.heartsLastRegenAt).getTime();
  const elapsedHours = (now.getTime() - lastRegenMs) / (1000 * 60 * 60);
  const heartsToAdd = Math.floor(elapsedHours / HEART_REGEN_HOURS);
  if (heartsToAdd <= 0) return economy;

  const heartsCurrent = Math.min(HEARTS_CAP, economy.heartsCurrent + heartsToAdd);
  // If we hit the cap, don't bank leftover partial-interval credit -- reset
  // the regen clock to `now`. Otherwise, advance by exactly the consumed
  // whole 4-hour increments, preserving any partial-interval remainder for
  // the next check (so regen timing doesn't drift).
  const heartsLastRegenAt =
    heartsCurrent >= HEARTS_CAP
      ? now.toISOString()
      : new Date(lastRegenMs + heartsToAdd * HEART_REGEN_HOURS * 60 * 60 * 1000).toISOString();

  return { ...economy, heartsCurrent, heartsLastRegenAt };
}

// ---------------------------------------------------------------------------
// Streaks -- Ch.31
// ---------------------------------------------------------------------------

export type StreakRolloverEvent = "none" | "frozen" | "reset";

/** Rule 31.2 -- increments at most once per local calendar day, on lesson
 * completion (any accuracy). Multiple lessons the same day: +1 total, not
 * per lesson (QA-ECON-09). First-ever completion initializes at 1 (0 -> 1). */
export function incrementStreakOnCompletion(economy: Economy, today: string): Economy {
  if (economy.lastStreakIncrementDate === today) {
    return economy; // QA-ECON-09: already counted today
  }
  const newStreak = economy.currentStreak + 1;
  return {
    ...economy,
    currentStreak: newStreak,
    lastStreakIncrementDate: today,
    // Keep longestStreak current continuously, not only at reset time --
    // flagged per Ch.67 SS67.3: the Bible only states this update
    // explicitly at reset (SS31.3.2 step 5), but "never erase the
    // historical record" (same rule) is best satisfied by tracking the
    // running max at all times, so longestStreak is never stale if the
    // app never happens to hit a reset branch. Idempotent with the
    // reset-time update below.
    longestStreak: Math.max(economy.longestStreak, newStreak),
  };
}

/** Rule 31.3.2 -- run once per local calendar day at rollover (e.g. on app
 * open, when `today` differs from the last day this check ran). Evaluates
 * whether *yesterday* had a completion; if not, consumes a freeze or resets. */
export function evaluateStreakRollover(
  economy: Economy,
  today: string,
  previousLocalDate: string
): { economy: Economy; event: StreakRolloverEvent } {
  if (economy.currentStreak === 0) {
    return { economy, event: "none" }; // nothing at risk
  }
  if (economy.lastStreakIncrementDate === today) {
    return { economy, event: "none" }; // already active today
  }
  const hadActivityYesterday = economy.lastStreakIncrementDate === previousLocalDate;
  if (hadActivityYesterday) {
    return { economy, event: "none" }; // step 2: streak continues unbroken
  }

  // step 3-4: yesterday was missed -- check for a freeze.
  if (economy.streakFreezesAvailable > 0) {
    return {
      economy: { ...economy, streakFreezesAvailable: economy.streakFreezesAvailable - 1 },
      event: "frozen",
    };
  }

  // step 5: no freeze -- reset, but record the longest streak first.
  const longestStreak = Math.max(economy.longestStreak, economy.currentStreak);
  return {
    economy: { ...economy, currentStreak: 0, longestStreak },
    event: "reset",
  };
}

/** Ch.31 SS31.5 -- pure eligibility predicate. The "shown once per day"
 * bookkeeping is session/UI state (Ch.20 SS20.3), not economy state, and
 * lives in the app store, not here. */
export function isStreakAtRisk(economy: Economy, today: string): boolean {
  return economy.currentStreak >= 1 && economy.lastStreakIncrementDate !== today;
}

// ---------------------------------------------------------------------------
// Badges -- Ch.32
// ---------------------------------------------------------------------------

export interface BadgeEvalContext {
  trackComplete: {
    "track-1-hiv-stigma": boolean;
    "track-2-srh": boolean;
    "track-3-mental-health": boolean;
    "track-4-stis": boolean;
    "track-5-chronic": boolean;
  };
  now: Date;
}

const TRACK_BADGE: Array<{ trackKey: keyof BadgeEvalContext["trackComplete"]; badgeId: BadgeId }> = [
  { trackKey: "track-1-hiv-stigma", badgeId: "myth-crusher" },
  { trackKey: "track-2-srh", badgeId: "question-asker" },
  { trackKey: "track-3-mental-health", badgeId: "quiet-strength" },
  { trackKey: "track-4-stis", badgeId: "clarity-seeker" },
  { trackKey: "track-5-chronic", badgeId: "nutrition-ninja" },
];

/** Ch.32 SS32.2 unlock conditions, evaluated in a fixed, sequenced order
 * (Rule 32.3.2: simultaneous unlocks are shown one after another, never
 * stacked -- callers should animate `newlyUnlocked` in array order). */
export function evaluateBadgeUnlocks(economy: Economy, ctx: BadgeEvalContext): { economy: Economy; newlyUnlocked: BadgeId[] } {
  const already = new Set(economy.badgesEarned.map((b) => b.badgeId));
  const newlyUnlocked: BadgeId[] = [];

  const isEligible = (badgeId: BadgeId): boolean => {
    switch (badgeId) {
      case "myth-crusher":
      case "question-asker":
      case "quiet-strength":
      case "clarity-seeker":
      case "nutrition-ninja": {
        const entry = TRACK_BADGE.find((t) => t.badgeId === badgeId)!;
        return ctx.trackComplete[entry.trackKey];
      }
      case "habit-hero":
        return economy.currentStreak >= 7;
      case "myth-free-zone":
        return economy.perfectFirstAttemptCount >= 5;
      case "full-circle":
        return Object.values(ctx.trackComplete).every(Boolean);
      default:
        return false;
    }
  };

  // Fixed evaluation order: the track badge tied to *this* completion event
  // first (if applicable), then the remaining cross-track badges, with
  // Full Circle always last since it depends on every track badge's own
  // condition already being true (QA-ECON-15).
  const evalOrder: BadgeId[] = [
    "myth-crusher",
    "question-asker",
    "quiet-strength",
    "clarity-seeker",
    "nutrition-ninja",
    "habit-hero",
    "myth-free-zone",
    "full-circle",
  ];

  for (const badgeId of evalOrder) {
    if (already.has(badgeId)) continue;
    if (isEligible(badgeId)) {
      newlyUnlocked.push(badgeId);
    }
  }

  if (newlyUnlocked.length === 0) return { economy, newlyUnlocked };

  const nowIso = ctx.now.toISOString();
  const economyNext: Economy = {
    ...economy,
    badgesEarned: [...economy.badgesEarned, ...newlyUnlocked.map((badgeId) => ({ badgeId, earnedAt: nowIso }))],
  };
  return { economy: economyNext, newlyUnlocked };
}

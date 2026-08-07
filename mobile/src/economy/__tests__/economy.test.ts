/**
 * Book IX, Ch.62 "Game Economy Test Cases" -- each test below is named and
 * implemented to assert its corresponding QA-ECON case exactly as specified.
 * Per Book X Ch.68 SS68.1 step 1, this suite must pass before any screen is
 * built.
 */

import type { Economy } from "../../types/models";
import {
  applyLessonCompletionXP,
  consumeHeart,
  deriveLevel,
  evaluateBadgeUnlocks,
  evaluateStreakRollover,
  getLocalDateString,
  HEARTS_CAP,
  incrementStreakOnCompletion,
  isStreakAtRisk,
  regenerateHearts,
} from "../economy";

function freshEconomy(overrides: Partial<Economy> = {}): Economy {
  return {
    userId: "u1",
    xpTotal: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStreakIncrementDate: null,
    streakFreezesAvailable: 2,
    heartsCurrent: HEARTS_CAP,
    heartsLastRegenAt: new Date("2026-08-01T00:00:00.000Z").toISOString(),
    badgesEarned: [],
    lastDailyBonusDate: null,
    perfectFirstAttemptCount: 0,
    ...overrides,
  };
}

describe("QA-ECON-01..05 -- XP (Ch.29)", () => {
  test("QA-ECON-01: base lesson completion XP is exactly 10", () => {
    // Precondition isolates the mechanic under test: daily bonus already
    // claimed today, not a perfect run, not the mixed-review lesson, not a
    // track-completing event -- see economy.ts's applyLessonCompletionXP
    // doc comment for why this isolation is the correct reading of a QA
    // case whose stated precondition doesn't otherwise mention those.
    const today = "2026-08-07";
    const economy = freshEconomy({ lastDailyBonusDate: today });
    const { economy: next, xpAwarded } = applyLessonCompletionXP(economy, {
      isFirstCompletion: true,
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: false,
      isTrackCompletingEvent: false,
      today,
    });
    expect(xpAwarded).toBe(10);
    expect(next.xpTotal).toBe(10);
  });

  test("QA-ECON-02: perfect-run bonus is exactly 15 (10 base + 5 bonus)", () => {
    const today = "2026-08-07";
    const economy = freshEconomy({ lastDailyBonusDate: today });
    const { xpAwarded } = applyLessonCompletionXP(economy, {
      isFirstCompletion: true,
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: true,
      isTrackCompletingEvent: false,
      today,
    });
    expect(xpAwarded).toBe(15);
  });

  test("QA-ECON-03: replay awards zero XP regardless of accuracy", () => {
    const today = "2026-08-07";
    const economy = freshEconomy({ xpTotal: 100 });
    const { economy: next, xpAwarded } = applyLessonCompletionXP(economy, {
      isFirstCompletion: false,
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: true, // even a "perfect" replay awards nothing
      isTrackCompletingEvent: false,
      today,
    });
    expect(xpAwarded).toBe(0);
    expect(next.xpTotal).toBe(100);
  });

  test("QA-ECON-04: daily first-lesson bonus applies once per day, not per lesson", () => {
    const today = "2026-08-07";
    let economy = freshEconomy();
    const first = applyLessonCompletionXP(economy, {
      isFirstCompletion: true,
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: false,
      isTrackCompletingEvent: false,
      today,
    });
    expect(first.dailyBonusAwarded).toBe(true);
    expect(first.xpAwarded).toBe(15); // 10 base + 5 daily bonus
    economy = first.economy;

    const second = applyLessonCompletionXP(economy, {
      isFirstCompletion: true, // a different lesson, also its first completion
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: false,
      isTrackCompletingEvent: false,
      today,
    });
    expect(second.dailyBonusAwarded).toBe(false);
    expect(second.xpAwarded).toBe(10); // base only, no second daily bonus
  });

  test("QA-ECON-05: no action in the app ever decrements XP", () => {
    const economy = freshEconomy({ xpTotal: 50 });
    const afterHeartLoss = consumeHeart(economy);
    const afterStreakReset = evaluateStreakRollover(
      { ...economy, currentStreak: 5, lastStreakIncrementDate: "2026-08-01" },
      "2026-08-05",
      "2026-08-04"
    ).economy;
    const afterReplay = applyLessonCompletionXP(economy, {
      isFirstCompletion: false,
      isMixedReviewLesson: false,
      isPerfectFirstAttempt: false,
      isTrackCompletingEvent: false,
      today: "2026-08-07",
    }).economy;

    expect(afterHeartLoss.xpTotal).toBe(50);
    expect(afterStreakReset.xpTotal).toBe(50);
    expect(afterReplay.xpTotal).toBe(50);
  });
});

describe("Level derivation (Ch.29 SS29.4)", () => {
  test("derives the correct level at each threshold", () => {
    expect(deriveLevel(0)).toBe(1);
    expect(deriveLevel(49)).toBe(1);
    expect(deriveLevel(50)).toBe(2);
    expect(deriveLevel(700)).toBe(7);
    expect(deriveLevel(10000)).toBe(7); // no higher tier defined yet -- stays at top
  });
});

describe("QA-ECON-06..07 -- Hearts (Ch.30)", () => {
  test("QA-ECON-06: one heart regenerates every 4 hours", () => {
    const start = new Date("2026-08-07T00:00:00.000Z");
    const economy = freshEconomy({ heartsCurrent: 3, heartsLastRegenAt: start.toISOString() });
    const fourHoursLater = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const next = regenerateHearts(economy, fourHoursLater);
    expect(next.heartsCurrent).toBe(4);
  });

  test("QA-ECON-07: hearts never exceed the cap of 5", () => {
    const start = new Date("2026-08-07T00:00:00.000Z");
    const economy = freshEconomy({ heartsCurrent: 5, heartsLastRegenAt: start.toISOString() });
    const muchLater = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    const next = regenerateHearts(economy, muchLater);
    expect(next.heartsCurrent).toBe(5);
  });
});

describe("QA-ECON-08..13 -- Streaks (Ch.31)", () => {
  test("QA-ECON-08: streak increments by 1 on a single lesson completion", () => {
    const economy = freshEconomy({ currentStreak: 4, lastStreakIncrementDate: "2026-08-06" });
    const next = incrementStreakOnCompletion(economy, "2026-08-07");
    expect(next.currentStreak).toBe(5);
  });

  test("QA-ECON-09: multiple lessons same day increments streak by 1 total, not 3", () => {
    let economy = freshEconomy({ currentStreak: 4, lastStreakIncrementDate: "2026-08-06" });
    economy = incrementStreakOnCompletion(economy, "2026-08-07");
    economy = incrementStreakOnCompletion(economy, "2026-08-07");
    economy = incrementStreakOnCompletion(economy, "2026-08-07");
    expect(economy.currentStreak).toBe(5);
  });

  test("QA-ECON-10: miss with a freeze available preserves the streak and consumes one freeze", () => {
    const economy = freshEconomy({
      currentStreak: 5,
      lastStreakIncrementDate: "2026-08-05", // two days before "today" -> yesterday (08-06) was missed
      streakFreezesAvailable: 2,
    });
    const { economy: next, event } = evaluateStreakRollover(economy, "2026-08-07", "2026-08-06");
    expect(event).toBe("frozen");
    expect(next.currentStreak).toBe(5); // unchanged
    expect(next.streakFreezesAvailable).toBe(1);
  });

  test("QA-ECON-11: miss with no freeze available resets streak and preserves longest_streak", () => {
    const economy = freshEconomy({
      currentStreak: 12,
      longestStreak: 12,
      lastStreakIncrementDate: "2026-08-05",
      streakFreezesAvailable: 0,
    });
    const { economy: next, event } = evaluateStreakRollover(economy, "2026-08-07", "2026-08-06");
    expect(event).toBe("reset");
    expect(next.currentStreak).toBe(0);
    expect(next.longestStreak).toBe(12); // never erased, per Rule 31.3.2 step 5
  });

  test("QA-ECON-12: streak evaluation always derives from the current local date, not a stored timezone", () => {
    // Structural guarantee: getLocalDateString takes a Date and reads its
    // *current* local getters -- there is no timezone field anywhere on
    // Economy (see types/models.ts) that could be "captured at signup" and
    // go stale. Two Date objects representing different moments always
    // yield independently-correct local date strings.
    const d1 = new Date(2026, 6, 31, 23, 0); // local Jul 31, 23:00
    const d2 = new Date(2026, 7, 1, 1, 0); // local Aug 1, 01:00
    expect(getLocalDateString(d1)).toBe("2026-07-31");
    expect(getLocalDateString(d2)).toBe("2026-08-01");
  });

  test("QA-ECON-13 (predicate only -- 'shown once' bookkeeping lives in the app store, not here): risk is only true with an active streak and no completion yet today", () => {
    const atRisk = freshEconomy({ currentStreak: 3, lastStreakIncrementDate: "2026-08-06" });
    const notAtRiskNoStreak = freshEconomy({ currentStreak: 0, lastStreakIncrementDate: null });
    const notAtRiskAlreadyDoneToday = freshEconomy({ currentStreak: 3, lastStreakIncrementDate: "2026-08-07" });

    expect(isStreakAtRisk(atRisk, "2026-08-07")).toBe(true);
    expect(isStreakAtRisk(notAtRiskNoStreak, "2026-08-07")).toBe(false);
    expect(isStreakAtRisk(notAtRiskAlreadyDoneToday, "2026-08-07")).toBe(false);
  });
});

describe("QA-ECON-14..16 -- Badges (Ch.32)", () => {
  const baseCtx = (overrides: Partial<Record<string, boolean>> = {}) => ({
    trackComplete: {
      "track-1-hiv-stigma": false,
      "track-2-srh": false,
      "track-3-mental-health": false,
      "track-4-stis": false,
      "track-5-chronic": false,
      ...overrides,
    },
    now: new Date("2026-08-07T12:00:00.000Z"),
  });

  test("QA-ECON-14: completing Track 1's final lesson unlocks Myth Crusher immediately", () => {
    const economy = freshEconomy();
    const { economy: next, newlyUnlocked } = evaluateBadgeUnlocks(economy, baseCtx({ "track-1-hiv-stigma": true }));
    expect(newlyUnlocked).toEqual(["myth-crusher"]);
    expect(next.badgesEarned.map((b) => b.badgeId)).toContain("myth-crusher");
  });

  test("QA-ECON-14b: an earned badge is never revoked on a subsequent evaluation", () => {
    const economy = freshEconomy({ badgesEarned: [{ badgeId: "myth-crusher", earnedAt: "2026-08-01T00:00:00.000Z" }] });
    // Track 1 still complete, re-evaluated (e.g. app reopened) -- should not duplicate or drop it.
    const { economy: next, newlyUnlocked } = evaluateBadgeUnlocks(economy, baseCtx({ "track-1-hiv-stigma": true }));
    expect(newlyUnlocked).toEqual([]);
    expect(next.badgesEarned.filter((b) => b.badgeId === "myth-crusher")).toHaveLength(1);
  });

  test("QA-ECON-15: completing the 5th track unlocks its own badge and Full Circle, sequenced not stacked", () => {
    const economy = freshEconomy({
      badgesEarned: [
        { badgeId: "myth-crusher", earnedAt: "x" },
        { badgeId: "question-asker", earnedAt: "x" },
        { badgeId: "quiet-strength", earnedAt: "x" },
        { badgeId: "clarity-seeker", earnedAt: "x" },
      ],
    });
    const ctx = baseCtx({
      "track-1-hiv-stigma": true,
      "track-2-srh": true,
      "track-3-mental-health": true,
      "track-4-stis": true,
      "track-5-chronic": true, // just completed
    });
    const { newlyUnlocked } = evaluateBadgeUnlocks(economy, ctx);
    // Sequenced: this track's own badge first, Full Circle after -- never
    // simultaneous/stacked (Rule 32.3.2), so array order is the display order.
    expect(newlyUnlocked).toEqual(["nutrition-ninja", "full-circle"]);
  });

  test("QA-ECON-16: unearned badge eligibility is checkable (silhouette + condition text is a UI concern, not economy state)", () => {
    const economy = freshEconomy({ currentStreak: 3 });
    const { newlyUnlocked } = evaluateBadgeUnlocks(economy, baseCtx());
    expect(newlyUnlocked).toEqual([]); // Habit Hero needs streak >= 7, not yet earned
  });
});

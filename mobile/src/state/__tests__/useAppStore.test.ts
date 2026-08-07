/**
 * Integration test: the full Track 1 completion path through the real
 * store (economy engine + progress tracking + badge evaluation wired
 * together), now that all 10 lessons are authored and reachable.
 */
import { useAppStore } from "../useAppStore";
import { TRACK1_LESSON_SUMMARIES } from "../../content/track1";
import { TRACK2_LESSON_SUMMARIES } from "../../content/track2";

function resetStore() {
  useAppStore.setState({
    economy: {
      userId: "local-user",
      xpTotal: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStreakIncrementDate: null,
      streakFreezesAvailable: 2,
      heartsCurrent: 5,
      heartsLastRegenAt: new Date().toISOString(),
      badgesEarned: [],
      lastDailyBonusDate: null,
      perfectFirstAttemptCount: 0,
    },
    progressByLessonId: {},
    certificationInterestByTrackId: {},
    pendingStreakEvent: "none",
  });
}

describe("useAppStore -- full Track 1 completion path", () => {
  beforeEach(() => resetStore());

  test("completing all 10 lessons unlocks Myth Crusher and awards XP for each", () => {
    let lastOutcome;
    for (const summary of TRACK1_LESSON_SUMMARIES) {
      useAppStore.getState().startLesson(summary.id);
      // Answer every question correctly-enough to finish the lesson (one
      // answer is sufficient to exercise the completion path; perfect-run
      // bonus correctness is already covered by the economy unit tests).
      useAppStore.getState().recordQuizAnswer(summary.id, "q1", 0, true, false);
      lastOutcome = useAppStore.getState().completeLesson(summary.id, { isReplay: false });
    }

    const state = useAppStore.getState();
    expect(state.progressByLessonId["track-1-lesson-10"].status).toBe("completed");
    expect(state.economy.badgesEarned.map((b) => b.badgeId)).toContain("myth-crusher");
    expect(lastOutcome?.newlyUnlockedBadges).toContain("myth-crusher");
    expect(state.economy.xpTotal).toBeGreaterThan(0);
  });

  test("replaying a completed lesson does not re-award XP or duplicate the badge", () => {
    for (const summary of TRACK1_LESSON_SUMMARIES) {
      useAppStore.getState().startLesson(summary.id);
      useAppStore.getState().recordQuizAnswer(summary.id, "q1", 0, true, false);
      useAppStore.getState().completeLesson(summary.id, { isReplay: false });
    }
    const xpAfterFirstPass = useAppStore.getState().economy.xpTotal;
    const badgeCountAfterFirstPass = useAppStore.getState().economy.badgesEarned.length;

    useAppStore.getState().startLesson("track-1-lesson-1");
    useAppStore.getState().recordQuizAnswer("track-1-lesson-1", "q1", 0, true, true);
    const replayOutcome = useAppStore.getState().completeLesson("track-1-lesson-1", { isReplay: true });

    expect(replayOutcome.xpAwarded).toBe(0);
    expect(useAppStore.getState().economy.xpTotal).toBe(xpAfterFirstPass);
    expect(useAppStore.getState().economy.badgesEarned.length).toBe(badgeCountAfterFirstPass);
  });
});

describe("useAppStore -- Track 2 completion is independent of Track 1 (generalized multi-track path)", () => {
  beforeEach(() => resetStore());

  test("completing only Track 2 unlocks Question Asker, not Myth Crusher", () => {
    for (const summary of TRACK2_LESSON_SUMMARIES) {
      useAppStore.getState().startLesson(summary.id);
      useAppStore.getState().recordQuizAnswer(summary.id, "q1", 0, true, false);
      useAppStore.getState().completeLesson(summary.id, { isReplay: false });
    }

    const badgeIds = useAppStore.getState().economy.badgesEarned.map((b) => b.badgeId);
    expect(badgeIds).toContain("question-asker");
    expect(badgeIds).not.toContain("myth-crusher");
  });

  test("completing both Track 1 and Track 2 unlocks both badges but not Full Circle", () => {
    for (const summary of [...TRACK1_LESSON_SUMMARIES, ...TRACK2_LESSON_SUMMARIES]) {
      useAppStore.getState().startLesson(summary.id);
      useAppStore.getState().recordQuizAnswer(summary.id, "q1", 0, true, false);
      useAppStore.getState().completeLesson(summary.id, { isReplay: false });
    }

    const badgeIds = useAppStore.getState().economy.badgesEarned.map((b) => b.badgeId);
    expect(badgeIds).toContain("myth-crusher");
    expect(badgeIds).toContain("question-asker");
    expect(badgeIds).not.toContain("full-circle"); // needs all 5 tracks, only 2 exist
  });
});

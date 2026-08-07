/**
 * Root app store. Wires the pure economy engine (Book IV) and Progress
 * records (Ch.53) into real, persisted state. Screens read from here and
 * call the actions below rather than touching the economy module directly,
 * so every economy mutation stays centralized and auditable.
 */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  applyLessonCompletionXP,
  consumeHeart,
  evaluateBadgeUnlocks,
  evaluateStreakRollover,
  getLocalDateString,
  HEARTS_CAP,
  incrementStreakOnCompletion,
  regenerateHearts,
  type StreakRolloverEvent,
} from "../economy/economy";
import type { BadgeId, Economy, Progress, QuizAnswerRecord, User } from "../types/models";
import { TRACK1_LESSON_CONTENT, TRACK1_META } from "../content/track1";
import { zustandMmkvStorage } from "./storage";

function freshUser(): User {
  return {
    userId: "local-user", // Phase 1 vertical slice: single on-device user, no auth wired yet (Ch.12 SS12.3 is the next screen this build order reaches, not this pass -- see Ch.68 step 2/3 sequencing).
    email: "",
    createdAt: new Date().toISOString(),
    soundEnabled: true,
    hapticsEnabled: true,
  };
}

function freshEconomy(userId: string): Economy {
  const now = new Date().toISOString();
  return {
    userId,
    xpTotal: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStreakIncrementDate: null,
    streakFreezesAvailable: 2, // Rule 31.3.1: every user holds up to 2 at Phase 1 launch
    heartsCurrent: HEARTS_CAP,
    heartsLastRegenAt: now,
    badgesEarned: [],
    lastDailyBonusDate: null,
    perfectFirstAttemptCount: 0,
  };
}

interface LessonCompletionOutcome {
  xpAwarded: number;
  newlyUnlockedBadges: BadgeId[];
  streakAfter: number;
}

interface AppState {
  user: User;
  economy: Economy;
  progressByLessonId: Record<string, Progress>;
  /** Ch.17 SS17.2: logs interest only, never implies an existing
   * credential. Keyed by trackId -> ISO timestamp of when interest was
   * expressed. Full server-side CertificationInterest sync is a Book VIII
   * backend concern (Ch.68 step 8); this pass persists it locally so the
   * "you're on the list" state survives app reopen. */
  certificationInterestByTrackId: Record<string, string>;
  /** Ch.31 SS31.5: banner shown at most once per local day -- session/UI
   * bookkeeping, deliberately not part of the pure economy module. */
  streakRiskBannerShownDate: string | null;
  /** Set by hydrate() when the daily rollover check (Rule 31.3.2) just
   * consumed a freeze or reset the streak, so Home can surface Buggy's
   * required distinct acknowledgment (Ch.31 SS31.4) on next open. Cleared
   * once shown -- this must fire exactly once per event, not persist. */
  pendingStreakEvent: StreakRolloverEvent;

  hydrate: () => void;
  acknowledgeStreakEvent: () => void;
  startLesson: (lessonId: string) => void;
  recordQuizAnswer: (lessonId: string, questionId: string, selectedOptionIndex: number, wasCorrect: boolean, isReplay: boolean) => void;
  completeLesson: (lessonId: string, opts: { isReplay: boolean }) => LessonCompletionOutcome;
  expressCertificationInterest: (trackId: string) => void;
  hasExpressedCertificationInterest: (trackId: string) => boolean;
  dismissStreakRiskBannerForToday: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
}

function isTrack1Complete(progressByLessonId: Record<string, Progress>): boolean {
  const ids = Object.keys(TRACK1_LESSON_CONTENT).length === 10
    ? Object.keys(TRACK1_LESSON_CONTENT)
    : Array.from({ length: TRACK1_META.totalLessons }, (_, i) => `track-1-lesson-${i + 1}`);
  return ids.every((id) => progressByLessonId[id]?.status === "completed");
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: freshUser(),
      economy: freshEconomy("local-user"),
      progressByLessonId: {},
      certificationInterestByTrackId: {},
      streakRiskBannerShownDate: null,
      pendingStreakEvent: "none",

      hydrate: () => {
        // Runs the once-per-day rollover (Rule 31.3.2) and heart
        // regeneration (Rule 30.4.1) against real wall-clock time on every
        // app foreground -- called from the root navigator on mount.
        const now = new Date();
        const today = getLocalDateString(now);
        const yesterday = getLocalDateString(new Date(now.getTime() - 24 * 60 * 60 * 1000));

        set((state) => {
          let economy = regenerateHearts(state.economy, now);
          const rollover = evaluateStreakRollover(economy, today, yesterday);
          economy = rollover.economy;
          return {
            economy,
            // Don't clobber an event still awaiting acknowledgment from an
            // earlier hydrate() this session with "none" on a later one.
            pendingStreakEvent: rollover.event !== "none" ? rollover.event : state.pendingStreakEvent,
          };
        });
      },

      acknowledgeStreakEvent: () => set({ pendingStreakEvent: "none" }),

      startLesson: (lessonId) => {
        set((state) => {
          const existing = state.progressByLessonId[lessonId];
          if (existing && existing.status !== "not_started") return state;
          const progress: Progress = {
            userId: state.user.userId,
            lessonId,
            status: "in_progress",
            currentQuestionIndex: 0,
            firstCompletedAt: null,
            lastReplayedAt: null,
            quizAnswers: [],
          };
          return { progressByLessonId: { ...state.progressByLessonId, [lessonId]: progress } };
        });
      },

      recordQuizAnswer: (lessonId, questionId, selectedOptionIndex, wasCorrect, isReplay) => {
        set((state) => {
          const existing = state.progressByLessonId[lessonId];
          if (!existing) return state;
          const answer: QuizAnswerRecord = {
            questionId,
            selectedOptionIndex,
            wasCorrect,
            answeredAt: new Date().toISOString(),
          };
          const progress: Progress = {
            ...existing,
            currentQuestionIndex: (existing.currentQuestionIndex ?? 0) + 1,
            quizAnswers: [...existing.quizAnswers, answer],
          };
          // Ch.30 SS30.3: one heart per incorrect answer. Ch.16 SS16.5:
          // replays never consume hearts.
          const economy = !wasCorrect && !isReplay ? consumeHeart(state.economy) : state.economy;
          return {
            progressByLessonId: { ...state.progressByLessonId, [lessonId]: progress },
            economy,
          };
        });
      },

      completeLesson: (lessonId, opts) => {
        const state = get();
        const existing = state.progressByLessonId[lessonId];
        const isFirstCompletion = !opts.isReplay && existing?.status !== "completed";
        const now = new Date();
        const today = getLocalDateString(now);

        const lessonNumber = TRACK1_LESSON_CONTENT[lessonId]?.lessonNumber ?? 0;
        const isMixedReviewLesson = lessonNumber === 10;
        const totalQuestions = existing?.quizAnswers.length ?? 0;
        const correctCount = existing?.quizAnswers.filter((a) => a.wasCorrect).length ?? 0;
        const isPerfectFirstAttempt = isFirstCompletion && totalQuestions > 0 && correctCount === totalQuestions;

        // Will this completion finish the whole track (all 10) for the first time?
        const progressAfterThis: Record<string, Progress> = {
          ...state.progressByLessonId,
          [lessonId]: {
            ...(existing as Progress),
            status: "completed",
            firstCompletedAt: isFirstCompletion ? now.toISOString() : existing?.firstCompletedAt ?? null,
            lastReplayedAt: opts.isReplay ? now.toISOString() : existing?.lastReplayedAt ?? null,
          },
        };
        const trackJustCompleted = isFirstCompletion && isTrack1Complete(progressAfterThis);

        const { economy: economyAfterXp, xpAwarded } = applyLessonCompletionXP(state.economy, {
          isFirstCompletion,
          isMixedReviewLesson,
          isPerfectFirstAttempt,
          isTrackCompletingEvent: trackJustCompleted,
          today,
        });

        const economyAfterStreak = isFirstCompletion
          ? incrementStreakOnCompletion(economyAfterXp, today)
          : economyAfterXp;

        const { economy: economyAfterBadges, newlyUnlocked } = evaluateBadgeUnlocks(economyAfterStreak, {
          trackComplete: {
            "track-1-hiv-stigma": trackJustCompleted || isTrack1Complete(progressAfterThis),
            "track-2-srh": false,
            "track-3-mental-health": false,
            "track-4-stis": false,
            "track-5-chronic": false,
          },
          now,
        });

        set({
          progressByLessonId: progressAfterThis,
          economy: economyAfterBadges,
        });

        return {
          xpAwarded,
          newlyUnlockedBadges: newlyUnlocked,
          streakAfter: economyAfterBadges.currentStreak,
        };
      },

      expressCertificationInterest: (trackId) => {
        set((state) => {
          if (state.certificationInterestByTrackId[trackId]) return state; // already logged, idempotent
          return {
            certificationInterestByTrackId: {
              ...state.certificationInterestByTrackId,
              [trackId]: new Date().toISOString(),
            },
          };
        });
      },

      hasExpressedCertificationInterest: (trackId) => Boolean(get().certificationInterestByTrackId[trackId]),

      dismissStreakRiskBannerForToday: () => {
        set({ streakRiskBannerShownDate: getLocalDateString(new Date()) });
      },

      setSoundEnabled: (enabled) => {
        set((state) => ({ user: { ...state.user, soundEnabled: enabled } }));
      },

      setHapticsEnabled: (enabled) => {
        set((state) => ({ user: { ...state.user, hapticsEnabled: enabled } }));
      },
    }),
    {
      name: "saabi-app-state-v1",
      storage: createJSONStorage(() => zustandMmkvStorage),
    }
  )
);

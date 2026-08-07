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
import { findLessonById, isTrackComplete } from "../content/allTracks";
import { fireSoundEvent } from "../audio/soundSpec";
import { mmkv, zustandMmkvStorage } from "./storage";

function freshUser(): User {
  return {
    // Phase 1: a single on-device profile, no real backend account system
    // (Book VIII not built) -- signUp()/logIn() below manage this one
    // local profile's email/session state rather than talking to a
    // server, per Ch.12 SS12.3's fields but honestly scoped to what a
    // local-only app can actually do (see those actions' own comments).
    userId: "local-user",
    email: "",
    createdAt: new Date().toISOString(),
    soundEnabled: true,
    hapticsEnabled: true,
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  /** Ch.12 SS12.2: onboarding shown once, ever, on this device. */
  hasSeenOnboarding: boolean;
  /** Ch.12 SS12.3 / Ch.19 SS19.2: whether the local profile is currently
   * "logged in." Distinct from whether a profile exists at all (`user.
   * email !== ""`) -- signOut() clears this without touching progress/
   * economy data, so logging back in with the same email picks up
   * exactly where the user left off, same as any real session model. */
  sessionActive: boolean;

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
  /** Rule 33.2.1: single daily reminder time, user's own choice. Pass null
   * to turn reminders off. */
  setReminderTime: (time: string | null) => void;
  /** Ch.1 SS1.7 / Ch.19 SS19.2: account deletion must fully purge data,
   * with any analytics-retention exception disclosed plainly. This build
   * has no backend/analytics pipeline (Book VIII not built yet), so there
   * is no exception to disclose -- the on-device MMKV store is the only
   * copy of this data anywhere, so wiping it here is a genuine full purge,
   * not a partial local reset with a server-side copy left behind. */
  deleteAccount: () => void;

  completeOnboarding: () => void;
  /** Ch.12 SS12.3. This device supports exactly one local profile (Book
   * VIII's real multi-account backend isn't built) -- signing up creates
   * or re-enters that one profile. The password field exists for UI/
   * validation fidelity to the spec's field list but is deliberately
   * never persisted anywhere: there's no secure credential storage or
   * hashing in this build (Book VIII SS55.1), so storing it would be a
   * real security anti-pattern, not a shortcut worth taking even locally. */
  signUp: (input: { email: string; password: string; displayName?: string; age?: number }) => { ok: boolean; error?: string };
  logIn: (input: { email: string; password: string }) => { ok: boolean; error?: string };
  /** Ch.19 SS19.2. Ends the session without touching progress/economy
   * data -- logging back in with the same email resumes exactly where
   * the user left off. (Distinct from deleteAccount(), which purges
   * everything.) */
  signOut: () => void;
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
      hasSeenOnboarding: false,
      sessionActive: false,

      hydrate: () => {
        // Runs the once-per-day rollover (Rule 31.3.2) and heart
        // regeneration (Rule 30.4.1) against real wall-clock time on every
        // app foreground -- called from the root navigator on mount.
        const now = new Date();
        const today = getLocalDateString(now);
        const yesterday = getLocalDateString(new Date(now.getTime() - 24 * 60 * 60 * 1000));
        const hapticsEnabled = get().user.hapticsEnabled;

        set((state) => {
          let economy = regenerateHearts(state.economy, now);
          const rollover = evaluateStreakRollover(economy, today, yesterday);
          economy = rollover.economy;
          // Ch.48.1: streak-freeze-consumed gets its own distinct haptic
          // (a "Success" pulse, matching the frost-chime's distinct
          // timbre); a reset deliberately gets none -- see soundSpec.ts.
          if (rollover.event === "frozen") {
            fireSoundEvent("streakFreezeConsumed", hapticsEnabled);
          }
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
        // Ch.48.1: correct/incorrect each get their own distinct haptic
        // pairing, fired the moment the answer is confirmed (matching the
        // Ch.42.3 animation's own "simultaneous with animation start, not
        // after" requirement).
        fireSoundEvent(wasCorrect ? "correctAnswer" : "incorrectAnswer", get().user.hapticsEnabled);
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

        const found = findLessonById(lessonId);
        const isMixedReviewLesson = found?.lesson.lessonNumber === 10;
        const totalQuestions = existing?.quizAnswers.length ?? 0;
        const correctCount = existing?.quizAnswers.filter((a) => a.wasCorrect).length ?? 0;
        const isPerfectFirstAttempt = isFirstCompletion && totalQuestions > 0 && correctCount === totalQuestions;

        const progressAfterThis: Record<string, Progress> = {
          ...state.progressByLessonId,
          [lessonId]: {
            ...(existing as Progress),
            status: "completed",
            firstCompletedAt: isFirstCompletion ? now.toISOString() : existing?.firstCompletedAt ?? null,
            lastReplayedAt: opts.isReplay ? now.toISOString() : existing?.lastReplayedAt ?? null,
          },
        };
        const trackJustCompleted =
          isFirstCompletion && found !== null && isTrackComplete(found.trackId, progressAfterThis);

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

        if (economyAfterStreak.currentStreak > state.economy.currentStreak) {
          fireSoundEvent("streakIncrement", state.user.hapticsEnabled); // Ch.43.1 / Ch.48.1
        }

        // Evaluate every authored track's completion state generically --
        // not just the one the just-completed lesson belongs to, since a
        // future lesson could complete a track other than the "current" one.
        const { economy: economyAfterBadges, newlyUnlocked } = evaluateBadgeUnlocks(economyAfterStreak, {
          trackComplete: {
            "track-1-hiv-stigma": isTrackComplete("track-1-hiv-stigma", progressAfterThis),
            "track-2-srh": isTrackComplete("track-2-srh", progressAfterThis),
            "track-3-mental-health": isTrackComplete("track-3-mental-health", progressAfterThis),
            "track-4-stis": isTrackComplete("track-4-stis", progressAfterThis),
            "track-5-chronic": isTrackComplete("track-5-chronic", progressAfterThis),
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

      setReminderTime: (time) => {
        set((state) => ({ user: { ...state.user, notificationReminderTime: time ?? undefined } }));
      },

      deleteAccount: () => {
        mmkv.clearAll(); // wipe the underlying store, not just this session's in-memory state
        set({
          user: freshUser(),
          economy: freshEconomy("local-user"),
          progressByLessonId: {},
          certificationInterestByTrackId: {},
          streakRiskBannerShownDate: null,
          pendingStreakEvent: "none",
          hasSeenOnboarding: false,
          sessionActive: false,
        });
      },

      completeOnboarding: () => set({ hasSeenOnboarding: true }),

      signUp: ({ email, password, displayName, age }) => {
        if (!EMAIL_RE.test(email)) return { ok: false, error: "That email address doesn't look right." };
        if (password.length < 6) return { ok: false, error: "Password needs to be at least 6 characters." };

        const state = get();
        if (state.user.email && state.user.email !== email) {
          return { ok: false, error: "This device already has an account signed in. Log out first, or log in with that email." };
        }
        if (state.user.email === email) {
          return { ok: false, error: "An account with this email already exists on this device — log in instead." };
        }

        set((s) => ({
          user: { ...s.user, email, displayName: displayName || undefined, age },
          sessionActive: true,
        }));
        return { ok: true };
      },

      logIn: ({ email, password }) => {
        if (!EMAIL_RE.test(email)) return { ok: false, error: "That email address doesn't look right." };
        if (password.length < 1) return { ok: false, error: "Enter your password." };

        const state = get();
        if (!state.user.email) {
          return { ok: false, error: "No account found on this device yet — sign up first." };
        }
        if (state.user.email !== email) {
          return { ok: false, error: "No account found with that email on this device." };
        }
        // Phase 1 note (Book VIII SS55.1 gap, flagged): password isn't
        // actually verified against anything stored, since nothing is
        // stored -- see signUp()'s comment. The email match is the whole
        // check this local-only build can honestly perform.
        set({ sessionActive: true });
        return { ok: true };
      },

      signOut: () => set({ sessionActive: false }),
    }),
    {
      name: "saabi-app-state-v1",
      storage: createJSONStorage(() => zustandMmkvStorage),
    }
  )
);

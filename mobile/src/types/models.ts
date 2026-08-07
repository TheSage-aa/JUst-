/**
 * Core data model -- Saabi Bible Ch.53 SS53.1, transcribed field-for-field.
 *
 * Rule 53.2.1 (structural separation): Progress/Economy must never be
 * stored inline within Content records. Content is a fully separate type
 * tree (see content.ts) so it can be versioned/patched independently
 * without any risk to a user's progress history.
 *
 * HARD RULE (Ch.1 SS1.7.1, Non-Negotiable #1): no field on User may store
 * health status, symptoms, or diagnosis. Do not add one without an
 * explicit, chapter-referenced authorization recorded in this comment
 * block first.
 */

import type { TrackId } from "../design/tokens";

export interface User {
  userId: string;
  email: string;
  displayName?: string;
  /** Numeric only, collected for age-gating (13+/platform policy) -- never
   * framed adjacent to health-risk language (Ch.12 SS12.3). */
  age?: number;
  createdAt: string; // ISO 8601
  notificationReminderTime?: string; // "HH:mm", user's own chosen single daily time (Rule 33.2.1)
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}

export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface QuizAnswerRecord {
  questionId: string;
  selectedOptionIndex: number;
  wasCorrect: boolean;
  answeredAt: string; // ISO 8601
}

export interface Progress {
  userId: string;
  lessonId: string;
  status: LessonStatus;
  /** Nullable; supports mid-quiz resume per Rule 11.3.1. */
  currentQuestionIndex: number | null;
  firstCompletedAt: string | null;
  lastReplayedAt: string | null;
  quizAnswers: QuizAnswerRecord[];
}

export interface BadgeAward {
  badgeId: BadgeId;
  earnedAt: string; // ISO 8601
}

export interface Economy {
  userId: string;
  xpTotal: number;
  currentStreak: number;
  longestStreak: number;
  /** Local calendar date (YYYY-MM-DD) the streak was last incremented, per Rule 31.1. */
  lastStreakIncrementDate: string | null;
  streakFreezesAvailable: number;
  heartsCurrent: number;
  heartsLastRegenAt: string; // ISO 8601
  badgesEarned: BadgeAward[];
  /** Not in the Bible's literal schema block, but required to enforce
   * Rule 29.2's "once per calendar day" daily-first-lesson bonus and
   * Rule 32.2's cumulative "Myth-Free Zone" (5x) badge condition without
   * re-deriving them from the full quiz-answer history on every check.
   * Flagged per Ch.67 SS67.3 (Bible gap, precedence-consistent addition):
   * this is bookkeeping for economy rules the Bible already specifies
   * exactly, not a new rule of its own. */
  lastDailyBonusDate: string | null;
  perfectFirstAttemptCount: number;
}

export interface CertificationInterest {
  userId: string;
  trackId: TrackId;
  expressedAt: string; // ISO 8601 -- Ch.17 SS17.2: logs interest only, never implies an existing credential
}

export type BadgeId =
  | "myth-crusher" // Track 1 complete
  | "question-asker" // Track 2 complete
  | "quiet-strength" // Track 3 complete
  | "clarity-seeker" // Track 4 complete
  | "nutrition-ninja" // Track 5 complete
  | "habit-hero" // 7-day streak
  | "myth-free-zone" // 5x 100% first-attempt lesson quizzes, cumulative
  | "full-circle"; // all 5 tracks complete

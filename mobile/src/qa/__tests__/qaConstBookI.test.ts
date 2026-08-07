/**
 * Book IX Ch.59's remaining Class A constitutional-scan test cases that
 * aren't already covered by the per-lesson compliance suite
 * (lessonComplianceSuite.ts runs QA-CONST-01/03/04/05 across all 50
 * lessons). This file covers the two that scan app-level artifacts
 * instead of lesson content: the data schema (QA-CONST-02) and the
 * screens where Phase 1 completion is celebrated (QA-CONST-08).
 */
import * as fs from "fs";
import * as path from "path";
import type { BadgeAward, CertificationInterest, Economy, Progress, User } from "../../types/models";

// Heuristic denylist for field names that would violate Non-Negotiable #1
// (no field may store the *user's* health status, symptoms, or diagnosis).
// Matches on whole-ish tokens so it doesn't false-positive on unrelated
// words that merely contain a substring (e.g. "status" alone is too broad
// -- "lessonStatus"/"connectionStatus" are legitimate, so this requires
// the health-specific qualifier to be present too).
const FORBIDDEN_FIELD_PATTERN = /(health.?status|diagnos(is|ed)|symptom)/i;

function fieldNamesOf(obj: object): string[] {
  return Object.keys(obj);
}

describe("QA-CONST-02: no health-status/symptom/diagnosis field exists on any persisted model (Ch.1 SS1.7.1, Non-Negotiable #1)", () => {
  test("User", () => {
    const sample: User = {
      userId: "x",
      email: "a@b.com",
      createdAt: new Date().toISOString(),
      soundEnabled: true,
      hapticsEnabled: true,
    };
    for (const key of fieldNamesOf(sample)) {
      expect(key).not.toMatch(FORBIDDEN_FIELD_PATTERN);
    }
  });

  test("Progress", () => {
    const sample: Progress = {
      userId: "x",
      lessonId: "y",
      status: "not_started",
      currentQuestionIndex: null,
      firstCompletedAt: null,
      lastReplayedAt: null,
      quizAnswers: [],
    };
    for (const key of fieldNamesOf(sample)) {
      expect(key).not.toMatch(FORBIDDEN_FIELD_PATTERN);
    }
  });

  test("Economy and BadgeAward", () => {
    const sample: Economy = {
      userId: "x",
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
    };
    const award: BadgeAward = { badgeId: "myth-crusher", earnedAt: new Date().toISOString() };
    for (const key of [...fieldNamesOf(sample), ...fieldNamesOf(award)]) {
      expect(key).not.toMatch(FORBIDDEN_FIELD_PATTERN);
    }
  });

  test("CertificationInterest", () => {
    const sample: CertificationInterest = {
      userId: "x",
      trackId: "track-1-hiv-stigma",
      expressedAt: new Date().toISOString(),
    };
    for (const key of fieldNamesOf(sample)) {
      expect(key).not.toMatch(FORBIDDEN_FIELD_PATTERN);
    }
  });
});

describe("QA-CONST-08: no certification-overclaim language anywhere Phase 1 completion is celebrated (Ch.2 SS2.4, Non-Negotiable #14)", () => {
  // Static source scan rather than a rendered-copy scan: catches the
  // requirement at the point new copy is written, not just what happens
  // to be on screen for one particular app state during a test run.
  const FORBIDDEN_CLAIM_PATTERN = /\b(certified|accredited|official credential)\b/i;
  const screensToScan = ["LessonCompleteScreen.tsx", "ProfileScreen.tsx", "TrackDetailScreen.tsx"];

  test.each(screensToScan)("%s contains no certification-overclaim language", (filename) => {
    const filePath = path.join(__dirname, "../../screens", filename);
    const source = fs.readFileSync(filePath, "utf-8");
    expect(source).not.toMatch(FORBIDDEN_CLAIM_PATTERN);
  });

  test("certification-interest copy is unambiguously an expression of interest, not an application or existing credential", () => {
    const filePath = path.join(__dirname, "../../screens/LessonCompleteScreen.tsx");
    const source = fs.readFileSync(filePath, "utf-8");
    // Ch.17 SS17.2's own example phrasing -- asserts the actual shipped
    // copy still matches the Bible's sanctioned wording, not just that it
    // avoids the forbidden words above.
    expect(source).toMatch(/let (you|us) know if\/when a real certification becomes available/i);
  });
});

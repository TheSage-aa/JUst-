/**
 * Shared Jest suite: runs Ch.39 SS39.3 mechanical validation + Book IX
 * Ch.59.1's Class A constitutional-scan test cases (QA-CONST-01/03/04/05,
 * mechanically expanded across every lesson passed in, per Ch.58.1's own
 * "expand across all 50 lessons" instruction) across an arbitrary set of
 * lessons. Factored out here so every track's test file (track1, track2,
 * ...) asserts the same rules instead of re-implementing them -- see
 * track1/__tests__/allLessons.test.ts for the original, single-track
 * version this was extracted from.
 */
import { validateLesson, type Lesson } from "../../types/content";

export function runLessonComplianceSuite(lessons: Lesson[]) {
  describe.each(lessons.map((l) => [l.id, l] as const))("%s -- Ch.39 SS39.3 mechanical validation", (_id, lesson) => {
    test("passes every mechanical validation rule with zero errors", () => {
      expect(validateLesson(lesson)).toEqual([]);
    });

    test("QA-CONST-03: total beat word count is within the 150-word ceiling (Ch.5 SS5.1)", () => {
      const total = lesson.beats.reduce((sum, b) => sum + (b.text.match(/\S+/g) || []).length, 0);
      expect(total).toBeLessThanOrEqual(150);
    });

    test("has 3-5 quiz questions (Ch.5 SS5.2)", () => {
      expect(lesson.quiz.questions.length).toBeGreaterThanOrEqual(3);
      expect(lesson.quiz.questions.length).toBeLessThanOrEqual(5);
    });

    test("Bello's BREAK beats (if any) are immediately after a FACT beat, never after MYTH, never immediately before CLOSE (Rule 35.2.2)", () => {
      lesson.beats.forEach((beat, idx) => {
        if (beat.speaker !== "bello") return;
        expect(lesson.beats[idx - 1]?.function).toBe("FACT");
        expect(idx).not.toBe(lesson.beats.length - 2);
      });
    });

    test("Buggy's interjections (if any) are immediately after HOOK (Rule 35.2.3)", () => {
      lesson.beats.forEach((beat, idx) => {
        if (beat.speaker !== "buggy") return;
        expect(lesson.beats[idx - 1]?.function).toBe("HOOK");
      });
    });

    test("QA-CONST-01: no beat or quiz feedback text uses second-person myth attribution ('you thought'/'you probably')", () => {
      const allText = [
        ...lesson.beats.map((b) => b.text),
        ...lesson.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback, q.prompt]),
      ]
        .join(" \n ")
        .toLowerCase();
      expect(allText).not.toMatch(/you (probably|thought|believed)/);
    });

    test("QA-CONST-04: no second-person clinical directive ('you should'/'you need to')", () => {
      const allText = [
        ...lesson.beats.map((b) => b.text),
        ...lesson.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback]),
      ]
        .join(" \n ")
        .toLowerCase();
      expect(allText).not.toMatch(/you (should|need to)/);
    });

    test("QA-CONST-05: every incorrect-answer feedback restates the fact in full (non-trivial length, not just 'wrong')", () => {
      for (const q of lesson.quiz.questions) {
        expect(q.incorrectFeedback.split(/\s+/).length).toBeGreaterThan(8);
      }
    });

    test("Bello, when present, never delivers the lesson's core MYTH/FACT content (Ch.27 SS27.4)", () => {
      lesson.beats.forEach((beat) => {
        if (beat.speaker === "bello") {
          expect(beat.function).not.toBe("MYTH");
          expect(beat.function).not.toBe("FACT");
        }
      });
    });

    test("no field/prompt asks the user to disclose their own health status or personal experience (Non-Negotiable #1)", () => {
      const allText = [lesson.beats.map((b) => b.text).join(" "), lesson.quiz.questions.map((q) => q.prompt).join(" ")]
        .join(" \n ")
        .toLowerCase();
      // Heuristic scan for a personal-disclosure question pattern ("have you
      // ever...", "do you have...") -- catches the specific failure mode
      // Ch.1 SS1.7.2 warns a quiz UI can accidentally invite.
      expect(allText).not.toMatch(/have you (ever )?(had|experienced|been)/);
      expect(allText).not.toMatch(/do you have/);
    });
  });
}

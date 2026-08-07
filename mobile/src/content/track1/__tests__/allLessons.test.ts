import { validateLesson } from "../../../types/content";
import { TRACK1_LESSON_CONTENT, TRACK1_LESSON_SUMMARIES } from "../index";

const lessons = Object.values(TRACK1_LESSON_CONTENT);

describe("Track 1 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK1_LESSON_SUMMARIES) {
      expect(TRACK1_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK1_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

describe.each(lessons.map((l) => [l.id, l] as const))("%s -- Ch.39 SS39.3 mechanical validation", (id, lesson) => {
  test("passes every mechanical validation rule with zero errors", () => {
    expect(validateLesson(lesson)).toEqual([]);
  });

  test("total beat word count is within the 150-word ceiling (Ch.5 SS5.1)", () => {
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
      expect(idx).not.toBe(lesson.beats.length - 2); // not immediately before the final (CLOSE) beat
    });
  });

  test("Buggy's interjections (if any) are immediately after HOOK (Rule 35.2.3)", () => {
    lesson.beats.forEach((beat, idx) => {
      if (beat.speaker !== "buggy") return;
      expect(lesson.beats[idx - 1]?.function).toBe("HOOK");
    });
  });

  test("no beat or quiz feedback text uses second-person myth attribution ('you thought'/'you probably')", () => {
    const allText = [
      ...lesson.beats.map((b) => b.text),
      ...lesson.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback, q.prompt]),
    ]
      .join(" \n ")
      .toLowerCase();
    expect(allText).not.toMatch(/you (probably|thought|believed)/);
  });

  test("no second-person clinical directive ('you should'/'you need to')", () => {
    const allText = [
      ...lesson.beats.map((b) => b.text),
      ...lesson.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback]),
    ]
      .join(" \n ")
      .toLowerCase();
    expect(allText).not.toMatch(/you (should|need to)/);
  });

  test("every incorrect-answer feedback restates the fact in full (non-trivial length, not just 'wrong')", () => {
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
});

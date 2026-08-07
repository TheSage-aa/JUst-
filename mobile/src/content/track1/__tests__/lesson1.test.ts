import { validateLesson } from "../../../types/content";
import { track1Lesson1 } from "../lesson1";

describe("Track 1 Lesson 1 -- Ch.39 SS39.3 mechanical validation", () => {
  test("passes every mechanical validation rule with zero errors", () => {
    const errors = validateLesson(track1Lesson1);
    expect(errors).toEqual([]);
  });

  test("total beat word count is within the 150-word ceiling (Ch.5 SS5.1)", () => {
    const total = track1Lesson1.beats.reduce((sum, b) => sum + (b.text.match(/\S+/g) || []).length, 0);
    expect(total).toBeLessThanOrEqual(150);
  });

  test("has 3-5 quiz questions (Ch.5 SS5.2)", () => {
    expect(track1Lesson1.quiz.questions.length).toBeGreaterThanOrEqual(3);
    expect(track1Lesson1.quiz.questions.length).toBeLessThanOrEqual(5);
  });

  test("Bello's BREAK beat is immediately after a FACT beat, never after MYTH, never immediately before CLOSE (Rule 35.2.2)", () => {
    const idx = track1Lesson1.beats.findIndex((b) => b.speaker === "bello");
    expect(idx).toBeGreaterThan(0);
    expect(track1Lesson1.beats[idx - 1].function).toBe("FACT");
    expect(track1Lesson1.beats[idx + 1].function).not.toBe(undefined); // not the last beat
    expect(idx + 1).not.toBe(track1Lesson1.beats.length - 1 + 1); // not immediately before the final (CLOSE) index in a way that makes it last-but-one incorrectly -- see next assertion for the real check
    expect(track1Lesson1.beats[track1Lesson1.beats.length - 1].function).toBe("CLOSE");
    expect(idx).not.toBe(track1Lesson1.beats.length - 2); // not immediately before CLOSE
  });

  test("Buggy's interjection is immediately after HOOK (Rule 35.2.3)", () => {
    const buggyIdx = track1Lesson1.beats.findIndex((b) => b.speaker === "buggy");
    expect(track1Lesson1.beats[buggyIdx - 1].function).toBe("HOOK");
  });

  test("no beat or quiz feedback text uses second-person myth attribution ('you thought'/'you probably')", () => {
    const allText = [
      ...track1Lesson1.beats.map((b) => b.text),
      ...track1Lesson1.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback, q.prompt]),
    ].join(" \n ").toLowerCase();
    expect(allText).not.toMatch(/you (probably|thought|believed)/);
  });

  test("no second-person clinical directive ('you should'/'you need to')", () => {
    const allText = [
      ...track1Lesson1.beats.map((b) => b.text),
      ...track1Lesson1.quiz.questions.flatMap((q) => [q.correctFeedback, q.incorrectFeedback]),
    ].join(" \n ").toLowerCase();
    expect(allText).not.toMatch(/you (should|need to)/);
  });

  test("every incorrect-answer feedback restates the fact in full (non-trivial length, not just 'wrong')", () => {
    for (const q of track1Lesson1.quiz.questions) {
      expect(q.incorrectFeedback.split(/\s+/).length).toBeGreaterThan(8);
    }
  });
});

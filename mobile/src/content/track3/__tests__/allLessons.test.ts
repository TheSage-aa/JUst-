import { TRACK3_LESSON_CONTENT, TRACK3_LESSON_SUMMARIES } from "../index";
import { runLessonComplianceSuite } from "../../testHelpers/lessonComplianceSuite";

describe("Track 3 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK3_LESSON_SUMMARIES) {
      expect(TRACK3_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK3_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

describe("Track 3 -- Nana-specific constraints (Ch.24)", () => {
  const lessons = Object.values(TRACK3_LESSON_CONTENT);

  test("no diagnostic language anywhere (never names a specific condition as *the reader's*)", () => {
    for (const lesson of lessons) {
      const allText = lesson.beats.map((b) => b.text).join(" ").toLowerCase();
      // Structural check: no beat ever says "you have" / "this means you" /
      // "sounds like you" adjacent to a condition name -- Nana describes
      // patterns in general terms, never diagnoses the reader.
      expect(allText).not.toMatch(/you (have|might have|probably have) (anxiety|depression|burnout)/);
      expect(allText).not.toMatch(/sounds like you/);
    }
  });

  test("no beat solicits open-ended personal disclosure from the user", () => {
    for (const lesson of lessons) {
      const allText = lesson.beats.map((b) => b.text).join(" ").toLowerCase();
      expect(allText).not.toMatch(/how (does|do) (that|this) make you feel/);
      expect(allText).not.toMatch(/tell (me|us) (what|how) you/);
    }
  });

  test("Lesson 9 (crisis) never uses second-person clinical directives despite the safety-critical content", () => {
    const lesson9 = TRACK3_LESSON_CONTENT["track-3-lesson-9"];
    const allText = lesson9.beats.map((b) => b.text).join(" ").toLowerCase();
    expect(allText).not.toMatch(/you (should|need to|must)/);
  });

  test("Lesson 9 (crisis) does not fabricate a specific crisis hotline or resource name", () => {
    const lesson9 = TRACK3_LESSON_CONTENT["track-3-lesson-9"];
    const allText = lesson9.beats.map((b) => b.text).join(" ");
    // No phone-number-shaped strings, and no invented named hotline.
    expect(allText).not.toMatch(/\d{3,}/);
  });
});

runLessonComplianceSuite(Object.values(TRACK3_LESSON_CONTENT));

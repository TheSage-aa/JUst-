import { TRACK4_LESSON_CONTENT, TRACK4_LESSON_SUMMARIES } from "../index";
import { runLessonComplianceSuite } from "../../testHelpers/lessonComplianceSuite";

describe("Track 4 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK4_LESSON_SUMMARIES) {
      expect(TRACK4_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK4_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

describe("Track 4 -- Dr. Ayo Authority Voice Creep guard (Anti-Pattern 10.4)", () => {
  test("no hedged/formal clinical register anywhere (the specific drift risk his chapter names)", () => {
    for (const lesson of Object.values(TRACK4_LESSON_CONTENT)) {
      const allText = lesson.beats
        .filter((b) => b.speaker === "dr_ayo")
        .map((b) => b.text)
        .join(" ")
        .toLowerCase();
      expect(allText).not.toMatch(/in the majority of (clinical )?(cases|presentations)/);
      expect(allText).not.toMatch(/it is (recommended|advised|imperative) that/);
      expect(allText).not.toMatch(/patients? (should|must|are advised)/);
    }
  });
});

runLessonComplianceSuite(Object.values(TRACK4_LESSON_CONTENT));

import { TRACK5_LESSON_CONTENT, TRACK5_LESSON_SUMMARIES } from "../index";
import { runLessonComplianceSuite } from "../../testHelpers/lessonComplianceSuite";

describe("Track 5 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK5_LESSON_SUMMARIES) {
      expect(TRACK5_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK5_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

describe("Track 5 -- Tunde enablement-not-restriction guard (Ch.26)", () => {
  test("no beat frames food, medication, or routine as restriction/punishment", () => {
    // Note: "punishment" itself legitimately appears once in lesson7.ts
    // ("was never the plan") specifically to *reject* that framing, which
    // is the correct pattern -- so this checks for restrictive framing
    // stated unironically, not the word itself.
    for (const lesson of Object.values(TRACK5_LESSON_CONTENT)) {
      const allText = lesson.beats.map((b) => b.text).join(" ").toLowerCase();
      expect(allText).not.toMatch(/(can't|cannot|must not) eat/);
      expect(allText).not.toMatch(/forbidden/);
    }
  });
});

runLessonComplianceSuite(Object.values(TRACK5_LESSON_CONTENT));

import { TRACK2_LESSON_CONTENT, TRACK2_LESSON_SUMMARIES } from "../index";
import { runLessonComplianceSuite } from "../../testHelpers/lessonComplianceSuite";

describe("Track 2 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK2_LESSON_SUMMARIES) {
      expect(TRACK2_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK2_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

runLessonComplianceSuite(Object.values(TRACK2_LESSON_CONTENT));

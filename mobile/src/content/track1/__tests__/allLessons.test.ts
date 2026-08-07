import { TRACK1_LESSON_CONTENT, TRACK1_LESSON_SUMMARIES } from "../index";
import { runLessonComplianceSuite } from "../../testHelpers/lessonComplianceSuite";

describe("Track 1 -- all 10 lessons authored and registered", () => {
  test("every summary has authored, playable content", () => {
    for (const summary of TRACK1_LESSON_SUMMARIES) {
      expect(TRACK1_LESSON_CONTENT[summary.id]).toBeDefined();
      expect(TRACK1_LESSON_CONTENT[summary.id].lessonNumber).toBe(summary.lessonNumber);
    }
  });
});

runLessonComplianceSuite(Object.values(TRACK1_LESSON_CONTENT));

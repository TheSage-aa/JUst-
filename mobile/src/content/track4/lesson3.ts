/**
 * Track 4, Lesson 3 -- "Syphilis, Explained". Dr. Ayo-hosted, Gist Mode.
 * 84/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson3: Lesson = {
  id: "track-4-lesson-3",
  trackId: "track-4-stis",
  lessonNumber: 3,
  mode: "gist",
  title: "Syphilis, Explained",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Syphilis has a reputation. Let's actually look at the facts.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "Because the name sounds old-fashioned, people sometimes assume it's untreatable or unusually severe.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "It's fully treatable with antibiotics, especially when it's caught in its early stages.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Old name, modern fix. It's basically vintage in the worst way.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "It does move through stages, and early symptoms can be mild enough to go unnoticed — which is exactly why testing matters, not just symptoms.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "Left untreated it can get serious — but treated, it's straightforward. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: syphilis is treatable with antibiotics.",
        options: ["True", "False"],
        correctOptionIndex: 0,
        correctFeedback: "Right — fully treatable with antibiotics.",
        incorrectFeedback: "Syphilis is fully treatable with antibiotics, especially when caught in early stages.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Are early syphilis symptoms always obvious?",
        options: ["No, they can be mild or unnoticed", "Yes, always obvious"],
        correctOptionIndex: 0,
        correctFeedback: "Right — early symptoms can be easy to miss.",
        incorrectFeedback: "Syphilis progresses through stages, and early symptoms can be mild or unnoticed.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "What can happen if syphilis goes untreated?",
        options: ["Serious long-term health complications", "Nothing significant"],
        correctOptionIndex: 0,
        correctFeedback: "Right — serious complications can develop.",
        incorrectFeedback: "Untreated syphilis can cause serious long-term health complications — another reason early testing and treatment matter.",
      },
    ],
  },
};

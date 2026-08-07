/**
 * Track 4, Lesson 2 -- "Chlamydia & Gonorrhea". Dr. Ayo-hosted, Gist Mode.
 * 75/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson2: Lesson = {
  id: "track-4-lesson-2",
  trackId: "track-4-stis",
  lessonNumber: 2,
  mode: "gist",
  title: "Chlamydia & Gonorrhea",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Chlamydia and gonorrhea — two of the most common ones. Let's get specific.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "People assume you'd always notice obvious symptoms if you had either one.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "Often you wouldn't — both frequently cause zero symptoms at all, which is exactly why regular testing matters more than waiting to feel something.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "The silent-but-testable duo, if you will.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "Good news either way: both are bacterial, and both are treatable with antibiotics.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's chlamydia and gonorrhea, plainly put. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: chlamydia and gonorrhea always cause obvious symptoms.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — often no symptoms at all.",
        incorrectFeedback: "Both frequently cause no symptoms at all, which is exactly why regular testing matters.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Are chlamydia and gonorrhea treatable?",
        options: ["Yes, with antibiotics", "No, there's no treatment"],
        correctOptionIndex: 0,
        correctFeedback: "Right — treatable with antibiotics.",
        incorrectFeedback: "Both are bacterial infections and are treatable with antibiotics.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "What can happen if chlamydia or gonorrhea go untreated?",
        options: ["More serious reproductive health complications over time", "Nothing, they resolve on their own"],
        correctOptionIndex: 0,
        correctFeedback: "Right — complications can develop over time.",
        incorrectFeedback: "Left untreated, both can lead to more serious reproductive health complications over time.",
      },
    ],
  },
};

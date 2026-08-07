/**
 * Track 1, Lesson 5 -- "Treatment Today: ART & Undetectable". Zara-hosted,
 * Gist Mode. 77/150 words.
 */
import type { Lesson } from "../../types/content";

export const track1Lesson5: Lesson = {
  id: "track-1-lesson-5",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 5,
  mode: "gist",
  title: "Treatment Today: ART & Undetectable",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Treatment today looks nothing like what people imagine.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "Some people picture HIV treatment as complicated or constant.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "It's usually just ART — antiretroviral therapy — taken daily to keep the virus controlled.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically, the virus goes quiet and stays quiet.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth2", function: "MYTH", speaker: "zara", text: "And there's a sense that the virus is always active in the body no matter what.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "With consistent treatment, HIV levels can become undetectable — suppressed below what standard tests can even measure.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth2" },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "That's treatment today, in short. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "What does ART stand for?",
        options: ["Antiretroviral Therapy", "Automatic Response Test"],
        correctOptionIndex: 0,
        correctFeedback: "Right — antiretroviral therapy.",
        incorrectFeedback: "ART stands for antiretroviral therapy — daily medication that keeps HIV controlled.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What does \"undetectable\" mean, treatment-wise?",
        options: ["The virus is suppressed below what standard tests can measure", "The virus is completely gone forever"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — suppressed below what tests can measure.",
        incorrectFeedback: "Undetectable means the virus is suppressed to the point standard tests can't measure it — not that it's gone forever.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "How often is ART typically taken?",
        options: ["Daily", "Once a year"],
        correctOptionIndex: 0,
        correctFeedback: "Right — daily.",
        incorrectFeedback: "ART is typically daily medication — a routine, not an occasional treatment.",
      },
    ],
  },
};

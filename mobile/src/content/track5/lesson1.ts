/**
 * Track 5 (Chronic Conditions), Lesson 1 -- "What Is Sickle Cell Disease?".
 * Tunde-hosted, Gist Mode. Source: docs/tracks/track-5-chronic-conditions.md.
 * 80/150 words.
 *
 * Tunde Voice Test (Ch.26 SS26.5): frames around enablement rather than
 * restriction anywhere it's relevant; no severity/complication language
 * used as a scare tactic.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson1: Lesson = {
  id: "track-5-lesson-1",
  trackId: "track-5-chronic",
  lessonNumber: 1,
  mode: "gist",
  title: "What Is Sickle Cell Disease?",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Let's start with the basics — what sickle cell disease actually is.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "Some people still wonder if it's something you can catch from someone else.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "It's not contagious at all — it's inherited, passed from parents to children through genes.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "You can't catch genetics. That's just not how any of this works.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "It's an inherited blood disorder affecting the shape and function of red blood cells — and it's especially common across West Africa.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "That's the basics, plainly laid out. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: sickle cell disease is contagious.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it's inherited, not contagious.",
        incorrectFeedback: "Sickle cell disease is not contagious at all — it's inherited, passed from parents to children through genes.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What does sickle cell disease affect?",
        options: ["The shape and function of red blood cells", "The lungs directly"],
        correctOptionIndex: 0,
        correctFeedback: "Right — red blood cells specifically.",
        incorrectFeedback: "Sickle cell disease is an inherited blood disorder affecting the shape and function of red blood cells.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Is sickle cell especially common in West Africa?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — especially prevalent there.",
        incorrectFeedback: "Sickle cell is especially prevalent in West Africa, making awareness particularly relevant.",
      },
    ],
  },
};

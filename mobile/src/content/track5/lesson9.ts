/**
 * Track 5, Lesson 9 -- "Supporting Someone With a Chronic Condition".
 * Tunde-hosted, Gist Mode. 79/150 words.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson9: Lesson = {
  id: "track-5-lesson-9",
  trackId: "track-5-chronic",
  lessonNumber: 9,
  mode: "gist",
  title: "Supporting Someone With a Chronic Condition",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "If someone close to you has a chronic condition, here's what actually helps.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "People sometimes assume they know what someone can or can't do, just from the diagnosis alone.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "That's not a safe assumption to make. The person living with it is the actual expert on their own body.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Wild concept: just asking them, instead of guessing.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Simple, practical support — understanding dietary needs, being flexible with plans — goes further than people expect.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "Respect their expertise, and the rest follows. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: it's appropriate to assume what someone can or can't do based only on their diagnosis.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — that's not a safe assumption.",
        incorrectFeedback: "Avoid making assumptions about what someone can or can't do based on their diagnosis alone — the person living with it knows their own limits.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What kind of support goes a long way?",
        options: ["Simple practical support, like understanding dietary needs and being flexible with plans", "Grand, dramatic gestures"],
        correctOptionIndex: 0,
        correctFeedback: "Right — simple, practical support.",
        incorrectFeedback: "Simple practical support — understanding dietary needs, being flexible with plans — goes a long way.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "Who is the real expert on someone's own condition and body?",
        options: ["The person living with it", "Whoever assumes the most"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — the person living with it.",
        incorrectFeedback: "Respecting someone's own expertise about their own condition and body matters — they're the real expert on it.",
      },
    ],
  },
};

/**
 * Track 3, Lesson 8 -- "Supporting a Friend". Nana-hosted, Gist Mode.
 * 75/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson8: Lesson = {
  id: "track-3-lesson-8",
  trackId: "track-3-mental-health",
  lessonNumber: 8,
  mode: "gist",
  title: "Supporting a Friend",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "If a friend opens up to you, here's what actually helps.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "There's pressure people put on themselves to personally fix a friend's mental health condition.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "That's not your job. Encouraging professional support is appropriate — but you're not responsible for solving it alone.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "You're a friend, not a licensed anything. Both are valuable, just different.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "Listening without judgment usually helps more than trying to fix things immediately.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Checking in consistently matters more than one big gesture. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: you are personally responsible for fixing a friend's mental health condition.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — that's not your job alone.",
        incorrectFeedback: "Encouraging professional support is appropriate, but you're not responsible for solving a friend's condition alone.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What's often more helpful than trying to immediately 'fix' a friend's problem?",
        options: ["Listening without judgment", "Giving unsolicited advice right away"],
        correctOptionIndex: 0,
        correctFeedback: "Right — listening without judgment.",
        incorrectFeedback: "Listening without judgment is often more helpful than trying to 'fix' the problem immediately.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "What matters more — one big gesture or consistent check-ins?",
        options: ["Consistent check-ins over time", "One big gesture"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — consistency matters more.",
        incorrectFeedback: "Checking in consistently over time matters more than one big gesture.",
      },
    ],
  },
};

/**
 * Track 1, Lesson 9 -- "Supporting Someone Living With HIV". Zara-hosted,
 * Gist Mode. 74/150 words.
 */
import type { Lesson } from "../../types/content";

export const track1Lesson9: Lesson = {
  id: "track-1-lesson-9",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 9,
  mode: "gist",
  title: "Supporting Someone Living With HIV",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "If a friend ever tells you their status, here's how to actually show up.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "Some people think you have to treat someone differently once you know their status.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "You really don't. Treat it as private health information — not something to share without their consent — and interact with them exactly as before.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Revolutionary concept: just... being normal about it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "Simple, consistent respect matters more than any grand gesture.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "That's really the whole ask. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "If a friend shares their HIV status with you, what should you do?",
        options: ["Keep it private unless they say otherwise", "Tell close mutual friends so they're careful"],
        correctOptionIndex: 0,
        correctFeedback: "Right — keep it private, it's their information to share.",
        incorrectFeedback: "Treat someone's status as private health information — not something to share without their consent, even with well-meaning mutual friends.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Should you change how you interact with someone based on their HIV status?",
        options: ["No, interact as before", "Yes, keep some distance"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — no need to change anything.",
        incorrectFeedback: "You don't need to change how you interact with someone based on their status — that's a core part of actually supporting them.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What matters more than grand gestures when supporting someone?",
        options: ["Simple, consistent respect", "Public displays of support"],
        correctOptionIndex: 0,
        correctFeedback: "Right — simple, consistent respect.",
        incorrectFeedback: "Simple, consistent respect is more valuable than grand gestures — small, steady things matter more than big ones.",
      },
    ],
  },
};

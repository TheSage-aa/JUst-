/**
 * Track 1, Lesson 4 -- "Testing — What to Expect". Zara-hosted, Gist Mode.
 * 77/150 words.
 */
import type { Lesson } from "../../types/content";

export const track1Lesson4: Lesson = {
  id: "track-1-lesson-4",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 4,
  mode: "gist",
  title: "Testing — What to Expect",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Testing sounds scarier in your head than it actually is.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "A lot of people picture testing as this whole slow, awkward process.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "A rapid test can actually give results in as little as 15 to 20 minutes.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Faster than most queues at the bank, honestly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth2", function: "MYTH", speaker: "zara", text: "There's also a worry that testing isn't private, or costs a lot.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "Testing is confidential, and plenty of places offer it for free.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth2" },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "Knowing your status, either way, is step one. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "How long can a rapid HIV test take to give results?",
        options: ["Several weeks", "About 15–20 minutes", "A full day"],
        correctOptionIndex: 1,
        correctFeedback: "Right — as little as 15 to 20 minutes.",
        incorrectFeedback: "A rapid test can give results in as little as 15 to 20 minutes — much faster than most people expect.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Is HIV testing confidential?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it's confidential.",
        incorrectFeedback: "Testing is confidential, and many places offer it for free — privacy is part of how it's designed to work.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Are all testing locations expensive?",
        options: ["Yes, always", "No, many are free"],
        correctOptionIndex: 1,
        correctFeedback: "Right — plenty of places offer it for free.",
        incorrectFeedback: "Many places offer free, confidential testing — cost shouldn't be the thing standing in the way.",
      },
    ],
  },
};

/**
 * Track 4, Lesson 4 -- "HPV & Why It Matters". Dr. Ayo-hosted, Gist Mode.
 * 84/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson4: Lesson = {
  id: "track-4-lesson-4",
  trackId: "track-4-stis",
  lessonNumber: 4,
  mode: "gist",
  title: "HPV & Why It Matters",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "HPV is probably the most common STI nobody talks about. Let's fix that.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "Some people think there's nothing you can really do to protect against it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "There actually is — a vaccine exists that protects against the HPV strains most linked to certain cancers.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically HPV is the common cold of STIs. Everybody's met it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "And for context: it's extremely common — most sexually active people will encounter it at some point, and most infections clear on their own.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's HPV, demystified a bit. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Is there a vaccine that helps protect against HPV?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a vaccine exists.",
        incorrectFeedback: "A vaccine exists that protects against the HPV strains most linked to certain cancers.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "How common is HPV among sexually active people?",
        options: ["Extremely common — most will encounter it at some point", "Extremely rare"],
        correctOptionIndex: 0,
        correctFeedback: "Right — extremely common.",
        incorrectFeedback: "HPV is extremely common — most sexually active people will encounter it at some point.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Do most HPV infections cause lasting problems?",
        options: ["No, most clear on their own", "Yes, always"],
        correctOptionIndex: 0,
        correctFeedback: "Right — most clear on their own.",
        incorrectFeedback: "Most HPV infections clear on their own without causing problems.",
      },
    ],
  },
};

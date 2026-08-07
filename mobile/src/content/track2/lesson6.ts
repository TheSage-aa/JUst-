/**
 * Track 2, Lesson 6 -- "Reproductive Rights, In Plain Language".
 * Kemi-hosted, Gist Mode. 81/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson6: Lesson = {
  id: "track-2-lesson-6",
  trackId: "track-2-srh",
  lessonNumber: 6,
  mode: "gist",
  title: "Reproductive Rights, In Plain Language",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Who actually has reproductive rights? Genuinely — let's define it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "Some people assume these rights are only really for married adults.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "They're not. Reproductive rights include accurate information, access to services, and bodily autonomy — and they apply regardless of gender or marital status.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Turns out rights don't check your relationship status at the door.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Honestly, access to accurate information is itself one of those rights — which is kind of the whole point of this lesson.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's reproductive rights, in plain language. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: reproductive rights only apply to married adults.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they apply regardless of marital status.",
        incorrectFeedback: "Reproductive rights apply regardless of gender, marital status, or age-of-consent context — not just to married adults.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What do reproductive rights include?",
        options: ["Accurate information, access to services, and bodily autonomy", "Only the right to marry"],
        correctOptionIndex: 0,
        correctFeedback: "Right — all three of those.",
        incorrectFeedback: "Reproductive rights include the right to accurate information, access to services, and bodily autonomy.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Is access to accurate information itself a reproductive right?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it is itself a right.",
        incorrectFeedback: "Access to accurate information is itself one of those reproductive rights, not separate from them.",
      },
    ],
  },
};

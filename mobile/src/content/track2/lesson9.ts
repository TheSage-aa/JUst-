/**
 * Track 2, Lesson 9 -- "Accessing SRH Services Confidentially".
 * Kemi-hosted, Gist Mode. 84/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson9: Lesson = {
  id: "track-2-lesson-9",
  trackId: "track-2-srh",
  lessonNumber: 9,
  mode: "gist",
  title: "Accessing SRH Services Confidentially",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Is it weird to ask a provider about their confidentiality policy? Actually — no.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "People worry that asking feels rude, or makes them look suspicious somehow.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "It's a completely normal, reasonable question. Many SRH services are legally required to maintain confidentiality — including for younger patients in a lot of contexts.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Ask the awkward question. The awkward question is doing you a favor.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Fear of judgment is honestly one of the biggest reasons young people avoid these services in the first place.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's confidentiality, actually explained. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Is it normal to ask a health provider about their confidentiality policy?",
        options: ["Yes", "No, it's considered rude"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a completely normal question.",
        incorrectFeedback: "Asking a provider directly about their confidentiality policy is a reasonable and normal question, not a rude one.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Are SRH services required to maintain confidentiality?",
        options: ["Yes, in many contexts, including for younger patients", "No, never"],
        correctOptionIndex: 0,
        correctFeedback: "Right — including for younger patients in many contexts.",
        incorrectFeedback: "Many SRH services are legally required to maintain confidentiality, including for younger patients in many contexts.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What's one of the biggest reasons young people avoid SRH services?",
        options: ["Fear of judgment", "Lack of interest"],
        correctOptionIndex: 0,
        correctFeedback: "Right — fear of judgment.",
        incorrectFeedback: "Fear of judgment is one of the biggest reasons young people avoid SRH services in the first place.",
      },
    ],
  },
};

/**
 * Track 5, Lesson 2 -- "Sickle Cell Trait vs. Sickle Cell Disease".
 * Tunde-hosted, Gist Mode. 77/150 words.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson2: Lesson = {
  id: "track-5-lesson-2",
  trackId: "track-5-chronic",
  lessonNumber: 2,
  mode: "gist",
  title: "Sickle Cell Trait vs. Sickle Cell Disease",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Trait and disease get mixed up constantly. Let's separate them for good.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "People often treat 'sickle cell trait' and 'sickle cell disease' as the same thing.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "They're not. Trait means carrying one copy of the gene, usually without symptoms. Disease means two copies, which does cause symptoms.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "One copy versus two — small difference on paper, big difference in practice.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Knowing which one applies to you actually matters for family planning decisions down the line.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "That's the real distinction. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: sickle cell trait and sickle cell disease are the same thing.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they're genuinely different.",
        incorrectFeedback: "Trait means carrying one copy of the gene, usually without symptoms; disease means two copies, which does cause symptoms — they're not the same.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What does having sickle cell trait typically mean?",
        options: ["Carrying one copy of the gene, usually without symptoms", "Having the full disease with symptoms"],
        correctOptionIndex: 0,
        correctFeedback: "Right — one copy, usually symptom-free.",
        incorrectFeedback: "Sickle cell trait means carrying one copy of the gene, usually without symptoms — that's different from having the disease.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Why does knowing your trait/disease status matter?",
        options: ["It matters for family planning decisions", "It has no practical relevance"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — family planning relevance.",
        incorrectFeedback: "Knowing your trait/disease status matters for family planning decisions.",
      },
    ],
  },
};

/**
 * Track 4, Lesson 6 -- "Why So Many STIs Have No Symptoms". Dr. Ayo-hosted,
 * Gist Mode. 82/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson6: Lesson = {
  id: "track-4-lesson-6",
  trackId: "track-4-stis",
  lessonNumber: 6,
  mode: "gist",
  title: "Why So Many STIs Have No Symptoms",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Here's the single most important idea in this whole track.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "There's a common assumption that no symptoms means no STI.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "That's not reliable at all. Many STIs — chlamydia, gonorrhea, HPV — often cause zero noticeable symptoms.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So 'I feel fine' was never actually a test result.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "Which means someone can have, and transmit, an STI without knowing. Regular testing — not waiting for symptoms — is the only reliable way to know your status.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's the core idea behind this whole track. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: you can only have an STI if you notice symptoms.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — many STIs cause no symptoms at all.",
        incorrectFeedback: "Many STIs, including chlamydia, gonorrhea, and HPV, often cause zero noticeable symptoms — you can have one without noticing.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What's the only reliable way to know your STI status?",
        options: ["Regular testing, not waiting for symptoms", "Just paying close attention to how you feel"],
        correctOptionIndex: 0,
        correctFeedback: "Right — regular testing is the reliable way.",
        incorrectFeedback: "Regular testing — not waiting for symptoms — is the only reliable way to know your status.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Can someone transmit an STI without knowing they have it?",
        options: ["Yes", "No, you'd always know"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — that's possible with symptomless STIs.",
        incorrectFeedback: "Someone can have, and transmit, an STI without knowing, since many cause no noticeable symptoms.",
      },
    ],
  },
};

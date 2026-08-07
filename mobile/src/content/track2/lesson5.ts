/**
 * Track 2, Lesson 5 -- "Pregnancy: What Happens & When to Seek Care".
 * Kemi-hosted, Gist Mode. 93/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson5: Lesson = {
  id: "track-2-lesson-5",
  trackId: "track-2-srh",
  lessonNumber: 5,
  mode: "gist",
  title: "Pregnancy: What Happens & When to Seek Care",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Question people don't ask enough: how do you actually know you're pregnant?", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "People think the classic signs — missed period, fatigue, nausea — are enough to just know for sure.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "They're common early signs, but a test is really the only way to confirm. And pregnancy affects every body differently — there's no single 'normal' experience.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Bodies really said 'no two of us doing this the same way.'", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "What actually matters most is getting antenatal care early — it significantly improves outcomes for both parent and baby.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's pregnancy basics, honestly explained. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "What's the only way to actually confirm a pregnancy?",
        options: ["A test", "Noticing common early signs alone"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a test is the only way to confirm.",
        incorrectFeedback: "Common early signs like a missed period, fatigue, or nausea are just signs — a test is the only way to actually confirm.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Why does early antenatal care matter?",
        options: ["It significantly improves outcomes for both parent and baby", "It has no real effect on outcomes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — it significantly improves outcomes.",
        incorrectFeedback: "Early antenatal care significantly improves outcomes for both parent and baby — it makes a real difference.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "Does pregnancy look the same for everyone?",
        options: ["No, it affects every body differently", "Yes, it's a standard experience"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — every body experiences it differently.",
        incorrectFeedback: "Pregnancy affects every body differently — there's no single 'normal' experience.",
      },
    ],
  },
};

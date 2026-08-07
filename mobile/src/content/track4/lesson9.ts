/**
 * Track 4, Lesson 9 -- "Talking to a Partner About STIs". Dr. Ayo-hosted,
 * Gist Mode. 79/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson9: Lesson = {
  id: "track-4-lesson-9",
  trackId: "track-4-stis",
  lessonNumber: 9,
  mode: "gist",
  title: "Talking to a Partner About STIs",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "One more conversation worth normalizing: talking to a partner about this.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "Some people worry that bringing up testing history comes across as an accusation.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "It's actually the opposite — it's a sign of respect for a partner's health, not a suspicion of anything.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Way less awkward than the silence beforehand, honestly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "A simple, direct approach lands better than an anxious or apologetic one — and normalizing it helps reduce stigma for everyone.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's the conversation, made a little easier. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: discussing STI testing with a partner is disrespectful.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it's actually a sign of respect.",
        incorrectFeedback: "Bringing up testing history is a sign of respect for a partner's health, not an accusation or a disrespectful move.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What approach tends to work better for this conversation?",
        options: ["A simple, direct approach", "An anxious or apologetic one"],
        correctOptionIndex: 0,
        correctFeedback: "Right — simple and direct works better.",
        incorrectFeedback: "A simple, direct approach works better than an anxious or apologetic one.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Does normalizing this conversation help reduce stigma?",
        options: ["Yes", "No, it makes things worse"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it helps everyone.",
        incorrectFeedback: "Normalizing this conversation reduces stigma for everyone involved — the more common it is to talk about, the easier it gets.",
      },
    ],
  },
};

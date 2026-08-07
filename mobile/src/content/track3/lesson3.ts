/**
 * Track 3, Lesson 3 -- "Recognizing Depression". Nana-hosted, Gist Mode.
 * 85/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson3: Lesson = {
  id: "track-3-lesson-3",
  trackId: "track-3-mental-health",
  lessonNumber: 3,
  mode: "gist",
  title: "Recognizing Depression",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "One thing worth clearing up early: what depression actually is.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "There's a persistent idea that it comes down to willpower, or not being grateful enough.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "It doesn't. Depression is a medical condition — not a lack of willpower, and not about gratitude at all.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So 'just be positive' was never going to be the fix. Wild.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "It can look like persistent sadness, losing interest in things you used to enjoy, low energy, or changes in sleep and appetite.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "It's treatable — therapy, lifestyle changes, medication, or some combination. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: depression is caused by a lack of willpower.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it's a medical condition, not a willpower issue.",
        incorrectFeedback: "Depression is a medical condition — not a lack of willpower or gratitude.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What can depression look like?",
        options: ["Persistent sadness, loss of interest, low energy, or changes in sleep and appetite", "Just feeling a bit tired occasionally"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are recognizable signs.",
        incorrectFeedback: "Depression can look like persistent sadness, loss of interest in things you used to enjoy, low energy, or changes in sleep and appetite.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "Is depression treatable?",
        options: ["Yes, through therapy, lifestyle changes, medication, or a combination", "No, it just has to run its course"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it's treatable in several ways.",
        incorrectFeedback: "Depression is treatable through therapy, lifestyle changes, medication, or a combination of these.",
      },
    ],
  },
};

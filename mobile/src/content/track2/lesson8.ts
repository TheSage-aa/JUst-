/**
 * Track 2, Lesson 8 -- "Healthy Relationships & Communication".
 * Kemi-hosted, Gist Mode. 84/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson8: Lesson = {
  id: "track-2-lesson-8",
  trackId: "track-2-srh",
  lessonNumber: 8,
  mode: "gist",
  title: "Healthy Relationships & Communication",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Does asking about testing mean you don't trust someone? Let's actually settle this.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "A lot of people think bringing up protection or testing signals distrust.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "It's actually the opposite — talking openly about protection, boundaries, and testing is a sign of a healthy relationship, not a lack of trust.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Silence about it is the actual red flag, not the conversation.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Avoiding the conversation out of awkwardness increases real risk — and honestly, it gets easier every time you practice it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's communication, actually explained. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Is talking about protection with a partner a sign of distrust?",
        options: ["No", "Yes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — the opposite, actually.",
        incorrectFeedback: "Talking openly about protection, boundaries, and testing is a sign of a healthy relationship, not a lack of trust.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What happens when these conversations get avoided out of awkwardness?",
        options: ["Real risk increases", "Nothing changes either way"],
        correctOptionIndex: 0,
        correctFeedback: "Right — real risk increases.",
        incorrectFeedback: "Avoiding these conversations out of awkwardness increases real risk — silence doesn't make things safer.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Does practicing these conversations make them easier over time?",
        options: ["Yes", "No, it stays equally hard"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it gets easier with practice.",
        incorrectFeedback: "Practicing how to raise these topics genuinely makes it easier over time.",
      },
    ],
  },
};

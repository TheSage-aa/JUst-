/**
 * Track 5, Lesson 3 -- "Living With Sickle Cell: Daily Management".
 * Tunde-hosted, Gist Mode. 79/150 words.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson3: Lesson = {
  id: "track-5-lesson-3",
  trackId: "track-5-chronic",
  lessonNumber: 3,
  mode: "gist",
  title: "Living With Sickle Cell: Daily Management",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Daily management sounds heavy. In practice, it's pretty manageable.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "There's an assumption that sickle cell rules out a full, active life.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "It doesn't. With good management, people with sickle cell live full, active lives — this isn't a life sentence to the sidelines.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Hydration: doing the most unglamorous heavy lifting in health advice, as always.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Staying hydrated, avoiding extreme temperatures, and keeping up with regular checkups go a long way toward managing it proactively.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "Small habits, real difference. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: people with sickle cell disease cannot live full, active lives.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — full, active lives are realistic with good management.",
        incorrectFeedback: "With good management, people with sickle cell disease can live full, active lives.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What can help reduce crisis frequency?",
        options: ["Staying hydrated and avoiding extreme temperatures", "There's nothing that helps"],
        correctOptionIndex: 0,
        correctFeedback: "Right — hydration and temperature awareness help.",
        incorrectFeedback: "Staying well-hydrated and avoiding extreme temperatures can help reduce crisis frequency.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Do regular medical checkups help manage sickle cell proactively?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — proactive management helps.",
        incorrectFeedback: "Regular medical checkups help manage the condition proactively — catching things early rather than reacting later.",
      },
    ],
  },
};

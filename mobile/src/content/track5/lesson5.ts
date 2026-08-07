/**
 * Track 5, Lesson 5 -- "What Is Diabetes?". Tunde-hosted, Gist Mode.
 * 82/150 words.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson5: Lesson = {
  id: "track-5-lesson-5",
  trackId: "track-5-chronic",
  lessonNumber: 5,
  mode: "gist",
  title: "What Is Diabetes?",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Diabetes gets talked about like it's one single thing. It's not.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "People often assume Type 1 and Type 2 diabetes are exactly the same condition.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "They're not. Type 1 usually shows up early in life and isn't preventable. Type 2 tends to develop later and is linked to multiple factors.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Same name, different backstory. Diabetes really said 'it's complicated.'", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Both types affect how the body regulates blood sugar — and both are manageable with proper care.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "That's the real difference, laid out. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: Type 1 and Type 2 diabetes are exactly the same condition.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they're genuinely different.",
        incorrectFeedback: "Type 1 usually shows up early in life and isn't preventable; Type 2 tends to develop later and is linked to multiple factors — they differ.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What does diabetes affect?",
        options: ["How the body regulates blood sugar", "Only the digestive system"],
        correctOptionIndex: 0,
        correctFeedback: "Right — blood sugar regulation.",
        incorrectFeedback: "Diabetes affects how the body regulates blood sugar (glucose).",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Are both types of diabetes manageable with proper care?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — both are manageable.",
        incorrectFeedback: "Both types of diabetes are manageable with proper care.",
      },
    ],
  },
};

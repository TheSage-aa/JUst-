/**
 * Track 5, Lesson 6 -- "Recognizing the Signs of Diabetes". Tunde-hosted,
 * Gist Mode. 78/150 words.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson6: Lesson = {
  id: "track-5-lesson-6",
  trackId: "track-5-chronic",
  lessonNumber: 6,
  mode: "gist",
  title: "Recognizing the Signs of Diabetes",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Diabetes signs aren't always dramatic. Let's actually name them.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "People often expect the symptoms to be severe and obvious right away.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "They're often not — many people live with undiagnosed diabetes for years because early symptoms are mild.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Sneaky in the way that only your body's internal chemistry can be.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Common signs include excessive thirst, frequent urination, fatigue, or unexplained weight change — and a simple blood test can confirm it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "Now you know what to actually watch for. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: diabetes always has severe, obvious symptoms.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — symptoms can be mild for years.",
        incorrectFeedback: "Many people live with undiagnosed diabetes for years because early symptoms can be mild, not severe or obvious.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What are common signs of diabetes?",
        options: ["Excessive thirst, frequent urination, fatigue, or unexplained weight change", "A sudden high fever only"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are the common signs.",
        incorrectFeedback: "Common signs include excessive thirst, frequent urination, fatigue, and unexplained weight change.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Can a simple blood test confirm a diabetes diagnosis?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — a simple blood test can confirm it.",
        incorrectFeedback: "A simple blood test can confirm a diabetes diagnosis.",
      },
    ],
  },
};

/**
 * Track 5, Lesson 7 -- "Living With Diabetes: Daily Management".
 * Tunde-hosted, Gist Mode. 88/150 words. This is Tunde's signature
 * reframing lesson -- checked hardest against Ch.26 SS26.4's "never frame
 * food/routine as restriction/punishment" rule.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson7: Lesson = {
  id: "track-5-lesson-7",
  trackId: "track-5-chronic",
  lessonNumber: 7,
  mode: "gist",
  title: "Living With Diabetes: Daily Management",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Daily management doesn't have to mean giving everything up.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "There's a common fear that good management still means a seriously limited life.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "It doesn't. With good management, diabetes doesn't have to limit quality of life at all — this is about enabling your days, not restricting them.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Eating well as punishment was never the plan, honestly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Blood sugar monitoring guides daily choices around food, activity, and medication — and balanced nutrition plus regular movement support all of it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "This is about what it enables, not what it takes away. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: with good management, diabetes must still severely limit quality of life.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it doesn't have to limit your life.",
        incorrectFeedback: "With good management, diabetes doesn't have to limit a person's quality of life at all.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What does blood sugar monitoring help guide?",
        options: ["Daily decisions around food, activity, and medication", "Nothing practical"],
        correctOptionIndex: 0,
        correctFeedback: "Right — daily decisions.",
        incorrectFeedback: "Blood sugar monitoring helps guide daily decisions around food, activity, and medication.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What supports blood sugar management day to day?",
        options: ["Balanced nutrition and regular physical activity", "Avoiding food entirely"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — balanced nutrition and activity.",
        incorrectFeedback: "Balanced nutrition and regular physical activity support blood sugar management.",
      },
    ],
  },
};

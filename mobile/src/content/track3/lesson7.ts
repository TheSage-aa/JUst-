/**
 * Track 3, Lesson 7 -- "When and How to Seek Help". Nana-hosted, Gist Mode.
 * 88/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson7: Lesson = {
  id: "track-3-lesson-7",
  trackId: "track-3-mental-health",
  lessonNumber: 7,
  mode: "gist",
  title: "When and How to Seek Help",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "When is it actually 'time' to seek help? Fair question.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "There's a belief that people should wait until things get extremely severe before reaching out.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "You don't have to wait that long. It's worth considering once symptoms stick around for more than two weeks, or start interfering with daily life.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Step one is genuinely just the hardest step. After that it gets easier, promise.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "Options range from school or university counselling to community mental health providers.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Reaching out for the first time is often the hard part — and that's completely normal. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: you should only seek help once symptoms become extremely severe.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — you don't have to wait that long.",
        incorrectFeedback: "Seeking help is worth considering when symptoms persist for more than two weeks or interfere with daily life — not only once things get extremely severe.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What are some options for seeking mental health support?",
        options: ["School/university counselling or community providers", "Only expensive private clinics"],
        correctOptionIndex: 0,
        correctFeedback: "Right — there are several accessible options.",
        incorrectFeedback: "Options range from school or university counselling services to community mental health providers.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "Is it normal for reaching out the first time to feel hard?",
        options: ["Yes, that's normal", "No, it should feel easy immediately"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — that's a normal part of it.",
        incorrectFeedback: "Reaching out for the first time is often the hardest step, and that's completely normal.",
      },
    ],
  },
};

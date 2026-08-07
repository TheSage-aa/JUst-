/**
 * Track 3, Lesson 5 -- "Healthy Coping Skills". Nana-hosted, Gist Mode.
 * 83/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson5: Lesson = {
  id: "track-3-lesson-5",
  trackId: "track-3-mental-health",
  lessonNumber: 5,
  mode: "gist",
  title: "Healthy Coping Skills",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Let's talk about what actually helps, day to day.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "There's an assumption that one coping technique should just work for everyone the same way.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "It doesn't, really. Different things work for different people — breathing exercises, movement, journaling, talking to someone you trust. It's normal to try a few.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "My personal technique is dramatically sighing until someone asks what's wrong.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "These tools support wellbeing, but they're not a replacement for professional care when that's actually what's needed.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Small, real tools — that's the idea. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: the same coping technique works equally well for everyone.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — different things work for different people.",
        incorrectFeedback: "Different techniques work for different people — it's normal to try several before finding what helps.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Which of these is an example of a coping skill?",
        options: ["Structured breathing, movement, journaling, or talking to someone trusted", "Ignoring the problem entirely"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are real coping tools.",
        incorrectFeedback: "Coping skills include things like structured breathing exercises, physical movement, journaling, and talking to someone you trust.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Do coping skills replace professional care when it's needed?",
        options: ["No, they support wellbeing but aren't a replacement", "Yes, they're a full replacement"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — they support, but don't replace, professional care.",
        incorrectFeedback: "Coping skills support wellbeing but are not a replacement for professional care when it's needed.",
      },
    ],
  },
};

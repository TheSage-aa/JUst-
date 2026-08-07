/**
 * Track 3 (Mental Health), Lesson 1 -- "What Mental Health Actually Means".
 * Nana-hosted, Gist Mode. Source: docs/tracks/track-3-mental-health.md.
 * 87/150 words.
 *
 * Nana Voice Test (Ch.24 SS24.5): slower/gentler pacing (shorter sentences
 * than other hosts), no diagnostic language anywhere, closes with plain
 * affirming framing rather than an open question, never solicits personal
 * disclosure ("does this sound like you?" is deliberately never asked).
 */
import type { Lesson } from "../../types/content";

export const track3Lesson1: Lesson = {
  id: "track-3-lesson-1",
  trackId: "track-3-mental-health",
  lessonNumber: 1,
  mode: "gist",
  title: "What Mental Health Actually Means",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Let's start simple. What does 'mental health' actually mean?", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "Some people think mental health only applies if you have a diagnosed condition.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "It's part of everyone's overall health, the same way physical health is. It can be strong some days, struggling on others — for everyone, not just some people.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So yes, even Bello has mental health. Shocking, I know.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "Having a hard season with it isn't a weakness or a character flaw. It's just part of being human.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "That's the whole idea, simply put. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: mental health only applies to people with a diagnosed condition.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — mental health is part of everyone's overall health.",
        incorrectFeedback: "Mental health is part of everyone's overall health, not just something that applies to people with a diagnosed condition.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Can mental health be strong on some days and struggling on others, for anyone?",
        options: ["Yes", "No, it's fixed"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it varies, for everyone.",
        incorrectFeedback: "Mental health can be strong some days and struggling on others — for everyone, not a fixed state.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Is having a mental health challenge a personal weakness or character flaw?",
        options: ["No", "Yes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — it's not.",
        incorrectFeedback: "Having a mental health challenge isn't a weakness or a character flaw — it's just part of being human.",
      },
    ],
  },
};

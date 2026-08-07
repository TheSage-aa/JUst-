/**
 * Track 1, Lesson 6 -- "U=U: Undetectable = Untransmittable". Zara-hosted,
 * Gist Mode. 76/150 words. Only one MYTH/FACT pair -- U=U is genuinely one
 * core fact (Ch.34 SS34.3 permits 1-3 pairs, not a fixed count). No Bello
 * beat this lesson: with only one FACT beat available, there's no
 * placement for him that satisfies Rule 35.2.2 (never immediately before
 * CLOSE) without padding the lesson with an unneeded extra beat -- so the
 * "say it three times fast" anchor line is delivered by Zara herself
 * instead, as beat sub-part 4 of Ch.36 SS36.2's four-part structure (a
 * concrete, memorable anchor), which carries no such placement constraint.
 */
import type { Lesson } from "../../types/content";

export const track1Lesson6: Lesson = {
  id: "track-1-lesson-6",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 6,
  mode: "gist",
  title: "U=U: Undetectable = Untransmittable",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "This is the single most important fact in this whole track.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "People assume that even on treatment, HIV can still be passed to a partner.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "It's backed by major health bodies, including the WHO: someone on effective treatment with an undetectable viral load cannot sexually transmit HIV to a partner.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "anchor", function: "FACT", speaker: "zara", text: "Short version: U=U. Undetectable equals untransmittable.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "This one fact changed how the world understands living with HIV. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "What does U=U stand for?",
        options: ["Understood = Universal", "Undetectable = Untransmittable"],
        correctOptionIndex: 1,
        correctFeedback: "Exactly — undetectable equals untransmittable.",
        incorrectFeedback: "U=U stands for Undetectable = Untransmittable — someone on effective treatment with an undetectable viral load cannot sexually transmit HIV.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "True or false: someone who is undetectable can still transmit HIV sexually.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they cannot.",
        incorrectFeedback: "Someone on effective treatment with an undetectable viral load cannot sexually transmit HIV to a partner — that's what U=U means.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "Which organizations back the U=U finding?",
        options: ["Major global health bodies, including the WHO", "No official bodies yet"],
        correctOptionIndex: 0,
        correctFeedback: "Right — including the WHO.",
        incorrectFeedback: "U=U is backed by major global health bodies, including the WHO — it's a well-established, evidence-based fact.",
      },
    ],
  },
};

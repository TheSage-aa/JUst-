/**
 * Track 2 (Sexual & Reproductive Health), Lesson 1 -- "Understanding
 * Puberty & Your Body". Kemi-hosted, Gist Mode. Source facts from
 * docs/tracks/track-2-sexual-reproductive-health.md.
 *
 * 71/150 words. No Bello beat: only one MYTH/FACT pair exists here, and
 * per the lesson4.ts/6.ts pattern established in Track 1, there's no safe
 * placement for him without either padding the lesson or violating Rule
 * 35.2.2 -- so Kemi carries the whole lesson.
 *
 * Kemi Voice Test (Ch.23 SS23.5): HOOK and MYTH beats use her signature
 * question-first pattern ("genuinely asking") rather than declarative
 * opening, modeling real curiosity rather than performed ignorance.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson1: Lesson = {
  id: "track-2-lesson-1",
  trackId: "track-2-srh",
  lessonNumber: 1,
  mode: "gist",
  title: "Understanding Puberty & Your Body",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Okay, real question — when's the 'right' age for puberty to start? Genuinely asking.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "People act like there's one correct age this is all supposed to happen by.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "There really isn't. Puberty is just the body developing physically and hormonally into adulthood — and timing varies a lot between people. No single 'normal' age exists.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "Knowing your own body is honestly the starting point for everything else. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: puberty happens at the exact same age for everyone.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — there's no single 'normal' age.",
        incorrectFeedback: "Puberty's timing varies a lot between people — there's no single correct age it's supposed to happen by.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What is puberty?",
        options: ["The body developing physically and hormonally into adulthood", "A medical condition that needs treatment"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — a natural developmental process.",
        incorrectFeedback: "Puberty is just the body developing physically and hormonally into adulthood — a natural process, not a condition.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "What's the foundation for making informed health decisions later, according to this lesson?",
        options: ["Understanding your own body", "Comparing yourself to others"],
        correctOptionIndex: 0,
        correctFeedback: "Right — understanding your own body.",
        incorrectFeedback: "Knowing your own body is the starting point for making informed decisions later — not comparing yourself to anyone else's timeline.",
      },
    ],
  },
};

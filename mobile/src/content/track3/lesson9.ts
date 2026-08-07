/**
 * Track 3, Lesson 9 -- "Crisis Recognition & Immediate Safety". Nana-hosted,
 * Gist Mode. 73/150 words.
 *
 * FLAGGED COMPLIANCE DECISIONS (Ch.67 SS67.3):
 * 1. No Bello beat. Same reasoning as Track 2 Lesson 4 (Consent): this is
 *    a safety-critical topic where even a careful joke risks undermining
 *    the seriousness of the content, and Ch.1 SS1.9 puts psychological
 *    safety and accurate delivery ahead of pacing variety.
 * 2. No MYTH/FACT pairs -- this lesson states safety information plainly
 *    rather than forcing a myth-correction frame onto it, which Ch.34
 *    SS34.3 explicitly permits ("rare" but valid) for content where a
 *    myth-correction framing would be inappropriate.
 * 3. Deliberately does NOT name a specific crisis hotline or resource --
 *    fabricating one would be actively dangerous if wrong. The lesson
 *    matches the source content's own restraint ("know local crisis
 *    resources in advance") rather than inventing a number to sound more
 *    complete.
 * 4. No second-person clinical directive despite the safety-critical
 *    content -- phrased as what matters/what helps, not "you must/should."
 */
import type { Lesson } from "../../types/content";

export const track3Lesson9: Lesson = {
  id: "track-3-lesson-9",
  trackId: "track-3-mental-health",
  lessonNumber: 9,
  mode: "gist",
  title: "Crisis Recognition & Immediate Safety",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "This one's about safety, not diagnosis. It matters to know the signs.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "Warning signs of a crisis can include talk of hopelessness, giving away possessions, or expressing intent to harm oneself.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "In a crisis, getting help right away matters more than waiting to see if it passes.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact3", function: "FACT", speaker: "nana", text: "Knowing local crisis resources ahead of time makes it easier to act quickly if it's ever needed.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Taking it seriously and acting fast is what matters most here. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: if someone expresses intent to harm themselves, it should be taken seriously and acted on immediately.",
        options: ["True", "False"],
        correctOptionIndex: 0,
        correctFeedback: "Right — always take it seriously and act.",
        incorrectFeedback: "If someone expresses intent to harm themselves, it should always be taken seriously and acted on immediately — not something to wait on.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Which of these can be a warning sign of a crisis?",
        options: ["Talk of hopelessness or giving away possessions", "Being in a bad mood for one afternoon"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are real warning signs.",
        incorrectFeedback: "Warning signs of a crisis include talk of hopelessness, giving away possessions, or expressing intent to harm oneself.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact3",
        prompt: "Why does knowing local crisis resources in advance help?",
        options: ["It makes it easier to act quickly if needed", "It has no real benefit"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it helps you act quickly when it counts.",
        incorrectFeedback: "Knowing local crisis resources in advance makes it easier to act quickly if it's ever needed.",
      },
    ],
  },
};

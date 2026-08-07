/**
 * Track 2, Lesson 4 -- "Consent — What It Actually Means". Kemi-hosted,
 * Gist Mode. 91/150 words.
 *
 * FLAGGED COMPLIANCE DECISION (Ch.67 SS67.3): no Bello beat in this
 * lesson. Ch.27 SS27.1-27.4 define Bello as strictly a tension-release/
 * comic-relief character; a joke of any kind risks undermining a
 * precision-critical, safety-relevant topic like consent, and Bello's own
 * voice rules already caution his humor must never come at a topic's
 * seriousness. Per Ch.1 SS1.9's precedence order (psychological safety
 * and accuracy of delivery outrank polish/pacing variety), this lesson is
 * carried entirely by Kemi with no tension-break.
 *
 * Kemi Voice Test (Ch.23 SS23.5): this is the lesson her "direct, clear,
 * unambiguous language, no euphemism, no vagueness" rule applies to most
 * strictly. Both FACT beats state the rule plainly with no hedging.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson4: Lesson = {
  id: "track-2-lesson-4",
  trackId: "track-2-srh",
  lessonNumber: 4,
  mode: "gist",
  title: "Consent — What It Actually Means",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Let's be exact about this one — vague language isn't good enough here.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "Some people think once consent is given, that's it, it can't change.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "That's not how it works. Consent has to be freely given, it's ongoing, and it can be withdrawn at any time — no exceptions.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "myth2", function: "MYTH", speaker: "kemi", text: "There's also a dangerous idea that silence, or just not resisting, counts as a yes.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "It doesn't. Silence isn't consent. And consent given under pressure, fear, or manipulation isn't real consent either.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth2" },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's consent, in full — no fine print. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Can consent be withdrawn after it's initially given?",
        options: ["Yes, at any time", "No, once given it can't change"],
        correctOptionIndex: 0,
        correctFeedback: "Right — at any time, no exceptions.",
        incorrectFeedback: "Consent is ongoing and can be withdrawn at any time — it's never locked in once given.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Does silence count as consent?",
        options: ["No", "Yes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — silence isn't consent.",
        incorrectFeedback: "Silence or lack of resistance is not the same as consent — consent has to be actively, freely given.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Is consent given under pressure or fear real consent?",
        options: ["No", "Yes"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — not real consent.",
        incorrectFeedback: "Consent given under pressure, fear, or manipulation isn't real consent, even if someone technically says yes.",
      },
    ],
  },
};

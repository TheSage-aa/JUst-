/**
 * Track 1, Lesson 7 -- "What Stigma Actually Looks Like". Zara-hosted,
 * Gist Mode. 73/150 words. FACT2 is standalone (pairsWithBeatId: null) --
 * elaboration, not a distinct named-myth correction (Ch.34 SS34.2 item 3's
 * documented exception; not fabricated per Ch.36 SS36.2 item 2's warning).
 */
import type { Lesson } from "../../types/content";

export const track1Lesson7: Lesson = {
  id: "track-1-lesson-7",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 7,
  mode: "gist",
  title: "What Stigma Actually Looks Like",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Stigma doesn't always look dramatic. Usually it's smaller than that.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "People think stigma has to be loud — an insult, a scene.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "Mostly it's quieter: a joke, an assumption, an awkward silence, someone being quietly excluded.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Even the 'harmless' jokes count, for the record.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "It usually comes from outdated fear, not current facts — and it's one of the biggest reasons people avoid getting tested.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "Naming it is the first step to not doing it. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Which of these is an example of stigma?",
        options: ["Avoiding someone because of an assumption about their status", "Asking a doctor a health question"],
        correctOptionIndex: 0,
        correctFeedback: "Right — that quiet avoidance is stigma.",
        incorrectFeedback: "Stigma is often quiet — a joke, an assumption, an awkward silence, someone being excluded — like avoiding someone over an assumption about their status.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Where does stigma usually come from?",
        options: ["Outdated fear, not current facts", "Careful, accurate information"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — outdated fear.",
        incorrectFeedback: "Stigma usually comes from outdated fear, not current facts — which is exactly why accurate information helps push back on it.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What's one of the biggest reasons people avoid getting tested?",
        options: ["Stigma", "Cost of transportation"],
        correctOptionIndex: 0,
        correctFeedback: "Right — stigma is one of the biggest reasons.",
        incorrectFeedback: "Stigma is one of the biggest reasons people avoid getting tested — fear of judgment gets in the way of the facts.",
      },
    ],
  },
};

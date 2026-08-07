/**
 * Track 1, Lesson 10 -- "Bringing It Together" (mixed review, Ch.5 SS5.3).
 * Zara-hosted, Gist Mode. 85/150 words.
 *
 * SCHEMA RESOLUTION (flagged per Ch.67 SS67.3): Ch.5 SS5.3 says a track's
 * Lesson 10 "mixes questions from Lessons 1-9," but Ch.39 SS39.3 rule 5
 * requires every quiz question's mapsToBeatId to resolve to a beat *in
 * this lesson*, and Rule 1.3.2 requires lessons to be legible in
 * isolation. The consistent resolution: Lesson 10 carries its own
 * condensed recap beats restating the five headline facts from Lessons
 * 1-9, and its quiz questions map to *those* recap beats -- not literally
 * to beat IDs in other lesson files. This keeps the lesson self-contained
 * while still functioning as the spaced-repetition review Ch.5 SS5.3
 * describes.
 *
 * All five FACT beats are standalone recaps (pairsWithBeatId: null) --
 * these restate already-corrected facts, not new myth corrections, which
 * is Ch.34 SS34.2 item 3's documented exception, appropriate here by
 * design rather than as a shortcut.
 */
import type { Lesson } from "../../types/content";

export const track1Lesson10: Lesson = {
  id: "track-1-lesson-10",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 10,
  mode: "gist",
  title: "Bringing It Together",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Nine lessons down. Let's pull it all together, fast.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-transmission", function: "FACT", speaker: "zara", text: "Transmission is specific — blood, semen, vaginal fluids, breast milk. Not saliva, not casual contact.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-testing", function: "FACT", speaker: "zara", text: "Testing is quick — 15 to 20 minutes for a rapid test, and confidential.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-treatment", function: "FACT", speaker: "zara", text: "Treatment today means undetectable is realistic — and undetectable means untransmittable, sexually.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically: less scary, more manageable than the group chat makes it sound.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-stigma", function: "FACT", speaker: "zara", text: "Stigma's still the biggest reason people delay testing — not the facts themselves.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "That's the whole track, in short. Last quiz — let's make it count.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "recap-treatment",
        prompt: "Mixed review — U=U means someone on effective treatment:",
        options: ["Cannot sexually transmit HIV", "Is fully cured"],
        correctOptionIndex: 0,
        correctFeedback: "Right — undetectable means untransmittable.",
        incorrectFeedback: "U=U means someone on effective treatment with an undetectable viral load cannot sexually transmit HIV — it doesn't mean the virus is cured.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "recap-stigma",
        prompt: "Mixed review — the biggest driver of HIV testing avoidance is usually:",
        options: ["Stigma and fear", "Cost of the test"],
        correctOptionIndex: 0,
        correctFeedback: "Right — stigma and fear.",
        incorrectFeedback: "Stigma and fear are usually the biggest drivers of testing avoidance — more than cost, which is often free anyway.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "recap-transmission",
        prompt: "Mixed review — which of these can transmit HIV?",
        options: ["Casual contact", "Unprotected sex", "Sharing a cup"],
        correctOptionIndex: 1,
        correctFeedback: "Right — unprotected sex.",
        incorrectFeedback: "HIV transmits through specific fluids via things like unprotected sex — not casual contact or sharing a cup.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "recap-testing",
        prompt: "Mixed review — about how long does a rapid HIV test take?",
        options: ["15–20 minutes", "Several weeks", "A full day"],
        correctOptionIndex: 0,
        correctFeedback: "Right — 15 to 20 minutes.",
        incorrectFeedback: "A rapid HIV test typically takes about 15 to 20 minutes — much faster than most people expect.",
      },
    ],
  },
};

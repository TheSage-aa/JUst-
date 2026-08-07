/**
 * Track 1, Lesson 2 -- "How HIV Is Actually Transmitted". Zara-hosted, Gist
 * Mode. Source facts from docs/tracks/track-1-hiv-stigma-basics.md.
 *
 * Compliance notes (Ch.67 SS67.2): 98/150 words. Bello's BREAK sits
 * immediately after FACT1, never after a MYTH beat, never before CLOSE
 * (Rule 35.2.2). No second-person myth attribution, no clinical
 * directives, incorrect feedback always restates the fact in full.
 * No choice moment and no Buggy interjection this lesson (consistent with
 * lesson1.ts's flagged deviation and this pass's word-budget discipline --
 * see content/track1/index.ts's authoring note for the pattern applied
 * across lessons 2-9).
 */
import type { Lesson } from "../../types/content";

export const track1Lesson2: Lesson = {
  id: "track-1-lesson-2",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 2,
  mode: "gist",
  title: "How HIV Is Actually Transmitted",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Transmission gets talked about like it's a mystery. It's really not.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "People throw around a lot of ways HIV supposedly spreads — sharing cups, hugging, casual contact.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "None of that. HIV only spreads through specific fluids — blood, semen, vaginal fluids, and breast milk. Saliva, sweat, and tears don't carry it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So no, you can't catch it from someone's leftover jollof.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth2", function: "MYTH", speaker: "zara", text: "There's also this idea that it spreads through basically any close contact.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "In practice, the two most common routes are unprotected sex and shared needles — not hugs, not hangouts.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth2" },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "That's transmission, actually explained. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Which of these can transmit HIV?",
        options: ["Sharing a cup", "Unprotected sex", "Hugging"],
        correctOptionIndex: 1,
        correctFeedback: "Right — unprotected sex is one of the two most common routes.",
        incorrectFeedback: "HIV spreads through specific fluids — blood, semen, vaginal fluids, and breast milk — through things like unprotected sex, not sharing a cup or hugging.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "True or false: HIV can spread through saliva.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Exactly — saliva doesn't carry HIV.",
        incorrectFeedback: "Not quite — HIV only spreads through specific fluids like blood, semen, vaginal fluids, and breast milk. Saliva isn't one of them.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What are the two most common ways HIV is transmitted?",
        options: ["Unprotected sex and shared needles", "Casual contact and sharing food", "Hugging and shared cups"],
        correctOptionIndex: 0,
        correctFeedback: "That's it — unprotected sex and shared needles.",
        incorrectFeedback: "The two most common routes are unprotected sex and shared needles — casual contact and sharing food or cups don't transmit HIV at all.",
      },
    ],
  },
};

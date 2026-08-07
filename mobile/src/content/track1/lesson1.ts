/**
 * Track 1 (HIV & Stigma Basics), Lesson 1 -- "What HIV Actually Is"
 * Hosted by Zara (Ch.22). Gist Mode. Authored per Ch.39 schema, Ch.34
 * beat template, and Ch.36's four-part myth-correction structure.
 *
 * Source facts ported from docs/tracks/track-1-hiv-stigma-basics.md
 * (the original content this whole project is built from), re-authored
 * into the Bible's beat/voice structure -- the underlying facts are
 * unchanged, only the delivery structure and character attribution.
 *
 * COMPLIANCE NOTES (Ch.67 SS67.2 habit -- recorded, not just performed):
 *
 * - Word budget: 136 words total across all beat `text` fields (limit 150,
 *   Ch.5 SS5.1) -- verified mechanically, see __tests__/lesson1.test.ts.
 * - Bello's BREAK beat sits immediately after FACT1 -- never immediately
 *   after a MYTH beat, never immediately before CLOSE (Rule 35.2.2).
 * - Buggy's interjection sits immediately after HOOK, before any content
 *   beat (Rule 35.2.3), and names a real, specific fact about this exact
 *   moment ("first lesson of this track") rather than generic warmth.
 * - No beat or quiz line ever says "you thought" / "you probably believed"
 *   -- both MYTH beats use generalized third-person attribution ("a lot of
 *   people think...", "there's a rumor going around...") per Rule 1.3.1 /
 *   Rule 1.4.1.
 * - No second-person clinical directive anywhere (no "you should/need to").
 * - Incorrect-answer feedback restates the corrected fact in full every
 *   time, with no judgmental language -- the word "wrong" is avoided
 *   entirely in favor of "Not quite" (the Bible permits "wrong" to appear
 *   at most once; omitting it entirely is a strictly safer, still-
 *   compliant choice, flagged here as the judgment call it is).
 *
 * FLAGGED DEVIATION FROM CH.15 SS15.3 (documented per Ch.67 SS67.3):
 * This lesson does not include a choice moment, even though Gist Mode
 * permits up to one (Rule 37.4.1) and Ch.15 SS15.3 calls it Gist Mode's
 * "signature interaction." Every choice-point phrasing drafted for this
 * lesson risked drifting toward asking the reader to confirm/deny their
 * own prior belief ("did you think X?"), which sits too close to Rule
 * 1.3.1's ban on attributing a myth to the specific reader even when
 * framed as a low-stakes, optional reply choice. Per Ch.1 SS1.9's
 * precedence order (psychological safety outranks polish/retention
 * mechanics), this lesson ships without a choice moment rather than with
 * a borderline one. A future authoring pass should revisit choice-moment
 * phrasing for this lesson with more room to get it unambiguously safe --
 * e.g. anchored to the myth's prevalence ("people say this constantly")
 * rather than the reader's own history with it.
 */

import type { Lesson } from "../../types/content";

export const track1Lesson1: Lesson = {
  id: "track-1-lesson-1",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 1,
  mode: "gist",
  title: "What HIV Actually Is",
  beats: [
    {
      beatId: "hook",
      function: "HOOK",
      speaker: "zara",
      text: "HIV and AIDS get mixed up constantly. Let's actually pull them apart.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
    {
      beatId: "buggy-welcome",
      function: "BREAK",
      speaker: "buggy",
      text: "First lesson of this track — Zara's got it from here.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
    {
      beatId: "myth1",
      function: "MYTH",
      speaker: "zara",
      text: "A lot of people think HIV and AIDS are just two names for the same thing.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
    {
      beatId: "fact1",
      function: "FACT",
      speaker: "zara",
      text: "Fair mix-up — the terms get used interchangeably all the time. But AIDS is a late stage that only happens if HIV goes untreated for years. With today's treatment, most people on HIV never get there.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: "myth1",
    },
    {
      beatId: "break-bello",
      function: "BREAK",
      speaker: "bello",
      text: "Honestly the aunty group chat needs a fact-checker.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
    {
      beatId: "myth2",
      function: "MYTH",
      speaker: "zara",
      text: "There's also a rumor going around that HIV attacks the body randomly — skin, bones, whatever's nearby.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
    {
      beatId: "fact2",
      function: "FACT",
      speaker: "zara",
      text: "Not random at all. HIV specifically targets the immune system — the CD4 cells whose whole job is protecting you from everything else.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: "myth2",
    },
    {
      beatId: "close",
      function: "CLOSE",
      speaker: "zara",
      text: "That's the actual difference, in full. Quiz time — let's see if it stuck.",
      isChoicePoint: false,
      choiceOptions: null,
      pairsWithBeatId: null,
    },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: HIV and AIDS mean the same thing.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Exactly — AIDS is a late stage, not another name for HIV.",
        incorrectFeedback:
          "Not quite — AIDS is a late stage that only happens if HIV goes untreated for years. With treatment today, most people never reach it.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Which part of the body does HIV mainly target?",
        options: ["The skin", "The immune system", "The bones"],
        correctOptionIndex: 1,
        correctFeedback: "That's the one — the immune system, specifically CD4 cells.",
        incorrectFeedback:
          "HIV specifically targets the immune system — the CD4 cells whose job is protecting you from everything else, not the skin or bones.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "With modern treatment, how often does HIV progress to AIDS?",
        options: ["Very rarely", "Almost always", "Only in children"],
        correctOptionIndex: 0,
        correctFeedback: "Right — with consistent treatment, it very rarely gets there.",
        incorrectFeedback:
          "With today's treatment, HIV very rarely progresses to AIDS at all — one of the biggest shifts in how this gets managed now.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "fact1",
        prompt: "What's the real relationship between HIV and AIDS?",
        options: ["They're the same thing", "AIDS is a late, untreated stage of HIV", "They're unrelated"],
        correctOptionIndex: 1,
        correctFeedback: "Exactly that — related, not identical, not unrelated either.",
        incorrectFeedback:
          "AIDS is a late stage that only happens if HIV goes untreated for a long time — related to HIV, not identical to it, and not unrelated either.",
      },
    ],
  },
};

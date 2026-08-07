/**
 * Track 1, Lesson 3 -- "Myths vs. Facts". Zara-hosted, Gist Mode. Three
 * MYTH/FACT pairs (the max Ch.34 SS34.3 permits) -- appropriate given the
 * lesson's own title. 107/150 words. Bello's BREAK sits after FACT2, not
 * after a MYTH beat, not before CLOSE (Rule 35.2.2).
 */
import type { Lesson } from "../../types/content";

export const track1Lesson3: Lesson = {
  id: "track-1-lesson-3",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 3,
  mode: "gist",
  title: "Myths vs. Facts",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Let's run through the big ones people still get wrong.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "zara", text: "Some people think mosquito bites can give you HIV.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "They can't — HIV doesn't survive or reproduce inside insects, so a mosquito can't pass it on.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "myth2", function: "MYTH", speaker: "zara", text: "There's also the idea that you can just tell, by looking at someone, if they have HIV.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "You really can't. Most people with HIV look completely healthy — especially anyone on treatment.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth2" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So no detective work required, thankfully.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth3", function: "MYTH", speaker: "zara", text: "And the big one — that HIV is basically a death sentence.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact3", function: "FACT", speaker: "zara", text: "Not anymore. People on treatment live long, full lives — this fear is mostly left over from decades ago.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth3" },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "Three myths down. Let's check what stuck.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Can you get HIV from a mosquito bite?",
        options: ["Yes", "No"],
        correctOptionIndex: 1,
        correctFeedback: "Right — mosquitoes can't transmit it.",
        incorrectFeedback: "HIV doesn't survive or reproduce inside insects, so a mosquito bite can't give you HIV.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Can you always tell if someone has HIV just by looking at them?",
        options: ["Yes", "No"],
        correctOptionIndex: 1,
        correctFeedback: "Exactly — you really can't tell.",
        incorrectFeedback: "Most people with HIV look completely healthy, especially anyone on treatment — there's no reliable 'look.'",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact3",
        prompt: "Is HIV still considered a death sentence today?",
        options: ["Yes, usually", "No, not with treatment"],
        correctOptionIndex: 1,
        correctFeedback: "Right — with treatment, people live long, full lives.",
        incorrectFeedback: "Not anymore — people on treatment live long, full lives. That fear is left over from decades ago, before modern treatment existed.",
      },
    ],
  },
};

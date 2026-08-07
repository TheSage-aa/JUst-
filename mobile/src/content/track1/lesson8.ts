/**
 * Track 1, Lesson 8 -- "The Cost of Silence". Zara-hosted, Gist Mode.
 * 71/150 words. Both FACT beats are standalone (about consequences, not a
 * specific named myth being corrected -- Ch.34 SS34.2 item 3's documented
 * exception; not fabricated per Ch.36 SS36.2 item 2's warning against
 * inventing a myth just to fit the pattern).
 */
import type { Lesson } from "../../types/content";

export const track1Lesson8: Lesson = {
  id: "track-1-lesson-8",
  trackId: "track-1-hiv-stigma",
  lessonNumber: 8,
  mode: "gist",
  title: "The Cost of Silence",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "zara", text: "Silence has a cost too — not just the virus itself.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "zara", text: "Fear of stigma is one of the top reasons people delay or avoid HIV testing in the first place.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Wild that gossip does more damage than the actual virus, honestly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "zara", text: "For someone on treatment, the shame and silence can actually weigh heavier day to day than the virus does.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "zara", text: "Breaking silence starts with facts — which is what this whole track is doing. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: fear of stigma can make people avoid testing.",
        options: ["True", "False"],
        correctOptionIndex: 0,
        correctFeedback: "Right — fear of stigma is a major driver of testing avoidance.",
        incorrectFeedback: "Fear of stigma is one of the top reasons people delay or avoid HIV testing — it's a real, common barrier.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "For someone on treatment, what can feel heavier day-to-day than the virus itself?",
        options: ["Silence and shame", "Taking daily medication"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — silence and shame.",
        incorrectFeedback: "Silence and shame can be more damaging, day to day, than the virus itself when someone is on treatment — that's the real cost of silence.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "What does breaking silence around HIV start with?",
        options: ["Accurate information", "Avoiding the topic entirely"],
        correctOptionIndex: 0,
        correctFeedback: "Right — accurate information.",
        incorrectFeedback: "Breaking silence starts with accurate information — which is exactly what this track exists to give you.",
      },
    ],
  },
};

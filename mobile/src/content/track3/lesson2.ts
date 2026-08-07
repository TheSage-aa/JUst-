/**
 * Track 3, Lesson 2 -- "Recognizing Anxiety". Nana-hosted, Gist Mode.
 * 86/150 words. Signs are described in general/educational terms only --
 * never framed as "does this sound like you," per Ch.1 SS1.7.2.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson2: Lesson = {
  id: "track-3-lesson-2",
  trackId: "track-3-mental-health",
  lessonNumber: 2,
  mode: "gist",
  title: "Recognizing Anxiety",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Anxiety gets used as a catch-all word. Let's get specific.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "People sometimes assume any nervousness before something big means an anxiety disorder.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "Occasional worry is normal. It's when it's persistent, or it disrupts daily life, that it's worth paying attention to.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Racing heart before a test: normal. Racing heart because a lizard just ran past: also normal, honestly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "It can show up as constant worry, restlessness, trouble sleeping, or physical things like a racing heart.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "And it's treatable — from small self-help steps to professional care. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: occasional worry before a big event is always a sign of an anxiety disorder.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — occasional worry is normal.",
        incorrectFeedback: "Occasional worry is normal — it's persistent worry that disrupts daily life that's worth paying attention to.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "How can anxiety show up?",
        options: ["Constant worry, restlessness, trouble sleeping, or physical symptoms", "Only as visible panic in public"],
        correctOptionIndex: 0,
        correctFeedback: "Right — it can show up in a lot of ways.",
        incorrectFeedback: "Anxiety can show up as constant worry, restlessness, trouble sleeping, or physical symptoms like a racing heart — not just visible panic.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "Is anxiety treatable?",
        options: ["Yes, from self-help to professional care", "No, there's nothing to be done"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it's treatable.",
        incorrectFeedback: "Anxiety is treatable — support ranges from self-help techniques to professional care.",
      },
    ],
  },
};

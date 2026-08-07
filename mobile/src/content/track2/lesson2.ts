/**
 * Track 2, Lesson 2 -- "The Menstrual Cycle, Explained". Kemi-hosted, Gist
 * Mode. 92/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson2: Lesson = {
  id: "track-2-lesson-2",
  trackId: "track-2-srh",
  lessonNumber: 2,
  mode: "gist",
  title: "The Menstrual Cycle, Explained",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Genuine question I used to have: is a 28-day cycle the only 'normal' one?", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "There's this idea that anything other than a clean 28-day cycle means something's wrong.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "Not true — cycles typically run anywhere from 21 to 35 days, driven by hormonal changes that prepare the body for possible pregnancy. Irregular cycles are common, not automatically a problem.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "So no, your body isn't broken because it doesn't follow a calendar app.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Understanding your own cycle actually helps with both planning and just general health awareness.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's the cycle, actually explained. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: a 28-day cycle is the only healthy length.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — cycles vary widely and that's normal.",
        incorrectFeedback: "Cycles typically run anywhere from 21 to 35 days — 28 days isn't the only healthy length.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What does the menstrual cycle involve?",
        options: ["Hormonal changes preparing the body for possible pregnancy", "A random, purposeless process"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — hormonal changes with a real purpose.",
        incorrectFeedback: "The menstrual cycle involves hormonal changes that prepare the body for possible pregnancy — it's not random.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Why does understanding your own cycle matter?",
        options: ["It helps with planning and general health awareness", "It has no practical use"],
        correctOptionIndex: 0,
        correctFeedback: "Right — planning and health awareness.",
        incorrectFeedback: "Understanding your own cycle helps with both reproductive planning and general health awareness.",
      },
    ],
  },
};

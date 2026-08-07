/**
 * Track 4, Lesson 8 -- "Getting Tested & Treated". Dr. Ayo-hosted, Gist
 * Mode. 90/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson8: Lesson = {
  id: "track-4-lesson-8",
  trackId: "track-4-stis",
  lessonNumber: 8,
  mode: "gist",
  title: "Getting Tested & Treated",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Testing and treatment sound scarier than they actually are. Let's break it down.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "People sometimes assume every STI gets treated — or cured — the exact same way.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "Not quite. Most bacterial STIs are cured with a course of antibiotics. Viral ones, like herpes and HPV, are managed rather than cured — but still effectively controlled.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Different problems, different toolkits. Makes sense when you say it out loud.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "And testing itself is usually just a simple swab, urine sample, or blood test, depending on what's being checked.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "Less mysterious than it sounds. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: all STIs are cured the same way.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — bacterial and viral STIs are handled differently.",
        incorrectFeedback: "Most bacterial STIs are cured with antibiotics, while viral STIs like herpes and HPV are managed rather than cured.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "How are most bacterial STIs treated?",
        options: ["A course of antibiotics", "There's no treatment"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a course of antibiotics.",
        incorrectFeedback: "Most bacterial STIs are cured with a course of antibiotics.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What does STI testing typically involve?",
        options: ["A simple swab, urine sample, or blood test", "A lengthy, invasive procedure"],
        correctOptionIndex: 0,
        correctFeedback: "Right — usually quite simple.",
        incorrectFeedback: "STI testing typically involves a simple swab, urine sample, or blood test depending on the STI.",
      },
    ],
  },
};

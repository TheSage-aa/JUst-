/**
 * Track 4, Lesson 5 -- "Herpes: Facts Over Fear". Dr. Ayo-hosted, Gist
 * Mode. 78/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson5: Lesson = {
  id: "track-4-lesson-5",
  trackId: "track-4-stis",
  lessonNumber: 5,
  mode: "gist",
  title: "Herpes: Facts Over Fear",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Herpes carries more stigma than almost anything on this list. Let's fix the record.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "There's a real fear that it's dangerous — even that it shortens your life.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "It doesn't affect life expectancy at all. It's a common viral infection, manageable long-term with treatment.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Extremely common, extremely overhyped in the fear department.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "A lot of people with it have mild or no symptoms and don't even know they have it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "Facts over fear — that's the whole point here. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: herpes affects life expectancy.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it doesn't affect life expectancy.",
        incorrectFeedback: "Herpes does not affect life expectancy and can be managed effectively long-term.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Do many people with herpes have mild or no symptoms?",
        options: ["Yes", "No, symptoms are always severe"],
        correctOptionIndex: 0,
        correctFeedback: "Right — many have mild or no symptoms.",
        incorrectFeedback: "Many people with herpes have mild or no symptoms and don't know they have it.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact1",
        prompt: "Is herpes manageable with treatment?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — manageable long-term.",
        incorrectFeedback: "Herpes is a common viral infection that causes outbreaks but is manageable with treatment.",
      },
    ],
  },
};

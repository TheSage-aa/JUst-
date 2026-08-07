/**
 * Track 4, Lesson 7 -- "Prevention That Actually Works". Dr. Ayo-hosted,
 * Gist Mode. 74/150 words.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson7: Lesson = {
  id: "track-4-lesson-7",
  trackId: "track-4-stis",
  lessonNumber: 7,
  mode: "gist",
  title: "Prevention That Actually Works",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Let's talk prevention — what actually moves the needle.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "People sometimes treat condoms as a complete, 100% guarantee against STIs.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "They significantly reduce risk for most STIs — but don't eliminate it completely. Worth knowing, not a reason to skip them.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Nothing in life is 100%, except maybe Bello's love for snacks.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "Regular testing, especially with new or multiple partners, is just as core to prevention as condoms are.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's real prevention, minus the overpromising. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: condoms eliminate all STI risk completely.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they reduce risk significantly, but not to zero.",
        incorrectFeedback: "Condoms significantly reduce risk for most STIs, but they don't eliminate it completely.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What's a core STI prevention strategy alongside condoms?",
        options: ["Regular testing, especially with new or multiple partners", "Avoiding the topic entirely"],
        correctOptionIndex: 0,
        correctFeedback: "Right — regular testing is core too.",
        incorrectFeedback: "Regular testing, especially with new or multiple partners, is a core prevention strategy alongside condoms.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Is open communication with partners about testing history a healthy practice?",
        options: ["Yes", "No, it's better left unsaid"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — a normal, healthy practice.",
        incorrectFeedback: "Open communication with partners about testing history is a normal, healthy practice.",
      },
    ],
  },
};

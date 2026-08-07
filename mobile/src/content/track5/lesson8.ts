/**
 * Track 5, Lesson 8 -- "Chronic Illness & Mental Health". Tunde-hosted,
 * Gist Mode. 91/150 words.
 *
 * Cross-track reference (Ch.28 SS28.1): names the Mental Health track by
 * text reference only -- Nana does not appear/speak in this scene, this
 * lesson stays fully Tunde-hosted.
 *
 * Emotional pacing (Ch.6 SS6.3): acknowledges the emotional weight briefly
 * and specifically, then pivots to agency (support communities, the
 * Mental Health track) within the same lesson rather than dwelling.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson8: Lesson = {
  id: "track-5-lesson-8",
  trackId: "track-5-chronic",
  lessonNumber: 8,
  mode: "gist",
  title: "Chronic Illness & Mental Health",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Let's talk about the part of chronic illness that's less visible.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "tunde", text: "There's an idea that feeling emotionally tired from managing this long-term is unusual, even a bit dramatic.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "It's not. That kind of burnout is a real, recognized experience — completely normal, not a sign anything's wrong with you.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Managing a condition every single day is a whole job nobody applied for.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Support communities, and Saabi's Mental Health track, are both a valid part of chronic condition care — not something separate or optional.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "Taking care of that side of it counts too. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: feeling emotionally tired from managing a chronic condition long-term is unusual and abnormal.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it's a normal, recognized experience.",
        incorrectFeedback: "Feeling emotionally tired from managing a chronic condition long-term is a normal, valid experience, not something unusual or abnormal.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Is burnout from constant self-management a recognized phenomenon?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — it's a recognized experience.",
        incorrectFeedback: "Burnout from constant self-management is a recognized phenomenon, sometimes called 'diabetes burnout' or similar.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Are support communities and mental health resources a valid part of chronic condition care?",
        options: ["Yes", "No, they're unrelated"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — a valid, real part of care.",
        incorrectFeedback: "Support communities and mental health resources are a valid part of chronic condition care, not something separate.",
      },
    ],
  },
};

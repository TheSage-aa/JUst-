/**
 * Track 2, Lesson 7 -- "STIs & SRH: Where They Overlap". Kemi-hosted, Gist
 * Mode. 81/150 words. Per Ch.28 SS28.1, Kemi remains the host even though
 * this lesson bridges toward Track 4 (STIs Beyond HIV) -- it only
 * *references* Dr. Ayo's track by name, no host handoff.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson7: Lesson = {
  id: "track-2-lesson-7",
  trackId: "track-2-srh",
  lessonNumber: 7,
  mode: "gist",
  title: "STIs & SRH: Where They Overlap",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Real question — if you had an STI, would you definitely know?", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "People assume there'd always be some visible symptom to tip you off.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "Not always — some STIs show no visible symptoms at all, which is exactly why regular testing matters even when nothing feels wrong.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "No symptoms doesn't mean no stakes, basically.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Good news: barrier methods like condoms prevent a lot of this. And there's a whole track — STIs Beyond HIV — that goes deeper.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's the overlap, mapped out. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Can you have an STI with no visible symptoms?",
        options: ["Yes", "No, there are always symptoms"],
        correctOptionIndex: 0,
        correctFeedback: "Right — many STIs show no visible symptoms.",
        incorrectFeedback: "Some STIs have no visible symptoms at all, which is exactly why regular testing matters even without symptoms.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What can help prevent many STIs?",
        options: ["Barrier methods like condoms", "Nothing really prevents them"],
        correctOptionIndex: 0,
        correctFeedback: "Right — barrier methods like condoms.",
        incorrectFeedback: "Many STIs are preventable with barrier methods like condoms.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Which track goes deeper into STIs specifically?",
        options: ["STIs Beyond HIV", "This same track"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — STIs Beyond HIV.",
        incorrectFeedback: "STIs Beyond HIV is the track that goes deeper into this — this lesson is just where SRH and STI risk overlap.",
      },
    ],
  },
};

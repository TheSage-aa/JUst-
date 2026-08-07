/**
 * Track 4, Lesson 10 -- "Bringing It Together" (mixed review). Dr.
 * Ayo-hosted, Gist Mode. 81/150 words. Same self-contained-recap
 * resolution as the other tracks' lesson10.ts.
 */
import type { Lesson } from "../../types/content";

export const track4Lesson10: Lesson = {
  id: "track-4-lesson-10",
  trackId: "track-4-stis",
  lessonNumber: 10,
  mode: "gist",
  title: "Bringing It Together",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Nine lessons of STI facts. Let's tie it together, quickly.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-bacterial", function: "FACT", speaker: "dr_ayo", text: "Chlamydia, gonorrhea, and syphilis are all bacterial and treatable with antibiotics, especially caught early.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-viral", function: "FACT", speaker: "dr_ayo", text: "HPV has a vaccine, and herpes doesn't affect life expectancy — both far more common than their reputations suggest.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically: most of this list is way less dramatic than its reputation.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-testing", function: "FACT", speaker: "dr_ayo", text: "Since many STIs cause no symptoms, regular testing — not waiting to feel something — is what actually tells you your status.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's the whole track, condensed. Last quiz.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "recap-testing",
        prompt: "Mixed review — which STIs can be symptomless?",
        options: ["Many of them, including chlamydia and HPV", "None — all STIs cause visible symptoms"],
        correctOptionIndex: 0,
        correctFeedback: "Right — many STIs, including chlamydia and HPV, are often symptomless.",
        incorrectFeedback: "Many STIs, including chlamydia and HPV, are often symptomless — not all STIs cause visible symptoms.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "recap-testing",
        prompt: "Mixed review — is regular testing important even without symptoms?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — testing matters regardless of symptoms.",
        incorrectFeedback: "Regular testing is important even without symptoms, since many STIs are symptomless.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "recap-bacterial",
        prompt: "Mixed review — are chlamydia, gonorrhea, and syphilis treatable?",
        options: ["Yes, with antibiotics", "No, there's no treatment"],
        correctOptionIndex: 0,
        correctFeedback: "Right — all treatable with antibiotics.",
        incorrectFeedback: "Chlamydia, gonorrhea, and syphilis are all bacterial and treatable with antibiotics, especially caught early.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "recap-viral",
        prompt: "Mixed review — does a vaccine exist for HPV?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a vaccine exists for HPV.",
        incorrectFeedback: "A vaccine exists that protects against the HPV strains most linked to certain cancers.",
      },
    ],
  },
};

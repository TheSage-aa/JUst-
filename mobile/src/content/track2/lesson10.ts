/**
 * Track 2, Lesson 10 -- "Bringing It Together" (mixed review). Kemi-hosted,
 * Gist Mode. 87/150 words. Same self-contained-recap resolution as Track
 * 1's lesson10.ts for the Ch.5 SS5.3 vs Ch.39 SS39.3 schema tension.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson10: Lesson = {
  id: "track-2-lesson-10",
  trackId: "track-2-srh",
  lessonNumber: 10,
  mode: "gist",
  title: "Bringing It Together",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Nine lessons in. Let's tie it all together, fast.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-body", function: "FACT", speaker: "kemi", text: "Puberty and cycles both vary a lot — there's no single 'normal' timeline or length for either.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-contraception", function: "FACT", speaker: "kemi", text: "Condoms are the only method that also protects against STIs — other options just prevent pregnancy.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-consent", function: "FACT", speaker: "kemi", text: "Consent is freely given, ongoing, and can be withdrawn any time — silence isn't consent.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically: ask, listen, and don't assume — every single time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-rights", function: "FACT", speaker: "kemi", text: "Reproductive rights — accurate info, access, bodily autonomy — apply to everyone, not just married adults.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's the whole track, in short. Last quiz — let's make it count.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "recap-contraception",
        prompt: "Mixed review — which of these is a form of contraception that also prevents STIs?",
        options: ["Condoms", "IUD"],
        correctOptionIndex: 0,
        correctFeedback: "Right — condoms are the only method that also protects against STIs.",
        incorrectFeedback: "Condoms are the only contraceptive method that also protects against STIs — an IUD only prevents pregnancy.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "recap-consent",
        prompt: "Mixed review — consent can be withdrawn at any point.",
        options: ["True", "False"],
        correctOptionIndex: 0,
        correctFeedback: "Right — at any point, no exceptions.",
        incorrectFeedback: "Consent is ongoing and can be withdrawn at any point — it's never locked in once given.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "recap-body",
        prompt: "Mixed review — is there one single 'normal' cycle length for everyone?",
        options: ["No, cycles vary widely", "Yes, exactly 28 days"],
        correctOptionIndex: 0,
        correctFeedback: "Right — cycles vary widely, and that's normal.",
        incorrectFeedback: "Cycles typically run anywhere from 21 to 35 days — there's no single 'normal' 28-day length.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "recap-rights",
        prompt: "Mixed review — who do reproductive rights apply to?",
        options: ["Everyone, regardless of marital status", "Only married adults"],
        correctOptionIndex: 0,
        correctFeedback: "Right — regardless of marital status.",
        incorrectFeedback: "Reproductive rights apply regardless of gender, marital status, or age-of-consent context — not just to married adults.",
      },
    ],
  },
};

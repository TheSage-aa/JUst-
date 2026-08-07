/**
 * Track 2, Lesson 3 -- "Contraception: The Basic Options". Kemi-hosted,
 * Gist Mode. 86/150 words.
 */
import type { Lesson } from "../../types/content";

export const track2Lesson3: Lesson = {
  id: "track-2-lesson-3",
  trackId: "track-2-srh",
  lessonNumber: 3,
  mode: "gist",
  title: "Contraception: The Basic Options",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "kemi", text: "Quick one — does the pill protect against STIs the same way condoms do?", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "kemi", text: "A lot of people assume any contraception method also covers STI protection.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "kemi", text: "Only condoms actually do both. Other options — pills, injectables, implants, IUDs, permanent methods — prevent pregnancy but don't protect against STIs at all.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Multitasking king, honestly. Condoms really said 'I got you twice.'", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "kemi", text: "Effectiveness and side effects vary a lot by method, which is exactly the kind of thing worth talking through with a provider.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "kemi", text: "That's the basic map of options. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Which contraceptive method also protects against STIs?",
        options: ["Condoms", "The contraceptive pill"],
        correctOptionIndex: 0,
        correctFeedback: "Right — condoms are the only one that does both.",
        incorrectFeedback: "Condoms are the only method that also protects against STIs — other options like the pill only prevent pregnancy.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "Do IUDs protect against STIs?",
        options: ["Yes", "No"],
        correctOptionIndex: 1,
        correctFeedback: "Right — no.",
        incorrectFeedback: "IUDs, like other non-condom methods, prevent pregnancy but don't protect against STIs at all.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Who should you talk through contraception effectiveness and side effects with?",
        options: ["A health provider", "No one, it's obvious"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — a health provider.",
        incorrectFeedback: "Effectiveness and side effects vary by method, which is exactly the kind of thing worth talking through with a health provider.",
      },
    ],
  },
};

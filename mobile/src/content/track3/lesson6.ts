/**
 * Track 3, Lesson 6 -- "The Weight of Stigma on Mental Health". Nana-hosted,
 * Gist Mode. 83/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson6: Lesson = {
  id: "track-3-lesson-6",
  trackId: "track-3-mental-health",
  lessonNumber: 6,
  mode: "gist",
  title: "The Weight of Stigma on Mental Health",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Stigma around this doesn't always look obvious. Let's name it.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "People sometimes don't realize that dismissing someone — 'just get over it' — counts as stigma too.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "It does. Stigma shows up as dismissiveness, or shame around even seeking help in the first place.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "'Just get over it' has never once fixed anything, ever, in the history of feelings.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "It's one of the top reasons people delay getting support — and pushing back on it, even in small conversations, actually helps.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Naming it is most of the work. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "Can dismissing someone's mental health struggle be a form of stigma?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — dismissiveness counts as stigma.",
        incorrectFeedback: "Mental health stigma often shows up as dismissiveness, like telling someone to 'just get over it' — that counts as stigma too.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "Is stigma a top reason people delay seeking mental health support?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — it's one of the top reasons.",
        incorrectFeedback: "Stigma is one of the top reasons people delay seeking mental health support.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "What helps push back on stigma?",
        options: ["Challenging it in everyday conversations", "Avoiding the topic entirely"],
        correctOptionIndex: 0,
        correctFeedback: "Right — everyday conversations matter.",
        incorrectFeedback: "Challenging stigma in everyday conversations creates safer environments for everyone.",
      },
    ],
  },
};

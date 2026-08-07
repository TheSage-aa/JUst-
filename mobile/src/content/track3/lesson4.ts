/**
 * Track 3, Lesson 4 -- "Stress vs. Burnout". Nana-hosted, Gist Mode.
 * 80/150 words.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson4: Lesson = {
  id: "track-3-lesson-4",
  trackId: "track-3-mental-health",
  lessonNumber: 4,
  mode: "gist",
  title: "Stress vs. Burnout",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Quick distinction that actually matters: stress and burnout aren't the same thing.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "nana", text: "People often use the two words interchangeably, like they're describing the same experience.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "nana", text: "They're not. Stress is a short-term response to pressure. Burnout is prolonged exhaustion from stress that's gone unmanaged for a while.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Burnout: when even your favorite playlist feels like a chore.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "nana", text: "Burnout often brings cynicism, detachment, and a drop in effectiveness at things you're normally good at.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "Catching it early makes recovery faster and easier. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: burnout is the same as everyday, short-term stress.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — they're different things.",
        incorrectFeedback: "Stress is a short-term response to pressure; burnout is prolonged exhaustion from sustained, unmanaged stress — they're not the same.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact2",
        prompt: "What does burnout often include?",
        options: ["Cynicism, detachment, and a drop in effectiveness", "Just feeling a little tired"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are common signs of burnout.",
        incorrectFeedback: "Burnout often includes cynicism, detachment, and a drop in effectiveness at things you're normally good at.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "close",
        prompt: "Does recognizing burnout early help?",
        options: ["Yes, it makes recovery faster and easier", "No, it makes no difference"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — early recognition helps.",
        incorrectFeedback: "Recognizing burnout early makes recovery faster and easier — waiting until it's severe tends to make it harder to bounce back.",
      },
    ],
  },
};

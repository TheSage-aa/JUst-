/**
 * Track 3, Lesson 10 -- "Bringing It Together" (mixed review). Nana-hosted,
 * Gist Mode. 83/150 words. Same self-contained-recap resolution as the
 * other tracks' lesson10.ts for the Ch.5 SS5.3 vs Ch.39 SS39.3 tension.
 */
import type { Lesson } from "../../types/content";

export const track3Lesson10: Lesson = {
  id: "track-3-lesson-10",
  trackId: "track-3-mental-health",
  lessonNumber: 10,
  mode: "gist",
  title: "Bringing It Together",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "nana", text: "Nine lessons in. Let's bring it together, gently.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-basics", function: "FACT", speaker: "nana", text: "Mental health is part of everyone's overall health — struggling with it isn't a weakness.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-signs", function: "FACT", speaker: "nana", text: "Anxiety and depression have real, recognizable signs — and neither comes down to willpower.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically: feelings are data, not character flaws.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-support", function: "FACT", speaker: "nana", text: "Coping skills help, professional care helps more when it's needed, and supporting a friend isn't a solo job.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-crisis", function: "FACT", speaker: "nana", text: "And in a crisis, acting fast matters more than waiting to see if it passes.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "nana", text: "That's the whole track, gently put together. Last quiz.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "recap-signs",
        prompt: "Mixed review — persistent low mood and loss of interest in things you enjoy can be signs of:",
        options: ["Depression", "Normal daily tiredness only"],
        correctOptionIndex: 0,
        correctFeedback: "Right — those are recognizable signs of depression.",
        incorrectFeedback: "Persistent sadness and loss of interest in things you used to enjoy can be signs of depression, not just ordinary tiredness.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "recap-basics",
        prompt: "Mixed review — is mental health stigma a real barrier to people seeking help?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — stigma is a real, common barrier.",
        incorrectFeedback: "Stigma is one of the top reasons people delay seeking mental health support — it's a real barrier.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "recap-support",
        prompt: "Mixed review — are you personally responsible for fixing a friend's mental health condition?",
        options: ["No", "Yes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — that's not on you alone.",
        incorrectFeedback: "Encouraging professional support is appropriate, but you're not personally responsible for fixing a friend's condition alone.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "recap-crisis",
        prompt: "Mixed review — in a crisis, what matters most?",
        options: ["Acting on it right away", "Waiting to see if it passes"],
        correctOptionIndex: 0,
        correctFeedback: "Right — acting right away matters most.",
        incorrectFeedback: "In a crisis, getting help right away matters more than waiting to see if it passes.",
      },
    ],
  },
};

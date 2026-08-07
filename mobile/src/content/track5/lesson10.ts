/**
 * Track 5, Lesson 10 -- "Bringing It Together" (mixed review). Tunde-hosted,
 * Gist Mode. 82/150 words. Same self-contained-recap resolution as every
 * other track's lesson10.ts.
 */
import type { Lesson } from "../../types/content";

export const track5Lesson10: Lesson = {
  id: "track-5-lesson-10",
  trackId: "track-5-chronic",
  lessonNumber: 10,
  mode: "gist",
  title: "Bringing It Together",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Nine lessons in. Let's pull it all together.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-sicklecell", function: "FACT", speaker: "tunde", text: "Sickle cell is inherited, not contagious — and with good management, a full, active life is absolutely realistic.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-diabetes", function: "FACT", speaker: "tunde", text: "Diabetes comes in different types, often with mild early signs — and good management means it doesn't have to limit your life.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Basically: both conditions are way more manageable than their reputations suggest.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "recap-wellbeing", function: "FACT", speaker: "tunde", text: "The emotional side of managing any of this is real too — and support for that counts as real care.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "That's the whole track, brought together. Last quiz.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "recap-sicklecell",
        prompt: "Mixed review — is sickle cell disease contagious?",
        options: ["No, it's inherited genetically", "Yes, it spreads between people"],
        correctOptionIndex: 0,
        correctFeedback: "Right — inherited, not contagious.",
        incorrectFeedback: "Sickle cell disease is not contagious — it's inherited genetically, passed from parents to children.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "recap-diabetes",
        prompt: "Mixed review — can a person live a full life with good diabetes management?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — a full life is realistic with good management.",
        incorrectFeedback: "With good management, diabetes doesn't have to limit a person's quality of life — a full life is realistic.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "recap-sicklecell",
        prompt: "Mixed review — with good management, can people with sickle cell live full, active lives?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — full, active lives are realistic.",
        incorrectFeedback: "With good management, people with sickle cell can live full, active lives.",
      },
      {
        questionId: "q4",
        mapsToBeatId: "recap-wellbeing",
        prompt: "Mixed review — is it unusual to feel emotionally tired from managing a chronic condition long-term?",
        options: ["No, it's a normal, recognized experience", "Yes, it's abnormal"],
        correctOptionIndex: 0,
        correctFeedback: "Right — completely normal and recognized.",
        incorrectFeedback: "Feeling emotionally tired from managing a chronic condition long-term is a normal, recognized experience, not something abnormal.",
      },
    ],
  },
};

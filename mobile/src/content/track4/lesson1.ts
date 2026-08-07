/**
 * Track 4 (STIs Beyond HIV), Lesson 1 -- "STIs: The Big Picture".
 * Dr. Ayo-hosted, Gist Mode. Source: docs/tracks/track-4-stis-beyond-hiv.md.
 * 82/150 words.
 *
 * Dr. Ayo Voice Test (Ch.25 SS25.5): no second-person directive anywhere;
 * every line checked against "would this sound normal said out loud,
 * casually, to a friend" rather than reading like a textbook hedge;
 * precision kept fully intact (Anti-Pattern 10.4's specific risk for him).
 */
import type { Lesson } from "../../types/content";

export const track4Lesson1: Lesson = {
  id: "track-4-lesson-1",
  trackId: "track-4-stis",
  lessonNumber: 1,
  mode: "gist",
  title: "STIs: The Big Picture",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "dr_ayo", text: "Let's zoom out on STIs for a second — the big picture first.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "myth1", function: "MYTH", speaker: "dr_ayo", text: "Somewhere along the way, people started treating an STI like a verdict on someone's character.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "dr_ayo", text: "It's not that at all. An STI is a health matter — an infection passed through sexual contact, nothing more, nothing less.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: "myth1" },
    { beatId: "break-bello", function: "BREAK", speaker: "bello", text: "Catching a cold doesn't say anything about your character either. Same logic.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "dr_ayo", text: "And here's the actual good news: most STIs are common, and highly treatable, especially caught early.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "dr_ayo", text: "That's the big picture. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact1",
        prompt: "True or false: having an STI reflects a person's moral character.",
        options: ["True", "False"],
        correctOptionIndex: 1,
        correctFeedback: "Right — it's a health matter, not a character issue.",
        incorrectFeedback: "An STI is a health matter — an infection passed through sexual contact — not a reflection of someone's character.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What is an STI?",
        options: ["An infection passed between people primarily through sexual contact", "A sign of poor moral judgment"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — an infection, nothing more.",
        incorrectFeedback: "An STI is simply an infection passed between people primarily through sexual contact — not a judgment on anyone.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact2",
        prompt: "Are most STIs treatable, especially when caught early?",
        options: ["Yes", "No"],
        correctOptionIndex: 0,
        correctFeedback: "Right — highly treatable, especially early.",
        incorrectFeedback: "Many STIs are very common and highly treatable, especially when caught early.",
      },
    ],
  },
};

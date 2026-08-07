/**
 * Track 5, Lesson 4 -- "Understanding Sickle Cell Crises". Tunde-hosted,
 * Gist Mode. 70/150 words.
 *
 * FLAGGED COMPLIANCE DECISIONS (Ch.67 SS67.3), same reasoning as Track 3
 * Lesson 9 and Track 2 Lesson 4:
 * 1. No Bello beat -- a pain-crisis topic is serious enough that even a
 *    careful joke risks undercutting it.
 * 2. No MYTH/FACT pairs -- this states what a crisis is and when it needs
 *    urgent care plainly, rather than forcing a myth-correction frame
 *    onto safety information (Ch.34 SS34.3's documented exception).
 * 3. "Severe or prolonged crises call for urgent medical attention" is
 *    phrased as a fact/option statement, not a second-person directive
 *    ("you must go to hospital") -- consistent with Dr. Ayo's pattern
 *    elsewhere in the corpus (Rule 1.5.1).
 */
import type { Lesson } from "../../types/content";

export const track5Lesson4: Lesson = {
  id: "track-5-lesson-4",
  trackId: "track-5-chronic",
  lessonNumber: 4,
  mode: "gist",
  title: "Understanding Sickle Cell Crises",
  beats: [
    { beatId: "hook", function: "HOOK", speaker: "tunde", text: "Let's talk about what a sickle cell crisis actually is.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact1", function: "FACT", speaker: "tunde", text: "A crisis is an episode of severe pain, caused by blocked blood flow — a real, physical event, not something to downplay.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact2", function: "FACT", speaker: "tunde", text: "Triggers can include dehydration, extreme temperatures, or infection — some of it is manageable day to day.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "fact3", function: "FACT", speaker: "tunde", text: "Severe or prolonged crises call for urgent medical attention — that's the clear line to know.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
    { beatId: "close", function: "CLOSE", speaker: "tunde", text: "Knowing the signs is what makes this manageable. Quiz time.", isChoicePoint: false, choiceOptions: null, pairsWithBeatId: null },
  ],
  quiz: {
    questions: [
      {
        questionId: "q1",
        mapsToBeatId: "fact2",
        prompt: "True or false: a sickle cell crisis can be triggered by dehydration.",
        options: ["True", "False"],
        correctOptionIndex: 0,
        correctFeedback: "Right — dehydration is a known trigger.",
        incorrectFeedback: "A sickle cell crisis can be triggered by dehydration, extreme temperatures, or infection.",
      },
      {
        questionId: "q2",
        mapsToBeatId: "fact1",
        prompt: "What is a sickle cell crisis?",
        options: ["An episode of severe pain caused by blocked blood flow", "A minor, unnoticeable symptom"],
        correctOptionIndex: 0,
        correctFeedback: "Right — severe pain from blocked blood flow.",
        incorrectFeedback: "A sickle cell crisis is an episode of severe pain caused by blocked blood flow — a real, significant event.",
      },
      {
        questionId: "q3",
        mapsToBeatId: "fact3",
        prompt: "What do severe or prolonged crises call for?",
        options: ["Urgent medical attention", "Waiting it out at home"],
        correctOptionIndex: 0,
        correctFeedback: "Exactly — urgent medical attention.",
        incorrectFeedback: "Severe or prolonged crises call for urgent medical attention — that's the clear line to know.",
      },
    ],
  },
};

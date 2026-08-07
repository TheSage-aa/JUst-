/**
 * Lesson content schema -- Saabi Bible Ch.39 SS39.2, transcribed field-for-field,
 * plus the Ch.40 SS40.2 Drama Mode extension (panelDescription).
 *
 * Content is versioned and delivered/cached independently of Progress/Economy
 * (Rule 53.2.1) -- nothing in this file may reference a specific user.
 */

import type { CharacterId } from "../characters/characters";

export type BeatFunction = "HOOK" | "MYTH" | "FACT" | "BREAK" | "CLOSE";

export interface ChoiceOption {
  text: string;
  leadsToBeatId: string;
}

export interface Beat {
  beatId: string;
  function: BeatFunction;
  speaker: CharacterId;
  /** Must pass this speaker's Voice Test (Book III) before shipping -- see
   * the per-lesson authoring notes alongside each lesson file. */
  text: string;
  /** True only for Gist Mode, at most once per lesson (Rule 37.4.1). */
  isChoicePoint: boolean;
  choiceOptions: ChoiceOption[] | null;
  /** For FACT beats: references the paired MYTH beat's id (Ch.36). Null for
   * a rare standalone new-information FACT beat with no associated myth. */
  pairsWithBeatId: string | null;
  /** Drama Mode only (Ch.40 SS40.2): plain-language art direction note. */
  panelDescription?: string;
}

export interface QuizQuestion {
  questionId: string;
  /** Every question must reference the specific beat it tests (Ch.5 SS5.2). */
  mapsToBeatId: string;
  prompt: string;
  options: string[]; // 3-4 options
  correctOptionIndex: number;
  correctFeedback: string; // character-voiced, brief (Ch.16 SS16.3)
  incorrectFeedback: string; // character-voiced, restates the fact in full (Ch.1 SS1.4.1)
}

export interface Lesson {
  id: string;
  trackId: string;
  lessonNumber: number; // 1-10
  mode: "gist" | "drama";
  title: string;
  beats: Beat[];
  quiz: {
    questions: QuizQuestion[]; // 3-5 total (Ch.5 SS5.2)
  };
}

const WORD_RE = /\S+/g;

function wordCount(s: string): number {
  return (s.match(WORD_RE) || []).length;
}

/**
 * Validation rules an AI system must run before a lesson ships -- Ch.39 SS39.3,
 * items 1-6 (item 7, the per-beat Voice Test, is a content-authoring-time
 * human/AI judgment call documented alongside each lesson, not a mechanical
 * check -- see lesson1.ts's authoring notes).
 */
export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];

  const hooks = lesson.beats.filter((b) => b.function === "HOOK");
  const closes = lesson.beats.filter((b) => b.function === "CLOSE");
  if (hooks.length !== 1) errors.push(`Expected exactly one HOOK beat, found ${hooks.length}.`);
  if (closes.length !== 1) errors.push(`Expected exactly one CLOSE beat, found ${closes.length}.`);
  if (lesson.beats[0]?.function !== "HOOK") errors.push("HOOK beat must be first.");
  if (lesson.beats[lesson.beats.length - 1]?.function !== "CLOSE") errors.push("CLOSE beat must be last.");

  const beatIds = new Set(lesson.beats.map((b) => b.beatId));
  const mythIds = new Set(lesson.beats.filter((b) => b.function === "MYTH").map((b) => b.beatId));
  for (const beat of lesson.beats) {
    if (beat.function === "FACT" && beat.pairsWithBeatId !== null && !mythIds.has(beat.pairsWithBeatId)) {
      errors.push(`FACT beat "${beat.beatId}" pairsWithBeatId does not resolve to a MYTH beat in this lesson.`);
    }
  }

  const totalWords = lesson.beats.reduce((sum, b) => sum + wordCount(b.text), 0);
  if (totalWords > 150) errors.push(`Total beat word count is ${totalWords}, exceeds the 150-word ceiling (Ch.5 SS5.1).`);

  const choicePoints = lesson.beats.filter((b) => b.isChoicePoint);
  if (choicePoints.length > 1) errors.push(`Expected at most one choice-point beat, found ${choicePoints.length}.`);

  for (const q of lesson.quiz.questions) {
    if (!beatIds.has(q.mapsToBeatId)) {
      errors.push(`Quiz question "${q.questionId}" mapsToBeatId does not resolve to a beat in this lesson.`);
    }
  }
  if (lesson.quiz.questions.length < 3 || lesson.quiz.questions.length > 5) {
    errors.push(`Expected 3-5 quiz questions, found ${lesson.quiz.questions.length}.`);
  }

  return errors;
}

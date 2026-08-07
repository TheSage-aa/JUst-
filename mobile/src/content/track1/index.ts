/**
 * Track 1 (HIV & Stigma Basics) registry. All 10 lessons authored in the
 * full Ch.39 beat schema (Ch.68 SS68.1 step 3-4) -- see each lessonN.ts
 * for its own word-budget and rule-placement notes.
 */

import type { Lesson } from "../../types/content";
import { track1Lesson1 } from "./lesson1";
import { track1Lesson2 } from "./lesson2";
import { track1Lesson3 } from "./lesson3";
import { track1Lesson4 } from "./lesson4";
import { track1Lesson5 } from "./lesson5";
import { track1Lesson6 } from "./lesson6";
import { track1Lesson7 } from "./lesson7";
import { track1Lesson8 } from "./lesson8";
import { track1Lesson9 } from "./lesson9";
import { track1Lesson10 } from "./lesson10";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export const TRACK1_LESSON_SUMMARIES: LessonSummary[] = [
  { id: "track-1-lesson-1", lessonNumber: 1, title: "What HIV Actually Is" },
  { id: "track-1-lesson-2", lessonNumber: 2, title: "How HIV Is Actually Transmitted" },
  { id: "track-1-lesson-3", lessonNumber: 3, title: "Myths vs. Facts" },
  { id: "track-1-lesson-4", lessonNumber: 4, title: "Testing — What to Expect" },
  { id: "track-1-lesson-5", lessonNumber: 5, title: "Treatment Today: ART & Undetectable" },
  { id: "track-1-lesson-6", lessonNumber: 6, title: "U=U: Undetectable = Untransmittable" },
  { id: "track-1-lesson-7", lessonNumber: 7, title: "What Stigma Actually Looks Like" },
  { id: "track-1-lesson-8", lessonNumber: 8, title: "The Cost of Silence" },
  { id: "track-1-lesson-9", lessonNumber: 9, title: "Supporting Someone Living With HIV" },
  { id: "track-1-lesson-10", lessonNumber: 10, title: "Bringing It Together" },
];

export const TRACK1_LESSON_CONTENT: Record<string, Lesson> = {
  "track-1-lesson-1": track1Lesson1,
  "track-1-lesson-2": track1Lesson2,
  "track-1-lesson-3": track1Lesson3,
  "track-1-lesson-4": track1Lesson4,
  "track-1-lesson-5": track1Lesson5,
  "track-1-lesson-6": track1Lesson6,
  "track-1-lesson-7": track1Lesson7,
  "track-1-lesson-8": track1Lesson8,
  "track-1-lesson-9": track1Lesson9,
  "track-1-lesson-10": track1Lesson10,
};

export const TRACK1_META = {
  id: "track-1-hiv-stigma" as const,
  title: "HIV & Stigma Basics",
  hostCharacterId: "zara" as const,
  totalLessons: 10,
};

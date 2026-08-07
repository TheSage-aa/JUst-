/**
 * Track 5 (Chronic Conditions -- Sickle Cell & Diabetes) registry. All 10
 * lessons authored in the full Ch.39 beat schema, Tunde-hosted, Gist Mode.
 */

import type { Lesson } from "../../types/content";
import { track5Lesson1 } from "./lesson1";
import { track5Lesson2 } from "./lesson2";
import { track5Lesson3 } from "./lesson3";
import { track5Lesson4 } from "./lesson4";
import { track5Lesson5 } from "./lesson5";
import { track5Lesson6 } from "./lesson6";
import { track5Lesson7 } from "./lesson7";
import { track5Lesson8 } from "./lesson8";
import { track5Lesson9 } from "./lesson9";
import { track5Lesson10 } from "./lesson10";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export const TRACK5_LESSON_SUMMARIES: LessonSummary[] = [
  { id: "track-5-lesson-1", lessonNumber: 1, title: "What Is Sickle Cell Disease?" },
  { id: "track-5-lesson-2", lessonNumber: 2, title: "Sickle Cell Trait vs. Sickle Cell Disease" },
  { id: "track-5-lesson-3", lessonNumber: 3, title: "Living With Sickle Cell: Daily Management" },
  { id: "track-5-lesson-4", lessonNumber: 4, title: "Understanding Sickle Cell Crises" },
  { id: "track-5-lesson-5", lessonNumber: 5, title: "What Is Diabetes?" },
  { id: "track-5-lesson-6", lessonNumber: 6, title: "Recognizing the Signs of Diabetes" },
  { id: "track-5-lesson-7", lessonNumber: 7, title: "Living With Diabetes: Daily Management" },
  { id: "track-5-lesson-8", lessonNumber: 8, title: "Chronic Illness & Mental Health" },
  { id: "track-5-lesson-9", lessonNumber: 9, title: "Supporting Someone With a Chronic Condition" },
  { id: "track-5-lesson-10", lessonNumber: 10, title: "Bringing It Together" },
];

export const TRACK5_LESSON_CONTENT: Record<string, Lesson> = {
  "track-5-lesson-1": track5Lesson1,
  "track-5-lesson-2": track5Lesson2,
  "track-5-lesson-3": track5Lesson3,
  "track-5-lesson-4": track5Lesson4,
  "track-5-lesson-5": track5Lesson5,
  "track-5-lesson-6": track5Lesson6,
  "track-5-lesson-7": track5Lesson7,
  "track-5-lesson-8": track5Lesson8,
  "track-5-lesson-9": track5Lesson9,
  "track-5-lesson-10": track5Lesson10,
};

export const TRACK5_META = {
  id: "track-5-chronic" as const,
  title: "Chronic Conditions",
  hostCharacterId: "tunde" as const,
  totalLessons: 10,
};

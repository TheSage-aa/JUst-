/**
 * Track 4 (STIs Beyond HIV) registry. All 10 lessons authored in the full
 * Ch.39 beat schema, Dr. Ayo-hosted, Gist Mode.
 */

import type { Lesson } from "../../types/content";
import { track4Lesson1 } from "./lesson1";
import { track4Lesson2 } from "./lesson2";
import { track4Lesson3 } from "./lesson3";
import { track4Lesson4 } from "./lesson4";
import { track4Lesson5 } from "./lesson5";
import { track4Lesson6 } from "./lesson6";
import { track4Lesson7 } from "./lesson7";
import { track4Lesson8 } from "./lesson8";
import { track4Lesson9 } from "./lesson9";
import { track4Lesson10 } from "./lesson10";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export const TRACK4_LESSON_SUMMARIES: LessonSummary[] = [
  { id: "track-4-lesson-1", lessonNumber: 1, title: "STIs: The Big Picture" },
  { id: "track-4-lesson-2", lessonNumber: 2, title: "Chlamydia & Gonorrhea" },
  { id: "track-4-lesson-3", lessonNumber: 3, title: "Syphilis, Explained" },
  { id: "track-4-lesson-4", lessonNumber: 4, title: "HPV & Why It Matters" },
  { id: "track-4-lesson-5", lessonNumber: 5, title: "Herpes: Facts Over Fear" },
  { id: "track-4-lesson-6", lessonNumber: 6, title: "Why So Many STIs Have No Symptoms" },
  { id: "track-4-lesson-7", lessonNumber: 7, title: "Prevention That Actually Works" },
  { id: "track-4-lesson-8", lessonNumber: 8, title: "Getting Tested & Treated" },
  { id: "track-4-lesson-9", lessonNumber: 9, title: "Talking to a Partner About STIs" },
  { id: "track-4-lesson-10", lessonNumber: 10, title: "Bringing It Together" },
];

export const TRACK4_LESSON_CONTENT: Record<string, Lesson> = {
  "track-4-lesson-1": track4Lesson1,
  "track-4-lesson-2": track4Lesson2,
  "track-4-lesson-3": track4Lesson3,
  "track-4-lesson-4": track4Lesson4,
  "track-4-lesson-5": track4Lesson5,
  "track-4-lesson-6": track4Lesson6,
  "track-4-lesson-7": track4Lesson7,
  "track-4-lesson-8": track4Lesson8,
  "track-4-lesson-9": track4Lesson9,
  "track-4-lesson-10": track4Lesson10,
};

export const TRACK4_META = {
  id: "track-4-stis" as const,
  title: "STIs Beyond HIV",
  hostCharacterId: "dr_ayo" as const,
  totalLessons: 10,
};

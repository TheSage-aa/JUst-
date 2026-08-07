/**
 * Track 3 (Mental Health) registry. All 10 lessons authored in the full
 * Ch.39 beat schema, Nana-hosted, Gist Mode.
 */

import type { Lesson } from "../../types/content";
import { track3Lesson1 } from "./lesson1";
import { track3Lesson2 } from "./lesson2";
import { track3Lesson3 } from "./lesson3";
import { track3Lesson4 } from "./lesson4";
import { track3Lesson5 } from "./lesson5";
import { track3Lesson6 } from "./lesson6";
import { track3Lesson7 } from "./lesson7";
import { track3Lesson8 } from "./lesson8";
import { track3Lesson9 } from "./lesson9";
import { track3Lesson10 } from "./lesson10";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export const TRACK3_LESSON_SUMMARIES: LessonSummary[] = [
  { id: "track-3-lesson-1", lessonNumber: 1, title: "What Mental Health Actually Means" },
  { id: "track-3-lesson-2", lessonNumber: 2, title: "Recognizing Anxiety" },
  { id: "track-3-lesson-3", lessonNumber: 3, title: "Recognizing Depression" },
  { id: "track-3-lesson-4", lessonNumber: 4, title: "Stress vs. Burnout" },
  { id: "track-3-lesson-5", lessonNumber: 5, title: "Healthy Coping Skills" },
  { id: "track-3-lesson-6", lessonNumber: 6, title: "The Weight of Stigma on Mental Health" },
  { id: "track-3-lesson-7", lessonNumber: 7, title: "When and How to Seek Help" },
  { id: "track-3-lesson-8", lessonNumber: 8, title: "Supporting a Friend" },
  { id: "track-3-lesson-9", lessonNumber: 9, title: "Crisis Recognition & Immediate Safety" },
  { id: "track-3-lesson-10", lessonNumber: 10, title: "Bringing It Together" },
];

export const TRACK3_LESSON_CONTENT: Record<string, Lesson> = {
  "track-3-lesson-1": track3Lesson1,
  "track-3-lesson-2": track3Lesson2,
  "track-3-lesson-3": track3Lesson3,
  "track-3-lesson-4": track3Lesson4,
  "track-3-lesson-5": track3Lesson5,
  "track-3-lesson-6": track3Lesson6,
  "track-3-lesson-7": track3Lesson7,
  "track-3-lesson-8": track3Lesson8,
  "track-3-lesson-9": track3Lesson9,
  "track-3-lesson-10": track3Lesson10,
};

export const TRACK3_META = {
  id: "track-3-mental-health" as const,
  title: "Mental Health",
  hostCharacterId: "nana" as const,
  totalLessons: 10,
};

/**
 * Track 2 (Sexual & Reproductive Health) registry. All 10 lessons authored
 * in the full Ch.39 beat schema, Kemi-hosted, Gist Mode.
 */

import type { Lesson } from "../../types/content";
import { track2Lesson1 } from "./lesson1";
import { track2Lesson2 } from "./lesson2";
import { track2Lesson3 } from "./lesson3";
import { track2Lesson4 } from "./lesson4";
import { track2Lesson5 } from "./lesson5";
import { track2Lesson6 } from "./lesson6";
import { track2Lesson7 } from "./lesson7";
import { track2Lesson8 } from "./lesson8";
import { track2Lesson9 } from "./lesson9";
import { track2Lesson10 } from "./lesson10";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export const TRACK2_LESSON_SUMMARIES: LessonSummary[] = [
  { id: "track-2-lesson-1", lessonNumber: 1, title: "Understanding Puberty & Your Body" },
  { id: "track-2-lesson-2", lessonNumber: 2, title: "The Menstrual Cycle, Explained" },
  { id: "track-2-lesson-3", lessonNumber: 3, title: "Contraception: The Basic Options" },
  { id: "track-2-lesson-4", lessonNumber: 4, title: "Consent — What It Actually Means" },
  { id: "track-2-lesson-5", lessonNumber: 5, title: "Pregnancy: What Happens & When to Seek Care" },
  { id: "track-2-lesson-6", lessonNumber: 6, title: "Reproductive Rights, In Plain Language" },
  { id: "track-2-lesson-7", lessonNumber: 7, title: "STIs & SRH: Where They Overlap" },
  { id: "track-2-lesson-8", lessonNumber: 8, title: "Healthy Relationships & Communication" },
  { id: "track-2-lesson-9", lessonNumber: 9, title: "Accessing SRH Services Confidentially" },
  { id: "track-2-lesson-10", lessonNumber: 10, title: "Bringing It Together" },
];

export const TRACK2_LESSON_CONTENT: Record<string, Lesson> = {
  "track-2-lesson-1": track2Lesson1,
  "track-2-lesson-2": track2Lesson2,
  "track-2-lesson-3": track2Lesson3,
  "track-2-lesson-4": track2Lesson4,
  "track-2-lesson-5": track2Lesson5,
  "track-2-lesson-6": track2Lesson6,
  "track-2-lesson-7": track2Lesson7,
  "track-2-lesson-8": track2Lesson8,
  "track-2-lesson-9": track2Lesson9,
  "track-2-lesson-10": track2Lesson10,
};

export const TRACK2_META = {
  id: "track-2-srh" as const,
  title: "Sexual & Reproductive Health",
  hostCharacterId: "kemi" as const,
  totalLessons: 10,
};

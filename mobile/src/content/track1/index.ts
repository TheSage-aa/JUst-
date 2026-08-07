/**
 * Track 1 (HIV & Stigma Basics) registry.
 *
 * HONESTY NOTE: per Ch.68 SS68.1's build order, this vertical-slice pass
 * only authors Lesson 1 in the full Ch.39 beat schema (see lesson1.ts).
 * The remaining 9 lesson titles below are carried over from this project's
 * original content draft (docs/tracks/track-1-hiv-stigma-basics.md) so the
 * Track Detail path can honestly render a real 10-node map (Ch.14 SS14.2)
 * with correct titles -- but only Lesson 1 has playable `content`. Nodes
 * 2-10 render as locked with their real title, per Ch.14 SS14.3's "Locked"
 * state, and are NOT fabricated/fake-playable. Authoring the remaining
 * lessons in full beat-script form is Ch.68 step 4, not this pass.
 */

import type { Lesson } from "../../types/content";
import { track1Lesson1 } from "./lesson1";

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

/** Only lessons with authored, Bible-compliant beat scripts. */
export const TRACK1_LESSON_CONTENT: Record<string, Lesson> = {
  "track-1-lesson-1": track1Lesson1,
};

export const TRACK1_META = {
  id: "track-1-hiv-stigma" as const,
  title: "HIV & Stigma Basics",
  hostCharacterId: "zara" as const,
  totalLessons: 10,
};

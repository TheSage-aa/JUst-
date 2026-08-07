/**
 * Cross-track registry. Ch.11 SS11.1's five tracks are all listed here
 * (per Non-Negotiable #12, the track list itself is fixed), but
 * `TRACK_CONTENT_REGISTRY` only has entries for tracks whose lessons are
 * actually authored -- Home/Track Detail check for a registry entry to
 * decide playable vs "Coming soon", never fabricating content for a track
 * that doesn't have any yet.
 */
import type { TrackId } from "../design/tokens";
import type { CharacterId } from "../characters/characters";
import type { Lesson } from "../types/content";
import type { Progress } from "../types/models";
import { TRACK1_LESSON_CONTENT, TRACK1_LESSON_SUMMARIES, TRACK1_META } from "./track1";
import { TRACK2_LESSON_CONTENT, TRACK2_LESSON_SUMMARIES, TRACK2_META } from "./track2";
import { TRACK3_LESSON_CONTENT, TRACK3_LESSON_SUMMARIES, TRACK3_META } from "./track3";

export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
}

export interface TrackRegistryEntry {
  meta: { id: TrackId; title: string; hostCharacterId: CharacterId; totalLessons: number };
  lessonSummaries: LessonSummary[];
  lessonContent: Record<string, Lesson>;
}

export const ALL_TRACK_IDS: TrackId[] = [
  "track-1-hiv-stigma",
  "track-2-srh",
  "track-3-mental-health",
  "track-4-stis",
  "track-5-chronic",
];

export const ALL_TRACK_META: Record<TrackId, { title: string; hostCharacterId: CharacterId }> = {
  "track-1-hiv-stigma": { title: "HIV & Stigma Basics", hostCharacterId: "zara" },
  "track-2-srh": { title: "Sexual & Reproductive Health", hostCharacterId: "kemi" },
  "track-3-mental-health": { title: "Mental Health", hostCharacterId: "nana" },
  "track-4-stis": { title: "STIs Beyond HIV", hostCharacterId: "dr_ayo" },
  "track-5-chronic": { title: "Chronic Conditions", hostCharacterId: "tunde" },
};

/** Only tracks with fully authored lessons get an entry here. */
export const TRACK_CONTENT_REGISTRY: Partial<Record<TrackId, TrackRegistryEntry>> = {
  "track-1-hiv-stigma": {
    meta: TRACK1_META,
    lessonSummaries: TRACK1_LESSON_SUMMARIES,
    lessonContent: TRACK1_LESSON_CONTENT,
  },
  "track-2-srh": {
    meta: TRACK2_META,
    lessonSummaries: TRACK2_LESSON_SUMMARIES,
    lessonContent: TRACK2_LESSON_CONTENT,
  },
  "track-3-mental-health": {
    meta: TRACK3_META,
    lessonSummaries: TRACK3_LESSON_SUMMARIES,
    lessonContent: TRACK3_LESSON_CONTENT,
  },
};

/** Searches every authored track's content for a lesson by id. Used by the
 * Lesson Player, which only receives a lessonId nav param, not a trackId. */
export function findLessonById(lessonId: string): { lesson: Lesson; trackId: TrackId } | null {
  for (const trackId of ALL_TRACK_IDS) {
    const entry = TRACK_CONTENT_REGISTRY[trackId];
    const lesson = entry?.lessonContent[lessonId];
    if (lesson) return { lesson, trackId };
  }
  return null;
}

export function isTrackComplete(trackId: TrackId, progressByLessonId: Record<string, Progress>): boolean {
  const entry = TRACK_CONTENT_REGISTRY[trackId];
  if (!entry) return false;
  return entry.lessonSummaries.every((l) => progressByLessonId[l.id]?.status === "completed");
}

import type { BadgeId } from "../types/models";
import type { TrackId } from "../design/tokens";

export type RootStackParamList = {
  Tabs: undefined;
  TrackDetail: { trackId: TrackId };
  LessonPlayer: { lessonId: string; isReplay: boolean };
  LessonComplete: {
    lessonId: string;
    trackId: TrackId;
    xpAwarded: number;
    newlyUnlockedBadges: BadgeId[];
    streakAfter: number;
    isReplay: boolean;
  };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

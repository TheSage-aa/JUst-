import type { BadgeId } from "../types/models";

export type RootStackParamList = {
  Tabs: undefined;
  TrackDetail: { trackId: string };
  LessonPlayer: { lessonId: string; isReplay: boolean };
  LessonComplete: {
    lessonId: string;
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

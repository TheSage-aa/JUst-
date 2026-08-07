import type { BadgeId } from "../types/models";
import type { TrackId } from "../design/tokens";
import type { CharacterId } from "../characters/characters";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  LogIn: undefined;
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
  CharacterProfile: { characterId: CharacterId };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

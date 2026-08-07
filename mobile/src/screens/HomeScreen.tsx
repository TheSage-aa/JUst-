/**
 * Home (Track Map) -- Ch.13. Tracks with authored content (currently
 * Track 1 and Track 2) are playable; the rest render honestly as "Coming
 * soon" rather than fake-navigable, per the same no-fabricated-content
 * principle applied throughout this build. Driven by the cross-track
 * registry (src/content/allTracks.ts) so a newly authored track becomes
 * playable here automatically, with no per-screen hardcoding.
 */
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { color, radius, space, trackAccent } from "../design/tokens";
import { BuggyLine, BuggyMascot } from "../components/BuggyMascot";
import { useAppStore } from "../state/useAppStore";
import { getLocalDateString, type StreakRolloverEvent } from "../economy/economy";
import { getHomeGreeting } from "../content/buggyGreetings";
import { ALL_TRACK_IDS, ALL_TRACK_META, TRACK_CONTENT_REGISTRY } from "../content/allTracks";
import { CHARACTERS } from "../characters/characters";
import type { RootStackParamList } from "../navigation/types";

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const economy = useAppStore((s) => s.economy);
  const progressByLessonId = useAppStore((s) => s.progressByLessonId);
  const pendingStreakEvent = useAppStore((s) => s.pendingStreakEvent);
  const acknowledgeStreakEvent = useAppStore((s) => s.acknowledgeStreakEvent);

  const today = getLocalDateString(new Date());

  const tracks = ALL_TRACK_IDS.map((id) => {
    const entry = TRACK_CONTENT_REGISTRY[id];
    const completedCount = entry
      ? entry.lessonSummaries.filter((l) => progressByLessonId[l.id]?.status === "completed").length
      : 0;
    const total = entry?.meta.totalLessons ?? 10;
    return {
      id,
      title: ALL_TRACK_META[id].title,
      hostName: CHARACTERS[ALL_TRACK_META[id].hostCharacterId].name,
      playable: Boolean(entry),
      completedCount,
      total,
    };
  });

  const hasAnyCompletedLesson = tracks.some((t) => t.completedCount > 0);
  const greeting = useMemo(
    () => getHomeGreeting(economy, today, hasAnyCompletedLesson),
    [economy, today, hasAnyCompletedLesson]
  );

  // "Continue" highlights the first playable, not-yet-fully-complete track,
  // in track order -- naturally stays on Track 1 until it's done, then
  // moves on, without needing separate "current track" state to maintain.
  const continueTrack = tracks.find((t) => t.playable && t.completedCount < t.total) ?? tracks.find((t) => t.playable);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, gap: space.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.md }}>
        <BuggyMascot size={56} />
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>{greeting}</Text>
          <View style={styles.streakPill}>
            <Text style={styles.streakPillText}>
              {economy.currentStreak > 0 ? `🔥 ${economy.currentStreak}` : "Start a streak today"}
            </Text>
          </View>
        </View>
      </View>

      {pendingStreakEvent !== "none" ? (
        <StreakEventBanner
          event={pendingStreakEvent}
          streak={economy.currentStreak}
          freezesRemaining={economy.streakFreezesAvailable}
          onDismiss={acknowledgeStreakEvent}
        />
      ) : null}

      {continueTrack ? (
        <TouchableOpacity
          style={[styles.continueCard, { backgroundColor: trackAccent[continueTrack.id] }]}
          onPress={() => navigation.navigate("TrackDetail", { trackId: continueTrack.id })}
          accessibilityRole="button"
        >
          <Text style={styles.continueCardLabel}>
            {continueTrack.completedCount > 0 ? "Continue" : "New here? Start with something small."}
          </Text>
          <Text style={styles.continueCardTitle}>{continueTrack.title}</Text>
          <Text style={styles.continueCardSub}>
            {continueTrack.completedCount}/{continueTrack.total} lessons · hosted by {continueTrack.hostName}
          </Text>
        </TouchableOpacity>
      ) : null}

      <View>
        <Text style={styles.sectionTitle}>Your tracks</Text>
        {tracks.map((t) => (
          <TouchableOpacity
            key={t.id}
            disabled={!t.playable}
            style={[styles.trackCard, !t.playable && styles.trackCardDisabled, { borderColor: trackAccent[t.id] }]}
            onPress={() => navigation.navigate("TrackDetail", { trackId: t.id })}
          >
            <View style={[styles.trackDot, { backgroundColor: trackAccent[t.id] }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.trackCardTitle}>{t.title}</Text>
              <Text style={styles.trackCardSub}>
                {!t.playable
                  ? `Coming soon · hosted by ${t.hostName}`
                  : t.completedCount >= t.total
                  ? "Completed"
                  : t.completedCount > 0
                  ? `${t.completedCount}/${t.total} lessons`
                  : "Start"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

/**
 * Ch.31 SS31.4 Buggy's Reaction Matrix, the "frozen" and "reset" rows --
 * surfaced once on Home per the pendingStreakEvent lifecycle in the store.
 *
 * Voice Test check: both lines are short, Buggy-attributed (not anonymous
 * system copy, Non-Negotiable #8), reference the user's real current state
 * (streak count / freezes remaining), and the reset copy is the Bible's
 * own verbatim example from Rule 1.3.1 -- acknowledge briefly, pivot to
 * forward motion, in the same message, no days-lost figure stated.
 */
function StreakEventBanner({
  event,
  streak,
  freezesRemaining,
  onDismiss,
}: {
  event: StreakRolloverEvent;
  streak: number;
  freezesRemaining: number;
  onDismiss: () => void;
}) {
  const text =
    event === "frozen"
      ? `A freeze covered yesterday — streak's still at ${streak}. ${freezesRemaining} freeze${freezesRemaining === 1 ? "" : "s"} left.`
      : "Buggy's a little sad the streak's gone. Let's start a new one today.";

  return (
    <TouchableOpacity style={styles.streakBanner} onPress={onDismiss} accessibilityRole="button">
      <BuggyLine text={text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  streakBanner: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius.md,
    padding: space.md,
    borderWidth: 1,
    borderColor: color.border.subtle,
  },
  greeting: { fontSize: 20, fontWeight: "600", color: color.text.onLight.primary },
  streakPill: {
    marginTop: space.xs,
    alignSelf: "flex-start",
    backgroundColor: color.bg.light,
    borderWidth: 1,
    borderColor: color.border.subtle,
    borderRadius: radius.full,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
  },
  streakPillText: { fontSize: 13, fontWeight: "600", color: color.text.onLight.secondary },
  continueCard: { borderRadius: radius.md, padding: space.lg },
  continueCardLabel: { color: color.text.onDark, fontSize: 13, fontWeight: "600", opacity: 0.85 },
  continueCardTitle: { color: color.text.onDark, fontSize: 22, fontWeight: "700", marginTop: 4 },
  continueCardSub: { color: color.text.onDark, fontSize: 14, marginTop: 4, opacity: 0.9 },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: color.text.onLight.secondary, marginBottom: space.sm },
  trackCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.sm,
  },
  trackCardDisabled: { opacity: 0.55 },
  trackDot: { width: 10, height: 10, borderRadius: 5 },
  trackCardTitle: { fontSize: 16, fontWeight: "600", color: color.text.onLight.primary },
  trackCardSub: { fontSize: 13, color: color.text.onLight.secondary, marginTop: 2 },
});

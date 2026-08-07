/**
 * Home (Track Map) -- Ch.13. Only Track 1 has authored content this pass
 * (Ch.68 step 3's scope); the other four track cards render honestly as
 * "Coming soon" rather than fake-navigable, per the same no-fabricated-
 * content principle applied throughout this build.
 */
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { color, radius, space, trackAccent, type TrackId } from "../design/tokens";
import { BuggyLine, BuggyMascot } from "../components/BuggyMascot";
import { useAppStore } from "../state/useAppStore";
import { getLocalDateString, type StreakRolloverEvent } from "../economy/economy";
import { getHomeGreeting } from "../content/buggyGreetings";
import { TRACK1_LESSON_SUMMARIES, TRACK1_META } from "../content/track1";
import type { RootStackParamList } from "../navigation/types";

const OTHER_TRACKS: Array<{ id: TrackId; title: string; host: string }> = [
  { id: "track-2-srh", title: "Sexual & Reproductive Health", host: "Kemi" },
  { id: "track-3-mental-health", title: "Mental Health", host: "Nana" },
  { id: "track-4-stis", title: "STIs Beyond HIV", host: "Dr. Ayo" },
  { id: "track-5-chronic", title: "Chronic Conditions", host: "Tunde" },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const economy = useAppStore((s) => s.economy);
  const progressByLessonId = useAppStore((s) => s.progressByLessonId);
  const pendingStreakEvent = useAppStore((s) => s.pendingStreakEvent);
  const acknowledgeStreakEvent = useAppStore((s) => s.acknowledgeStreakEvent);

  const today = getLocalDateString(new Date());
  const completedCount = TRACK1_LESSON_SUMMARIES.filter(
    (l) => progressByLessonId[l.id]?.status === "completed"
  ).length;
  const hasAnyCompletedLesson = completedCount > 0;
  const greeting = useMemo(
    () => getHomeGreeting(economy, today, hasAnyCompletedLesson),
    [economy, today, hasAnyCompletedLesson]
  );

  const progressFraction = completedCount / TRACK1_META.totalLessons;

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

      <TouchableOpacity
        style={[styles.continueCard, { backgroundColor: trackAccent["track-1-hiv-stigma"] }]}
        onPress={() => navigation.navigate("TrackDetail", { trackId: "track-1-hiv-stigma" })}
        accessibilityRole="button"
      >
        <Text style={styles.continueCardLabel}>{completedCount > 0 ? "Continue" : "New here? Start with something small."}</Text>
        <Text style={styles.continueCardTitle}>{TRACK1_META.title}</Text>
        <Text style={styles.continueCardSub}>
          {completedCount}/{TRACK1_META.totalLessons} lessons · hosted by Zara
        </Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.sectionTitle}>Your tracks</Text>
        <TouchableOpacity
          style={[styles.trackCard, { borderColor: trackAccent["track-1-hiv-stigma"] }]}
          onPress={() => navigation.navigate("TrackDetail", { trackId: "track-1-hiv-stigma" })}
        >
          <View style={[styles.trackDot, { backgroundColor: trackAccent["track-1-hiv-stigma"] }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.trackCardTitle}>{TRACK1_META.title}</Text>
            <Text style={styles.trackCardSub}>
              {progressFraction >= 1 ? "Completed" : progressFraction > 0 ? `${completedCount}/${TRACK1_META.totalLessons} lessons` : "Start"}
            </Text>
          </View>
        </TouchableOpacity>

        {OTHER_TRACKS.map((t) => (
          <View key={t.id} style={[styles.trackCard, styles.trackCardDisabled, { borderColor: trackAccent[t.id] }]}>
            <View style={[styles.trackDot, { backgroundColor: trackAccent[t.id] }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.trackCardTitle}>{t.title}</Text>
              <Text style={styles.trackCardSub}>Coming soon · hosted by {t.host}</Text>
            </View>
          </View>
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

/**
 * Lesson Complete -- Ch.17 SS17.1. Warm, brief closure; single "Continue"
 * action back to Track Detail; no auto-suggested next-lesson pressure
 * (Ch.6 SS6.1 item 5). Badge-unlock display + certification-interest
 * prompt (Ch.17 SS17.2) apply on genuine track completion -- reachable now
 * that all 10 of Track 1's lessons are authored: completing Lesson 10
 * unlocks "Myth Crusher" and shows the certification-interest prompt.
 *
 * Rule 32.3.2 (multi-badge unlocks shown sequentially, each with its own
 * full celebration beat, never stacked) is only partially satisfied here:
 * badge *correctness* (which badges, in what order) is fully implemented
 * in the economy engine and reflected in this list's order, but the
 * sequenced reveal-with-individual-celebration-beat *animation* is Book
 * VI's job, deferred to Ch.68 step 6 like all other animation timing in
 * this pass -- flagged so it isn't mistaken for a finished requirement.
 */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { BuggyMascot } from "../components/BuggyMascot";
import { useAppStore } from "../state/useAppStore";
import type { RootStackParamList } from "../navigation/types";

const BADGE_LABEL: Record<string, string> = {
  "myth-crusher": "Myth Crusher",
  "question-asker": "Question Asker",
  "quiet-strength": "Quiet Strength",
  "clarity-seeker": "Clarity Seeker",
  "nutrition-ninja": "Nutrition Ninja",
  "habit-hero": "Habit Hero",
  "myth-free-zone": "Myth-Free Zone",
  "full-circle": "Full Circle",
};

export function LessonCompleteScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "LessonComplete">>();
  const { trackId, xpAwarded, newlyUnlockedBadges, streakAfter, isReplay } = route.params;
  const accent = trackAccent[trackId as keyof typeof trackAccent] ?? trackAccent["track-1-hiv-stigma"];
  const expressCertificationInterest = useAppStore((s) => s.expressCertificationInterest);
  const hasExpressedCertificationInterest = useAppStore((s) => s.hasExpressedCertificationInterest);

  const trackJustCompleted = newlyUnlockedBadges.length > 0;

  return (
    <View style={styles.screen}>
      <BuggyMascot size={72} />
      <Text style={styles.headline}>{isReplay ? "Nice review." : "Lesson done."}</Text>

      {!isReplay ? (
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>XP earned</Text>
            <Text style={[styles.statValue, { color: accent }]}>+{xpAwarded}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={[styles.statValue, { color: accent }]}>{streakAfter}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.body}>Reviewing doesn't change your streak or XP — this one's just for you.</Text>
      )}

      {newlyUnlockedBadges.map((badgeId) => (
        <View key={badgeId} style={[styles.badgeCard, { borderColor: accent }]}>
          <Text style={styles.badgeUnlockLabel}>Badge unlocked</Text>
          <Text style={styles.badgeTitle}>{BADGE_LABEL[badgeId] ?? badgeId}</Text>
        </View>
      ))}

      {trackJustCompleted ? (
        <TouchableOpacity
          style={styles.certButton}
          disabled={hasExpressedCertificationInterest(trackId)}
          onPress={() => expressCertificationInterest(trackId)}
        >
          <Text style={styles.certButtonText}>
            {hasExpressedCertificationInterest(trackId)
              ? "Thanks — we'll let you know."
              : "Want us to let you know if/when a real certification becomes available?"}
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: accent }]}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.dark, alignItems: "center", justifyContent: "center", padding: space.xl, gap: space.md },
  headline: { fontSize: 26, fontWeight: "700", color: color.text.onDark },
  body: { fontSize: 14, color: color.text.onDark, opacity: 0.85, textAlign: "center" },
  statRow: { flexDirection: "row", gap: space.md },
  statCard: { backgroundColor: "#FFFFFF12", borderRadius: radius.md, padding: space.md, alignItems: "center", minWidth: 100 },
  statLabel: { fontSize: 12, color: color.text.onDark, opacity: 0.7 },
  statValue: { fontSize: 24, fontWeight: "800", marginTop: 4 },
  badgeCard: { borderWidth: 2, borderRadius: radius.md, padding: space.md, alignItems: "center", backgroundColor: "#FFFFFF12" },
  badgeUnlockLabel: { fontSize: 12, color: color.text.onDark, opacity: 0.7 },
  badgeTitle: { fontSize: 18, fontWeight: "700", color: color.text.onDark, marginTop: 2 },
  certButton: { backgroundColor: "#FFFFFF12", borderRadius: radius.sm, padding: space.md },
  certButtonText: { color: color.text.onDark, fontSize: 13, textAlign: "center" },
  primaryButton: { borderRadius: radius.sm, paddingVertical: space.md, paddingHorizontal: space.xl, marginTop: space.md },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});

/**
 * Profile / Progress -- Ch.18. Badge shelf shows unearned badges as
 * silhouettes with their condition text visible (Ch.32 SS32.4) -- never
 * hidden/mystery-box.
 */
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { color, radius, space, trackAccent } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";
import { deriveLevel } from "../economy/economy";
import type { BadgeId } from "../types/models";

const BADGE_LIST: Array<{ id: BadgeId; title: string; condition: string }> = [
  { id: "myth-crusher", title: "Myth Crusher", condition: "Complete HIV & Stigma Basics" },
  { id: "question-asker", title: "Question Asker", condition: "Complete Sexual & Reproductive Health" },
  { id: "quiet-strength", title: "Quiet Strength", condition: "Complete Mental Health" },
  { id: "clarity-seeker", title: "Clarity Seeker", condition: "Complete STIs Beyond HIV" },
  { id: "nutrition-ninja", title: "Nutrition Ninja", condition: "Complete Chronic Conditions" },
  { id: "habit-hero", title: "Habit Hero", condition: "Reach a 7-day streak" },
  { id: "myth-free-zone", title: "Myth-Free Zone", condition: "100% on a lesson quiz, 5 times" },
  { id: "full-circle", title: "Full Circle", condition: "Complete all 5 tracks" },
];

export function ProfileScreen() {
  const economy = useAppStore((s) => s.economy);
  const level = deriveLevel(economy.xpTotal);
  const earnedIds = new Set(economy.badgesEarned.map((b) => b.badgeId));
  const accent = trackAccent["track-1-hiv-stigma"];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, gap: space.lg }}>
      <View style={styles.headerCard}>
        <Text style={styles.level}>Level {level}</Text>
        <Text style={styles.xp}>{economy.xpTotal} XP</Text>
      </View>

      <View style={styles.statRow}>
        <Stat label="Current streak" value={String(economy.currentStreak)} />
        <Stat label="Longest streak" value={String(economy.longestStreak)} />
        <Stat label="Hearts" value={`${economy.heartsCurrent}/5`} />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgeGrid}>
          {BADGE_LIST.map((b) => {
            const earned = earnedIds.has(b.id);
            return (
              <View key={b.id} style={[styles.badgeTile, { borderColor: earned ? accent : color.border.subtle }]}>
                <Text style={[styles.badgeEmoji, !earned && styles.badgeSilhouette]}>🏅</Text>
                <Text style={styles.badgeTileTitle}>{b.title}</Text>
                <Text style={styles.badgeTileCondition}>{earned ? "Earned" : b.condition}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  headerCard: { backgroundColor: color.bg.dark, borderRadius: radius.md, padding: space.lg, alignItems: "center" },
  level: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  xp: { color: "#FFFFFF", opacity: 0.8, marginTop: 2 },
  statRow: { flexDirection: "row", justifyContent: "space-between" },
  stat: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 20, fontWeight: "700", color: color.text.onLight.primary },
  statLabel: { fontSize: 12, color: color.text.onLight.secondary, marginTop: 2, textAlign: "center" },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: color.text.onLight.secondary, marginBottom: space.sm },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  badgeTile: {
    width: "47%",
    borderWidth: 1.5,
    borderRadius: radius.md,
    padding: space.md,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  badgeEmoji: { fontSize: 28 },
  badgeSilhouette: { opacity: 0.25 },
  badgeTileTitle: { fontSize: 13, fontWeight: "700", color: color.text.onLight.primary, marginTop: 4, textAlign: "center" },
  badgeTileCondition: { fontSize: 11, color: color.text.onLight.secondary, marginTop: 2, textAlign: "center" },
});

/**
 * Profile / Progress -- Ch.18. Badge shelf shows unearned badges as
 * silhouettes with their condition text visible (Ch.32 SS32.4) -- never
 * hidden/mystery-box. Ch.18 SS18.2: tapping a badge opens a Badge Detail
 * modal; tapping a track's completion row deep-links to Track Detail.
 * Ch.19 SS19.1: "Meet the cast" is one of the two required entry points
 * into the Character Profile Screen (the other lives on Track Detail).
 */
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";
import { deriveLevel } from "../economy/economy";
import type { BadgeId } from "../types/models";
import { ALL_TRACK_IDS, ALL_TRACK_META, TRACK_CONTENT_REGISTRY } from "../content/allTracks";
import { CHARACTERS, type CharacterId } from "../characters/characters";
import { BuggyLine } from "../components/BuggyMascot";
import type { RootStackParamList } from "../navigation/types";

const BADGE_LIST: Array<{ id: BadgeId; title: string; condition: string; emoji: string }> = [
  { id: "myth-crusher", title: "Myth Crusher", condition: "Complete HIV & Stigma Basics", emoji: "🏅" },
  { id: "question-asker", title: "Question Asker", condition: "Complete Sexual & Reproductive Health", emoji: "🏅" },
  { id: "quiet-strength", title: "Quiet Strength", condition: "Complete Mental Health", emoji: "🏅" },
  { id: "clarity-seeker", title: "Clarity Seeker", condition: "Complete STIs Beyond HIV", emoji: "🏅" },
  { id: "nutrition-ninja", title: "Nutrition Ninja", condition: "Complete Chronic Conditions", emoji: "🏅" },
  { id: "habit-hero", title: "Habit Hero", condition: "Reach a 7-day streak", emoji: "🔥" },
  { id: "myth-free-zone", title: "Myth-Free Zone", condition: "100% on a lesson quiz, 5 times", emoji: "✨" },
  { id: "full-circle", title: "Full Circle", condition: "Complete all 5 tracks", emoji: "🌀" },
];

const CAST_ORDER: CharacterId[] = ["buggy", "zara", "kemi", "nana", "dr_ayo", "tunde", "bello"];

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const economy = useAppStore((s) => s.economy);
  const progressByLessonId = useAppStore((s) => s.progressByLessonId);
  const level = deriveLevel(economy.xpTotal);
  const earnedIds = new Set(economy.badgesEarned.map((b) => b.badgeId));
  const accent = trackAccent["track-1-hiv-stigma"];
  const [selectedBadgeId, setSelectedBadgeId] = React.useState<BadgeId | null>(null);
  const selectedBadge = BADGE_LIST.find((b) => b.id === selectedBadgeId) ?? null;
  const selectedAward = selectedBadgeId ? economy.badgesEarned.find((b) => b.badgeId === selectedBadgeId) : undefined;

  const totalCompletedLessons = Object.values(progressByLessonId).filter((p) => p.status === "completed").length;

  // Ch.18 SS18.1's "Buggy remembers" card -- short, Buggy-voiced,
  // references something specific/real about the user's state per Buggy's
  // Voice Test (Ch.21 SS21.7), never a generic "welcome back" line.
  const memoryLine =
    totalCompletedLessons === 0
      ? "Nothing completed yet — no rush, whenever you're ready."
      : `${totalCompletedLessons} lesson${totalCompletedLessons === 1 ? "" : "s"} done so far. Level ${level}, streak at ${economy.currentStreak}.`;

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

      <View style={styles.memoryCard}>
        <BuggyLine text={memoryLine} />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Your tracks</Text>
        {ALL_TRACK_IDS.map((trackId) => {
          const entry = TRACK_CONTENT_REGISTRY[trackId];
          const total = entry?.meta.totalLessons ?? 10;
          const completed = entry
            ? entry.lessonSummaries.filter((l) => progressByLessonId[l.id]?.status === "completed").length
            : 0;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          return (
            <TouchableOpacity
              key={trackId}
              style={styles.trackRow}
              onPress={() => navigation.navigate("TrackDetail", { trackId })}
              accessibilityRole="button"
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.trackRowTitle}>{ALL_TRACK_META[trackId].title}</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: trackAccent[trackId] }]} />
                </View>
              </View>
              <Text style={styles.trackRowPct}>{pct}%</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgeGrid}>
          {BADGE_LIST.map((b) => {
            const earned = earnedIds.has(b.id);
            return (
              <TouchableOpacity
                key={b.id}
                style={[styles.badgeTile, { borderColor: earned ? accent : color.border.subtle }]}
                onPress={() => setSelectedBadgeId(b.id)}
                accessibilityRole="button"
              >
                <Text style={[styles.badgeEmoji, !earned && styles.badgeSilhouette]}>{b.emoji}</Text>
                <Text style={styles.badgeTileTitle}>{b.title}</Text>
                <Text style={styles.badgeTileCondition}>{earned ? "Earned" : b.condition}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Meet the cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm }}>
          {CAST_ORDER.map((id) => {
            const character = CHARACTERS[id];
            return (
              <TouchableOpacity
                key={id}
                style={styles.castTile}
                onPress={() => navigation.navigate("CharacterProfile", { characterId: id })}
                accessibilityRole="button"
              >
                <View style={[styles.castAvatar, { backgroundColor: character.accentColor }]}>
                  <Text style={styles.castAvatarInitial}>{character.name[0]}</Text>
                </View>
                <Text style={styles.castName}>{character.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Modal visible={selectedBadge !== null} transparent animationType="fade" onRequestClose={() => setSelectedBadgeId(null)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setSelectedBadgeId(null)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
            {selectedBadge ? (
              <>
                <Text style={[styles.modalEmoji, !earnedIds.has(selectedBadge.id) && styles.badgeSilhouette]}>
                  {selectedBadge.emoji}
                </Text>
                <Text style={styles.modalTitle}>{selectedBadge.title}</Text>
                <Text style={styles.modalCondition}>{selectedBadge.condition}</Text>
                {selectedAward ? (
                  <Text style={styles.modalEarned}>
                    Earned {new Date(selectedAward.earnedAt).toLocaleDateString()}
                  </Text>
                ) : (
                  <Text style={styles.modalLocked}>Not earned yet</Text>
                )}
                <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedBadgeId(null)} accessibilityRole="button">
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  memoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius.md,
    padding: space.md,
    borderWidth: 1,
    borderColor: color.border.subtle,
  },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: color.text.onLight.secondary, marginBottom: space.sm },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    backgroundColor: "#FFFFFF",
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.sm,
  },
  trackRowTitle: { fontSize: 14, fontWeight: "600", color: color.text.onLight.primary, marginBottom: 6 },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: color.border.subtle, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  trackRowPct: { fontSize: 13, fontWeight: "700", color: color.text.onLight.secondary, width: 40, textAlign: "right" },
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
  castTile: { alignItems: "center", width: 68 },
  castAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  castAvatarInitial: { color: "#FFFFFF", fontWeight: "700", fontSize: 18 },
  castName: { fontSize: 12, color: color.text.onLight.primary, marginTop: 4, fontWeight: "600" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(21,14,27,0.55)", alignItems: "center", justifyContent: "center", padding: space.lg },
  modalCard: { backgroundColor: "#FFFFFF", borderRadius: radius.lg, padding: space.xl, alignItems: "center", width: "100%", maxWidth: 320 },
  modalEmoji: { fontSize: 56 },
  modalTitle: { fontSize: 20, fontWeight: "700", color: color.text.onLight.primary, marginTop: space.sm },
  modalCondition: { fontSize: 14, color: color.text.onLight.secondary, marginTop: 4, textAlign: "center" },
  modalEarned: { fontSize: 13, color: color.success.muted, marginTop: space.sm, fontWeight: "600" },
  modalLocked: { fontSize: 13, color: color.text.onLight.secondary, marginTop: space.sm, fontWeight: "600" },
  modalClose: { marginTop: space.lg, paddingHorizontal: space.lg, paddingVertical: space.sm, borderRadius: radius.sm, backgroundColor: color.bg.light },
  modalCloseText: { fontWeight: "700", color: color.text.onLight.primary },
});

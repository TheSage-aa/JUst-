/**
 * Settings -- Ch.19 SS19.2. Sound/Haptics, a single daily Reminder time
 * (non-guilt copy, Rule 33.2.1), and an Account section (email, log out,
 * delete account with full-purge language per Ch.1 SS1.7).
 *
 * Log Out now genuinely signs out (Ch.12 SS12.3's local-only account
 * model, see useAppStore's signOut()) -- it returns to Log In without
 * touching progress/economy data, so logging back in with the same email
 * resumes exactly where the user left off. Delete Account is the
 * separate, permanent, full-purge action.
 */
import React from "react";
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { color, radius, space } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";

const REMINDER_OPTIONS: Array<{ label: string; value: string | null }> = [
  { label: "Off", value: null },
  { label: "8:00 AM", value: "08:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "6:00 PM", value: "18:00" },
  { label: "8:00 PM", value: "20:00" },
];

export function SettingsScreen() {
  const soundEnabled = useAppStore((s) => s.user.soundEnabled);
  const hapticsEnabled = useAppStore((s) => s.user.hapticsEnabled);
  const reminderTime = useAppStore((s) => s.user.notificationReminderTime);
  const email = useAppStore((s) => s.user.email);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const setHapticsEnabled = useAppStore((s) => s.setHapticsEnabled);
  const setReminderTime = useAppStore((s) => s.setReminderTime);
  const deleteAccount = useAppStore((s) => s.deleteAccount);
  const signOut = useAppStore((s) => s.signOut);

  const handleLogOut = () => {
    Alert.alert("Log out?", "Your progress stays saved on this device — log back in with the same email anytime.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => signOut() },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete everything on this device?",
      "This removes your progress, streaks, badges, and settings for good. All data is stored only on this device -- there's no copy anywhere else to retain, so this is a full, permanent purge.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteAccount() },
      ]
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, gap: space.sm }}>
      <View style={styles.row}>
        <Text style={styles.label}>Sound</Text>
        <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Haptics</Text>
        <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
      </View>

      <Text style={styles.sectionTitle}>Daily reminder</Text>
      <Text style={styles.sectionNote}>
        One reminder a day, whenever works for you. Skipping it (or the day) never costs you anything.
      </Text>
      <View style={styles.chipRow}>
        {REMINDER_OPTIONS.map((opt) => {
          const selected = (reminderTime ?? null) === opt.value;
          return (
            <TouchableOpacity
              key={opt.label}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => setReminderTime(opt.value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email || "No account yet — this device only"}</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={handleLogOut} accessibilityRole="button">
        <Text style={styles.label}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={handleDeleteAccount} accessibilityRole="button">
        <Text style={styles.dangerLabel}>Delete account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: radius.md,
    padding: space.md,
  },
  label: { fontSize: 16, fontWeight: "600", color: color.text.onLight.primary },
  value: { fontSize: 14, color: color.text.onLight.secondary },
  dangerLabel: { fontSize: 16, fontWeight: "600", color: "#C0392B" },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: color.text.onLight.secondary, marginTop: space.md },
  sectionNote: { fontSize: 13, color: color.text.onLight.secondary, marginTop: -4, marginBottom: 2 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: space.sm },
  chip: {
    borderWidth: 1.5,
    borderColor: color.border.subtle,
    borderRadius: radius.full,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    backgroundColor: "#FFFFFF",
  },
  chipSelected: { backgroundColor: color.bg.dark, borderColor: color.bg.dark },
  chipText: { fontSize: 13, fontWeight: "600", color: color.text.onLight.primary },
  chipTextSelected: { color: "#FFFFFF" },
});

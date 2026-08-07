/**
 * Settings -- Ch.19 SS19.2. Only the two real, wired preferences this pass
 * (sound/haptics); Notification Preferences (Ch.19 SS19.2 nested screen) is
 * out of scope until push notification infrastructure exists (Book VIII).
 */
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { color, radius, space } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";

export function SettingsScreen() {
  const soundEnabled = useAppStore((s) => s.user.soundEnabled);
  const hapticsEnabled = useAppStore((s) => s.user.hapticsEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const setHapticsEnabled = useAppStore((s) => s.setHapticsEnabled);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.label}>Sound</Text>
        <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Haptics</Text>
        <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light, padding: space.lg, gap: space.sm },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: radius.md,
    padding: space.md,
  },
  label: { fontSize: 16, fontWeight: "600", color: color.text.onLight.primary },
});

/**
 * Splash -- Ch.12 SS12.1. Dark plum full-bleed background, Buggy's idle
 * loop starting immediately on mount (this is the user's very first
 * exposure to Buggy's "alive" quality, per Ch.12.1's own note), wordmark
 * + subtitle. Dismissed the moment app init completes with a hard
 * minimum of 800ms so the brand moment always registers, and a soft
 * maximum of 3000ms.
 *
 * SCOPE NOTE (Ch.67 SS67.3): the spec's max-timeout describes degrading
 * gracefully into an offline/retry state (Ch.20) if init hasn't finished
 * by 3000ms -- that clause exists for a real network-dependent init
 * (auth check against a server). This build's hydrate() is fully local/
 * synchronous (no network call to hang on), so there's nothing that can
 * actually exceed the max; the timer is still honored for spec fidelity,
 * but the offline-retry branch has nothing to degrade into here.
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color, space, trackAccent } from "../design/tokens";
import { BuggyMascot } from "../components/BuggyMascot";

export function SplashScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.stripeRow}>
        {Object.values(trackAccent).map((c, i) => (
          <View key={i} style={[styles.stripe, { backgroundColor: c }]} />
        ))}
      </View>
      <View style={styles.center}>
        <BuggyMascot size={96} />
        <Text style={styles.wordmark}>Saabi</Text>
        <Text style={styles.subtitle}>Your health bestie.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.dark },
  stripeRow: { flexDirection: "row", height: 6 },
  stripe: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: space.sm },
  wordmark: { color: "#FFFFFF", fontSize: 34, fontWeight: "700", marginTop: space.md },
  subtitle: { color: "#FFFFFF", opacity: 0.75, fontSize: 15 },
});

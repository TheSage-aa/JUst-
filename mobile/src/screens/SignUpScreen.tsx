/**
 * Sign Up -- Ch.12 SS12.3. Fields are the hard-constrained set (Ch.1
 * SS1.7.1): email, password, optional display name, optional age as a
 * plain numeric field for age-gating only -- never framed adjacent to
 * health-risk language. States: default, validating, error, success
 * (routes to Tabs, Home renders its first-time state per Ch.13 SS13.4
 * automatically since a fresh profile has no completed lessons).
 */
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";
import type { RootStackParamList } from "../navigation/types";

export function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const signUp = useAppStore((s) => s.signUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [ageText, setAgeText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const handleSubmit = () => {
    setError(null);
    setValidating(true);
    // A brief local-validation frame, not a network round-trip -- this
    // build has no backend to call (Book VIII). Kept as a genuine state
    // transition rather than an instant flash so all four Ch.12.3 states
    // are real, distinguishable moments, not just code branches.
    setTimeout(() => {
      const age = ageText.trim() ? Number(ageText.trim()) : undefined;
      const result = signUp({ email: email.trim(), password, displayName: displayName.trim(), age });
      setValidating(false);
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    }, 150);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>Just enough to save your progress on this device.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={color.text.onLight.secondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={color.text.onLight.secondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Display name (optional)"
        placeholderTextColor={color.text.onLight.secondary}
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age (optional — for age verification)"
        placeholderTextColor={color.text.onLight.secondary}
        keyboardType="number-pad"
        value={ageText}
        onChangeText={setAgeText}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: trackAccent["track-1-hiv-stigma"] }]}
        onPress={handleSubmit}
        disabled={validating || !email || !password}
        accessibilityRole="button"
      >
        {validating ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Sign up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LogIn")} accessibilityRole="button">
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light, padding: space.xl, justifyContent: "center", gap: space.sm },
  title: { fontSize: 26, fontWeight: "700", color: color.text.onLight.primary },
  subtitle: { fontSize: 14, color: color.text.onLight.secondary, marginBottom: space.md },
  input: {
    borderWidth: 1.5,
    borderColor: color.border.subtle,
    borderRadius: radius.sm,
    padding: space.md,
    fontSize: 15,
    color: color.text.onLight.primary,
    backgroundColor: "#FFFFFF",
  },
  error: { color: "#C0392B", fontSize: 13, fontWeight: "600" },
  primaryButton: { borderRadius: radius.sm, paddingVertical: space.md, alignItems: "center", marginTop: space.sm },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  link: { textAlign: "center", color: color.text.onLight.secondary, fontWeight: "600", marginTop: space.md },
});

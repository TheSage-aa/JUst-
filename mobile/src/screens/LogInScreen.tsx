/**
 * Log In -- Ch.12 SS12.3. Same field/state shape as Sign Up. This build
 * supports exactly one local profile (see useAppStore's logIn() comment
 * for the honest scoping note), so a successful log-in is an email match
 * against that one profile, resuming its existing progress/economy data.
 */
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";
import type { RootStackParamList } from "../navigation/types";

export function LogInScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const logIn = useAppStore((s) => s.logIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const handleSubmit = () => {
    setError(null);
    setValidating(true);
    setTimeout(() => {
      const result = logIn({ email: email.trim(), password });
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
      <Text style={styles.title}>Welcome back</Text>

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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: trackAccent["track-1-hiv-stigma"] }]}
        onPress={handleSubmit}
        disabled={validating || !email || !password}
        accessibilityRole="button"
      >
        {validating ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Log in</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")} accessibilityRole="button">
        <Text style={styles.link}>New here? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light, padding: space.xl, justifyContent: "center", gap: space.sm },
  title: { fontSize: 26, fontWeight: "700", color: color.text.onLight.primary, marginBottom: space.md },
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

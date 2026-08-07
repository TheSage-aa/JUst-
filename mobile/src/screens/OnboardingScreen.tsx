/**
 * Onboarding -- Ch.12 SS12.2. Three slides (Problem framing, Promise,
 * Sign-up CTA), swipeable + skippable at every point. Slide 3's "social
 * proof / credibility" is explicitly omitted per the Bible's own
 * instruction: "if not yet available for the build, this slide is
 * omitted rather than filled with placeholder claims" -- no invented
 * research statistics ship in this build.
 */
import React, { useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { CHARACTERS } from "../characters/characters";
import { BuggyMascot } from "../components/BuggyMascot";
import { useAppStore } from "../state/useAppStore";
import type { RootStackParamList } from "../navigation/types";

const { width } = Dimensions.get("window");

export function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const finish = () => {
    completeOnboarding();
    navigation.replace("SignUp");
  };

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const goNext = () => {
    if (index >= 2) {
      finish();
      return;
    }
    scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
    setIndex(index + 1);
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.skip} onPress={finish} accessibilityRole="button">
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
      >
        <Slide width={width}>
          <Text style={styles.headline}>
            You're not uninformed. You just might be confidently wrong about a few things — and that's normal.
          </Text>
        </Slide>

        <Slide width={width}>
          <Text style={styles.headline}>Short daily lessons. Real characters. Zero judgment.</Text>
          <View style={styles.castRow}>
            <BuggyMascot size={56} />
            {(["zara", "kemi"] as const).map((id) => {
              const c = CHARACTERS[id];
              return (
                <View key={id} style={[styles.avatar, { backgroundColor: c.accentColor }]}>
                  <Text style={styles.avatarInitial}>{c.name[0]}</Text>
                </View>
              );
            })}
          </View>
        </Slide>

        <Slide width={width}>
          <Text style={styles.headline}>Five tracks. Ten lessons each. Two minutes a day.</Text>
          <TouchableOpacity style={[styles.cta, { backgroundColor: trackAccent["track-1-hiv-stigma"] }]} onPress={finish}>
            <Text style={styles.ctaText}>Get started</Text>
          </TouchableOpacity>
        </Slide>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        {index < 2 ? (
          <TouchableOpacity style={styles.nextButton} onPress={goNext} accessibilityRole="button">
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

function Slide({ width: w, children }: { width: number; children: React.ReactNode }) {
  return <View style={[styles.slide, { width: w }]}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  skip: { position: "absolute", top: space.xl, right: space.lg, zIndex: 1 },
  skipText: { color: color.text.onLight.secondary, fontWeight: "600", fontSize: 14 },
  slide: { padding: space.xl, paddingTop: space.xxl * 2, alignItems: "center", gap: space.lg },
  headline: { fontSize: 24, fontWeight: "700", color: color.text.onLight.primary, textAlign: "center", lineHeight: 32 },
  castRow: { flexDirection: "row", gap: space.md, marginTop: space.md },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  avatarInitial: { color: "#FFFFFF", fontWeight: "700", fontSize: 20 },
  cta: { borderRadius: radius.sm, paddingHorizontal: space.xl, paddingVertical: space.md, marginTop: space.md },
  ctaText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  footer: { padding: space.lg, alignItems: "center", gap: space.md },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: color.border.subtle },
  dotActive: { backgroundColor: color.text.onLight.primary },
  nextButton: { paddingHorizontal: space.lg, paddingVertical: space.sm },
  nextText: { fontWeight: "700", color: color.text.onLight.primary, fontSize: 15 },
});

/**
 * Buggy, rendered wherever the mascot appears. Ch.21 SS21.6 / Ch.42 SS42.1:
 * Buggy must never appear as a static frozen image -- continuous idle
 * float/bob loop wherever present, exact values now sourced from Book VI
 * (Ch.68 step 6): vertical range +-4px, 2400ms period, ease-in-out, never
 * pausing. A secondary wing-flutter micro-loop (opacity pulse, +-3%,
 * 900ms period) is layered on top per Ch.42.1 so Buggy reads as alive
 * rather than a bobbing sticker.
 *
 * Ch.46.2.1: under the OS reduced-motion setting, the idle loop is
 * replaced with a slow opacity pulse (+-8%, 3000ms period) rather than
 * removed outright, preserving the "still here, still alive" continuity
 * signal (Ch.1 SS1.6) through a motion-safe channel.
 *
 * NOT YET WIRED (Book VI gap, flagged per motion.ts's trailing comment):
 * Lottie-based celebration override that should temporarily replace this
 * loop during a milestone celebration (Ch.42.1) -- no Lottie pipeline
 * exists yet, so Buggy's idle loop currently just keeps running through
 * celebration moments instead of pausing for one.
 */
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { color, space } from "../design/tokens";
import { IDLE_LOOP, REDUCED_MOTION, WING_FLUTTER } from "../design/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function BuggyMascot({ size = 72 }: { size?: number }) {
  const reducedMotion = useReducedMotion();
  const bob = useSharedValue(0);
  const flutter = useSharedValue(0);
  const staticPulse = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) {
      staticPulse.value = withRepeat(
        withTiming(1, { duration: REDUCED_MOTION.buggyOpacityPulsePeriodMs / 2, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      );
      return;
    }
    // Full period = 2400ms; withRepeat(reverse: true) runs the leg once
    // each direction, so each leg gets half the period.
    bob.value = withRepeat(
      withTiming(1, { duration: IDLE_LOOP.periodMs / 2, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    flutter.value = withRepeat(
      withTiming(1, { duration: WING_FLUTTER.periodMs / 2, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [reducedMotion, bob, flutter, staticPulse]);

  const bobStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      const pulse = 1 - (staticPulse.value * REDUCED_MOTION.buggyOpacityPulsePct) / 100;
      return { opacity: pulse, transform: [{ translateY: 0 }] };
    }
    // bob.value oscillates 0 -> 1 -> 0; map to a +-4px range around rest.
    const translateY = (bob.value - 0.5) * (IDLE_LOOP.verticalRangePx * 2);
    const scale = 1 + (flutter.value * WING_FLUTTER.opacityScalePulsePct) / 100 / 10; // subtle, ~0.3% max
    return { opacity: 1, transform: [{ translateY }, { scale }] };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color.streak.flameLit,
          alignItems: "center",
          justifyContent: "center",
        },
        bobStyle,
      ]}
      accessibilityLabel="Buggy, your Saabi companion"
    >
      <Text style={{ fontSize: size * 0.45 }}>🐛</Text>
    </Animated.View>
  );
}

export function BuggyLine({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
      <BuggyMascot size={40} />
      <Text style={{ flex: 1, color: color.text.onLight.primary, fontSize: 15 }}>{text}</Text>
    </View>
  );
}

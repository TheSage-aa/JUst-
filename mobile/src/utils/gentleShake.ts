/**
 * Ch.41.1 item 3 -- Gentle-Shake, reserved exclusively for incorrect-quiz-
 * answer feedback (Ch.42.3) and locked-node tap rejection (Ch.45.3): 3
 * cycles, 320ms total, amplitude linearly decaying toward 0 so the motion
 * settles rather than reading as a mechanical buzz. Shared here so both
 * call sites use the identical "not yet" gesture (Ch.45.3's own stated
 * intent) instead of two subtly different animations.
 *
 * Ch.46.1.1: under reduced motion, replaced with a brief opacity pulse
 * instead of any positional movement.
 */
import { Animated, Easing } from "react-native";
import { GENTLE_SHAKE, REDUCED_MOTION } from "../design/motion";

export function buildShakeAnimation(value: Animated.Value, reducedMotion: boolean): Animated.CompositeAnimation {
  if (reducedMotion) {
    const segMs = REDUCED_MOTION.crossfadeMs;
    return Animated.sequence([
      Animated.timing(value, { toValue: 1, duration: segMs, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(value, { toValue: 0, duration: segMs, useNativeDriver: true, easing: Easing.linear }),
    ]);
  }

  const totalSegments = GENTLE_SHAKE.cycles * 2; // right + left per cycle
  const segmentMs = GENTLE_SHAKE.durationMs / totalSegments;
  const steps: Animated.CompositeAnimation[] = [];
  for (let i = 0; i < totalSegments; i++) {
    const decayFraction = 1 - i / totalSegments; // linear-decay
    const target = (i % 2 === 0 ? 1 : -1) * decayFraction;
    steps.push(Animated.timing(value, { toValue: target, duration: segmentMs, useNativeDriver: true, easing: Easing.linear }));
  }
  steps.push(Animated.timing(value, { toValue: 0, duration: segmentMs, useNativeDriver: true, easing: Easing.linear }));
  return Animated.sequence(steps);
}

export function getShakeStyle(value: Animated.Value, reducedMotion: boolean) {
  if (reducedMotion) {
    return { opacity: value.interpolate({ inputRange: [0, 1], outputRange: [1, 0.55] }) };
  }
  return {
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [-1, 1],
          outputRange: [-GENTLE_SHAKE.amplitudePx, GENTLE_SHAKE.amplitudePx],
        }),
      },
    ],
  };
}

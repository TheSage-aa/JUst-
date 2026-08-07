/**
 * Buggy, rendered wherever the mascot appears. Ch.21 SS21.6: Buggy must
 * never appear as a static frozen image -- continuous idle float/bob loop
 * wherever present. This is a reasonable approximation of that requirement
 * (smooth, continuous, low-amplitude); Book VI's exact easing/duration
 * values are applied in the dedicated animation pass (Ch.68 step 6), not
 * this pass -- see the module doc comment in economy.ts for the same
 * staging note applied to motion.
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

export function BuggyMascot({ size = 72 }: { size?: number }) {
  const bob = useSharedValue(0);

  useEffect(() => {
    bob.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [bob]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value * -8 }],
  }));

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
        animatedStyle,
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

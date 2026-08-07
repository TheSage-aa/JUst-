/**
 * Ch.46.1 SS46.1.1: when the OS-level "reduce motion" accessibility
 * setting is on, Spring-Bounce/Idle-Loop primitives must be replaced with
 * simple crossfades and Gentle-Shake with an opacity pulse instead of any
 * positional movement. This hook is the single check every animated
 * component wires against, so the correct fallback behavior is inherited
 * automatically rather than each component separately re-implementing it.
 */
import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((enabled) => {
        if (mounted) setReduced(Boolean(enabled));
      })
      .catch(() => {
        // Some platforms/test environments don't implement this query --
        // fail open to full motion rather than crash.
      });

    const subscription = AccessibilityInfo.addEventListener?.("reduceMotionChanged", (enabled) => {
      setReduced(Boolean(enabled));
    });

    return () => {
      mounted = false;
      subscription?.remove?.();
    };
  }, []);

  return reduced;
}

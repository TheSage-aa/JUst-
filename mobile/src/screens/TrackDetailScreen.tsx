/**
 * Track Detail (Lesson Path) -- Ch.14. Winding vertical node map, strictly
 * sequential (no skip-ahead, Ch.14 SS14.3). Tapping a locked node triggers
 * a gentle shake, never a full error (Ch.14 SS14.3).
 */
import React, { useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { useAppStore } from "../state/useAppStore";
import { TRACK1_LESSON_CONTENT, TRACK1_LESSON_SUMMARIES, TRACK1_META } from "../content/track1";
import type { RootStackParamList } from "../navigation/types";

type NodeState = "locked" | "current" | "completed";

export function TrackDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "TrackDetail">>();
  const progressByLessonId = useAppStore((s) => s.progressByLessonId);
  const accent = trackAccent[route.params.trackId as keyof typeof trackAccent] ?? trackAccent["track-1-hiv-stigma"];

  const firstIncompleteIndex = TRACK1_LESSON_SUMMARIES.findIndex(
    (l) => progressByLessonId[l.id]?.status !== "completed"
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, gap: space.md }}>
      <View style={[styles.introBlock, { backgroundColor: accent }]}>
        <Text style={styles.introHost}>Hosted by Zara</Text>
        <Text style={styles.introTitle}>{TRACK1_META.title}</Text>
      </View>

      {TRACK1_LESSON_SUMMARIES.map((lesson, index) => {
        const isCompleted = progressByLessonId[lesson.id]?.status === "completed";
        const isCurrent = !isCompleted && index === firstIncompleteIndex;
        const state: NodeState = isCompleted ? "completed" : isCurrent ? "current" : "locked";
        const hasContent = Boolean(TRACK1_LESSON_CONTENT[lesson.id]);

        return (
          <LessonNode
            key={lesson.id}
            title={lesson.title}
            lessonNumber={lesson.lessonNumber}
            state={state}
            accent={accent}
            offset={index % 2 === 0 ? 0 : 24}
            onPress={() => {
              if (state === "locked") return; // gentle shake handled inside LessonNode
              if (!hasContent) return; // handled inside LessonNode (Buggy "more soon" note)
              navigation.navigate("LessonPlayer", { lessonId: lesson.id, isReplay: isCompleted });
            }}
            disabledReason={state === "locked" ? "Complete the lesson before this one first." : !hasContent ? "More lessons on the way." : null}
          />
        );
      })}
    </ScrollView>
  );
}

function LessonNode({
  title,
  lessonNumber,
  state,
  accent,
  offset,
  onPress,
  disabledReason,
}: {
  title: string;
  lessonNumber: number;
  state: NodeState;
  accent: string;
  offset: number;
  onPress: () => void;
  disabledReason: string | null;
}) {
  const shake = useRef(new Animated.Value(0)).current;
  const [showHint, setShowHint] = React.useState(false);

  const handlePress = () => {
    if (disabledReason) {
      setShowHint(true);
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start(() => setTimeout(() => setShowHint(false), 1800));
      return;
    }
    onPress();
  };

  const backgroundColor = state === "completed" ? accent : state === "current" ? "#FFFFFF" : "#EFEDEA";
  const borderColor = state === "locked" ? color.border.subtle : accent;

  return (
    <View style={{ marginLeft: offset }}>
      <Animated.View style={{ transform: [{ translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] }) }] }}>
        <TouchableOpacity
          style={[styles.node, { backgroundColor, borderColor }]}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityState={{ disabled: state === "locked" }}
        >
          <Text style={[styles.nodeIcon, { color: state === "completed" ? "#FFF" : accent }]}>
            {state === "completed" ? "✓" : state === "locked" ? "🔒" : String(lessonNumber)}
          </Text>
          <Text style={[styles.nodeTitle, { color: state === "completed" ? "#FFF" : color.text.onLight.primary }]} numberOfLines={2}>
            {title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      {showHint && disabledReason ? <Text style={styles.hint}>{disabledReason}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  introBlock: { borderRadius: radius.md, padding: space.lg },
  introHost: { color: "#FFFFFF", opacity: 0.85, fontSize: 13, fontWeight: "600" },
  introTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "700", marginTop: 4 },
  node: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    borderWidth: 2,
    borderRadius: radius.md,
    padding: space.md,
    width: 240,
  },
  nodeIcon: { fontSize: 18, fontWeight: "700", width: 24, textAlign: "center" },
  nodeTitle: { flex: 1, fontSize: 14, fontWeight: "600" },
  hint: { fontSize: 12, color: color.text.onLight.secondary, marginTop: 4, maxWidth: 220 },
});

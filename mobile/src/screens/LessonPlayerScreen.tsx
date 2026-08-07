/**
 * Lesson Player -- Ch.15 (Gist Mode only this pass, Ch.68 step 3 scope;
 * Drama Mode is step 5). Quiz Flow (Ch.16) is nested inside as a second
 * phase of this same screen, matching Ch.11 SS11.1 item 8's "nested inside
 * Lesson Player" description rather than a separate route.
 *
 * SCOPE NOTE (flagged per Ch.67 SS67.3): Ch.30 SS30.5's "Practice Mode"
 * (unlimited-attempts review content drawn from other completed lessons)
 * is not implemented this pass -- there isn't yet a broad enough library
 * of completed content across tracks to draw a meaningful practice set
 * from. The zero-hearts *pause* and the *wait-for-regeneration* path
 * (with a real live countdown against heartsLastRegenAt) are fully
 * implemented and functional; only the alternate Practice Mode path is
 * stubbed as an honest "coming soon" message rather than fake
 * unlimited-attempts content.
 */
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space, trackAccent } from "../design/tokens";
import { BuggyLine } from "../components/BuggyMascot";
import { CHARACTERS } from "../characters/characters";
import { findLessonById } from "../content/allTracks";
import { useAppStore } from "../state/useAppStore";
import { HEARTS_CAP } from "../economy/economy";
import { TIMING } from "../design/motion";
import { buildShakeAnimation, getShakeStyle } from "../utils/gentleShake";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Beat, QuizQuestion } from "../types/content";
import type { RootStackParamList } from "../navigation/types";

// Ch.41.2's global timing table (Book VI, Ch.68 step 6): typing indicator
// duration is randomized within a range per bubble, deliberately, so the
// reveal rhythm doesn't feel mechanical/identical every time.
function randomTypingDelayMs(): number {
  return TIMING.typingIndicatorMinMs + Math.random() * (TIMING.typingIndicatorMaxMs - TIMING.typingIndicatorMinMs);
}
// Correct-answer feedback: 180ms in, holds 600ms, then auto-advances (Ch.41.2).
const CORRECT_AUTO_ADVANCE_MS = TIMING.correctFeedbackInMs + TIMING.correctFeedbackHoldMs;

type Phase = "reading" | "quiz" | "out-of-hearts";

export function LessonPlayerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "LessonPlayer">>();
  const { lessonId, isReplay } = route.params;
  const found = findLessonById(lessonId);
  const lesson = found?.lesson;
  const accent = trackAccent[found?.trackId ?? "track-1-hiv-stigma"];

  const startLesson = useAppStore((s) => s.startLesson);
  const recordQuizAnswer = useAppStore((s) => s.recordQuizAnswer);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const heartsCurrent = useAppStore((s) => s.economy.heartsCurrent);
  const heartsLastRegenAt = useAppStore((s) => s.economy.heartsLastRegenAt);

  const [phase, setPhase] = useState<Phase>("reading");
  const [revealedCount, setRevealedCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmedCorrect, setConfirmedCorrect] = useState<boolean | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    startLesson(lessonId);
  }, [lessonId, startLesson]);

  // Staggered bubble reveal with a typing indicator, per Ch.15 SS15.3.
  useEffect(() => {
    if (phase !== "reading" || !lesson) return;
    if (revealedCount >= lesson.beats.length) return;
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      setRevealedCount((c) => c + 1);
    }, randomTypingDelayMs());
    return () => clearTimeout(t);
  }, [phase, revealedCount, lesson]);

  if (!lesson) {
    // Non-Negotiable #8 / Ch.2 SS2.2: no anonymous system copy -- even this
    // fallback state is Buggy-attributed, not a bare string.
    return (
      <View style={styles.center}>
        <BuggyLine text="This lesson isn't ready yet — more are on the way." />
      </View>
    );
  }

  const progressFraction =
    phase === "reading" ? revealedCount / lesson.beats.length : 1;

  const handleExit = () => {
    if (answeredCount > 0) {
      Alert.alert(
        "Leaving now?",
        "Your answers so far are saved, you can pick this back up anytime.",
        [
          { text: "Keep going", style: "cancel" },
          { text: "Leave", style: "destructive", onPress: () => navigation.goBack() },
        ]
      );
      return;
    }
    navigation.goBack();
  };

  const currentQuestion = lesson.quiz.questions[questionIndex];

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    const wasCorrect = selectedOption === currentQuestion.correctOptionIndex;
    setConfirmedCorrect(wasCorrect);
    recordQuizAnswer(lessonId, currentQuestion.questionId, selectedOption, wasCorrect, isReplay);
    setAnsweredCount((c) => c + 1);

    if (wasCorrect) {
      setTimeout(() => advanceQuestion(), CORRECT_AUTO_ADVANCE_MS);
    } else if (!isReplay && heartsCurrent - 1 <= 0) {
      // will hit zero -- pause after this feedback is read via "Got it, next"
    }
  };

  const advanceQuestion = () => {
    setSelectedOption(null);
    setConfirmedCorrect(null);
    if (questionIndex + 1 >= lesson.quiz.questions.length) {
      finishLesson();
      return;
    }
    if (!isReplay && heartsCurrent <= 0) {
      setPhase("out-of-hearts");
      return;
    }
    setQuestionIndex((i) => i + 1);
  };

  const finishLesson = () => {
    const result = completeLesson(lessonId, { isReplay });
    navigation.replace("LessonComplete", {
      lessonId,
      trackId: found?.trackId ?? "track-1-hiv-stigma",
      xpAwarded: result.xpAwarded,
      newlyUnlockedBadges: result.newlyUnlockedBadges,
      streakAfter: result.streakAfter,
      isReplay,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={handleExit} accessibilityLabel="Close lesson">
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progressFraction * 100)}%`, backgroundColor: accent }]} />
        </View>
      </View>

      {isReplay ? <Text style={styles.replayLabel}>Reviewing — this won't change your streak or XP</Text> : null}

      {phase === "reading" && (
        <ReadingPhase
          beats={lesson.beats}
          revealedCount={revealedCount}
          isTyping={isTyping}
          accent={accent}
          onStartQuiz={() => setPhase("quiz")}
          allRevealed={revealedCount >= lesson.beats.length}
        />
      )}

      {phase === "quiz" && currentQuestion && (
        <QuizPhase
          key={currentQuestion.questionId}
          question={currentQuestion}
          total={lesson.quiz.questions.length}
          index={questionIndex}
          accent={accent}
          selectedOption={selectedOption}
          confirmedCorrect={confirmedCorrect}
          onSelect={setSelectedOption}
          onConfirm={handleConfirmAnswer}
          onContinue={advanceQuestion}
        />
      )}

      {phase === "out-of-hearts" && (
        <OutOfHeartsPhase
          heartsLastRegenAt={heartsLastRegenAt}
          onResume={() => setPhase("quiz")}
          accent={accent}
          hostSpeaker={lesson.beats[0].speaker} // HOOK beat is always the track host (Ch.34 SS34.2)
        />
      )}
    </View>
  );
}

function ReadingPhase({
  beats,
  revealedCount,
  isTyping,
  accent,
  onStartQuiz,
  allRevealed,
}: {
  beats: Beat[];
  revealedCount: number;
  isTyping: boolean;
  accent: string;
  onStartQuiz: () => void;
  allRevealed: boolean;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const visibleBeats = beats.slice(0, revealedCount);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: space.lg, gap: space.md }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {visibleBeats.map((beat) => (
          <ChatBubble key={beat.beatId} beat={beat} accent={accent} />
        ))}
        {isTyping && revealedCount < beats.length ? (
          <TypingIndicator speaker={beats[revealedCount].speaker} />
        ) : null}
      </ScrollView>
      {allRevealed ? (
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: accent }]} onPress={onStartQuiz}>
          <Text style={styles.primaryButtonText}>Start quiz</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function ChatBubble({ beat, accent }: { beat: Beat; accent: string }) {
  const character = CHARACTERS[beat.speaker];
  const isHost = beat.speaker !== "bello" && beat.speaker !== "buggy";
  const reducedMotion = useReducedMotion();
  // Ch.41.2: chat bubble reveal, Soft-Fade-Slide, 220ms, slide up from 12px
  // + fade -- plays once on this bubble's own mount (i.e. the moment it's
  // revealed), not re-triggered on re-render.
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: reducedMotion ? 150 : TIMING.chatBubbleRevealMs,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, reducedMotion]);

  const animatedStyle = {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [TIMING.chatBubbleSlideDistancePx, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.bubbleRow, animatedStyle]}>
      <View style={[styles.avatar, { backgroundColor: character.accentColor }]}>
        <Text style={styles.avatarInitial}>{character.name[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.speakerName}>{character.name}</Text>
        <View style={[styles.bubble, isHost ? { borderColor: accent, borderWidth: 1 } : null]}>
          <Text style={styles.bubbleText}>{beat.text}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

function TypingIndicator({ speaker }: { speaker: Beat["speaker"] }) {
  const character = CHARACTERS[speaker];
  return (
    <View style={styles.bubbleRow}>
      <View style={[styles.avatar, { backgroundColor: character.accentColor }]}>
        <Text style={styles.avatarInitial}>{character.name[0]}</Text>
      </View>
      <View style={[styles.bubble, styles.typingBubble, { flexDirection: "row", gap: 4 }]}>
        <TypingDot delayMs={0} />
        <TypingDot delayMs={150} />
        <TypingDot delayMs={300} />
      </View>
    </View>
  );
}

/** Ch.45.2: three-dot pulse, each dot scaling 1.0x -> 1.3x -> 1.0x in
 * sequence with a 150ms offset between dots, looping continuously. This
 * is the app's one deliberately "borrowed" convention (the near-universal
 * chat-app typing indicator), per Ch.45.2's own reasoning. */
function TypingDot({ delayMs }: { delayMs: number }) {
  const reducedMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reducedMotion) return; // dots stay static; the "..." reads fine without motion
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delayMs),
        Animated.timing(scale, { toValue: 1.3, duration: 250, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 250, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reducedMotion, scale, delayMs]);

  return (
    <Animated.View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: color.text.onLight.secondary,
        transform: [{ scale }],
      }}
    />
  );
}

function QuizPhase({
  question,
  total,
  index,
  accent,
  selectedOption,
  confirmedCorrect,
  onSelect,
  onConfirm,
  onContinue,
}: {
  question: QuizQuestion;
  total: number;
  index: number;
  accent: string;
  selectedOption: number | null;
  confirmedCorrect: boolean | null;
  onSelect: (i: number) => void;
  onConfirm: () => void;
  onContinue: () => void;
}) {
  const isAnswered = confirmedCorrect !== null;
  const reducedMotion = useReducedMotion();
  const shake = useRef(new Animated.Value(0)).current;
  // Ch.42.3: incorrect feedback runs Gentle-Shake (320ms) on the selected
  // option, then the correction fades in immediately after -- no overlap,
  // so the shake fully reads before new information arrives. Correct
  // feedback has nothing to shake, so its text is visible immediately.
  const [showCorrection, setShowCorrection] = useState(confirmedCorrect === true);

  useEffect(() => {
    if (confirmedCorrect === true) {
      setShowCorrection(true);
    } else if (confirmedCorrect === false) {
      setShowCorrection(false);
      buildShakeAnimation(shake, reducedMotion).start(() => setShowCorrection(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedCorrect]);

  return (
    <View style={{ flex: 1, padding: space.lg }}>
      <Text style={styles.eyebrow}>
        Question {index + 1} of {total}
      </Text>
      <Text style={styles.question}>{question.prompt}</Text>

      <View style={{ gap: space.sm, marginTop: space.md }}>
        {question.options.map((opt, i) => {
          const isSelected = selectedOption === i;
          const isCorrectOption = i === question.correctOptionIndex;
          let bg = "#FFFFFF";
          let borderColor: string = color.border.subtle;
          if (isAnswered && isCorrectOption) {
            bg = color.success.muted;
            borderColor = color.success.muted;
          } else if (isAnswered && isSelected && !isCorrectOption) {
            bg = color.warn.muted;
            borderColor = color.warn.muted;
          } else if (isSelected) {
            borderColor = accent;
          }
          const wrapperStyle = isSelected && isAnswered && !isCorrectOption ? getShakeStyle(shake, reducedMotion) : undefined;
          return (
            <Animated.View key={i} style={wrapperStyle}>
              <TouchableOpacity
                disabled={isAnswered}
                onPress={() => onSelect(i)}
                style={[styles.option, { backgroundColor: bg, borderColor }]}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {isAnswered && showCorrection ? (
        <View style={{ marginTop: space.lg }}>
          <Text style={styles.feedbackText}>
            {confirmedCorrect ? question.correctFeedback : question.incorrectFeedback}
          </Text>
          {!confirmedCorrect ? (
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: accent, marginTop: space.md }]} onPress={onContinue}>
              <Text style={styles.primaryButtonText}>Got it, next</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {!isAnswered ? (
        <TouchableOpacity
          disabled={selectedOption === null}
          style={[styles.primaryButton, { backgroundColor: accent, marginTop: space.lg, opacity: selectedOption === null ? 0.4 : 1 }]}
          onPress={onConfirm}
        >
          <Text style={styles.primaryButtonText}>Check</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function OutOfHeartsPhase({
  heartsLastRegenAt,
  onResume,
  accent,
  hostSpeaker,
}: {
  heartsLastRegenAt: string;
  onResume: () => void;
  accent: string;
  hostSpeaker: Beat["speaker"];
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const nextHeartAt = new Date(heartsLastRegenAt).getTime() + 4 * 60 * 60 * 1000;
  const msRemaining = Math.max(0, nextHeartAt - now);
  const canResume = msRemaining <= 0;
  const hh = Math.floor(msRemaining / (1000 * 60 * 60));
  const mm = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const ss = Math.floor((msRemaining % (1000 * 60)) / 1000);

  const host = CHARACTERS[hostSpeaker];

  return (
    <View style={{ flex: 1, padding: space.lg, justifyContent: "center", alignItems: "center", gap: space.md }}>
      {/* Rule 30.5.2: character-voiced (the current lesson's host), never a
       * generic/anonymous pause screen. */}
      <View style={styles.bubbleRow}>
        <View style={[styles.avatar, { backgroundColor: host.accentColor }]}>
          <Text style={styles.avatarInitial}>{host.name[0]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.speakerName}>{host.name}</Text>
          <View style={[styles.bubble, { borderColor: accent, borderWidth: 1 }]}>
            <Text style={styles.bubbleText}>Let's take a short break from new questions.</Text>
          </View>
        </View>
      </View>
      <Text style={styles.body}>Both of these are just as good:</Text>

      <View style={styles.heartOptionCard}>
        <Text style={styles.optionText}>Wait for your next heart</Text>
        <Text style={styles.feedbackText}>
          {canResume ? "Ready now" : `${hh}h ${mm}m ${ss}s`}
        </Text>
        {canResume ? (
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: accent, marginTop: space.sm }]} onPress={onResume}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.heartOptionCard}>
        <Text style={styles.optionText}>Practice Mode</Text>
        <Text style={styles.feedbackText}>
          Coming soon — for now there's only one lesson to review anyway.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.lg },
  topRow: { flexDirection: "row", alignItems: "center", gap: space.md, padding: space.md },
  closeIcon: { fontSize: 26, color: color.text.onLight.secondary, width: 28, textAlign: "center" },
  progressTrack: { flex: 1, height: 6, borderRadius: 3, backgroundColor: color.border.subtle, overflow: "hidden" },
  progressFill: { height: 6 },
  replayLabel: { textAlign: "center", fontSize: 12, color: color.text.onLight.secondary, marginBottom: space.xs },
  bubbleRow: { flexDirection: "row", gap: space.sm, alignItems: "flex-start" },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  avatarInitial: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  speakerName: { fontSize: 12, fontWeight: "600", color: color.text.onLight.secondary, marginBottom: 2 },
  bubble: { backgroundColor: "#FFFFFF", borderRadius: radius.md, padding: space.md },
  typingBubble: { opacity: 0.6 },
  bubbleText: { fontSize: 15, color: color.text.onLight.primary, lineHeight: 21 },
  primaryButton: { borderRadius: radius.sm, paddingVertical: space.md, alignItems: "center", marginHorizontal: space.lg, marginBottom: space.lg },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  eyebrow: { fontSize: 12, fontWeight: "600", color: color.text.onLight.secondary },
  question: { fontSize: 20, fontWeight: "700", color: color.text.onLight.primary, marginTop: 4 },
  option: { borderWidth: 1.5, borderRadius: radius.sm, padding: space.md },
  optionText: { fontSize: 15, fontWeight: "600", color: color.text.onLight.primary },
  feedbackText: { fontSize: 14, color: color.text.onLight.secondary, lineHeight: 20 },
  body: { fontSize: 15, color: color.text.onLight.secondary, textAlign: "center" },
  heartOptionCard: { width: "100%", backgroundColor: "#FFFFFF", borderRadius: radius.md, padding: space.md, gap: 4 },
});

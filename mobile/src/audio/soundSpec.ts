/**
 * Book VII (Ch.47-51) sound specification, transcribed as typed data.
 * NO AUDIO ASSET PIPELINE EXISTS YET in this build (Ch.68 step 7 gap,
 * flagged honestly per Ch.67 SS67.3 rather than faked with a silent
 * `playSound()` that pretends to work) -- this file exists so the
 * *pairing* half of Book VII (which event fires which haptic, and which
 * Book VI animation each sound is meant to sync with) is correct and
 * wireable now. `fireSoundEvent()` only ever fires the haptic half; when
 * real sound files are dropped in later, the audio-playback call belongs
 * right next to the haptic call inside that function, reusing the same
 * event names and the same Rule 47.3.2 toggle check.
 *
 * Rule 47.3.2: sound (and by the same constitutional logic applied here,
 * its haptic pairing) must respect the Settings toggle with zero
 * exceptions -- there is no event below that bypasses hapticsEnabled.
 */
import * as Haptics from "expo-haptics";

export type SoundEvent =
  | "buttonTap"
  | "correctAnswer"
  | "incorrectAnswer"
  | "streakIncrement"
  | "streakFreezeConsumed"
  | "streakReset"
  | "xpAwarded"
  | "screenTransition"
  | "lockedNodeTap";

interface SoundSpecEntry {
  /** Ch.48.1's "Sound Character" column, transcribed verbatim. */
  characterDescription: string;
  approxDuration: string;
  /** Which Book VI section this sound is meant to fire in sync with. */
  pairedAnimationRef: string;
  /** null means Ch.48.1 specifies "none" for this event -- deliberate,
   * not a gap (e.g. streak reset and screen transitions are meant to stay
   * quiet per Rule 47.1.1 / Rule 47.3.1). */
  haptic: (() => Promise<void>) | null;
}

export const SOUND_SPEC: Record<SoundEvent, SoundSpecEntry> = {
  buttonTap: {
    characterDescription: "Soft, short 'pop' — a rounded, low-transient click, not a sharp digital beep",
    approxDuration: "60–90ms",
    pairedAnimationRef: "Ch.41.2 button tap feedback",
    haptic: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  },
  correctAnswer: {
    characterDescription: "Bright, short ascending two-note chime (major interval) — cheerful but brief, never a fanfare",
    approxDuration: "300–400ms",
    pairedAnimationRef: "Ch.42.3 Correct",
    haptic: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  },
  incorrectAnswer: {
    characterDescription:
      "Low, soft, single warm 'womp' tone — rounded low-frequency tone with a gentle downward pitch bend; explicitly not a buzzer (Rule 47.1.1)",
    approxDuration: "250–350ms",
    pairedAnimationRef: "Ch.42.3 Incorrect",
    haptic: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  },
  streakIncrement: {
    characterDescription: "Small flame-appropriate 'whoosh-pop,' a light airy transient",
    approxDuration: "200ms",
    pairedAnimationRef: "Ch.43.1",
    haptic: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  },
  streakFreezeConsumed: {
    characterDescription: "A soft, slightly muted 'crystalline' chime — distinct 'frost' timbre from the normal increment sound",
    approxDuration: "300ms",
    pairedAnimationRef: "Ch.43.2",
    haptic: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  },
  streakReset: {
    characterDescription:
      "A very quiet, low, single soft tone — deliberately underplayed; must not use a 'failure' sound archetype",
    approxDuration: "200ms, low volume",
    pairedAnimationRef: "Ch.43.3",
    haptic: null, // Ch.48.1: "no haptic on reset" -- deliberate, not an oversight
  },
  xpAwarded: {
    characterDescription: "Light, quick ascending 'tick' sequence synced to the digit count-up — a few short bright ticks",
    approxDuration: "matches count-up duration, ~500ms",
    pairedAnimationRef: "Ch.43.4",
    haptic: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  },
  screenTransition: {
    characterDescription: "None by default (silent) — frequent enough to become fatiguing per Rule 47.3.1",
    approxDuration: "—",
    pairedAnimationRef: "Ch.45.1",
    haptic: null,
  },
  lockedNodeTap: {
    characterDescription: "Same 'womp' family as incorrect-answer, but shorter and quieter",
    approxDuration: "150ms",
    pairedAnimationRef: "Ch.45.3",
    haptic: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  },
};

export function fireSoundEvent(event: SoundEvent, hapticsEnabled: boolean): void {
  if (!hapticsEnabled) return;
  const entry = SOUND_SPEC[event];
  if (!entry.haptic) return; // some events are deliberately haptic-free per the table above
  try {
    entry.haptic()?.catch(() => {
      // Haptics unavailable on this platform (e.g. web target, a
      // simulator without a haptic engine) -- fail silently rather than
      // let a decorative feedback call break the interaction it's
      // attached to.
    });
  } catch {
    // Synchronous throw from the native module missing entirely -- same
    // fail-open reasoning as above.
  }
}

/*
 * NOT YET WIRED (Book VII gap, flagged honestly):
 * - The actual audio playback half of every event above -- no sound
 *   asset files exist in this build yet.
 * - Ch.48.2's celebration sound layer (Tier 1/2/3 jingles) -- depends on
 *   the same missing asset pipeline, plus the Lottie celebration visuals
 *   this is meant to sync with (see motion.ts's own "not yet wired" note).
 * - Ch.49's Tier-3-only musical sting.
 * - Ch.50's seven character non-verbal sound signatures.
 * - Ch.51's voice-direction notes are Bible-only reference content for a
 *   future voice-acted build; Phase 1 is explicitly text-only per Ch.51.1,
 *   so there's nothing to implement here.
 * - The global "any tappable element" button-tap haptic (Ch.48.1 row 1)
 *   -- wired so far only at the specific call sites this pass touched
 *   (quiz answers, locked-node rejection, streak increment/freeze), not
 *   retrofitted onto every existing TouchableOpacity in the app.
 */

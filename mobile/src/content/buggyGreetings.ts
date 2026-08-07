/**
 * Buggy's Home greeting -- Ch.13 SS13.2 item 1 (memory-aware, never
 * anonymous system copy) + Ch.21 SS21.5 (short, specific, no guilt).
 *
 * Manual Voice Test check (Ch.21 SS21.7):
 * - Short (1-2 sentences)? Every branch is a single short sentence.
 * - References something specific/real when memory data exists? Streak
 *   count is used directly wherever the user has one; the true first-time
 *   case has no memory data to reference yet, which is the one honest
 *   exception the rule itself anticipates ("if memory data exists").
 * - Emotional intensity within Buggy's narrow range? Yes -- no escalation,
 *   no exclamation-heavy copy.
 * - Never states days-away as a leading fact on return (Rule 1.6.2)? The
 *   returning-with-no-streak branch says only "Good to see you again." --
 *   no gap length anywhere.
 */
import type { Economy } from "../types/models";

export function getHomeGreeting(economy: Economy, today: string, hasAnyCompletedLesson: boolean): string {
  const completedToday = economy.lastStreakIncrementDate === today;

  if (!hasAnyCompletedLesson) {
    return "Hey — good to have you.";
  }
  if (completedToday) {
    return economy.currentStreak <= 1 ? "Day one, logged." : `${economy.currentStreak} days now.`;
  }
  if (economy.currentStreak >= 1) {
    return `Streak's at ${economy.currentStreak}. Ready when you are.`;
  }
  return "Good to see you again.";
}

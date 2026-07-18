import { getCurrentUserId, json } from "../../../lib/auth.js";
import { getOrCreateStats, touchStreak, unlockBadgesIfEligible } from "../../../lib/db.js";

export async function onRequestPost({ request, env, params }) {
  const userId = await getCurrentUserId(request, env);
  if (!userId) return json({ error: "Not signed in" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const quizCorrect = Number(body.quizCorrect) || 0;
  const quizTotal = Number(body.quizTotal) || 0;
  const wrongAnswers = Math.max(0, quizTotal - quizCorrect);

  const lesson = await env.DB.prepare("SELECT * FROM lessons WHERE id = ?").bind(params.id).first();
  if (!lesson) return json({ error: "Lesson not found" }, { status: 404 });

  await env.DB.prepare(
    "INSERT INTO user_lesson_progress (user_id, lesson_id) VALUES (?, ?) ON CONFLICT (user_id, lesson_id) DO NOTHING"
  ).bind(userId, params.id).run();

  let stats = await getOrCreateStats(env, userId);
  const newHearts = Math.max(0, stats.hearts - wrongAnswers);
  await env.DB.prepare(
    "UPDATE user_stats SET quiz_correct = quiz_correct + ?, quiz_total = quiz_total + ?, hearts = ? WHERE user_id = ?"
  ).bind(quizCorrect, quizTotal, newHearts, userId).run();
  stats = await getOrCreateStats(env, userId);
  stats = await touchStreak(env, userId, stats);

  const remaining = await env.DB.prepare(
    "SELECT COUNT(*) as n FROM lessons WHERE track_id = ? AND id NOT IN (SELECT lesson_id FROM user_lesson_progress WHERE user_id = ?)"
  ).bind(lesson.track_id, userId).first();
  const trackDone = remaining.n === 0;

  const newBadges = await unlockBadgesIfEligible(env, userId, stats, trackDone);

  return json({
    trackDone,
    newBadges,
    stats: {
      streak: stats.streak,
      hearts: stats.hearts,
      quizCorrect: stats.quiz_correct,
      quizTotal: stats.quiz_total,
    },
  });
}

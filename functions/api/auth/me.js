import { getCurrentUserId, json } from "../../lib/auth.js";
import { getUserById, getOrCreateStats } from "../../lib/db.js";

export async function onRequestGet({ request, env }) {
  const userId = await getCurrentUserId(request, env);
  if (!userId) return json({ error: "Not signed in" }, { status: 401 });

  const user = await getUserById(env, userId);
  if (!user) return json({ error: "Not signed in" }, { status: 401 });

  const stats = await getOrCreateStats(env, userId);
  const doneRow = await env.DB.prepare(
    "SELECT COUNT(*) as n FROM user_lesson_progress WHERE user_id = ?"
  ).bind(userId).first();
  const badgeRows = await env.DB.prepare(
    "SELECT badge_id FROM user_badges WHERE user_id = ?"
  ).bind(userId).all();

  return json({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: !!user.email_verified,
    stats: {
      streak: stats.streak,
      hearts: stats.hearts,
      quizCorrect: stats.quiz_correct,
      quizTotal: stats.quiz_total,
      gistCount: stats.gist_count,
      certInterest: !!stats.cert_interest,
    },
    lessonsCompleted: doneRow.n,
    level: doneRow.n + 1,
    unlockedBadgeIds: badgeRows.results.map(r => r.badge_id),
  });
}

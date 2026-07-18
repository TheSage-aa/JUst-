import { getCurrentUserId, json } from "../../../../lib/auth.js";

export async function onRequestPost({ request, env, params }) {
  const userId = await getCurrentUserId(request, env);
  if (!userId) return json({ error: "Not signed in" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const episode = await env.DB.prepare("SELECT * FROM gist_episodes WHERE id = ?").bind(params.id).first();
  if (!episode) return json({ error: "Episode not found" }, { status: 404 });

  const already = await env.DB.prepare(
    "SELECT 1 FROM gist_completions WHERE user_id = ? AND episode_id = ?"
  ).bind(userId, params.id).first();

  if (!already) {
    await env.DB.prepare(
      "INSERT INTO gist_completions (user_id, episode_id, choice) VALUES (?, ?, ?)"
    ).bind(userId, params.id, body.choice || null).run();
    await env.DB.prepare(
      "UPDATE user_stats SET gist_count = gist_count + 1 WHERE user_id = ?"
    ).bind(userId).run();
  }

  return json({ xpEarned: episode.xp_reward });
}

import { getCurrentUserId, json } from "../lib/auth.js";

export async function onRequestGet({ request, env }) {
  const { results: badges } = await env.DB.prepare("SELECT * FROM badges").all();
  const userId = await getCurrentUserId(request, env);

  let unlocked = new Set();
  if (userId) {
    const { results } = await env.DB.prepare(
      "SELECT badge_id FROM user_badges WHERE user_id = ?"
    ).bind(userId).all();
    unlocked = new Set(results.map(r => r.badge_id));
  }

  return json(badges.map(b => ({
    id: b.id,
    title: b.title,
    subtitle: b.subtitle,
    emoji: b.icon_emoji,
    color: b.color,
    unlocked: unlocked.has(b.id),
  })));
}

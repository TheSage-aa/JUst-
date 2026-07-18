import { getCurrentUserId, json } from "../../lib/auth.js";
import { getOrCreateStats } from "../../lib/db.js";

export async function onRequestPost({ request, env }) {
  const userId = await getCurrentUserId(request, env);
  if (!userId) return json({ error: "Not signed in" }, { status: 401 });

  await getOrCreateStats(env, userId);
  await env.DB.prepare("UPDATE user_stats SET cert_interest = 1 WHERE user_id = ?").bind(userId).run();
  return json({ certInterest: true });
}

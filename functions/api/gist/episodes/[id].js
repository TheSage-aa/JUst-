import { json } from "../../../lib/auth.js";

export async function onRequestGet({ env, params }) {
  const episode = await env.DB.prepare(
    "SELECT * FROM gist_episodes WHERE id = ? AND is_published = 1"
  ).bind(params.id).first();
  if (!episode) return json({ error: "Episode not found" }, { status: 404 });

  return json({
    id: episode.id,
    title: episode.title,
    crew: JSON.parse(episode.crew_json),
    script: JSON.parse(episode.script_json),
    xpReward: episode.xp_reward,
  });
}

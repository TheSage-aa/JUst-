import { json } from "../../../lib/auth.js";

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT id, title, crew_json, xp_reward FROM gist_episodes WHERE is_published = 1"
  ).all();
  return json(results.map(r => ({ id: r.id, title: r.title, crew: JSON.parse(r.crew_json), xpReward: r.xp_reward })));
}

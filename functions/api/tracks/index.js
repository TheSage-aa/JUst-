import { json } from "../../lib/auth.js";

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT id, slug, title, unit_label, sort_order FROM tracks WHERE is_published = 1 ORDER BY sort_order"
  ).all();
  return json(results);
}

import { getCurrentUserId, json } from "../../../lib/auth.js";

export async function onRequestGet({ request, env, params }) {
  const { results } = await env.DB.prepare(
    "SELECT id, sort_order, title, content_json, quiz_json FROM lessons WHERE track_id = ? ORDER BY sort_order"
  ).bind(params.id).all();

  const userId = await getCurrentUserId(request, env);
  let completedIds = new Set();
  if (userId) {
    const done = await env.DB.prepare(
      "SELECT lesson_id FROM user_lesson_progress WHERE user_id = ? AND lesson_id IN (SELECT id FROM lessons WHERE track_id = ?)"
    ).bind(userId, params.id).all();
    completedIds = new Set(done.results.map(r => r.lesson_id));
  }

  const lessons = results.map(l => ({
    id: l.id,
    order: l.sort_order,
    title: l.title,
    content: JSON.parse(l.content_json),
    quiz: JSON.parse(l.quiz_json),
    completed: completedIds.has(l.id),
  }));

  return json({ trackId: params.id, lessons });
}

import { json } from "../../lib/auth.js";

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body || !body.userId || !body.code) {
    return json({ error: "userId and code are required" }, { status: 400 });
  }

  const row = await env.DB.prepare(
    "SELECT * FROM email_verification_codes WHERE user_id = ? AND code = ? AND used = 0 AND expires_at > datetime('now') ORDER BY created_at DESC LIMIT 1"
  ).bind(body.userId, body.code).first();

  if (!row) {
    return json({ error: "Invalid or expired code" }, { status: 400 });
  }

  await env.DB.prepare("UPDATE email_verification_codes SET used = 1 WHERE id = ?").bind(row.id).run();
  await env.DB.prepare("UPDATE users SET email_verified = 1 WHERE id = ?").bind(body.userId).run();

  return json({ verified: true });
}

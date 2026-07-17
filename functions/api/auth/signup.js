import { hashPassword, newId, json } from "../../lib/auth.js";
import { getUserByEmail } from "../../lib/db.js";

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.password || !body.name) {
    return json({ error: "name, email, and password are required" }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  if (body.password.length < 8) {
    return json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await getUserByEmail(env, email);
  if (existing) {
    return json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const id = newId();
  const passwordHash = await hashPassword(body.password);
  await env.DB.prepare(
    "INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)"
  ).bind(id, email, passwordHash, body.name.trim()).run();
  await env.DB.prepare("INSERT INTO user_stats (user_id) VALUES (?)").bind(id).run();

  // demo verification code -- in production this gets emailed, not returned
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await env.DB.prepare(
    "INSERT INTO email_verification_codes (id, user_id, code, expires_at) VALUES (?, ?, ?, datetime('now', '+15 minutes'))"
  ).bind(newId(), id, code).run();

  return json({ userId: id, email, devVerificationCode: code });
}

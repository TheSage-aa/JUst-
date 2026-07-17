import { verifyPassword, createSession, sessionCookie, json } from "../../lib/auth.js";
import { getUserByEmail } from "../../lib/db.js";

export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.password) {
    return json({ error: "email and password are required" }, { status: 400 });
  }

  const user = await getUserByEmail(env, body.email.trim().toLowerCase());
  if (!user || !(await verifyPassword(body.password, user.password_hash))) {
    return json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { token, maxAge } = await createSession(env, user.id);
  return json(
    { id: user.id, name: user.name, email: user.email },
    { headers: { "Set-Cookie": sessionCookie(token, maxAge) } }
  );
}

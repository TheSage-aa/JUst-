import { destroySession, clearSessionCookie, json } from "../../lib/auth.js";

export async function onRequestPost({ request, env }) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|; )session=([^;]+)/);
  if (match) await destroySession(env, match[1]);
  return json({ loggedOut: true }, { headers: { "Set-Cookie": clearSessionCookie() } });
}

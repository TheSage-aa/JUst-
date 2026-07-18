// Password hashing (PBKDF2-SHA256 via Web Crypto, available natively in the
// Workers runtime -- no external crypto library needed) and session helpers.

const PBKDF2_ITERATIONS = 100000;

function toHex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toHex(salt)}$${toHex(bits)}`;
}

export async function verifyPassword(password, stored) {
  const [scheme, iterStr, saltHex, hashHex] = stored.split("$");
  if (scheme !== "pbkdf2") return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: fromHex(saltHex), iterations: parseInt(iterStr, 10), hash: "SHA-256" },
    key,
    256
  );
  return toHex(bits) === hashHex;
}

export function newId() {
  return crypto.randomUUID();
}

export function newToken() {
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function createSession(env, userId) {
  const token = newToken();
  await env.SESSIONS.put(`session:${token}`, userId, { expirationTtl: SESSION_TTL_SECONDS });
  return { token, maxAge: SESSION_TTL_SECONDS };
}

export async function destroySession(env, token) {
  if (token) await env.SESSIONS.delete(`session:${token}`);
}

export function sessionCookie(token, maxAge) {
  return `session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie() {
  return `session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? match[1] : null;
}

export async function getCurrentUserId(request, env) {
  const token = getCookie(request, "session");
  if (!token) return null;
  return await env.SESSIONS.get(`session:${token}`);
}

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...(init.headers || {}) },
  });
}

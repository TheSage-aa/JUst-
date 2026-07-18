// Talks to the real Cloudflare Pages Functions API (functions/api/**).
// Session state lives server-side (httpOnly cookie); nothing auth-related
// is stored in localStorage anymore.

async function apiCall(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    credentials: "same-origin",
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

async function apiSignup({ name, email, password }) {
  return apiCall("/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password }) });
}

async function apiVerify({ userId, code }) {
  return apiCall("/auth/verify", { method: "POST", body: JSON.stringify({ userId, code }) });
}

async function apiLogin({ email, password }) {
  return apiCall("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

async function apiLogout() {
  return apiCall("/auth/logout", { method: "POST" });
}

async function apiCertInterest() {
  return apiCall("/auth/cert-interest", { method: "POST" });
}

// Returns the current user (with stats) or null if not signed in.
async function apiMe() {
  try {
    return await apiCall("/auth/me");
  } catch (err) {
    if (err.status === 401) return null;
    throw err;
  }
}

// Small helper: pages that require a session redirect to Welcome if there
// isn't one. Returns the user object on success (never returns on redirect).
async function requireAuth() {
  const user = await apiMe();
  if (!user) {
    window.location.href = "welcome.html";
    return null;
  }
  return user;
}

// Short-lived handoff between Sign Up -> Confirm (not an auth credential,
// just carries the new userId/email across the redirect).
function savePendingSignup(data) {
  sessionStorage.setItem("saabi_pending_signup", JSON.stringify(data));
}
function getPendingSignup() {
  const raw = sessionStorage.getItem("saabi_pending_signup");
  return raw ? JSON.parse(raw) : null;
}
function clearPendingSignup() {
  sessionStorage.removeItem("saabi_pending_signup");
}

const AUTH_KEY = "saabi_auth";

function getAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveAuth(data) {
  const current = getAuth() || {};
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ...current, ...data }));
}

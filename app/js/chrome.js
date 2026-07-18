// Shared header bits for the post-login screens (Learn/Gist/Badges/Profile).
// Also acts as the auth guard for these pages: redirects to Welcome if
// there's no active session.

async function initChrome() {
  const user = await requireAuth();
  if (!user) return; // requireAuth already redirected

  const initial = user.name.trim().charAt(0).toUpperCase() || "P";
  document.querySelectorAll(".js-avatar-initial").forEach(el => (el.textContent = initial));
  document.querySelectorAll(".js-streak-val").forEach(el => (el.textContent = user.stats.streak || 0));
  document.querySelectorAll(".js-hearts-val").forEach(el => (el.textContent = user.stats.hearts ?? 3));
  document.querySelectorAll(".js-user-name").forEach(el => (el.textContent = user.name));

  document.dispatchEvent(new CustomEvent("saabi:user-ready", { detail: user }));
  return user;
}

document.addEventListener("DOMContentLoaded", initChrome);

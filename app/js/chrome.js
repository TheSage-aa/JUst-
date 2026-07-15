// Shared header bits for the post-login screens (Learn/Gist/Badges/Profile).
const PROGRESS_KEY = "saabi_progress_v1";

function getProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : { completed: [], streak: 0, hearts: 3 };
}

function initChrome() {
  const auth = getAuth();
  const name = (auth && auth.name) || "Padi";
  const initial = name.trim().charAt(0).toUpperCase() || "P";
  document.querySelectorAll(".js-avatar-initial").forEach(el => (el.textContent = initial));

  const progress = getProgress();
  document.querySelectorAll(".js-streak-val").forEach(el => (el.textContent = progress.streak || 0));
  document.querySelectorAll(".js-hearts-val").forEach(el => (el.textContent = progress.hearts ?? 3));
  document.querySelectorAll(".js-user-name").forEach(el => (el.textContent = name));
}

document.addEventListener("DOMContentLoaded", initChrome);

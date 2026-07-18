-- Saabi by LUMA — D1 schema.
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS).
-- Apply with: wrangler d1 execute saabi-db --remote --file=db/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS email_verification_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  code TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  unit_label TEXT NOT NULL DEFAULT 'Unit 1',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks(id),
  sort_order INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  content_json TEXT NOT NULL,
  quiz_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_lesson_progress (
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  streak INTEGER NOT NULL DEFAULT 0,
  hearts INTEGER NOT NULL DEFAULT 3,
  quiz_correct INTEGER NOT NULL DEFAULT 0,
  quiz_total INTEGER NOT NULL DEFAULT 0,
  gist_count INTEGER NOT NULL DEFAULT 0,
  cert_interest INTEGER NOT NULL DEFAULT 0,
  last_active_date TEXT
);

CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  icon_emoji TEXT NOT NULL,
  color TEXT NOT NULL,
  unlock_rule TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id TEXT NOT NULL REFERENCES users(id),
  badge_id TEXT NOT NULL REFERENCES badges(id),
  unlocked_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS gist_episodes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  crew_json TEXT NOT NULL,
  script_json TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 10,
  is_published INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS gist_completions (
  user_id TEXT NOT NULL REFERENCES users(id),
  episode_id TEXT NOT NULL REFERENCES gist_episodes(id),
  choice TEXT,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, episode_id)
);

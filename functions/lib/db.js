export async function getUserByEmail(env, email) {
  return await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
}

export async function getUserById(env, id) {
  return await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
}

export async function getOrCreateStats(env, userId) {
  let stats = await env.DB.prepare("SELECT * FROM user_stats WHERE user_id = ?").bind(userId).first();
  if (!stats) {
    await env.DB.prepare("INSERT INTO user_stats (user_id) VALUES (?)").bind(userId).run();
    stats = await env.DB.prepare("SELECT * FROM user_stats WHERE user_id = ?").bind(userId).first();
  }
  return stats;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

// Applies the same streak/hearts-replenish rule the original client-only
// prototype used: +1 streak on a consecutive day, reset to 1 on a gap,
// hearts replenish to 3 on any new day.
export async function touchStreak(env, userId, stats) {
  const today = todayStr();
  if (stats.last_active_date === today) return stats;
  let streak;
  if (stats.last_active_date) {
    streak = daysBetween(stats.last_active_date, today) === 1 ? stats.streak + 1 : 1;
  } else {
    streak = 1;
  }
  await env.DB.prepare(
    "UPDATE user_stats SET streak = ?, hearts = 3, last_active_date = ? WHERE user_id = ?"
  ).bind(streak, today, userId).run();
  return { ...stats, streak, hearts: 3, last_active_date: today };
}

export async function unlockBadgesIfEligible(env, userId, stats, trackDone) {
  const rules = await env.DB.prepare("SELECT * FROM badges").all();
  const already = await env.DB.prepare("SELECT badge_id FROM user_badges WHERE user_id = ?").bind(userId).all();
  const have = new Set(already.results.map(r => r.badge_id));
  const newlyUnlocked = [];
  for (const badge of rules.results) {
    if (have.has(badge.id)) continue;
    const [rule, arg] = badge.unlock_rule.split(":");
    let eligible = false;
    if (rule === "track_complete" && trackDone) eligible = true;
    if (rule === "streak_gte" && stats.streak >= parseInt(arg, 10)) eligible = true;
    if (eligible) {
      await env.DB.prepare("INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)").bind(userId, badge.id).run();
      newlyUnlocked.push(badge.id);
    }
  }
  return newlyUnlocked;
}

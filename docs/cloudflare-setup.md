# Cloudflare Setup

The data plane already exists in your Cloudflare account:

- **D1 database**: `saabi-db` (id `b782b390-4990-43f6-b342-f54f313c7fd0`) — schema created, seeded with Track 1's 10 lessons, 6 badges, and 1 Gist episode ("The Salt Water Myth"). Verified live and intact.
- **KV namespace**: `saabi-sessions` (id `72b5642f91a64878885c25baf2b35fd8`) — used for login sessions.
- **R2**: not yet created — R2 needs to be manually enabled once for your account at Dashboard → R2 → "Enable R2" (billing/terms step) before it can be provisioned. Not required for launch; character art is currently served from GitHub.

The schema and seed data are version-controlled in `db/schema.sql` and `db/seed.sql` (both idempotent — safe to re-run). If the live `saabi-db` database is ever reset or you're not sure it matches the app code, reapply them:

```
wrangler d1 execute saabi-db --remote --file=db/schema.sql
wrangler d1 execute saabi-db --remote --file=db/seed.sql
```

## Deployment: Cloudflare Workers (not Pages)

Cloudflare's own current guidance is to deploy static-site-plus-API projects like this one as a **Worker with static assets**, not as a classic "Pages" project — the dashboard's "Connect to Git" flow now creates Workers by default. So this repo targets that path directly:

- `wrangler.jsonc` — Worker config: `assets.directory` = `./app` (the static site), `main` = `./_worker/index.js` (the compiled API), plus the `DB` and `SESSIONS` bindings.
- `functions/api/**` — written using the Pages Functions file-routing convention (kept as-is, no rewrite needed), compiled into a single Worker script by a build step.
- `package.json` — pins `wrangler@^4`, needed for that build step.

**This targets the existing `saabi` Worker** (`saabi.<your-subdomain>.workers.dev`) — not the separate `saabid` Pages project created earlier while sorting this out. `saabid` can be deleted once `saabi` is confirmed working, to avoid confusion between the two.

### What you need to do in the `saabi` Worker's dashboard settings

1. **Settings → Build → Branch control**: set the production branch to `claude/new-github-repo-atvfv0` (this is where all the work lives — not `main`, which still has the older pre-backend version).
2. **Settings → Build → Build command**: set to
   ```
   npx wrangler pages functions build --outdir=./_worker/
   ```
3. **Deploy command**: leave as `npx wrangler deploy` (already correct — this is what a Worker project uses by default).
4. Bindings (`DB`, `SESSIONS`) are now declared directly in `wrangler.jsonc`, which is deployed with the Worker — you do **not** need to separately configure them on the dashboard's Bindings screen. (If the dashboard still shows "No connected bindings" after a deploy, that screen may just be slow to reflect config-file-defined bindings — check `wrangler.jsonc` is what's actually live via `workers_get_worker_code` instead of trusting that screen alone.)
5. Trigger a new deployment after saving the above (push again, or use "Retry deployment").

Validated locally before pushing: `npx wrangler pages functions build --outdir=./_worker/` compiles cleanly, and `npx wrangler deploy --dry-run` confirms all three bindings (`DB`, `SESSIONS`, `ASSETS`) resolve correctly and reads all 24 files from `app/`.

## Known gaps before this is real "production"

- **Email delivery isn't wired up.** `POST /api/auth/signup` currently returns the verification code directly in the response (`devVerificationCode`) instead of emailing it — there's no email-sending service connected yet. Needs a real provider (Cloudflare Email Workers, Resend, or a Gmail-via-Zapier send) before this can ship to real users.
- Password hashing uses PBKDF2-SHA256 via Web Crypto (native to the Workers runtime, no dependency) — solid, but confirm 100k iterations is acceptable for your threat model before launch.

## Frontend wiring — done

Every `app/` page now calls the real API instead of `localStorage`:

- `signup.html` / `confirm.html` / `signin.html` — call `/api/auth/signup`, `/api/auth/verify`, `/api/auth/login`.
- `index.html` (Learn) — fetches `/api/tracks` and `/api/tracks/:id/lessons`, posts completions to `/api/lessons/:id/complete`, posts certification interest to `/api/auth/cert-interest`.
- `gist.html` — fetches the episode from `/api/gist/episodes/:id` (crew + branching script are data-driven, not hardcoded) and posts completion to `/api/gist/episodes/:id/complete`.
- `badges.html` / `profile.html` — fetch `/api/badges` and `/api/auth/me`.

All auth-gated pages redirect to `welcome.html` if `/api/auth/me` returns 401 (no session). This can only be exercised end-to-end once the `saabi` Worker is deployed with the branch/build-command settings above — until then, every page will redirect to Welcome immediately, which is the expected/correct behavior for "no backend reachable."

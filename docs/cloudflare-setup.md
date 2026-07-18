# Cloudflare Setup (one-time, manual — same shape as the earlier GitHub Pages step)

The data plane already exists in your Cloudflare account:

- **D1 database**: `saabi-db` (id `b782b390-4990-43f6-b342-f54f313c7fd0`) — schema created, seeded with Track 1's 10 lessons, 6 badges, and 1 Gist episode ("The Salt Water Myth").
- **KV namespace**: `saabi-sessions` (id `72b5642f91a64878885c25baf2b35fd8`) — used for login sessions.
- **R2**: not yet created — R2 needs to be manually enabled once for your account at Dashboard → R2 → "Enable R2" (billing/terms step) before it can be provisioned. Not required for launch; character art is currently served from GitHub.

The schema and seed data are now version-controlled in `db/schema.sql` and `db/seed.sql` (both idempotent — safe to re-run). If the live `saabi-db` database is ever reset, recreated, or you're not sure it matches the app code, reapply them:

```
wrangler d1 execute saabi-db --remote --file=db/schema.sql
wrangler d1 execute saabi-db --remote --file=db/seed.sql
```

The application code (`functions/`) references these via the binding names `DB` and `SESSIONS`. `wrangler.toml` at the repo root documents both.

## What you need to do

The MCP connector this session used can provision D1/KV/R2 resources and run SQL, but **cannot create or configure a Cloudflare Pages project** — that's a dashboard-only action, same category as the GitHub Pages "Source" toggle earlier.

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Select the `TheSage-aa/JUst-` repository.
3. Build settings:
   - **Build command**: (leave blank — this is a static `app/` directory plus Functions, no build step)
   - **Build output directory**: `app`
4. Under **Settings → Functions → Bindings**, add:
   - **D1 database binding**: variable name `DB` → select database `saabi-db`
   - **KV namespace binding**: variable name `SESSIONS` → select namespace `saabi-sessions`
5. Deploy. Every push to `main` will auto-deploy after this, same as GitHub Pages does now.

## Known gaps before this is real "production"

- **Email delivery isn't wired up.** `POST /api/auth/signup` currently returns the verification code directly in the response (`devVerificationCode`) instead of emailing it — there's no email-sending service connected yet. Needs a real provider (Cloudflare Email Workers, Resend, or a Gmail-via-Zapier send) before this can ship to real users.
- Password hashing uses PBKDF2-SHA256 via Web Crypto (native to the Workers runtime, no dependency) — solid, but confirm 100k iterations is acceptable for your threat model before launch.

## Frontend wiring — done

Every `app/` page now calls the real API instead of `localStorage`:

- `signup.html` / `confirm.html` / `signin.html` — call `/api/auth/signup`, `/api/auth/verify`, `/api/auth/login`.
- `index.html` (Learn) — fetches `/api/tracks` and `/api/tracks/:id/lessons`, posts completions to `/api/lessons/:id/complete`, posts certification interest to `/api/auth/cert-interest`.
- `gist.html` — fetches the episode from `/api/gist/episodes/:id` (crew + branching script are data-driven, not hardcoded) and posts completion to `/api/gist/episodes/:id/complete`.
- `badges.html` / `profile.html` — fetch `/api/badges` and `/api/auth/me`.

All auth-gated pages redirect to `welcome.html` if `/api/auth/me` returns 401 (no session). This can only be exercised end-to-end once the Pages project below is deployed with the DB/SESSIONS bindings — until then, every page will redirect to Welcome immediately, which is the expected/correct behavior for "no backend reachable."

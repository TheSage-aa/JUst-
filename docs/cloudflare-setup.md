# Cloudflare Setup (one-time, manual — same shape as the earlier GitHub Pages step)

The data plane already exists in your Cloudflare account:

- **D1 database**: `saabi-db` (id `b782b390-4990-43f6-b342-f54f313c7fd0`) — schema created, seeded with Track 1's 10 lessons, 6 badges, and 1 Gist episode ("The Salt Water Myth").
- **KV namespace**: `saabi-sessions` (id `72b5642f91a64878885c25baf2b35fd8`) — used for login sessions.
- **R2**: not yet created — R2 needs to be manually enabled once for your account at Dashboard → R2 → "Enable R2" (billing/terms step) before it can be provisioned. Not required for launch; character art is currently served from GitHub.

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
- **Frontend isn't wired to this API yet.** The `app/` pages still read/write `localStorage` only. Task 6 (in progress) rewrites `auth.js`/`app.js`/`chrome.js` to call these endpoints instead.
- Password hashing uses PBKDF2-SHA256 via Web Crypto (native to the Workers runtime, no dependency) — solid, but confirm 100k iterations is acceptable for your threat model before launch.

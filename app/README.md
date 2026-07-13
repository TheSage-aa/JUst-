# Saabi Phase 0 Prototype

A static, dependency-free implementation of the PRD's Phase 0 scope (§4.1/§5): the "HIV & Stigma Basics" track as a lesson → quiz → feedback → progress → completion loop, meant to sit inside the LUMA website as a web module.

## What it does

- Renders the 10-lesson skill tree from `js/data.js` (content mirrors [`docs/tracks/track-1-hiv-stigma-basics.md`](../docs/tracks/track-1-hiv-stigma-basics.md)), unlocking each lesson only once the previous one is complete.
- Each lesson: short content → multiple-choice quiz → instant right/wrong feedback with the correct answer highlighted.
- Tracks progress and a daily streak in `localStorage` (no backend — this is a client-only proof of concept standing in for the PRD's "lightweight account system," §5.3).
- On track completion, shows the certification teaser from §5.2/§6 and a "Notify me" click, which stands in for the "certification interest signal" success metric (§2.2).

## Running it

No build step. Serve the folder with any static file server, e.g.:

```
cd app
python3 -m http.server 8420
```

Then open `http://localhost:8420`.

## Known gaps vs. the full PRD spec

- Quiz questions per lesson are 1–2, matching the illustrative content draft — the PRD spec (§5.1) calls for 3–5 per lesson at Phase 1.
- No real accounts/backend; progress is per-browser via `localStorage` only.
- No email/notification nudges (§5.2, "should-have").
- Content is a structural draft, not clinically reviewed (see the track doc's closing notes).

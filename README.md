# Saabi by LUMA — Complete Product Package

> "What Duolingo did for language learning, Saabi does for health literacy."

Saabi is a gamified health-literacy programme under LUMA, applying habit-loop mechanics (streaks, bite-sized lessons, instant feedback, visible progress) to health education across Africa — starting with HIV and stigma, then expanding to sexual & reproductive health, mental health, STIs beyond HIV, and chronic conditions.

Prepared for: LUMA — Founder Adebare Hammed. Document status: Draft v0.2.

## Contents

- [Part I — Product Requirements Document](./docs/PRD.md)
- [Part II — Track 1: HIV & Stigma Basics](./docs/tracks/track-1-hiv-stigma-basics.md)
- [Part III — Track 2: Sexual & Reproductive Health](./docs/tracks/track-2-sexual-reproductive-health.md)
- [Part IV — Track 3: Mental Health](./docs/tracks/track-3-mental-health.md)
- [Part V — Track 4: STIs Beyond HIV](./docs/tracks/track-4-stis-beyond-hiv.md)
- [Part VI — Track 5: Chronic Conditions (Sickle Cell & Diabetes)](./docs/tracks/track-5-chronic-conditions.md)

The original source document is preserved at [`assets/Saabi_by_LUMA_Complete_Package.docx`](./assets/Saabi_by_LUMA_Complete_Package.docx).

## Phase 0 prototype

[`app/`](./app) is a working, dependency-free implementation of the Phase 0 lesson/quiz loop described in the PRD, built from the Track 1 content. Run it with:

```
cd app && python3 -m http.server 8420
```

See [`app/README.md`](./app/README.md) for details and known gaps vs. the full spec.

## Status

- **Phase 0 (in scope now):** Track 1 (HIV & Stigma Basics) is built from LUMA's existing content and is the only track live at launch, as a web module inside the existing LUMA site. A working prototype of this loop is in [`app/`](./app).
- **Phase 1 (future, gated on Phase 0 signal):** Tracks 2–5 are fully drafted content, ready for a native mobile app rollout — but not yet clinically reviewed. See each track's "Notes for Content Finalization" before any Phase 1 build.

See the [PRD](./docs/PRD.md) for full scope, success metrics, feature requirements, and the certification system design.

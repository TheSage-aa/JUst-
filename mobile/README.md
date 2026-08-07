# Saabi (mobile) — Tracks 1 & 2 complete, Tracks 3-5 remaining

React Native / Expo / TypeScript. Built against `docs/bible/SAABI_BIBLE.md`,
following its Book X Ch.68 build sequence. **Track 1 (HIV & Stigma Basics)
and Track 2 (Sexual & Reproductive Health) are fully authored and playable
end to end**, including track completion and badge unlocks, independently
of each other. Tracks 3-5 (Nana/Mental Health, Dr. Ayo/STIs Beyond HIV,
Tunde/Chronic Conditions) don't exist yet. See "What's built" vs "What's
not" below before assuming anything works beyond what's listed.

## Run it

```
npm install
npm run ios      # or: npm run android / npm run web
```

react-native-mmkv (v4, Nitro Modules) and react-native-reanimated are
native modules — this requires an Expo dev client / prebuild, **not** Expo
Go. `npx expo prebuild` before the platform-specific run command if you
haven't generated native projects yet. The web target (`npm run web`) does
work directly and was used to produce real, running screenshots during
development — see the session's shared screenshots for both tracks.

## Verify it

```
npm test          # 224 tests: full Ch.62 QA-ECON-01..16 economy suite,
                   # Ch.39 SS39.3 content-schema validation + Book I
                   # compliance checks across all 20 authored lessons
                   # (Tracks 1 and 2), and end-to-end store integration
                   # tests proving both tracks' completion paths work
                   # independently (each unlocks its own badge; neither
                   # triggers the other's; Full Circle correctly stays
                   # locked until all 5 exist).
npx tsc --noEmit   # zero errors
```

The economy suite is written to assert Book IX's QA-ECON test cases by ID
— read `src/economy/__tests__/economy.test.ts` alongside Ch.62 to see the
mapping directly. `src/content/testHelpers/lessonComplianceSuite.ts` holds
the shared mechanical + compliance checks every track's lessons are run
through (`track1/__tests__/allLessons.test.ts`, `track2/__tests__/...`).

## What's built (Ch.68 steps 1-4, Tracks 1-2)

- **Design tokens** (`src/design/tokens.ts`) — Appendix A, verbatim.
- **Data model** (`src/types/models.ts`, `src/types/content.ts`) — Ch.53 +
  Ch.39, plus a mechanical `validateLesson()` for Ch.39 SS39.3's items 1-6.
- **Economy engine** (`src/economy/economy.ts`) — XP, Hearts, Streaks,
  Badges (Ch.29-32), pure functions, 100% passing against Ch.62.
- **Character registry** (`src/characters/characters.ts`) — all 7
  characters' identity/color data, Voice Test checklists as reference
  comments.
- **Cross-track registry** (`src/content/allTracks.ts`) — the app layer
  (Home, Track Detail, Lesson Player, Lesson Complete, the store's badge
  evaluation) is fully generalized across however many tracks are
  authored, not hardcoded to Track 1. Adding Track 3 means authoring its
  lessons and adding one registry entry — no screen changes required.
- **Navigation shell** (`src/navigation/`) — tab bar (Home/Profile/
  Settings) hidden during Lesson Player per Rule 11.2.1-2.
- **Track 1 (Zara) and Track 2 (Kemi), all 20 lessons** — authored in full
  beat schema, Gist Mode, each under the 150-word ceiling, each passing
  every mechanical Ch.39 rule and a Book I compliance check (no
  second-person myth attribution, no clinical directives, full-fact
  incorrect feedback, correct Bello/Buggy placement per Rules 35.2.2-3).
  Track 2 Lesson 4 (Consent) has no Bello beat by deliberate choice, per
  its own file's compliance note. Each track's Lesson 10 is a
  self-contained mixed-review lesson — see either lesson10.ts for how the
  "legible in isolation" vs "mixes questions from Lessons 1-9" schema
  tension is resolved.
- **Both tracks' completion paths work end to end and independently**:
  completing either track's Lesson 10 unlocks that track's own badge
  ("Myth Crusher" / "Question Asker") without affecting the other track's
  progress, and surfaces the certification-interest prompt. Verified by
  integration tests that drive the real store through both tracks
  separately and together.
- **Core loop screens**: Home, Track Detail, Lesson Player (Gist Mode +
  nested Quiz Flow), Lesson Complete, Profile, Settings — all wired to the
  real economy engine and real content for whichever track is being
  played, not mocked data.
- **Buggy** appears throughout, memory-aware (Home greeting references
  real streak state), never static (continuous idle bob via Reanimated),
  and surfaces the required "frozen"/"reset" streak acknowledgments
  (Ch.31 SS31.4) rather than staying silent about them.
- **Offline-first persistence** — Zustand + MMKV, no network dependency
  for anything built so far.

## What's explicitly not built yet (later Ch.68 steps)

- Tracks 3-5 (step 4 continues). Home/Track Detail correctly show them as
  "Coming soon", not fake-navigable.
- Drama Mode, Badge Detail modal, Character Profile screen, notification
  preferences (step 5).
- The full animation pass with Book VI's *exact* timing/easing values —
  current motion (Buggy's idle bob, bubble reveal timing, node shake) is a
  reasonable approximation, explicitly flagged inline everywhere it
  appears, pending step 6.
- The full sound pass (Book VII) — step 7. No audio wired yet.
- The offline/sync layer's *server* half and the full QA suite beyond the
  economy/content tests above (Book VIII/IX) — step 8. Local persistence
  works; there's no backend to sync against yet.
- Auth / Sign Up / Log In (Ch.12 SS12.3) — the app currently runs as a
  single on-device local user with no account system.
- Practice Mode (Ch.30 SS30.5) — the zero-hearts pause and wait-for-
  regeneration path are fully functional; Practice Mode's alternate path
  is an honest "coming soon" placeholder given the still-limited pool of
  completed content to draw a review set from.

## Compliance

Every file that authors or renders character-attributed copy carries an
inline comment recording the relevant Voice Test / Non-Negotiable check,
per Ch.67 SS67.2's compliance-check habit — search for "Voice Test" or
"Non-Negotiable" in `src/` to find them.

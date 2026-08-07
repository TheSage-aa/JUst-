# Saabi (mobile) — Track 1 complete, vertical slice for Tracks 2-5

React Native / Expo / TypeScript. Built against `docs/bible/SAABI_BIBLE.md`,
following its Book X Ch.68 build sequence. **Track 1 (HIV & Stigma Basics)
is fully authored and playable end to end**, including track completion.
Tracks 2-5 don't exist yet. See "What's built" vs "What's not" below
before assuming anything works beyond what's listed.

## Run it

```
npm install
npm run ios      # or: npm run android / npm run web
```

react-native-mmkv (v4, Nitro Modules) and react-native-reanimated are
native modules — this requires an Expo dev client / prebuild, **not** Expo
Go. `npx expo prebuild` before the platform-specific run command if you
haven't generated native projects yet.

## Verify it

```
npm test          # 111 tests: full Ch.62 QA-ECON-01..16 economy suite,
                   # Ch.39 SS39.3 content-schema validation + Book I
                   # compliance checks across all 10 of Track 1's lessons,
                   # and an end-to-end store integration test proving the
                   # full completion path (all 10 lessons -> Myth Crusher
                   # badge unlock -> replay idempotency).
npx tsc --noEmit   # zero errors
```

The economy suite is written to assert Book IX's QA-ECON test cases by ID
— read `src/economy/__tests__/economy.test.ts` alongside Ch.62 to see the
mapping directly. `src/content/track1/__tests__/allLessons.test.ts` runs
the same mechanical + compliance checks across all 10 lessons.

## What's built (Ch.68 steps 1-4, Track 1 only)

- **Design tokens** (`src/design/tokens.ts`) — Appendix A, verbatim.
- **Data model** (`src/types/models.ts`, `src/types/content.ts`) — Ch.53 +
  Ch.39, plus a mechanical `validateLesson()` for Ch.39 SS39.3's items 1-6.
- **Economy engine** (`src/economy/economy.ts`) — XP, Hearts, Streaks,
  Badges (Ch.29-32), pure functions, 100% passing against Ch.62.
- **Character registry** (`src/characters/characters.ts`) — all 7
  characters' identity/color data, Voice Test checklists as reference
  comments.
- **Navigation shell** (`src/navigation/`) — tab bar (Home/Profile/
  Settings) hidden during Lesson Player per Rule 11.2.1-2.
- **Track 1, all 10 lessons** — authored in full beat schema, Zara-hosted,
  Gist Mode, each under the 150-word ceiling, each passing every
  mechanical Ch.39 rule and a Book I compliance check (no second-person
  myth attribution, no clinical directives, full-fact incorrect feedback,
  correct Bello/Buggy placement per Rules 35.2.2-3). Lesson 10 is the
  mixed-review lesson (Ch.5 SS5.3) — see its file for how the "must be
  legible in isolation" vs "mixes questions from Lessons 1-9" tension in
  the Bible is resolved (self-contained recap beats, not literal
  cross-lesson beat references).
- **Full track completion path works end to end**: completing Lesson 10
  unlocks the "Myth Crusher" badge and surfaces the certification-interest
  prompt on Lesson Complete, verified by an integration test that drives
  the real store through all 10 lessons.
- **Core loop screens**: Home, Track Detail, Lesson Player (Gist Mode +
  nested Quiz Flow), Lesson Complete, Profile, Settings — all wired to the
  real economy engine and real content, not mocked data.
- **Buggy** appears throughout, memory-aware (Home greeting references
  real streak state), never static (continuous idle bob via Reanimated),
  and surfaces the required "frozen"/"reset" streak acknowledgments
  (Ch.31 SS31.4) rather than staying silent about them.
- **Offline-first persistence** — Zustand + MMKV, no network dependency
  for anything built so far.

## What's explicitly not built yet (later Ch.68 steps)

- Tracks 2-5 entirely (step 4 continues). Track Detail correctly shows
  only Track 1 as playable; the other four render as "Coming soon" on
  Home, not fake-navigable.
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
  is an honest "coming soon" placeholder since there's only one track to
  draw review content from right now.

## Compliance

Every file that authors or renders character-attributed copy carries an
inline comment recording the relevant Voice Test / Non-Negotiable check,
per Ch.67 SS67.2's compliance-check habit — search for "Voice Test" or
"Non-Negotiable" in `src/` to find them.

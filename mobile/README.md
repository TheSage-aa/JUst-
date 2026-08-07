# Saabi (mobile) — vertical slice

React Native / Expo / TypeScript. Built against `docs/bible/SAABI_BIBLE.md`,
following its Book X Ch.68 build sequence. This is a **first vertical
slice**, not the full ten-book scope — see "What's built" vs "What's not"
below before assuming anything works beyond what's listed.

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
npm test          # 26 tests: full Ch.62 QA-ECON-01..16 economy suite +
                   # Ch.39 SS39.3 content-schema validation for Lesson 1
npx tsc --noEmit   # zero errors
```

The economy suite is written to assert Book IX's QA-ECON test cases by ID
— read `src/economy/__tests__/economy.test.ts` alongside Ch.62 to see the
mapping directly.

## What's built (Ch.68 steps 1-3)

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
- **Track 1, Lesson 1** ("What HIV Actually Is") — authored in full beat
  schema, Zara-hosted, Gist Mode, 136/150 words, passes every mechanical
  Ch.39 validation rule and a Book I compliance test suite. See the
  authoring notes at the top of `src/content/track1/lesson1.ts` for the
  one deliberate, flagged deviation (no choice moment this lesson — see
  that file for why).
- **Core loop screens**: Home, Track Detail, Lesson Player (Gist Mode +
  nested Quiz Flow), Lesson Complete, Profile, Settings — all wired to the
  real economy engine and real Lesson 1 content, not mocked data.
- **Buggy** appears throughout, memory-aware (Home greeting references
  real streak state), never static (continuous idle bob via Reanimated),
  and surfaces the required "frozen"/"reset" streak acknowledgments
  (Ch.31 SS31.4) rather than staying silent about them.
- **Offline-first persistence** — Zustand + MMKV, no network dependency
  for anything built so far.

## What's explicitly not built yet (later Ch.68 steps)

- Lessons 2-10 of Track 1, and all of Tracks 2-5 (step 4). Track Detail
  honestly renders these as locked nodes with real titles, not fake
  playable content.
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
  is an honest "coming soon" placeholder since there's only one lesson to
  draw review content from right now.

## Compliance

Every file that authors or renders character-attributed copy carries an
inline comment recording the relevant Voice Test / Non-Negotiable check,
per Ch.67 SS67.2's compliance-check habit — search for "Voice Test" or
"Non-Negotiable" in `src/` to find them.

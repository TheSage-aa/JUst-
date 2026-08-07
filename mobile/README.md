# Saabi (mobile) — all 5 tracks complete, core loop + progress/settings screens done

React Native / Expo / TypeScript. Built against `docs/bible/SAABI_BIBLE.md`,
following its Book X Ch.68 build sequence. **All 5 tracks are fully authored
and playable end to end** — HIV & Stigma Basics (Zara), Sexual & Reproductive
Health (Kemi), Mental Health (Nana), STIs Beyond HIV (Dr. Ayo), and Chronic
Conditions (Tunde) — each completable independently, each unlocking its own
badge, with the cross-track "Full Circle" badge unlocking correctly once all
five are done. See "What's built" vs "What's not" below before assuming
anything works beyond what's listed.

## Run it

```
npm install
npm run ios      # or: npm run android / npm run web
```

react-native-mmkv (v4, Nitro Modules) and react-native-reanimated are
native modules — this requires an Expo dev client / prebuild, **not** Expo
Go. `npx expo prebuild` before the platform-specific run command if you
haven't generated native projects yet. The web target (`npm run web`) does
work directly and was used to produce real, running screenshots throughout
development.

## Verify it

```
npm test          # 536 tests: full Ch.62 QA-ECON-01..16 economy suite,
                   # Ch.39 SS39.3 content-schema validation + Book I
                   # compliance checks across all 50 authored lessons
                   # (all 5 tracks), and end-to-end store integration
                   # tests proving every track's completion path works
                   # independently (each unlocks its own badge; completing
                   # all 5 unlocks Full Circle last, sequenced per Rule
                   # 32.3.2).
npx tsc --noEmit   # zero errors
```

The economy suite is written to assert Book IX's QA-ECON test cases by ID
— read `src/economy/__tests__/economy.test.ts` alongside Ch.62 to see the
mapping directly. `src/content/testHelpers/lessonComplianceSuite.ts` holds
the shared mechanical + compliance checks every track's lessons are run
through (`track1/__tests__/allLessons.test.ts` through `track5/...`), plus
each track has its own extra host-character-specific guard tests (Kemi's
consent-clarity, Nana's diagnostic-language/crisis-lesson checks, Dr.
Ayo's Authority-Voice-Creep guard, Tunde's enablement-not-restriction
guard).

## What's built (Ch.68 steps 1-5)

- **Design tokens** (`src/design/tokens.ts`) — Appendix A, verbatim.
- **Data model** (`src/types/models.ts`, `src/types/content.ts`) — Ch.53 +
  Ch.39, plus a mechanical `validateLesson()` for Ch.39 SS39.3's items 1-6.
- **Economy engine** (`src/economy/economy.ts`) — XP, Hearts, Streaks,
  Badges (Ch.29-32), pure functions, 100% passing against Ch.62.
- **Character registry** (`src/characters/characters.ts`) — all 7
  characters' identity/color/bio data, Voice Test checklists as reference
  comments.
- **Cross-track registry** (`src/content/allTracks.ts`) — the app layer
  (Home, Track Detail, Lesson Player, Lesson Complete, Profile, the
  store's badge evaluation) is fully generalized across however many
  tracks are authored, not hardcoded to any one track.
- **Navigation shell** (`src/navigation/`) — tab bar (Home/Profile/
  Settings) hidden during Lesson Player per Rule 11.2.1-2; Character
  Profile pushed as a titled stack screen.
- **All 5 tracks, all 50 lessons** — authored in full beat schema, Gist
  Mode, each under the 150-word ceiling, each passing every mechanical
  Ch.39 rule and a Book I compliance check (no second-person myth
  attribution, no clinical directives, full-fact incorrect feedback,
  correct Bello/Buggy placement per Rules 35.2.2-3). A few lessons with
  only one MYTH/FACT pair omit Bello by deliberate, commented choice. Each
  track's Lesson 10 is a self-contained mixed-review lesson.
- **Every track's completion path works end to end and independently**,
  including the "Full Circle" badge (all 5 tracks), verified by
  integration tests that drive the real store through 1, 2, 3, 4, and all
  5 tracks and assert exactly which badges unlock at each stage.
- **Core loop screens**: Home, Track Detail, Lesson Player (Gist Mode +
  nested Quiz Flow), Lesson Complete — all wired to the real economy
  engine and real content for whichever track is being played.
- **Profile** (Ch.18) — level/XP, current + longest streak, hearts,
  per-track completion percentages (tappable, deep-links to Track
  Detail), a Buggy-voiced "Buggy remembers" activity card, a badge shelf
  (unearned badges shown as silhouettes with their condition text
  visible, never hidden), and a tappable **Badge Detail modal** (Ch.18
  SS18.2) showing the badge, its condition, and earned date once earned.
  A "Meet the cast" row is one of Ch.19 SS19.1's two required entry
  points into the new **Character Profile Screen**.
- **Character Profile Screen** (Ch.19 SS19.1) — avatar, headline tagline
  in the character's track-accent color, a short bio written to pass that
  character's own Voice Test, a "Hosts [Track]" tag, and a button into
  that track. Reachable by tapping a host's name on Track Detail (the
  other required entry point) or any avatar in Profile's cast row.
- **Settings** (Ch.19 SS19.2) — Sound/Haptics (real), a single daily
  Reminder time picker with non-guilt copy ("skipping it never costs you
  anything") wired to the user record, and an Account section: email
  display, a real **Delete Account** action (full local purge — see note
  below), and a Log Out button that's honest about not being wired to a
  real account system yet rather than faking a sign-out.
- **Buggy** appears throughout, memory-aware (Home greeting and Profile's
  "Buggy remembers" card both reference real economy state), never static
  (continuous idle bob via Reanimated), and surfaces the required
  "frozen"/"reset" streak acknowledgments (Ch.31 SS31.4).
- **Offline-first persistence** — Zustand + MMKV, no network dependency
  for anything built so far. `deleteAccount()` wipes the underlying MMKV
  store directly (not just in-memory state), so it's a genuine full purge
  per Ch.1 SS1.7 — there's no backend yet, so there's no analytics-
  retention exception to disclose either; the Settings copy says so
  plainly instead of gesturing at a policy that doesn't exist.
- **Motion system, Book VI exact values (Ch.68 step 6, partial)** —
  `src/design/motion.ts` transcribes every Ch.41-46 constant (the four
  motion primitives, the global timing table, celebration tiers, reduced-
  motion fallbacks) verbatim, and `useReducedMotion()` wires Ch.46.1.1's
  OS-level check once for every animated component to share. Applied so
  far to: Buggy's idle loop (exact +-4px/2400ms + wing-flutter, Ch.42.1),
  the shared Gentle-Shake gesture used identically for locked-node
  rejection (Ch.45.3) and incorrect-quiz-answer feedback (Ch.42.3, now
  correctly sequenced so the correction text waits for the shake to
  finish), the Gist Mode typing indicator's three-dot pulse (Ch.45.2), and
  bubble/typing-delay timing (Ch.41.2). See `motion.ts`'s trailing comment
  for what Book VI specifies that still isn't wired up (Lottie
  celebrations, character expression-state art, counter animations).
- **Sound spec + haptics, Book VII (Ch.68 step 7, partial)** —
  `src/audio/soundSpec.ts` transcribes Ch.48.1's full event table (sound
  character, duration, paired animation, paired haptic) as typed data, and
  wires the *haptic* half for real via `expo-haptics`, respecting the
  Settings haptics toggle (which previously existed in the UI but wasn't
  connected to anything). Wired at: correct/incorrect quiz answers,
  streak increment, streak-freeze-consumed, and locked-node rejection —
  each using the exact `ImpactFeedbackStyle`/`NotificationFeedbackType`
  Ch.48.1 specifies, including the ones that are deliberately *silent*
  (no haptic on streak reset, per the table). No audio files exist yet,
  so `fireSoundEvent()` only fires the haptic; see the file's trailing
  comment for the rest of Book VII that isn't wired (actual sound
  playback, celebration jingles, character sound signatures).

## What's explicitly not built yet (later Ch.68 steps)

- **Drama Mode** (step 5) — deliberately deferred. All 50 lessons are
  authored in Gist Mode only; Drama Mode needs its own dialogue content
  per Book II, which doesn't exist yet, so building the mode's UI first
  would mean fake-navigable screens with nothing behind them.
- **The rest of Book VI's animation pass** (step 6) — Lottie confetti/
  sparkle layers for Tier 2/3 celebrations, host-character expression-
  state crossfades (needs art that doesn't exist yet), streak-counter/
  XP-count-up animations, and a global button-tap Spring-Bounce retrofit
  across every touchable are all still unbuilt; see `motion.ts`'s
  trailing comment for the exact list.
- **The rest of Book VII's sound pass** (step 7) — no actual audio files
  or playback exist, only the haptic half of the spec table above; the
  celebration sound layer, ambient/music scoping, and character sound
  signatures (Ch.48.2-50) are all unbuilt. See `soundSpec.ts`'s trailing
  comment.
- The offline/sync layer's *server* half and the full QA suite beyond the
  economy/content tests above (Book VIII/IX) — step 8. Local persistence
  works; there's no backend to sync against yet.
- Auth / Sign Up / Log In (Ch.12 SS12.3) — the app currently runs as a
  single on-device local user with no account system, which is also why
  Settings' Log Out is an honest no-op rather than a real sign-out.
- Practice Mode (Ch.30 SS30.5) — the zero-hearts pause and wait-for-
  regeneration path are fully functional; Practice Mode's alternate path
  remains an honest "coming soon" placeholder.
- Push notifications for the Reminder time set in Settings — the
  preference is captured and persisted, but nothing schedules an actual
  device notification yet (needs Book VIII's infrastructure).

## Compliance

Every file that authors or renders character-attributed copy carries an
inline comment recording the relevant Voice Test / Non-Negotiable check,
per Ch.67 SS67.2's compliance-check habit — search for "Voice Test" or
"Non-Negotiable" in `src/` to find them.

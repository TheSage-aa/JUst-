# Part I — Product Requirements Document (v0.2)

> "What Duolingo did for language learning, Saabi does for health literacy."
>
> Prepared for: LUMA — Founder Adebare Hammed

## 0. Document Information

| | |
|---|---|
| **Product name** | Saabi by LUMA |
| **Document status** | Draft — v0.2, expanded with full multi-track content outline |
| **Owner** | Adebare Hammed, Founder, LUMA |
| **Platform** | Mobile app (iOS + Android), phase 0 as web module inside existing LUMA site |
| **Structural status** | Programme under LUMA (Path A/B decision deferred 6–12 months per Concept Note) |

This PRD translates the Saabi Concept Note into a buildable product definition. It intentionally starts narrow — HIV and stigma education as the first learning track, proven in Phase 0 — while this version also pre-drafts the full content roadmap for all five planned Phase 1 tracks, so content is ready ahead of build rather than a bottleneck later.

## 1. Problem Statement

Health education across Nigeria and much of Africa is delivered in bursts — a one-off campaign, a school talk, a pamphlet — rather than as a sustained habit. It is rarely consistent, rarely rewarding, and almost never something young people return to voluntarily. Meanwhile, products like Duolingo have proven that people will show up daily, unprompted, for content that feels like visible progress rather than homework.

Health literacy — starting with HIV and stigma, and expanding to sexual and reproductive health, mental health, STIs, and common chronic conditions — has never been given that same habit-forming, gamified treatment at scale in Africa.

### 1.1 Opportunity

- Apply proven habit-loop mechanics (streaks, bite-sized lessons, instant feedback, visible progress, social proof) to a subject area — health — that currently has none of this.
- Introduce a certification layer that does not exist yet in African youth health advocacy: a badge with real external value, the way an Aspire Leadership certificate or LinkedIn Learning badge carries weight today.
- Build directly on LUMA's existing HIV and stigma content and community, giving Saabi a credible, tested first learning track rather than a cold start.

## 2. Goals & Success Metrics

### 2.1 Product Goals (Phase 0 / Proof of Concept)

- Validate that young people will return daily to a gamified health-learning loop, before any dedicated app is built.
- Prove out a single learning track (HIV & Stigma Basics) end-to-end: lesson → quiz → feedback → progress → completion.
- Surface early signal on demand for certification — do users ask if a completed track "counts" for anything?
- Generate the traction evidence needed to decide Path A (LUMA programme) vs. Path B (spin-off) within 6–12 months.

### 2.2 Success Metrics

| Metric | Phase 0 target (web module) | Why it matters |
|---|---|---|
| D1 return rate | ≥ 30% return within 24h of first lesson | Signals the habit loop has any pull at all |
| Track completion rate | ≥ 20% of starters finish the HIV Basics track | Tests whether bite-sized structure holds attention to the end |
| Average lessons/user/week | ≥ 3 | Proxy for whether this is becoming a habit vs. one-off use |
| Certification interest signal | ≥ 15% of completers ask about / click a "what does this unlock" prompt | Validates the certification thesis before building it |
| Qualitative: social sharing | Any organic sharing of progress/streaks | Early proof of the social-motivation mechanic |

## 3. Target Users

### 3.1 Primary user

Young people (roughly 16–30) across Africa, starting in Nigeria, seeking accurate, non-judgmental health information — beginning with HIV and stigma — in a format that doesn't feel clinical, preachy, or like a school lecture.

### 3.2 Secondary users

- Existing LUMA community members already engaging with HIV/stigma content, migrated into Saabi as the first cohort.
- University students and youth advocacy groups who may later pursue the certification pathway for CV/scholarship purposes.
- Health bodies, university partners, or NGOs who may eventually co-author curriculum or endorse the certification (not day-one users, but a dependency for Section 6).

### 3.3 Primary user story

> "As a young person who has heard a lot of conflicting or shaming information about health topics that affect me, I want a private, non-judgmental way to actually learn the facts in small daily doses, so that I build real understanding without feeling lectured — and ideally have something to show for it."

## 4. Scope

### 4.1 Phase 0 — Proof of Concept (in scope now)

Per the Concept Note's own recommendation: the smallest possible build is a quiz/lesson module inside the existing LUMA website — not a dedicated app — to test the core loop cheaply before committing app-development resources.

- One learning track live at launch: "HIV & Stigma Basics," built from LUMA's existing content.
- Simple skill-tree structure: an ordered sequence of 8–12 bite-sized lessons per track.
- Each lesson: short content (text/image) → 3–5 question quiz → instant right/wrong feedback.
- Basic progress tracking: lessons completed, current streak, simple completion certificate (unbranded / lightweight, not the full certification system).
- Lightweight account system (email or LUMA community login) so progress persists.

### 4.2 Phase 1 — Dedicated Mobile App + Full Track Rollout (future, gated on Phase 0 signal)

- Native iOS/Android app with the full habit-loop UX: streaks, daily reminders, visible progress map.
- Four additional learning tracks, fully content-drafted in Parts III–VI of this document: Sexual & Reproductive Health, Mental Health, STIs Beyond HIV, and Chronic Conditions (Sickle Cell & Diabetes).
- Social motivation layer: friend streaks, leaderboards, or shareable progress cards.
- Tiered certification system with real "Certified Saabi Health Advocate" badges, requiring completed tracks + quizzes + demonstrated advocacy activity (not just passive completion).
- Partner/endorsement layer for certification credibility (health bodies, universities, NGOs).

### 4.3 Explicitly out of scope (for Phase 0 build)

- Live deployment of Tracks 2–5 — their content is fully drafted in this document (Parts III–VI) but not built or launched until Phase 1.
- Formal, endorsed certification — Phase 0 only signals *demand* for this, it does not build it.
- Native app development — Phase 0 is web-only by design, per the Concept Note's own sequencing.
- Any resolution of the Path A vs. Path B structural question — this PRD builds the product either path needs.

## 5. Feature Requirements (Phase 0)

### 5.1 Learning Track Structure

| Feature | Requirement | Priority |
|---|---|---|
| Skill tree / lesson sequence | 8–12 ordered lessons per track, each unlocking the next on completion | Must-have |
| Lesson content format | Short text + optional single image per lesson; readable in under 2 minutes | Must-have |
| Quiz per lesson | 3–5 multiple-choice questions, immediate correct/incorrect feedback with brief explanation | Must-have |
| Retry logic | User can retake a quiz; no permanent penalty for wrong answers on first attempt | Must-have |
| Track completion state | Clear "Track complete" moment with a simple completion message/certificate | Must-have |

### 5.2 Habit & Progress Mechanics

| Feature | Requirement | Priority |
|---|---|---|
| Progress indicator | Visual bar or map showing lessons completed / total | Must-have |
| Streak counter | Tracks consecutive days with at least one lesson completed | Must-have |
| Return prompt | Simple on-return message (e.g. "Welcome back — pick up where you left off") | Should-have |
| Email/notification nudge | Optional reminder if a user hasn't returned in 48–72h | Should-have (only if lightweight to build) |
| Completion signal / certificate teaser | On track completion, show a message signalling that a real certification path is coming — this is the demand-test moment | Must-have |

### 5.3 Account & Data

- Lightweight signup (email, or reuse existing LUMA community credentials if available) so progress isn't lost between sessions.
- Store per-user: lessons completed, quiz scores, current streak, track completion status, per track.
- No sensitive personal health disclosures collected or required — Saabi teaches; it does not ask users to disclose their own status or diagnoses.

## 6. Certification System (Phase 1, Design Now / Build Later)

The Concept Note is explicit that certification is Saabi's most differentiated long-term feature, but also that its credibility depends on external validation, not LUMA's word alone. This section documents the target design so Phase 0 can be built in a way that doesn't block it.

- Tiered badges (e.g. Bronze/Silver/Gold or Level 1–3) earned through completed tracks, quiz performance, and demonstrated advocacy activity — not passive content viewing alone.
- A "Certified Saabi Health Advocate" top-tier credential — likely requiring completion of multiple tracks, not just one — intended to carry real weight on a CV, scholarship, or NGO internship application.
- Requires future curriculum input or endorsement from a recognised health body, university partner, or established organisation before it can be marketed as a genuine standard.
- Phase 0's "completion teaser" (5.2) exists specifically to test appetite for this before any endorsement conversations begin.

## 7. Relationship to LUMA & Content Source

Saabi's HIV & Stigma Basics track is built directly from LUMA's existing content and community rather than from scratch, giving Phase 0 a credible content base on day one. The four additional tracks drafted in this document (Parts III–VI) extend that same voice and structure into new subject areas ahead of need. Per the Concept Note, Saabi's long-term organisational structure (staying inside LUMA vs. becoming an independent spin-off) is deliberately left open and will be revisited in 6–12 months based on real traction data from this PRD's success metrics — not assumption.

## 8. Risks & Open Questions

| Risk / open question | Notes |
|---|---|
| Cold-start content credibility | Mitigated by launching with LUMA's existing, community-tested HIV content rather than newly written material |
| Certification promised too early | Phase 0 only teases completion — no real badge is issued or marketed until endorsement conversations (Section 6) have happened |
| Low return/streak engagement | If D1 return rate target is missed, re-test lesson length/format before assuming the whole model is wrong |
| Sensitive subject matter handling | Content tone must stay non-judgmental and private-feeling; no public leaderboards tied to real identities in Phase 0 |
| Content drafted ahead of clinical review | Tracks 2–5 (Parts III–VI) are structural drafts, not clinically reviewed content — flagged explicitly in each track's closing notes |
| Path A vs. Path B undecided | Explicitly deferred per Concept Note; this PRD is written to serve either outcome |

## 9. Immediate Next Steps

1. Build the Phase 0 module inside the current LUMA website (not a standalone app) using Track 1 content ([Track 1](./tracks/track-1-hiv-stigma-basics.md)).
2. Instrument the metrics in Section 2.2 from day one — return rate, completion rate, lessons/week, certification-interest clicks.
3. Run Phase 0 for a defined window (suggest 6–8 weeks minimum) before evaluating against success metrics.
4. In parallel, route the drafted content for Tracks 2–5 to a clinical/subject-matter reviewer before any Phase 1 build begins.
5. Use Phase 0 data to decide: (a) proceed to Phase 1 native app with all five tracks, (b) iterate Phase 0 further, or (c) revisit the concept — and separately, revisit Path A vs. Path B per the Concept Note's 6–12 month timeline.

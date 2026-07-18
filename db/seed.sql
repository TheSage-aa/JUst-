-- Saabi by LUMA — D1 seed data.
-- Safe to re-run: uses INSERT OR REPLACE, matches db/schema.sql.
-- Apply with: wrangler d1 execute saabi-db --remote --file=db/seed.sql

INSERT OR REPLACE INTO tracks (id, slug, title, unit_label, sort_order, is_published)
VALUES ('track-1', 'track-1', 'HIV & Stigma Basics', 'Unit 1', 1, 1);

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-1', 'track-1', 1, 'What HIV Actually Is', '["HIV stands for Human Immunodeficiency Virus — it targets the immune system, specifically CD4 cells.", "HIV is not the same as AIDS. AIDS is a late stage that only happens if HIV goes untreated for a long time.", "With modern treatment, HIV very rarely progresses to AIDS at all."]', '[{"q": "HIV and AIDS mean the same thing.", "options": ["True", "False"], "correct": 1}, {"q": "HIV mainly affects which part of the body?", "options": ["The skin", "The immune system", "The bones"], "correct": 1}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-2', 'track-1', 2, 'How HIV Is Actually Transmitted', '["HIV spreads through specific bodily fluids: blood, semen, vaginal fluids, and breast milk.", "It does not spread through saliva, sweat, tears, or casual contact.", "The most common routes are unprotected sex and shared needles."]', '[{"q": "Which of these can transmit HIV?", "options": ["Sharing a cup", "Unprotected sex", "Hugging"], "correct": 1}, {"q": "HIV can spread through saliva.", "options": ["True", "False"], "correct": 1}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-3', 'track-1', 3, 'Myths vs. Facts', '["Myth: You can get HIV from mosquito bites. Fact: You cannot — HIV doesn''t survive or replicate in insects.", "Myth: You can tell someone has HIV by looking at them. Fact: Most people with HIV look completely healthy, especially on treatment.", "Myth: HIV is a death sentence. Fact: People on treatment live long, full lives."]', '[{"q": "Can you get HIV from a mosquito bite?", "options": ["Yes", "No"], "correct": 1}, {"q": "Can you always tell if someone has HIV by looking at them?", "options": ["Yes", "No"], "correct": 1}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-4', 'track-1', 4, 'Testing — What to Expect', '["A rapid test can give results in as little as 15–20 minutes.", "Testing is confidential, and many places offer free testing.", "Knowing your status — either way — is the first step to protecting your health."]', '[{"q": "How long can a rapid HIV test take to give results?", "options": ["Several weeks", "About 15–20 minutes", "A full day"], "correct": 1}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-5', 'track-1', 5, 'Treatment Today: ART & Undetectable', '["ART (antiretroviral therapy) is daily medication that controls HIV.", "With consistent treatment, HIV levels can become \"undetectable\" in the blood.", "Undetectable means the virus is suppressed to the point it can''t be measured by standard tests."]', '[{"q": "What does ART stand for?", "options": ["Antiretroviral Therapy", "Automatic Response Test"], "correct": 0}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-6', 'track-1', 6, 'U=U: Undetectable = Untransmittable', '["U=U is backed by major global health bodies including the WHO.", "A person on effective treatment with an undetectable viral load cannot sexually transmit HIV to a partner.", "This single fact has changed how the world understands living with HIV."]', '[{"q": "What does U=U stand for?", "options": ["Understood = Universal", "Undetectable = Untransmittable"], "correct": 1}, {"q": "Someone who is undetectable can still transmit HIV sexually.", "options": ["True", "False"], "correct": 1}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-7', 'track-1', 7, 'What Stigma Actually Looks Like', '["Stigma can be a joke, an assumption, an awkward silence, or someone being excluded.", "It often comes from outdated fear, not current facts.", "Stigma is one of the biggest reasons people avoid getting tested."]', '[{"q": "Which of these is an example of stigma?", "options": ["Avoiding someone because of an assumption about their status", "Asking a doctor a health question"], "correct": 0}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-8', 'track-1', 8, 'The Cost of Silence', '["Fear of stigma is one of the top reasons people delay or avoid HIV testing.", "Silence and shame can be more damaging, day to day, than the virus itself when someone is on treatment.", "Breaking silence starts with accurate information — which is what this track is for."]', '[{"q": "Fear of stigma can make people avoid testing.", "options": ["True", "False"], "correct": 0}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-9', 'track-1', 9, 'Supporting Someone Living With HIV', '["Treat someone''s status as private health information — not something to share without consent.", "You don''t need to change how you interact with someone based on their status.", "Simple, consistent respect is more valuable than grand gestures."]', '[{"q": "If a friend shares their HIV status with you, what should you do?", "options": ["Keep it private unless they say otherwise", "Tell close mutual friends so they''re careful"], "correct": 0}]');

INSERT OR REPLACE INTO lessons (id, track_id, sort_order, title, content_json, quiz_json)
VALUES ('track-1-lesson-10', 'track-1', 10, 'Bringing It Together', '["Recap: transmission facts, testing, treatment, U=U, and what stigma really looks like.", "This lesson mixes questions from Lessons 1–9 as a final check.", "Completing this lesson unlocks the track completion moment."]', '[{"q": "Mixed review — U=U means someone on effective treatment:", "options": ["Cannot sexually transmit HIV", "Is fully cured"], "correct": 0}, {"q": "Mixed review — the biggest driver of HIV testing avoidance is usually:", "options": ["Stigma and fear", "Cost of the test"], "correct": 0}]');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('myth-crusher', 'Myth Crusher', '5 Myths Debunked', '🛡️', 'red', 'track_complete:track-1');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('nutrition-ninja', 'Nutrition Ninja', '10 Healthy Recipes', '🥗', 'orange', 'manual:phase1');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('habit-hero', 'Habit Hero', '7 Day Habit Loop', '🧘', 'teal', 'streak_gte:7');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('mental-health-ally', 'Mental Health Ally', 'Coming in Phase 1', '🧠', 'purple', 'manual:phase1');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('community-champion', 'Community Champion', 'Advocacy & sharing', '❤️', 'red', 'manual:phase1');

INSERT OR REPLACE INTO badges (id, title, subtitle, icon_emoji, color, unlock_rule)
VALUES ('first-aid-pro', 'First Aid Pro', 'Unlock at Lvl 15', '🩹', 'teal', 'manual:phase1');

INSERT OR REPLACE INTO gist_episodes (id, title, crew_json, script_json, xp_reward, is_published)
VALUES ('gist-cholera-salt-water', 'The Salt Water Myth', '{"zara": {"name": "Zara", "avatar": "zara.png", "color": "#e0304f"}, "tunde": {"name": "Tunde", "avatar": "tunde.png", "color": "#3f9401"}, "buggy": {"name": "Buggy", "avatar": "buggy.png", "color": "#e8a723"}, "dr_ayo": {"name": "Dr. Ayo", "avatar": "dr_ayo.png", "color": "#2fb0ea"}}', '{"intro": [{"type": "bubble", "speaker": "zara", "html": "Bestie, drinking salt water does <strong>NOT</strong> cure cholera. 🤦🏾‍♀️"}, {"type": "sticker", "speaker": "tunde", "img": "tunde.png", "caption": "Yes bro! 🙌 Facts only."}], "choices": [{"id": "aunt", "label": "But my aunt said... 👵🏾"}, {"id": "why", "label": "Wait, really? Why? 🤔"}], "responses": {"aunt": [{"type": "bubble", "speaker": "zara", "html": "I hear you — a lot of us grew up hearing that. But \"always done this way\" doesn''t mean medically correct. Let''s look at what actually works 👇"}], "why": []}, "followUp": {"type": "bubble", "speaker": "dr_ayo", "html": "Cholera causes severe dehydration fast. Salt water alone can''t treat the infection — you need <strong>oral rehydration solution (ORS)</strong> and proper medical care, especially for kids. 💧"}, "completion": {"title": "You got the gist!", "xpLabel": "+10 XP"}}', 10, 1);


// Track 1: HIV & Stigma Basics — content sourced from docs/tracks/track-1-hiv-stigma-basics.md
const TRACK = {
  id: "track-1",
  title: "HIV & Stigma Basics",
  lessons: [
    {
      title: "What HIV Actually Is",
      goal: "Understand HIV as a virus that affects the immune system.",
      content: [
        "HIV stands for Human Immunodeficiency Virus — it targets the immune system, specifically CD4 cells.",
        "HIV is not the same as AIDS. AIDS is a late stage that only happens if HIV goes untreated for a long time.",
        "With modern treatment, HIV very rarely progresses to AIDS at all."
      ],
      quiz: [
        { q: "HIV and AIDS mean the same thing.", options: ["True", "False"], correct: 1 },
        { q: "HIV mainly affects which part of the body?", options: ["The skin", "The immune system", "The bones"], correct: 1 }
      ]
    },
    {
      title: "How HIV Is Actually Transmitted",
      goal: "Replace vague fear with the specific, limited list of ways HIV spreads.",
      content: [
        "HIV spreads through specific bodily fluids: blood, semen, vaginal fluids, and breast milk.",
        "It does not spread through saliva, sweat, tears, or casual contact.",
        "The most common routes are unprotected sex and shared needles."
      ],
      quiz: [
        { q: "Which of these can transmit HIV?", options: ["Sharing a cup", "Unprotected sex", "Hugging"], correct: 1 },
        { q: "HIV can spread through saliva.", options: ["True", "False"], correct: 1 }
      ]
    },
    {
      title: "Myths vs. Facts",
      goal: "Directly debunk the most common HIV myths.",
      content: [
        "Myth: You can get HIV from mosquito bites. Fact: You cannot — HIV doesn't survive or replicate in insects.",
        "Myth: You can tell someone has HIV by looking at them. Fact: Most people with HIV look completely healthy, especially on treatment.",
        "Myth: HIV is a death sentence. Fact: People on treatment live long, full lives."
      ],
      quiz: [
        { q: "Can you get HIV from a mosquito bite?", options: ["Yes", "No"], correct: 1 },
        { q: "Can you always tell if someone has HIV by looking at them?", options: ["Yes", "No"], correct: 1 }
      ]
    },
    {
      title: "Testing — What to Expect",
      goal: "Demystify HIV testing to reduce fear-avoidance.",
      content: [
        "A rapid test can give results in as little as 15–20 minutes.",
        "Testing is confidential, and many places offer free testing.",
        "Knowing your status — either way — is the first step to protecting your health."
      ],
      quiz: [
        { q: "How long can a rapid HIV test take to give results?", options: ["Several weeks", "About 15–20 minutes", "A full day"], correct: 1 }
      ]
    },
    {
      title: "Treatment Today: ART & Undetectable",
      goal: "Introduce antiretroviral therapy and the concept of viral suppression.",
      content: [
        "ART (antiretroviral therapy) is daily medication that controls HIV.",
        "With consistent treatment, HIV levels can become \"undetectable\" in the blood.",
        "Undetectable means the virus is suppressed to the point it can't be measured by standard tests."
      ],
      quiz: [
        { q: "What does ART stand for?", options: ["Antiretroviral Therapy", "Automatic Response Test"], correct: 0 }
      ]
    },
    {
      title: "U=U: Undetectable = Untransmittable",
      goal: "Teach the single most stigma-reducing fact in modern HIV science.",
      content: [
        "U=U is backed by major global health bodies including the WHO.",
        "A person on effective treatment with an undetectable viral load cannot sexually transmit HIV to a partner.",
        "This single fact has changed how the world understands living with HIV."
      ],
      quiz: [
        { q: "What does U=U stand for?", options: ["Understood = Universal", "Undetectable = Untransmittable"], correct: 1 },
        { q: "Someone who is undetectable can still transmit HIV sexually.", options: ["True", "False"], correct: 1 }
      ]
    },
    {
      title: "What Stigma Actually Looks Like",
      goal: "Name stigma in concrete, recognizable everyday forms.",
      content: [
        "Stigma can be a joke, an assumption, an awkward silence, or someone being excluded.",
        "It often comes from outdated fear, not current facts.",
        "Stigma is one of the biggest reasons people avoid getting tested."
      ],
      quiz: [
        { q: "Which of these is an example of stigma?", options: ["Avoiding someone because of an assumption about their status", "Asking a doctor a health question"], correct: 0 }
      ]
    },
    {
      title: "The Cost of Silence",
      goal: "Connect stigma directly to real-world harm.",
      content: [
        "Fear of stigma is one of the top reasons people delay or avoid HIV testing.",
        "Silence and shame can be more damaging, day to day, than the virus itself when someone is on treatment.",
        "Breaking silence starts with accurate information — which is what this track is for."
      ],
      quiz: [
        { q: "Fear of stigma can make people avoid testing.", options: ["True", "False"], correct: 0 }
      ]
    },
    {
      title: "Supporting Someone Living With HIV",
      goal: "Give practical, actionable guidance for allies.",
      content: [
        "Treat someone's status as private health information — not something to share without consent.",
        "You don't need to change how you interact with someone based on their status.",
        "Simple, consistent respect is more valuable than grand gestures."
      ],
      quiz: [
        { q: "If a friend shares their HIV status with you, what should you do?", options: ["Keep it private unless they say otherwise", "Tell close mutual friends so they're careful"], correct: 0 }
      ]
    },
    {
      title: "Bringing It Together",
      goal: "Consolidate the track with a mixed review before completion.",
      content: [
        "Recap: transmission facts, testing, treatment, U=U, and what stigma really looks like.",
        "This lesson mixes questions from Lessons 1–9 as a final check.",
        "Completing this lesson unlocks the track completion moment."
      ],
      quiz: [
        { q: "Mixed review — U=U means someone on effective treatment:", options: ["Cannot sexually transmit HIV", "Is fully cured"], correct: 0 },
        { q: "Mixed review — the biggest driver of HIV testing avoidance is usually:", options: ["Stigma and fear", "Cost of the test"], correct: 0 }
      ]
    }
  ]
};

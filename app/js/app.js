const STORAGE_KEY = "saabi_progress_v1";
const root = document.getElementById("app");

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed.hearts === undefined) parsed.hearts = 3;
    if (parsed.quizCorrect === undefined) parsed.quizCorrect = 0;
    if (parsed.quizTotal === undefined) parsed.quizTotal = 0;
    return parsed;
  }
  return {
    completed: [],       // indexes of completed lessons
    streak: 0,
    lastActiveDate: null, // "YYYY-MM-DD"
    certInterestClicked: false,
    hearts: 3,            // visual for now -- does not yet block progress, see app/README.md
    quizCorrect: 0,
    quizTotal: 0
  };
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function touchStreak(state) {
  const today = todayStr();
  if (state.lastActiveDate === today) return state;
  if (state.lastActiveDate) {
    const gap = daysBetween(state.lastActiveDate, today);
    state.streak = gap === 1 ? state.streak + 1 : 1;
  } else {
    state.streak = 1;
  }
  state.lastActiveDate = today;
  state.hearts = 3; // simple daily replenish
  return state;
}

const ASSETS = "assets/characters/";

const NAV_TABS = [
  { id: "learn", href: "index.html", label: "Learn", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V6a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v14"/></svg>` },
  { id: "gist", href: "gist.html", label: "Gist", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H8l-4 4V4z"/></svg>` },
  { id: "badges", href: "badges.html", label: "Badges", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>` },
  { id: "profile", href: "profile.html", label: "Profile", icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>` }
];

function bottomNavHTML(active) {
  return `
    <nav class="bottom-nav"><div class="bottom-nav-inner">
      ${NAV_TABS.map(t => `<a href="${t.href}" class="nav-tab ${t.id === active ? "active" : ""}">${t.icon}${t.label}</a>`).join("")}
    </div></nav>`;
}

function getUserInitial() {
  const auth = typeof getAuth === "function" ? getAuth() : null;
  const name = (auth && auth.name) || "Padi";
  return name.trim().charAt(0).toUpperCase() || "P";
}

function appHeaderHTML(rightHTML) {
  return `
    <header class="app-header">
      <a href="profile.html" class="app-header-left">
        <span class="app-avatar">${getUserInitial()}</span>
        <span class="app-wordmark">Saabi</span>
      </a>
      <div class="app-header-right">${rightHTML}</div>
    </header>`;
}

// the Crew, per the Character Bible — cycled beside the path so users start
// to recognize who's who, the way you would in a real group chat
const DECORATIONS = [
  { id: "zara", name: "Zara", img: "zara_full.png" },
  { id: "dr_ayo", name: "Dr. Ayo", img: "dr_ayo_full.png" },
  { id: "bello", name: "Bello", img: "bello_full.png" }
];

function decorationHTML(index, side) {
  const d = DECORATIONS[index % DECORATIONS.length];
  const delay = (index % 4) * 0.4;
  return `
    <li class="deco-wrap ${side}">
      <div class="deco" style="animation-delay:${delay}s">
        <img class="deco-full-img" src="${ASSETS}${d.img}" alt="${d.name}" />
        <div class="deco-name">${d.name}</div>
        <div class="deco-sparkle s1">✨</div>
        <div class="deco-sparkle s2">✨</div>
      </div>
      <div class="deco-shadow"></div>
    </li>`;
}

let state = loadState();

function render() {
  const total = TRACK.lessons.length;
  const done = state.completed.length;

  if (done >= total) {
    renderCompletion();
    return;
  }

  const nextIndex = TRACK.lessons.findIndex((_, i) => !state.completed.includes(i));
  const level = done + 1;
  const quizScore = state.quizTotal ? Math.round((state.quizCorrect / state.quizTotal) * 100) : 0;

  root.innerHTML = `
    <div class="app-shell">
      ${appHeaderHTML(`
        <div class="app-pill streak">🔥 <span>${state.streak}</span></div>
        <div class="app-pill hearts">❤️ <span>${state.hearts}</span></div>
      `)}

      <div class="unit-banner">
        <p class="unit-label">Unit 1</p>
        <h2 class="unit-title">${TRACK.title}</h2>
        <svg class="unit-banner-deco" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M6 12h12M4 8v8M20 8v8M2 12h2M20 12h2"/></svg>
      </div>

      <ol class="skill-path">
        ${TRACK.lessons.map((lesson, i) => {
          const isDone = state.completed.includes(i);
          const isCurrent = i === nextIndex;
          const isLocked = i > nextIndex;
          const status = isDone ? "done" : isCurrent ? "current" : "locked";
          const offset = Math.round(Math.sin(i * (Math.PI / 2)) * 78);
          const icon = isDone ? "✓" : "★";
          const lockBadge = isLocked ? `<span class="node-lock-badge">🔒</span>` : "";
          const node = `
            <li class="node-wrap" style="transform: translateX(${offset}px)">
              ${isCurrent ? `<div class="start-badge">START</div>` : ""}
              <button class="node ${status}" data-index="${i}" ${isLocked ? "disabled" : ""}>${isLocked ? "" : icon}${lockBadge}</button>
              <div class="node-title">${lesson.title}</div>
            </li>`;
          // sprinkle a decorative character in the empty space every few lessons,
          // on the side opposite the node so it doesn't collide with it
          const deco = i % 3 === 1 ? decorationHTML(Math.floor(i / 3), offset >= 0 ? "left" : "right") : "";
          return node + deco;
        }).join("")}
      </ol>

      <div class="reward-card-wrap">
        <div class="reward-card ${done >= total ? "" : "locked"}">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12v9H4v-9M2 7h20v5H2V7zM12 7v14M12 7C10 3 5 4 5 7h7zM12 7c2-4 7-3 7 0h-7z"/></svg>
        </div>
        <div class="reward-label">Unit Reward</div>
      </div>

      <div class="mini-stat-row">
        <div class="mini-stat-card">
          <p class="mini-stat-label">Current Lvl</p>
          <p class="mini-stat-value">${level} <span>EXP</span></p>
        </div>
        <div class="mini-stat-card">
          <p class="mini-stat-label">Quiz Score</p>
          <p class="mini-stat-value teal">${quizScore}%</p>
        </div>
      </div>
    </div>
    ${bottomNavHTML("learn")}
  `;

  root.querySelectorAll(".node.done, .node.current").forEach(el => {
    el.addEventListener("click", () => renderLesson(Number(el.dataset.index)));
  });
}

function renderLesson(index) {
  const lesson = TRACK.lessons[index];
  root.innerHTML = `
    <div class="app-shell">
      <div class="lesson-screen">
        <button class="back-btn">&larr; Back</button>
        <p class="eyebrow">Lesson ${index + 1} of ${TRACK.lessons.length}</p>
        <h2>${lesson.title}</h2>
        <div class="lesson-card">
          <ul class="content-list">
            ${lesson.content.map(line => `<li>${line}</li>`).join("")}
          </ul>
        </div>
        <button class="primary-btn" id="start-quiz">Start Quiz</button>
      </div>
    </div>
    ${bottomNavHTML("learn")}
  `;
  root.querySelector(".back-btn").addEventListener("click", render);
  root.querySelector("#start-quiz").addEventListener("click", () => renderQuiz(index, 0, 0));
}

function renderQuiz(lessonIndex, qIndex, correctCount) {
  const lesson = TRACK.lessons[lessonIndex];
  const q = lesson.quiz[qIndex];
  let selected = null;
  let checked = false;

  root.innerHTML = `
    <div class="app-shell">
      <div class="quiz-screen">
        <div class="quiz-top-row">
          <button class="close-btn" id="quiz-close">&times;</button>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(qIndex / lesson.quiz.length) * 100}%"></div></div>
        </div>
        <h2 class="quiz-question">${q.q}</h2>
        <div class="options">
          ${q.options.map((opt, i) => `<button class="option-btn" data-index="${i}">${opt}</button>`).join("")}
        </div>
      </div>
    </div>
    <div class="bottom-bar" id="bottom-bar">
      <div class="bottom-bar-inner">
        <button class="check-btn" id="check-btn" disabled>Check</button>
      </div>
    </div>
  `;

  root.querySelector("#quiz-close").addEventListener("click", render);

  const optionEls = Array.from(root.querySelectorAll(".option-btn"));
  const checkBtn = root.querySelector("#check-btn");
  const bottomBar = root.querySelector("#bottom-bar");

  optionEls.forEach(btn => {
    btn.addEventListener("click", () => {
      if (checked) return;
      selected = Number(btn.dataset.index);
      optionEls.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      checkBtn.disabled = false;
    });
  });

  checkBtn.addEventListener("click", () => {
    checked = true;
    const isCorrect = selected === q.correct;
    optionEls.forEach(b => (b.disabled = true));
    optionEls[selected].classList.remove("selected");
    optionEls[selected].classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) optionEls[q.correct].classList.add("correct");

    state.quizTotal += 1;
    if (isCorrect) {
      state.quizCorrect += 1;
    } else {
      state.hearts = Math.max(0, state.hearts - 1);
    }
    saveState(state);

    bottomBar.classList.add(isCorrect ? "state-correct" : "state-incorrect");
    bottomBar.querySelector(".bottom-bar-inner").innerHTML = `
      <div class="feedback-row ${isCorrect ? "correct" : "incorrect"}">
        ${isCorrect ? "🎉 Nice job!" : "❌ Not quite — the right answer is highlighted above."}
      </div>
      <button class="continue-btn ${isCorrect ? "" : "incorrect"}" id="continue-btn">
        ${qIndex + 1 < lesson.quiz.length ? "Continue" : "Finish Lesson"}
      </button>
    `;
    bottomBar.querySelector("#continue-btn").addEventListener("click", () => {
      const newCorrect = correctCount + (isCorrect ? 1 : 0);
      if (qIndex + 1 < lesson.quiz.length) {
        renderQuiz(lessonIndex, qIndex + 1, newCorrect);
      } else {
        completeLesson(lessonIndex);
      }
    });
  });
}

function completeLesson(index) {
  if (!state.completed.includes(index)) {
    state.completed.push(index);
  }
  state = touchStreak(state);
  saveState(state);
  render();
}

function renderCompletion() {
  root.innerHTML = `
    <div class="app-shell">
      <div class="completion-screen">
        <div class="confetti">🎉 🎊 🎉</div>
        <img class="completion-mascot-img" src="${ASSETS}buggy_happy.png" alt="Buggy celebrating" />
        <p class="eyebrow">Track complete</p>
        <h1>You finished ${TRACK.title}!</h1>
        <p class="stat-row-inline">🔥 ${state.streak}-day streak &middot; ⭐ ${TRACK.lessons.length}/${TRACK.lessons.length} lessons</p>
        <div class="cert-teaser">
          <p>A real <strong>Certified Saabi Health Advocate</strong> credential is coming in Phase 1.</p>
          <button class="primary-btn" id="cert-interest" ${state.certInterestClicked ? "disabled" : ""}>
            ${state.certInterestClicked ? "Thanks — you're on the list" : "Notify me when it launches"}
          </button>
        </div>
        <button class="secondary-btn" id="restart">Review track</button>
      </div>
    </div>
    ${bottomNavHTML("learn")}
  `;
  root.querySelector("#cert-interest").addEventListener("click", () => {
    state.certInterestClicked = true;
    saveState(state);
    renderCompletion();
  });
  root.querySelector("#restart").addEventListener("click", render);
}

render();

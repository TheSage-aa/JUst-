const STORAGE_KEY = "saabi_progress_v1";
const root = document.getElementById("app");

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return {
    completed: [],       // indexes of completed lessons
    streak: 0,
    lastActiveDate: null, // "YYYY-MM-DD"
    certInterestClicked: false
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
  return state;
}

const ASSETS = "assets/characters/";

function mascotHTML() {
  return `<img class="mascot-img" src="${ASSETS}buggy_avatar.png" alt="Buggy" />`;
}

// the Crew, per the Character Bible — cycled beside the path so users start
// to recognize who's who, the way you would in a real group chat
const DECORATIONS = [
  { id: "zara", name: "Zara", img: "zara_avatar.png", ring: "#e0304f" },
  { id: "dr_ayo", name: "Dr. Ayo", img: "dr_ayo_avatar.png", ring: "#2fb0ea" },
  { id: "bello", name: "Bello", img: "bello_avatar.png", ring: "#ff8a3d" }
];

function decorationHTML(index, side) {
  const d = DECORATIONS[index % DECORATIONS.length];
  const delay = (index % 4) * 0.4;
  return `
    <li class="deco-wrap ${side}">
      <div class="deco" style="animation-delay:${delay}s">
        <img class="deco-avatar-img" src="${ASSETS}${d.img}" alt="${d.name}" style="box-shadow: 0 3px 0 ${d.ring}66, 0 0 0 3px ${d.ring}33;" />
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
  const welcomeBack = state.lastActiveDate === todayStr() && done > 0 && done < total;

  root.innerHTML = `
    <header class="hero">
      <div class="mascot-row">
        ${mascotHTML()}
        <div class="speech-bubble">${welcomeBack ? "Welcome back — pick up where you left off!" : done === 0 ? "Ready when you are. Let's start with lesson 1!" : "Nice progress. Keep it going!"}</div>
      </div>
      <p class="eyebrow">Saabi by LUMA — Phase 0</p>
      <h1>${TRACK.title}</h1>
      <div class="stat-chips">
        <div class="stat-chip streak">🔥 ${state.streak}</div>
        <div class="stat-chip progress">⭐ ${done}/${total}</div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(done / total) * 100}%"></div></div>
    </header>
    <ol class="skill-path">
      ${TRACK.lessons.map((lesson, i) => {
        const isDone = state.completed.includes(i);
        const isCurrent = i === nextIndex;
        const isLocked = i > nextIndex;
        const status = isDone ? "done" : isCurrent ? "current" : "locked";
        const offset = Math.round(Math.sin(i * (Math.PI / 2)) * 78);
        const icon = isDone ? "✓" : isLocked ? "🔒" : "★";
        const node = `
          <li class="node-wrap" style="transform: translateX(${offset}px)">
            ${isCurrent ? `<div class="start-badge">START</div>` : ""}
            <button class="node ${status}" data-index="${i}" ${isLocked ? "disabled" : ""}>${icon}</button>
            <div class="node-title">${lesson.title}</div>
          </li>`;
        // sprinkle a decorative character in the empty space every few lessons,
        // on the side opposite the node so it doesn't collide with it
        const deco = i % 3 === 1 ? decorationHTML(Math.floor(i / 3), offset >= 0 ? "left" : "right") : "";
        return node + deco;
      }).join("")}
    </ol>
  `;

  root.querySelectorAll(".node.done, .node.current").forEach(el => {
    el.addEventListener("click", () => renderLesson(Number(el.dataset.index)));
  });
}

function renderLesson(index) {
  const lesson = TRACK.lessons[index];
  root.innerHTML = `
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
    if (checked) {
      const newCorrect = correctCount + (selected === q.correct ? 1 : 0);
      if (qIndex + 1 < lesson.quiz.length) {
        renderQuiz(lessonIndex, qIndex + 1, newCorrect);
      } else {
        completeLesson(lessonIndex);
      }
      return;
    }

    checked = true;
    const isCorrect = selected === q.correct;
    optionEls.forEach(b => (b.disabled = true));
    optionEls[selected].classList.remove("selected");
    optionEls[selected].classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) optionEls[q.correct].classList.add("correct");

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
  `;
  root.querySelector("#cert-interest").addEventListener("click", () => {
    state.certInterestClicked = true;
    saveState(state);
    renderCompletion();
  });
  root.querySelector("#restart").addEventListener("click", render);
}

render();

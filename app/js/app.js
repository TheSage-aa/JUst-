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

let state = loadState();

function render() {
  const total = TRACK.lessons.length;
  const done = state.completed.length;

  if (done >= total) {
    renderCompletion();
    return;
  }

  const nextIndex = TRACK.lessons.findIndex((_, i) => !state.completed.includes(i));
  root.innerHTML = `
    <header class="hero">
      <p class="eyebrow">Saabi by LUMA — Phase 0</p>
      <h1>${TRACK.title}</h1>
      <div class="stat-row">
        <div class="stat"><span class="stat-value">${done}/${total}</span><span class="stat-label">lessons</span></div>
        <div class="stat"><span class="stat-value">🔥 ${state.streak}</span><span class="stat-label">day streak</span></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(done / total) * 100}%"></div></div>
      ${state.lastActiveDate === todayStr() && done > 0 && done < total ? `<p class="return-msg">Welcome back — pick up where you left off.</p>` : ""}
    </header>
    <ol class="lesson-list">
      ${TRACK.lessons.map((lesson, i) => {
        const isDone = state.completed.includes(i);
        const isLocked = i > nextIndex;
        const status = isDone ? "done" : isLocked ? "locked" : "unlocked";
        return `
          <li class="lesson-item ${status}" data-index="${i}">
            <span class="lesson-num">${isDone ? "✓" : i + 1}</span>
            <span class="lesson-title">${lesson.title}</span>
          </li>`;
      }).join("")}
    </ol>
  `;

  root.querySelectorAll(".lesson-item.unlocked, .lesson-item.done").forEach(el => {
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
      <ul class="content-list">
        ${lesson.content.map(line => `<li>${line}</li>`).join("")}
      </ul>
      <button class="primary-btn" id="start-quiz">Start Quiz</button>
    </div>
  `;
  root.querySelector(".back-btn").addEventListener("click", render);
  root.querySelector("#start-quiz").addEventListener("click", () => renderQuiz(index, 0, 0));
}

function renderQuiz(lessonIndex, qIndex, correctCount) {
  const lesson = TRACK.lessons[lessonIndex];
  const q = lesson.quiz[qIndex];
  root.innerHTML = `
    <div class="quiz-screen">
      <p class="eyebrow">Question ${qIndex + 1} of ${lesson.quiz.length}</p>
      <h2>${q.q}</h2>
      <div class="options">
        ${q.options.map((opt, i) => `<button class="option-btn" data-index="${i}">${opt}</button>`).join("")}
      </div>
      <div class="feedback" id="feedback" hidden></div>
    </div>
  `;

  root.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const chosen = Number(btn.dataset.index);
      const isCorrect = chosen === q.correct;
      root.querySelectorAll(".option-btn").forEach(b => (b.disabled = true));
      btn.classList.add(isCorrect ? "correct" : "incorrect");
      if (!isCorrect) {
        root.querySelector(`.option-btn[data-index="${q.correct}"]`).classList.add("correct");
      }
      const feedback = root.querySelector("#feedback");
      feedback.hidden = false;
      feedback.textContent = isCorrect ? "Correct!" : "Not quite — the right answer is highlighted above.";
      feedback.className = "feedback " + (isCorrect ? "feedback-correct" : "feedback-incorrect");

      const nextBtn = document.createElement("button");
      nextBtn.className = "primary-btn";
      nextBtn.textContent = qIndex + 1 < lesson.quiz.length ? "Next Question" : "Finish Lesson";
      nextBtn.addEventListener("click", () => {
        const newCorrect = correctCount + (isCorrect ? 1 : 0);
        if (qIndex + 1 < lesson.quiz.length) {
          renderQuiz(lessonIndex, qIndex + 1, newCorrect);
        } else {
          completeLesson(lessonIndex);
        }
      });
      root.querySelector(".quiz-screen").appendChild(nextBtn);
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
      <p class="eyebrow">Track complete</p>
      <h1>You finished ${TRACK.title}! 🎉</h1>
      <p class="stat-row-inline">🔥 ${state.streak}-day streak &middot; ${TRACK.lessons.length}/${TRACK.lessons.length} lessons</p>
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

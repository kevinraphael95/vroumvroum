/* ============ THÈME ============ */
function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('vroum-theme', isDark ? 'dark' : 'light');
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}

// Restaurer le thème
(function initTheme() {
  if (localStorage.getItem('vroum-theme') === 'dark') {
    document.body.classList.add('dark');
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.theme-toggle').forEach(btn => btn.textContent = '☀️');
    });
  }
})();

// Surligner la fiche active dans la sidebar (page fiches)
(function initSidebarScroll() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  if (!sidebarLinks.length) return;

  const blocs = [...sidebarLinks].map(a => document.querySelector(a.getAttribute('href')));

  function setActive() {
    let current = blocs[0];
    const y = window.scrollY + 120;
    for (const b of blocs) if (b && b.offsetTop <= y) current = b;
    sidebarLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id)
    );
  }

  window.addEventListener('scroll', setActive);
  window.addEventListener('load', setActive);
})();

/* ============ QCM ============ */
let mode = null;
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let lastCategory = null;

const modeSelect = document.getElementById('mode-select');
const quizBox = document.getElementById('quiz');
const resultBox = document.getElementById('result');

function showOnly(el) {
  [modeSelect, quizBox, resultBox].forEach(b => {
    if (b) b.style.display = (b === el) ? (b === quizBox ? 'grid' : 'block') : 'none';
  });
}

function startMode(chosenMode) {
  mode = chosenMode;
  score = 0;
  streak = 0;
  currentIndex = 0;
  lastCategory = null;

  if (mode === 'rapide') {
    currentQuestions = generateQuestionSet(5);
  } else {
    currentQuestions = [generateOneQuestion()];
  }

  document.getElementById('mode-label').innerText =
    mode === 'rapide' ? 'Mode rapide' : 'Mode infini';

  document.getElementById('mode-btn-rapide').classList.toggle('active', mode === 'rapide');
  document.getElementById('mode-btn-infini').classList.toggle('active', mode === 'infini');

  showOnly(quizBox);
  loadQuestion();
}

function loadQuestion() {
  const q = currentQuestions[currentIndex];
  lastCategory = q.category;

  const total = mode === 'rapide' ? currentQuestions.length : null;
  const displayNum = String(currentIndex + 1).padStart(2, '0');

  document.getElementById('examen-num').innerHTML =
    `Question <strong>${displayNum}</strong>` + (total ? ` / ${String(total).padStart(2,'0')}` : '');
  document.getElementById('question-counter').innerText =
    `Q.${displayNum}` + (total ? ` / ${String(total).padStart(2,'0')}` : '');
  document.getElementById('examen-cat').innerText = q.category;
  document.getElementById('examen-question').innerText = q.question;

  const progress = total ? ((currentIndex) / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = progress + '%';

  document.getElementById('side-progress').innerText =
    total ? `${currentIndex + 1} / ${total}` : `Question ${currentIndex + 1}`;
  document.getElementById('side-streak').innerText = `🔥 ${streak}`;
  document.getElementById('examen-score').innerHTML =
    `Série en cours : <strong>🔥 ${streak}</strong>`;

  const options = document.getElementById('options');
  options.innerHTML = '';

  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback';
  document.getElementById('next-btn').style.display = 'none';

  q.shuffledOptions.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="case">${i + 1}</span>${opt}`;
    btn.onclick = () => selectOption(btn, opt, q.answer, q.explanation);
    options.appendChild(btn);
  });
}

function selectOption(btn, selectedOpt, correctOpt, explanation) {
  const buttons = document.querySelectorAll('.option');
  const feedback = document.getElementById('feedback');
  const isCorrect = selectedOpt === correctOpt;

  buttons.forEach(b => {
    b.disabled = true;
    const val = b.innerText.replace(/^\d+\s*/, '').trim();
    if (val === correctOpt) {
      b.classList.add('correct');
      b.querySelector('.case').innerText = '✓';
    } else if (b === btn) {
      b.classList.add('wrong');
      b.querySelector('.case').innerText = '✗';
    }
  });

  const stamp = document.getElementById('feedback-stamp');
  const text = document.getElementById('feedback-text');

  if (isCorrect) {
    score++;
    streak++;
    feedback.className = 'feedback show success';
    stamp.innerText = 'Correct';
    text.innerHTML = `<strong>Bien joué.</strong>${explanation}`;
    document.getElementById('next-btn').innerText =
      (mode === 'rapide' && currentIndex === currentQuestions.length - 1)
        ? 'Voir le résultat'
        : 'Question suivante →';
  } else {
    feedback.className = 'feedback show error';
    stamp.innerText = 'Erreur';
    text.innerHTML = `<strong>Raté.</strong>${explanation}`;
    document.getElementById('next-btn').innerText =
      mode === 'infini' ? 'Voir mon score' : 'Voir le résultat';
  }

  document.getElementById('next-btn').style.display = 'inline-flex';
  document.getElementById('next-btn').dataset.correct = isCorrect;

  // MàJ progression sur la bonne réponse
  document.getElementById('progress-fill').style.width =
    mode === 'rapide' ? (((currentIndex + 1) / currentQuestions.length) * 100) + '%' : '0%';

  document.getElementById('side-streak').innerText = `🔥 ${streak}`;
  document.getElementById('examen-score').innerHTML =
    `Série en cours : <strong>🔥 ${streak}</strong>`;
}

function nextQuestion() {
  const wasCorrect = document.getElementById('next-btn').dataset.correct === 'true';

  if (mode === 'infini') {
    if (!wasCorrect) { showResults(); return; }
    currentIndex++;
    currentQuestions.push(generateOneQuestion(lastCategory));
    loadQuestion();
    return;
  }

  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  showOnly(resultBox);

  const title = document.getElementById('result-title');
  const detail = document.getElementById('result-detail');

  if (mode === 'rapide') {
    const total = currentQuestions.length;
    title.innerText = `Score final : ${score} / ${total}`;
    const ratio = score / total;
    detail.innerText =
      ratio === 1 ? 'Sans faute, bravo !' :
      ratio >= 0.6 ? 'Bonne base, continue à réviser.' :
      'Reprends les fiches avant de retenter.';
  } else {
    title.innerText = `Série terminée à ${streak} bonne(s) réponse(s)`;
    detail.innerText =
      streak >= 10 ? 'Solide, tu maîtrises bien le programme.' :
      streak >= 5 ? 'Pas mal, continue à réviser les thèmes qui te bloquent.' :
      'Retourne voir les fiches de cours avant de retenter.';
  }
}

function backToModeSelect() {
  showOnly(modeSelect);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  if (modeSelect) showOnly(modeSelect);
});

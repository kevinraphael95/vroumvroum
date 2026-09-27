/* =========================================================
   VroumVroum — App
   1. Thème clair / sombre (avec sauvegarde)
   2. QCM : mode rapide + mode infini
      - Anti-répétition des questions
      - Bouton "Rejouer"
   ========================================================= */

/* ============ 1. THÈME ============ */

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}

function toggleTheme() {
  const isDark = !document.body.classList.contains('dark');
  applyTheme(isDark);
  localStorage.setItem('vroum-theme', isDark ? 'dark' : 'light');
}

// Restaurer le thème au chargement
applyTheme(localStorage.getItem('vroum-theme') === 'dark');


/* ============ 2. QCM — ÉTAT ============ */

let mode = null;                    // "rapide" | "infini"
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let lastCategory = null;
let seenQuestions = new Set();      // mémorise les énoncés déjà posés dans la session

// Références DOM (peuvent être null selon la page)
const modeSelectBox = document.getElementById('mode-select');
const quizBox       = document.getElementById('quiz');
const resultBox     = document.getElementById('result');


/* ============ 3. AFFICHAGE ============ */

function showOnly(el) {
  [modeSelectBox, quizBox, resultBox].forEach(b => {
    if (!b) return;
    if (b === el) {
      b.style.display = (b === quizBox) ? 'grid' : 'block';
    } else {
      b.style.display = 'none';
    }
  });
}


/* ============ 4. LANCEMENT D'UN MODE ============ */

function startMode(chosenMode) {
  if (typeof generateQuestionSet !== 'function') return;

  mode = chosenMode;
  score = 0;
  streak = 0;
  currentIndex = 0;
  lastCategory = null;
  seenQuestions = new Set();       // reset à chaque nouvelle session

  currentQuestions = (mode === 'rapide')
    ? generateQuestionSet(5, seenQuestions)
    : [generateOneQuestion(null, seenQuestions)];

  document.getElementById('mode-label').innerText =
    mode === 'rapide' ? 'Mode rapide' : 'Mode infini';

  document.getElementById('mode-btn-rapide')
    ?.classList.toggle('active', mode === 'rapide');
  document.getElementById('mode-btn-infini')
    ?.classList.toggle('active', mode === 'infini');

  showOnly(quizBox);
  loadQuestion();
}


/* ============ 5. CHARGEMENT D'UNE QUESTION ============ */

function loadQuestion() {
  const q = currentQuestions[currentIndex];
  lastCategory = q.category;

  const total = mode === 'rapide' ? currentQuestions.length : null;
  const displayNum = String(currentIndex + 1).padStart(2, '0');
  const totalDisplay = total ? String(total).padStart(2, '0') : null;

  // Header
  document.getElementById('examen-num').innerHTML =
    `Question <strong>${displayNum}</strong>` + (totalDisplay ? ` / ${totalDisplay}` : '');
  document.getElementById('question-counter').innerText =
    `Q.${displayNum}` + (totalDisplay ? ` / ${totalDisplay}` : '');
  document.getElementById('examen-cat').innerText = q.category;
  document.getElementById('examen-question').innerText = q.question;

  // Barre de progression
  const progress = total ? (currentIndex / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = progress + '%';

  // Panneau latéral
  document.getElementById('side-progress').innerText =
    total ? `${currentIndex + 1} / ${total}` : `Question ${currentIndex + 1}`;
  document.getElementById('side-streak').innerText = `🔥 ${streak}`;
  document.getElementById('examen-score').innerHTML =
    `Série en cours : <strong>🔥 ${streak}</strong>`;

  // Options
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


/* ============ 6. RÉPONSE À UNE QUESTION ============ */

function selectOption(btn, selectedOpt, correctOpt, explanation) {
  const buttons = document.querySelectorAll('.option');
  const feedback = document.getElementById('feedback');
  const isCorrect = selectedOpt === correctOpt;

  // Désactiver + marquer visuellement
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
  const text  = document.getElementById('feedback-text');

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
      (mode === 'infini') ? 'Voir mon score' : 'Voir le résultat';
  }

  document.getElementById('next-btn').style.display = 'inline-flex';
  document.getElementById('next-btn').dataset.correct = isCorrect;

  // Barre de progression après réponse
  if (mode === 'rapide') {
    const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
  }

  // Panneau latéral
  document.getElementById('side-streak').innerText = `🔥 ${streak}`;
  document.getElementById('examen-score').innerHTML =
    `Série en cours : <strong>🔥 ${streak}</strong>`;
}


/* ============ 7. QUESTION SUIVANTE ============ */

function nextQuestion() {
  const wasCorrect = document.getElementById('next-btn').dataset.correct === 'true';

  // Mode infini : on enchaîne tant que c'est correct
  if (mode === 'infini') {
    if (!wasCorrect) { showResults(); return; }
    currentIndex++;
    currentQuestions.push(generateOneQuestion(lastCategory, seenQuestions));
    loadQuestion();
    return;
  }

  // Mode rapide : 5 questions, puis résultats
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}


/* ============ 8. RÉSULTATS ============ */

function showResults() {
  showOnly(resultBox);

  const title  = document.getElementById('result-title');
  const detail = document.getElementById('result-detail');

  if (mode === 'rapide') {
    const total = currentQuestions.length;
    title.innerText = `Score final : ${score} / ${total}`;
    const ratio = score / total;
    detail.innerText =
      ratio === 1   ? 'Sans faute, bravo !' :
      ratio >= 0.6  ? 'Bonne base, continue à réviser.' :
                      'Reprends les fiches avant de retenter.';
  } else {
    title.innerText = `Série terminée à ${streak} bonne(s) réponse(s)`;
    detail.innerText =
      streak >= 10 ? 'Solide, tu maîtrises bien le programme.' :
      streak >= 5  ? 'Pas mal, continue à réviser les thèmes qui te bloquent.' :
                     'Retourne voir les fiches de cours avant de retenter.';
  }
}


/* ============ 9. NAVIGATION ============ */

function replay() {
  if (mode) startMode(mode);
}

function backToModeSelect() {
  showOnly(modeSelectBox);
}


/* ============ 10. INITIALISATION ============ */

document.addEventListener('DOMContentLoaded', () => {
  if (modeSelectBox) showOnly(modeSelectBox);
});

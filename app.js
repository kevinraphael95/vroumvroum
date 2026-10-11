/* =========================================================
   VroumVroum - App
   1. Theme clair / sombre (avec sauvegarde)
   2. QCM : mode rapide + mode infini
      - Anti-repetition des questions
      - Bouton "Rejouer"
      - Navigation clavier (1-4, Entree, Espace, Echap)
      - Meilleure serie sauvegardee
   ========================================================= */

(function () {
  'use strict';

  /* ============ 1. STORAGE (safe) ============ */

  const storage = {
    get(key, fallback = null) {
      try { return localStorage.getItem(key) ?? fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
    }
  };

  /* ============ 2. THEME ============ */

  function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
  }

  function toggleTheme() {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    storage.set('vroum-theme', isDark ? 'dark' : 'light');
  }

  applyTheme(storage.get('vroum-theme') === 'dark');


  /* ============ 3. ETAT QCM ============ */

  let mode = null;                    // "rapide" | "infini"
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let lastCategory = null;
  let lastAnswerWasCorrect = false;   // remplace dataset.correct
  let seenQuestions = new Set();

  // Refs DOM (peuvent etre null selon la page)
  let modeSelectBox = null;
  let quizBox = null;
  let resultBox = null;


  /* ============ 4. AFFICHAGE ============ */

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

  function updateProgress(pct) {
    const fill = document.getElementById('progress-fill');
    if (!fill) return;
    // Mode infini : jauge basee sur la serie (feedback visuel)
    if (mode === 'infini') {
      fill.style.width = Math.min(streak * 8, 100) + '%';
    } else {
      fill.style.width = pct + '%';
    }
  }


  /* ============ 5. LANCEMENT D'UN MODE ============ */

  function startMode(chosenMode) {
    if (typeof generateQuestionSet !== 'function') return;

    mode = chosenMode;
    score = 0;
    streak = 0;
    currentIndex = 0;
    lastCategory = null;
    lastAnswerWasCorrect = false;
    seenQuestions = new Set();

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


  /* ============ 6. CHARGEMENT D'UNE QUESTION ============ */

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
    updateProgress(total ? (currentIndex / total) * 100 : 0);

    // Panneau lateral
    document.getElementById('side-progress').innerText =
      total ? `${currentIndex + 1} / ${total}` : `Question ${currentIndex + 1}`;
    document.getElementById('side-streak').innerText = `\uD83D\uDD25 ${streak}`;
    document.getElementById('examen-score').innerHTML =
      `Serie en cours : <strong>\uD83D\uDD25 ${streak}</strong>`;

    // Options
    const options = document.getElementById('options');
    options.innerHTML = '';

    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
    document.getElementById('next-btn').style.display = 'none';

    q.shuffledOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.dataset.value = opt;       // stockage robuste
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="case">${i + 1}</span>${opt}`;
      btn.onclick = () => selectOption(btn, opt, q.answer, q.explanation);
      options.appendChild(btn);
    });
  }


  /* ============ 7. REPONSE A UNE QUESTION ============ */

  function selectOption(btn, selectedOpt, correctOpt, explanation) {
    const buttons = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedOpt === correctOpt;
    lastAnswerWasCorrect = isCorrect;

    // Desactiver + marquer visuellement (via dataset, pas via innerText)
    buttons.forEach(b => {
      b.disabled = true;
      const val = b.dataset.value;
      if (val === correctOpt) {
        b.classList.add('correct');
        b.querySelector('.case').innerText = '\u2713';
      } else if (b === btn) {
        b.classList.add('wrong');
        b.querySelector('.case').innerText = '\u2717';
      }
    });

    const stamp = document.getElementById('feedback-stamp');
    const text  = document.getElementById('feedback-text');

    if (isCorrect) {
      score++;
      streak++;
      saveBestStreak(streak);
      feedback.className = 'feedback show success';
      stamp.innerText = 'Correct';
      text.innerHTML = `<strong>Bien joue.</strong>${explanation}`;
      document.getElementById('next-btn').innerText =
        (mode === 'rapide' && currentIndex === currentQuestions.length - 1)
          ? 'Voir le resultat'
          : 'Question suivante \u2192';
    } else {
      feedback.className = 'feedback show error';
      stamp.innerText = 'Erreur';
      text.innerHTML = `<strong>Rate.</strong>${explanation}`;
      document.getElementById('next-btn').innerText =
        (mode === 'infini') ? 'Voir mon score' : 'Voir le resultat';
    }

    document.getElementById('next-btn').style.display = 'inline-flex';

    // Barre de progression
    if (mode === 'rapide') {
      updateProgress(((currentIndex + 1) / currentQuestions.length) * 100);
    } else {
      updateProgress(0); // recalcule selon la serie
    }

    // Panneau lateral
    document.getElementById('side-streak').innerText = `\uD83D\uDD25 ${streak}`;
    document.getElementById('examen-score').innerHTML =
      `Serie en cours : <strong>\uD83D\uDD25 ${streak}</strong>`;
  }


  /* ============ 8. MEILLEURE SERIE ============ */

  function saveBestStreak(current) {
    const best = parseInt(storage.get('vroum-best-streak', '0'), 10) || 0;
    if (current > best) storage.set('vroum-best-streak', String(current));
  }

  function getBestStreak() {
    return parseInt(storage.get('vroum-best-streak', '0'), 10) || 0;
  }


  /* ============ 9. QUESTION SUIVANTE ============ */

  function nextQuestion() {
    // Mode infini : on enchaine tant que c'est correct
    if (mode === 'infini') {
      if (!lastAnswerWasCorrect) { showResults(); return; }
      currentIndex++;
      currentQuestions.push(generateOneQuestion(lastCategory, seenQuestions));
      loadQuestion();
      return;
    }

    // Mode rapide : 5 questions, puis resultats
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }


  /* ============ 10. RESULTATS ============ */

  function showResults() {
    showOnly(resultBox);

    const title  = document.getElementById('result-title');
    const detail = document.getElementById('result-detail');
    const best = getBestStreak();

    if (mode === 'rapide') {
      const total = currentQuestions.length;
      title.innerText = `Score final : ${score} / ${total}`;
      const ratio = score / total;
      detail.innerText =
        ratio === 1   ? 'Sans faute, bravo !' :
        ratio >= 0.6  ? 'Bonne base, continue a reviser.' :
                        'Reprends les fiches avant de retenter.';
    } else {
      title.innerText = `Serie terminee a ${streak} bonne(s) reponse(s)`;
      let msg =
        streak >= 10 ? 'Solide, tu maitrises bien le programme.' :
        streak >= 5  ? 'Pas mal, continue a reviser les themes qui te bloquent.' :
                       'Retourne voir les fiches de cours avant de retenter.';

      if (streak > 0 && streak >= best && streak > 2) {
        msg += ` Nouveau record : ${streak} bonnes reponses d'affilee !`;
      } else if (best > 0) {
        msg += ` Ton record : ${best}.`;
      }
      detail.innerText = msg;
    }
  }


  /* ============ 11. NAVIGATION ============ */

  function replay() {
    if (mode) startMode(mode);
  }

  function backToModeSelect() {
    showOnly(modeSelectBox);
  }


  /* ============ 12. NAVIGATION CLAVIER ============ */

  document.addEventListener('keydown', (e) => {
    // Ne pas intercepter la saisie dans un champ
    if (e.target.matches('input, textarea, select')) return;

    // Echap : quitter le quiz (avec confirmation si en cours)
    if (e.key === 'Escape') {
      if (quizBox && quizBox.style.display !== 'none') {
        const enCours = streak > 0 || currentIndex > 0;
        if (enCours && !confirm('Quitter le quiz en cours ? Ta serie sera perdue.')) return;
        backToModeSelect();
      }
      return;
    }

    // Touches 1 a 4 : selection d'une option
    if (/^[1-4]$/.test(e.key)) {
      if (!quizBox || quizBox.style.display === 'none') return;
      const btns = document.querySelectorAll('.option');
      const btn = btns[parseInt(e.key, 10) - 1];
      if (btn && !btn.disabled) btn.click();
      return;
    }

    // Entree ou Espace : question suivante si le bouton est visible
    if (e.key === 'Enter' || e.key === ' ') {
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
        e.preventDefault();
        nextBtn.click();
      }
    }
  });


  /* ============ 13. INITIALISATION ============ */

  // Exposer les fonctions utilisees dans les onclick inline du HTML
  window.toggleTheme = toggleTheme;
  window.startMode = startMode;
  window.nextQuestion = nextQuestion;
  window.replay = replay;
  window.backToModeSelect = backToModeSelect;

  document.addEventListener('DOMContentLoaded', () => {
    modeSelectBox = document.getElementById('mode-select');
    quizBox       = document.getElementById('quiz');
    resultBox     = document.getElementById('result');
    if (modeSelectBox) showOnly(modeSelectBox);
  });

})();

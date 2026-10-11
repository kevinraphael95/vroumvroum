/* =========================================================
   VroumVroum - App
   1. Theme clair / sombre (avec sauvegarde)
   2. QCM : 3 modes
      - Rapide    : 5 questions, correction immediate
      - Examen    : 40 questions, 30 min, correction a la fin
      - Infini    : jusqu'a la premiere erreur
   3. Anti-repetition, bouton Rejouer, navigation clavier
   4. Meilleure serie sauvegardee
   ========================================================= */

(function () {
  'use strict';

  /* ============ 1. STORAGE ============ */

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


  /* ============ 3. CONSTANTES ============ */

  const RAPIDE_COUNT = 5;
  const EXAM_COUNT = 40;
  const EXAM_DURATION = 30 * 60;         // 30 minutes en secondes
  const EXAM_PASSING_SCORE = 35;         // seuil de reussite ETG

  const MODE_LABELS = {
    rapide: 'Mode rapide',
    examen: 'Examen blanc',
    infini: 'Mode infini'
  };


  /* ============ 4. ETAT ============ */

  let mode = null;                       // "rapide" | "examen" | "infini"
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let lastCategory = null;
  let lastAnswerWasCorrect = false;
  let seenQuestions = new Set();
  let examAnswers = [];                  // reponses stockees pour l'examen
  let timerInterval = null;
  let timeRemaining = 0;

  // Refs DOM
  let modeSelectBox = null;
  let quizBox = null;
  let resultBox = null;


  /* ============ 5. AFFICHAGE ============ */

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
    if (fill) {
      if (mode === 'infini') {
        fill.style.width = Math.min(streak * 8, 100) + '%';
      } else {
        fill.style.width = pct + '%';
      }
    }
    // Nouvelle structure : qcm-progress-fill
    const fill2 = document.querySelector('.qcm-progress-fill');
    if (fill2) {
      if (mode === 'infini') {
        fill2.style.width = Math.min(streak * 8, 100) + '%';
      } else {
        fill2.style.width = pct + '%';
      }
    }
  }


  /* ============ 6. TIMER EXAMEN ============ */

  function formatTime(sec) {
    const m = Math.floor(Math.max(0, sec) / 60);
    const s = Math.max(0, sec) % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function startExamTimer() {
    stopExamTimer();
    timeRemaining = EXAM_DURATION;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        stopExamTimer();
        showResults();
      }
    }, 1000);
  }

  function stopExamTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (el) el.textContent = formatTime(timeRemaining);
  }


  /* ============ 7. LANCEMENT ============ */

  function startMode(chosenMode) {
    if (typeof generateQuestionSet !== 'function') return;

    mode = chosenMode;
    score = 0;
    streak = 0;
    currentIndex = 0;
    lastCategory = null;
    lastAnswerWasCorrect = false;
    seenQuestions = new Set();
    examAnswers = [];
    stopExamTimer();

    if (mode === 'rapide') {
      currentQuestions = generateQuestionSet(RAPIDE_COUNT, seenQuestions);
    } else if (mode === 'examen') {
      currentQuestions = generateQuestionSet(EXAM_COUNT, seenQuestions);
      startExamTimer();
    } else {
      currentQuestions = [generateOneQuestion(null, seenQuestions)];
    }

    // Label du mode
    const modeLabel = document.getElementById('mode-label');
    if (modeLabel) modeLabel.innerText = MODE_LABELS[mode] || 'Mode';

    // Bascule des boutons de mode (ancienne structure + nouvelle)
    ['rapide', 'examen', 'infini'].forEach(m => {
      document.getElementById('mode-btn-' + m)?.classList.toggle('active', mode === m);
      document.getElementById('qcm-mode-' + m)?.classList.toggle('active', mode === m);
    });

    // Affiche / masque le timer
    const timerChip = document.getElementById('timer-chip');
    if (timerChip) timerChip.style.display = (mode === 'examen') ? '' : 'none';

    showOnly(quizBox);
    loadQuestion();
  }


  /* ============ 8. CHARGEMENT D'UNE QUESTION ============ */

  function loadQuestion() {
    const q = currentQuestions[currentIndex];
    lastCategory = q.category;

    const total = mode === 'infini' ? null : currentQuestions.length;
    const displayNum = String(currentIndex + 1).padStart(2, '0');
    const totalDisplay = total ? String(total).padStart(2, '0') : null;

    // Header (ancienne structure)
    const examenNum = document.getElementById('examen-num');
    if (examenNum) {
      examenNum.innerHTML = `Question <strong>${displayNum}</strong>` +
        (totalDisplay ? ` / ${totalDisplay}` : '');
    }
    const counter = document.getElementById('question-counter');
    if (counter) {
      counter.innerText = `Q.${displayNum}` + (totalDisplay ? ` / ${totalDisplay}` : '');
    }
    const cat = document.getElementById('examen-cat');
    if (cat) cat.innerText = q.category;
    const questionEl = document.getElementById('examen-question');
    if (questionEl) questionEl.innerText = q.question;

    // Counter nouvelle structure
    const qcmCounterNum = document.getElementById('qcm-counter-num');
    if (qcmCounterNum) qcmCounterNum.textContent = displayNum;
    const qcmCounterTotal = document.getElementById('qcm-counter-total');
    if (qcmCounterTotal) {
      qcmCounterTotal.textContent = totalDisplay ? ` / ${totalDisplay}` : '';
    }

    // Hint adapte au mode
    const hint = document.getElementById('qcm-hint');
    if (hint) {
      if (mode === 'examen') {
        hint.innerHTML = `Selectionne ta reponse puis valide. <strong>Pas de correction avant la fin.</strong>`;
      } else {
        hint.innerHTML = `Selectionne la bonne reponse puis valide`;
      }
    }

    // Barre de progression
    updateProgress(total ? (currentIndex / total) * 100 : 0);

    // Panneau lateral (ancienne structure)
    const sideProgress = document.getElementById('side-progress');
    if (sideProgress) {
      sideProgress.innerText = total
        ? `${currentIndex + 1} / ${total}`
        : `Question ${currentIndex + 1}`;
    }
    const sideStreak = document.getElementById('side-streak');
    if (sideStreak) sideStreak.innerText = `\uD83D\uDD25 ${streak}`;
    const examenScore = document.getElementById('examen-score');
    if (examenScore) {
      examenScore.innerHTML = `Serie en cours : <strong>\uD83D\uDD25 ${streak}</strong>`;
    }

    // Chips nouvelle structure
    const chipStreak = document.getElementById('chip-streak');
    if (chipStreak) chipStreak.textContent = streak;
    const chipScore = document.getElementById('chip-score');
    if (chipScore) {
      const totalAnswered = mode === 'examen' ? examAnswers.filter(a => a != null).length : currentIndex;
      chipScore.textContent = `${score} / ${totalAnswered}`;
    }

    // Options
    const options = document.getElementById('options');
    options.innerHTML = '';

    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'none';
      if (mode === 'examen') {
        nextBtn.textContent =
          currentIndex === currentQuestions.length - 1
            ? 'Terminer l\'examen'
            : 'Question suivante \u2192';
      } else {
        nextBtn.textContent = 'Valider';
      }
    }

    // En mode examen : restaure la reponse precedente si on revient
    const previousAnswer = (mode === 'examen') ? examAnswers[currentIndex] : null;

    q.shuffledOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.dataset.value = opt;
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="case">${i + 1}</span>${opt}`;

      if (mode === 'examen') {
        if (previousAnswer === opt) btn.classList.add('selected');
        btn.onclick = () => selectExamOption(btn, opt);
      } else {
        btn.onclick = () => selectOption(btn, opt, q.answer, q.explanation);
      }

      options.appendChild(btn);
    });

    // Si on avait deja repondu, on peut re-afficher le bouton suivant
    if (mode === 'examen' && previousAnswer != null && nextBtn) {
      nextBtn.style.display = 'inline-flex';
    }
  }


  /* ============ 9. REPONSE (rapide / infini) ============ */

  function selectOption(btn, selectedOpt, correctOpt, explanation) {
    const buttons = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedOpt === correctOpt;
    lastAnswerWasCorrect = isCorrect;

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
    const nextBtn = document.getElementById('next-btn');

    if (isCorrect) {
      score++;
      streak++;
      saveBestStreak(streak);
      feedback.className = 'feedback show success';
      stamp.innerText = 'Correct';
      text.innerHTML = `<strong>Bien joue.</strong>${explanation}`;
      if (nextBtn) {
        nextBtn.innerText =
          (mode === 'rapide' && currentIndex === currentQuestions.length - 1)
            ? 'Voir le resultat'
            : 'Question suivante \u2192';
      }
    } else {
      feedback.className = 'feedback show error';
      stamp.innerText = 'Erreur';
      text.innerHTML = `<strong>Rate.</strong>${explanation}`;
      if (nextBtn) {
        nextBtn.innerText =
          (mode === 'infini') ? 'Voir mon score' : 'Voir le resultat';
      }
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';

    if (mode === 'rapide') {
      updateProgress(((currentIndex + 1) / currentQuestions.length) * 100);
    } else {
      updateProgress(0);
    }

    const sideStreak = document.getElementById('side-streak');
    if (sideStreak) sideStreak.innerText = `\uD83D\uDD25 ${streak}`;
    const examenScore = document.getElementById('examen-score');
    if (examenScore) {
      examenScore.innerHTML = `Serie en cours : <strong>\uD83D\uDD25 ${streak}</strong>`;
    }
    const chipStreak = document.getElementById('chip-streak');
    if (chipStreak) chipStreak.textContent = streak;
    const chipScore = document.getElementById('chip-score');
    if (chipScore) chipScore.textContent = `${score} / ${currentIndex + 1}`;
  }


  /* ============ 10. REPONSE (examen) ============ */

  function selectExamOption(btn, selectedOpt) {
    // On peut changer d'avis tant qu'on n'a pas valide
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Stocke la reponse
    examAnswers[currentIndex] = selectedOpt;

    // Affiche le bouton suivant
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }


  /* ============ 11. MEILLEURE SERIE ============ */

  function saveBestStreak(current) {
    const best = parseInt(storage.get('vroum-best-streak', '0'), 10) || 0;
    if (current > best) storage.set('vroum-best-streak', String(current));
  }

  function getBestStreak() {
    return parseInt(storage.get('vroum-best-streak', '0'), 10) || 0;
  }


  /* ============ 12. QUESTION SUIVANTE ============ */

  function nextQuestion() {
    // Mode examen : pas de correction, on enchaine
    if (mode === 'examen') {
      currentIndex++;
      if (currentIndex < currentQuestions.length) {
        loadQuestion();
      } else {
        showResults();
      }
      return;
    }

    // Mode infini
    if (mode === 'infini') {
      if (!lastAnswerWasCorrect) { showResults(); return; }
      currentIndex++;
      currentQuestions.push(generateOneQuestion(lastCategory, seenQuestions));
      loadQuestion();
      return;
    }

    // Mode rapide
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }


  /* ============ 13. RESULTATS ============ */

  function showResults() {
    stopExamTimer();
    showOnly(resultBox);

    const title  = document.getElementById('result-title');
    const detail = document.getElementById('result-detail');
    const best = getBestStreak();

    if (mode === 'examen') {
      // Recalcul du score depuis examAnswers
      let correct = 0;
      currentQuestions.forEach((q, i) => {
        if (examAnswers[i] === q.answer) correct++;
      });
      const total = currentQuestions.length;
      title.innerText = `Score : ${correct} / ${total}`;

      if (correct >= EXAM_PASSING_SCORE) {
        detail.innerText = `Reussi ! Tu aurais eu ton examen (${EXAM_PASSING_SCORE}/${total} minimum).`;
      } else {
        const manque = EXAM_PASSING_SCORE - correct;
        detail.innerText = `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour reussir. Continue a reviser.`;
      }

    } else if (mode === 'rapide') {
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


  /* ============ 14. NAVIGATION ============ */

  function replay() {
    if (mode) startMode(mode);
  }

  function backToModeSelect() {
    stopExamTimer();
    showOnly(modeSelectBox);
  }


  /* ============ 15. NAVIGATION CLAVIER ============ */

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select')) return;

    // Echap : quitter
    if (e.key === 'Escape') {
      if (quizBox && quizBox.style.display !== 'none') {
        const enCours = streak > 0 || currentIndex > 0;
        if (enCours && !confirm('Quitter le quiz en cours ? Ta progression sera perdue.')) return;
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

    // Entree ou Espace : question suivante
    if (e.key === 'Enter' || e.key === ' ') {
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
        e.preventDefault();
        nextBtn.click();
      }
    }
  });


  /* ============ 16. INITIALISATION ============ */

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

/* =========================================================
   VroumVroum - App
   1. Stockage + thème clair / sombre
   2. Progression des fiches (fiches lues, sauvegardées)
   3. Accueil : anneau de progression, stats, parcours
   4. QCM : 3 modes
      - Rapide : 5 questions, correction immédiate
      - Examen : 40 questions, 30 min, correction à la fin
      - Infini : jusqu'à la première erreur
   5. Anti-répétition, bouton Rejouer, navigation clavier,
      meilleure série sauvegardée
   ========================================================= */

(function () {
  'use strict';

  /* ============ 1. STOCKAGE ============ */

  const storage = {
    get(key, fallback = null) {
      try { return localStorage.getItem(key) ?? fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
    }
  };

  /* ============ 2. THÈME ============ */

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


  /* ============ 3. PROGRESSION DES FICHES ============ */

  const LUES_KEY = 'vroum-fiches-lues';

  function getLues() {
    try {
      const arr = JSON.parse(storage.get(LUES_KEY, '[]'));
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveLues(set) {
    storage.set(LUES_KEY, JSON.stringify([...set]));
  }

  function isLue(id) {
    return getLues().has(id);
  }

  // Bascule l'état "terminée" d'une fiche. Renvoie le nouvel état.
  function toggleLue(id) {
    const set = getLues();
    const nowDone = !set.has(id);
    if (nowDone) set.add(id); else set.delete(id);
    saveLues(set);
    return nowDone;
  }

  // Compte les fiches terminées (en ignorant d'éventuels ids obsolètes)
  function countLues(fiches) {
    const set = getLues();
    return fiches.filter(f => set.has(f.id)).length;
  }

  function getBestStreak() {
    return parseInt(storage.get('vroum-best-streak', '0'), 10) || 0;
  }

  function saveBestStreak(current) {
    if (current > getBestStreak()) storage.set('vroum-best-streak', String(current));
  }

  // Partagé avec fiches.js
  window.VV = { isLue, toggleLue, countLues, getLues, getBestStreak };


  /* ============ 4. ACCUEIL ============ */

  const FAMILLE_ICONES = {
    L: '\uD83D\uDEA6', C: '\uD83E\uDDE0', R: '\uD83D\uDEE3\uFE0F', U: '\uD83D\uDEB8',
    D: '\uD83D\uDCC4', A: '\uD83D\uDE91', P: '\uD83D\uDEAA', M: '\uD83D\uDD27',
    S: '\uD83E\uDDBA', E: '\uD83C\uDF31'
  };

  function renderDashboard() {
    const grid = document.getElementById('modules-grid');
    if (!grid || typeof FICHES === 'undefined') return;

    const total = FICHES.length;
    const done = countLues(FICHES);
    const pct = total ? Math.round((done / total) * 100) : 0;

    // Anneau (circonférence = 2 * PI * 54)
    const CIRC = 339.292;
    const ring = document.getElementById('ring-fg');
    if (ring) {
      ring.style.strokeDasharray = String(CIRC);
      // léger délai pour déclencher la transition
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = String(CIRC * (1 - pct / 100));
      });
    }
    document.getElementById('dash-pct').textContent = pct + '%';

    const msg = document.getElementById('dash-msg');
    if (done === 0) {
      msg.textContent = 'Tu n\u2019as pas encore commenc\u00e9. Ouvre ta premi\u00e8re fiche !';
    } else if (done === total) {
      msg.textContent = 'Toutes les fiches sont termin\u00e9es. Passe \u00e0 l\u2019examen blanc !';
    } else {
      msg.textContent = `Tu es \u00e0 ${pct} % de progression. Continue comme \u00e7a !`;
    }

    document.getElementById('stat-fiches').textContent = `${done} / ${total}`;
    document.getElementById('stat-record').textContent = `Record ${getBestStreak()}`;

    // Parcours = familles de fiches, dans l'ordre des données
    const familles = new Map();
    FICHES.forEach(f => {
      if (!familles.has(f.badge)) familles.set(f.badge, { nom: f.groupe, fiches: [] });
      familles.get(f.badge).fiches.push(f);
    });

    grid.innerHTML = '';
    familles.forEach((fam, badge) => {
      const n = fam.fiches.length;
      const d = countLues(fam.fiches);
      const p = Math.round((d / n) * 100);
      const a = document.createElement('a');
      a.className = `module-card fam-${badge}`;
      a.href = `fiches.html#groupe-${badge}`;
      a.innerHTML = `
        <div class="module-head">
          <div class="module-icon">${FAMILLE_ICONES[badge] || '\uD83D\uDCDA'}</div>
          <div>
            <div class="module-title">${fam.nom}</div>
            <div class="module-meta">${n} fiche${n > 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="module-progress"><div class="module-progress-fill" style="width:${p}%"></div></div>
        <div class="module-footer"><span>${d} / ${n} termin\u00e9e${d > 1 ? 's' : ''}</span><span class="pct">${p}%</span></div>
      `;
      grid.appendChild(a);
    });
  }


  /* ============ 5. QCM : CONSTANTES ============ */

  const RAPIDE_COUNT = 5;
  const EXAM_COUNT = 40;
  const EXAM_DURATION = 30 * 60;         // 30 minutes en secondes
  const EXAM_PASSING_SCORE = 35;         // seuil de réussite ETG

  const MODE_LABELS = {
    rapide: 'Mode rapide',
    examen: 'Examen blanc',
    infini: 'Mode infini'
  };


  /* ============ 6. QCM : ÉTAT ============ */

  let mode = null;                       // "rapide" | "examen" | "infini"
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let lastCategory = null;
  let lastAnswerWasCorrect = false;
  let seenQuestions = new Set();
  let examAnswers = [];                  // réponses stockées pour l'examen
  let timerInterval = null;
  let timeRemaining = 0;

  // Refs DOM
  let modeSelectBox = null;
  let quizBox = null;
  let resultBox = null;


  /* ============ 7. QCM : AFFICHAGE ============ */

  function showOnly(el) {
    [modeSelectBox, quizBox, resultBox].forEach(b => {
      if (b) b.style.display = (b === el) ? 'block' : 'none';
    });
    window.scrollTo(0, 0);
  }

  function updateProgress(pct) {
    const fill = document.getElementById('progress-fill');
    if (!fill) return;
    fill.style.width = (mode === 'infini' ? Math.min(streak * 8, 100) : pct) + '%';
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateChips(answered) {
    setText('chip-streak', streak);
    setText('chip-score', `${score} / ${answered}`);
  }


  /* ============ 8. QCM : TIMER EXAMEN ============ */

  function formatTime(sec) {
    const m = Math.floor(Math.max(0, sec) / 60);
    const s = Math.max(0, sec) % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function startExamTimer() {
    stopExamTimer();
    timeRemaining = EXAM_DURATION;
    setText('timer-display', formatTime(timeRemaining));
    timerInterval = setInterval(() => {
      timeRemaining--;
      setText('timer-display', formatTime(timeRemaining));
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


  /* ============ 9. QCM : LANCEMENT ============ */

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

    setText('mode-label', MODE_LABELS[mode] || 'Mode');

    ['rapide', 'examen', 'infini'].forEach(m => {
      document.getElementById('qcm-mode-' + m)?.classList.toggle('active', mode === m);
    });

    const timerChip = document.getElementById('timer-chip');
    if (timerChip) timerChip.style.display = (mode === 'examen') ? '' : 'none';

    showOnly(quizBox);
    loadQuestion();
  }


  /* ============ 10. QCM : CHARGEMENT D'UNE QUESTION ============ */

  function loadQuestion() {
    const q = currentQuestions[currentIndex];
    lastCategory = q.category;

    const total = mode === 'infini' ? null : currentQuestions.length;
    const displayNum = String(currentIndex + 1).padStart(2, '0');

    setText('examen-cat', q.category);
    setText('examen-question', q.question);
    setText('qcm-counter-num', displayNum);
    setText('qcm-counter-total', total ? ' / ' + String(total).padStart(2, '0') : '');

    const hint = document.getElementById('qcm-hint');
    if (hint) {
      hint.innerHTML = (mode === 'examen')
        ? 'S\u00e9lectionne ta r\u00e9ponse puis passe \u00e0 la suite. <strong>Pas de correction avant la fin.</strong>'
        : 'Clique sur ta r\u00e9ponse, <strong>la correction est imm\u00e9diate.</strong>';
    }

    updateProgress(total ? (currentIndex / total) * 100 : 0);

    const answered = (mode === 'examen')
      ? examAnswers.filter(a => a != null).length
      : currentIndex;
    updateChips(answered);

    const options = document.getElementById('options');
    options.innerHTML = '';

    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';

    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'none';
    nextBtn.textContent = (mode === 'examen')
      ? (currentIndex === currentQuestions.length - 1 ? 'Terminer l\u2019examen' : 'Question suivante \u2192')
      : 'Valider';

    // Examen : restaure la réponse précédente si on revient sur la question
    const previousAnswer = (mode === 'examen') ? examAnswers[currentIndex] : null;

    q.shuffledOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.dataset.value = opt;

      const letter = document.createElement('span');
      letter.className = 'option-letter';
      letter.textContent = String(i + 1);
      btn.appendChild(letter);
      btn.appendChild(document.createTextNode(opt));

      if (mode === 'examen') {
        if (previousAnswer === opt) btn.classList.add('selected');
        btn.onclick = () => selectExamOption(btn, opt);
      } else {
        btn.onclick = () => selectOption(btn, opt, q.answer, q.explanation);
      }
      options.appendChild(btn);
    });

    if (mode === 'examen' && previousAnswer != null) {
      nextBtn.style.display = 'inline-flex';
    }
  }


  /* ============ 11. QCM : RÉPONSE (rapide / infini) ============ */

  function selectOption(btn, selectedOpt, correctOpt, explanation) {
    const buttons = document.querySelectorAll('#options .option');
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedOpt === correctOpt;
    lastAnswerWasCorrect = isCorrect;

    buttons.forEach(b => {
      b.disabled = true;
      const letter = b.querySelector('.option-letter');
      if (b.dataset.value === correctOpt) {
        b.classList.add('correct');
        letter.textContent = '\u2713';
      } else if (b === btn) {
        b.classList.add('wrong');
        letter.textContent = '\u2717';
      }
    });

    const stamp = document.getElementById('feedback-stamp');
    const text = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-btn');

    if (isCorrect) {
      score++;
      streak++;
      saveBestStreak(streak);
      feedback.className = 'feedback show success';
      stamp.textContent = 'Correct';
      text.innerHTML = `<strong>Bien jou\u00e9.</strong>${explanation}`;
      nextBtn.textContent =
        (mode === 'rapide' && currentIndex === currentQuestions.length - 1)
          ? 'Voir le r\u00e9sultat'
          : 'Question suivante \u2192';
    } else {
      feedback.className = 'feedback show error';
      stamp.textContent = 'Erreur';
      text.innerHTML = `<strong>Rat\u00e9.</strong>${explanation}`;
      nextBtn.textContent = (mode === 'infini') ? 'Voir mon score' : 'Voir le r\u00e9sultat';
    }

    nextBtn.style.display = 'inline-flex';

    updateProgress(mode === 'rapide' ? ((currentIndex + 1) / currentQuestions.length) * 100 : 0);
    updateChips(currentIndex + 1);
  }


  /* ============ 12. QCM : RÉPONSE (examen) ============ */

  function selectExamOption(btn, selectedOpt) {
    // On peut changer d'avis tant qu'on n'a pas passé la question
    document.querySelectorAll('#options .option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    examAnswers[currentIndex] = selectedOpt;
    document.getElementById('next-btn').style.display = 'inline-flex';
  }


  /* ============ 13. QCM : QUESTION SUIVANTE ============ */

  function nextQuestion() {
    // Examen : pas de correction, on enchaîne
    if (mode === 'examen') {
      currentIndex++;
      if (currentIndex < currentQuestions.length) loadQuestion();
      else showResults();
      return;
    }

    // Infini : on s'arrête à la première erreur
    if (mode === 'infini') {
      if (!lastAnswerWasCorrect) { showResults(); return; }
      currentIndex++;
      currentQuestions.push(generateOneQuestion(lastCategory, seenQuestions));
      loadQuestion();
      return;
    }

    // Rapide
    currentIndex++;
    if (currentIndex < currentQuestions.length) loadQuestion();
    else showResults();
  }


  /* ============ 14. QCM : RÉSULTATS ============ */

  function showResults() {
    stopExamTimer();
    showOnly(resultBox);

    const title = document.getElementById('result-title');
    const detail = document.getElementById('result-detail');
    const best = getBestStreak();

    if (mode === 'examen') {
      let correct = 0;
      currentQuestions.forEach((q, i) => {
        if (examAnswers[i] === q.answer) correct++;
      });
      const total = currentQuestions.length;
      title.textContent = `Score : ${correct} / ${total}`;

      if (correct >= EXAM_PASSING_SCORE) {
        detail.textContent = `R\u00e9ussi ! Tu aurais eu ton examen (${EXAM_PASSING_SCORE}/${total} minimum).`;
      } else {
        const manque = EXAM_PASSING_SCORE - correct;
        detail.textContent = `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour r\u00e9ussir. Continue \u00e0 r\u00e9viser.`;
      }

    } else if (mode === 'rapide') {
      const total = currentQuestions.length;
      title.textContent = `Score final : ${score} / ${total}`;
      const ratio = score / total;
      detail.textContent =
        ratio === 1  ? 'Sans faute, bravo !' :
        ratio >= 0.6 ? 'Bonne base, continue \u00e0 r\u00e9viser.' :
                       'Reprends les fiches avant de retenter.';

    } else {
      title.textContent = `S\u00e9rie termin\u00e9e \u00e0 ${streak} bonne${streak > 1 ? 's' : ''} r\u00e9ponse${streak > 1 ? 's' : ''}`;
      let msg =
        streak >= 10 ? 'Solide, tu ma\u00eetrises bien le programme.' :
        streak >= 5  ? 'Pas mal, continue \u00e0 r\u00e9viser les th\u00e8mes qui te bloquent.' :
                       'Retourne voir les fiches de cours avant de retenter.';

      if (streak > 0 && streak >= best && streak > 2) {
        msg += ` Nouveau record : ${streak} bonnes r\u00e9ponses d\u2019affil\u00e9e !`;
      } else if (best > 0) {
        msg += ` Ton record : ${best}.`;
      }
      detail.textContent = msg;
    }
  }


  /* ============ 15. QCM : NAVIGATION ============ */

  function replay() {
    if (mode) startMode(mode);
  }

  function backToModeSelect() {
    stopExamTimer();
    showOnly(modeSelectBox);
  }


  /* ============ 16. QCM : CLAVIER ============ */

  document.addEventListener('keydown', (e) => {
    if (!quizBox && !resultBox) return;           // pas sur la page QCM
    if (e.target.matches('input, textarea, select')) return;

    // Échap : quitter
    if (e.key === 'Escape') {
      if (quizBox && quizBox.style.display !== 'none') {
        const enCours = streak > 0 || currentIndex > 0;
        if (enCours && !confirm('Quitter le quiz en cours ? Ta progression sera perdue.')) return;
        backToModeSelect();
      }
      return;
    }

    // Touches 1 à 4 : sélection d'une option
    if (/^[1-4]$/.test(e.key)) {
      if (!quizBox || quizBox.style.display === 'none') return;
      const btn = document.querySelectorAll('#options .option')[parseInt(e.key, 10) - 1];
      if (btn && !btn.disabled) btn.click();
      return;
    }

    // Entrée ou Espace : question suivante
    if (e.key === 'Enter' || e.key === ' ') {
      const nextBtn = document.getElementById('next-btn');
      if (quizBox && quizBox.style.display !== 'none' &&
          nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
        e.preventDefault();
        nextBtn.click();
      }
    }
  });


  /* ============ 17. INITIALISATION ============ */

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
    renderDashboard();
  });

})();

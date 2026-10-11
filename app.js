/* =========================================================
   VroumVroum - App
   1. Stockage + thème clair / sombre
   2. Progression des fiches (fiches lues, sauvegardées)
   3. Accueil : anneau de progression, stats, parcours
   4. QCM : 3 modes
      - Rapide : 5 questions, correction immédiate
      - Examen : 40 questions, 30 min, correction à la fin avec récap
      - Infini : jusqu'à la première erreur
   5. Anti-répétition, bouton Rejouer, navigation clavier,
      meilleure série / meilleur score sauvegardés
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
    },
    del(key) {
      try { localStorage.removeItem(key); } catch (e) {}
    }
  };


  /* ============ 2. THÈME ============ */

  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
      btn.setAttribute('aria-label', isDark ? 'Passer en thème clair' : 'Passer en thème sombre');
    });
  }

  function toggleTheme() {
    const isDark = !document.documentElement.classList.contains('dark');
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

  function toggleLue(id) {
    const set = getLues();
    const nowDone = !set.has(id);
    if (nowDone) set.add(id); else set.delete(id);
    saveLues(set);
    return nowDone;
  }

  function countLues(fiches) {
    const set = getLues();
    return fiches.filter(f => set.has(f.id)).length;
  }


  /* ============ 4. RECORDS PAR MODE ============ */

  const RECORD_KEYS = {
    infini: 'vroum-best-infini',
    rapide: 'vroum-best-rapide',
    examen: 'vroum-best-examen'
  };

  // Migration : l'ancien record unique (série) passe sur le mode infini
  (function migrerAncienRecord() {
    const old = storage.get('vroum-best-streak');
    if (old !== null && storage.get(RECORD_KEYS.infini) === null) {
      storage.set(RECORD_KEYS.infini, old);
    }
  })();

  function getBest(m) {
    return parseInt(storage.get(RECORD_KEYS[m], '0'), 10) || 0;
  }

  function saveBest(m, value) {
    if (value > getBest(m)) storage.set(RECORD_KEYS[m], String(value));
  }

  // Partagé avec fiches.js
  window.VV = { isLue, toggleLue, countLues, getLues, getBest };


  /* ============ 5. CONSTANTES QCM ============ */

  const RAPIDE_COUNT = 5;
  const EXAM_COUNT = 40;
  const EXAM_DURATION = 30 * 60;         // 30 minutes
  const EXAM_PASSING_SCORE = 35;         // seuil de réussite ETG

  const MODE_LABELS = {
    rapide: 'Mode rapide',
    examen: 'Examen blanc',
    infini: 'Mode infini'
  };


  /* ============ 6. ACCUEIL ============ */

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
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = String(CIRC * (1 - pct / 100));
      });
    }
    setText('dash-pct', pct + '%');

    const msg = document.getElementById('dash-msg');
    if (msg) {
      if (done === 0) {
        msg.textContent = 'Tu n\u2019as pas encore commenc\u00e9. Ouvre ta premi\u00e8re fiche !';
      } else if (done === total) {
        msg.textContent = 'Toutes les fiches sont termin\u00e9es. Passe \u00e0 l\u2019examen blanc !';
      } else {
        msg.textContent = `Tu es \u00e0 ${pct} % de progression. Continue comme \u00e7a !`;
      }
    }

    setText('stat-fiches', `${done} / ${total}`);
    const rInf = getBest('infini'), rExa = getBest('examen'), rRap = getBest('rapide');
    setText('stat-infini', rInf);
    setText('stat-examen', rExa ? `${rExa} / ${EXAM_COUNT}` : '\u2014');
    setText('stat-rapide', rRap ? `${rRap} / ${RAPIDE_COUNT}` : '\u2014');

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


  /* ============ 7. QCM : ÉTAT ============ */

  let mode = null;
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
  let infiniBestAtStart = 0;

  // Refs DOM
  let modeSelectBox = null;
  let quizBox = null;
  let resultBox = null;


  /* ============ 8. QCM : UTILITAIRES ============ */

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

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

  function updateChips(answered) {
    setText('chip-streak', streak);
    setText('chip-score', `${score} / ${answered}`);
  }


  /* ============ 9. QCM : TIMER ============ */

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


  /* ============ 10. QCM : LANCEMENT ============ */

  function startMode(chosenMode) {
    if (typeof generateQuestionSet !== 'function') return;
    if (!['rapide', 'examen', 'infini'].includes(chosenMode)) return;

    mode = chosenMode;
    score = 0;
    streak = 0;
    currentIndex = 0;
    lastCategory = null;
    lastAnswerWasCorrect = false;
    seenQuestions = new Set();
    examAnswers = [];
    infiniBestAtStart = getBest('infini');
    stopExamTimer();

    if (mode === 'rapide') {
      currentQuestions = generateQuestionSet(RAPIDE_COUNT, seenQuestions);
    } else if (mode === 'examen') {
      currentQuestions = generateQuestionSet(EXAM_COUNT, seenQuestions);
      startExamTimer();
    } else {
      currentQuestions = [generateOneQuestion(null, seenQuestions)];
    }

    setText('mode-label', MODE_LABELS[mode]);

    ['rapide', 'examen', 'infini'].forEach(m => {
      document.getElementById('qcm-mode-' + m)?.classList.toggle('active', mode === m);
    });

    const timerChip = document.getElementById('timer-chip');
    if (timerChip) timerChip.style.display = (mode === 'examen') ? '' : 'none';

    showOnly(quizBox);
    loadQuestion();
  }


  /* ============ 11. QCM : CHARGEMENT D'UNE QUESTION ============ */

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

    // Examen : restaure la réponse précédente
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


  /* ============ 12. QCM : RÉPONSE (rapide / infini) ============ */

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
      if (mode === 'infini') saveBest('infini', streak);
      feedback.className = 'feedback show success';
      stamp.textContent = 'Correct';
      text.innerHTML = `<strong>Bien jou\u00e9.</strong>${explanation}`;
    } else {
      feedback.className = 'feedback show error';
      stamp.textContent = 'Erreur';
      text.innerHTML = `<strong>Rat\u00e9.</strong>${explanation}`;
    }

    // Libellé du bouton suivant — CORRIGÉ
    const isLast = (currentIndex === currentQuestions.length - 1);
    if (mode === 'infini' && !isCorrect) {
      nextBtn.textContent = 'Voir mon score';
    } else if (mode === 'rapide' && isLast) {
      nextBtn.textContent = 'Voir le r\u00e9sultat';
    } else {
      nextBtn.textContent = 'Question suivante \u2192';
    }

    nextBtn.style.display = 'inline-flex';

    updateProgress(mode === 'rapide' ? ((currentIndex + 1) / currentQuestions.length) * 100 : 0);
    updateChips(currentIndex + 1);
  }


  /* ============ 13. QCM : RÉPONSE (examen) ============ */

  function selectExamOption(btn, selectedOpt) {
    // On peut changer d'avis tant qu'on n'a pas passé la question
    document.querySelectorAll('#options .option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    examAnswers[currentIndex] = selectedOpt;
    document.getElementById('next-btn').style.display = 'inline-flex';
  }


  /* ============ 14. QCM : QUESTION SUIVANTE ============ */

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


  /* ============ 15. QCM : RÉSULTATS ============ */

  function showResults() {
    stopExamTimer();
    showOnly(resultBox);

    const title = document.getElementById('result-title');
    const detail = document.getElementById('result-detail');

    // Nettoyer l'ancien récap s'il existe
    const oldRecap = document.getElementById('exam-recap');
    if (oldRecap) oldRecap.remove();

    if (mode === 'examen') {
      let correct = 0;
      const wrongs = [];
      currentQuestions.forEach((q, i) => {
        const userAns = examAnswers[i];
        if (userAns === q.answer) {
          correct++;
        } else {
          wrongs.push({
            question: q.question,
            userAnswer: userAns || null,
            correctAnswer: q.answer,
            explanation: q.explanation
          });
        }
      });
      const total = currentQuestions.length;
      const prev = getBest('examen');
      saveBest('examen', correct);
      title.textContent = `Score : ${correct} / ${total}`;

      let msg;
      if (correct >= EXAM_PASSING_SCORE) {
        msg = `R\u00e9ussi ! Tu aurais eu ton examen (${EXAM_PASSING_SCORE}/${total} minimum).`;
      } else {
        const manque = EXAM_PASSING_SCORE - correct;
        msg = `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour r\u00e9ussir. Continue \u00e0 r\u00e9viser.`;
      }
      if (correct > prev && correct > 0) msg += ' Nouveau meilleur score !';
      else if (prev > 0) msg += ` Ton meilleur : ${prev} / ${total}.`;
      detail.textContent = msg;

      if (wrongs.length > 0) renderExamRecap(wrongs);

    } else if (mode === 'rapide') {
      const total = currentQuestions.length;
      const prev = getBest('rapide');
      saveBest('rapide', score);
      title.textContent = `Score final : ${score} / ${total}`;
      const ratio = score / total;
      let msg =
        ratio === 1  ? 'Sans faute, bravo !' :
        ratio >= 0.6 ? 'Bonne base, continue \u00e0 r\u00e9viser.' :
                       'Reprends les fiches avant de retenter.';
      if (score > prev && score > 0) msg += ' Nouveau meilleur score !';
      else if (prev > 0) msg += ` Ton meilleur : ${prev} / ${total}.`;
      detail.textContent = msg;

    } else {
      const best = getBest('infini');
      title.textContent = `S\u00e9rie termin\u00e9e \u00e0 ${streak} bonne${streak > 1 ? 's' : ''} r\u00e9ponse${streak > 1 ? 's' : ''}`;
      let msg =
        streak >= 10 ? 'Solide, tu ma\u00eetrises bien le programme.' :
        streak >= 5  ? 'Pas mal, continue \u00e0 r\u00e9viser les th\u00e8mes qui te bloquent.' :
                       'Retourne voir les fiches de cours avant de retenter.';
      if (streak > 0 && streak > infiniBestAtStart) {
        msg += ` Nouveau record : ${streak} bonnes r\u00e9ponses d\u2019affil\u00e9e !`;
      } else if (best > 0) {
        msg += ` Ton record : ${best}.`;
      }
      detail.textContent = msg;
    }
  }


  /* ============ 16. QCM : RÉCAP DES ERREURS (examen) ============ */

  function renderExamRecap(wrongs) {
    const detail = document.getElementById('result-detail');
    if (!detail) return;

    const recap = document.createElement('div');
    recap.id = 'exam-recap';
    recap.className = 'exam-recap';

    const header = document.createElement('div');
    header.className = 'exam-recap-header';
    header.innerHTML = `<span class="exam-recap-title">Tes erreurs</span>
                        <span class="exam-recap-count">${wrongs.length} question${wrongs.length > 1 ? 's' : ''} \u00e0 revoir</span>`;
    recap.appendChild(header);

    const list = document.createElement('div');
    list.className = 'exam-recap-list';

    wrongs.forEach((w, idx) => {
      const item = document.createElement('div');
      item.className = 'exam-recap-item';

      const num = document.createElement('div');
      num.className = 'exam-recap-num';
      num.textContent = String(idx + 1).padStart(2, '0');

      const body = document.createElement('div');
      body.className = 'exam-recap-body';

      const qEl = document.createElement('div');
      qEl.className = 'exam-recap-question';
      qEl.textContent = w.question;

      const answers = document.createElement('div');
      answers.className = 'exam-recap-answers';

      const userLine = document.createElement('div');
      userLine.className = 'exam-recap-answer wrong';
      userLine.innerHTML = w.userAnswer
        ? `<span class="exam-recap-tag">Ton choix</span>${w.userAnswer}`
        : `<span class="exam-recap-tag">Ton choix</span><em>Non r\u00e9pondu</em>`;
      answers.appendChild(userLine);

      const correctLine = document.createElement('div');
      correctLine.className = 'exam-recap-answer correct';
      correctLine.innerHTML = `<span class="exam-recap-tag">Bonne r\u00e9ponse</span>${w.correctAnswer}`;
      answers.appendChild(correctLine);

      body.appendChild(qEl);
      body.appendChild(answers);

      if (w.explanation) {
        const exp = document.createElement('div');
        exp.className = 'exam-recap-explanation';
        exp.textContent = w.explanation;
        body.appendChild(exp);
      }

      item.appendChild(num);
      item.appendChild(body);
      list.appendChild(item);
    });

    recap.appendChild(list);
    detail.parentNode.insertBefore(recap, detail.nextSibling);
  }


  /* ============ 17. QCM : NAVIGATION ============ */

  function replay() {
    if (mode) startMode(mode);
  }

  function backToModeSelect() {
    stopExamTimer();
    showOnly(modeSelectBox);
  }


  /* ============ 18. QCM : CLAVIER ============ */

  document.addEventListener('keydown', (e) => {
    if (!quizBox && !resultBox) return;
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


  /* ============ 19. INITIALISATION ============ */

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

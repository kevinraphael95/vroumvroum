/* =========================================================
   VroumVroum - App
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

  window.VV = { isLue, toggleLue, countLues, getLues, getBest };


  /* ============ 5. CONSTANTES QCM ============ */

  const RAPIDE_COUNT = 5;
  const EXAM_COUNT = 40;
  const EXAM_DURATION = 30 * 60;
  const EXAM_PASSING_SCORE = 35;

  const MODE_LABELS = {
    rapide: 'Mode rapide',
    examen: 'Examen blanc',
    infini: 'Mode infini'
  };

  const CAT_TO_FAM = {
    "Signalisation": "L", "Signalisation temporaire": "L", "Marquage au sol": "L",
    "Priorités": "L", "Circuler": "L", "Vitesses": "L",
    "Conséquences vitesse": "L", "Dépassement": "L", "Stationnement": "L",
    "Conducteur": "C", "Communication": "C", "Alcool & stupéfiants": "C",
    "Conduite difficile": "R", "Autoroute": "R", "Zones dangereuses": "R",
    "Autres usagers": "U",
    "Documents": "D", "Assurance": "D", "Chargement": "D",
    "Permis à points": "D", "Infractions": "D",
    "Premiers secours": "A",
    "Prendre & quitter": "P",
    "Mécanique": "M", "Voyants": "M", "Éclairage": "M", "Équipements": "M",
    "Sécurité passager": "S", "Sécurité": "S",
    "Écomobilité": "E", "Choisir son véhicule": "E", "Écoconduite": "E"
  };

  const FAM_NAMES = {
    L: "La circulation routière",
    C: "Le conducteur",
    R: "La route",
    U: "Les autres usagers",
    D: "Les notions diverses",
    A: "Les premiers secours",
    P: "Prendre et quitter son véhicule",
    M: "La mécanique et les équipements",
    S: "La sécurité du passager et du véhicule",
    E: "L'environnement"
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
  let examAnswers = [];
  let timerInterval = null;
  let timeRemaining = 0;
  let infiniBestAtStart = 0;
  let examResultsCache = [];

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

    // Confirmation si un quiz est en cours (boutons de mode dans le quiz)
    const enCours = quizBox && quizBox.style.display !== 'none' &&
      (currentIndex > 0 || streak > 0 || examAnswers.some(a => a != null));
    if (enCours && !confirm('Changer de mode ? Ta progression en cours sera perdue.')) return;

    mode = chosenMode;
    score = 0;
    streak = 0;
    currentIndex = 0;
    lastCategory = null;
    lastAnswerWasCorrect = false;
    seenQuestions = new Set();
    examAnswers = [];
    examResultsCache = [];
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

    // En examen, pas de correction : on masque la série et le score
    document.querySelectorAll('.qcm-chip.streak, .qcm-chip.score').forEach(el => {
      el.style.display = (mode === 'examen') ? 'none' : '';
    });

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
    document.querySelectorAll('#options .option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    examAnswers[currentIndex] = selectedOpt;
    document.getElementById('next-btn').style.display = 'inline-flex';
  }


  /* ============ 14. QCM : QUESTION SUIVANTE ============ */

  function nextQuestion() {
    if (mode === 'examen') {
      currentIndex++;
      if (currentIndex < currentQuestions.length) loadQuestion();
      else showResults();
      return;
    }

    if (mode === 'infini') {
      if (!lastAnswerWasCorrect) { showResults(); return; }
      currentIndex++;
      currentQuestions.push(generateOneQuestion(lastCategory, seenQuestions));
      loadQuestion();
      return;
    }

    currentIndex++;
    if (currentIndex < currentQuestions.length) loadQuestion();
    else showResults();
  }


  /* ============ 15. QCM : RÉSULTATS ============ */

  function showResults() {
    stopExamTimer();
    showOnly(resultBox);

    if (mode === 'examen') {
      showExamResults();
    } else {
      showSimpleResults();
    }
  }


  /* ---- Résultat simple (rapide / infini) ---- */

  function showSimpleResults() {
    let title, detail;

    if (mode === 'rapide') {
      const total = currentQuestions.length;
      const prev = getBest('rapide');
      saveBest('rapide', score);
      title = `Score final : ${score} / ${total}`;
      const ratio = score / total;
      let msg =
        ratio === 1  ? 'Sans faute, bravo !' :
        ratio >= 0.6 ? 'Bonne base, continue \u00e0 r\u00e9viser.' :
                       'Reprends les fiches avant de retenter.';
      if (score > prev && score > 0) msg += ' Nouveau meilleur score !';
      else if (prev > 0) msg += ` Ton meilleur : ${prev} / ${total}.`;
      detail = msg;
    } else {
      const best = getBest('infini');
      title = `S\u00e9rie termin\u00e9e \u00e0 ${streak} bonne${streak > 1 ? 's' : ''} r\u00e9ponse${streak > 1 ? 's' : ''}`;
      let msg =
        streak >= 10 ? 'Solide, tu ma\u00eetrises bien le programme.' :
        streak >= 5  ? 'Pas mal, continue \u00e0 r\u00e9viser les th\u00e8mes qui te bloquent.' :
                       'Retourne voir les fiches de cours avant de retenter.';
      if (streak > 0 && streak > infiniBestAtStart) {
        msg += ` Nouveau record : ${streak} bonnes r\u00e9ponses d\u2019affil\u00e9e !`;
      } else if (best > 0) {
        msg += ` Ton record : ${best}.`;
      }
      detail = msg;
    }

    resultBox.className = 'result';
    resultBox.innerHTML = `
      <h2>${title}</h2>
      <p>${detail}</p>
      <div class="result-actions">
        <button class="btn btn-primary" onclick="replay()">Rejouer \u2192</button>
        <button class="btn btn-outline" onclick="backToModeSelect()">Changer de mode</button>
      </div>
    `;
  }


  /* ---- Résultat examen (style Codes Rousseau) ---- */

  function showExamResults() {
    let correct = 0;
    const results = [];
    const themeStats = {};

    currentQuestions.forEach((q, i) => {
      const userAns = examAnswers[i];
      const isCorrect = userAns === q.answer;
      if (isCorrect) correct++;

      const fam = CAT_TO_FAM[q.category] || 'L';
      results.push({ q, userAns, isCorrect, fam });

      if (!themeStats[fam]) themeStats[fam] = { correct: 0, total: 0 };
      themeStats[fam].total++;
      if (isCorrect) themeStats[fam].correct++;
    });

    examResultsCache = results;

    const total = currentQuestions.length;
    const prev = getBest('examen');
    saveBest('examen', correct);
    const reussi = correct >= EXAM_PASSING_SCORE;
    const manque = EXAM_PASSING_SCORE - correct;

    let message;
    if (reussi) {
      message = `R\u00e9ussi ! Tu aurais eu ton examen (${EXAM_PASSING_SCORE}/${total} minimum).`;
    } else {
      message = `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour r\u00e9ussir. Continue \u00e0 r\u00e9viser.`;
    }
    if (correct > prev && correct > 0) message += ' Nouveau meilleur score !';
    else if (prev > 0) message += ` Ton meilleur : ${prev} / ${total}.`;

    // Grille des numéros cliquables
    const gridHTML = results.map((r, i) => {
      const num = String(i + 1).padStart(2, '0');
      const cls = r.userAns == null ? 'unanswered' : (r.isCorrect ? 'correct' : 'wrong');
      return `<span class="exam-num ${cls}" data-index="${i}">${num}</span>`;
    }).join('');

    // Thèmes (dans l'ordre officiel L, C, R, U, D, A, P, M, S, E)
    const ORDRE = ['L', 'C', 'R', 'U', 'D', 'A', 'P', 'M', 'S', 'E'];
    const themesHTML = ORDRE
      .filter(fam => themeStats[fam])
      .map(fam => {
        const s = themeStats[fam];
        return `
          <div class="exam-theme fam-${fam}">
            <span class="exam-theme-badge">${fam}</span>
            <span class="exam-theme-name">${FAM_NAMES[fam]}</span>
            <span class="exam-theme-score">${s.correct}/${s.total}</span>
          </div>
        `;
      }).join('');

    resultBox.className = 'result result-wide';
    resultBox.innerHTML = `
      <div class="exam-result-head">
        <div class="exam-result-head-text">
          <h2>Examen blanc termin\u00e9</h2>
          <p>${message}</p>
        </div>
        <div class="exam-result-score ${reussi ? 'pass' : 'fail'}">
          <span class="exam-result-score-value">${correct}</span>
          <span class="exam-result-score-sep">/</span>
          <span class="exam-result-score-total">${total}</span>
        </div>
      </div>

      <div class="exam-result-body">
        <div class="exam-result-col">
          <div class="exam-result-label">R\u00e9ponses</div>
          <div class="exam-numbers">${gridHTML}</div>
        </div>

        <div class="exam-result-col exam-result-center">
          <div class="exam-result-label">D\u00e9tail de la question</div>
          <div class="exam-detail" id="exam-detail"></div>
        </div>

        <div class="exam-result-col exam-result-themes">
          <div class="exam-result-label">R\u00e9sultats par th\u00e8me</div>
          <div class="exam-themes-list">${themesHTML}</div>
        </div>
      </div>

      <div class="result-actions">
        <button class="btn btn-primary" onclick="replay()">Rejouer \u2192</button>
        <button class="btn btn-outline" onclick="backToModeSelect()">Changer de mode</button>
      </div>
    `;

    // Affiche par défaut la première question ratée (ou la 1ʳᵉ si tout est bon)
    const firstWrong = results.findIndex(r => !r.isCorrect);
    renderExamDetail(firstWrong >= 0 ? firstWrong : 0);
  }


  /* ---- Détail d'une question (affiché au centre) ---- */

  function renderExamDetail(index) {
    const detail = document.getElementById('exam-detail');
    if (!detail || !examResultsCache[index]) return;

    const r = examResultsCache[index];
    const num = String(index + 1).padStart(2, '0');
    const isCorrect = r.isCorrect;
    const userAns = r.userAns;

    // Surligne le numéro sélectionné dans la grille
    document.querySelectorAll('.exam-num').forEach((el, i) => {
      el.classList.toggle('selected', i === index);
    });

    detail.innerHTML = `
      <div class="exam-detail-head">
        <span class="exam-detail-num">Question ${num}</span>
        <span class="exam-detail-status ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '\u2713 Correct' : '\u2717 Erreur'}
        </span>
      </div>
      <div class="exam-detail-q">${r.q.question}</div>
      <div class="exam-detail-choices">
        <div class="exam-detail-choice ${isCorrect ? 'correct' : 'wrong'}">
          <span class="exam-detail-tag">Ton choix</span>
          <span>${userAns || '<em>Non r\u00e9pondu</em>'}</span>
        </div>
        ${!isCorrect ? `
          <div class="exam-detail-choice correct">
            <span class="exam-detail-tag">Bonne r\u00e9ponse</span>
            <span>${r.q.answer}</span>
          </div>
        ` : ''}
      </div>
      ${r.q.explanation ? `<div class="exam-detail-exp">${r.q.explanation}</div>` : ''}
    `;
  }


  /* ============ 16. QCM : NAVIGATION ============ */

  function replay() {
    if (mode) startMode(mode);
  }

  function backToModeSelect() {
    stopExamTimer();
    showOnly(modeSelectBox);
  }


  /* ============ 17. QCM : CLAVIER ============ */

  document.addEventListener('keydown', (e) => {
    if (!quizBox && !resultBox) return;
    if (e.target.matches('input, textarea, select')) return;

    if (e.key === 'Escape') {
      if (quizBox && quizBox.style.display !== 'none') {
        const enCours = streak > 0 || currentIndex > 0;
        if (enCours && !confirm('Quitter le quiz en cours ? Ta progression sera perdue.')) return;
        backToModeSelect();
      }
      return;
    }

    if (/^[1-4]$/.test(e.key)) {
      if (!quizBox || quizBox.style.display === 'none') return;
      const btn = document.querySelectorAll('#options .option')[parseInt(e.key, 10) - 1];
      if (btn && !btn.disabled) btn.click();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      const nextBtn = document.getElementById('next-btn');
      if (quizBox && quizBox.style.display !== 'none' &&
          nextBtn && nextBtn.style.display !== 'none' && !nextBtn.disabled) {
        e.preventDefault();
        nextBtn.click();
      }
    }
  });


  /* ============ 18. CLIC SUR UN NUMÉRO DE LA GRILLE ============ */

  document.addEventListener('click', (e) => {
    const num = e.target.closest('.exam-num');
    if (!num) return;
    const index = parseInt(num.dataset.index, 10);
    if (!isNaN(index)) renderExamDetail(index);
  });


  /* ============ 19. INITIALISATION ============ */

  window.toggleTheme = toggleTheme;
  window.startMode = startMode;
  window.nextQuestion = nextQuestion;
  window.replay = replay;
  window.backToModeSelect = backToModeSelect;


  /* ============ 20. MENU BURGER ============ */

  function toggleMenu() {
    const burger = document.getElementById('nav-burger');
    const links = document.getElementById('nav-links');
    if (!burger || !links) return;

    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  function closeMenu() {
    const burger = document.getElementById('nav-burger');
    const links = document.getElementById('nav-links');
    if (!burger || !links) return;

    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  // Fermer au clic sur un lien
  document.addEventListener('click', (e) => {
    if (e.target.closest('#nav-links a')) closeMenu();
  });

  // Fermer au clic en dehors de la navbar
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-inner');
    if (nav && !nav.contains(e.target)) closeMenu();
  });

  // Fermer avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.toggleMenu = toggleMenu;


  /* ============ 21. DOM READY ============ */

  document.addEventListener('DOMContentLoaded', () => {
    modeSelectBox = document.getElementById('mode-select');
    quizBox       = document.getElementById('quiz');
    resultBox     = document.getElementById('result');
    if (modeSelectBox) showOnly(modeSelectBox);
    renderDashboard();
  });

})();

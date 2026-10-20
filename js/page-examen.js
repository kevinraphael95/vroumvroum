/* =========================================================
   EXAMEN BLANC (examen.html)
   - Questions de EXAMEN_QUESTIONS (data-examen.js), 2 types :
        "choix" (A B C D, une ou plusieurs bonnes réponses)
        "oui-non" (1 ou 2 affirmations ; OUI = A/C, NON = B/D)
   - Minuteur rond PAR QUESTION, passage automatique à la suivante
   - Pas de retour en arrière ; correction détaillée à la fin
   - Meilleur score : localStorage "vroum-examen-best"
   Dépend de : core.js (thème, menu) et data-examen.js
   ========================================================= */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const BEST_KEY = 'vroum-examen-best';
  const LETTERS = ['A', 'B', 'C', 'D'];
  const RING_R = 30;
  const RING_C = 2 * Math.PI * RING_R;

  const secIntro  = $('ex-intro');
  const secQuiz   = $('ex-quiz');
  const secResult = $('ex-result');
  if (!secIntro || !secQuiz || !secResult) return;

  /* ---------- Utilitaires ---------- */

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
  }
  function sameSet(a, b) {
    if (a.size !== b.size) return false;
    for (const x of a) if (!b.has(x)) return false;
    return true;
  }

  function getBest() {
    try {
      const b = JSON.parse(localStorage.getItem(BEST_KEY));
      return (b && typeof b.score === 'number' && b.total > 0) ? b : null;
    } catch (e) { return null; }
  }
  function saveBest(score, total) {
    const prev = getBest();
    if (prev && prev.score / prev.total >= score / total) return false;
    try { localStorage.setItem(BEST_KEY, JSON.stringify({ score, total })); } catch (e) {}
    return true;
  }

  /* Hauteur de la barre de navigation : l'écran d'examen se place juste dessous */
  function syncNav() {
    const nav = document.querySelector('nav');
    document.documentElement.style.setProperty('--nav-h', (nav ? nav.offsetHeight : 0) + 'px');
  }
  window.addEventListener('resize', syncNav);

  function showOnly(target) {
    [secIntro, secQuiz, secResult].forEach(s => { s.hidden = (s !== target); });
    document.body.classList.toggle('ex-immersive', target === secQuiz);
    syncNav();
    window.scrollTo(0, 0);
  }

  /* ---------- Données ---------- */

  const CFG = Object.assign({ nbQuestions: 40, dureeQuestionSec: 30, seuil: 35 },
    (typeof EXAMEN_CONFIG !== 'undefined') ? EXAMEN_CONFIG : {});

  function questionValide(q) {
    if (!q || !q.question) return false;
    if (q.type === 'oui-non') {
      const a = q.affirmations;
      return Array.isArray(a) && a.length >= 1 && a.length <= 2 &&
             a.every(x => x && x.texte && typeof x.vrai === 'boolean');
    }
    const r = q.reponses;
    return Array.isArray(r) && r.length >= 2 && r.length <= 4 &&
           r.some(x => x.correcte) && r.every(x => x.texte);
  }

  function bankValid() {
    if (typeof EXAMEN_QUESTIONS === 'undefined' || !Array.isArray(EXAMEN_QUESTIONS)) return [];
    const ids = new Set();
    return EXAMEN_QUESTIONS.filter(q => {
      if (!questionValide(q)) {
        console.warn('[VroumVroum] question d\'examen invalide ignorée :', q && q.id);
        return false;
      }
      if (q.id) {
        if (ids.has(q.id)) console.warn('[VroumVroum] id d\'examen en double :', q.id);
        ids.add(q.id);
      }
      return true;
    });
  }

  const BANK = bankValid();
  const N = Math.min(CFG.nbQuestions, BANK.length);
  const SEUIL = (N === CFG.nbQuestions) ? CFG.seuil : Math.ceil(N * CFG.seuil / CFG.nbQuestions);

  /* Prépare une question : boutons numérotés 0..3 = lettres A..D.
     choix   : un bouton par réponse (ordre mélangé)
     oui-non : affirmation i => boutons 2i (OUI) et 2i+1 (NON) */
  function buildItem(q) {
    if (q.type === 'oui-non') {
      const correct = new Set();
      q.affirmations.forEach((a, i) => correct.add(2 * i + (a.vrai ? 0 : 1)));
      return { q, kind: 'ouinon', correct, multi: q.affirmations.length > 1 };
    }
    const choix = shuffle(q.reponses);
    const correct = new Set();
    choix.forEach((c, i) => { if (c.correcte) correct.add(i); });
    return { q, kind: 'choix', choix, correct, multi: correct.size > 1 };
  }

  /* ---------- État ---------- */

  let items = [];
  let answers = [];
  let idx = 0;
  let running = false;
  let qTimer = null;
  let qEnd = 0;
  let qDur = 30;

  /* ---------- Accueil ---------- */

  function renderIntro() {
    const rules = $('ex-rules');
    rules.innerHTML = '';
    [
      `${N} question${N > 1 ? 's' : ''} avec images`,
      `${CFG.dureeQuestionSec} secondes par question, passage automatique`,
      `Réussite à ${SEUIL} / ${N}`,
      'Une question est juste si toutes les réponses sont justes',
      'Pas de retour en arrière, correction à la fin'
    ].forEach(t => rules.appendChild(el('li', null, t)));

    const best = getBest();
    $('ex-best').textContent = best ? `Ton meilleur score : ${best.score} / ${best.total}` : '';

    const warn = $('ex-warn');
    const start = $('ex-start');
    start.disabled = false;
    if (BANK.length === 0) {
      warn.hidden = false;
      warn.textContent = 'Aucune question valide dans data-examen.js.';
      start.disabled = true;
    } else if (BANK.length < CFG.nbQuestions) {
      warn.hidden = false;
      warn.textContent = `Base incomplète : ${BANK.length} question${BANK.length > 1 ? 's' : ''} sur ${CFG.nbQuestions} prévues. L'examen est raccourci (seuil ajusté à ${SEUIL} / ${N}).`;
    } else {
      warn.hidden = true;
    }
  }

  /* ---------- Démarrage ---------- */

  function start() {
    if (!N) return;
    items = shuffle(BANK).slice(0, N).map(buildItem);
    answers = items.map(() => new Set());
    idx = 0;
    running = true;
    showOnly(secQuiz);
    renderQuestion();
  }

  /* ---------- Minuteur par question ---------- */

  function paintTimer() {
    const left = Math.max(0, (qEnd - Date.now()) / 1000);
    const frac = qDur > 0 ? left / qDur : 0;
    $('ex-ring-fg').style.strokeDashoffset = String(RING_C * (1 - frac));
    $('ex-secs').textContent = String(Math.ceil(left));$('ex-ring').classList.toggle('warn', left <= 5);
    if (left <= 0) { next(); }
  }
  function startQTimer(sec) {
    stopQTimer();
    qDur = sec;
    qEnd = Date.now() + sec * 1000;
    const fg = $('ex-ring-fg');
    fg.style.strokeDasharray = String(RING_C);
    fg.style.strokeDashoffset = '0';
    qTimer = setInterval(paintTimer, 100);
    paintTimer();
  }
  function stopQTimer() {
    if (qTimer) { clearInterval(qTimer); qTimer = null; }
  }

  /* ---------- Affichage d'une question ---------- */

  function buildFigure(container, q) {
    container.innerHTML = '';
    if (!q.image) { container.hidden = true; return; }
    container.hidden = false;
    container.classList.toggle('contain', /\.svg(\?|$)/i.test(q.image));
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = q.alt || '';
    img.onerror = () => {
      container.innerHTML = '';
      container.appendChild(el('div', 'ex-missing', 'Image introuvable : ' + q.image));
    };
    container.appendChild(img);
  }

  function answerButton(text, k) {
    const b = el('button', 'ex-ans');
    b.type = 'button';
    b.dataset.k = String(k);
    b.setAttribute('aria-pressed', 'false');
    b.appendChild(el('span', 'ex-ans-text', text));
    b.appendChild(el('span', 'ex-dots'));
    b.appendChild(el('span', 'ex-key', LETTERS[k]));
    b.addEventListener('click', () => select(k));
    return b;
  }

  function renderQuestion() {
    const item = items[idx];
    const q = item.q;

    // MODIFICATION : Affichage du numéro et de l'ID de la question (ex: 01 (A01) ou (B12))
    $('ex-num').textContent = pad(idx + 1) + (q.id ? ` (${q.id})` : '');
    $('ex-total').textContent = ' / ' + pad(items.length);$('ex-question').textContent = q.question;
    $('ex-mode').textContent = item.multi ? 'Plusieurs réponses' : 'Une réponse';
    buildFigure($('ex-figure'), q);

    const box = $('ex-answers');
    box.innerHTML = '';
    if (item.kind === 'choix') {
      item.choix.forEach((c, i) => box.appendChild(answerButton(c.texte, i)));
    } else {
      q.affirmations.forEach((a, i) => {
        box.appendChild(el('p', 'ex-stmt', a.texte));
        const row = el('div', 'ex-yn');
        row.appendChild(answerButton('OUI', 2 * i));
        row.appendChild(answerButton('NON', 2 * i + 1));
        box.appendChild(row);
      });
    }

    $('ex-next').textContent = (idx === items.length - 1) ? 'Terminer' : 'Valider';
    startQTimer(q.duree || CFG.dureeQuestionSec);
  }

  function paintSelection() {
    const set = answers[idx];
    document.querySelectorAll('#ex-answers .ex-ans').forEach(b => {
      const on = set.has(parseInt(b.dataset.k, 10));
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function select(k) {
    if (!running) return;
    const item = items[idx];
    const set = answers[idx];
    if (item.kind === 'ouinon') {
      const partner = k ^ 1;                   // OUI <-> NON de la même affirmation
      if (set.has(k)) set.delete(k);
      else { set.add(k); set.delete(partner); }
    } else if (!item.multi) {
      if (set.has(k)) set.delete(k);
      else { set.clear(); set.add(k); }      // "Une réponse" : une seule à la fois
    } else {
      if (set.has(k)) set.delete(k); else set.add(k);
    }
    paintSelection();
  }

  function next() {
    if (!running) return;
    stopQTimer();
    if (idx < items.length - 1) { idx++; renderQuestion(); }
    else finish();
  }

  function quit() {
    if (!confirm('Quitter l\u2019examen ? Ta progression sera perdue.')) return;
    running = false;
    stopQTimer();
    renderIntro();
    showOnly(secIntro);
  }

  /* ---------- Correction (mise en page identique au QCM mode examen) ---------- */

  const ORDRE_FAM = ['L', 'C', 'R', 'U', 'D', 'A', 'P', 'M', 'S', 'E'];

  /* Famille d'une question d'examen, déduite de sa fiche (data-fiches.js) */
  function familleDe(q) {
    if (typeof FICHES === 'undefined' || !q.fiche) return null;
    const f = FICHES.find(x => x.id === q.fiche);
    return f ? f.badge : null;
  }

  function finish() {
    if (!running) return;
    running = false;
    stopQTimer();

    const results = items.map((item, i) => ({
      item,
      set: answers[i],
      ok: sameSet(item.correct, answers[i]),
      answered: answers[i].size > 0
    }));
    const score = results.filter(r => r.ok).length;
    const total = items.length;
    const reussi = score >= SEUIL;
    const manque = SEUIL - score;

    const prev = getBest();
    const improved = saveBest(score, total) && (!prev || score / total > prev.score / prev.total);

    let message = reussi
      ? `Réussi ! Tu aurais eu ton examen (${SEUIL}/${total} minimum).`
      : `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour réussir. Continue à réviser.`;
    const best = getBest();
    if (improved && score > 0) message += ' Nouveau meilleur score !';
    else if (best) message += ` Ton meilleur : ${best.score} / ${best.total}.`;
    $('ex-verdict').textContent = message;

    $('ex-score-val').textContent = String(score);
    $('ex-score-total').textContent = String(total);$('ex-score-box').className = 'exam-result-score ' + (reussi ? 'pass' : 'fail');

    // Grille des numéros
    const grid = $('ex-grid');
    grid.innerHTML = '';
    results.forEach((r, i) => {
      const cls = !r.answered ? 'unanswered' : (r.ok ? 'correct' : 'wrong');
      const b = el('button', 'exam-num ' + cls, pad(i + 1));
      b.type = 'button';
      b.setAttribute('aria-label', `Question ${i + 1} : ${!r.answered ? 'sans réponse' : (r.ok ? 'correcte' : 'erreur')}`);
      b.addEventListener('click', () => showDetail(results, i));
      grid.appendChild(b);
    });

    // Résultats par thème
    const stats = {};
    results.forEach(r => {
      const fam = familleDe(r.item.q);
      if (!fam) return;
      if (!stats[fam]) stats[fam] = { ok: 0, total: 0 };
      stats[fam].total++;
      if (r.ok) stats[fam].ok++;
    });
    const themes = $('ex-themes');
    themes.innerHTML = '';
    const fams = ORDRE_FAM.filter(f => stats[f]);
    if (!fams.length) {
      themes.appendChild(el('p', 'ex-no-themes', 'Aucun thème disponible.'));
    }
    fams.forEach(fam => {
      const row = el('div', 'exam-theme fam-' + fam);
      row.appendChild(el('span', 'exam-theme-badge', fam));
      row.appendChild(el('span', 'exam-theme-name', (window.VV && VV.FAM_NAMES[fam]) || fam));
      row.appendChild(el('span', 'exam-theme-score', `${stats[fam].ok}/${stats[fam].total}`));
      themes.appendChild(row);
    });

    showOnly(secResult);
    const firstWrong = results.findIndex(r => !r.ok);
    showDetail(results, firstWrong >= 0 ? firstWrong : 0);
    window.scrollTo(0, 0);
  }

  function showDetail(results, i) {
    const r = results[i];
    const { q } = r.item;
    const box = $('ex-detail');
    box.innerHTML = '';

    document.querySelectorAll('#ex-grid .exam-num').forEach((b, k) => b.classList.toggle('selected', k === i));

    const head = el('div', 'exam-detail-head');
    // MODIFICATION : Affichage de l'ID dans le détail de correction
    head.appendChild(el('span', 'exam-detail-num', `Question ${pad(i + 1)}${q.id ? ` (${q.id})` : ''}`));
    head.appendChild(el('span', 'exam-detail-status ' + (r.ok ? 'correct' : 'wrong'),
      r.ok ? '\u2713 Correct' : '\u2717 Erreur'));
    box.appendChild(head);

    if (q.image) {
      const fig = el('div', 'exam-detail-fig');
      buildFigure(fig, q);
      box.appendChild(fig);
    }
    box.appendChild(el('div', 'exam-detail-q', q.question));

    const choices = el('div', 'exam-detail-choices');
    function addChoice(text, cls, tag) {
      const row = el('div', 'exam-detail-choice ' + cls);
      if (tag) row.appendChild(el('span', 'exam-detail-tag', tag));
      row.appendChild(el('span', null, text));
      choices.appendChild(row);
    }

    if (r.item.kind === 'choix') {
      r.item.choix.forEach((c, k) => {
        const picked = r.set.has(k);
        const text = `${LETTERS[k]}. ${c.texte}`;
        if (c.correcte && picked)        addChoice(text, 'correct', 'Bonne réponse');
        else if (c.correcte && !picked) addChoice(text, 'missed', 'Oubliée');
        else if (!c.correcte && picked) addChoice(text, 'wrong', 'Cochée à tort');
        else                            addChoice(text, 'neutral', '');
      });
    } else {
      q.affirmations.forEach((a, k) => {
        const donne = r.set.has(2 * k) ? 'OUI' : (r.set.has(2 * k + 1) ? 'NON' : null);
        const attendu = a.vrai ? 'OUI' : 'NON';
        const ok = donne === attendu;
        addChoice(a.texte, ok ? 'correct' : 'wrong',
          ok ? `${attendu} \u2713` : `Toi : ${donne || 'aucune'} \u2014 attendu : ${attendu}`);
      });
    }
    box.appendChild(choices);

    if (q.explication || (q.fiche && !r.ok)) {
      const exp = el('div', 'exam-detail-exp');
      if (q.explication) exp.appendChild(document.createTextNode(q.explication));
      if (q.fiche && !r.ok) {
        const a = el('a', 'revoir-fiche', 'Revoir la fiche \u2192');
        a.href = 'fiches.html#' + encodeURIComponent(q.fiche);
        exp.appendChild(document.createTextNode(' '));
        exp.appendChild(a);
      }
      box.appendChild(exp);
    }
  }

  /* ---------- Événements ---------- */

  $('ex-start').addEventListener('click', start);$('ex-next').addEventListener('click', next);
  $('ex-quit').addEventListener('click', quit);$('ex-replay').addEventListener('click', () => { renderIntro(); start(); });

  document.addEventListener('keydown', e => {
    if (secQuiz.hidden || !running) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const m = /^[a-dA-D]$/.test(e.key) ? 'abcd'.indexOf(e.key.toLowerCase()) : (/^[1-4]$/.test(e.key) ? parseInt(e.key, 10) - 1 : -1);
    if (m >= 0) {
      const btn = document.querySelector(`#ex-answers .ex-ans[data-k="${m}"]`);
      if (btn) select(m);
    } else if (e.key === 'Enter' && !e.target.matches('#ex-quit, #ex-next')) {
      e.preventDefault();
      next();
    }
  });

  window.addEventListener('beforeunload', e => {
    if (!running) return;
    e.preventDefault();
    e.returnValue = '';
  });

  renderIntro();
  showOnly(secIntro);
})();

/* =========================================================
   EXAMEN BLANC (examen.html)
   - Questions de EXAMEN_QUESTIONS (examen-data.js), 2 types :
       "choix" (A B C D, une ou plusieurs bonnes réponses)
       "oui-non" (1 ou 2 affirmations ; OUI = A/C, NON = B/D)
   - Minuteur rond PAR QUESTION, passage automatique à la suivante
   - Pas de retour en arrière ; correction détaillée à la fin
   - Meilleur score : localStorage "vroum-examen-best"
   Dépend de : app.js (thème, menu) et examen-data.js
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
      warn.textContent = 'Aucune question valide dans examen-data.js.';
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
    $('ex-secs').textContent = String(Math.ceil(left));
    $('ex-ring').classList.toggle('warn', left <= 5);
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

    $('ex-num').textContent = pad(idx + 1);
    $('ex-total').textContent = ' / ' + pad(items.length);
    $('ex-question').textContent = q.question;
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
      const partner = k ^ 1;                 // OUI <-> NON de la même affirmation
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

  /* ---------- Correction ---------- */

  function finish() {
    if (!running) return;
    running = false;
    stopQTimer();

    const results = items.map((item, i) => ({ item, set: answers[i], ok: sameSet(item.correct, answers[i]) }));
    const score = results.filter(r => r.ok).length;
    const total = items.length;
    const reussi = score >= SEUIL;

    const prev = getBest();
    const improved = saveBest(score, total) && (!prev || score / total > prev.score / prev.total);

    $('ex-score').textContent = `Score : ${score} / ${total}`;
    const verdict = $('ex-verdict');
    verdict.className = 'ex-verdict ' + (reussi ? 'pass' : 'fail');
    verdict.textContent = reussi
      ? `Réussi : le seuil de ${SEUIL} / ${total} est atteint.`
      : `Pas encore : il fallait ${SEUIL} / ${total}.`;

    const best = getBest();
    $('ex-result-best').textContent = improved
      ? 'Nouveau meilleur score !'
      : (best ? `Ton meilleur score : ${best.score} / ${best.total}` : '');

    const grid = $('ex-grid');
    grid.innerHTML = '';
    results.forEach((r, i) => {
      const b = el('button', 'ex-num ' + (r.ok ? 'ok' : 'ko'), String(i + 1));
      b.type = 'button';
      b.setAttribute('aria-label', `Question ${i + 1} : ${r.ok ? 'correcte' : 'erreur'}`);
      b.addEventListener('click', () => showDetail(results, i));
      grid.appendChild(b);
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

    document.querySelectorAll('#ex-grid .ex-num').forEach((b, k) => b.classList.toggle('sel', k === i));

    const head = el('div', 'ex-detail-head');
    head.appendChild(el('strong', null, `Question ${pad(i + 1)}`));
    head.appendChild(el('span', 'ex-badge ' + (r.ok ? 'ok' : 'ko'), r.ok ? '\u2713 Correct' : '\u2717 Erreur'));
    box.appendChild(head);

    if (q.image) {
      const fig = el('figure', 'ex-figure');
      buildFigure(fig, q);
      box.appendChild(fig);
    }
    box.appendChild(el('p', 'ex-detail-q', q.question));

    if (r.item.kind === 'choix') {
      r.item.choix.forEach((c, k) => {
        const picked = r.set.has(k);
        let cls = 'ex-choice', tag = '';
        if (c.correcte && picked)       { cls += ' good';   tag = 'Bonne r\u00e9ponse, coch\u00e9e'; }
        else if (c.correcte && !picked) { cls += ' missed'; tag = 'Bonne r\u00e9ponse, oubli\u00e9e'; }
        else if (!c.correcte && picked) { cls += ' bad';    tag = 'Coch\u00e9e \u00e0 tort'; }
        const row = el('div', cls);
        row.appendChild(el('span', null, `${LETTERS[k]}. ${c.texte}`));
        if (tag) row.appendChild(el('span', 'ex-choice-tag', tag));
        box.appendChild(row);
      });
    } else {
      q.affirmations.forEach((a, k) => {
        const donne = r.set.has(2 * k) ? 'OUI' : (r.set.has(2 * k + 1) ? 'NON' : null);
        const attendu = a.vrai ? 'OUI' : 'NON';
        const ok = donne === attendu;
        const row = el('div', 'ex-choice ' + (ok ? 'good' : 'bad'));
        row.appendChild(el('span', null, a.texte));
        row.appendChild(el('span', 'ex-choice-tag',
          ok ? `${attendu} \u2713` : `Ta r\u00e9ponse : ${donne || 'aucune'} \u2014 attendu : ${attendu}`));
        box.appendChild(row);
      });
    }

    if (q.explication) box.appendChild(el('p', 'ex-detail-exp', q.explication));
    if (q.fiche) {
      const a = el('a', 'revoir-fiche', 'Revoir la fiche \u2192');
      a.href = 'fiches.html#' + encodeURIComponent(q.fiche);
      box.appendChild(a);
    }
  }

  /* ---------- Événements ---------- */

  $('ex-start').addEventListener('click', start);
  $('ex-next').addEventListener('click', next);
  $('ex-quit').addEventListener('click', quit);
  $('ex-replay').addEventListener('click', () => { renderIntro(); start(); });

  document.addEventListener('keydown', e => {
    if (secQuiz.hidden || !running) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const m = /^[a-dA-D]$/.test(e.key) ? 'abcd'.indexOf(e.key.toLowerCase())
            : (/^[1-4]$/.test(e.key) ? parseInt(e.key, 10) - 1 : -1);
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

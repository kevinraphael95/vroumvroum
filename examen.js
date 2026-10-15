/* =========================================================
   EXAMEN BLANC (examen.html)
   - Tire les questions de EXAMEN_QUESTIONS (examen-data.js)
   - Chrono global, pas de retour en arrière
   - Une question est juste si TOUTES les bonnes réponses sont cochées
     et AUCUNE mauvaise
   - Correction détaillée à la fin (clic sur un numéro)
   - Meilleur score : localStorage "vroum-examen-best"
   Dépend de : app.js (thème, menu) et examen-data.js
   ========================================================= */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const BEST_KEY = 'vroum-examen-best';

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
  function fmt(sec) { return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }

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

  function showOnly(el) {
    [secIntro, secQuiz, secResult].forEach(s => { s.hidden = (s !== el); });
    window.scrollTo(0, 0);
  }

  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- Données ---------- */

  const CFG = Object.assign({ nbQuestions: 40, dureeSec: 1800, seuil: 35 },
    (typeof EXAMEN_CONFIG !== 'undefined') ? EXAMEN_CONFIG : {});

  function bankValid() {
    if (typeof EXAMEN_QUESTIONS === 'undefined' || !Array.isArray(EXAMEN_QUESTIONS)) return [];
    const ids = new Set();
    return EXAMEN_QUESTIONS.filter(q => {
      const rep = q && q.reponses;
      const ok = q && q.question && Array.isArray(rep) && rep.length >= 2 &&
                 rep.some(r => r.correcte) && rep.every(r => r.texte);
      if (!ok) { console.warn('[VroumVroum] question d\'examen invalide ignorée :', q && q.id); return false; }
      if (q.id) {
        if (ids.has(q.id)) console.warn('[VroumVroum] id d\'examen en double :', q.id);
        ids.add(q.id);
      }
      return true;
    });
  }

  const BANK = bankValid();
  const N = Math.min(CFG.nbQuestions, BANK.length);
  const SEUIL = (N === CFG.nbQuestions)
    ? CFG.seuil
    : Math.ceil(N * CFG.seuil / CFG.nbQuestions);

  /* ---------- État ---------- */

  let items = [];       // [{ q, choix }]
  let answers = [];     // [Set d'indices cochés]
  let idx = 0;
  let endAt = 0;
  let timerId = null;
  let running = false;

  /* ---------- Accueil ---------- */

  function renderIntro() {
    const rules = $('ex-rules');
    rules.innerHTML = '';
    [
      `${N} question${N > 1 ? 's' : ''} avec images`,
      `${Math.round(CFG.dureeSec / 60)} minutes au total`,
      `Réussite à ${SEUIL} / ${N}`,
      'Une question est juste si tu coches toutes les bonnes réponses et aucune mauvaise',
      'Pas de retour en arrière, correction à la fin'
    ].forEach(t => rules.appendChild(el('li', null, t)));

    const best = getBest();
    $('ex-best').textContent = best ? `Ton meilleur score : ${best.score} / ${best.total}` : '';

    const warn = $('ex-warn');
    if (BANK.length === 0) {
      warn.hidden = false;
      warn.textContent = 'Aucune question dans examen-data.js.';
      $('ex-start').disabled = true;
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
    items = shuffle(BANK).slice(0, N).map(q => ({ q, choix: shuffle(q.reponses) }));
    answers = items.map(() => new Set());
    idx = 0;
    running = true;
    endAt = Date.now() + CFG.dureeSec * 1000;
    startTimer();
    showOnly(secQuiz);
    renderQuestion();
  }

  /* ---------- Chrono ---------- */

  function tick() {
    const left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    $('ex-timer-display').textContent = fmt(left);
    $('ex-timer').classList.toggle('warn', left <= 300);
    if (left === 0) finish(true);
  }
  function startTimer() {
    stopTimer();
    tick();
    timerId = setInterval(tick, 500);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  /* ---------- Question ---------- */

  function buildFigure(container, q) {
    container.innerHTML = '';
    if (!q.image) { container.hidden = true; return; }
    container.hidden = false;
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = q.alt || '';
    img.onerror = () => {
      container.innerHTML = '';
      container.appendChild(el('div', 'ex-missing', 'Image introuvable : ' + q.image));
    };
    container.appendChild(img);
  }

  function renderQuestion() {
    const { q, choix } = items[idx];
    $('ex-num').textContent = pad(idx + 1);
    $('ex-total').textContent = ' / ' + pad(items.length);
    $('ex-progress').style.width = ((idx / items.length) * 100) + '%';
    $('ex-question').textContent = q.question;
    buildFigure($('ex-figure'), q);

    const box = $('ex-options');
    box.innerHTML = '';
    choix.forEach((c, i) => {
      const btn = el('button', 'option');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.appendChild(el('span', 'option-letter', String(i + 1)));
      btn.appendChild(document.createTextNode(c.texte));
      btn.addEventListener('click', () => toggle(i, btn));
      box.appendChild(btn);
    });

    $('ex-next').textContent = (idx === items.length - 1) ? 'Terminer l\u2019examen' : 'Question suivante \u2192';
  }

  function toggle(i, btn) {
    const set = answers[idx];
    if (set.has(i)) set.delete(i); else set.add(i);
    const on = set.has(i);
    btn.classList.toggle('selected', on);
    btn.setAttribute('aria-pressed', String(on));
  }

  function next() {
    if (!running) return;
    if (idx < items.length - 1) { idx++; renderQuestion(); }
    else finish(false);
  }

  function quit() {
    if (!confirm('Quitter l\u2019examen ? Ta progression sera perdue.')) return;
    running = false;
    stopTimer();
    renderIntro();
    showOnly(secIntro);
  }

  /* ---------- Correction ---------- */

  function isCorrect(item, set) {
    return item.choix.every((c, i) => !!c.correcte === set.has(i));
  }

  function finish(timeUp) {
    if (!running) return;
    running = false;
    stopTimer();

    const results = items.map((it, i) => ({ item: it, set: answers[i], ok: isCorrect(it, answers[i]) }));
    const score = results.filter(r => r.ok).length;
    const total = items.length;
    const reussi = score >= SEUIL;

    const prev = getBest();
    const improved = saveBest(score, total) && (!prev || score / total > prev.score / prev.total);

    $('ex-score').textContent = `Score : ${score} / ${total}`;
    const verdict = $('ex-verdict');
    verdict.className = 'ex-verdict ' + (reussi ? 'pass' : 'fail');
    verdict.textContent =
      (timeUp ? 'Temps écoulé. ' : '') +
      (reussi ? `Réussi : le seuil de ${SEUIL} / ${total} est atteint.`
              : `Pas encore : il fallait ${SEUIL} / ${total}.`);

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
    const { q, choix } = r.item;
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

    choix.forEach((c, k) => {
      const picked = r.set.has(k);
      let cls = 'ex-choice', tag = '';
      if (c.correcte && picked)       { cls += ' good';   tag = 'Bonne r\u00e9ponse, coch\u00e9e'; }
      else if (c.correcte && !picked) { cls += ' missed'; tag = 'Bonne r\u00e9ponse, oubli\u00e9e'; }
      else if (!c.correcte && picked) { cls += ' bad';    tag = 'Coch\u00e9e \u00e0 tort'; }
      const row = el('div', cls);
      row.appendChild(el('span', null, c.texte));
      if (tag) row.appendChild(el('span', 'ex-choice-tag', tag));
      box.appendChild(row);
    });

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
    if (/^[1-9]$/.test(e.key)) {
      const btn = document.querySelectorAll('#ex-options .option')[parseInt(e.key, 10) - 1];
      if (btn) btn.click();
    } else if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
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

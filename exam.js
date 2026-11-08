/* =========================================================
   exam.js — Examen blanc VroumVroum (tout-en-un)
   1. Chargement des questions depuis GitHub
   2. Examen (questions, minuteur, clavier)
   3. Correction (détail, thèmes, record)
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Réglages ---------- */
  const USER = 'kevinraphael95', REPO = 'random-useful-stuff', BRANCH = 'main';
  const NB_QUESTIONS = 40, SEC_PAR_QUESTION = 30, SEUIL = 35;

  const THEMES = {
    L: 'La circulation routière', C: 'Le conducteur', R: 'La route',
    U: 'Les autres usagers', D: 'Les notions diverses', A: 'Les premiers secours',
    P: 'Prendre et quitter son véhicule', M: 'La mécanique et les équipements',
    S: 'La sécurité du passager et du véhicule', E: "L'environnement"
  };

  const TREE_URL = `https://api.github.com/repos/${USER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const BASE_URL = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/code/`;
  const CACHE_KEY = 'vroum-tree-cache', CACHE_TTL = 3600e3;
  const IMG_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;
  const LETTRES = ['A', 'B', 'C', 'D'];

  /* ---------- Outils ---------- */
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  const shuffle = a => {
    a = [...a];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };
  const sameSet = (a, b) => a.size === b.size && [...a].every(x => b.has(x));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Thème ---------- */
  function paintTheme() {
    $('theme').textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  }
  $('theme').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    store.set('vroum-theme', dark ? 'dark' : 'light');
    paintTheme();
  });
  paintTheme();

  /* ---------- Record ---------- */
  function getBest() {
    try {
      const b = JSON.parse(store.get('vroum-examen-best'));
      return b && b.total > 0 ? b : null;
    } catch (e) { return null; }
  }
  function saveBest(score, total) {
    const b = getBest();
    if (b && b.score / b.total >= score / total) return false;
    store.set('vroum-examen-best', JSON.stringify({ score, total }));
    return true;
  }

  /* =========================================================
     1. CHARGEMENT DES QUESTIONS
     Une requête liste le dépôt (cache 1 h) ; repli sur A.json, B.json…
     ========================================================= */
  function lireCache(ignorerTTL) {
    try {
      const c = JSON.parse(store.get(CACHE_KEY));
      if (!c || !c.series || !c.series.length || !c.images) return null;
      if (!ignorerTTL && Date.now() - c.date > CACHE_TTL) return null;
      return c;
    } catch (e) { return null; }
  }

  async function listerViaArbre() {
    const res = await fetch(TREE_URL);
    if (!res.ok) throw new Error('API GitHub ' + res.status);
    const data = await res.json();
    const series = [], images = {};
    (data.tree || []).forEach(({ type, path }) => {
      if (type !== 'blob') return;
      if (/^code\/questions\/[^/]+\.json$/i.test(path)) {
        if (path.toLowerCase() !== 'code/questions/index.json') series.push(path.slice(5));
      } else if (path.startsWith('code/images/') && IMG_EXT.test(path)) {
        const id = path.split('/').pop().replace(IMG_EXT, '');
        const chemin = path.slice(5);
        // doublon : on préfère le dossier <1re lettre de l'id>/
        if (!images[id] || chemin.includes('/' + id[0] + '/')) images[id] = chemin;
      }
    });
    if (!series.length) throw new Error('Aucune série trouvée');
    return { series, images };
  }

  async function listerParEssai() {
    const series = [];
    for (const l of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      try {
        const r = await fetch(`${BASE_URL}questions/${l}.json`, { method: 'HEAD' });
        if (!r.ok) break;
      } catch (e) { break; }
      series.push(`questions/${l}.json`);
    }
    return { series, images: {} };
  }

  async function lister() {
    const frais = lireCache(false);
    if (frais) return frais;
    try {
      const r = await listerViaArbre();
      store.set(CACHE_KEY, JSON.stringify({ date: Date.now(), ...r }));
      return r;
    } catch (err) {
      console.warn('API GitHub indisponible :', err);
      return lireCache(true) || listerParEssai();
    }
  }

  const encodeChemin = c => c.split('/').map(encodeURIComponent).join('/');

  /* Met une question (2 formats possibles) sous une forme unique */
  function normaliser(q, images) {
    const enonce = q.enonce || q.question || '';
    const base = {
      id: q.id,
      image: q.id ? BASE_URL + encodeChemin(images[q.id] || `images/${q.id[0]}/${q.id}.png`) : null,
      question: enonce,
      theme: q.theme || null,
      explication: q.explication || ''
    };

    // Format natif : "reponses" ou "affirmations" déjà sous forme d'objets
    if (!q.options && (Array.isArray(q.reponses) || Array.isArray(q.affirmations))) {
      return { ...base, type: q.type || (q.affirmations ? 'oui-non' : 'choix'),
               reponses: q.reponses, affirmations: q.affirmations };
    }
    if (!q.options || typeof q.options !== 'object') return null;

    const bonnes = Array.isArray(q.reponses) ? q.reponses : [];
    const ouiNon = Object.values(q.options).some(o =>
      typeof o === 'string' && /^(OUI|NON)\b|\b(OUI|NON)\s*$/.test(o.trim()));

    if (ouiNon) {
      const cles = Object.keys(q.options), affirmations = [];
      for (let i = 0; i < cles.length; i += 2) {
        const texte = (q.options[cles[i]] || '').replace(/\s*:?\s*(OUI|NON)\s*$/i, '').trim() || enonce;
        affirmations.push({ texte, vrai: bonnes.includes(cles[i]) });
      }
      return { ...base, type: 'oui-non', affirmations };
    }
    return { ...base, type: 'choix',
      reponses: Object.keys(q.options).map(l => ({ texte: q.options[l], correcte: bonnes.includes(l) })) };
  }

  function valide(q) {
    if (!q || !q.question.trim()) return false;
    if (q.type === 'oui-non') {
      const a = q.affirmations;
      return Array.isArray(a) && a.length >= 1 && a.length <= 2 &&
        a.every(x => x && x.texte && typeof x.vrai === 'boolean');
    }
    const r = q.reponses;
    return Array.isArray(r) && r.length >= 2 && r.length <= 4 &&
      r.some(x => x.correcte) && r.every(x => x && x.texte);
  }

  async function chargerQuestions() {
    const { series, images } = await lister();
    const fichiers = await Promise.all(series.map(s =>
      fetch(BASE_URL + encodeChemin(s)).then(r => r.json()).catch(() => null)));
    const ids = new Set(), out = [];
    fichiers.forEach(f => {
      if (!f || !Array.isArray(f.questions)) return;
      f.questions.forEach(raw => {
        const q = normaliser(raw, images);
        if (!valide(q) || (q.id && ids.has(q.id))) return;
        if (q.id) ids.add(q.id);
        out.push(q);
      });
    });
    return out;
  }

  /* =========================================================
     2. EXAMEN
     ========================================================= */
  const screens = { intro: $('intro'), quiz: $('quiz'), result: $('result') };
  const RING = 2 * Math.PI * 30;

  let banque = [], N = 0, seuil = 0;
  let items = [], answers = [], idx = 0, running = false;
  let timer = null, endAt = 0;

  function show(name) {
    Object.entries(screens).forEach(([k, s]) => { s.hidden = k !== name; });
    window.scrollTo(0, 0);
  }

  function renderIntro() {
    const rules = $('rules'), warn = $('warn'), start = $('start');
    rules.innerHTML = '';
    if (N) {
      [`${N} question${N > 1 ? 's' : ''}`,
       `${SEC_PAR_QUESTION} secondes par question, passage automatique`,
       `Réussite à ${seuil} / ${N}`,
       'Une question est juste si toutes les réponses sont justes',
       'Pas de retour en arrière, correction à la fin'
      ].forEach(t => rules.appendChild(el('li', null, t)));
    }
    const best = getBest();
    $('best').textContent = best ? `Ton meilleur score : ${best.score} / ${best.total}` : '';

    warn.hidden = true;
    if (!banque.length) {
      warn.hidden = false;
      warn.textContent = 'Aucune question chargée. Vérifie ta connexion puis recharge la page.';
      start.textContent = 'Indisponible';
      start.disabled = true;
      return;
    }
    start.textContent = "Commencer l'examen →";
    start.disabled = false;
    if (banque.length < NB_QUESTIONS) {
      warn.hidden = false;
      warn.textContent = `Base incomplète : ${banque.length} questions sur ${NB_QUESTIONS}. Examen raccourci (seuil ${seuil} / ${N}).`;
    }
  }

  function buildItem(q) {
    if (q.type === 'oui-non') {
      const correct = new Set(q.affirmations.map((a, i) => 2 * i + (a.vrai ? 0 : 1)));
      return { q, kind: 'ouinon', correct, multi: q.affirmations.length > 1 };
    }
    const choix = shuffle(q.reponses);
    const correct = new Set();
    choix.forEach((c, i) => { if (c.correcte) correct.add(i); });
    return { q, kind: 'choix', choix, correct, multi: correct.size > 1 };
  }

  function start() {
    if (!N) return;
    items = shuffle(banque).slice(0, N).map(buildItem);
    answers = items.map(() => new Set());
    idx = 0;
    running = true;
    show('quiz');
    renderQuestion();
  }

  /* Minuteur */
  function stopTimer() { clearInterval(timer); timer = null; }
  function paintTimer() {
    const left = Math.max(0, (endAt - Date.now()) / 1000);
    $('ring-fg').style.strokeDashoffset = RING * (1 - left / SEC_PAR_QUESTION);
    $('secs').textContent = Math.ceil(left);
    $('ring').classList.toggle('warn', left <= 5);
    if (left <= 0) next();
  }
  function startTimer(ms = SEC_PAR_QUESTION * 1000) {
    stopTimer();
    endAt = Date.now() + ms;
    $('ring-fg').style.strokeDasharray = RING;
    timer = setInterval(paintTimer, 100);
    paintTimer();
  }

  function figure(box, q) {
    box.innerHTML = '';
    if (!q.image) { box.hidden = true; return; }
    box.hidden = false;
    const img = el('img');
    img.src = q.image;
    img.alt = q.question;
    img.onerror = () => { box.innerHTML = ''; box.appendChild(el('div', 'missing', 'Image introuvable')); };
    box.appendChild(img);
  }

  function answerBtn(text, k) {
    const b = el('button', 'ans');
    b.type = 'button';
    b.dataset.k = k;
    b.append(el('span', null, text), el('span', 'key', LETTRES[k] || ''));
    b.lastChild.style.marginLeft = 'auto';
    b.addEventListener('click', () => select(k));
    return b;
  }

  function renderQuestion() {
    const { q, kind, choix, multi } = items[idx];
    $('num').textContent = pad(idx + 1);
    $('total').textContent = ' / ' + pad(items.length);
    $('question').textContent = q.question;
    $('mode').textContent = multi ? 'Plusieurs réponses' : 'Une réponse';
    $('next').textContent = idx === items.length - 1 ? 'Terminer' : 'Valider';
    figure($('figure'), q);

    const box = $('answers');
    box.innerHTML = '';
    if (kind === 'choix') {
      choix.forEach((c, i) => box.appendChild(answerBtn(c.texte, i)));
    } else {
      q.affirmations.forEach((a, i) => {
        if (a.texte !== q.question) box.appendChild(el('p', 'stmt', a.texte));
        const row = el('div', 'yn');
        row.append(answerBtn('OUI', 2 * i), answerBtn('NON', 2 * i + 1));
        box.appendChild(row);
      });
    }
    startTimer();
  }

  function select(k) {
    if (!running) return;
    const { kind, multi } = items[idx], set = answers[idx];
    if (set.has(k)) set.delete(k);
    else {
      if (kind === 'ouinon') set.delete(k ^ 1);   // OUI et NON s'excluent
      else if (!multi) set.clear();               // une seule réponse possible
      set.add(k);
    }
    document.querySelectorAll('#answers .ans').forEach(b =>
      b.classList.toggle('on', set.has(Number(b.dataset.k))));
  }

  function next() {
    if (!running) return;
    stopTimer();
    if (idx < items.length - 1) { idx++; renderQuestion(); } else finish();
  }

  function quit() {
    if (!running) return;
    const reste = Math.max(0, endAt - Date.now());
    stopTimer();
    if (!confirm("Quitter l'examen ? Ta progression sera perdue.")) { startTimer(reste); return; }
    running = false;
    renderIntro();
    show('intro');
  }

  /* =========================================================
     3. CORRECTION
     ========================================================= */
  function finish() {
    running = false;
    stopTimer();

    const results = items.map((item, i) => ({
      item, set: answers[i],
      ok: sameSet(item.correct, answers[i]),
      answered: answers[i].size > 0
    }));
    const score = results.filter(r => r.ok).length, total = results.length;
    const reussi = score >= seuil, manque = seuil - score;

    const prev = getBest();
    const record = saveBest(score, total) && (!prev || score / total > prev.score / prev.total);
    const best = getBest();

    let msg = reussi
      ? `Réussi ! Tu aurais eu ton examen (${seuil}/${total} minimum).`
      : `Il te manque ${manque} point${manque > 1 ? 's' : ''} pour réussir. Continue à réviser.`;
    msg += record && score > 0 ? ' Nouveau meilleur score !' : best ? ` Ton meilleur : ${best.score} / ${best.total}.` : '';

    $('verdict').textContent = msg;
    $('score').textContent = `${score} / ${total}`;
    $('score').className = 'score ' + (reussi ? 'pass' : 'fail');

    const grid = $('grid');
    grid.innerHTML = '';
    results.forEach((r, i) => {
      const b = el('button', 'num ' + (!r.answered ? 'none' : r.ok ? 'correct' : 'wrong'), pad(i + 1));
      b.type = 'button';
      b.addEventListener('click', () => detail(results, i));
      grid.appendChild(b);
    });

    // Résultats par thème
    const stats = {};
    results.forEach(r => {
      const t = r.item.q.theme;
      if (!THEMES[t]) return;
      stats[t] = stats[t] || { ok: 0, n: 0 };
      stats[t].n++;
      if (r.ok) stats[t].ok++;
    });
    const themes = $('themes');
    themes.innerHTML = '';
    Object.keys(THEMES).filter(t => stats[t]).forEach(t => {
      const row = el('div', 'theme');
      row.append(el('span', null, THEMES[t]), el('b', null, `${stats[t].ok}/${stats[t].n}`));
      themes.appendChild(row);
    });
    if (!themes.children.length) themes.appendChild(el('p', 'soft small', 'Aucun thème disponible.'));

    show('result');
    const premiereErreur = results.findIndex(r => !r.ok);
    detail(results, premiereErreur >= 0 ? premiereErreur : 0);
  }

  function detail(results, i) {
    const { item, set, ok } = results[i], q = item.q;
    const box = $('detail');
    box.innerHTML = '';
    document.querySelectorAll('#grid .num').forEach((b, k) => b.classList.toggle('sel', k === i));

    const head = el('div', 'd-head');
    head.append(el('span', null, `Question ${pad(i + 1)}${q.id ? ` (${q.id})` : ''}`),
                el('span', ok ? 'd-ok' : 'd-ko', ok ? '✓ Correct' : '✗ Erreur'));
    box.appendChild(head);

    if (q.image) {
      const img = el('img');
      img.src = q.image;
      img.alt = '';
      img.onerror = () => img.remove();
      box.appendChild(img);
    }
    box.appendChild(el('div', 'd-q', q.question));

    const row = (text, cls, tag) => {
      const r = el('div', 'd-row ' + cls);
      if (tag) r.appendChild(el('span', 'd-tag', tag));
      r.appendChild(el('span', null, text));
      box.appendChild(r);
    };

    if (item.kind === 'choix') {
      item.choix.forEach((c, k) => {
        const pris = set.has(k), txt = `${LETTRES[k]}. ${c.texte}`;
        if (c.correcte) row(txt, pris ? 'correct' : 'missed', pris ? 'Bonne réponse' : 'Oubliée');
        else row(txt, pris ? 'wrong' : '', pris ? 'Cochée à tort' : '');
      });
    } else {
      q.affirmations.forEach((a, k) => {
        const donne = set.has(2 * k) ? 'OUI' : set.has(2 * k + 1) ? 'NON' : null;
        const attendu = a.vrai ? 'OUI' : 'NON', bon = donne === attendu;
        const txt = a.texte === q.question ? (donne || 'Aucune réponse') : a.texte;
        row(txt, bon ? 'correct' : 'wrong', bon ? `${attendu} ✓` : `Toi : ${donne || 'aucune'} — attendu : ${attendu}`);
      });
    }
    if (q.explication) box.appendChild(el('div', 'd-exp', q.explication));
  }

  /* =========================================================
     Événements + démarrage
     ========================================================= */
  $('start').addEventListener('click', start);
  $('replay').addEventListener('click', start);
  $('next').addEventListener('click', next);
  $('quit').addEventListener('click', quit);

  document.addEventListener('keydown', e => {
    if (!running || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    // 1-4, ou A Z E R (AZERTY) / Q W E R (QWERTY)
    const k = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, z: 1, e: 2, r: 3, q: 0, w: 1 }[e.key.toLowerCase()];
    if (k !== undefined) {
      if (document.querySelector(`#answers .ans[data-k="${k}"]`)) select(k);
    } else if (e.key === 'Enter' && !e.target.matches('#quit, #next')) {
      e.preventDefault();
      next();
    }
  });

  window.addEventListener('beforeunload', e => {
    if (running) { e.preventDefault(); e.returnValue = ''; }
  });

  show('intro');
  renderIntro();
  chargerQuestions()
    .catch(err => { console.error('Erreur de chargement :', err); return []; })
    .then(questions => {
      banque = questions;
      N = Math.min(NB_QUESTIONS, banque.length);
      seuil = !N ? 0 : N === NB_QUESTIONS ? SEUIL : Math.min(N, Math.ceil(N * SEUIL / NB_QUESTIONS));
      if (!running) renderIntro();
    });
})();

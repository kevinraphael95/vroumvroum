/* =========================================================
   core.js — Code partagé par toutes les pages
   À charger EN PREMIER. Expose l'objet global window.VV.
   Contient : stockage, thème, menu, fiches terminées,
              record de l'examen, noms des familles.
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


  /* ============ 3. FICHES TERMINÉES ============ */

  const LUES_KEY = 'vroum-fiches-lues';

  function getLues() {
    try {
      const arr = JSON.parse(storage.get(LUES_KEY, '[]'));
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }

  function isLue(id) {
    return getLues().has(id);
  }

  function toggleLue(id) {
    const set = getLues();
    if (set.has(id)) set.delete(id); else set.add(id);
    storage.set(LUES_KEY, JSON.stringify([...set]));
    return set.has(id);
  }

  function countLues(fiches) {
    const set = getLues();
    return fiches.filter(f => set.has(f.id)).length;
  }


  /* ============ 4. RECORD DE L'EXAMEN ============ */

  const EXAM_KEY = 'vroum-examen-best';

  function getExamBest() {
    try {
      const b = JSON.parse(storage.get(EXAM_KEY, 'null'));
      return b && typeof b.score === 'number' && b.total > 0 ? b : null;
    } catch (e) {
      return null;
    }
  }

  /* Enregistre le score s'il bat le record (en proportion). Renvoie true si record battu. */
  function saveExamBest(score, total) {
    if (!total) return false;
    const prev = getExamBest();
    if (prev && prev.score / prev.total >= score / total) return false;
    storage.set(EXAM_KEY, JSON.stringify({ score, total }));
    return true;
  }


  /* ============ 5. FAMILLES ============ */

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

  const FAMILLE_ICONES = {
    L: '\uD83D\uDEA6', C: '\uD83E\uDDE0', R: '\uD83D\uDEE3\uFE0F', U: '\uD83D\uDEB8',
    D: '\uD83D\uDCC4', A: '\uD83D\uDE91', P: '\uD83D\uDEAA', M: '\uD83D\uDD27',
    S: '\uD83E\uDDBA', E: '\uD83C\uDF31'
  };


  /* ============ 6. MENU BURGER ============ */

  function setMenu(open) {
    const burger = document.getElementById('nav-burger');
    const links = document.getElementById('nav-links');
    if (!burger || !links) return;
    links.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }

  function toggleMenu() {
    const links = document.getElementById('nav-links');
    if (links) setMenu(!links.classList.contains('open'));
  }

  // Fermer : clic sur un lien, clic en dehors de la barre, touche Échap
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-inner');
    if (e.target.closest('#nav-links a') || (nav && !nav.contains(e.target))) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });


  /* ============ 7. EXPORTS ============ */

  window.VV = {
    storage,
    applyTheme, toggleTheme,
    isLue, toggleLue, countLues, getLues,
    getExamBest, saveExamBest,
    toggleMenu,
    FAM_NAMES, FAMILLE_ICONES
  };

  window.toggleTheme = toggleTheme;
  window.toggleMenu = toggleMenu;

})();

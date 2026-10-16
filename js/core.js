/* =========================================================
   core.js — Code partagé par toutes les pages
   DOIT ÊTRE CHARGÉ EN PREMIER, avant tout autre script JS.
   Contient : storage, thème, menu, progression, records,
              constantes de familles.
   Expose l'objet global window.VV.
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


  /* ============ 5. CONSTANTES DES FAMILLES ============ */

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

  const FAMILLE_ICONES = {
    L: '\uD83D\uDEA6', C: '\uD83E\uDDE0', R: '\uD83D\uDEE3\uFE0F', U: '\uD83D\uDEB8',
    D: '\uD83D\uDCC4', A: '\uD83D\uDE91', P: '\uD83D\uDEAA', M: '\uD83D\uDD27',
    S: '\uD83E\uDDBA', E: '\uD83C\uDF31'
  };


  /* ============ 6. MENU BURGER ============ */

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


  /* ============ 7. EXPORTS GLOBAUX ============ */

  window.VV = {
    // storage
    storage,
    // thème
    toggleTheme,
    applyTheme,
    // progression
    isLue, toggleLue, countLues, getLues,
    // records
    getBest, saveBest,
    // menu
    toggleMenu, closeMenu,
    // constantes
    CAT_TO_FAM, FAM_NAMES, FAMILLE_ICONES
  };

  window.toggleTheme = toggleTheme;
  window.toggleMenu = toggleMenu;

})();
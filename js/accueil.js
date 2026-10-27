/* =========================================================
   accueil.js — Page d'accueil (index.html)
   À charger APRÈS : core.js, fiches-data.js
   ========================================================= */

(function () {
  'use strict';

  const VV = window.VV;

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* Anneau de progression + message */
  function renderProgression(done, total) {
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

    let msg;
    if (done === 0) msg = 'Tu n\u2019as pas encore commenc\u00e9. Ouvre ta premi\u00e8re fiche !';
    else if (done === total) msg = 'Toutes les fiches sont termin\u00e9es. Passe \u00e0 l\u2019examen blanc !';
    else msg = `Tu es \u00e0 ${pct} % de progression. Continue comme \u00e7a !`;
    setText('dash-msg', msg);
  }

  /* Cartes des 10 familles */
  function renderFamilles() {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    const familles = new Map();
    FICHES.forEach(f => {
      if (!familles.has(f.badge)) familles.set(f.badge, { nom: f.groupe, fiches: [] });
      familles.get(f.badge).fiches.push(f);
    });

    grid.innerHTML = '';
    familles.forEach((fam, badge) => {
      const n = fam.fiches.length;
      const d = VV.countLues(fam.fiches);
      const p = Math.round((d / n) * 100);
      const a = document.createElement('a');
      a.className = `module-card fam-${badge}`;
      a.href = `fiches.html#groupe-${badge}`;
      a.innerHTML = `
        <div class="module-head">
          <div class="module-icon">${VV.FAMILLE_ICONES[badge] || '\uD83D\uDCDA'}</div>
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

  function render() {
    if (typeof FICHES === 'undefined') return;
    const total = FICHES.length;
    const done = VV.countLues(FICHES);

    renderProgression(done, total);
    setText('stat-fiches', `${done} / ${total}`);

    const best = VV.getExamBest();
    setText('stat-examen', best ? `${best.score} / ${best.total}` : '\u2014');

    renderFamilles();
  }

  const domPret = new Promise(res => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', res);
    else res();
  });
  Promise.all([domPret, window.fichesPretes]).then(render).catch(() => {});

})();

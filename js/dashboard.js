/* =========================================================
   dashboard.js — Accueil (index.html)
   DOIT ÊTRE CHARGÉ APRÈS : core.js, data-fiches.js
   Utilise : FICHES (data-fiches.js), VV (core.js)
   ========================================================= */

(function () {
  'use strict';

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function renderDashboard() {
    const grid = document.getElementById('modules-grid');
    if (!grid || typeof FICHES === 'undefined') return;

    const VV = window.VV;
    const total = FICHES.length;
    const done = VV.countLues(FICHES);
    const pct = total ? Math.round((done / total) * 100) : 0;

    // Anneau de progression
    const CIRC = 339.292;
    const ring = document.getElementById('ring-fg');
    if (ring) {
      ring.style.strokeDasharray = String(CIRC);
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = String(CIRC * (1 - pct / 100));
      });
    }
    setText('dash-pct', pct + '%');

    // Message d'accueil
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

    // Statistiques
    setText('stat-fiches', `${done} / ${total}`);
    const rInf = VV.getBest('infini');
    const rExa = VV.getBest('examen');
    const rRap = VV.getBest('rapide');
    setText('stat-infini', rInf);
    setText('stat-examen', rExa ? `${rExa} / 40` : '\u2014');
    setText('stat-rapide', rRap ? `${rRap} / 5` : '\u2014');

    // Examen avec images (examen.html) : record stocké par page-examen.js
    try {
      const b = JSON.parse(VV.storage.get('vroum-examen-best', 'null'));
      if (b && typeof b.score === 'number' && b.total > 0) {
        setText('stat-examen-img', `${b.score} / ${b.total}`);
      }
    } catch (e) {}

    // Regroupement des fiches par famille
    const familles = new Map();
    FICHES.forEach(f => {
      if (!familles.has(f.badge)) familles.set(f.badge, { nom: f.groupe, fiches: [] });
      familles.get(f.badge).fiches.push(f);
    });

    // Rendu des cartes
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

  document.addEventListener('DOMContentLoaded', renderDashboard);

})();
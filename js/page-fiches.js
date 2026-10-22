/* =========================================================
   page-fiches.js — Liste + détail des fiches (fiches.html)
   DOIT ÊTRE CHARGÉ APRÈS : core.js, data-fiches.js
   Utilise : FICHES (data-fiches.js), window.VV (core.js)
   ========================================================= */

(function renderFiches() {
  const listeBox = document.getElementById('fiches-liste');
  const detailBox = document.getElementById('fiche-detail');
  const groupesBox = document.getElementById('fiches-groupes');
  if (!listeBox || !detailBox || !groupesBox || typeof FICHES === 'undefined') return;

  const VV = window.VV;
  const TITRE_PAGE = document.title;

  /* --- Extrait affiché sur la carte --- */
  function excerpt(f) {
    const labels = f.type === 'table'
      ? f.lignes.map(l => l.label)
      : f.items.map(it => it.label);
    const txt = labels.slice(0, 5).join(', ');
    return txt + (labels.length > 5 ? '\u2026' : '.');
  }

  /* --- Statut d'une fiche --- */
  function statusHTML(done) {
    return done
      ? '<span class="fiche-status done">\u2713 Termin\u00e9e</span>'
      : '<span class="fiche-status todo">\u25CB \u00c0 lire</span>';
  }

  /* =======================================================
     LISTE
     ======================================================= */

  function renderListe() {
    const familles = new Map();
    FICHES.forEach(f => {
      if (!familles.has(f.badge)) familles.set(f.badge, { nom: f.groupe, fiches: [] });
      familles.get(f.badge).fiches.push(f);
    });

    groupesBox.innerHTML = '';
    familles.forEach((fam, badge) => {
      const n = fam.fiches.length;
      const groupe = document.createElement('div');
      groupe.className = `groupe fam-${badge}`;
      groupe.id = `groupe-${badge}`;
      groupe.innerHTML = `
        <div class="groupe-head">
          <div class="groupe-badge">${badge}</div>
          <div class="groupe-title">${fam.nom}</div>
          <div class="groupe-count">${n} FICHE${n > 1 ? 'S' : ''}</div>
        </div>
        <div class="fiches-grid">
          ${fam.fiches.map(f => `
            <a class="fiche-card" href="#${f.id}">
              <div class="fiche-num">${f.num}</div>
              <div class="fiche-body">
                <div class="fiche-title">${f.emoji} ${f.titre}</div>
                <div class="fiche-excerpt">${excerpt(f)}</div>
                ${statusHTML(VV.isLue(f.id))}
              </div>
            </a>`).join('')}
        </div>
      `;
      groupesBox.appendChild(groupe);
    });

    const total = FICHES.length;
    const done = VV.countLues(FICHES);
    document.getElementById('fiches-progress-label').textContent = `${done} / ${total} fiches`;
    document.getElementById('fiches-progress-fill').style.width =
      (total ? Math.round((done / total) * 100) : 0) + '%';
  }

  /* =======================================================
     DÉTAIL
     ======================================================= */

  function renderDetail(f) {
    const i = FICHES.indexOf(f);
    const prev = FICHES[i - 1];
    const next = FICHES[i + 1];

    let body;
    if (f.type === 'table') {
      body = `
        <div class="fiche-table-wrap">
          <table class="fiche-table">
            <thead><tr>${f.colonnes.map(c => `<th>${c}</th>`).join('')}</tr></thead>
            <tbody>
              ${f.lignes.map(l => `
                <tr>
                  <td>${l.label}</td>
                  <td><span class="val">${l.sec}</span></td>
                  <td><span class="val">${l.pluie}</span></td>
                  <td><span class="val">${l.probatoire}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    } else {
      body = `
        <ul class="fiche-list">
          ${f.items.map(it => `
            <li>
              <strong>${it.label}</strong> : ${it.texte}
              ${it.image ? `<br><img src="${it.image}" alt="${it.label}" class="fiche-inline-img" style="max-width:100%; height:auto; margin-top:10px; border-radius:6px;">` : ''}
            </li>
          `).join('')}
        </ul>`;
    }

    const astuce = f.astuce
      ? `<div class="fiche-astuce"><strong>\u00c0 retenir</strong>${f.astuce}</div>`
      : '';

    detailBox.innerHTML = `
      <a href="#" class="fiche-back" id="fiche-back">\u2190 Toutes les fiches</a>
      <article class="fiche-detail fam-${f.badge}">
        <div class="fiche-detail-head">
          <div class="fiche-detail-badge">${f.badge}.${f.num}</div>
          <div>
            <h1>${f.emoji} ${f.titre}</h1>
            <div class="fiche-detail-sub">${f.groupe}${f.sousGroupe ? ' \u00b7 ' + f.sousGroupe : ''}</div>
          </div>
        </div>
        <div class="fiche-detail-body">
          ${body}
          ${astuce}
          <div class="fiche-actions">
            <button type="button" class="btn" id="fiche-toggle"></button>
            <div class="fiche-nav">
              ${prev ? `<a href="#${prev.id}">\u2190 Pr\u00e9c\u00e9dente</a>` : '<span>\u2190 Pr\u00e9c\u00e9dente</span>'}
              ${next ? `<a href="#${next.id}">Suivante \u2192</a>` : '<span>Suivante \u2192</span>'}
            </div>
          </div>
        </div>
      </article>
    `;

    const toggle = document.getElementById('fiche-toggle');
    function paintToggle() {
      const done = VV.isLue(f.id);
      toggle.className = 'btn ' + (done ? 'btn-done' : 'btn-primary');
      toggle.textContent = done ? '\u2713 Fiche termin\u00e9e' : 'Marquer comme termin\u00e9e';
    }
    paintToggle();
    toggle.addEventListener('click', () => {
      VV.toggleLue(f.id);
      paintToggle();
    });
  }

  /* =======================================================
     ROUTAGE PAR HASH
     ======================================================= */

  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    const fiche = FICHES.find(f => f.id === hash);

    if (fiche) {
      renderDetail(fiche);
      listeBox.style.display = 'none';
      detailBox.style.display = '';
      document.title = `${fiche.titre} - VroumVroum`;
      window.scrollTo(0, 0);
      return;
    }

    renderListe();
    detailBox.style.display = 'none';
    listeBox.style.display = '';
    document.title = TITRE_PAGE;

    if (hash.startsWith('groupe-')) {
      const cible = document.getElementById(hash);
      if (cible) {
        const y = cible.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo(0, y);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', route);
  route();
})();

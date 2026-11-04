/* =========================================================
   fiches.js — Liste + détail des fiches (fiches.html)
   À charger APRÈS : core.js, fiches-data.js
   Utilise : FICHES (fiches-data.js), window.VV (core.js)

   Une fiche = { id, groupe, sousGroupe, badge, num, emoji, titre,
                 resume (facultatif), blocs: [ ... ] }
   Blocs : texte | titre | image | liste | tableau | astuce | bouton
   (ancien format type/items/astuce toujours accepté)
   ========================================================= */

window.fichesPretes.then(function renderFiches() {
  const listeBox = document.getElementById('fiches-liste');
  const detailBox = document.getElementById('fiche-detail');
  const groupesBox = document.getElementById('fiches-groupes');
  if (!listeBox || !detailBox || !groupesBox || typeof FICHES === 'undefined') return;

  const VV = window.VV;
  const TITRE_PAGE = document.title;

  /* --- Ancien format -> blocs --- */
  function getBlocs(f) {
    if (Array.isArray(f.blocs)) return f.blocs;
    const blocs = [];
    if (f.type === 'table' && f.lignes) {
      blocs.push({
        tableau: {
          colonnes: f.colonnes,
          lignes: f.lignes.map(l => [l.label, l.sec, l.pluie, l.probatoire])
        }
      });
    } else if (f.items) {
      blocs.push({ liste: f.items });
    }
    if (f.astuce) blocs.push({ astuce: f.astuce });
    return blocs;
  }

  /* --- Extrait affiché sur la carte --- */
  function excerpt(f) {
    if (f.resume) return f.resume;
    let labels = [];
    getBlocs(f).forEach(b => {
      if (b.liste) labels = labels.concat(b.liste.map(it => it.label));
      else if (b.tableau) labels = labels.concat(b.tableau.lignes.map(l => l[0]));
    });
    if (!labels.length) return '';
    const txt = labels.slice(0, 5).join(', ');
    return txt + (labels.length > 5 ? '\u2026' : '.');
  }

  /* --- Statut d'une fiche --- */
  function statusHTML(done) {
    return done
      ? '<span class="fiche-status done">\u2713 Termin\u00e9e</span>'
      : '<span class="fiche-status todo">\u25CB \u00c0 lire</span>';
  }

  /* --- Carte d'une fiche --- */
  function carteHTML(f) {
    return `
      <a class="fiche-card" href="#${f.id}">
        <div class="fiche-num">${f.num}</div>
        <div class="fiche-body">
          <div class="fiche-title">${f.emoji} ${f.titre}</div>
          <div class="fiche-excerpt">${excerpt(f)}</div>
          ${statusHTML(VV.isLue(f.id))}
        </div>
      </a>`;
  }

  /* =======================================================
     LISTE (groupe → sous-groupe → fiches)
     ======================================================= */

  function renderListe() {
    const familles = new Map();
    FICHES.forEach(f => {
      if (!familles.has(f.badge)) {
        familles.set(f.badge, { nom: f.groupe, fiches: [], sous: new Map() });
      }
      const fam = familles.get(f.badge);
      fam.fiches.push(f);
      const cle = f.sousGroupe || '';
      if (!fam.sous.has(cle)) fam.sous.set(cle, []);
      fam.sous.get(cle).push(f);
    });

    groupesBox.innerHTML = '';
    familles.forEach((fam, badge) => {
      const n = fam.fiches.length;
      const groupe = document.createElement('div');
      groupe.className = `groupe fam-${badge}`;
      groupe.id = `groupe-${badge}`;

      let contenu = '';
      fam.sous.forEach((fiches, nomSous) => {
        contenu += `
          <div class="sous-groupe">
            ${nomSous ? `<h3 class="sous-groupe-title">${nomSous}</h3>` : ''}
            <div class="fiches-grid">
              ${fiches.map(carteHTML).join('')}
            </div>
          </div>`;
      });

      groupe.innerHTML = `
        <div class="groupe-head">
          <div class="groupe-badge">${badge}</div>
          <div class="groupe-title">${fam.nom}</div>
          <div class="groupe-count">${n} FICHE${n > 1 ? 'S' : ''}</div>
        </div>
        ${contenu}
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
     BLOCS
     ======================================================= */

  function imgHTML(src, alt) {
    return `<img src="${src}" alt="${alt || ''}" class="fiche-img">`;
  }

  function blocHTML(b) {
    if (b.titre) return `<h2 class="fiche-bloc-titre">${b.titre}</h2>`;

    if (b.texte && !b.liste) return `<p class="fiche-bloc-texte">${b.texte}</p>`;

    if (b.image) {
      return `<div class="fiche-img-wrap">${imgHTML(b.image, b.alt)}</div>`;
    }

    if (b.liste) {
      return `
        <ul class="fiche-list">
          ${b.liste.map(it => `
            <li>
              <strong>${it.label}</strong>${it.texte ? ' : ' + it.texte : ''}
              ${it.image ? `<br>${imgHTML(it.image, it.label)}` : ''}
            </li>`).join('')}
        </ul>`;
    }

    if (b.tableau) {
      const t = b.tableau;
      return `
        <div class="fiche-table-wrap">
          <table class="fiche-table">
            <thead><tr>${t.colonnes.map(c => `<th>${c}</th>`).join('')}</tr></thead>
            <tbody>
              ${t.lignes.map(l => `
                <tr>
                  <td>${l[0]}</td>
                  ${l.slice(1).map(v => `<td><span class="val">${v}</span></td>`).join('')}
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

    if (b.astuce) {
      return `<div class="fiche-astuce"><strong>\u00c0 retenir</strong>${b.astuce}</div>`;
    }

    if (b.bouton) {
      return `
        <div class="fiche-cta">
          <a class="btn btn-primary" href="${b.url}" target="_blank" rel="noopener">${b.bouton} \u2192</a>
        </div>`;
    }

    return '';
  }

  /* =======================================================
     DÉTAIL
     ======================================================= */

  function renderDetail(f) {
    const i = FICHES.indexOf(f);
    const prev = FICHES[i - 1];
    const next = FICHES[i + 1];

    const body = getBlocs(f).map(blocHTML).join('');

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
}).catch(() => {});

/* =========================================================
   RENDU DES FICHES - depuis fiches-data.js
   - Sidebar groupée par famille + sous-groupe
   - Badge coloré par famille
   - Bloc contenu (table ou liste) + encadré astuce
   - Surlignage automatique au scroll
   ========================================================= */

(function renderFiches() {
  const sidebarUl = document.querySelector('.sidebar ul');
  const main = document.querySelector('.fiches-layout main');
  if (!sidebarUl || !main) return;

  /* --- 1. Grouper par famille, puis par sous-groupe --- */
  const familles = {};
  FICHES.forEach(f => {
    const g = f.groupe || 'Autres';
    const sg = f.sousGroupe || '';
    if (!familles[g]) familles[g] = {};
    if (!familles[g][sg]) familles[g][sg] = [];
    familles[g][sg].push(f);
  });

  /* --- 2. Rendre la sidebar + le contenu --- */
  let firstId = null;

  Object.entries(familles).forEach(([nomFamille, sousGroupes]) => {
    // Titre de famille dans la sidebar
    const familleTitle = document.createElement('div');
    familleTitle.className = 'sidebar-groupe';
    familleTitle.innerText = nomFamille;
    sidebarUl.appendChild(familleTitle);

    Object.entries(sousGroupes).forEach(([nomSousGroupe, fiches]) => {
      // Sous-titre dans la sidebar (si présent)
      if (nomSousGroupe) {
        const sgTitle = document.createElement('div');
        sgTitle.className = 'sidebar-sous-groupe';
        sgTitle.innerText = nomSousGroupe;
        sidebarUl.appendChild(sgTitle);
      }

      fiches.forEach(f => {
        if (!firstId) firstId = f.id;

        /* --- Lien sidebar --- */
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="#${f.id}" class="${f.id === firstId ? 'active' : ''}">
            <span class="fiche-badge badge-${f.badge}">${f.badge}</span>
            <span class="fiche-titre-side">${f.titre}</span>
          </a>
        `;
        sidebarUl.appendChild(li);

        /* --- Bloc contenu --- */
        const bloc = document.createElement('div');
        bloc.id = f.id;
        bloc.className = 'fiche-bloc';

        let body = '';
        if (f.type === 'table') {
          body = `
            <table class="fiche-table">
              <thead>
                <tr>${f.colonnes.map(c => `<th>${c}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${f.lignes.map(l => `
                  <tr>
                    <td>${l.label}</td>
                    <td><span class="val">${l.sec}</span></td>
                    <td><span class="val">${l.pluie}</span></td>
                    <td><span class="val">${l.probatoire}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>`;
        } else {
          body = `
            <ul class="fiche-list">
              ${f.items.map(it => `
                <li><strong>${it.label}</strong> : ${it.texte}</li>
              `).join('')}
            </ul>`;
        }

        const astuceHTML = f.astuce
          ? `<div class="fiche-astuce"><strong>À retenir</strong>${f.astuce}</div>`
          : '';

        bloc.innerHTML = `
          <div class="fiche-bloc-header">
            <span class="fiche-bloc-badge badge-${f.badge}">${f.badge}.${f.num}</span>
            <h2>${f.emoji} ${f.titre}</h2>
          </div>
          ${body}
          ${astuceHTML}
        `;
        main.appendChild(bloc);
      });
    });
  });

  /* --- 3. Surlignage actif au scroll --- */
  const links = sidebarUl.querySelectorAll('a');
  const blocs = [...links]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function setActive() {
    if (!blocs.length) return;
    let current = blocs[0];
    const y = window.scrollY + 130;
    for (const b of blocs) if (b.offsetTop <= y) current = b;
    links.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id)
    );
  }

  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('load', setActive);
})();

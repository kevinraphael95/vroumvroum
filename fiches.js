/* =========================================================
   RENDU DES FICHES — depuis fiches-data.js
   - Sidebar groupée par catégorie
   - Bloc contenu (table ou liste) + encadré astuce
   - Surlignage automatique au scroll
   ========================================================= */

(function renderFiches() {
  const sidebarUl = document.querySelector('.sidebar ul');
  const main = document.querySelector('.fiches-layout main');
  if (!sidebarUl || !main) return;

  /* --- 1. Grouper les fiches --- */
  const groupes = {};
  FICHES.forEach(f => {
    const g = f.groupe || 'Autres';
    if (!groupes[g]) groupes[g] = [];
    groupes[g].push(f);
  });

  /* --- 2. Rendre la sidebar + le contenu --- */
  let firstId = null;

  Object.entries(groupes).forEach(([nomGroupe, fiches]) => {
    // Titre de groupe dans la sidebar
    const groupeTitle = document.createElement('div');
    groupeTitle.className = 'sidebar-groupe';
    groupeTitle.innerText = nomGroupe;
    sidebarUl.appendChild(groupeTitle);

    fiches.forEach(f => {
      if (!firstId) firstId = f.id;

      /* --- Lien sidebar --- */
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#${f.id}" class="${f.id === firstId ? 'active' : ''}">
          <span class="fiche-num">${f.num}</span> ${f.titre}
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
              <li><strong>${it.label}</strong> — ${it.texte}</li>
            `).join('')}
          </ul>`;
      }

      const astuceHTML = f.astuce
        ? `<div class="fiche-astuce"><strong>À retenir</strong>${f.astuce}</div>`
        : '';

      bloc.innerHTML = `
        <div class="fiche-bloc-header">
          <span class="fiche-bloc-num">F.${f.num}</span>
          <h2>${f.emoji} ${f.titre}</h2>
        </div>
        ${body}
        ${astuceHTML}
      `;
      main.appendChild(bloc);
    });
  });

  /* --- 3. Surlignage actif au scroll --- */
  const links = sidebarUl.querySelectorAll('a');
  const blocs = [...links].map(a => document.querySelector(a.getAttribute('href')));

  function setActive() {
    let current = blocs[0];
    const y = window.scrollY + 130;
    for (const b of blocs) if (b && b.offsetTop <= y) current = b;
    if (!current) return;
    links.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id)
    );
  }

  window.addEventListener('scroll', setActive);
  window.addEventListener('load', setActive);
})();

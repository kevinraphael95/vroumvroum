/* Génère les fiches depuis fiches-data.js */
(function renderFiches() {
  const sidebarUl = document.querySelector('.sidebar ul');
  const main = document.querySelector('.fiches-layout main');
  if (!sidebarUl || !main) return;

  FICHES.forEach((f, i) => {
    // Sidebar
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="#${f.id}" class="${i === 0 ? 'active' : ''}">
        <span class="fiche-num">${f.num}</span> ${f.titre}
      </a>
    `;
    sidebarUl.appendChild(li);

    // Bloc de contenu
    const bloc = document.createElement('div');
    bloc.id = f.id;
    bloc.className = 'fiche-bloc';

    let body = '';
    if (f.type === 'table') {
      body = `<table class="fiche-table">
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
      </table>`;
    } else {
      body = `<ul class="fiche-list">
        ${f.items.map(it => `<li><strong>${it.label}</strong> — ${it.texte}</li>`).join('')}
      </ul>`;
    }

    bloc.innerHTML = `
      <div class="fiche-bloc-header">
        <span class="fiche-bloc-num">F.${f.num}</span>
        <h2>${f.emoji} ${f.titre}</h2>
      </div>
      ${body}
    `;
    main.appendChild(bloc);
  });

  // Surlignage auto au scroll
  const links = sidebarUl.querySelectorAll('a');
  const blocs = [...links].map(a => document.querySelector(a.getAttribute('href')));

  function setActive() {
    let current = blocs[0];
    const y = window.scrollY + 120;
    for (const b of blocs) if (b && b.offsetTop <= y) current = b;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  }

  window.addEventListener('scroll', setActive);
  window.addEventListener('load', setActive);
})();

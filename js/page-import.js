/* =========================================================
   page-import.js — Import privé de questions (import.html)
   DOIT ÊTRE CHARGÉ APRÈS : core.js, quiz.js
   Utilise : CLE_PERSO, normaliserQuestion, chargerPerso (quiz.js)
   ========================================================= */

(function () {
  const $ = id => document.getElementById(id);
  const msg = t => { $('msg').textContent = t; };

  function brutes() {
    try { const a = JSON.parse(localStorage.getItem(CLE_PERSO) || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function maj() { $('nb').textContent = chargerPerso().length; }

  $('fichier').addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { $('zone').value = r.result; msg('Fichier chargé : clique sur « Ajouter ».'); };
    r.readAsText(f);
  });

  $('btn-ajouter').addEventListener('click', () => {
    let data;
    try { data = JSON.parse($('zone').value); } catch (e) { msg('JSON invalide : ' + e.message); return; }
    if (!Array.isArray(data)) { msg('Il faut un tableau JSON : [ {...}, {...} ]'); return; }

    const existantes = new Set(brutes().map(q => q && q.question));
    const valides = data.map(normaliserQuestion).filter(Boolean);
    const nouvelles = valides.filter(q => !existantes.has(q.question));
    const ignorees = data.length - valides.length;

    try {
      localStorage.setItem(CLE_PERSO, JSON.stringify(brutes().concat(nouvelles)));
    } catch (e) { msg('Enregistrement impossible (stockage plein ou bloqué).'); return; }

    msg(nouvelles.length + ' ajoutée(s), ' + (valides.length - nouvelles.length) + ' doublon(s), ' + ignorees + ' invalide(s) ignorée(s).');
    $('zone').value = '';
    maj();
  });

  $('btn-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(brutes(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ma-banque.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('btn-vider').addEventListener('click', () => {
    if (!confirm('Supprimer toutes tes questions personnelles ?')) return;
    try { localStorage.removeItem(CLE_PERSO); } catch (e) {}
    msg('Banque personnelle vidée.');
    maj();
  });

  maj();
})();
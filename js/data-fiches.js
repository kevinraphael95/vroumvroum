/* =========================================================
   data-fiches.js — Chargeur des fiches de cours
   Les fiches sont dans data/fiches/<FAMILLE>.json (L, C, R…).
   Ce fichier les charge toutes et remplit le tableau global FICHES
   (même format qu'avant, même ordre).

   Pour les pages :
     window.fichesPretes  → Promise résolue quand FICHES est rempli
     FICHES               → tableau des fiches (vide jusqu'à la fin)

   ---------------------------------------------------------
   AJOUTER / MODIFIER UNE FICHE
   ---------------------------------------------------------
   Éditer le JSON de la famille concernée (ex. data/fiches/L.json).
   "id"  = identifiant stable, ne jamais le changer.
   "num" = numéro local à la famille (01, 02…).
   Ajouter une NOUVELLE famille : créer son JSON + ajouter sa lettre
   dans FAMILLES ci-dessous (l'ordre = ordre d'affichage).

   Modèle :
   {
     "id": "mon-id", "groupe": "Nom de la famille", "sousGroupe": "Rubrique",
     "badge": "L", "num": "00", "emoji": "📌", "titre": "Titre",
     "type": "list",
     "items": [ { "label": "Libellé", "texte": "Explication." } ],
     "astuce": "Phrase à retenir."
   }
   ⚠ Ça utilise fetch : ouvrir le site via un serveur (GitHub Pages,
     Live Server, python -m http.server), pas en double-cliquant le HTML.
   ========================================================= */

var FICHES = [];

(function () {
  'use strict';

  var FAMILLES = ['L', 'C', 'R', 'U', 'D', 'A', 'P', 'M', 'S', 'E'];

  function erreur(e) {
    console.error('❌ Chargement des fiches impossible :', e);
    function afficher() {
      var d = document.createElement('div');
      d.setAttribute('role', 'alert');
      d.style.cssText = 'padding:12px 16px;margin:12px;border-radius:8px;background:#fee2e2;color:#991b1b;font:600 14px Inter,sans-serif;';
      d.textContent = 'Impossible de charger les fiches. Ouvre le site via un serveur (pas en double-clic sur le fichier HTML).';
      document.body.insertBefore(d, document.body.firstChild);
    }
    if (document.body) afficher(); else document.addEventListener('DOMContentLoaded', afficher);
  }

  window.fichesPretes = Promise.all(FAMILLES.map(function (f) {
    return fetch('data/fiches/' + f + '.json').then(function (r) {
      if (!r.ok) throw new Error(f + '.json : HTTP ' + r.status);
      return r.json();
    });
  })).then(function (parFamille) {
    parFamille.forEach(function (liste) { Array.prototype.push.apply(FICHES, liste); });
    return FICHES;
  }).catch(function (e) { erreur(e); throw e; });

  window.fichesPretes.catch(function () {}); // évite l'alerte "unhandled rejection"
})();

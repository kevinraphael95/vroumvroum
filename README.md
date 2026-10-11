# VroumVroum

Fiches de révision et quiz d'entraînement pour le Code de la route (ETG).

**Site : https://kevinraphael95.github.io/vroumvroum/**

## Contenu

- **Accueil** : progression globale, fiches terminées, record de série au QCM, parcours par famille.
- **Fiches** : 31 fiches réparties en 10 familles (circulation, conducteur, route, usagers, notions diverses, premiers secours, véhicule, mécanique, sécurité, environnement). Chaque fiche peut être marquée comme terminée.
- **QCM** : 3 modes.
  - Rapide : 5 questions, correction immédiate.
  - Examen blanc : 40 questions, 30 min, correction à la fin (seuil de réussite : 35/40).
  - Infini : on enchaîne jusqu'à la première erreur.
- Thème clair / sombre.

## Lancer en local

Site statique, aucune dépendance. Deux options :

- ouvrir `index.html` dans le navigateur ;
- ou lancer un petit serveur : `python3 -m http.server` puis ouvrir http://localhost:8000.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil (tableau de bord) |
| `fiches.html` + `fiches.js` | Liste des fiches et vue détail |
| `qcm.html` | Choix du mode, quiz, résultat |
| `app.js` | Thème, progression, accueil, logique du QCM |
| `style.css` | Tout le style (variables clair / sombre en haut) |
| `fiches-data.js` | Contenu des fiches |
| `questions-data.js` | Banque de questions |

Ordre des scripts : `fiches-data.js`, puis `app.js`, puis `fiches.js` (`fiches.js` utilise `window.VV` défini dans `app.js`).

## Ajouter une fiche

Dans `fiches-data.js`, ajouter un objet au tableau `FICHES` :

```js
{
  id: "mon-id",                 // unique, sert aussi d'ancre (fiches.html#mon-id)
  groupe: "La circulation routière",
  sousGroupe: "La vitesse",
  badge: "L",                   // lettre de la famille (L C R U D A P M S E)
  num: "32",
  emoji: "⚡",
  titre: "Mon titre",
  type: "list",                 // "list" ou "table"
  items: [ { label: "…", texte: "…" } ],
  astuce: "À retenir…"
}
```

Pour `type: "table"`, utiliser `colonnes` et `lignes` (`label`, `sec`, `pluie`, `probatoire`), comme la fiche `vitesses`.

Un nouveau `badge` (nouvelle famille) demande une couleur : ajouter `.fam-X { --fam: #… }` dans `style.css` et une icône dans `FAMILLE_ICONES` (`app.js`).

## Ajouter une question

Dans `questions-data.js`, ajouter un modèle à `questionTemplates` :

```js
{
  category: "Ma catégorie",
  generate() {
    return buildQuestion("Ma catégorie", "Question ?", "Bonne réponse",
      ["Faux 1", "Faux 2", "Faux 3"], "Explication affichée après la réponse.");
  }
}
```

## Données sauvegardées (localStorage)

| Clé | Contenu |
|---|---|
| `vroum-theme` | `light` ou `dark` |
| `vroum-fiches-lues` | liste des ids de fiches terminées |
| `vroum-best-streak` | meilleure série en mode infini |

Les données restent dans le navigateur : pas de compte, pas de serveur.

## Clavier (QCM)

`1` à `4` pour répondre, `Entrée` ou `Espace` pour continuer, `Échap` pour quitter.

## Sources du contenu

Service-Public.gouv.fr, Sécurité Routière, Codes Rousseau (structure et contenu pédagogique).

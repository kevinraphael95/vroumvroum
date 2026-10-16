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
- **Examen blanc** (page `examen.html`) : test avec images, base de questions séparée du QCM, une ou plusieurs bonnes réponses par question, chrono, correction détaillée à la fin.
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
| `examen.html` + `examen.js` | Page d'examen blanc avec images |
| `examen-data.js` | Base de questions de l'examen (config + questions) |
| `images/examen/` | Images de l'examen |
| `banque-data.js` | Banque de questions du QCM (+ banque perso via `import.html`) |
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

## Ajouter une question d'examen

1. Mettre l'image dans `images/examen/` (svg, png, jpg ou webp).
2. Dans `examen-data.js`, ajouter un objet à `EXAMEN_QUESTIONS` :

```js
{
  id: "ex-011",
  image: "images/examen/ma-photo.jpg",
  alt: "Description courte de l'image",
  fiche: "priorites",           // facultatif : lien « Revoir la fiche »
  question: "Que faites-vous ?",
  reponses: [
    { texte: "Réponse A", correcte: true },
    { texte: "Réponse B", correcte: false },
    { texte: "Réponse C", correcte: true }   // plusieurs bonnes réponses possibles
  ],
  explication: "Facultatif."
}
```

Une question est juste si toutes les bonnes réponses sont cochées et aucune mauvaise. Les 10 questions fournies sont des placeholders. N'utilise que des images dont tu as les droits (les tiennes, ou libres de droits).

## Données sauvegardées (localStorage)

| Clé | Contenu |
|---|---|
| `vroum-theme` | `light` ou `dark` |
| `vroum-fiches-lues` | liste des ids de fiches terminées |
| `vroum-best-streak` | meilleure série en mode infini |
| `vroum-examen-best` | meilleur score de l'examen blanc |
| `vroum-banque-perso` | questions importées via `import.html` (privées) |

Les données restent dans le navigateur : pas de compte, pas de serveur.

## Clavier (QCM)

`1` à `4` pour répondre, `Entrée` ou `Espace` pour continuer, `Échap` pour quitter.

## Sources du contenu

Service-Public.gouv.fr, Sécurité Routière, Codes Rousseau (structure et contenu pédagogique).

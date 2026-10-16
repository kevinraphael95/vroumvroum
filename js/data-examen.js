/* =========================================================
   EXAMEN BLANC : base de questions (page examen.html)

   Séparée du QCM : ces questions n'apparaissent QUE dans l'examen.
   Présentation inspirée de l'examen réel : image en haut, bandeau noir,
   réponses A B C D, minuteur rond par question.

   DEUX TYPES DE QUESTIONS

   1) Choix (type par défaut) : 2 à 4 réponses, lettres A B C D.
      Une ou plusieurs bonnes réponses ("Une réponse" / "Plusieurs
      réponses" s'affiche tout seul selon le nombre de bonnes réponses).
      {
        id: "ex-001",
        image: "images/examen/q01.svg",   // facultatif
        alt: "Description de l'image",
        question: "Énoncé :",
        reponses: [ { texte: "…", correcte: true }, { texte: "…", correcte: false } ],
        explication: "…",                 // facultatif
        fiche: "vitesses",                // facultatif : lien "Revoir la fiche"
        duree: 30                         // facultatif : secondes pour cette question
      }

   2) OUI / NON : 1 ou 2 affirmations, chacune à juger vraie ou fausse
      (OUI = A ou C, NON = B ou D).
      {
        id: "ex-002",
        type: "oui-non",
        image: "…", alt: "…",
        question: "Le véhicule A qui va en face :",
        affirmations: [
          { texte: "doit céder le passage de chaque côté", vrai: true },
          { texte: "bénéficie de la priorité de passage",  vrai: false }
        ],
        explication: "…", fiche: "…"
      }

   Correction : une question est juste si TOUTES les réponses sont justes
   (toutes les bonnes cochées et aucune mauvaise ; chaque affirmation
   OUI/NON bien jugée). Pas de réponse = faux.

   LES 10 QUESTIONS CI-DESSOUS SONT DES PLACEHOLDERS : images
   schématiques dessinées pour l'occasion. Remplace-les par ta base
   (images dans images/examen/, dont tu as les droits).
   ========================================================= */

const EXAMEN_CONFIG = {
  nbQuestions: 40,        // nombre de questions tirées (toutes si la base en a moins)
  dureeQuestionSec: 30,   // temps par question, passage automatique à la suivante
                          // (mets 20 pour être plus strict ; à vérifier avec l'examen réel)
  seuil: 35               // réussite à 35/40 (proportionnel si la base est plus petite)
};

const EXAMEN_QUESTIONS = [

  { id: "ex-001", image: "images/examen/q01.svg", alt: "Panneau triangulaire à bordure rouge avec un point d'exclamation",
    fiche: "signalisation-panneaux",
    question: "Que signale un panneau de cette forme (triangle à bordure rouge) ?",
    reponses: [
      { texte: "Un danger", correcte: true },
      { texte: "Une interdiction", correcte: false },
      { texte: "Une obligation", correcte: false },
      { texte: "Une simple indication", correcte: false }
    ],
    explication: "Les panneaux triangulaires à bordure rouge annoncent un danger." },

  { id: "ex-002", type: "oui-non", image: "images/examen/q02.svg", alt: "Disque rouge avec une barre blanche horizontale",
    fiche: "signalisation-panneaux",
    question: "Ce panneau :",
    affirmations: [
      { texte: "interdit d'entrer dans cette voie", vrai: true },
      { texte: "indique une route prioritaire", vrai: false }
    ],
    explication: "Le disque rouge à barre blanche est le panneau de sens interdit." },

  { id: "ex-003", image: "images/examen/q03.svg", alt: "Panneau octogonal rouge STOP",
    fiche: "panneaux-priorite",
    question: "Vous arrivez à ce panneau. Que devez-vous faire ?",
    reponses: [
      { texte: "M'arrêter complètement à la ligne d'effet", correcte: true },
      { texte: "Ralentir et m'arrêter seulement si un véhicule arrive", correcte: false },
      { texte: "Ralentir sans m'arrêter si la route est libre", correcte: false }
    ],
    explication: "Le Stop impose un arrêt complet à la ligne d'effet, même si aucun autre véhicule n'est visible." },

  { id: "ex-004", type: "oui-non", image: "images/examen/q04.svg", alt: "Route à double sens avec ligne centrale continue ; voiture bleue derrière un véhicule orange",
    fiche: "marquage",
    question: "Vous êtes le véhicule bleu :",
    affirmations: [
      { texte: "je peux dépasser le véhicule orange", vrai: false },
      { texte: "la ligne continue m'interdit de la franchir", vrai: true }
    ],
    explication: "La ligne continue interdit de la franchir ou de la chevaucher." },

  { id: "ex-005", image: "images/examen/q05.svg", alt: "Route à double sens avec ligne centrale discontinue ; voiture bleue derrière un véhicule orange",
    fiche: "croiser-depasser",
    question: "Vous êtes le véhicule bleu. Pour dépasser le véhicule orange, il faut :",
    reponses: [
      { texte: "une visibilité suffisante", correcte: true },
      { texte: "qu'aucun véhicule n'arrive en face", correcte: true },
      { texte: "avoir mis mon clignotant", correcte: true },
      { texte: "avoir klaxonné", correcte: false }
    ],
    explication: "Ligne discontinue, visibilité suffisante, aucun véhicule en face et clignotant : ce sont les conditions du dépassement." },

  { id: "ex-006", type: "oui-non", image: "images/examen/q06.svg", alt: "Carrefour sans signalisation ; votre voiture bleue arrive par le bas, une voiture rouge arrive par la droite",
    fiche: "priorites",
    question: "Il n'y a aucune signalisation. Vous êtes le véhicule bleu :",
    affirmations: [
      { texte: "je dois céder le passage au véhicule rouge", vrai: true },
      { texte: "je bénéficie de la priorité de passage", vrai: false }
    ],
    explication: "Sans signalisation ni marquage, c'est la priorité à droite." },

  { id: "ex-007", image: "images/examen/q07.svg", alt: "Carrefour à sens giratoire ; votre voiture bleue attend à l'entrée, une voiture rouge circule dans l'anneau",
    fiche: "giratoire",
    question: "Vous êtes le véhicule bleu à l'entrée du giratoire :",
    reponses: [
      { texte: "je cède le passage au véhicule dans l'anneau", correcte: true },
      { texte: "je m'engage : j'arrive par la droite", correcte: false },
      { texte: "je mets mon clignotant à droite et je m'engage", correcte: false }
    ],
    explication: "Priorité aux véhicules déjà engagés sur l'anneau. Le clignotant à droite se met pour sortir, jamais pour entrer." },

  { id: "ex-008", image: "images/examen/q08.svg", alt: "Deux voitures à la suite sur une route, avec une flèche entre elles",
    fiche: "vitesse-consequences",
    question: "Quelle distance de sécurité minimale laisser avec le véhicule qui vous précède ?",
    reponses: [
      { texte: "au moins 2 secondes", correcte: true },
      { texte: "1 seconde", correcte: false },
      { texte: "une longueur de voiture", correcte: false }
    ],
    explication: "Distance de sécurité = règle des 2 secondes. Elle augmente sur route mouillée." },

  { id: "ex-009", image: "images/examen/q09.svg", alt: "Véhicule arrêté sur la bande d'arrêt d'urgence avec les feux de détresse allumés",
    fiche: "autoroute",
    question: "Votre véhicule est en panne sur la bande d'arrêt d'urgence d'une autoroute :",
    reponses: [
      { texte: "j'allume mes feux de détresse", correcte: true },
      { texte: "je mets un gilet de sécurité", correcte: true },
      { texte: "je me mets avec les passagers derrière la glissière", correcte: true },
      { texte: "je reste dans le véhicule, ceinture attachée", correcte: false }
    ],
    explication: "En cas de panne sur autoroute : warning, gilet, et se mettre à l'abri derrière la glissière." },

  { id: "ex-010", image: "images/examen/q10.svg", alt: "Feu tricolore avec le feu orange allumé",
    fiche: "feux-agents",
    question: "Le feu passe à l'orange fixe alors que vous approchez :",
    reponses: [
      { texte: "je m'arrête, sauf si je ne peux plus le faire en sécurité", correcte: true },
      { texte: "j'accélère pour passer avant le rouge", correcte: false },
      { texte: "je passe : l'orange autorise toujours le passage", correcte: false }
    ],
    explication: "L'orange fixe impose l'arrêt, sauf si le conducteur ne peut plus s'arrêter dans des conditions de sécurité suffisantes." }
];

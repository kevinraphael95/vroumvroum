/* =========================================================
   EXAMEN BLANC : base de questions (page examen.html)

   Séparée du QCM : ces questions n'apparaissent QUE dans l'examen.

   Chaque question :
     id          unique ("ex-001")
     image       chemin de l'image, ex. "images/examen/q01.svg"
                 (facultatif ; .svg, .png, .jpg, .webp acceptés)
     alt         description courte de l'image (accessibilité)
     question    énoncé
     reponses    liste de { texte, correcte }
                 -> 2 à 4 réponses, UNE OU PLUSIEURS correctes
     explication affichée à la correction (facultatif)
     fiche       id d'une fiche, pour le lien "Revoir la fiche" (facultatif)

   Correction : une question est juste si on coche TOUTES les bonnes
   réponses et AUCUNE mauvaise.

   LES 10 QUESTIONS CI-DESSOUS SONT DES PLACEHOLDERS : images
   schématiques dessinées pour l'occasion. Remplace-les par ta base
   (images dans images/examen/).
   ========================================================= */

const EXAMEN_CONFIG = {
  nbQuestions: 40,   // nombre de questions tirées (toutes si la base en a moins)
  dureeSec: 30 * 60, // 30 minutes
  seuil: 35          // réussite à 35/40 (proportionnel si la base est plus petite)
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

  { id: "ex-002", image: "images/examen/q02.svg", alt: "Disque rouge avec une barre blanche horizontale",
    fiche: "signalisation-panneaux",
    question: "Que signifie ce panneau ?",
    reponses: [
      { texte: "Il est interdit d'entrer dans cette voie", correcte: true },
      { texte: "Fin de toutes les interdictions", correcte: false },
      { texte: "Route sans issue", correcte: false },
      { texte: "Vous êtes sur une route prioritaire", correcte: false }
    ],
    explication: "Le disque rouge à barre blanche est le panneau de sens interdit." },

  { id: "ex-003", image: "images/examen/q03.svg", alt: "Panneau octogonal rouge STOP",
    fiche: "panneaux-priorite",
    question: "Vous arrivez à ce panneau. Que devez-vous faire ?",
    reponses: [
      { texte: "M'arrêter complètement à la ligne d'effet", correcte: true },
      { texte: "Ralentir et m'arrêter seulement si un véhicule arrive", correcte: false },
      { texte: "Ralentir sans m'arrêter si la route est libre", correcte: false },
      { texte: "Klaxonner et passer", correcte: false }
    ],
    explication: "Le Stop impose un arrêt complet à la ligne d'effet, même si aucun autre véhicule n'est visible." },

  { id: "ex-004", image: "images/examen/q04.svg", alt: "Route à double sens avec ligne centrale continue ; voiture bleue derrière un véhicule orange",
    fiche: "marquage",
    question: "Vous êtes le véhicule bleu et souhaitez dépasser le véhicule orange. Est-ce possible ?",
    reponses: [
      { texte: "Non, la ligne continue l'interdit", correcte: true },
      { texte: "Oui, si je mets mon clignotant", correcte: false },
      { texte: "Oui, si la route est dégagée", correcte: false },
      { texte: "Oui, car le véhicule orange est lent", correcte: false }
    ],
    explication: "La ligne continue interdit de la franchir ou de la chevaucher." },

  { id: "ex-005", image: "images/examen/q05.svg", alt: "Route à double sens avec ligne centrale discontinue ; voiture bleue derrière un véhicule orange",
    fiche: "croiser-depasser",
    question: "Vous êtes le véhicule bleu. Quelles conditions doivent être réunies pour dépasser le véhicule orange ?",
    reponses: [
      { texte: "Une visibilité suffisante", correcte: true },
      { texte: "Aucun véhicule en face", correcte: true },
      { texte: "Avoir mis mon clignotant", correcte: true },
      { texte: "Avoir klaxonné", correcte: false }
    ],
    explication: "Ligne discontinue, visibilité suffisante, aucun véhicule en face et clignotant : ce sont les conditions du dépassement." },

  { id: "ex-006", image: "images/examen/q06.svg", alt: "Carrefour sans signalisation ; votre voiture bleue arrive par le bas, une voiture rouge arrive par la droite",
    fiche: "priorites",
    question: "Il n'y a aucune signalisation. Vous êtes le véhicule bleu. Qui doit passer en premier ?",
    reponses: [
      { texte: "Le véhicule rouge, qui vient de ma droite", correcte: true },
      { texte: "Moi, car je vais tout droit", correcte: false },
      { texte: "Le véhicule le plus rapide", correcte: false },
      { texte: "Celui qui klaxonne en premier", correcte: false }
    ],
    explication: "Sans signalisation ni marquage, c'est la priorité à droite." },

  { id: "ex-007", image: "images/examen/q07.svg", alt: "Carrefour à sens giratoire ; votre voiture bleue attend à l'entrée, une voiture rouge circule dans l'anneau",
    fiche: "giratoire",
    question: "Vous êtes le véhicule bleu à l'entrée du giratoire. Que faites-vous ?",
    reponses: [
      { texte: "Je cède le passage au véhicule déjà engagé dans l'anneau", correcte: true },
      { texte: "Je m'engage : j'arrive par la droite, donc je suis prioritaire", correcte: false },
      { texte: "Je mets mon clignotant à droite et je m'engage sans attendre", correcte: false },
      { texte: "Je klaxonne pour prévenir et je passe", correcte: false }
    ],
    explication: "Priorité aux véhicules déjà engagés sur l'anneau. Le clignotant à droite se met pour sortir, jamais pour entrer." },

  { id: "ex-008", image: "images/examen/q08.svg", alt: "Deux voitures à la suite sur une route, avec une flèche entre elles",
    fiche: "vitesse-consequences",
    question: "Quelle distance de sécurité minimale laisser avec le véhicule qui vous précède ?",
    reponses: [
      { texte: "Au moins 2 secondes", correcte: true },
      { texte: "1 seconde", correcte: false },
      { texte: "Une longueur de voiture", correcte: false },
      { texte: "5 mètres, quelle que soit la vitesse", correcte: false }
    ],
    explication: "Distance de sécurité = règle des 2 secondes (distance de réaction × 2). Elle augmente sur route mouillée." },

  { id: "ex-009", image: "images/examen/q09.svg", alt: "Véhicule arrêté sur la bande d'arrêt d'urgence avec les feux de détresse allumés",
    fiche: "autoroute",
    question: "Votre véhicule est en panne sur la bande d'arrêt d'urgence d'une autoroute. Que faites-vous ?",
    reponses: [
      { texte: "J'allume mes feux de détresse", correcte: true },
      { texte: "Je mets un gilet de sécurité", correcte: true },
      { texte: "Je me mets avec les passagers derrière la glissière", correcte: true },
      { texte: "Je reste dans le véhicule, ceinture attachée", correcte: false }
    ],
    explication: "En cas de panne sur autoroute : warning, gilet, et se mettre à l'abri derrière la glissière." },

  { id: "ex-010", image: "images/examen/q10.svg", alt: "Feu tricolore avec le feu orange allumé",
    fiche: "feux-agents",
    question: "Le feu passe à l'orange fixe alors que vous approchez. Que faites-vous ?",
    reponses: [
      { texte: "Je m'arrête, sauf si je ne peux plus le faire en sécurité", correcte: true },
      { texte: "J'accélère pour passer avant le rouge", correcte: false },
      { texte: "Je passe : l'orange autorise toujours le passage", correcte: false },
      { texte: "Je klaxonne et je passe", correcte: false }
    ],
    explication: "L'orange fixe impose l'arrêt, sauf si le conducteur ne peut plus s'arrêter dans des conditions de sécurité suffisantes." }
];

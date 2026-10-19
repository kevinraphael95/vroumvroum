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
        image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/q01.svg",   // facultatif
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
   ========================================================= */

const EXAMEN_CONFIG = {
  nbQuestions: 40,        // nombre de questions tirées (toutes si la base en a moins)
  dureeQuestionSec: 30,   // temps par question, passage automatique à la suivante
                          // (mets 20 pour être plus strict ; à vérifier avec l'examen réel)
  seuil: 35               // réussite à 35/40 (proportionnel si la base est plus petite)
};

const EXAMEN_QUESTIONS = [

  { id: "A01", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A01.png", alt: "Parking", fiche: "stationnement",
    question: "Dans ce parking, le stationnement est :",
    reponses: [
      { texte: "gratuit", correcte: true },
      { texte: "payant", correcte: false },
      { texte: "à durée limitée", correcte: false }
    ],
    explication: "Le panneau indique que le stationnement est gratuit à cet endroit." },

  { id: "A02", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A02.png", alt: "Conduite et téléphone", fiche: "conducteur",
    question: "La lecture d'un SMS ou d'une notification en conduisant multiplie le risque d'accident par :",
    reponses: [
      { texte: "5", correcte: false },
      { texte: "10", correcte: false },
      { texte: "23", correcte: true }
    ],
    explication: "Lire un SMS au volant multiplie par 23 le risque d'accident." },

  { id: "A03", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A03.png", alt: "Passage à niveau", fiche: "zones-dangereuses",
    question: "La barrière du passage à niveau est endommagée, j'utilise ce téléphone :",
    reponses: [
      { texte: "OUI", correcte: true },
      { texte: "NON", correcte: false }
    ],
    explication: "Oui, il faut utiliser la borne d'appel du passage à niveau pour signaler le problème." },

  { id: "A04", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A04.png", alt: "Véhicule électrique", fiche: "ecomobilite",
    question: "L'autonomie d'un véhicule électrique varie en fonction :",
    affirmations: [
      { texte: "du style de conduite", vrai: true },
      { texte: "du niveau de charge de la batterie de traction", vrai: true }
    ],
    explication: "L'autonomie dépend du style de conduite et du niveau de charge de la batterie." },

  { id: "A05", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A05.png", alt: "Dépassement d'un piéton", fiche: "autres-usagers",
    question: "En dépassant, le conducteur de ce véhicule risque de ne pas détecter le piéton / Le piéton s'assure d'avoir été vu avant de s'engager :",
    affirmations: [
      { texte: "En dépassant, le conducteur risque de ne pas détecter le piéton", vrai: true },
      { texte: "Le piéton s'assure d'avoir été vu avant de s'engager", vrai: true }
    ],
    explication: "Le dépassement masque la vue du piéton. Le piéton doit toujours s'assurer d'être vu." },

  { id: "A06", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A06.png", alt: "Dégivrage pare-brise", fiche: "conditions-difficiles",
    question: "Afin de dégivrer le pare-brise, il est préférable :",
    reponses: [
      { texte: "d'enclencher le désembuage et d'utiliser un grattoir", correcte: true },
      { texte: "de verser de l'eau chaude", correcte: false }
    ],
    explication: "Ne jamais verser d'eau chaude sur un pare-brise gelé (risque de casse)." },

  { id: "A07", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A07.png", alt: "Clignotant", fiche: "circuler-communication",
    question: "Souhaitant s'engager dans la circulation, l'automobiliste a actionné son clignotant gauche au bon moment :",
    reponses: [
      { texte: "OUI", correcte: false },
      { texte: "NON", correcte: true }
    ],
    explication: "Le clignotant gauche ne doit pas être actionné trop tôt." },

  { id: "A08", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A08.png", alt: "Témoin d'alerte", fiche: "voyants",
    question: "L'allumage de ce témoin m'impose l'arrêt. J'allume les feux de détresse :",
    reponses: [
      { texte: "immédiatement", correcte: false },
      { texte: "après avoir ralenti", correcte: true },
      { texte: "une fois sur la bande d'arrêt d'urgence", correcte: true }
    ],
    explication: "On ralentit d'abord, puis on allume les feux de détresse." },

  { id: "A09", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A09.png", alt: "Virage", fiche: "conditions-difficiles",
    question: "Ce virage représente une zone de danger potentiel / Je peux y découvrir :",
    affirmations: [
      { texte: "Ce virage représente une zone de danger potentiel", vrai: true },
      { texte: "Je peux y découvrir un usager vulnérable", vrai: true }
    ],
    explication: "Dans un virage sans visibilité, on peut découvrir un usager vulnérable." },

  { id: "A10", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A10.png", alt: "Voie de covoiturage", fiche: "circuler-regles",
    question: "Ce panneau indique une voie réservée / Si je covoiture, je peux emprunter cette voie :",
    affirmations: [
      { texte: "Ce panneau indique une voie réservée", vrai: true },
      { texte: "Si je covoiture, je peux emprunter cette voie", vrai: false }
    ],
    explication: "La voie est réservée, le covoiturage n'y est pas forcément autorisé." },

  { id: "A11", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A11.png", alt: "Étiquette énergie", fiche: "choisir-vehicule",
    question: "À l'achat d'un véhicule neuf, une étiquette énergie m'informe :",
    reponses: [
      { texte: "de la consommation moyenne en énergie", correcte: true },
      { texte: "du niveau des émissions de CO2", correcte: true },
      { texte: "du prix du véhicule", correcte: false }
    ],
    explication: "L'étiquette énergie renseigne sur la consommation et les émissions de CO2." },

  { id: "A12", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A12.png", alt: "Formation post-permis", fiche: "permis-points",
    question: "La formation complémentaire post permis permet :",
    affirmations: [
      { texte: "de récupérer des points perdus", vrai: false },
      { texte: "de réduire la durée de la période probatoire", vrai: true }
    ],
    explication: "La formation post-permis réduit la période probatoire, mais ne permet pas de récupérer des points." },

  { id: "A13", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A13.png", alt: "Priorité", fiche: "priorites",
    question: "Le conducteur de ce véhicule désire se garer. Il a la priorité sur le motard :",
    reponses: [
      { texte: "OUI", correcte: false },
      { texte: "NON", correcte: true }
    ],
    explication: "Le motard est déjà sur la chaussée." },

  { id: "A14", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A14.png", alt: "Allure réduite", fiche: "conducteur",
    question: "Une allure anormalement réduite / J'actionne les feux de détresse :",
    affirmations: [
      { texte: "peut surprendre les autres usagers", vrai: true },
      { texte: "J'actionne les feux de détresse", vrai: true }
    ],
    explication: "Une allure anormalement réduite doit être signalée par les feux de détresse." },

  { id: "A15", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A15.png", alt: "Tourner à gauche", fiche: "priorites",
    question: "Pour tourner à gauche à cette intersection, je passe :",
    reponses: [
      { texte: "avant ce véhicule", correcte: false },
      { texte: "après ce véhicule", correcte: true }
    ],
    explication: "Je cède le passage au véhicule venant en face." },

  { id: "A16", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A16.png", alt: "Pneus neige", fiche: "equipements",
    question: "En période hivernale, si mon véhicule n'est pas équipé de 4 pneus neige, j'ai l'obligation d'avoir des chaînes à neige à bord :",
    reponses: [
      { texte: "OUI", correcte: true },
      { texte: "NON", correcte: false }
    ],
    explication: "Dans certaines zones montagneuses, les chaînes sont obligatoires." },

  { id: "A17", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A17.png", alt: "ESP", fiche: "securite",
    question: "L'ESP permet :",
    affirmations: [
      { texte: "de passer plus vite en virage", vrai: false },
      { texte: "de réduire les distances de sécurité", vrai: false }
    ],
    explication: "L'ESP est un correcteur de trajectoire, il ne permet pas de rouler plus vite." },

  { id: "A18", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A18.png", alt: "Allure adaptée", fiche: "vitesse-consequences",
    question: "Mon allure est adaptée à la situation / Je me décale le plus à droite possible :",
    affirmations: [
      { texte: "Mon allure est adaptée à la situation", vrai: false },
      { texte: "Je me décale le plus à droite possible", vrai: true }
    ],
    explication: "Il faut adapter sa vitesse et se décaler pour laisser passer." },

  { id: "A19", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A19.png", alt: "Trappe à carburant", fiche: "mecanique",
    question: "La trappe à carburant est toujours située à droite :",
    reponses: [
      { texte: "OUI", correcte: false },
      { texte: "NON", correcte: true }
    ],
    explication: "La trappe à carburant peut être à gauche ou à droite selon les modèles." },

  { id: "A20", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A20.png", alt: "Temps de réaction", fiche: "vitesse-consequences",
    question: "Pour évaluer la distance parcourue pendant le temps de réaction à 50 km/h, il faut multiplier 5 par :",
    reponses: [
      { texte: "3", correcte: true },
      { texte: "5", correcte: false },
      { texte: "6", correcte: false }
    ],
    explication: "Formule : (vitesse / 10) x 3." },

  { id: "A21", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A21.png", alt: "Signaux sonores", fiche: "zones-dangereuses",
    question: "Selon la distance avec l'obstacle, les signaux sonores et visuels varient :",
    reponses: [
      { texte: "OUI", correcte: true },
      { texte: "NON", correcte: false }
    ],
    explication: "La fréquence des signaux augmente à mesure qu'on s'approche." },

  { id: "A22", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A22.png", alt: "Tramway", fiche: "priorites",
    question: "Le tramway venant de passer, le conducteur de cette voiture :",
    reponses: [
      { texte: "peut s'engager même si le feu est toujours clignotant", correcte: false },
      { texte: "doit attendre", correcte: true }
    ],
    explication: "Le feu clignotant impose d'attendre." },

  { id: "A23", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A23.png", alt: "Klaxon", fiche: "circuler-communication",
    question: "Klaxonner en ville est autorisé :",
    reponses: [
      { texte: "pour inciter un conducteur à démarrer plus vite", correcte: false },
      { texte: "pour empêcher la traversée d'un piéton", correcte: false },
      { texte: "en cas de danger immédiat", correcte: true },
      { texte: "avant de dépasser un cycliste", correcte: false }
    ],
    explication: "En agglomération, le klaxon est interdit sauf danger immédiat." },

  { id: "A24", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A24.png", alt: "Cyclistes au feu", fiche: "feux-agents",
    question: "Les cyclistes peuvent tourner à droite :",
    reponses: [
      { texte: "uniquement lorsque le feu est vert", correcte: false },
      { texte: "même lorsque le feu est rouge", correcte: true }
    ],
    explication: "Un panonceau permet aux cyclistes de tourner à droite au feu rouge." },

  { id: "A25", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A25.png", alt: "Panneau de danger", fiche: "signalisation-risques",
    question: "Le danger annoncé :",
    reponses: [
      { texte: "commence à 150 m", correcte: true },
      { texte: "commence à 500 m", correcte: false },
      { texte: "s'étend sur 150 m", correcte: false },
      { texte: "s'étend sur 500 m", correcte: true }
    ],
    explication: "Le panonceau indique un danger qui commence à 150m et s'étend sur 500m." },

  { id: "A26", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A26.png", alt: "Feux de recul", fiche: "autres-usagers",
    question: "L'allumage des feux de recul est un indicateur du risque de manœuvre / Son conducteur voit très bien le motard arriver :",
    affirmations: [
      { texte: "L'allumage des feux de recul est un indicateur du risque de manœuvre", vrai: true },
      { texte: "Son conducteur voit très bien le motard arriver", vrai: false }
    ],
    explication: "Les feux de recul indiquent une manœuvre. Le motard est dans l'angle mort." },

  { id: "A27", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A27.png", alt: "Aide au maintien dans la voie", fiche: "securite",
    question: "L'aide au maintien dans la voie / permet de conduire sans tenir le volant :",
    affirmations: [
      { texte: "fonctionne dans toutes les situations", vrai: false },
      { texte: "permet de conduire sans tenir le volant", vrai: false }
    ],
    explication: "C'est une aide, pas un pilotage automatique." },

  { id: "A28", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A28.png", alt: "Véhicule bien placé", fiche: "circuler-regles",
    question: "Dans cette situation, ce véhicule est bien placé :",
    reponses: [
      { texte: "OUI", correcte: false },
      { texte: "NON", correcte: true }
    ],
    explication: "Le véhicule n'est pas correctement placé sur la chaussée." },

  { id: "A29", type: "oui-non", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A29.png", alt: "Trottinette", fiche: "autres-usagers",
    question: "Utilisateur d'une trottinette non motorisée, cet enfant est assimilé à un piéton / Il doit circuler sur le trottoir :",
    affirmations: [
      { texte: "Utilisateur d'une trottinette non motorisée, cet enfant est assimilé à un piéton", vrai: true },
      { texte: "Il doit circuler sur le trottoir", vrai: true }
    ],
    explication: "Une trottinette non motorisée est assimilée à un piéton." },

  { id: "A30", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A30.png", alt: "Priorité à droite", fiche: "priorites",
    question: "Dans cette situation, le véhicule A cède le passage au véhicule B :",
    reponses: [
      { texte: "OUI", correcte: true },
      { texte: "NON", correcte: false }
    ],
    explication: "Le véhicule B vient de la droite." },

  { id: "A31", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A31.png", alt: "Disque de stationnement", fiche: "stationnement",
    question: "Un disque de stationnement est obligatoire pour stationner sur l'emplacement :",
    reponses: [
      { texte: "A", correcte: false },
      { texte: "B", correcte: true }
    ],
    explication: "L'emplacement B est en zone bleue." },

  { id: "A32", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A32.png", alt: "Appel téléphonique", fiche: "conducteur",
    question: "Pour passer un appel, j'utilise de préférence :",
    reponses: [
      { texte: "la numérotation manuelle sur l'écran", correcte: false },
      { texte: "la commande vocale", correcte: true }
    ],
    explication: "La commande vocale permet de garder les mains sur le volant." },

  { id: "A33", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A33.png", alt: "Distance de sécurité", fiche: "vitesse-consequences",
    question: "À 130 km/h, sur autoroute, un intervalle de sécurité de 2 secondes correspond à :",
    reponses: [
      { texte: "1 trait de la bande d'arrêt d'urgence", correcte: false },
      { texte: "2 traits de la bande d'arrêt d'urgence", correcte: true },
      { texte: "3 traits de la bande d'arrêt d'urgence", correcte: false }
    ],
    explication: "En respectant 2 secondes, on laisse environ 2 traits." },

  { id: "A34", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A34.png", alt: "Camion", fiche: "autres-usagers",
    question: "Pour être vu du conducteur du camion je dois :",
    reponses: [
      { texte: "me rapprocher du poids lourd", correcte: false },
      { texte: "m'éloigner du poids lourd", correcte: true },
      { texte: "me décaler légèrement sur ma voie", correcte: true }
    ],
    explication: "Il faut sortir de l'angle mort du camion." },

  { id: "A35", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A35.png", alt: "Signalisation marchandises", fiche: "signalisation-panneaux",
    question: "Cette signalisation concerne les véhicules affectés au transport de marchandises :",
    reponses: [
      { texte: "de plus de 3,5 tonnes seulement", correcte: false },
      { texte: "peu importe leur poids", correcte: true }
    ],
    explication: "Le panneau s'applique à tous les véhicules de transport de marchandises." },

  { id: "A36", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A36.png", alt: "Liquide de refroidissement", fiche: "mecanique",
    question: "Il est préférable que le niveau de liquide de refroidissement se situe :",
    reponses: [
      { texte: "légèrement en-dessous du repère maximum", correcte: true },
      { texte: "légèrement en-dessous du repère minimum", correcte: false }
    ],
    explication: "Le niveau doit être entre le minimum et le maximum." },

  { id: "A37", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A37.png", alt: "Panne sur autoroute", fiche: "autoroute",
    question: "Sur autoroute, en cas de panne, j'emmène les passagers :",
    reponses: [
      { texte: "derrière la glissière de sécurité", correcte: true },
      { texte: "devant le véhicule", correcte: false }
    ],
    explication: "En cas de panne sur autoroute, il faut se mettre à l'abri." },

  { id: "A38", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A38.png", alt: "Fatigue au volant", fiche: "etat-physique",
    question: "Lors d'un long trajet, je limite la fatigue :",
    reponses: [
      { texte: "en évitant de consommer un médicament comportant un pictogramme", correcte: true },
      { texte: "en partant entre 2 h et 4 h du matin", correcte: false },
      { texte: "en circulant au-dessus des limitations de vitesse", correcte: false },
      { texte: "en faisant une pause toutes les 2 heures", correcte: true }
    ],
    explication: "Éviter les médicaments dangereux et faire des pauses régulières." },

  { id: "A39", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A39.png", alt: "Véhicule électrique recharge", fiche: "ecomobilite",
    question: "Avant de faire un long trajet en véhicule électrique, je vérifie la charge de la batterie :",
    reponses: [
      { texte: "OUI", correcte: true },
      { texte: "NON", correcte: false }
    ],
    explication: "Il est indispensable de vérifier et planifier ses recharges." },

  { id: "A40", image: "https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/A40.png", alt: "Bande cyclable", fiche: "stationnement",
    question: "Un arrêt sur une bande cyclable :",
    reponses: [
      { texte: "peut mettre ce cycliste en danger", correcte: true },
      { texte: "doit être signalé par des feux de détresse", correcte: false },
      { texte: "est passible d'une contravention", correcte: true }
    ],
    explication: "S'arrêter sur une bande cyclable met les cyclistes en danger et est sanctionné." }
];

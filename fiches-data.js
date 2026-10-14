/* =========================================================
   CONTENU DES FICHES DE COURS.
   Source unique pour fiches.html (rendu via fiches.js).

   ---------------------------------------------------------
   COMMENT AJOUTER / MODIFIER UNE FICHE
   ---------------------------------------------------------
   1. Repérer la rubrique dans le SOMMAIRE ci-dessous.
   2. Ajouter la fiche dans sa famille, à la bonne place.
   3. "num" = numéro LOCAL à la famille (L01, L02… M01, M02…).
      Insertion au milieu : on ne renumérote que cette famille.
   4. "id" = identifiant stable, jamais lié au numéro. Ne pas le changer.
   5. Mettre à jour la ligne correspondante du SOMMAIRE.

   Modèle à copier :
   {
     id: "mon-id",
     groupe: "Nom de la famille",
     sousGroupe: "Nom de la rubrique",
     badge: "L",
     num: "00",
     emoji: "📌",
     titre: "Titre de la fiche",
     type: "list",
     items: [
       { label: "Libellé", texte: "Explication." }
     ],
     astuce: "Phrase à retenir."
   },

   ---------------------------------------------------------
   SOMMAIRE
   ---------------------------------------------------------

   L - LA CIRCULATION ROUTIÈRE
    La signalisation routière
     Les panneaux ................................................ L01
     Quelques risques à connaître ................................ L02
     La signalisation temporaire ................................. L03
     Les panneaux de direction ................................... L04
     Le marquage au sol .......................................... L05
    Les intersections
     Aborder une intersection .................................... L06
     Les panneaux de priorité .................................... L07
     Intersections complexes, agglomération, voie d'accélération .. L08
     Les carrefours à sens giratoire ............................. L09
     Les feux, combinaison feux + panneaux, signes des agents .... L10
    Circuler
     Les règles générales ........................................ L11
     Les changements de direction ................................ L11
     Tourner à droite ............................................ L11
     Tourner à gauche ............................................ L11
    La vitesse
     Limitations de vitesse ...................................... L12
     Ajustement de la vitesse .................................... L13
     Conséquences de la vitesse .................................. L13
     Contrôle des vitesses ....................................... L13
    Croiser et dépasser
     Se croiser .................................................. L14
     Croisements difficiles ...................................... L14
     Dépasser .................................................... L15
     Conditions indispensables pour dépasser ..................... L15
     Dépassements difficiles ..................................... L15
     Comment dépasser en toute sécurité .......................... L15
     Dépassements par la droite .................................. L15
     Être dépassé ................................................ L15
    Stationner ou s'arrêter
     La signalisation d'interdiction ............................. L16
     Stationnement payant ou gratuit contrôlé par disque ......... L16
     Stationnement unilatéral à alternance semi-mensuelle ........ L16
     Où stationner en ville ...................................... L16
     Où stationner sur route ..................................... L16

   C - LE CONDUCTEUR
    Conduire
     Qu'est-ce que conduire ? .................................... C01
     L'exploration visuelle ...................................... C01
     Stratégie de conduite ....................................... C01
     Les situations à risque ..................................... C01
     Conduire pour soi et pour les autres ........................ C01
     Communiquer avec les autres ................................. C02
     Maintenir des intervalles de sécurité ....................... C01
     S'arrêter à temps ........................................... C01
    Être en état de conduire
     Évaluer son état physique ................................... C03
     La vue du conducteur ........................................ C03
     L'ouïe ...................................................... C03
     La prise de médicaments ..................................... C04
     La prise de drogues ......................................... C04
     L'alcool .................................................... C04
     La vigilance ................................................ C05
     La somnolence ............................................... C05
     Évaluer son état psychologique .............................. C05

   R - LA ROUTE
    Conduire dans des conditions difficiles
     Nuit, pluie, brouillard ..................................... R01
     Neige, verglas, vent, soleil ................................ R01
    Conduire sur autoroute
     La signalisation, les règles de circulation ................. R02
     Vitesse, distance de sécurité, dépassements ................. R02
     Comportements ............................................... R02
    La traversée de zones dangereuses
     Chantiers routiers, tunnels ................................. R03
     Passages à niveau, tramways ................................. R03

   U - LES AUTRES USAGERS
    Le partage de la rue
     Une nouvelle organisation de l'espace public ................ U01
    Les spécificités des autres usagers
     Piétons, cyclistes, EDPM, deux-roues motorisés .............. U02
     Véhicules d'urgence, convois exceptionnels, guidage ......... U02
     Véhicules encombrants, véhicules lents ...................... U02
     Les bus, les autocars ....................................... U02

   D - LES NOTIONS DIVERSES
    Les documents administratifs
     Documents obligatoires, facultatifs, assurance .............. D01
    Le chargement
     Bagages, objets encombrants ................................. D02
     Remorques et caravanes, tracter une remorque ................ D02
     Le transport des passagers, les animaux ..................... D02
    Le permis à points
     Capital initial et probatoire, parcours à 12 points ......... D03
     Perte de points, reconstitution, invalidation ............... D03
    Les infractions
     Retrait immédiat, contraventions, délits .................... D04

   A - LES PREMIERS SECOURS
    Protéger et alerter
     La protection, l'alerte ..................................... A01
     L'accident de la route ...................................... A02
    Alerte et protection des populations
     Alerte et protection des populations ........................ A03
    Les premiers secours
     Hémorragie, traumatisme ..................................... A04
     La perte de connaissance, l'arrêt cardiaque ................. A04
     Présentation des formations ................................. A04

   P - PRENDRE ET QUITTER SON VÉHICULE
    S'installer au poste de conduite
     Être à l'aise, être bien assis .............................. P01
     Avoir une visibilité optimale, ajuster la ceinture .......... P01
    Entrer et sortir du véhicule
     Avant de partir ............................................. P02
     Précautions avant de quitter la voiture ..................... P02

   M - LA MÉCANIQUE ET LES ÉQUIPEMENTS
    Le fonctionnement
     Vue d'ensemble .............................................. M01
     Le tableau de bord .......................................... M02
     L'éclairage ................................................. M03
    L'entretien et le dépannage
     Les visites techniques, la surveillance du conducteur ....... M04
     Les pneus ................................................... M04

   S - LA SÉCURITÉ DU PASSAGER ET DU VÉHICULE
    L'installation sécurisée des passagers adultes
     La ceinture, coussins gonflables (airbags) .................. S01
    L'installation sécurisée des enfants
     Sièges homologués, système de sécurité enfant ............... S02
    Les nouvelles aides technologiques
     Aides au freinage, aides à la tenue de route ................ S03
     Aides à la conduite ......................................... S03

   E - L'ENVIRONNEMENT
    Choisir l'écomobilité
     À pied, à vélo, en bus, modes alternatifs, intermodalité .... E01
    Choisir son véhicule
     Un achat éco-responsable .................................... E02
    Être éco-conducteur
     L'éco-conduite .............................................. E03

   SOURCES PRINCIPALES :
   - Service-Public.gouv.fr (documents, assurance, infractions)
   - Sécurité Routière (thèmes officiels ETG)
   ========================================================= */

const FICHES = [

  /* ============================================================
     FAMILLE L : LA CIRCULATION ROUTIÈRE
     ============================================================ */

  /* --- La signalisation routière --- */
  {
    id: "signalisation-panneaux",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "01",
    emoji: "🚸",
    titre: "Les panneaux",
    type: "list",
    items: [
      { label: "Triangle bordure rouge",          texte: "Panneau de danger. Annonce un danger à venir (virage, chaussée glissante, priorité…)." },
      { label: "Rond bordure rouge",              texte: "Panneau d'interdiction (sens interdit, dépassement interdit, arrêt…)." },
      { label: "Rond bleu",                       texte: "Panneau d'obligation (sens obligatoire, piste cyclable…)." },
      { label: "Carré bleu",                      texte: "Panneau d'indication (parking, hôpital, aire de repos…)." },
      { label: "Panneau de priorité",             texte: "Carré jaune posé sur la pointe : positionne la voie par rapport aux autres." },
      { label: "Panneau d'agglomération",         texte: "Entrée / sortie d'agglomération : applique les règles urbaines (50 km/h)." },
      { label: "Octogonal rouge",                 texte: "Stop. Seul panneau octogonal du code." }
    ],
    astuce: "La forme et la couleur comptent plus que le dessin : rond à bordure rouge = toujours une interdiction."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "signalisation-risques",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "02",
    emoji: "⚠️",
    titre: "Quelques risques à connaître",
    type: "list",
    items: [
      { label: "Panneaux de danger",              texte: "Triangle à bordure rouge, placé avant le danger. Un panonceau peut préciser la distance ou l'étendue du danger." },
      { label: "Panonceaux",                      texte: "Petits panneaux rectangulaires placés sous un panneau principal. Précisent distance (M1), étendue (M2), position (M3), catégorie d'usagers (M4), ou exceptions (M9)." },
      { label: "Chaussée glissante",              texte: "Pluie, verglas, feuilles, gravillons : ralentir, éviter freinages et mouvements de volant brusques." },
      { label: "Virages & descentes dangereuses", texte: "Ralentir avant le virage, pas dedans. En descente, rétrograder pour garder le frein moteur." },
      { label: "Piétons, enfants, cyclistes",     texte: "Abords d'écoles, passages piétons, débouchés de cyclistes : lever le pied, redoubler de vigilance." },
      { label: "Animaux",                         texte: "Passage d'animaux domestiques ou sauvages, surtout à l'aube et au crépuscule : ralentir, être prêt à s'arrêter." },
      { label: "Chaussée rétrécie ou déformée",   texte: "Rétrécissement, dos d'âne, cassis : réduire la vitesse et croiser avec prudence." },
      { label: "Autres dangers",                  texte: "Le point d'exclamation signale un danger non couvert par un autre panneau, précisé par le panonceau." }
    ],
    astuce: "Un triangle rouge n'interdit rien : il prévient. C'est à moi d'adapter ma vitesse."
  },
  {
    id: "signalisation-temporaire",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "03",
    emoji: "🚧",
    titre: "La signalisation temporaire",
    type: "list",
    items: [
      { label: "Signalisation temporaire",   texte: "Fond jaune, chantiers et déviations. Prioritaire sur la signalisation permanente." },
      { label: "Déviations",                 texte: "Suivre les panneaux jaunes d'itinéraire jusqu'à retrouver la route normale." },
      { label: "Balisage",                   texte: "Cônes, barrières, feux de chantier : respecter le balisage et ralentir." },
      { label: "Personnel de chantier",      texte: "Présence possible d'ouvriers à proximité de la chaussée : vigilance et vitesse réduite." }
    ],
    astuce: "Un panneau jaune de chantier l'emporte toujours sur un panneau permanent contradictoire."
  },
  {
    id: "panneaux-direction",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "04",
    emoji: "🧭",
    titre: "Les panneaux de direction",
    type: "list",
    items: [
      { label: "Couleur selon la route",     texte: "Forme et couleur selon le type de route (autoroute = bleu, route nationale = vert, locale = blanc)." },
      { label: "Présignalisation",           texte: "Annonce une sortie ou un carrefour à l'avance, pour se placer dans la bonne voie." },
      { label: "Direction",                  texte: "Posés au carrefour : indiquent les destinations selon les directions." },
      { label: "Confirmation",               texte: "Après le carrefour : confirment que l'on est sur la bonne route." },
      { label: "Position",                   texte: "Indiquent le nom d'un lieu (ville, rivière…) ou d'une agglomération." },
      { label: "Bornes kilométriques",       texte: "Indiquent la distance restante sur la route (blanches pour les routes, bleues pour les autoroutes)." }
    ],
    astuce: "Lire les panneaux de direction à l'avance : on se place tôt, on évite les changements de voie de dernière minute."
  },
  {
    id: "marquage",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "05",
    emoji: "🛣️",
    titre: "Le marquage au sol",
    type: "list",
    items: [
      { label: "Ligne continue",           texte: "Interdiction de franchir ou chevaucher (sauf dépassement d'un cycliste)." },
      { label: "Ligne discontinue",        texte: "Dépassement et changement de voie autorisés." },
      { label: "Ligne d'avertissement",    texte: "Annonce l'approche d'une ligne continue (3 flèches)." },
      { label: "Ligne de dissuasion",      texte: "Dépassement toléré uniquement pour véhicules très lents (< 60 km/h)." },
      { label: "Bande d'arrêt d'urgence",  texte: "Réservée aux arrêts d'urgence et véhicules de secours." },
      { label: "Passage piéton",           texte: "Céder le passage à tout piéton engagé ou manifestant l'intention de traverser." },
      { label: "Lignes d'arrêt",           texte: "Trait épais continu en travers de la voie : arrêt obligatoire." }
    ],
    astuce: "Une ligne continue s'interrompt à une intersection : on peut y tourner, mais pas dépasser."
  },

  /* --- Les intersections --- */
  {
    id: "priorites",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "06",
    emoji: "🛑",
    titre: "Aborder une intersection",
    type: "list",
    items: [
      { label: "Priorité à droite",   texte: "Règle par défaut, sans signalisation ni marquage au sol." },
      { label: "Cédez-le-passage",    texte: "Ralentir, et s'arrêter si nécessaire. Pas d'arrêt obligatoire." },
      { label: "Stop",                texte: "Arrêt complet obligatoire à la ligne d'effet, même sans autre véhicule." },
      { label: "Giratoire",           texte: "Priorité aux véhicules déjà engagés sur l'anneau." },
      { label: "Tramway",             texte: "Toujours prioritaire, quelle que soit la signalisation." },
      { label: "Véhicules d'urgence", texte: "Prioritaires en intervention. Se ranger à droite pour faciliter le passage." },
      { label: "Sortie de parking",   texte: "Céder le passage à tous les usagers déjà sur la chaussée." }
    ],
    astuce: "Ne jamais s'engager dans un carrefour si on risque d'y rester bloqué, même en étant prioritaire."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "panneaux-priorite",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "07",
    emoji: "🔶",
    titre: "Les panneaux de priorité",
    type: "list",
    items: [
      { label: "Cédez-le-passage",             texte: "Triangle pointe en bas, bordure rouge : ralentir et s'arrêter si nécessaire pour laisser passer." },
      { label: "Stop",                         texte: "Octogone rouge : arrêt complet à la ligne d'effet (ou, à défaut, au plus près de l'intersection)." },
      { label: "Route à caractère prioritaire", texte: "Carré jaune sur la pointe (losange) : j'ai la priorité jusqu'au panneau de fin de priorité." },
      { label: "Fin de priorité",              texte: "Le même losange, barré : retour à la règle de priorité à droite." },
      { label: "Panneaux d'approche",          texte: "Annoncent à l'avance un Stop ou un Cédez-le-passage : se préparer à ralentir." },
      { label: "Hiérarchie",                   texte: "Un panneau Stop ou Cédez-le-passage l'emporte sur la priorité à droite." }
    ],
    astuce: "Losange jaune = je suis prioritaire. Losange barré = je ne le suis plus."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "intersections-complexes",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "08",
    emoji: "🔀",
    titre: "Intersections complexes, agglomération, voie d'accélération",
    type: "list",
    items: [
      { label: "En agglomération",            texte: "Entre le panneau d'entrée et celui de sortie : 50 km/h sauf indication contraire. La priorité à droite s'applique sans signalisation contraire." },
      { label: "Intersections en T, en Y, en croix", texte: "Même méthode partout : repérer panneaux et marquages, sinon appliquer la priorité à droite." },
      { label: "Plusieurs voies de circulation", texte: "Se placer dans la bonne file à l'avance, en suivant les flèches de sélection au sol." },
      { label: "Voie d'accélération",         texte: "Utiliser toute la voie pour atteindre la vitesse du flux, clignotant, puis s'insérer en cédant le passage." },
      { label: "Voie de décélération",        texte: "Quitter la voie principale tôt, clignotant, et ralentir sur la voie de décélération (pas avant)." }
    ],
    astuce: "Devant une intersection compliquée, une seule méthode : panneaux d'abord, marquage ensuite, priorité à droite en dernier."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "giratoire",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "09",
    emoji: "🔄",
    titre: "Les carrefours à sens giratoire",
    type: "list",
    items: [
      { label: "Entrée",             texte: "Céder le passage aux véhicules déjà engagés sur l'anneau (panneau Cédez-le-passage). Pas de clignotant à l'entrée." },
      { label: "Sens de circulation", texte: "On tourne autour de l'îlot central en le laissant sur sa gauche." },
      { label: "Priorité",           texte: "Priorité aux véhicules déjà engagés sur l'anneau." },
      { label: "Choix de la voie",   texte: "Voie de droite pour sortir tôt. Voie de gauche pour les sorties plus lointaines, en se rabattant à temps." },
      { label: "Sortie",             texte: "Clignotant à droite avant la sortie. Céder le passage aux piétons sur le passage piéton de sortie." },
      { label: "Usagers vulnérables", texte: "Cyclistes et deux-roues : redoubler de vigilance, surtout aux changements de file." }
    ],
    astuce: "Clignotant à droite pour sortir, jamais pour entrer."
  },
  {
    id: "feux-agents",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "10",
    emoji: "🚦",
    titre: "Les feux, combinaison feux + panneaux, signes des agents",
    type: "list",
    items: [
      { label: "Feux tricolores",             texte: "Vert je passe, orange je m'arrête (sauf si l'arrêt est dangereux), rouge je m'arrête derrière la ligne." },
      { label: "Rouge clignotant",            texte: "Arrêt, puis céder le passage." },
      { label: "Orange clignotant",           texte: "Prudence : appliquer les règles de priorité (panneaux ou priorité à droite)." },
      { label: "Flèche verte clignotante",    texte: "Autorise la direction indiquée, mais en cédant le passage aux autres usagers." },
      { label: "Panonceau pour cyclistes",    texte: "Au feu rouge, les cyclistes peuvent passer dans le sens indiqué, en cédant le passage." },
      { label: "Feux en panne ou éteints",    texte: "Appliquer la signalisation de priorité présente, sinon la priorité à droite." },
      { label: "Combinaison feux + panneaux", texte: "Ordre de priorité : agents, puis feux, puis panneaux, puis marquage, puis règles générales." },
      { label: "Agent : bras levé vertical",  texte: "Signifie 'arrêt pour tous les usagers'. Aucun véhicule ne doit avancer." },
      { label: "Agent : bras tendu horizontal", texte: "Les véhicules venant de la direction perpendiculaire au bras doivent s'arrêter. Ceux venant de la direction du bras peuvent passer." },
      { label: "Agent : balancement transversal", texte: "Un agent agite son bras ou un feu rouge de gauche à droite face à moi : je m'arrête." },
      { label: "Agent : mouvement circulaire", texte: "Un agent fait un mouvement circulaire de la main : les véhicules peuvent passer ou accélérer." }
    ],
    astuce: "En cas de contradiction entre un agent et un feu, c'est toujours l'agent qui prime."
  },

  /* --- Circuler --- */
  {
    id: "circuler-regles",
    groupe: "La circulation routière",
    sousGroupe: "Circuler",
    badge: "L",
    num: "11",
    emoji: "↔️",
    titre: "Règles générales & changements de direction",
    type: "list",
    items: [
      { label: "Tenir sa droite",           texte: "Règle par défaut. On roule à droite, on dépasse à gauche." },
      { label: "Changement de direction",   texte: "Clignotant AVANT la manœuvre, vérifier rétroviseurs et angle mort." },
      { label: "Tourner à droite",          texte: "Serrer à droite, céder le passage aux piétons qui traversent, ne pas empiéter sur la voie de gauche." },
      { label: "Tourner à gauche",          texte: "Se placer à gauche de la voie, céder le passage aux véhicules venant en face et aux piétons." }
    ],
    astuce: "On regarde, on clignote, on vérifie l'angle mort, et seulement après on tourne."
  },

  /* --- La vitesse --- */
  {
    id: "vitesses",
    groupe: "La circulation routière",
    sousGroupe: "La vitesse",
    badge: "L",
    num: "12",
    emoji: "⚡",
    titre: "Limitations de vitesse",
    type: "table",
    colonnes: ["Situation", "Temps sec", "Pluie", "Probatoire"],
    lignes: [
      { label: "Agglomération",           sec: "50 km/h",  pluie: "50 km/h",  probatoire: "50 km/h" },
      { label: "Hors agglomération",      sec: "80 km/h",  pluie: "80 km/h",  probatoire: "80 km/h" },
      { label: "Voie rapide (2×2 voies)", sec: "110 km/h", pluie: "100 km/h", probatoire: "100 km/h" },
      { label: "Autoroute",               sec: "130 km/h", pluie: "110 km/h", probatoire: "110 km/h" }
    ],
    astuce: "Brouillard (visibilité < 50 m) : 50 km/h sur tout le réseau, même autoroute."
  },
  {
    id: "vitesse-consequences",
    groupe: "La circulation routière",
    sousGroupe: "La vitesse",
    badge: "L",
    num: "13",
    emoji: "💥",
    titre: "Ajustement, conséquences & contrôle des vitesses",
    type: "list",
    items: [
      { label: "Distance de réaction",     texte: "= (vitesse ÷ 10) × 3 mètres. Correspond à 1 seconde de temps de réaction. Ex : 90 km/h → 9 × 3 = 27 m." },
      { label: "Distance de sécurité",     texte: "= distance de réaction × 2 (règle des 2 secondes). Ex : 90 km/h → 27 × 2 = 54 m." },
      { label: "Distance de freinage (sec)", texte: "≈ (vitesse ÷ 10)² ÷ 2. Ex : 90 km/h → 81 ÷ 2 ≈ 40 m." },
      { label: "Distance d'arrêt (sec)",     texte: "= distance de réaction + distance de freinage. Ex : 90 km/h → 27 + 40 ≈ 70 m. À 130 km/h : ≈ 120 m." },
      { label: "Sur route mouillée",         texte: "La distance de freinage est environ doublée. Ex : 90 km/h → 27 + 80 ≈ 107 m d'arrêt." },
      { label: "Doublement de vitesse",      texte: "Si la vitesse double, la distance de freinage est multipliée par 4 (proportionnelle au carré de la vitesse)." },
      { label: "Choc à 50 km/h",           texte: "Équivalent d'une chute du 3ᵉ étage. À 90 km/h : du 12ᵉ étage." },
      { label: "Ajustement",               texte: "Adapter sa vitesse aux conditions : pluie, brouillard, trafic, visibilité." },
      { label: "Contrôles",                texte: "Radars fixes, mobiles, embarqués, tronçons. Excès = amende + retrait de points." },
      { label: "Excès et sanction",        texte: "< 20 km/h : -1 pt (68 € si limite > 50, 135 € si ≤ 50). 20-29 : -2 pts. 30-39 : -3 pts. 40-49 : -4 pts. ≥ 50 : -6 pts, 5ᵉ classe (délit en cas de récidive)." }
    ],
    astuce: "Réaction = (v÷10)×3. Freinage = (v÷10)²÷2. Arrêt = réaction + freinage. Sur sol mouillé, le freinage double."
  },

  /* --- Croiser et dépasser --- */
  {
    id: "se-croiser",
    groupe: "La circulation routière",
    sousGroupe: "Croiser et dépasser",
    badge: "L",
    num: "14",
    emoji: "↕️",
    titre: "Se croiser & croisements difficiles",
    type: "list",
    items: [
      { label: "Se croiser",                    texte: "Chacun garde sa droite. Sur route étroite, ralentir et serrer à droite." },
      { label: "Obstacle sur ma voie",          texte: "Celui dont la voie est encombrée cède le passage au véhicule venant en face." },
      { label: "Panneaux de passage",           texte: "Un panneau peut donner la priorité à l'un des deux sens, l'autre doit alors céder." },
      { label: "Croisements difficiles",        texte: "En montagne, priorité au véhicule qui monte. Le descendant se range." }
    ],
    astuce: "Quand on est gêné, on ralentit et on laisse passer : c'est toujours plus rapide qu'un accrochage."
  },
  {
    id: "croiser-depasser",
    groupe: "La circulation routière",
    sousGroupe: "Croiser et dépasser",
    badge: "L",
    num: "15",
    emoji: "↗️",
    titre: "Dépasser & être dépassé",
    type: "list",
    items: [
      { label: "Dépassement",                   texte: "Par la gauche. À droite uniquement si le véhicule devant tourne à gauche." },
      { label: "Conditions pour dépasser",      texte: "Ligne discontinue, visibilité suffisante, aucun véhicule en face, clignotant." },
      { label: "Dépassements difficiles",       texte: "Véhicule long ou lent : prévoir une distance plus grande. Jamais sans visibilité." },
      { label: "Dépasser en sécurité",          texte: "Rétroviseur, clignotant, angle mort, accélérer franchement, se rabattre avec clignotant quand on voit le véhicule dépassé dans le rétroviseur." },
      { label: "Cyclistes",                     texte: "1 m en agglomération, 1,5 m hors agglomération." },
      { label: "Interdictions",                 texte: "Ligne continue, sommet de côte, virage, passage à niveau, intersection." },
      { label: "Être dépassé",                  texte: "Ne pas accélérer. Serrer à droite pour faciliter le dépassement." }
    ],
    astuce: "En cas de doute, on ne dépasse pas. Un dépassement raté peut coûter très cher."
  },

  /* --- Stationner ou s'arrêter --- */
  {
    id: "stationnement",
    groupe: "La circulation routière",
    sousGroupe: "Stationner ou s'arrêter",
    badge: "L",
    num: "16",
    emoji: "🅿️",
    titre: "Arrêt & stationnement",
    type: "list",
    items: [
      { label: "Arrêt",                  texte: "Immobilisation brève, conducteur à bord, moteur pouvant rester allumé." },
      { label: "Stationnement",          texte: "Immobilisation prolongée, conducteur peut quitter le véhicule." },
      { label: "Stationnement interdit", texte: "Trottoir, passage piéton, arrêt de bus, emplacement PMR, devant une bouche d'incendie." },
      { label: "En pente",               texte: "Serrer le frein à main, laisser une vitesse enclenchée, braquer les roues vers le trottoir." },
      { label: "Zone bleue",             texte: "Stationnement à durée limitée, contrôlé par disque." },
      { label: "Alternance semi-mensuelle", texte: "Stationnement unilatéral alterné : du 1 au 15 d'un côté, du 16 à la fin du mois de l'autre." }
    ],
    astuce: "En descente, on braque les roues vers le trottoir ; en montée, on les éloigne du trottoir."
  },

  /* ============================================================
     FAMILLE C : LE CONDUCTEUR
     ============================================================ */

  /* --- Conduire --- */
  {
    id: "conducteur",
    groupe: "Le conducteur",
    sousGroupe: "Conduire",
    badge: "C",
    num: "01",
    emoji: "🧠",
    titre: "Conduire : vue, stratégie, intervalles",
    type: "list",
    items: [
      { label: "Qu'est-ce que conduire ?",   texte: "Prendre des informations (surtout par la vue), les analyser, décider, puis agir. En boucle, en permanence." },
      { label: "Exploration visuelle",       texte: "Regarder loin, balayer la route, anticiper les dangers. Le regard doit précéder le véhicule." },
      { label: "Stratégie de conduite",      texte: "Anticiper, adapter sa vitesse, maintenir une distance de sécurité suffisante." },
      { label: "Situations à risque",        texte: "Intersections, virages, sorties de parking, abords d'écoles : redoubler de vigilance." },
      { label: "Pour soi et pour les autres", texte: "Respecter les règles, anticiper le comportement des autres, protéger les usagers les plus vulnérables." },
      { label: "Intervalles de sécurité",    texte: "Au moins 2 secondes avec le véhicule devant. Plus si conditions difficiles. Garder aussi de l'espace sur les côtés." },
      { label: "S'arrêter à temps",          texte: "Distance d'arrêt = distance de réaction + distance de freinage. Garder un intervalle qui permet de s'arrêter." },
      { label: "Temps de réaction",          texte: "Environ 1 seconde. Augmente avec la fatigue, l'alcool et la vitesse." }
    ],
    astuce: "Bien conduire, c'est d'abord bien regarder. 90 % des informations passent par les yeux."
  },
  {
    id: "circuler-communication",
    groupe: "Le conducteur",
    sousGroupe: "Conduire",
    badge: "C",
    num: "02",
    emoji: "👋",
    titre: "Communiquer avec les autres",
    type: "list",
    items: [
      { label: "Clignotant",           texte: "Obligatoire avant tout changement de direction ou de voie, et en sortie de giratoire." },
      { label: "Appel de phare",       texte: "Signale un danger, ou autorise (à tort) à passer. À utiliser avec discernement." },
      { label: "Avertisseur sonore",   texte: "Réservé aux situations d'urgence. Interdit en agglomération, sauf danger immédiat." },
      { label: "Warning",              texte: "Signale un danger, un ralentissement brusque ou un arrêt d'urgence." },
      { label: "Signes cyclistes",     texte: "Bras tendu = changement de direction. Bras levé = arrêt. Mouvements bas-haut = ralentir." },
      { label: "Courtoisie",           texte: "Remercier d'un geste, faciliter les insertions. La courtoisie, c'est aussi de la sécurité." }
    ],
    astuce: "Bien communiquer, c'est éviter les malentendus. Le clignotant oublié ou le warning non allumé sont responsables de beaucoup d'accidents."
  },

  /* --- Être en état de conduire --- */
  /* ⚠ NOUVELLE : à relire */
  {
    id: "physique-vue-ouie",
    groupe: "Le conducteur",
    sousGroupe: "Être en état de conduire",
    badge: "C",
    num: "03",
    emoji: "👁️",
    titre: "État physique, vue et ouïe",
    type: "list",
    items: [
      { label: "État physique",         texte: "Avant de partir : forme, douleurs, maladie, blessure, traitement. En cas de doute, ne pas conduire." },
      { label: "Aptitude médicale",     texte: "Certaines pathologies et traitements imposent une visite médicale régulière." },
      { label: "Champ visuel",          texte: "Champ visuel réduit de nuit (120°). Acuité visuelle minimale requise pour le permis." },
      { label: "Lunettes / lentilles",  texte: "Si le permis porte la mention de correction visuelle, le port est obligatoire en conduisant." },
      { label: "Éblouissement",         texte: "Détourner le regard vers le bord droit de la chaussée, ralentir. La vue met du temps à se rétablir." },
      { label: "L'ouïe",                texte: "Entendre klaxons et sirènes est indispensable. Fenêtres fermées et volume fort réduisent la perception." },
      { label: "Écouteurs, casque",     texte: "Interdits au volant : 135 € d'amende et -3 points." }
    ],
    astuce: "La conduite repose sur la vue et l'ouïe : si l'un des deux est diminué, on adapte sa vitesse, ou on ne prend pas la route."
  },
  {
    id: "alcool",
    groupe: "Le conducteur",
    sousGroupe: "Être en état de conduire",
    badge: "C",
    num: "04",
    emoji: "🍷",
    titre: "Alcool, drogues, médicaments",
    type: "list",
    items: [
      { label: "Conducteur confirmé",         texte: "Max <strong>0,5 g/l</strong> de sang (0,25 mg/l d'air expiré)." },
      { label: "Permis probatoire",           texte: "Max <strong>0,2 g/l</strong> de sang (0,10 mg/l d'air expiré)." },
      { label: "Stupéfiants",                 texte: "Tolérance zéro. Dépistage salivaire autorisé." },
      { label: "Médicaments",                 texte: "Certains altèrent la conduite : respecter les pictogrammes de la notice." },
      { label: "Polyconsommation",            texte: "Alcool + drogues + médicaments : effets multipliés, danger maximal." },
      { label: "Refus de dépistage",          texte: "Délit : jusqu'à 2 ans de prison et 4 500 € d'amende." },
      { label: "Entre 0,5 et 0,8 g/l",        texte: "Contravention de 4ᵉ classe : 135 € d'amende et -6 points." },
      { label: "À partir de 0,8 g/l",         texte: "Délit (état d'ivresse) : jusqu'à 2 ans de prison et 4 500 € d'amende, -6 points." }
    ],
    astuce: "Boire un café, dormir ou manger ne fait pas baisser l'alcoolémie : seul le temps compte."
  },
  {
    id: "etat-physique",
    groupe: "Le conducteur",
    sousGroupe: "Être en état de conduire",
    badge: "C",
    num: "05",
    emoji: "😴",
    titre: "Vigilance, somnolence, état psychologique",
    type: "list",
    items: [
      { label: "Fatigue",             texte: "Pause de 15-20 min toutes les 2 heures. Signes : paupières lourdes, bâillements, perte de concentration." },
      { label: "Somnolence",          texte: "Si les signes apparaissent : s'arrêter dès que possible. Une micro-sieste de 15 min est plus efficace qu'un café." },
      { label: "Vigilance",           texte: "Baisse naturelle entre 2 h et 5 h du matin et entre 13 h et 15 h. Redoubler de prudence." },
      { label: "État psychologique",  texte: "Stress, colère, euphorie : altèrent le jugement et augmentent la prise de risque." },
      { label: "Alcool & fatigue",    texte: "Effets cumulatifs : à éviter absolument." }
    ],
    astuce: "La fatigue tue plus que l'alcool sur la route. Une pause de 15-20 min toutes les 2 h sauve des vies."
  },

  /* ============================================================
     FAMILLE R : LA ROUTE
     ============================================================ */

  {
    id: "conditions-difficiles",
    groupe: "La route",
    sousGroupe: "Conduire dans des conditions difficiles",
    badge: "R",
    num: "01",
    emoji: "🌧️",
    titre: "Nuit, pluie, brouillard, neige, verglas, vent, soleil",
    type: "list",
    items: [
      { label: "Nuit",            texte: "Champ visuel réduit, distance de perception limitée. Feux de croisement en ville éclairée ou en croisant, feux de route hors zone éclairée (voir la fiche M03). Réduire la vitesse." },
      { label: "Pluie",           texte: "Distance de freinage augmentée, risque d'aquaplanage. Réduire la vitesse, augmenter les distances." },
      { label: "Brouillard",      texte: "Visibilité < 50 m : 50 km/h. Feux de croisement + brouillard avant. Jamais les feux de route." },
      { label: "Neige",           texte: "Adhérence réduite. Conduire en douceur. Chaînes obligatoires en zone signalée (panneau B26)." },
      { label: "Verglas",         texte: "Attention aux ponts, sorties de tunnel et zones ombragées. Aucune manœuvre brusque." },
      { label: "Vent",            texte: "Peut déporter le véhicule, surtout à la sortie d'un tunnel ou sur un pont. Tenir fermement le volant." },
      { label: "Soleil",          texte: "Éblouissement. Utiliser le pare-soleil, garder le pare-brise propre, ralentir si nécessaire." },
      { label: "Aquaplanage",     texte: "Perte de contact des pneus avec la route. Relâcher l'accélérateur, tenir le volant, ne pas freiner brusquement." }
    ],
    astuce: "Par conditions difficiles, la règle d'or est toujours la même : ralentir et augmenter les distances de sécurité."
  },
  {
    id: "autoroute",
    groupe: "La route",
    sousGroupe: "Conduire sur autoroute",
    badge: "R",
    num: "02",
    emoji: "🛤️",
    titre: "Autoroute : signalisation, règles, comportements",
    type: "list",
    items: [
      { label: "Signalisation",              texte: "Panneaux bleus. Bornes d'appel tous les 2 km. Voies d'arrêt d'urgence régulières." },
      { label: "Règles de circulation",      texte: "Rouler à droite, dépasser à gauche. Demi-tour et marche arrière interdits." },
      { label: "Vitesse",                    texte: "130 km/h (110 par temps de pluie). Probatoire : 110 km/h." },
      { label: "Distance de sécurité",       texte: "2 secondes minimum avec le véhicule devant. Plus si pluie." },
      { label: "Dépassements",               texte: "Par la gauche uniquement. Ne pas rester sur la voie du milieu." },
      { label: "Bande d'arrêt d'urgence",    texte: "Réservée aux urgences et véhicules de secours." },
      { label: "Insertion",                  texte: "Voie d'accélération pour atteindre la vitesse du flux, puis céder le passage." },
      { label: "Comportements",              texte: "Pause toutes les 2 heures. En cas de panne : warning, gilet, se réfugier derrière la glissière." }
    ],
    astuce: "Sur autoroute, la bande d'arrêt d'urgence n'est JAMAIS une voie de circulation."
  },
  {
    id: "zones-dangereuses",
    groupe: "La route",
    sousGroupe: "La traversée de zones dangereuses",
    badge: "R",
    num: "03",
    emoji: "⚠️",
    titre: "Chantiers, tunnels, passages à niveau, tramways",
    type: "list",
    items: [
      { label: "Chantiers routiers",    texte: "Ralentir, respecter la signalisation temporaire (fond jaune). Ouvriers prioritaires." },
      { label: "Tunnels",               texte: "Allumer les feux de croisement. Respecter les distances. En cas d'incendie : couper le moteur et gagner une issue de secours." },
      { label: "Passages à niveau",     texte: "Ralentir, vérifier, ne jamais s'engager si un train approche. Ne jamais s'arrêter sur les rails." },
      { label: "Tramways",              texte: "Toujours prioritaires, même sur les piétons. Ne jamais stationner sur les rails." }
    ],
    astuce: "Dans une zone dangereuse, la vitesse n'est jamais ta priorité : c'est la visibilité et l'anticipation."
  },

  /* ============================================================
     FAMILLE U : LES AUTRES USAGERS
     ============================================================ */

  /* ⚠ NOUVELLE : à relire */
  {
    id: "partage-rue",
    groupe: "Les autres usagers",
    sousGroupe: "Le partage de la rue",
    badge: "U",
    num: "01",
    emoji: "🏘️",
    titre: "Une nouvelle organisation de l'espace public",
    type: "list",
    items: [
      { label: "Zone 30",               texte: "Vitesse limitée à 30 km/h. Souvent en double sens cyclable." },
      { label: "Zone de rencontre",     texte: "Vitesse limitée à 20 km/h. Priorité aux piétons sur toute la chaussée." },
      { label: "Aire piétonne",         texte: "Vitesse au pas. Priorité absolue aux piétons. Accès réglementé." },
      { label: "Double sens cyclable",  texte: "Dans certaines rues à sens unique, les cyclistes peuvent circuler à contresens : vigilance aux croisements et sorties." },
      { label: "Sas vélo",              texte: "Zone devant le feu réservée aux cyclistes : s'arrêter avant, derrière la ligne, sans l'occuper." }
    ],
    astuce: "Plus l'espace est partagé, plus on roule lentement : 30, 20, puis au pas."
  },
  {
    id: "autres-usagers",
    groupe: "Les autres usagers",
    sousGroupe: "Les spécificités des autres usagers",
    badge: "U",
    num: "02",
    emoji: "🤝",
    titre: "Piétons, cyclistes, deux-roues, véhicules spéciaux, bus",
    type: "list",
    items: [
      { label: "Piétons",                    texte: "Prioritaires sur un passage piéton et quand ils sont engagés sur la chaussée (sauf face au tramway). Céder le passage à tout piéton engagé ou manifestant l'intention de traverser." },
      { label: "Cyclistes",                  texte: "1 m de distance en ville, 1,5 m hors agglomération. Imprévisibles : redoubler de vigilance." },
      { label: "EDPM (trottinettes)",        texte: "Interdits sur les trottoirs. Sur piste cyclable, ou sur la chaussée si limitée à 50 km/h." },
      { label: "Deux-roues motorisés",       texte: "Peu visibles (angles morts), souvent rapides. Conduite inter-files autorisée dans certains départements." },
      { label: "Véhicules prioritaires (art. R415-1)", texte: "Police, pompiers, SAMU, SMUR, douanes : gyrophare + sirène. Priorité absolue, je dois les laisser passer, me ranger à droite, m'arrêter si nécessaire." },
      { label: "Véhicules à facilités de passage (art. R415-2)", texte: "Ambulances privées, dépanneuses, service hivernal. Ils n'ont PAS de priorité : je dois juste leur faciliter le passage sans m'arrêter obligatoirement." },
      { label: "Convois exceptionnels",      texte: "Prioritaires aux croisements. Longs et lents : ne pas s'engager à l'intersection. Souvent précédés d'un véhicule de guidage." },
      { label: "Véhicules encombrants",      texte: "Bus, camions, bennes : angles morts importants, distances de freinage plus longues." },
      { label: "Véhicules lents",            texte: "Collecte de déchets, entretien de voirie. S'arrêtent souvent, travailleurs piétons autour." },
      { label: "Bus & autocars",             texte: "Prioritaires en ville quand ils quittent leur arrêt. Attention aux passagers qui peuvent surgir." }
    ],
    astuce: "Distinction clé : véhicule prioritaire (avec sirène) = je m'arrête pour le laisser passer. Véhicule à facilités de passage = je facilite simplement, sans obligation d'arrêt."
  },

  /* ============================================================
     FAMILLE D : LES NOTIONS DIVERSES
     ============================================================ */

  {
    id: "documents",
    groupe: "Les notions diverses",
    sousGroupe: "Les documents administratifs",
    badge: "D",
    num: "01",
    emoji: "📄",
    titre: "Documents obligatoires, facultatifs & assurance",
    type: "list",
    items: [
      { label: "Documents obligatoires",  texte: "Carte grise, permis de conduire. <strong>Assurance : plus obligatoire à présenter</strong> depuis avril 2024 (vérification via FVA)." },
      { label: "Permis numérique",        texte: "Accepté via l'application France Identité, comme l'Attestation de Droits à Conduire Sécurisée (4 mois)." },
      { label: "Perte ou vol du permis",  texte: "Récépissé de déclaration valable 2 mois, en attendant le nouveau titre." },
      { label: "Documents facultatifs",   texte: "Constat amiable, carte de groupe sanguin, attestation d'assurance (utile en cas de litige)." },
      { label: "Assurance obligatoire",   texte: "Tout véhicule terrestre à moteur, même immobile. Le défaut est un délit (3 750 € d'amende, confiscation possible)." },
      { label: "Garantie minimale",       texte: "Responsabilité civile (dommages causés aux tiers). Le conducteur responsable n'est pas indemnisé." },
      { label: "Non-présentation",        texte: "Amende jusqu'à 38 €, portée à 750 € sans justification sous 5 jours." }
    ],
    astuce: "Depuis avril 2024, la carte verte n'existe plus. La vérification d'assurance passe par le Fichier des Véhicules Assurés (FVA)."
  },
  {
    id: "chargement",
    groupe: "Les notions diverses",
    sousGroupe: "Le chargement",
    badge: "D",
    num: "02",
    emoji: "📦",
    titre: "Bagages, objets encombrants, remorques, animaux",
    type: "list",
    items: [
      { label: "Bagages",                texte: "Ne jamais dépasser le PTAC (poids total autorisé en charge). Charger lourd au fond du coffre." },
      { label: "Objets encombrants",     texte: "Arrimés obligatoirement. Si la charge dépasse, dispositif réfléchissant obligatoire." },
      { label: "Remorques & caravanes",  texte: "Permis B suffit si PTAC remorque ≤ 750 kg. Au-delà : permis BE ou B96 selon le poids total." },
      { label: "Tracter une remorque",   texte: "Adapter sa conduite : freinage plus long, virages plus larges, vitesse réduite." },
      { label: "Transport des passagers", texte: "Limité au nombre de places de la carte grise. Tous doivent être attachés." },
      { label: "Animaux",                texte: "Transportés dans un contenant fermé ou attachés. Ne jamais laisser un animal divaguer dans l'habitacle." }
    ],
    astuce: "Une surcharge augmente la distance de freinage, use les pneus et peut entraîner une amende et l'immobilisation du véhicule."
  },
  {
    id: "permis-points",
    groupe: "Les notions diverses",
    sousGroupe: "Le permis à points",
    badge: "D",
    num: "03",
    emoji: "🎫",
    titre: "Capital, perte, reconstitution, invalidation",
    type: "list",
    items: [
      { label: "Capital initial",           texte: "6 points à l'obtention du permis. Passe à <strong>12 points</strong> après 3 ans sans infraction (2 ans en cas de conduite accompagnée)." },
      { label: "Permis probatoire",         texte: "3 ans (2 ans avec conduite accompagnée). Pendant cette période : 6 points max, vitesse réduite, taux d'alcool abaissé." },
      { label: "Parcours vers 12 points",   texte: "+2 points par an sans infraction. +3 par an en probatoire avec conduite accompagnée." },
      { label: "Perte de points",           texte: "De 1 à 6 points selon la gravité. Retrait effectif une fois l'infraction payée ou jugée." },
      { label: "Reconstitution du capital", texte: "Stage volontaire : +4 points maximum dans la limite du plafond. Stage de 2 jours, payant." },
      { label: "Invalidation",              texte: "Solde à zéro : permis invalidé. Re-passage du code et de la conduite après 6 mois (1 an en cas de récidive)." },
      { label: "Consultation",              texte: "Solde consultable sur Télépoints avec son numéro de dossier." }
    ],
    astuce: "Les points ne disparaissent pas tout seuls : il faut soit attendre 2 ans sans infraction, soit faire un stage volontaire."
  },
  {
    id: "infractions",
    groupe: "Les notions diverses",
    sousGroupe: "Les infractions",
    badge: "D",
    num: "04",
    emoji: "⚖️",
    titre: "Retrait immédiat, contraventions, délits",
    type: "list",
    items: [
      { label: "Retrait immédiat",      texte: "Excès ≥ 40 km/h, alcoolémie, stupéfiants, refus d'obtempérer : permis retiré sur place (suspension à venir)." },
      { label: "1ʳᵉ classe",            texte: "Le plus léger : stationnement gênant, feux non conformes. Amende forfaitaire réduite." },
      { label: "2ᵉ classe",             texte: "Oubli de clignotant, non-présentation du permis ou de la carte grise." },
      { label: "3ᵉ classe",             texte: "Excès de vitesse de 1 à 19 km/h sur route limitée à plus de 50 km/h." },
      { label: "4ᵉ classe",             texte: "Excès 20-49 km/h, téléphone tenu en main, refus de priorité, non-port de ceinture, franchissement ligne continue, stationnement PMR." },
      { label: "5ᵉ classe",             texte: "Infractions les plus graves : retrait de 6 points, suspension ou annulation possible." },
      { label: "Délits",                texte: "Alcoolémie ≥ 0,8 g/l, refus d'obtempérer, délit de fuite, conduite malgré suspension. Jusqu'à 10 ans de prison." },
      { label: "Annulation du permis",  texte: "Solde de points à zéro, ou décision judiciaire. Re-passage obligatoire après visite médicale et tests psychotechniques." }
    ],
    astuce: "Le retrait immédiat n'est pas une sanction définitive : c'est une mesure de sécurité en attendant la décision judiciaire."
  },

  /* ============================================================
     FAMILLE A : LES PREMIERS SECOURS
     ============================================================ */

  {
    id: "protection-alerte",
    groupe: "Les premiers secours",
    sousGroupe: "Protéger et alerter",
    badge: "A",
    num: "01",
    emoji: "🚨",
    titre: "La protection & l'alerte",
    type: "list",
    items: [
      { label: "La protection",    texte: "Sécuriser la zone : warning, gilet, triangle (30 m, jamais sur autoroute). Se protéger soi-même avant tout." },
      { label: "Se mettre à l'abri", texte: "Faire sortir les personnes valides du véhicule et les placer à l'abri, derrière la glissière." },
      { label: "L'alerte",         texte: "Numéros : 112 (UE), 15 (SAMU), 18 (Pompiers), 17 (Police). Donner lieu, nature, nombre de victimes, état." },
      { label: "Personnes sourdes ou malentendantes", texte: "Le 114 permet d'alerter par SMS." }
    ],
    astuce: "Protéger, Alerter, Secourir : toujours dans cet ordre. On ne devient pas une deuxième victime."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "accident-route",
    groupe: "Les premiers secours",
    sousGroupe: "Protéger et alerter",
    badge: "A",
    num: "02",
    emoji: "🚗",
    titre: "L'accident de la route",
    type: "list",
    items: [
      { label: "Victime",               texte: "Ne pas déplacer une victime sauf danger immédiat. Ne pas retirer le casque d'un motard." },
      { label: "Véhicules accidentés",  texte: "Couper le contact, serrer le frein à main. Ne pas fumer, pas de flamme à proximité." },
      { label: "Ne rien donner",        texte: "Ni à boire, ni à manger à une victime." },
      { label: "Rester sur place",      texte: "Parler à la victime, la rassurer, rester avec elle jusqu'à l'arrivée des secours." }
    ],
    astuce: "Face à un accident : je m'arrête en sécurité, je protège, j'alerte, puis seulement je secours."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "alerte-populations",
    groupe: "Les premiers secours",
    sousGroupe: "Alerte et protection des populations",
    badge: "A",
    num: "03",
    emoji: "📢",
    titre: "Alerte et protection des populations",
    type: "list",
    items: [
      { label: "Signal national d'alerte", texte: "Sirène au son modulé, montant puis descendant, par cycles. Test des sirènes le 1ᵉʳ mercredi du mois vers midi." },
      { label: "FR-Alert",                 texte: "Message d'alerte envoyé directement sur les téléphones mobiles de la zone concernée." },
      { label: "Que faire",                texte: "Se mettre à l'abri dans un bâtiment, fermer portes et fenêtres, écouter la radio pour les consignes." },
      { label: "À ne pas faire",           texte: "Ne pas aller chercher ses enfants à l'école (l'école s'en occupe), ne pas téléphoner pour ne pas saturer les lignes." },
      { label: "Fin d'alerte",             texte: "Son continu d'environ 30 secondes." }
    ],
    astuce: "Alerte : abri, radio, patience. On ne prend pas la route."
  },
  {
    id: "premiers-secours",
    groupe: "Les premiers secours",
    sousGroupe: "Les premiers secours",
    badge: "A",
    num: "04",
    emoji: "🩹",
    titre: "Hémorragie, traumatisme, perte de connaissance, arrêt cardiaque",
    type: "list",
    items: [
      { label: "Hémorragie",                    texte: "Comprimer la plaie avec la main (gant ou tissu propre). Ne pas retirer le corps étranger planté." },
      { label: "Traumatisme",                   texte: "Ne pas mobiliser la colonne. Laisser la victime dans la position trouvée, sauf danger." },
      { label: "Perte de connaissance",         texte: "Victime qui respire : PLS. Victime qui ne respire plus : massage cardiaque + défibrillateur." },
      { label: "Arrêt cardiaque",               texte: "30 compressions / 2 insufflations. Défibrillateur dès que disponible. Ne jamais s'arrêter avant les secours." },
      { label: "Formations",                    texte: "GQS (gestes qui sauvent), PSC 1, PSE 1, PSE 2 : dispensées par des associations et organismes agréés." }
    ],
    astuce: "En cas de doute sur l'état d'une victime, on alerte les secours et on suit leurs instructions au téléphone."
  },

  /* ============================================================
     FAMILLE P : PRENDRE ET QUITTER SON VÉHICULE
     ============================================================ */

  {
    id: "prendre-quitter",
    groupe: "Prendre et quitter son véhicule",
    sousGroupe: "S'installer au poste de conduite",
    badge: "P",
    num: "01",
    emoji: "💺",
    titre: "S'installer au poste de conduite",
    type: "list",
    items: [
      { label: "Être à l'aise",            texte: "Vêtements amples, chaussures adaptées (pas de talons hauts ni de tongs). Rien ne doit gêner les pédales, le volant ou les commandes." },
      { label: "Distance au pédalier",     texte: "Pédale enfoncée à fond, la jambe reste légèrement fléchie. Les pieds appuient sans effort excessif." },
      { label: "Hauteur du siège",         texte: "Bien voir la route et tout le tableau de bord. Fesses au fond du siège, dos plaqué contre le dossier." },
      { label: "Inclinaison du dossier",   texte: "Dossier peu incliné, dos bien soutenu : pas de tension dans le cou ni les épaules." },
      { label: "Position des mains",       texte: "Tenir le volant souplement, à « 9 h 15 » ou « 10 h 10 », sans crispation. Jamais les mains ni les pouces à l'intérieur du volant (danger en cas de déclenchement de l'airbag)." },
      { label: "Réglage du volant",        texte: "En hauteur et en profondeur : tout le tableau de bord reste visible et les bras restent légèrement fléchis." },
      { label: "Appuie-tête",              texte: "Haut de l'appuie-tête à hauteur du sommet de la tête (protège la nuque en cas de choc arrière). S'il n'y a pas de passager arrière, abaisser les appuie-tête arrière pour mieux voir." },
      { label: "Position des pieds",       texte: "Pied droit : talon au sol, seule la pointe du pied passe de l'accélérateur au frein. Pied gauche : embrayage, puis repos sur le repose-pied." },
      { label: "Rétroviseurs",             texte: "Réglés une fois bien assis, pour réduire les angles morts. Position « nuit » du rétroviseur intérieur contre l'éblouissement. Les angles morts restent à contrôler en tournant la tête." },
      { label: "Ceinture",                 texte: "Sangle à plat, bien tendue, jamais vrillée. Sangle haute au milieu de l'épaule, pas sur le cou. Sangle basse sur le bassin, jamais sur le ventre." }
    ],
    astuce: "Les réglages se font à l'arrêt, avant de démarrer : jamais en roulant."
  },
  {
    id: "entrer-sortir",
    groupe: "Prendre et quitter son véhicule",
    sousGroupe: "Entrer et sortir du véhicule",
    badge: "P",
    num: "02",
    emoji: "🚪",
    titre: "Entrer et sortir du véhicule",
    type: "list",
    items: [
      { label: "Avant de partir",          texte: "Vérifier l'absence d'obstacle, attacher tout le monde, ajuster les réglages, démarrer en douceur." },
      { label: "Entrer et sortir",         texte: "Ouvrir avec prudence : rétroviseur + angle mort. Emportiérage = accident grave avec cyclistes." },
      { label: "Précautions avant de quitter", texte: "Couper le moteur, serrer le frein à main, retirer la clé, fermer. Sur autoroute : sortir côté opposé au trafic." }
    ],
    astuce: "Un cycliste percuté par une portière ouverte = un accident grave. Toujours regarder avant d'ouvrir."
  },

  /* ============================================================
     FAMILLE M : LA MÉCANIQUE ET LES ÉQUIPEMENTS
     ============================================================ */

  {
    id: "mecanique",
    groupe: "La mécanique et les équipements",
    sousGroupe: "Le fonctionnement",
    badge: "M",
    num: "01",
    emoji: "🔧",
    titre: "Vue d'ensemble",
    type: "list",
    items: [
      { label: "Moteur",              texte: "Produit l'énergie qui fait avancer le véhicule." },
      { label: "Boîte de vitesses",   texte: "Adapte la puissance du moteur à la vitesse, et la transmet aux roues." },
      { label: "Freins",              texte: "Ralentissent et immobilisent le véhicule." },
      { label: "Direction",           texte: "Oriente les roues avant, donc la trajectoire." },
      { label: "Suspension",          texte: "Amortit les chocs et maintient le contact des pneus avec la route." },
      { label: "Échappement",         texte: "Évacue les gaz brûlés et limite la pollution (catalyseur, filtre à particules)." }
    ],
    astuce: "Connaître le rôle de chaque organe aide à comprendre un voyant ou un bruit anormal."
  },
  {
    id: "voyants",
    groupe: "La mécanique et les équipements",
    sousGroupe: "Le fonctionnement",
    badge: "M",
    num: "02",
    emoji: "🚨",
    titre: "Le tableau de bord & ses voyants",
    type: "list",
    items: [
      { label: "Code couleur",                   texte: "Rouge = alarme (arrêt immédiat). Orange = alerte (vérification rapide). Vert/bleu = info (équipement actif)." },
      { label: "Voyant moteur (orange)",         texte: "Augmentation de la pollution. Diagnostic à faire rapidement en garage." },
      { label: "Pression d'huile (rouge)",       texte: "S'arrêter immédiatement, couper le moteur, vérifier le niveau. Risque de casse moteur." },
      { label: "Température moteur (rouge)",     texte: "Moteur en surchauffe : arrêt immédiat. Ne jamais ouvrir le bocal à chaud." },
      { label: "Batterie (rouge)",               texte: "Circuit de charge défaillant (alternateur, régulateur). Risque de panne rapide." },
      { label: "Frein à main / liquide de frein", texte: "Frein à main serré, ou baisse de pression dans le circuit de freinage." },
      { label: "ABS / ESP (orange)",             texte: "Système défaillant : prudence au freinage ou au dérapage. Vérification à faire." },
      { label: "Ceinture / portière / capot",    texte: "Sécurité passive : mettre la ceinture, fermer portières, capot, coffre." },
      { label: "AdBlue",                         texte: "Niveau bas : refaire le plein rapidement, sinon le véhicule refusera de démarrer." }
    ],
    astuce: "Plusieurs voyants s'allument brièvement au démarrage : c'est normal. Un voyant rouge qui reste allumé moteur tournant n'est jamais un détail : on s'arrête en sécurité et on vérifie."
  },
  {
    id: "eclairage",
    groupe: "La mécanique et les équipements",
    sousGroupe: "Le fonctionnement",
    badge: "M",
    num: "03",
    emoji: "💡",
    titre: "L'éclairage : position, croisement, route, brouillard",
    type: "list",
    items: [
      { label: "Feux de position (veilleuses)", texte: "Avant et arrière, visibles à 150 m (rouges à l'arrière). Servent à être vu plus qu'à éclairer." },
      { label: "Usage des feux de position",    texte: "Seuls, rarement : quasi uniquement en ville avec une bonne visibilité. Les feux de croisement restent préférables (ils éclairent la chaussée)." },
      { label: "Feux de croisement (codes)",    texte: "À l'avant, portée de 30 m minimum. Servent à mieux voir ET à être vu." },
      { label: "Usage des feux de croisement",  texte: "Quand on croise, suit de près ou dépasse un véhicule. En agglomération éclairée. Indispensables par pluie, neige ou brouillard." },
      { label: "Réglage de hauteur",            texte: "Molette dans l'habitacle, à ajuster véhicule chargé pour ne pas éblouir. Automatique avec la technologie LED." },
      { label: "Faisceau asymétrique",          texte: "Le feu de croisement gauche est orienté plus bas que le droit : c'est normal, pour ne pas éblouir en double sens." },
      { label: "Feux de route (plein phares)",  texte: "Portée de 100 m minimum. Excellente perception de la route la nuit. Peuvent être automatiques ou adaptatifs (suivent la trajectoire, s'éteignent si risque d'éblouir)." },
      { label: "Usage des feux de route",       texte: "Obligatoires la nuit, en ville ou à la campagne, quand la chaussée n'est pas éclairée. Repasser en croisement dès qu'on croise, suit de près ou dépasse un véhicule." },
      { label: "Feux de brouillard avant",      texte: "Faisceau large, au ras du sol, visibles à moyenne distance. En complément des feux de croisement par forte pluie, neige ou brouillard. Utilisables avec les feux de route sur route étroite et sinueuse." },
      { label: "Feux de brouillard arrière",    texte: "Très éblouissants, servent à être vu de derrière. Uniquement par brouillard ou neige dense. À éteindre dès que les conditions redeviennent normales." }
    ],
    astuce: "Croisement = voir et être vu. Route = voir loin, seulement quand personne n'est à éblouir. Brouillard = conditions dégradées uniquement, et on éteint après."
  },
  {
    id: "entretien",
    groupe: "La mécanique et les équipements",
    sousGroupe: "L'entretien et le dépannage",
    badge: "M",
    num: "04",
    emoji: "🧰",
    titre: "Entretien, pneus, surveillance du conducteur",
    type: "list",
    items: [
      { label: "Les visites techniques",    texte: "Premier CT : dans les <strong>6 mois</strong> précédant le 4ᵉ anniversaire. Ensuite tous les 2 ans." },
      { label: "Les pneus",                 texte: "Profondeur minimale : 1,6 mm. Pression vérifiée à froid, une fois par mois environ." },
      { label: "Pression des pneus",        texte: "Sous-gonflage : surconsommation, usure, risque d'éclatement. Sur-gonflage : tenue de route dégradée." },
      { label: "La surveillance du conducteur", texte: "Rétroviseurs, essuie-glaces, éclairage, klaxon, feux stop : à vérifier régulièrement." },
      { label: "Niveaux",                   texte: "Huile, liquide de frein, refroidissement, lave-glace : à vérifier moteur froid et véhicule à plat." },
      { label: "Gilet & triangle",          texte: "Obligatoires à bord. Gilet à enfiler AVANT de sortir. Triangle à 30 m, jamais sur autoroute." },
      { label: "Équipements obligatoires",  texte: "Éclairage complet, plaques d'immatriculation, rétroviseurs, pare-brise et vitres non obstrués." }
    ],
    astuce: "Un constat amiable, une roue de secours ou un éthylotest ne sont pas obligatoires, mais fortement recommandés."
  },

  /* ============================================================
     FAMILLE S : LA SÉCURITÉ DU PASSAGER ET DU VÉHICULE
     ============================================================ */

  {
    id: "securite-passager",
    groupe: "La sécurité du passager et du véhicule",
    sousGroupe: "L'installation sécurisée des passagers adultes",
    badge: "S",
    num: "01",
    emoji: "🧍",
    titre: "Passagers adultes : ceinture & airbags",
    type: "list",
    items: [
      { label: "La ceinture",                 texte: "Obligatoire à toutes les places, avant comme arrière. Le conducteur est responsable du port pour les moins de 18 ans." },
      { label: "Coussins gonflables (airbags)", texte: "Complément de la ceinture, pas un substitut. Ne pas approcher le visage du volant ou de la planche de bord." },
      { label: "Chargement",                  texte: "Objets lourds dans le coffre, arrimés. Ne rien poser sur la plage arrière (projectiles en cas de freinage)." },
      { label: "Passagers",                   texte: "Nombre limité aux places de la carte grise. Tous doivent être attachés." }
    ],
    astuce: "Un passager non attaché à l'arrière peut tuer le conducteur en cas de choc frontal : il est projeté vers l'avant."
  },
  /* ⚠ NOUVELLE : à relire */
  {
    id: "securite-enfant",
    groupe: "La sécurité du passager et du véhicule",
    sousGroupe: "L'installation sécurisée des enfants",
    badge: "S",
    num: "02",
    emoji: "👶",
    titre: "Enfants : sièges homologués & système de sécurité",
    type: "list",
    items: [
      { label: "Sièges homologués",           texte: "Enfants < 10 ans : dispositif de retenue homologué obligatoire, adapté au poids et à la taille." },
      { label: "Interdiction à l'avant",      texte: "Enfant de moins de 10 ans : INTERDIT à l'avant, sauf si le véhicule n'a pas de banquette arrière, ou si les places arrière sont déjà occupées par d'autres enfants de moins de 10 ans, ou si le siège dos-route est installé avec airbag passager désactivé." },
      { label: "Homologation",                texte: "Vérifier l'étiquette d'homologation sur le siège (norme européenne)." },
      { label: "Système de sécurité enfant",  texte: "Siège bébé dos à la route : JAMAIS sur le siège passager avant avec airbag actif. Désactiver l'airbag passager." },
      { label: "Installation",                texte: "Siège bien fixé, harnais ajusté sans jeu. Jamais d'enfant sur les genoux d'un adulte." }
    ],
    astuce: "Règle simple : moins de 10 ans → à l'arrière, dans un siège adapté. Dos à la route à l'avant → airbag passager obligatoirement désactivé."
  },
  {
    id: "securite",
    groupe: "La sécurité du passager et du véhicule",
    sousGroupe: "Les nouvelles aides technologiques",
    badge: "S",
    num: "03",
    emoji: "⚙️",
    titre: "Aides au freinage, à la tenue de route & à la conduite",
    type: "list",
    items: [
      { label: "ABS (aide au freinage)",         texte: "Empêche le blocage des roues : garder le contrôle du volant au freinage." },
      { label: "AFU (aide au freinage)",         texte: "Amplifie la pression de freinage lors d'un freinage d'urgence." },
      { label: "Freinage automatique d'urgence", texte: "Détecte un risque de collision et freine seul si le conducteur ne réagit pas." },
      { label: "ESP (tenue de route)",           texte: "Corrige la trajectoire en cas de dérapage (agit sur freins + moteur)." },
      { label: "Aide au maintien de voie",       texte: "Alerte ou corrige la trajectoire si le véhicule franchit une ligne sans clignotant." },
      { label: "Régulateur / limiteur",          texte: "Maintient une vitesse constante. Le régulateur ne freine pas seul en descente." },
      { label: "Aide au stationnement",          texte: "Radars et caméras : complètent la vision mais ne remplacent pas le conducteur." }
    ],
    astuce: "Les ADAS assistent, mais ne pilotent pas : la responsabilité reste toujours celle du conducteur."
  },

  /* ============================================================
     FAMILLE E : L'ENVIRONNEMENT
     ============================================================ */

  {
    id: "ecomobilite",
    groupe: "L'environnement",
    sousGroupe: "Choisir l'écomobilité",
    badge: "E",
    num: "01",
    emoji: "🚶",
    titre: "Se déplacer autrement",
    type: "list",
    items: [
      { label: "En se déplaçant à pied",       texte: "Zéro émission. À privilégier pour les trajets courts (< 2 km)." },
      { label: "À vélo",                       texte: "Zéro émission. Aide électrique possible. Pistes cyclables à utiliser." },
      { label: "En bus",                       texte: "Transport en commun : un bus plein pollue beaucoup moins par personne qu'une voiture." },
      { label: "En pratiquant l'intermodalité", texte: "Combiner plusieurs modes : vélo + train, marche + bus, covoiturage + tram." },
      { label: "Modes alternatifs",            texte: "Covoiturage, autopartage, transports en commun : réduire le nombre de véhicules." },
      { label: "Impact",                       texte: "Un trajet en voiture = en moyenne 100 à 150 g de CO2 par km et par personne." }
    ],
    astuce: "Le véhicule le plus écologique reste celui qu'on n'utilise pas."
  },
  {
    id: "choisir-vehicule",
    groupe: "L'environnement",
    sousGroupe: "Choisir son véhicule",
    badge: "E",
    num: "02",
    emoji: "🚗",
    titre: "Un achat éco-responsable",
    type: "list",
    items: [
      { label: "Énergie",              texte: "Essence, diesel, hybride, électrique : choisir selon l'usage (ville, route, longs trajets)." },
      { label: "Bonus / malus",        texte: "Le malus s'applique aux véhicules les plus polluants. Le bonus favorise les véhicules propres." },
      { label: "Vignette Crit'Air",    texte: "Obligatoire dans certaines zones (ZFE). Classe selon les émissions polluantes." },
      { label: "Consommation",         texte: "Regarder la consommation mixte et le rejet de CO2 avant l'achat. Une voiture plus légère consomme moins." },
      { label: "Entretien",            texte: "Un véhicule bien entretenu consomme moins et pollue moins. Contrôle technique à jour." },
      { label: "Taille adaptée",       texte: "Choisir un véhicule adapté à ses besoins réels : un petit gabarit suffit souvent en ville." }
    ],
    astuce: "Avant l'achat, comparer consommation et émissions : un véhicule plus sobre coûte moins cher à l'usage."
  },
  {
    id: "ecoconduite",
    groupe: "L'environnement",
    sousGroupe: "Être éco-conducteur",
    badge: "E",
    num: "03",
    emoji: "🌱",
    titre: "L'éco-conduite",
    type: "list",
    items: [
      { label: "Anticipation",    texte: "Lever le pied tôt plutôt que freiner au dernier moment." },
      { label: "Rapports",        texte: "Passer les vitesses tôt, sans monter dans les tours." },
      { label: "Arrêt prolongé",  texte: "Couper le moteur au-delà de 30 secondes d'arrêt." },
      { label: "Pneumatiques",    texte: "Vérifier régulièrement la pression (sous-gonflage = surconsommation)." },
      { label: "Climatisation",   texte: "À utiliser avec parcimonie : +10 à +20 % de consommation." },
      { label: "Entretien",       texte: "Un moteur bien entretenu consomme moins." },
      { label: "Chargement",      texte: "Éviter les charges inutiles. Un coffre de toit augmente la consommation." }
    ],
    astuce: "L'éco-conduite, c'est aussi de la sécurité : anticiper = freiner moins = conduire plus cool."
  }
];

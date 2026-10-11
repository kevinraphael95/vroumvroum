/* =========================================================
   CONTENU DES FICHES DE COURS.
   Source unique pour fiches.html (rendu via fiches.js).

   Structure calée sur le sommaire du Codes Rousseau :
   L - La circulation routière
   C - Le conducteur
   R - La route
   U - Les autres usagers
   D - Les notions diverses
   A - Les premiers secours
   P - Prendre et quitter son véhicule
   M - La mécanique et les équipements
   S - La sécurité du passager et du véhicule
   E - L'environnement

   NUMÉROTATION :
   Le champ "num" est propre à chaque catégorie (badge + num = L01, L02, M01…).
   Pour ajouter une fiche : la placer dans sa catégorie, lui donner le
   numéro suivant de cette catégorie. Si on veut l'insérer au milieu,
   on ne renumérote que cette catégorie, les autres ne bougent pas.
   L'"id" reste stable et ne dépend jamais du numéro.

   SOURCES PRINCIPALES :
   - Service-Public.gouv.fr (documents, assurance, infractions)
   - Sécurité Routière (thèmes officiels ETG)
   - Codes Rousseau (structure et contenu pédagogique)
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
  {
    id: "signalisation-temporaire",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "02",
    emoji: "🚧",
    titre: "Signalisation temporaire & de direction",
    type: "list",
    items: [
      { label: "Signalisation temporaire",   texte: "Fond jaune, chantiers et déviations. Prioritaire sur la signalisation permanente." },
      { label: "Panneaux de direction",      texte: "Forme et couleur selon le type de route (autoroute = bleu, route nationale = vert, locale = blanc)." },
      { label: "Bornes kilométriques",       texte: "Indiquent la distance restante sur la route (blanches pour les routes, bleues pour les autoroutes)." },
      { label: "Signaux lumineux",           texte: "Feux tricolores : vert je passe, orange je m'arrête (sauf si dangereux), rouge je m'arrête." },
      { label: "Signes des agents",          texte: "Bras levés ou agités face à moi = je m'arrête. Les agents sont prioritaires sur tout, même les feux." }
    ],
    astuce: "En cas de contradiction entre un agent et un feu, c'est toujours l'agent qui prime."
  },
  {
    id: "marquage",
    groupe: "La circulation routière",
    sousGroupe: "La signalisation routière",
    badge: "L",
    num: "03",
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
    astuce: "Une ligne continue ne s'arrête jamais au niveau d'une intersection : elle reprend après."
  },

  /* --- Les intersections --- */
  {
    id: "priorites",
    groupe: "La circulation routière",
    sousGroupe: "Les intersections",
    badge: "L",
    num: "04",
    emoji: "🛑",
    titre: "Aborder une intersection",
    type: "list",
    items: [
      { label: "Priorité à droite",   texte: "Règle par défaut, sans signalisation ni marquage au sol." },
      { label: "Cédez-le-passage",    texte: "Ralentir, et s'arrêter si nécessaire. Pas d'arrêt obligatoire." },
      { label: "Stop",                texte: "Arrêt complet obligatoire à la ligne d'effet, même sans autre véhicule." },
      { label: "Giratoire",           texte: "Priorité aux véhicules déjà engagés sur l'anneau." },
      { label: "Feux tricolores",     texte: "Orange = arrêt, sauf si dangereux. Rouge clignotant = arrêt puis céder." },
      { label: "Tramway",             texte: "Toujours prioritaire, quelle que soit la signalisation." },
      { label: "Véhicules d'urgence", texte: "Prioritaires en intervention. Se ranger à droite pour faciliter le passage." },
      { label: "Sortie de parking",   texte: "Céder le passage à tous les usagers déjà sur la chaussée." }
    ],
    astuce: "Ne jamais s'engager dans un carrefour si on risque d'y rester bloqué, même en étant prioritaire."
  },

  /* --- Circuler --- */
  {
    id: "circuler-communication",
    groupe: "La circulation routière",
    sousGroupe: "Circuler",
    badge: "L",
    num: "05",
    emoji: "👋",
    titre: "Communication entre usagers",
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
  {
    id: "circuler-regles",
    groupe: "La circulation routière",
    sousGroupe: "Circuler",
    badge: "L",
    num: "06",
    emoji: "↔️",
    titre: "Règles générales & changements de direction",
    type: "list",
    items: [
      { label: "Tenir sa droite",           texte: "Règle par défaut. On roule à droite, on dépasse à gauche." },
      { label: "Changement de direction",   texte: "Clignotant AVANT la manœuvre, vérifier rétroviseurs et angle mort." },
      { label: "Tourner à droite",          texte: "Serrer à droite, céder le passage aux piétons qui traversent, ne pas empiéter sur la voie de gauche." },
      { label: "Tourner à gauche",          texte: "Se placer à gauche de la voie, céder le passage aux véhicules venant en face et aux piétons." },
      { label: "Insertion dans le flux",    texte: "Utiliser la voie d'accélération, atteindre la vitesse du flux, céder le passage." }
    ],
    astuce: "On regarde, on clignote, on vérifie l'angle mort, et seulement après on tourne."
  },

  /* --- La vitesse --- */
  {
    id: "vitesses",
    groupe: "La circulation routière",
    sousGroupe: "La vitesse",
    badge: "L",
    num: "07",
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
    num: "08",
    emoji: "💥",
    titre: "Conséquences & contrôle des vitesses",
    type: "list",
    items: [
      { label: "Distance d'arrêt",          texte: "Distance de réaction (environ 1 s) + distance de freinage. Augmente avec la vitesse." },
      { label: "À 50 km/h",                 texte: "Environ 28 m pour s'arrêter. À 90 km/h : environ 70 m. À 130 km/h : environ 120 m." },
      { label: "Choc à 50 km/h",            texte: "Équivalent d'une chute du 3ᵉ étage. À 90 km/h : du 12ᵉ étage." },
      { label: "Ajustement",                texte: "Adapter sa vitesse aux conditions : pluie, brouillard, trafic, visibilité." },
      { label: "Contrôles",                 texte: "Radars fixes, mobiles, embarqués, tronçons. Excès = amende + retrait de points." },
      { label: "Excès et sanction",         texte: "< 20 km/h : 135 € et -1 pt. 20-30 : -2 pts. 30-40 : -3 pts. 40-50 : -4 pts. > 50 : délit." }
    ],
    astuce: "La vitesse tue deux fois : elle augmente la distance d'arrêt et diminue le temps de réaction disponible."
  },

  /* --- Croiser et dépasser --- */
  {
    id: "croiser-depasser",
    groupe: "La circulation routière",
    sousGroupe: "Croiser et dépasser",
    badge: "L",
    num: "09",
    emoji: "↗️",
    titre: "Se croiser & dépasser",
    type: "list",
    items: [
      { label: "Se croiser",                    texte: "Chacun garde sa droite. Sur route étroite, ralentir et serrer à droite." },
      { label: "Croisements difficiles",        texte: "En montagne, priorité au véhicule qui monte. Le descendant se range." },
      { label: "Dépassement",                   texte: "Par la gauche. À droite uniquement si le véhicule devant tourne à gauche." },
      { label: "Conditions pour dépasser",      texte: "Ligne discontinue, visibilité suffisante, aucun véhicule en face, clignotant." },
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
    num: "10",
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

  {
    id: "conducteur",
    groupe: "Le conducteur",
    sousGroupe: "Conduire",
    badge: "C",
    num: "01",
    emoji: "🧠",
    titre: "Conduire : vue, stratégie, vigilance",
    type: "list",
    items: [
      { label: "Exploration visuelle",  texte: "Regarder loin, balayer la route, anticiper les dangers. Le regard doit précéder le véhicule." },
      { label: "Stratégie de conduite", texte: "Anticiper, adapter sa vitesse, maintenir une distance de sécurité suffisante." },
      { label: "Situations à risque",   texte: "Intersections, virages, sorties de parking, abords d'écoles : redoubler de vigilance." },
      { label: "Communiquer",           texte: "Clignotants, appels de phare, position sur la chaussée. Bien communiquer évite les malentendus." },
      { label: "Distance de sécurité",  texte: "Au moins 2 secondes avec le véhicule devant. Plus si conditions difficiles." },
      { label: "S'arrêter à temps",     texte: "Signes de fatigue : paupières lourdes, bâillements, perte de concentration. Pause obligatoire." },
      { label: "Temps de réaction",     texte: "Environ 1 seconde. Augmente avec la fatigue, l'alcool et la vitesse." },
      { label: "Vue",                   texte: "Champ visuel réduit de nuit (120°). Acuité visuelle minimale requise pour le permis." }
    ],
    astuce: "Bien conduire, c'est d'abord bien regarder. 90 % des informations passent par les yeux."
  },
  {
    id: "alcool",
    groupe: "Le conducteur",
    sousGroupe: "Être en état de conduire",
    badge: "C",
    num: "02",
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
      { label: "Conduite en état d'ivresse",  texte: "Délit : jusqu'à 2 ans de prison et 4 500 € d'amende." }
    ],
    astuce: "Boire un café, dormir ou manger ne fait pas baisser l'alcoolémie : seul le temps compte."
  },
  {
    id: "etat-physique",
    groupe: "Le conducteur",
    sousGroupe: "Être en état de conduire",
    badge: "C",
    num: "03",
    emoji: "😴",
    titre: "Fatigue, vigilance, état psychologique",
    type: "list",
    items: [
      { label: "Fatigue",             texte: "Pause de 15-20 min toutes les 2 heures. Signes : paupières lourdes, bâillements, perte de concentration." },
      { label: "Somnolence",          texte: "Si les signes apparaissent : s'arrêter dès que possible. Une micro-sieste de 15 min est plus efficace qu'un café." },
      { label: "Vigilance",           texte: "Baisse naturelle entre 2 h et 5 h du matin et entre 13 h et 15 h. Redoubler de prudence." },
      { label: "État psychologique",  texte: "Stress, colère, euphorie : altèrent le jugement et augmentent la prise de risque." },
      { label: "Alcool & fatigue",    texte: "Effets cumulatifs : à éviter absolument." },
      { label: "Aptitude médicale",   texte: "Certaines pathologies et traitements imposent une visite médicale régulière." }
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
      { label: "Nuit",            texte: "Champ visuel réduit, distance de perception limitée. Utiliser feux de croisement, réduire la vitesse." },
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
      { label: "Tramways",              texte: "Toujours prioritaires, même sur les piétons. Ne jamais stationner sur les rails." },
      { label: "Zone de rencontre",     texte: "Vitesse limitée à 20 km/h. Priorité aux piétons sur toute la chaussée." },
      { label: "Aire piétonne",         texte: "Vitesse au pas. Priorité absolue aux piétons. Accès réglementé." }
    ],
    astuce: "Dans une zone dangereuse, la vitesse n'est jamais ta priorité : c'est la visibilité et l'anticipation."
  },

  /* ============================================================
     FAMILLE U : LES AUTRES USAGERS
     ============================================================ */

  {
    id: "autres-usagers",
    groupe: "Les autres usagers",
    sousGroupe: "Le partage de la rue",
    badge: "U",
    num: "01",
    emoji: "🤝",
    titre: "Partage de la rue & usagers spécifiques",
    type: "list",
    items: [
      { label: "Piétons",                    texte: "Toujours prioritaires (sauf face au tramway). Céder le passage à tout piéton engagé ou manifestant l'intention de traverser." },
      { label: "Cyclistes",                  texte: "1 m de distance en ville, 1,5 m hors agglomération. Imprévisibles : redoubler de vigilance." },
      { label: "EDPM (trottinettes)",        texte: "Interdits sur les trottoirs. Sur piste cyclable, ou sur la chaussée si limitée à 50 km/h." },
      { label: "Deux-roues motorisés",       texte: "Peu visibles (angles morts), souvent rapides. Conduite inter-files autorisée dans certains départements." },
      { label: "Véhicules d'urgence",        texte: "Police, pompiers, SAMU, SMUR, douanes en mission : leur faciliter le passage, se ranger à droite." },
      { label: "Convois exceptionnels",      texte: "Prioritaires aux croisements. Longs et lents : ne pas s'engager à l'intersection." },
      { label: "Véhicules encombrants",      texte: "Bus, camions, bennes : angles morts importants, distances de freinage plus longues." },
      { label: "Véhicules lents",            texte: "Collecte de déchets, entretien de voirie. S'arrêtent souvent, travailleurs piétons autour." },
      { label: "Bus & autocars",             texte: "Prioritaires en ville quand ils quittent leur arrêt. Attention aux passagers qui peuvent surgir." }
    ],
    astuce: "Le principe, c'est la protection des usagers les plus vulnérables : piéton > cycliste > deux-roues > voiture > poids lourd."
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
      { label: "2ᵉ classe",             texte: "Téléphone au volant, oubli de clignotant, A oublié, non-présentation du permis ou de la carte grise." },
      { label: "3ᵉ classe",             texte: "Excès de vitesse de 1 à 19 km/h sur route limitée à plus de 50 km/h." },
      { label: "4ᵉ classe",             texte: "Excès 20-49 km/h, refus de priorité, non-port de ceinture, franchissement ligne continue, stationnement PMR." },
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
    id: "premiers-secours",
    groupe: "Les premiers secours",
    sousGroupe: "Porter secours",
    badge: "A",
    num: "01",
    emoji: "🚑",
    titre: "Protection, alerte, gestes qui sauvent",
    type: "list",
    items: [
      { label: "La protection",                 texte: "Sécuriser la zone : warning, gilet, triangle (30 m, jamais sur autoroute). Se protéger soi-même avant tout." },
      { label: "L'alerte",                      texte: "Numéros : 112 (UE), 15 (SAMU), 18 (Pompiers). Donner lieu, nature, nombre de victimes, état." },
      { label: "L'accident de la route",        texte: "Ne pas déplacer une victime sauf danger immédiat. Ne pas retirer le casque d'un motard." },
      { label: "Alerte & protection des populations", texte: "Balisage en amont. Ne pas créer de sur-accident en s'arrêtant n'importe où." },
      { label: "Hémorragie",                    texte: "Comprimer la plaie avec la main (gant ou tissu propre). Ne pas retirer le corps étranger planté." },
      { label: "Traumatisme",                   texte: "Ne pas mobiliser la colonne. Laisser la victime dans la position trouvée, sauf danger." },
      { label: "Perte de connaissance",         texte: "Victime qui respire : PLS. Victime qui ne respire plus : massage cardiaque + défibrillateur." },
      { label: "Arrêt cardiaque",               texte: "30 compressions / 2 insufflations. Défibrillateur dès que disponible. Ne jamais s'arrêter avant les secours." }
    ],
    astuce: "Protéger, Alerter, Secourir : toujours dans cet ordre. On ne devient pas une deuxième victime."
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
    emoji: "🚪",
    titre: "S'installer, entrer et sortir",
    type: "list",
    items: [
      { label: "Être à l'aise",            texte: "Régler le siège (position, dossier, appui-tête). Dossier légèrement incliné, jambes semi-fléchies." },
      { label: "Être bien assis",          texte: "Fesses au fond du siège, dos plaqué contre le dossier, épaules relâchées." },
      { label: "Avoir une visibilité optimale", texte: "Régler les rétroviseurs intérieur et extérieurs. Voir le maximum de route derrière soi." },
      { label: "Ajuster la ceinture",      texte: "Sangle basse sur le bassin, jamais sur le ventre. Sangle haute sur l'épaule, pas sur le cou." },
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
    titre: "Vue d'ensemble & tableau de bord",
    type: "list",
    items: [
      { label: "Vue d'ensemble",        texte: "Moteur, boîte de vitesses, freins, direction, suspension, échappement : connaître le rôle de chaque organe." },
      { label: "Tableau de bord",       texte: "Rouge = alarme (arrêt immédiat). Orange = alerte (vérification rapide). Vert/bleu = info (équipement actif)." },
      { label: "Éclairage",             texte: "Position, croisement, route, brouillard, stop, warning : voir la fiche « Les feux »." }
    ],
    astuce: "Plusieurs voyants rouges s'allument brièvement au démarrage : c'est normal. S'ils restent allumés moteur tournant, il y a un problème."
  },
  {
    id: "eclairage",
    groupe: "La mécanique et les équipements",
    sousGroupe: "Le fonctionnement",
    badge: "M",
    num: "02",
    emoji: "💡",
    titre: "Les feux : position, croisement, route, brouillard",
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
    id: "voyants",
    groupe: "La mécanique et les équipements",
    sousGroupe: "Le fonctionnement",
    badge: "M",
    num: "03",
    emoji: "🚨",
    titre: "Voyants du tableau de bord (détail)",
    type: "list",
    items: [
      { label: "Voyant moteur (orange)",         texte: "Augmentation de la pollution. Diagnostic à faire rapidement en garage." },
      { label: "Pression d'huile (rouge)",       texte: "S'arrêter immédiatement, couper le moteur, vérifier le niveau. Risque de casse moteur." },
      { label: "Température moteur (rouge)",     texte: "Moteur en surchauffe : arrêt immédiat. Ne jamais ouvrir le bocal à chaud." },
      { label: "Batterie (rouge)",               texte: "Circuit de charge défaillant (alternateur, régulateur). Risque de panne rapide." },
      { label: "Frein à main / liquide de frein", texte: "Frein à main serré, ou baisse de pression dans le circuit de freinage." },
      { label: "ABS / ESP (orange)",             texte: "Système défaillant : prudence au freinage ou au dérapage. Vérification à faire." },
      { label: "Ceinture / portière / capot",    texte: "Sécurité passive : mettre la ceinture, fermer portières, capot, coffre." },
      { label: "AdBlue",                         texte: "Niveau bas : refaire le plein rapidement, sinon le véhicule refusera de démarrer." }
    ],
    astuce: "Un voyant rouge allumé moteur tournant n'est jamais un détail : on s'arrête en sécurité et on vérifie."
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
      { label: "Les visites techniques",    texte: "Premier CT : dans les <strong>4 mois</strong> précédant le 4ᵉ anniversaire. Ensuite tous les 2 ans." },
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
    sousGroupe: "L'installation sécurisée des passagers",
    badge: "S",
    num: "01",
    emoji: "👶",
    titre: "Adultes & enfants : ceinture, airbags, sièges",
    type: "list",
    items: [
      { label: "La ceinture",                 texte: "Obligatoire à toutes les places, avant comme arrière. Le conducteur est responsable du port pour les moins de 18 ans." },
      { label: "Coussins gonflables (airbags)", texte: "Complément de la ceinture, pas un substitut. Ne pas approcher le visage du volant ou de la planche de bord." },
      { label: "Sièges homologués",           texte: "Enfants < 10 ans : dispositif de retenue homologué obligatoire, adapté au poids et à la taille." },
      { label: "Système de sécurité enfant",  texte: "Siège bébé dos à la route : JAMAIS sur le siège passager avant avec airbag actif. Désactiver l'airbag passager." },
      { label: "Chargement",                  texte: "Objets lourds dans le coffre, arrimés. Ne rien poser sur la plage arrière (projectiles en cas de freinage)." },
      { label: "Passagers",                   texte: "Nombre limité aux places de la carte grise. Tous doivent être attachés." }
    ],
    astuce: "Un passager non attaché à l'arrière peut tuer le conducteur en cas de choc frontal : il est projeté vers l'avant."
  },
  {
    id: "securite",
    groupe: "La sécurité du passager et du véhicule",
    sousGroupe: "Les nouvelles aides technologiques",
    badge: "S",
    num: "02",
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

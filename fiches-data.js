/* =========================================================
   CONTENU DES FICHES DE COURS.
   Uniquement ce qui est affiché dans fiches.html.
   ========================================================= */

const FICHES = [
  {
    id: "vitesses",
    num: "01",
    emoji: "⚡",
    titre: "Vitesses maximales autorisées",
    type: "table",
    colonnes: ["Situation", "Temps sec", "Pluie", "Probatoire"],
    lignes: [
      { label: "Agglomération",             sec: "50 km/h",  pluie: "50 km/h",  probatoire: "50 km/h" },
      { label: "Hors agglomération",        sec: "80 km/h",  pluie: "80 km/h",  probatoire: "80 km/h" },
      { label: "Voie rapide (2×2 voies)",   sec: "110 km/h", pluie: "100 km/h", probatoire: "100 km/h" },
      { label: "Autoroute",                 sec: "130 km/h", pluie: "110 km/h", probatoire: "110 km/h" }
    ]
  },
  {
    id: "priorites",
    num: "02",
    emoji: "🛑",
    titre: "Priorités & croisements",
    type: "list",
    items: [
      { label: "Priorité à droite",  texte: "Règle par défaut, sans signalisation ni marquage au sol." },
      { label: "Cédez-le-passage",   texte: "Ralentir, et s'arrêter si nécessaire. Pas d'arrêt obligatoire." },
      { label: "Stop",               texte: "Arrêt complet obligatoire à la ligne d'effet, même sans autre véhicule." },
      { label: "Giratoire",          texte: "Priorité aux véhicules déjà engagés sur l'anneau." },
      { label: "Feux tricolores",    texte: "Priorité selon l'allumage. Orange = arrêt sauf si dangereux." }
    ]
  },
  {
    id: "marquage",
    num: "03",
    emoji: "🛣️",
    titre: "Marquage au sol",
    type: "list",
    items: [
      { label: "Ligne continue",         texte: "Interdiction de franchir ou chevaucher (sauf dépassement de vélos)." },
      { label: "Ligne discontinue",      texte: "Dépassement et changement de voie autorisés." },
      { label: "Ligne d'avertissement",  texte: "Annonce l'approche d'une ligne continue (3 flèches)." },
      { label: "Ligne de dissuasion",    texte: "Dépassement toléré uniquement pour véhicules très lents." }
    ]
  },
  {
    id: "mecanique",
    num: "04",
    emoji: "🔧",
    titre: "Mécanique & Contrôle technique",
    type: "list",
    items: [
      { label: "Pneumatiques", texte: "Profondeur minimale des rainures : <strong>1,6 mm</strong>." },
      { label: "Niveaux",      texte: "À vérifier moteur froid et véhicule à plat (huile, frein, refroidissement)." },
      { label: "Premier CT",   texte: "Dans les <strong>4 mois</strong> précédant le 4ᵉ anniversaire du véhicule." },
      { label: "Ensuite",      texte: "Tous les <strong>2 ans</strong>." }
    ]
  },
  {
    id: "alcool",
    num: "05",
    emoji: "🍷",
    titre: "Alcool & stupéfiants",
    type: "list",
    items: [
      { label: "Conducteur confirmé", texte: "Max <strong>0,5 g/l</strong> de sang (0,25 mg/l d'air expiré)." },
      { label: "Permis probatoire",   texte: "Max <strong>0,2 g/l</strong> de sang (0,10 mg/l d'air expiré)." },
      { label: "Stupéfiants",         texte: "Tolérance zéro, dépistage salivaire autorisé." }
    ]
  },
  {
    id: "securite",
    num: "06",
    emoji: "⚙️",
    titre: "Aides à la conduite (ADAS)",
    type: "list",
    items: [
      { label: "ABS", texte: "Empêche le blocage des roues pour conserver la maîtrise du volant." },
      { label: "ESP", texte: "Corrige la trajectoire en cas de dérapage." },
      { label: "AFU", texte: "Amplifie la pression de freinage lors d'un freinage d'urgence." }
    ]
  },
  {
    id: "signalisation",
    num: "07",
    emoji: "🚸",
    titre: "Signalisation",
    type: "list",
    items: [
      { label: "Triangle bordure rouge", texte: "Panneau de danger. Annonce un danger à venir." },
      { label: "Rond bordure rouge",     texte: "Panneau d'interdiction." },
      { label: "Rond bleu",              texte: "Panneau d'obligation." },
      { label: "Carré bleu",             texte: "Panneau d'indication (parking, hôpital…)." }
    ]
  },
  {
    id: "premiers-secours",
    num: "08",
    emoji: "🚑",
    titre: "Premiers secours",
    type: "list",
    items: [
      { label: "Ordre des actions", texte: "<strong>Protéger</strong>, <strong>Alerter</strong>, <strong>Secourir</strong>." },
      { label: "Victime inconsciente qui respire", texte: "Position Latérale de Sécurité (PLS)." },
      { label: "Victime inconsciente qui ne respire plus", texte: "Massage cardiaque + défibrillateur si dispo." },
      { label: "Numéros d'urgence", texte: "112 (UE), 15 (SAMU), 18 (Pompiers)." }
    ]
  },
  {
    id: "ecoconduite",
    num: "09",
    emoji: "🌱",
    titre: "Écoconduite",
    type: "list",
    items: [
      { label: "Anticipation",      texte: "Lever le pied tôt plutôt que freiner au dernier moment." },
      { label: "Rapports",          texte: "Passer les vitesses tôt, sans monter dans les tours." },
      { label: "Arrêt prolongé",    texte: "Couper le moteur au-delà de 30 secondes d'arrêt." },
      { label: "Pneumatiques",      texte: "Vérifier régulièrement la pression (pneus sous-gonflés = surconsommation)." }
    ]
  }
];

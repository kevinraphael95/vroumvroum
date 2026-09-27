/* =========================================================
   CONTENU DES FICHES DE COURS.
   Source unique pour fiches.html (rendu via fiches.js).
   Chaque fiche a un "groupe" pour regrouper dans la sidebar.

   SOURCES PRINCIPALES :
   - Service-Public.gouv.fr (documents, assurance, infractions)
   - Sécurité Routière (thèmes officiels ETG)
   - Codes Rousseau / Ornikar / Permisécole (thèmes pédagogiques)
   ========================================================= */

const FICHES = [

  /* ============================================================
     GROUPE : CIRCULATION
     ============================================================ */

  {
    id: "vitesses",
    groupe: "Circulation",
    num: "01",
    emoji: "⚡",
    titre: "Vitesses maximales autorisées",
    type: "table",
    colonnes: ["Situation", "Temps sec", "Pluie", "Probatoire"],
    lignes: [
      { label: "Agglomération",           sec: "50 km/h",  pluie: "50 km/h",  probatoire: "50 km/h" },
      { label: "Hors agglomération",      sec: "80 km/h",  pluie: "80 km/h",  probatoire: "80 km/h" },
      { label: "Voie rapide (2×2 voies)", sec: "110 km/h", pluie: "100 km/h", probatoire: "100 km/h" },
      { label: "Autoroute",               sec: "130 km/h", pluie: "110 km/h", probatoire: "110 km/h" }
    ],
    astuce: "Brouillard (visibilité < 50 m) → 50 km/h sur tout le réseau, même autoroute."
  },
  {
    id: "priorites",
    groupe: "Circulation",
    num: "02",
    emoji: "🛑",
    titre: "Priorités & croisements",
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
  {
    id: "marquage",
    groupe: "Circulation",
    num: "03",
    emoji: "🛣️",
    titre: "Marquage au sol",
    type: "list",
    items: [
      { label: "Ligne continue",           texte: "Interdiction de franchir ou chevaucher (sauf dépassement d'un cycliste)." },
      { label: "Ligne discontinue",        texte: "Dépassement et changement de voie autorisés." },
      { label: "Ligne d'avertissement",    texte: "Annonce l'approche d'une ligne continue (3 flèches)." },
      { label: "Ligne de dissuasion",      texte: "Dépassement toléré uniquement pour véhicules très lents (< 60 km/h)." },
      { label: "Bande d'arrêt d'urgence",  texte: "Réservée aux arrêts d'urgence et véhicules de secours." },
      { label: "Passage piéton",           texte: "Céder le passage à tout piéton engagé ou manifestant l'intention de traverser." },
      { label: "Lignes d'arrêt",           texte: "Trait épais continu en travers de la voie → arrêt obligatoire." }
    ],
    astuce: "Une ligne continue ne s'arrête jamais au niveau d'une intersection : elle reprend après."
  },
  {
    id: "depassement",
    groupe: "Circulation",
    num: "04",
    emoji: "↗️",
    titre: "Dépassement",
    type: "list",
    items: [
      { label: "Règle de base",                 texte: "Dépassement par la gauche. Par la droite uniquement si le véhicule devant tourne à gauche." },
      { label: "Vérifications",                 texte: "Rétroviseurs, angle mort, clignotant, ligne discontinue, aucun véhicule en face." },
      { label: "Cyclistes",                     texte: "1 m en agglomération, 1,5 m hors agglomération." },
      { label: "Interdiction",                  texte: "Ligne continue, sommet de côte, virage, passage à niveau, intersection." },
      { label: "Dépassement d'un bus à l'arrêt", texte: "Ralentir et céder le passage aux piétons." }
    ],
    astuce: "En cas de doute, on ne dépasse pas. Un dépassement raté peut coûter très cher."
  },
  {
    id: "stationnement",
    groupe: "Circulation",
    num: "05",
    emoji: "🅿️",
    titre: "Stationnement & arrêt",
    type: "list",
    items: [
      { label: "Arrêt",                  texte: "Immobilisation brève, conducteur à bord, moteur pouvant rester allumé." },
      { label: "Stationnement",          texte: "Immobilisation prolongée, conducteur peut quitter le véhicule." },
      { label: "Stationnement interdit", texte: "Sur trottoir, passage piéton, arrêt de bus, emplacement PMR, devant une bouche d'incendie." },
      { label: "En pente",               texte: "Serrer le frein à main, laisser une vitesse enclenchée, braquer les roues vers le trottoir." },
      { label: "Zone bleue",             texte: "Stationnement à durée limitée, contrôlé par disque." },
      { label: "Emplacement PMR",        texte: "Réservé aux titulaires de la carte mobilité inclusion mention handicap." }
    ],
    astuce: "En descente, on braque les roues vers le trottoir ; en montée, on les éloigne du trottoir."
  },
  {
    id: "autoroute",
    groupe: "Circulation",
    num: "06",
    emoji: "🛤️",
    titre: "Autoroute",
    type: "list",
    items: [
      { label: "Vitesse",                    texte: "130 km/h (110 par temps de pluie). Probatoire : 110 km/h." },
      { label: "Voie de droite",             texte: "On roule à droite, sauf pour dépasser." },
      { label: "Bande d'arrêt d'urgence",    texte: "Réservée aux urgences et véhicules de secours." },
      { label: "Demi-tour",                  texte: "Interdit. Sortie par la prochaine sortie ou aire de repos." },
      { label: "Arrêt",                      texte: "Interdit, sauf urgence absolue (panne, malaise)." },
      { label: "Insertion",                  texte: "Céder le passage aux véhicules déjà sur l'autoroute. Accélérer sur la voie d'accélération." }
    ],
    astuce: "Sur autoroute, une pause toutes les 2 heures est fortement recommandée."
  },

  /* ============================================================
     GROUPE : VÉHICULE
     ============================================================ */

  {
    id: "mecanique",
    groupe: "Véhicule",
    num: "07",
    emoji: "🔧",
    titre: "Mécanique & Contrôle technique",
    type: "list",
    items: [
      { label: "Pneumatiques",     texte: "Profondeur minimale des rainures : <strong>1,6 mm</strong>. Vérifier aussi la pression." },
      { label: "Niveaux",          texte: "Huile, liquide de frein, refroidissement : à vérifier moteur froid et véhicule à plat." },
      { label: "Premier CT",       texte: "Dans les <strong>4 mois</strong> précédant le 4ᵉ anniversaire du véhicule." },
      { label: "Ensuite",          texte: "Tous les <strong>2 ans</strong>." },
      { label: "Voyants moteur",   texte: "Rouge → arrêt immédiat en sécurité. Jaune → vérification rapide." },
      { label: "Documents à bord", texte: "Carte grise, attestation d'assurance, permis de conduire." }
    ],
    astuce: "Un contrôle technique non effectué à temps peut entraîner une amende et une contre-visite dans les 2 mois."
  },
  {
    id: "voyants",
    groupe: "Véhicule",
    num: "08",
    emoji: "🚨",
    titre: "Voyants du tableau de bord",
    type: "list",
    items: [
      { label: "Rouge = alarme",                 texte: "Urgence. S'arrêter dès que possible en sécurité pour éviter panne ou accident." },
      { label: "Orange = alerte",                texte: "Anomalie à vérifier rapidement (pas d'urgence immédiate, mais ne pas ignorer)." },
      { label: "Vert / bleu = info",             texte: "Signalisation d'un équipement actif (feux, mode éco…). Aucune urgence." },
      { label: "Voyant moteur (orange)",         texte: "Augmentation de la pollution. Diagnostic à faire rapidement en garage." },
      { label: "Pression d'huile (rouge)",       texte: "S'arrêter immédiatement, couper le moteur, vérifier le niveau. Risque de casse moteur." },
      { label: "Température moteur (rouge)",     texte: "Moteur en surchauffe → arrêt immédiat. Ne jamais ouvrir le bocal à chaud." },
      { label: "Batterie (rouge)",               texte: "Circuit de charge défaillant (alternateur, régulateur). Risque de panne rapide." },
      { label: "Frein à main / liquide de frein", texte: "Frein à main serré, ou baisse de pression dans le circuit de freinage." },
      { label: "ABS / ESP (orange)",             texte: "Système défaillant → prudence au freinage ou au dérapage. Vérification à faire." },
      { label: "Ceinture / portière / capot",    texte: "Sécurité passive : mettre la ceinture, fermer portières, capot, coffre." },
      { label: "AdBlue",                         texte: "Niveau bas : refaire le plein rapidement, sinon le véhicule refusera de démarrer." }
    ],
    astuce: "Plusieurs voyants rouges s'allument brièvement au démarrage : c'est normal. S'ils restent allumés moteur tournant, il y a un problème."
  },
  {
    id: "eclairage",
    groupe: "Véhicule",
    num: "09",
    emoji: "💡",
    titre: "Éclairage & signalisation",
    type: "list",
    items: [
      { label: "Feux de croisement", texte: "Obligatoires la nuit, sous la pluie, dans les tunnels, par visibilité réduite." },
      { label: "Feux de route",      texte: "Hors agglomération, la nuit, si aucune gêne pour les autres usagers." },
      { label: "Feux de position",   texte: "Signalent le véhicule à l'arrêt ou en stationnement." },
      { label: "Feux de brouillard", texte: "Uniquement en cas de brouillard, forte pluie ou neige. À éteindre dès que possible." },
      { label: "Feux stop",          texte: "S'allument au freinage. Indispensables à la sécurité arrière." },
      { label: "Warning",            texte: "Signale un danger (panne, ralentissement brusque, accident)." }
    ],
    astuce: "Sous la pluie, feux de croisement obligatoires. Les feux de brouillard éblouissent les autres : à réserver au brouillard."
  },
  {
    id: "securite",
    groupe: "Véhicule",
    num: "10",
    emoji: "⚙️",
    titre: "Aides à la conduite (ADAS)",
    type: "list",
    items: [
      { label: "ABS",                    texte: "Empêche le blocage des roues → garder le contrôle du volant au freinage." },
      { label: "ESP",                    texte: "Corrige la trajectoire en cas de dérapage (agit sur freins + moteur)." },
      { label: "AFU",                    texte: "Amplifie la pression de freinage lors d'un freinage d'urgence." },
      { label: "Régulateur / limiteur",  texte: "Maintient une vitesse constante. Le régulateur ne freine pas seul en descente." },
      { label: "Aide au stationnement",  texte: "Radars et caméras : complètent la vision mais ne remplacent pas le conducteur." }
    ],
    astuce: "Les ADAS assistent, mais ne pilotent pas : la responsabilité reste toujours celle du conducteur."
  },
  {
    id: "equipements",
    groupe: "Véhicule",
    num: "11",
    emoji: "🧰",
    titre: "Équipements obligatoires",
    type: "list",
    items: [
      { label: "Gilet haute visibilité",        texte: "Obligatoire à bord. À enfiler avant de sortir du véhicule en cas d'arrêt d'urgence." },
      { label: "Triangle de présignalisation",  texte: "Obligatoire à bord. À placer 30 m avant le véhicule (jamais sur autoroute : se réfugier)." },
      { label: "Éclairage",                     texte: "Tous les feux en état de marche (croisement, route, stop, clignotants, plaque)." },
      { label: "Pneumatiques",                  texte: "Profondeur minimale 1,6 mm. Pression vérifiée régulièrement." },
      { label: "Pare-brise et vitres",          texte: "Non obstrués, parfaitement transparents. Pare-brise sans fissure devant le conducteur." },
      { label: "Plaques d'immatriculation",     texte: "Propres, éclairées, lisibles. Avant et arrière." },
      { label: "Rétroviseurs",                  texte: "Intérieur et extérieurs : tous obligatoires et en état." }
    ],
    astuce: "Un constat amiable, une roue de secours ou un éthylotest ne sont pas obligatoires, mais fortement recommandés."
  },

  /* ============================================================
     GROUPE : CONDUCTEUR
     ============================================================ */

  {
    id: "alcool",
    groupe: "Conducteur",
    num: "12",
    emoji: "🍷",
    titre: "Alcool & stupéfiants",
    type: "list",
    items: [
      { label: "Conducteur confirmé",         texte: "Max <strong>0,5 g/l</strong> de sang (0,25 mg/l d'air expiré)." },
      { label: "Permis probatoire",           texte: "Max <strong>0,2 g/l</strong> de sang (0,10 mg/l d'air expiré)." },
      { label: "Stupéfiants",                 texte: "Tolérance zéro. Dépistage salivaire autorisé." },
      { label: "Médicaments",                 texte: "Certains altèrent la conduite : respecter les pictogrammes de la notice." },
      { label: "Polyconsommation",            texte: "Prise combinée de plusieurs substances (alcool + drogues + médicaments) : effets multipliés, danger maximal." },
      { label: "Refus de dépistage",          texte: "Délit : jusqu'à 2 ans de prison et 4 500 € d'amende." },
      { label: "Conduite en état d'ivresse",  texte: "Délit : jusqu'à 2 ans de prison et 4 500 € d'amende." }
    ],
    astuce: "Boire un café, dormir ou manger ne fait pas baisser l'alcoolémie : seul le temps compte."
  },
  {
    id: "conducteur",
    groupe: "Conducteur",
    num: "13",
    emoji: "🧠",
    titre: "Conducteur : aptitude & vigilance",
    type: "list",
    items: [
      { label: "Temps de réaction",     texte: "Environ 1 seconde. Distance parcourue pendant ce temps = distance de réaction." },
      { label: "Distance d'arrêt",      texte: "Distance de réaction + distance de freinage. Augmente avec la vitesse et par temps de pluie." },
      { label: "Fatigue",               texte: "Pause toutes les 2 heures. Signes : paupières lourdes, bâillements, perte de concentration." },
      { label: "Vue",                   texte: "Champ visuel réduit de nuit (champ de 120°). Acuité visuelle minimale requise pour le permis." },
      { label: "Téléphone",             texte: "Téléphone tenu en main interdit. Kit mains libres toléré mais déconseillé." },
      { label: "Oreillette / casque",   texte: "Interdits au volant (sauf appareils auditifs médicaux)." },
      { label: "Alcool & fatigue",      texte: "Effets cumulatifs : à éviter absolument." },
      { label: "Aptitude médicale",     texte: "Certaines pathologies et traitements imposent une visite médicale régulière." }
    ],
    astuce: "La fatigue tue plus que l'alcool sur la route. Une pause de 15-20 min toutes les 2 h sauve des vies."
  },
  {
    id: "infractions",
    groupe: "Conducteur",
    num: "14",
    emoji: "⚖️",
    titre: "Infractions & sanctions",
    type: "list",
    items: [
      { label: "1ʳᵉ classe",            texte: "Le plus léger : stationnement gênant, feux non conformes. Amende forfaitaire réduite." },
      { label: "2ᵉ classe",             texte: "Téléphone au volant, oubli de clignotant, non-présentation d'assurance, A oublié (jeune conducteur)." },
      { label: "3ᵉ classe",             texte: "Excès de vitesse de 1 à 19 km/h sur route limitée à plus de 50 km/h." },
      { label: "4ᵉ classe",             texte: "Excès 20-49 km/h, refus de priorité, non-port de ceinture, franchissement ligne continue, stationnement PMR…" },
      { label: "5ᵉ classe",             texte: "Infractions les plus graves : retrait de 6 points, suspension ou annulation possible." },
      { label: "Délits",                texte: "Alcoolémie ≥ 0,8 g/l, refus d'obtempérer, délit de fuite, conduite malgré suspension. Jusqu'à 10 ans de prison." },
      { label: "Annulation du permis",  texte: "Solde de points à zéro, ou décision judiciaire. Re-passage obligatoire après visite médicale et tests psychotechniques." }
    ],
    astuce: "Une infraction de 4ᵉ classe, c'est déjà un rendez-vous au tribunal de proximité. Les 5ᵉ et les délits, c'est le tribunal correctionnel."
  },
  {
    id: "documents",
    groupe: "Conducteur",
    num: "15",
    emoji: "📄",
    titre: "Documents & obligations",
    type: "list",
    items: [
      { label: "Documents à bord",         texte: "Carte grise, permis de conduire. <strong>Assurance : plus obligatoire à présenter</strong> depuis avril 2024 (vérification via FVA)." },
      { label: "Non-port de la ceinture",  texte: "Amende forfaitaire 135 €, -3 points (conducteur)." },
      { label: "Excès de vitesse",         texte: "< 20 km/h : 135 €, -1 point. 20-30 : -2 points. 30-40 : -3 points. 40-50 : -4 points. > 50 : délit." },
      { label: "Alcoolémie",               texte: "≥ 0,8 g/l : délit (2 ans, 4 500 €). Entre 0,5 et 0,8 : amende 135 €, -6 points." },
      { label: "Délit de fuite",           texte: "Jusqu'à 3 ans de prison et 75 000 € d'amende." },
      { label: "Suspension de permis",     texte: "Jusqu'à 6 mois pour une infraction grave, 1 an en cas de récidive." }
    ],
    astuce: "Ne pas présenter immédiatement les documents = amende jusqu'à 38 €. Sans justification sous 5 jours = jusqu'à 750 €."
  },

  /* ============================================================
     GROUPE : SÉCURITÉ & ENVIRONNEMENT
     ============================================================ */

  {
    id: "autres-usagers",
    groupe: "Sécurité",
    num: "16",
    emoji: "🤝",
    titre: "Autres usagers de la route",
    type: "list",
    items: [
      { label: "Piétons",                 texte: "Toujours prioritaires (sauf face au tramway). Céder le passage à tout piéton engagé ou manifestant l'intention de traverser." },
      { label: "Cyclistes",               texte: "1 m de distance en ville, 1,5 m hors agglomération. Imprévisibles : redoubler de vigilance." },
      { label: "EDPM (trottinettes)",     texte: "Interdits sur les trottoirs. Sur piste cyclable, ou sur la chaussée si limitée à 50 km/h." },
      { label: "Motards",                 texte: "Peu visibles (angles morts), souvent rapides. Conduite inter-files autorisée dans certains départements." },
      { label: "Véhicules prioritaires",  texte: "Police, pompiers, SAMU, SMUR, douanes en mission : leur faciliter le passage, se ranger à droite." },
      { label: "Convois exceptionnels",   texte: "Prioritaires aux croisements. Longs et lents : ne pas s'engager à l'intersection." },
      { label: "Bus / autocars",          texte: "Prioritaires en ville quand ils quittent leur arrêt. Attention aux passagers qui peuvent surgir." },
      { label: "Véhicules lents",         texte: "Collecte de déchets, entretien de voirie. S'arrêtent souvent, travailleurs piétons autour." }
    ],
    astuce: "Le principe, c'est la protection des usagers les plus vulnérables : piéton > cycliste > deux-roues > voiture > poids lourd."
  },
  {
    id: "communication",
    groupe: "Sécurité",
    num: "17",
    emoji: "👋",
    titre: "Communication entre usagers",
    type: "list",
    items: [
      { label: "Clignotant",           texte: "Obligatoire avant tout changement de direction ou de voie, et en sortie de giratoire." },
      { label: "Appel de phare",       texte: "Signale un danger, ou autorise (à tort) à passer. À utiliser avec discernement." },
      { label: "Avertisseur sonore",   texte: "Réservé aux situations d'urgence. Interdit en agglomération, sauf danger immédiat." },
      { label: "Warning",              texte: "Signale un danger, un ralentissement brusque ou un arrêt d'urgence." },
      { label: "Signes cyclistes",     texte: "Bras tendu = changement de direction. Bras levé = arrêt. Mouvements bas-haut = ralentir." },
      { label: "Signes motards",       texte: "Salut entre motards. Jambe tendue en se rabattant = remerciement." },
      { label: "Courtoisie",           texte: "Remercier d'un geste, faciliter les insertions. La courtoisie, c'est aussi de la sécurité." }
    ],
    astuce: "Bien communiquer, c'est éviter les malentendus. Le clignotant oublié ou le warning non allumé sont responsables de beaucoup d'accidents."
  },
  {
    id: "signalisation",
    groupe: "Sécurité",
    num: "18",
    emoji: "🚸",
    titre: "Signalisation",
    type: "list",
    items: [
      { label: "Triangle bordure rouge",              texte: "Panneau de danger. Annonce un danger à venir (virage, chaussée glissante…)." },
      { label: "Rond bordure rouge",                  texte: "Panneau d'interdiction (sens interdit, dépassement interdit…)." },
      { label: "Rond bleu",                           texte: "Panneau d'obligation (sens obligatoire, piste cyclable…)." },
      { label: "Carré bleu",                          texte: "Panneau d'indication (parking, hôpital, aire de repos…)." },
      { label: "Panneau de priorité (carré jaune)",   texte: "Positionne la voie par rapport aux autres (route prioritaire, croisement)." },
      { label: "Panneau d'agglomération",             texte: "Entrée / sortie d'agglomération : applique les règles urbaines (50 km/h)." }
    ],
    astuce: "La forme et la couleur comptent plus que le dessin : un panneau rond à bordure rouge est toujours une interdiction."
  },
  {
    id: "premiers-secours",
    groupe: "Sécurité",
    num: "19",
    emoji: "🚑",
    titre: "Premiers secours",
    type: "list",
    items: [
      { label: "Ordre des actions",                texte: "<strong>Protéger</strong>, <strong>Alerter</strong>, <strong>Secourir</strong>." },
      { label: "Victime qui respire",              texte: "Inconsciente mais qui respire → PLS (Position Latérale de Sécurité)." },
      { label: "Victime qui ne respire plus",      texte: "Massage cardiaque + défibrillateur si disponible." },
      { label: "Victime consciente",               texte: "Ne pas déplacer, la couvrir, la rassurer." },
      { label: "Numéros d'urgence",                texte: "112 (UE), 15 (SAMU), 18 (Pompiers)." },
      { label: "Sécurisation",                     texte: "Gilet haute visibilité + triangle à 30 m minimum (hors autoroute)." }
    ],
    astuce: "Sur autoroute, ne jamais placer un triangle : on rejoint le refuge ou la borne d'appel."
  },
  {
    id: "ecoconduite",
    groupe: "Sécurité",
    num: "20",
    emoji: "🌱",
    titre: "Écoconduite",
    type: "list",
    items: [
      { label: "Anticipation",    texte: "Lever le pied tôt plutôt que freiner au dernier moment." },
      { label: "Rapports",        texte: "Passer les vitesses tôt, sans monter dans les tours." },
      { label: "Arrêt prolongé",  texte: "Couper le moteur au-delà de 30 secondes d'arrêt." },
      { label: "Pneumatiques",    texte: "Vérifier régulièrement la pression (sous-gonflage = surconsommation)." },
      { label: "Climatisation",   texte: "À utiliser avec parcimonie : +10 à +20 % de consommation." },
      { label: "Entretien",       texte: "Un moteur bien entretenu consomme moins." }
    ],
    astuce: "L'écoconduite, c'est aussi de la sécurité : anticiper = freiner moins = conduire plus cool."
  },

  /* ============================================================
     GROUPE : CONDUITE & CONDITIONS
     ============================================================ */

  /* 
   * Source : Codes Rousseau — Les 10 thèmes du Code de la route
   * https://public.codesrousseau.fr/conseils-pratiques/783-comment-bien-repondre-aux-questions-de-code.html
   * Vérifié le : 27 septembre 2026
   * 
   * Thème « La route » : conduite de nuit, intempéries, autoroute, zones dangereuses.
   */
  {
    id: "conduite-difficile",
    groupe: "Conduite",
    num: "21",
    emoji: "🌧️",
    titre: "Conduite par conditions difficiles",
    type: "list",
    items: [
      { label: "Nuit", texte: "Champ visuel réduit, distance de perception limitée. Utiliser feux de croisement, réduire la vitesse." },
      { label: "Pluie", texte: "Distance de freinage augmentée, risque d'aquaplanage. Réduire la vitesse, augmenter les distances." },
      { label: "Brouillard", texte: "Visibilité < 50 m → 50 km/h. Utiliser feux de croisement et brouillard (avant), jamais les feux de route." },
      { label: "Neige / verglas", texte: "Adhérence réduite. Conduire en douceur, éviter les freinages brusques. Chaînes obligatoires en zone signalée." },
      { label: "Aquaplanage", texte: "Perte de contact avec la route due à une pellicule d'eau. Ne pas freiner brusquement ni accélérer : relâcher l'accélérateur et tenir le volant." },
      { label: "Vent latéral", texte: "Peut déporter le véhicule, surtout à la sortie d'un tunnel ou sur un pont. Tenir fermement le volant, réduire la vitesse." }
    ],
    astuce: "Par conditions difficiles, la règle d'or est toujours la même : ralentir et augmenter les distances de sécurité."
  },

  /* 
   * Source : Codes Rousseau — Thème « Prendre et quitter son véhicule »
   * https://public.codesrousseau.fr/conseils-pratiques/783-comment-bien-repondre-aux-questions-de-code.html
   * 
   * Source : Permisécole — Famille P
   * https://www.permisecole.com/code/examen/familles
   */
  {
    id: "prendre-quitter",
    groupe: "Conduite",
    num: "22",
    emoji: "🚪",
    titre: "Prendre et quitter son véhicule",
    type: "list",
    items: [
      { label: "Avant de monter", texte: "Vérifier l'état du véhicule (pneus, feux, rétroviseurs) et l'absence d'obstacle autour." },
      { label: "Installation", texte: "Régler le siège (position, dossier), les rétroviseurs, attacher sa ceinture avant de démarrer." },
      { label: "Position de conduite", texte: "Pieds pouvant enfoncer les pédales à fond, bras légèrement fléchis sur le volant, vision dégagée." },
      { label: "Ouverture de portière", texte: "Vérifier rétroviseur et angle mort avant d'ouvrir. Risque d'accident avec cyclistes et piétons (emportiérage)." },
      { label: "Quitter le véhicule", texte: "Couper le moteur, serrer le frein à main, retirer la clé, fermer à clé. Sur autoroute : sortir côté opposé au trafic." }
    ],
    astuce: "Un cycliste percuté par une portière ouverte = un accident grave. Toujours regarder avant d'ouvrir."
  },

  /* 
   * Source : Permisécole — Famille S « Équipements de sécurité »
   * https://www.permisecole.com/code/gratuit
   * 
   * Source : Ornikar — Thème « Sécurité du passager et du véhicule »
   * https://www.ornikar.com/code/gratuit/test-thematique
   */
  {
    id: "securite-passager",
    groupe: "Conduite",
    num: "23",
    emoji: "👶",
    titre: "Sécurité du passager",
    type: "list",
    items: [
      { label: "Ceinture", texte: "Obligatoire à toutes les places, à l'avant comme à l'arrière. Le conducteur est responsable du port pour les moins de 18 ans." },
      { label: "Enfants < 10 ans", texte: "Dispositif de retenue homologué obligatoire (siège bébé, rehausseur), adapté au poids et à la taille." },
      { label: "Siège bébé dos à la route", texte: "Ne jamais l'installer sur le siège passager avant avec airbag actif : désactiver l'airbag passager." },
      { label: "Airbags", texte: "Complément de la ceinture, pas un substitut. Ne pas approcher le visage du volant ou de la planche de bord." },
      { label: "Chargement", texte: "Objets lourds dans le coffre, arrimés. Ne rien poser sur la plage arrière (projectiles en cas de freinage)." },
      { label: "Passagers", texte: "Nombre de passagers limité aux places disponibles (carte grise). Tous doivent être attachés." }
    ],
    astuce: "Un passager non attaché à l'arrière peut tuer le conducteur en cas de choc frontal : il est projeté vers l'avant."
  }
];

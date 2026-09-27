/* =========================================================
   BANQUE DE QUESTIONS.
   Templates paramétrables — génèrent des questions variées.
   Alignés sur les 20 fiches de fiches-data.js.
   ========================================================= */

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestion(category, question, correct, wrongs, explanation) {
  return {
    category,
    question,
    answer: correct,
    shuffledOptions: shuffle([correct, ...wrongs]),
    explanation
  };
}

const questionTemplates = [

  /* ==================== VITESSES ==================== */
  {
    category: "Vitesses",
    generate() {
      const zones = [
        { zone: "en agglomération", sec: "50 km/h", pluie: "50 km/h" },
        { zone: "hors agglomération (route à double sens sans séparateur)", sec: "80 km/h", pluie: "80 km/h" },
        { zone: "sur voie rapide (2x2 voies séparées)", sec: "110 km/h", pluie: "100 km/h" },
        { zone: "sur autoroute", sec: "130 km/h", pluie: "110 km/h" }
      ];
      const c = pick(zones);
      const pluie = Math.random() < 0.5;
      const correct = pluie ? c.pluie : c.sec;
      const meteo = pluie ? "par temps de pluie" : "par temps sec";
      const wrongs = ["50 km/h", "70 km/h", "80 km/h", "90 km/h", "100 km/h", "110 km/h", "130 km/h"]
        .filter(v => v !== correct);
      return buildQuestion("Vitesses",
        `Quelle est la vitesse maximale autorisée ${c.zone}, ${meteo} ?`,
        correct, shuffle(wrongs).slice(0, 3),
        `${meteo === "par temps de pluie" ? "Par temps de pluie" : "Par temps sec"}, la limite ${c.zone} est de ${correct}.`);
    }
  },
  {
    category: "Vitesses",
    generate() {
      return buildQuestion("Vitesses",
        "En cas de brouillard avec une visibilité inférieure à 50 m, quelle est la vitesse maximale autorisée ?",
        "50 km/h",
        ["70 km/h", "90 km/h", "110 km/h"],
        "Dès que la visibilité descend sous 50 m, la vitesse est limitée à 50 km/h sur l'ensemble du réseau.");
    }
  },
  {
    category: "Vitesses",
    generate() {
      const trajets = [
        { zone: "hors agglomération", limite: "80 km/h" },
        { zone: "sur voie rapide", limite: "100 km/h" },
        { zone: "sur autoroute", limite: "110 km/h" }
      ];
      const t = pick(trajets);
      return buildQuestion("Vitesses",
        `Un conducteur en période probatoire roule ${t.zone}. Quelle vitesse maximale ne doit-il pas dépasser ?`,
        t.limite,
        ["50 km/h", "90 km/h", "130 km/h"].filter(v => v !== t.limite),
        `Pendant la période probatoire, la vitesse maximale est réduite à ${t.limite} ${t.zone}.`);
    }
  },

  /* ==================== PRIORITÉS ==================== */
  {
    category: "Priorités",
    generate() {
      const situations = [
        { s: "un carrefour à sens giratoire (anneau)",
          r: "Les véhicules déjà engagés dans l'anneau",
          exp: "Sur un giratoire, les usagers déjà engagés sur l'anneau sont prioritaires." },
        { s: "un carrefour muni d'un panneau Stop",
          r: "Le véhicule doit marquer un arrêt complet",
          exp: "Le panneau Stop impose un arrêt complet à la ligne d'effet." },
        { s: "un carrefour sans signalisation, en agglomération",
          r: "Le véhicule venant de la droite",
          exp: "Sans signalisation, la priorité à droite s'applique par défaut." },
        { s: "un panneau Cédez-le-passage",
          r: "Ralentir et céder le passage, sans arrêt obligatoire",
          exp: "Le cédez-le-passage impose de ralentir voire s'arrêter, mais pas d'arrêt systématique." }
      ];
      const s = pick(situations);
      const wrongs = situations.filter(x => x !== s).map(x => x.r);
      return buildQuestion("Priorités",
        `Dans le cas de ${s.s}, qui est prioritaire ou que doit faire le conducteur ?`,
        s.r, shuffle(wrongs).slice(0, 3), s.exp);
    }
  },
  {
    category: "Priorités",
    generate() {
      const situations = [
        { cas: "une intersection où un tramway est engagé", r: "Le tramway",
          exp: "Le tramway est toujours prioritaire, quelle que soit la signalisation." },
        { cas: "un véhicule d'intérêt général en intervention", r: "Le véhicule d'urgence, en se rangeant à droite",
          exp: "Les véhicules d'urgence en intervention sont prioritaires : il faut leur faciliter le passage." },
        { cas: "une sortie de parking", r: "Céder le passage à tous les véhicules déjà sur la chaussée",
          exp: "En sortant d'un parking, on doit céder le passage à tous les usagers de la voie." }
      ];
      const s = pick(situations);
      return buildQuestion("Priorités",
        `Que faire face à ${s.cas} ?`,
        s.r,
        ["Klaxonner et passer", "Accélérer pour passer avant", "Rien de particulier, on passe normalement"],
        s.exp);
    }
  },

  /* ==================== MARQUAGE AU SOL ==================== */
  {
    category: "Marquage au sol",
    generate() {
      const lignes = [
        { nom: "une ligne continue",
          r: "Il est interdit de la franchir ou de la chevaucher",
          exp: "La ligne continue interdit le franchissement, sauf dépassement d'un cycliste." },
        { nom: "une ligne discontinue",
          r: "Le dépassement est autorisé",
          exp: "La ligne discontinue autorise le franchissement pour dépasser ou changer de voie." },
        { nom: "une ligne d'avertissement (3 flèches)",
          r: "Elle annonce l'approche d'une ligne continue",
          exp: "La ligne d'avertissement précède une ligne continue et signale qu'il faut se rabattre." },
        { nom: "une ligne de dissuasion",
          r: "Le dépassement n'est toléré que pour un véhicule très lent",
          exp: "La ligne de dissuasion autorise le dépassement uniquement des véhicules lents." }
      ];
      const l = pick(lignes);
      const wrongs = lignes.filter(x => x !== l).map(x => x.r);
      return buildQuestion("Marquage au sol",
        `Que signifie ${l.nom} sur la chaussée ?`,
        l.r, shuffle(wrongs).slice(0, 3), l.exp);
    }
  },

  /* ==================== DÉPASSEMENT ==================== */
  {
    category: "Dépassement",
    generate() {
      const cas = [
        { q: "Un conducteur s'apprête à dépasser un cycliste. Quelle distance latérale minimale doit-il respecter hors agglomération ?",
          r: "1,5 m", wrongs: ["0,5 m", "1 m", "2 m"],
          exp: "Hors agglomération, la distance latérale minimale pour dépasser un cycliste est de 1,5 m (1 m en ville)." },
        { q: "Par quel côté s'effectue un dépassement en règle générale ?",
          r: "Par la gauche", wrongs: ["Par la droite", "Indifféremment", "Par le côté le plus libre"],
          exp: "Le dépassement s'effectue par la gauche. Par la droite, uniquement si le véhicule devant tourne à gauche." },
        { q: "Dans quel cas le dépassement est-il formellement interdit ?",
          r: "Au sommet d'une côte et dans un virage sans visibilité",
          wrongs: ["Sur une route à double sens", "En agglomération", "Sur une route limitée à 80 km/h"],
          exp: "Le dépassement est interdit au sommet d'une côte, dans un virage sans visibilité, sur une ligne continue, à un passage à niveau." },
        { q: "Vous suivez un bus scolaire à l'arrêt. Que devez-vous faire ?",
          r: "Ralentir et céder le passage aux piétons",
          wrongs: ["Klaxonner pour signaler votre présence", "Le dépasser rapidement", "Rester à distance sans ralentir"],
          exp: "Devant un bus scolaire à l'arrêt, il faut ralentir et céder le passage aux enfants qui montent ou descendent." }
      ];
      const c = pick(cas);
      return buildQuestion("Dépassement", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== STATIONNEMENT ==================== */
  {
    category: "Stationnement",
    generate() {
      const cas = [
        { q: "Quelle est la différence entre l'arrêt et le stationnement ?",
          r: "Le conducteur peut quitter le véhicule pendant le stationnement, pas pendant l'arrêt",
          wrongs: ["Le moteur doit rester allumé pendant l'arrêt", "L'arrêt dure moins de 5 minutes",
                  "Le stationnement est toujours payant"],
          exp: "L'arrêt est une immobilisation brève, conducteur à bord. Le stationnement est prolongé, conducteur pouvant quitter le véhicule." },
        { q: "En stationnement en descente, comment doit-on braquer les roues ?",
          r: "Vers le trottoir", wrongs: ["Vers la route", "Droites", "Peu importe"],
          exp: "En descente, on braque les roues vers le trottoir. En montée, on les éloigne du trottoir." },
        { q: "Où le stationnement est-il formellement interdit ?",
          r: "Sur un passage piéton", wrongs: ["Sur une place marquée au sol", "Dans un parking souterrain", "Dans une rue résidentielle"],
          exp: "Le stationnement est interdit sur les passages piétons, trottoirs, emplacements PMR, arrêts de bus, devant les bouches d'incendie." }
      ];
      const c = pick(cas);
      return buildQuestion("Stationnement", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== AUTOROUTE ==================== */
  {
    category: "Autoroute",
    generate() {
      const cas = [
        { q: "Quelle est la vitesse maximale sur autoroute par temps de pluie ?", r: "110 km/h",
          wrongs: ["100 km/h", "120 km/h", "130 km/h"],
          exp: "Par temps de pluie, la vitesse sur autoroute passe de 130 à 110 km/h." },
        { q: "À quoi sert la bande d'arrêt d'urgence ?", r: "Aux arrêts d'urgence et véhicules de secours",
          wrongs: ["À dépasser par la droite", "À rouler en cas de bouchon", "Aux pauses rapides"],
          exp: "La bande d'arrêt d'urgence est strictement réservée aux urgences et aux véhicules de secours." },
        { q: "Un conducteur rate sa sortie d'autoroute. Que doit-il faire ?", r: "Continuer jusqu'à la prochaine sortie",
          wrongs: ["Faire demi-tour au prochain refuge", "Reculer sur la bande d'arrêt d'urgence", "S'arrêter et attendre"],
          exp: "Sur autoroute, le demi-tour et la marche arrière sont interdits : il faut continuer jusqu'à la prochaine sortie." },
        { q: "Comment s'insère-t-on sur l'autoroute ?", r: "En cédant le passage aux véhicules déjà engagés",
          wrongs: ["En priorité, en klaxonnant", "En s'arrêtant en bout de voie d'accélération", "En forçant le passage"],
          exp: "On utilise la voie d'accélération pour atteindre la vitesse du flux, puis on cède le passage aux véhicules déjà engagés." }
      ];
      const c = pick(cas);
      return buildQuestion("Autoroute", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== MÉCANIQUE ==================== */
  {
    category: "Mécanique",
    generate() {
      return buildQuestion("Mécanique",
        "Quelle est la profondeur minimale légale des rainures d'un pneumatique ?",
        "1,6 mm",
        ["1,0 mm", "2,0 mm", "3,0 mm"],
        "Le témoin d'usure indique la limite légale fixée à 1,6 mm.");
    }
  },
  {
    category: "Mécanique",
    generate() {
      return buildQuestion("Mécanique",
        "Quand doit être effectué le tout premier Contrôle Technique d'un véhicule neuf ?",
        "Dans les 4 mois précédant son 4ᵉ anniversaire",
        ["Au bout de 2 ans", "À la date exacte de ses 5 ans", "Tous les ans dès la première année"],
        "Le premier CT a lieu dans les 4 mois précédant le 4ᵉ anniversaire, puis tous les 2 ans.");
    }
  },

  /* ==================== VOYANTS ==================== */
  {
    category: "Voyants",
    generate() {
      const voyants = [
        { c: "un voyant rouge", r: "Une alarme : s'arrêter dès que possible en sécurité",
          exp: "Un voyant rouge signale une urgence : il faut s'arrêter dès que possible en sécurité." },
        { c: "un voyant orange", r: "Une alerte : à vérifier rapidement",
          exp: "Un voyant orange signale une anomalie à faire vérifier rapidement, sans urgence absolue." },
        { c: "un voyant vert ou bleu", r: "Une information (feux, équipement actif)",
          exp: "Les voyants verts et bleus indiquent qu'un équipement est actif : aucune urgence." }
      ];
      const v = pick(voyants);
      const wrongs = voyants.filter(x => x !== v).map(x => x.r);
      return buildQuestion("Voyants",
        `Que signifie ${v.c} allumé sur le tableau de bord ?`,
        v.r, wrongs, v.exp);
    }
  },
  {
    category: "Voyants",
    generate() {
      const cas = [
        { q: "Le voyant rouge de pression d'huile s'allume moteur tournant. Que faire ?",
          r: "S'arrêter immédiatement et couper le moteur",
          wrongs: ["Continuer normalement", "Ajouter de l'huile moteur en marche", "Attendre le prochain contrôle technique"],
          exp: "Un voyant de pression d'huile allumé en rouge impose un arrêt immédiat : risque de casse moteur." },
        { q: "Le voyant orange moteur s'allume. Que faire ?",
          r: "Faire diagnostiquer le véhicule rapidement en garage",
          wrongs: ["S'arrêter immédiatement", "Continuer sans s'inquiéter", "Couper le moteur et appeler une dépanneuse"],
          exp: "Un voyant moteur orange signale une anomalie à faire diagnostiquer rapidement." },
        { q: "Le voyant AdBlue s'allume. Que se passe-t-il si on ignore ?",
          r: "Le véhicule refusera de démarrer",
          wrongs: ["Rien, c'est purement indicatif", "Le moteur surchauffe", "Les freins ne fonctionnent plus"],
          exp: "Si l'AdBlue n'est pas rechargé, le véhicule refusera de démarrer." }
      ];
      const c = pick(cas);
      return buildQuestion("Voyants", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== ÉCLAIRAGE ==================== */
  {
    category: "Éclairage",
    generate() {
      const cas = [
        { q: "Quand les feux de croisement sont-ils obligatoires ?",
          r: "La nuit, sous la pluie, dans les tunnels, par visibilité réduite",
          wrongs: ["Uniquement la nuit hors agglomération", "Uniquement en cas de brouillard", "Uniquement en agglomération"],
          exp: "Les feux de croisement sont obligatoires dès que la visibilité est réduite : nuit, pluie, tunnel." },
        { q: "Quand peut-on utiliser les feux de route ?",
          r: "La nuit, hors agglomération, sans gêner les autres usagers",
          wrongs: ["En agglomération, la nuit", "Sous la pluie", "En cas de brouillard"],
          exp: "Les feux de route s'utilisent la nuit, hors agglomération, à condition de ne pas éblouir les autres usagers." },
        { q: "Quand utiliser les feux de brouillard arrière ?",
          r: "Uniquement en cas de brouillard ou de neige",
          wrongs: ["Sous la pluie", "La nuit en agglomération", "En cas de vent fort"],
          exp: "Les feux de brouillard arrière sont éblouissants : ils sont réservés au brouillard et à la neige, jamais à la pluie." }
      ];
      const c = pick(cas);
      return buildQuestion("Éclairage", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== SÉCURITÉ / ADAS ==================== */
  {
    category: "Sécurité",
    generate() {
      const systemes = [
        { nom: "l'ABS", r: "Empêcher le blocage des roues pour conserver la maîtrise du volant",
          exp: "L'ABS empêche les roues de se bloquer." },
        { nom: "l'ESP", r: "Corriger la trajectoire en cas de dérapage",
          exp: "L'ESP intervient sur les freins et le moteur pour stabiliser la trajectoire." },
        { nom: "l'AFU", r: "Accentuer la pression de freinage lors d'un freinage brusque",
          exp: "L'AFU détecte un freinage d'urgence et amplifie la pression." }
      ];
      const s = pick(systemes);
      return buildQuestion("Sécurité",
        `Que permet principalement ${s.nom} ?`,
        s.r,
        shuffle(systemes.filter(x => x !== s).map(x => x.r).concat(["Stopper le véhicule automatiquement"])).slice(0, 3),
        s.exp);
    }
  },

  /* ==================== ÉQUIPEMENTS ==================== */
  {
    category: "Équipements",
    generate() {
      const cas = [
        { q: "Où doit-on placer le triangle de présignalisation ?",
          r: "30 m avant le véhicule, hors autoroute",
          wrongs: ["Juste derrière le véhicule", "À 5 m du véhicule", "Sur le toit du véhicule"],
          exp: "Le triangle doit être placé environ 30 m avant le véhicule, pour prévenir les autres usagers. Sur autoroute, on ne place pas de triangle : on rejoint le refuge." },
        { q: "Quand doit-on enfiler le gilet haute visibilité ?",
          r: "Avant de sortir du véhicule en cas d'arrêt d'urgence",
          wrongs: ["Uniquement la nuit", "À l'intérieur du véhicule", "En cas de contrôle policier"],
          exp: "Le gilet doit être enfilé AVANT de sortir du véhicule, pour être visible dès la descente." },
        { q: "Quel est le seul élément NON obligatoire parmi ceux-ci ?",
          r: "L'éthylotest", wrongs: ["Le gilet haute visibilité", "Le triangle", "Les plaques d'immatriculation"],
          exp: "L'éthylotest est recommandé, mais pas obligatoire à bord." }
      ];
      const c = pick(cas);
      return buildQuestion("Équipements", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== ALCOOL ==================== */
  {
    category: "Alcool & stupéfiants",
    generate() {
      const profils = [
        { profil: "un conducteur titulaire du permis depuis plus de 3 ans",
          taux: "0,5 g/l de sang (0,25 mg/l d'air expiré)" },
        { profil: "un conducteur en période probatoire",
          taux: "0,2 g/l de sang (0,10 mg/l d'air expiré)" }
      ];
      const p = pick(profils);
      const autre = profils.find(x => x !== p).taux;
      return buildQuestion("Alcool & stupéfiants",
        `Quel est le taux d'alcoolémie maximal autorisé pour ${p.profil} ?`,
        p.taux,
        [autre, "0 g/l de sang, tolérance zéro", "0,8 g/l de sang"],
        `Le taux légal maximal est de ${p.taux} pour ${p.profil}.`);
    }
  },

  /* ==================== CONDUCTEUR ==================== */
  {
    category: "Conducteur",
    generate() {
      const cas = [
        { q: "À quelle fréquence est-il recommandé de faire une pause sur un long trajet ?",
          r: "Toutes les 2 heures",
          wrongs: ["Toutes les 4 heures", "Toutes les 30 minutes", "Uniquement en cas de somnolence"],
          exp: "Une pause de 15-20 minutes toutes les 2 heures est recommandée sur les longs trajets." },
        { q: "Quel est le principal risque lié à la fatigue au volant ?",
          r: "La baisse de vigilance et les micro-sommeils",
          wrongs: ["La surchauffe du moteur", "L'usure des pneus", "La décharge de la batterie"],
          exp: "La fatigue entraîne une baisse de vigilance et des micro-sommeils, responsables de nombreux accidents." },
        { q: "L'usage du téléphone tenu en main au volant est :",
          r: "Interdit et sanctionné par une amende et un retrait de points",
          wrongs: ["Autorisé en agglomération", "Autorisé à l'arrêt à un feu", "Autorisé en mode haut-parleur"],
          exp: "Tenir son téléphone au volant est interdit, même à l'arrêt dans un embouteillage. Amende 135 € et -3 points." }
      ];
      const c = pick(cas);
      return buildQuestion("Conducteur", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== INFRACTIONS ==================== */
  {
    category: "Infractions",
    generate() {
      const cas = [
        { q: "Combien de classes de contraventions existe-t-il pour les infractions au Code de la route ?",
          r: "5 classes", wrongs: ["3 classes", "4 classes", "6 classes"],
          exp: "Les contraventions sont classées de la 1ʳᵉ à la 5ᵉ classe, par ordre de gravité croissante." },
        { q: "Un excès de vitesse entre 20 et 49 km/h relève de quelle classe ?",
          r: "4ᵉ classe", wrongs: ["2ᵉ classe", "3ᵉ classe", "5ᵉ classe"],
          exp: "Un excès de vitesse de 20 à 49 km/h relève de la 4ᵉ classe : amende, retrait de points, tribunal de proximité." },
        { q: "Que signifie une infraction de 5ᵉ classe ?",
          r: "Une infraction grave, avec retrait de 6 points et possible suspension",
          wrongs: ["Une simple contravention sans conséquence", "Une infraction uniquement passible d'une amende", "Une infraction réservée aux poids lourds"],
          exp: "Les infractions de 5ᵉ classe entraînent 6 points de retrait, avec possibilité de suspension ou d'annulation du permis." }
      ];
      const c = pick(cas);
      return buildQuestion("Infractions", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== DOCUMENTS ==================== */
  {
    category: "Documents",
    generate() {
      const docs = [
        { d: "la carte grise", r: "Obligatoire à bord du véhicule",
          exp: "Le certificat d'immatriculation (carte grise) doit être à bord." },
        { d: "l'attestation d'assurance", r: "Obligatoire à bord du véhicule",
          exp: "La preuve d'assurance doit pouvoir être présentée lors d'un contrôle." },
        { d: "le permis de conduire", r: "Obligatoire à présenter en cas de contrôle",
          exp: "Le permis de conduire doit être présenté lors d'un contrôle routier." }
      ];
      const d = pick(docs);
      return buildQuestion("Documents",
        `Concernant ${d.d}, que dit la loi ?`,
        d.r,
        ["Facultatif si le véhicule est récent", "Uniquement nécessaire pour les longs trajets", "Remplaçable par une simple photo"],
        d.exp);
    }
  },

  /* ==================== PREMIERS SECOURS ==================== */
  {
    category: "Premiers secours",
    generate() {
      return buildQuestion("Premiers secours",
        "Quel est l'ordre correct des actions à mener face à un accident de la route ?",
        "Protéger, Alerter, Secourir",
        ["Secourir, Alerter, Protéger", "Alerter, Secourir, Protéger", "Secourir, Protéger, Alerter"],
        "Protéger la zone, Alerter les secours, puis Secourir si on est formé.");
    }
  },

  /* ==================== AUTRES USAGERS ==================== */
  {
    category: "Autres usagers",
    generate() {
      const cas = [
        { q: "Quelle distance latérale minimale faut-il respecter en dépassant un cycliste en agglomération ?",
          r: "1 m", wrongs: ["0,5 m", "1,5 m", "2 m"],
          exp: "En agglomération, 1 m minimum. Hors agglomération, 1,5 m." },
        { q: "Les trottinettes électriques (EDPM) peuvent circuler :",
          r: "Sur les pistes cyclables, ou sur la chaussée limitée à 50 km/h",
          wrongs: ["Sur les trottoirs", "Sur les autoroutes", "Uniquement dans les parcs"],
          exp: "Les EDPM sont interdits sur les trottoirs. Ils circulent sur piste cyclable ou, à défaut, sur la chaussée limitée à 50 km/h." },
        { q: "Face à un véhicule prioritaire en intervention, que faire ?",
          r: "Se ranger à droite pour faciliter son passage",
          wrongs: ["Accélérer pour le suivre", "S'arrêter au milieu de la voie", "Klaxonner"],
          exp: "Il faut faciliter le passage des véhicules d'urgence : se ranger à droite, s'arrêter si nécessaire." },
        { q: "Un bus quitte son arrêt en agglomération. Que faire ?",
          r: "Le laisser passer",
          wrongs: ["Klaxonner", "Le dépasser rapidement", "Rien, je suis prioritaire"],
          exp: "En agglomération, les bus qui quittent leur arrêt sont prioritaires." }
      ];
      const c = pick(cas);
      return buildQuestion("Autres usagers", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== COMMUNICATION ==================== */
  {
    category: "Communication",
    generate() {
      const cas = [
        { q: "Quand le clignotant doit-il être activé ?",
          r: "Avant tout changement de direction ou de voie",
          wrongs: ["Uniquement en ville", "Uniquement de nuit", "Au moment même de la manœuvre"],
          exp: "Le clignotant doit être activé avant la manœuvre, pour prévenir les autres usagers." },
        { q: "Quand peut-on utiliser l'avertisseur sonore ?",
          r: "Uniquement en cas de danger immédiat",
          wrongs: ["Pour saluer un ami", "En cas de bouchon", "Pour prévenir d'un dépassement"],
          exp: "L'avertisseur sonore est réservé aux situations d'urgence. En ville, il est interdit sauf danger immédiat." },
        { q: "Que signale un appel de phare ?",
          r: "Un danger, ou (à tort) une autorisation de passer",
          wrongs: ["Uniquement un salut", "Uniquement la priorité à droite", "Uniquement un contrôle policier"],
          exp: "L'appel de phare signale souvent un danger. Il ne doit pas être interprété comme une autorisation de passer." }
      ];
      const c = pick(cas);
      return buildQuestion("Communication", c.q, c.r, c.wrongs, c.exp);
    }
  },

  /* ==================== SIGNALISATION ==================== */
  {
    category: "Signalisation",
    generate() {
      const formes = [
        { forme: "un panneau triangulaire à bordure rouge", sens: "Panneau de danger",
          exp: "Les panneaux triangulaires à bordure rouge annoncent un danger." },
        { forme: "un panneau rond à bordure rouge", sens: "Panneau d'interdiction",
          exp: "Les panneaux ronds à bordure rouge indiquent une interdiction." },
        { forme: "un panneau rond bleu", sens: "Panneau d'obligation",
          exp: "Les panneaux ronds bleus indiquent une obligation." },
        { forme: "un panneau carré bleu", sens: "Panneau d'indication",
          exp: "Les panneaux carrés bleus donnent une indication." }
      ];
      const f = pick(formes);
      return buildQuestion("Signalisation",
        `Que signifie ${f.forme} ?`,
        f.sens,
        shuffle(formes.filter(x => x !== f).map(x => x.sens)).slice(0, 3),
        f.exp);
    }
  },

  /* ==================== ÉCOCONDUITE ==================== */
  {
    category: "Écoconduite",
    generate() {
      const conseils = [
        { r: "Anticiper les ralentissements pour lever le pied plutôt que freiner au dernier moment",
          exp: "Anticiper réduit la consommation et l'usure." },
        { r: "Passer les rapports de vitesse tôt, sans monter dans les tours",
          exp: "Rouler à bas régime réduit la consommation." },
        { r: "Couper le moteur à l'arrêt prolongé",
          exp: "Couper le moteur au-delà de 30 secondes d'arrêt réduit la consommation et la pollution." }
      ];
      const c = pick(conseils);
      return buildQuestion("Écoconduite",
        "Laquelle de ces pratiques relève de l'écoconduite ?",
        c.r,
        ["Accélérer fortement puis freiner brusquement", "Rouler avec des pneus sous-gonflés", "Laisser tourner le moteur au ralenti à l'arrêt prolongé"],
        c.exp);
    }
  }
];

/* =========================================================
   GÉNÉRATION
   ========================================================= */

function generateQuestionSet(n) {
  const pool = shuffle(questionTemplates);
  const set = [];
  for (let i = 0; i < n; i++) {
    const template = pool[i % pool.length];
    set.push(template.generate());
  }
  return set;
}

function generateOneQuestion(excludeCategory) {
  let candidates = questionTemplates;
  if (excludeCategory) {
    const filtered = questionTemplates.filter(t => t.category !== excludeCategory);
    if (filtered.length > 0) candidates = filtered;
  }
  return pick(candidates).generate();
}

/* =========================================================
   BANQUE DE QUESTIONS.
   Uniquement les données + templates pour générer le quiz.
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

  /* ==================== SÉCURITÉ ==================== */
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

  /* ==================== ÉCOCONDUITE ==================== */
  {
    category: "Écoconduite",
    generate() {
      const conseils = [
        { r: "Anticiper les ralentissements pour lever le pied plutôt que freiner au dernier moment",
          exp: "Anticiper réduit la consommation et l'usure." },
        { r: "Passer les rapports de vitesse tôt, sans monter dans les tours",
          exp: "Rouler à bas régime réduit la consommation." }
      ];
      const c = pick(conseils);
      return buildQuestion("Écoconduite",
        "Laquelle de ces pratiques relève de l'écoconduite ?",
        c.r,
        ["Accélérer fortement puis freiner brusquement", "Rouler avec des pneus sous-gonflés", "Laisser tourner le moteur au ralenti à l'arrêt prolongé"],
        c.exp);
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
  }
];

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

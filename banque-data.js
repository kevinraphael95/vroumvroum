/* =========================================================
   BANQUE DE QUESTIONS (données brutes, une question = un objet)
   Complète les templates de questions-data.js.

   Chaque question :
     id          unique ("l-vitesses-01")
     fiche       id d'une fiche de fiches-data.js (lien "Revoir la fiche")
     famille     lettre de la famille (L C R U D A P M S E)
     categorie   libellé affiché en haut de la question
     question    énoncé
     bonne       bonne réponse
     fausses     3 mauvaises réponses
     explication affichée après la réponse

   RÈGLE : questions ORIGINALES, rédigées à partir des fiches
   (Service-Public, Sécurité Routière). Ne pas copier les banques
   de sites tiers (droit d'auteur).

   À charger APRÈS questions-data.js (utilise shuffle / pick).
   ========================================================= */

const BANQUE = [

  /* ---------- L : La circulation routière ---------- */

  { id: "l-vitesses-01", fiche: "vitesses", famille: "L", categorie: "Vitesse",
    question: "Quelle est la vitesse maximale autorisée sur autoroute par temps de pluie pour un conducteur confirmé ?",
    bonne: "110 km/h", fausses: ["100 km/h", "120 km/h", "130 km/h"],
    explication: "Sur autoroute : 130 km/h par temps sec, 110 km/h par temps de pluie." },

  { id: "l-vitesses-02", fiche: "vitesses", famille: "L", categorie: "Vitesse",
    question: "Vous êtes en permis probatoire et roulez sur autoroute. Quelle est votre vitesse maximale ?",
    bonne: "110 km/h", fausses: ["100 km/h", "120 km/h", "130 km/h"],
    explication: "Pendant la période probatoire, la vitesse est limitée à 110 km/h sur autoroute, quelle que soit la météo." },

  { id: "l-vitesses-03", fiche: "vitesses", famille: "L", categorie: "Vitesse",
    question: "Le brouillard réduit la visibilité à moins de 50 mètres. Quelle vitesse maximale devez-vous respecter ?",
    bonne: "50 km/h, sur tout le réseau, autoroute comprise",
    fausses: ["50 km/h, mais seulement en agglomération", "80 km/h hors agglomération", "70 km/h sur autoroute"],
    explication: "Quand la visibilité est inférieure à 50 m, la limite est de 50 km/h sur tout le réseau, même sur autoroute." },

  { id: "l-vitesse-conseq-01", fiche: "vitesse-consequences", famille: "L", categorie: "Distances",
    question: "À 90 km/h, quelle est la distance parcourue pendant le temps de réaction (1 seconde environ) ?",
    bonne: "27 m", fausses: ["18 m", "40 m", "54 m"],
    explication: "Distance de réaction = (vitesse ÷ 10) × 3, soit 9 × 3 = 27 m à 90 km/h." },

  { id: "l-vitesse-conseq-02", fiche: "vitesse-consequences", famille: "L", categorie: "Distances",
    question: "À 90 km/h sur route sèche, quelle est la distance d'arrêt approximative ?",
    bonne: "70 m environ", fausses: ["27 m environ", "40 m environ", "107 m environ"],
    explication: "Distance d'arrêt = réaction (27 m) + freinage (≈ 40 m) ≈ 70 m. Les 107 m correspondent à la route mouillée." },

  { id: "l-vitesse-conseq-03", fiche: "vitesse-consequences", famille: "L", categorie: "Distances",
    question: "Si votre vitesse double, que devient la distance de freinage ?",
    bonne: "Elle est multipliée par 4", fausses: ["Elle est multipliée par 2", "Elle est multipliée par 3", "Elle reste la même"],
    explication: "La distance de freinage est proportionnelle au carré de la vitesse : vitesse × 2, freinage × 4." },

  { id: "l-vitesse-conseq-04", fiche: "vitesse-consequences", famille: "L", categorie: "Distances",
    question: "Sur route mouillée, comment évolue la distance de freinage par rapport à la route sèche ?",
    bonne: "Elle est environ doublée", fausses: ["Elle augmente d'un quart", "Elle reste identique", "Elle est divisée par deux"],
    explication: "La pluie réduit l'adhérence : la distance de freinage est environ doublée." },

  { id: "l-depasser-01", fiche: "croiser-depasser", famille: "L", categorie: "Dépassement",
    question: "Hors agglomération, quelle distance latérale minimale devez-vous laisser en dépassant un cycliste ?",
    bonne: "1,5 m", fausses: ["0,5 m", "1 m", "2 m"],
    explication: "1 m en agglomération, 1,5 m hors agglomération." },

  { id: "l-depasser-02", fiche: "croiser-depasser", famille: "L", categorie: "Dépassement",
    question: "Dans quel cas est-il autorisé de dépasser par la droite ?",
    bonne: "Lorsque le véhicule qui précède va tourner à gauche",
    fausses: ["Lorsque la voie de gauche est plus lente", "Lorsque vous êtes pressé", "Lorsque le véhicule devant roule trop vite"],
    explication: "On dépasse par la gauche. La droite n'est permise que si le véhicule devant signale qu'il tourne à gauche." },

  { id: "l-depasser-03", fiche: "croiser-depasser", famille: "L", categorie: "Dépassement",
    question: "Dans laquelle de ces situations le dépassement est-il interdit ?",
    bonne: "À l'approche d'un sommet de côte sans visibilité",
    fausses: ["Sur ligne discontinue avec bonne visibilité", "Sur une route dégagée avec clignotant allumé", "Sur une voie rapide à deux voies par sens"],
    explication: "Sont interdits : ligne continue, sommet de côte, virage, passage à niveau, intersection." },

  { id: "l-stationnement-01", fiche: "stationnement", famille: "L", categorie: "Stationnement",
    question: "Vous stationnez en descente. Comment placer les roues avant ?",
    bonne: "Braquées vers le trottoir", fausses: ["Braquées à l'opposé du trottoir", "Laissées droites", "Peu importe si le frein à main est serré"],
    explication: "En descente, on braque vers le trottoir ; en montée, on les éloigne du trottoir. On serre aussi le frein à main et on laisse une vitesse enclenchée." },

  { id: "l-stationnement-02", fiche: "stationnement", famille: "L", categorie: "Stationnement",
    question: "Quelle est la différence entre l'arrêt et le stationnement ?",
    bonne: "L'arrêt est une immobilisation brève, conducteur à bord ; le stationnement est prolongé",
    fausses: ["L'arrêt est interdit en agglomération, le stationnement est autorisé",
              "L'arrêt impose de couper le moteur, pas le stationnement",
              "Il n'y a aucune différence, les deux termes sont équivalents"],
    explication: "L'arrêt est bref, le conducteur reste à bord. En stationnement, il peut quitter son véhicule." },

  { id: "l-priorites-01", fiche: "priorites", famille: "L", categorie: "Priorités",
    question: "Un tramway arrive à une intersection. Que dire de sa priorité ?",
    bonne: "Il est toujours prioritaire, quelle que soit la signalisation",
    fausses: ["Il est soumis à la priorité à droite", "Il est prioritaire seulement s'il y a un feu", "Il doit céder le passage aux voitures"],
    explication: "Le tramway est toujours prioritaire." },

  { id: "l-priorites-02", fiche: "priorites", famille: "L", categorie: "Priorités",
    question: "Vous arrivez à un Stop et aucun véhicule n'est visible. Que faites-vous ?",
    bonne: "Je m'arrête complètement à la ligne d'effet", fausses: ["Je ralentis simplement", "Je m'arrête seulement si un véhicule arrive", "Je m'arrête après la ligne pour mieux voir"],
    explication: "Le Stop impose un arrêt complet à la ligne d'effet, même sans autre véhicule." },

  { id: "l-giratoire-01", fiche: "giratoire", famille: "L", categorie: "Giratoire",
    question: "Dans un carrefour à sens giratoire, qui est prioritaire ?",
    bonne: "Les véhicules déjà engagés sur l'anneau", fausses: ["Les véhicules qui entrent", "Le véhicule le plus rapide", "Les véhicules venant de droite à l'entrée"],
    explication: "On cède le passage aux véhicules déjà engagés sur l'anneau." },

  { id: "l-giratoire-02", fiche: "giratoire", famille: "L", categorie: "Giratoire",
    question: "Quand mettre le clignotant dans un giratoire ?",
    bonne: "À droite, avant la sortie que l'on va prendre",
    fausses: ["À droite, dès l'entrée", "À gauche, à l'entrée, pour aller tout droit", "On ne met jamais de clignotant"],
    explication: "Clignotant à droite pour sortir, jamais pour entrer." },

  /* ---------- C : Le conducteur ---------- */

  { id: "c-alcool-01", fiche: "alcool", famille: "C", categorie: "Alcool",
    question: "Quel est le taux d'alcool maximal autorisé pour un conducteur confirmé ?",
    bonne: "0,5 g/l de sang", fausses: ["0,2 g/l de sang", "0,8 g/l de sang", "1 g/l de sang"],
    explication: "0,5 g/l de sang (0,25 mg/l d'air expiré) pour un conducteur confirmé." },

  { id: "c-alcool-02", fiche: "alcool", famille: "C", categorie: "Alcool",
    question: "Quel est le taux d'alcool maximal autorisé pour un titulaire du permis probatoire ?",
    bonne: "0,2 g/l de sang", fausses: ["0 g/l de sang", "0,5 g/l de sang", "0,8 g/l de sang"],
    explication: "En permis probatoire, la limite est abaissée à 0,2 g/l de sang (0,10 mg/l d'air expiré)." },

  { id: "c-alcool-03", fiche: "alcool", famille: "C", categorie: "Alcool",
    question: "Qu'est-ce qui fait réellement baisser son taux d'alcoolémie ?",
    bonne: "Le temps qui passe", fausses: ["Boire un café fort", "Manger un repas copieux", "Dormir une heure"],
    explication: "Café, repas ou courte sieste ne changent rien : seul le temps élimine l'alcool." },

  { id: "c-alcool-04", fiche: "alcool", famille: "C", categorie: "Alcool",
    question: "Que risque un conducteur qui refuse de se soumettre au dépistage d'alcoolémie ?",
    bonne: "Un délit : jusqu'à 2 ans de prison et 4 500 € d'amende",
    fausses: ["Une simple amende de 135 €", "Un avertissement écrit", "Rien, le dépistage est facultatif"],
    explication: "Le refus de dépistage est un délit puni de 2 ans de prison et 4 500 € d'amende." },

  /* ---------- R : La route ---------- */

  { id: "r-conditions-01", fiche: "conditions-difficiles", famille: "R", categorie: "Conditions difficiles",
    question: "Par temps de brouillard épais, quels feux utiliser ?",
    bonne: "Les feux de croisement et les feux de brouillard avant",
    fausses: ["Les feux de route", "Uniquement les feux de position", "Les feux de route et le warning"],
    explication: "En brouillard : croisement + brouillard avant. Jamais les feux de route, qui éblouissent par réflexion." },

  { id: "r-conditions-02", fiche: "conditions-difficiles", famille: "R", categorie: "Conditions difficiles",
    question: "Vous aquaplanez. Quelle est la bonne réaction ?",
    bonne: "Relâcher l'accélérateur et tenir fermement le volant",
    fausses: ["Freiner fort", "Donner un coup de volant", "Accélérer pour retrouver l'adhérence"],
    explication: "Relâcher l'accélérateur, tenir le volant droit et ne pas freiner brusquement." },

  { id: "r-conditions-03", fiche: "conditions-difficiles", famille: "R", categorie: "Conditions difficiles",
    question: "Un panneau impose les chaînes à neige dans une zone enneigée. Que devez-vous faire ?",
    bonne: "Équiper mon véhicule de chaînes à neige", fausses: ["Simplement ralentir", "Allumer les feux de brouillard", "Dégonfler légèrement les pneus"],
    explication: "Sur neige, l'adhérence est réduite : conduire en douceur, et chaînes obligatoires dans la zone signalée." },

  { id: "r-autoroute-01", fiche: "autoroute", famille: "R", categorie: "Autoroute",
    question: "À quoi est réservée la bande d'arrêt d'urgence sur autoroute ?",
    bonne: "Aux arrêts d'urgence et aux véhicules de secours",
    fausses: ["Au dépassement en cas de bouchon", "À une courte pause pour téléphoner", "Aux véhicules lents"],
    explication: "La bande d'arrêt d'urgence n'est jamais une voie de circulation." },

  { id: "r-autoroute-02", fiche: "autoroute", famille: "R", categorie: "Autoroute",
    question: "Quelle fréquence de pause est recommandée sur un long trajet autoroutier ?",
    bonne: "Une pause toutes les 2 heures", fausses: ["Une pause toutes les 30 minutes", "Une pause toutes les 4 heures", "Aucune pause si on se sent bien"],
    explication: "Faire une pause toutes les 2 heures limite la somnolence." },

  /* ---------- D : Les notions diverses ---------- */

  { id: "d-points-01", fiche: "permis-points", famille: "D", categorie: "Permis à points",
    question: "Combien de points compte le permis à son obtention ?",
    bonne: "6 points", fausses: ["8 points", "10 points", "12 points"],
    explication: "Le capital initial est de 6 points. Il passe à 12 après 3 ans sans infraction (2 ans en conduite accompagnée)." },

  { id: "d-points-02", fiche: "permis-points", famille: "D", categorie: "Permis à points",
    question: "Combien de points peut-on récupérer au maximum avec un stage volontaire ?",
    bonne: "4 points", fausses: ["2 points", "6 points", "12 points"],
    explication: "Un stage volontaire permet de récupérer jusqu'à 4 points, dans la limite du plafond." },

  { id: "d-documents-01", fiche: "documents", famille: "D", categorie: "Documents",
    question: "Depuis avril 2024, comment l'assurance du véhicule est-elle vérifiée lors d'un contrôle ?",
    bonne: "Via le Fichier des Véhicules Assurés (FVA)",
    fausses: ["Grâce à la carte verte, toujours obligatoire", "Par un certificat à coller sur le pare-brise", "Elle n'est plus contrôlée"],
    explication: "La carte verte n'existe plus : la vérification passe par le FVA. L'assurance reste obligatoire." },

  { id: "d-documents-02", fiche: "documents", famille: "D", categorie: "Documents",
    question: "Votre permis est perdu ou volé. Combien de temps le récépissé de déclaration est-il valable ?",
    bonne: "2 mois", fausses: ["15 jours", "6 mois", "1 an"],
    explication: "Le récépissé est valable 2 mois, en attendant le nouveau titre." },

  /* ---------- A : Les premiers secours ---------- */

  { id: "a-accident-01", fiche: "accident-route", famille: "A", categorie: "Accident",
    question: "Un motard accidenté est à terre avec son casque. Que faites-vous ?",
    bonne: "Je ne retire pas son casque", fausses: ["Je retire son casque pour le faire respirer", "Je le relève pour le mettre à l'abri", "Je lui retire son casque et je lui donne à boire"],
    explication: "On ne déplace pas une victime sauf danger immédiat, et on ne retire pas le casque d'un motard." },

  { id: "a-accident-02", fiche: "accident-route", famille: "A", categorie: "Accident",
    question: "Que doit-on donner à boire ou à manger à une victime d'accident ?",
    bonne: "Rien", fausses: ["De l'eau sucrée", "Une boisson chaude", "De l'eau, en petite quantité"],
    explication: "Ni à boire, ni à manger à une victime." },

  { id: "a-secours-01", fiche: "premiers-secours", famille: "A", categorie: "Premiers secours",
    question: "Quel est le rythme du massage cardiaque chez un adulte en arrêt cardiaque ?",
    bonne: "30 compressions pour 2 insufflations", fausses: ["15 compressions pour 2 insufflations", "30 compressions pour 5 insufflations", "2 compressions pour 30 insufflations"],
    explication: "Rythme : 30 compressions / 2 insufflations, avec défibrillateur dès que possible." },

  { id: "a-secours-02", fiche: "premiers-secours", famille: "A", categorie: "Premiers secours",
    question: "Une victime inconsciente respire. Quelle est la bonne conduite ?",
    bonne: "La placer en position latérale de sécurité (PLS)", fausses: ["La laisser sur le dos", "La faire asseoir", "Lui donner à boire"],
    explication: "Victime qui respire : PLS. Victime qui ne respire plus : massage cardiaque + défibrillateur." },

  { id: "a-secours-03", fiche: "premiers-secours", famille: "A", categorie: "Premiers secours",
    question: "Une victime saigne abondamment et un objet est planté dans la plaie. Que faites-vous ?",
    bonne: "Je comprime autour sans retirer l'objet", fausses: ["Je retire l'objet puis je comprime", "Je pose un garrot immédiatement", "J'attends les secours sans toucher"],
    explication: "On comprime la plaie (gant ou tissu propre) et on ne retire jamais le corps étranger." }
];



/* ============ BANQUE PERSONNELLE (privée) ============
   Questions importées par l'utilisateur via import.html.
   Stockées UNIQUEMENT dans le localStorage du navigateur
   (clé vroum-banque-perso) : rien n'est publié avec le site.
   Format accepté : le même que BANQUE (fiche / famille / categorie /
   explication facultatifs ; 1 à 3 fausses réponses). */

const CLE_PERSO = 'vroum-banque-perso';

function normaliserQuestion(o, i) {
  if (!o || typeof o.question !== 'string' || typeof o.bonne !== 'string') return null;
  if (!Array.isArray(o.fausses)) return null;
  const fausses = o.fausses.filter(f => typeof f === 'string' && f.trim() && f !== o.bonne).slice(0, 3);
  if (!o.question.trim() || !o.bonne.trim() || fausses.length < 1) return null;
  return {
    id: o.id || ('perso-' + (i + 1)),
    fiche: o.fiche || null,
    famille: o.famille || 'X',
    categorie: o.categorie || 'Perso',
    question: o.question.trim(),
    bonne: o.bonne.trim(),
    fausses: fausses.map(f => f.trim()),
    explication: o.explication || ''
  };
}

function chargerPerso() {
  try {
    const arr = JSON.parse(localStorage.getItem(CLE_PERSO) || '[]');
    return Array.isArray(arr) ? arr.map(normaliserQuestion).filter(Boolean) : [];
  } catch (e) { return []; }
}

function toutesLesQuestions() { return BANQUE.concat(chargerPerso()); }

/* ============ ADAPTATEUR ============
   Transforme une entrée de BANQUE en question utilisable par app.js
   (même format que buildQuestion + champs fiche / id). */

function banqueToQuestion(b) {
  return {
    id: b.id,
    fiche: b.fiche,
    famille: b.famille,
    category: b.categorie,
    question: b.question,
    answer: b.bonne,
    shuffledOptions: shuffle([b.bonne, ...b.fausses]),
    explanation: b.explication
  };
}

/* Contrôle de cohérence au chargement (console uniquement) */
(function verifierBanque() {
  const ids = new Set();
  BANQUE.forEach(b => {
    if (ids.has(b.id)) console.warn('[VroumVroum] id en double :', b.id);
    ids.add(b.id);
    if (!b.fausses || b.fausses.length !== 3) console.warn('[VroumVroum] 3 fausses réponses attendues :', b.id);
    if (b.fausses && b.fausses.includes(b.bonne)) console.warn('[VroumVroum] bonne réponse dans les fausses :', b.id);
    if (typeof FICHES !== 'undefined' && !FICHES.some(f => f.id === b.fiche)) {
      console.warn('[VroumVroum] fiche introuvable :', b.fiche, 'dans', b.id);
    }
  });
})();


/* ============ GÉNÉRATION MIXTE ============
   Examen / rapide : on prend d'abord la banque, répartie par famille
   (une question par famille à tour de rôle), puis on complète avec les
   templates. Plus la banque grandit, moins les templates servent.
   Infini : une chance sur deux de tirer dans la banque. */

const _generateQuestionSetTemplates = generateQuestionSet;
const _generateOneQuestionTemplates = generateOneQuestion;

function _tirerBanqueEquilibree(n, seen) {
  const parFamille = new Map();
  shuffle(toutesLesQuestions()).forEach(b => {
    if (seen.has(b.question)) return;
    if (!parFamille.has(b.famille)) parFamille.set(b.famille, []);
    parFamille.get(b.famille).push(b);
  });
  const files = shuffle([...parFamille.values()]);
  const out = [];
  while (out.length < n && files.some(f => f.length)) {
    for (const f of files) {
      if (out.length >= n) break;
      if (f.length) out.push(f.shift());
    }
  }
  return out;
}

generateQuestionSet = function (n, seenQuestions) {
  seenQuestions = seenQuestions || new Set();
  const set = [];

  _tirerBanqueEquilibree(n, seenQuestions).forEach(b => {
    seenQuestions.add(b.question);
    set.push(banqueToQuestion(b));
  });

  if (set.length < n) {
    set.push(..._generateQuestionSetTemplates(n - set.length, seenQuestions));
  }
  return shuffle(set);
};

generateOneQuestion = function (excludeCategory, seenQuestions) {
  seenQuestions = seenQuestions || new Set();
  if (Math.random() < 0.5) {
    const dispo = toutesLesQuestions().filter(b => !seenQuestions.has(b.question) && b.categorie !== excludeCategory);
    if (dispo.length) {
      const b = pick(dispo);
      seenQuestions.add(b.question);
      return banqueToQuestion(b);
    }
  }
  return _generateOneQuestionTemplates(excludeCategory, seenQuestions);
};

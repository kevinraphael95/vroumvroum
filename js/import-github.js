/* =========================================================
   IMPORT DEPUIS GITHUB (Toutes les séries)
   ========================================================= */
(function() {
  const BASE_URL = 'https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/';
  
  // La liste de toutes tes séries sur GitHub
  const SERIES = [
    'questions/Ajson',
    'questions/Bjson', // Ajoute tes autres séries ici
    // 'questions/Cjson',
  ];

  // Fonction pour traduire le JSON d'une série
  function traduireQuestions(data) {
    return data.questions.map(q => {
      // On cherche l'image. On suppose que si c'est la série A, c'est dans /images/A/,
      // si c'est la série B, dans /images/B/, etc.
      const dossierImage = q.id.charAt(0); // 'A' pour A01, 'B' pour B01...
      const imageURL = `${BASE_URL}images/${dossierImage}/${q.id}.png`;
      
      const isOuiNon = q.options && Object.values(q.options).some(opt => 
        opt.includes("OUI") || opt.includes("NON")
      );

      if (isOuiNon) {
        const affirmations = [];
        const keys = Object.keys(q.options);
        for (let i = 0; i < keys.length; i += 2) {
          const keyOui = keys[i];
          const texteOui = q.options[keyOui] || "";
          const cleanTexte = texteOui.replace(/\s*:\s*OUI$/i, '').replace(/\s*:\s*NON$/i, '');
          affirmations.push({
            texte: cleanTexte,
            vrai: q.reponses.includes(keyOui)
          });
        }
        return { id: q.id, type: "oui-non", image: imageURL, alt: q.enonce, question: q.enonce, affirmations, fiche: null, explication: "" };
      } else {
        const reponses = Object.keys(q.options).map(lettre => ({
          texte: q.options[lettre],
          correcte: q.reponses.includes(lettre)
        }));
        return { id: q.id, image: imageURL, alt: q.enonce, question: q.enonce, reponses, fiche: null, explication: "" };
      }
    });
  }

  // On télécharge toutes les séries en même temps
  Promise.all(
    SERIES.map(serie => fetch(BASE_URL + serie).then(res => res.json()).catch(() => null))
  ).then(resultats => {
    let toutesLesQuestions = [];
    
    resultats.forEach(data => {
      if (data && data.questions) {
        toutesLesQuestions = toutesLesQuestions.concat(traduireQuestions(data));
      }
    });

    if (toutesLesQuestions.length > 0) {
      if (typeof EXAMEN_QUESTIONS !== 'undefined') {
        EXAMEN_QUESTIONS.length = 0;
        EXAMEN_QUESTIONS.push(...toutesLesQuestions);
        console.log(`✅ ${toutesLesQuestions.length} questions chargées depuis GitHub !`);
      }
    } else {
      console.warn("⚠️ Aucune question GitHub chargée, on garde les questions de secours.");
    }
  });
})();

/* =========================================================
   IMPORT DEPUIS GITHUB (Détection automatique des séries)
   ========================================================= */
(function() {
  const REPO_API_URL = 'https://api.github.com/repos/kevinraphael95/random-useful-stuff/contents/code/questions';
  const BASE_URL = 'https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/';

  function traduireQuestions(data) {
    return data.questions.map(q => {
      const dossierImage = q.id.charAt(0);
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
        return { id: q.id, type: "oui-non", image: imageURL, alt: q.enonce, question: "", affirmations, fiche: null, explication: "" };
      } else {
        const reponses = Object.keys(q.options).map(lettre => ({
          texte: q.options[lettre],
          correcte: q.reponses.includes(lettre)
        }));
        return { id: q.id, image: imageURL, alt: q.enonce, question: q.enonce, reponses, fiche: null, explication: "" };
      }
    });
  }

  fetch(REPO_API_URL)
    .then(res => res.json())
    .then(files => {
      if (!Array.isArray(files)) throw new Error("Erreur API GitHub");

      const serieFiles = files
        .filter(file => file.type === 'file' && (file.name.endsWith('.json') || file.name.endsWith('json')))
        .map(file => 'questions/' + file.name);

      console.log(`📁 Séries détectées sur GitHub :`, serieFiles);

      return Promise.all(
        serieFiles.map(serie => fetch(BASE_URL + serie).then(res => res.json()).catch(() => null))
      );
    })
    .then(resultats => {
      if (!resultats) return;
      let toutesLesQuestions = [];
      
      resultats.forEach(data => {
        if (data && data.questions) {
          toutesLesQuestions = toutesLesQuestions.concat(traduireQuestions(data));
        }
      });

      if (toutesLesQuestions.length > 0) {
        window.EXAMEN_QUESTIONS = toutesLesQuestions;
        console.log(`✅ ${toutesLesQuestions.length} questions chargées depuis GitHub !`);
        
        // Déclenche l'initialisation de l'examen une fois les données prêtes
        if (typeof window.initExamen === 'function') {
          window.initExamen();
        }
      } else {
        console.warn("⚠️ Aucune question chargée.");
      }
    })
    .catch(err => console.error("❌ Erreur import GitHub :", err));
})();

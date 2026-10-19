/* =========================================================
   IMPORT DEPUIS GITHUB (remplace le fallback si succès)
   ========================================================= */
(function() {
  const URL_JSON = 'https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/questions/Ajson';
  const URL_IMAGE_BASE = 'https://raw.githubusercontent.com/kevinraphael95/random-useful-stuff/main/code/images/A/';

  fetch(URL_JSON)
    .then(res => {
      if (!res.ok) throw new Error("Erreur réseau");
      return res.json();
    })
    .then(data => {
      const questionsGitHub = data.questions.map(q => {
        const imageURL = `${URL_IMAGE_BASE}${q.id}.png`;
        
        // Détection OUI/NON
        const isOuiNon = q.options && Object.values(q.options).some(opt => 
          opt.includes("OUI") || opt.includes("NON")
        );

        if (isOuiNon) {
          const affirmations = [];
          const keys = Object.keys(q.options);
          for (let i = 0; i < keys.length; i += 2) {
            const keyOui = keys[i];
            const keyNon = keys[i + 1];
            const texteOui = q.options[keyOui] || "";
            const cleanTexte = texteOui.replace(/\s*:\s*OUI$/i, '').replace(/\s*:\s*NON$/i, '');
            affirmations.push({
              texte: cleanTexte,
              vrai: q.reponses.includes(keyOui)
            });
          }
          return {
            id: q.id, type: "oui-non", image: imageURL, alt: q.enonce,
            question: q.enonce, affirmations: affirmations, fiche: null, explication: ""
          };
        } else {
          const reponses = Object.keys(q.options).map(lettre => {
            return {
              texte: q.options[lettre],
              correcte: q.reponses.includes(lettre)
            };
          });
          return {
            id: q.id, image: imageURL, alt: q.enonce,
            question: q.enonce, reponses: reponses, fiche: null, explication: ""
          };
        }
      });
      
      // On remplace les questions en dur par celles de GitHub
      if (typeof EXAMEN_QUESTIONS !== 'undefined') {
        EXAMEN_QUESTIONS.length = 0;
        EXAMEN_QUESTIONS.push(...questionsGitHub);
        console.log("✅ Questions chargées depuis GitHub avec succès !");
      }
    })
    .catch(err => {
      console.warn("⚠️ Échec du chargement GitHub. On garde les questions de secours.", err);
    });
})();

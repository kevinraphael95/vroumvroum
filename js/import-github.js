/* =========================================================
   IMPORT DEPUIS GITHUB (Détection automatique des séries)
   - Liste des séries mise en cache (localStorage, 1 h)
   - API GitHub en premier, puis fallback jsDelivr (sans limite
     de 60 requêtes/h), puis index.json optionnel dans le dépôt
   - Si tout échoue : réutilise la dernière liste connue
   ========================================================= */
(function () {
  const USER = 'kevinraphael95';
  const REPO = 'random-useful-stuff';
  const BRANCH = 'main';

  const REPO_API_URL = `https://api.github.com/repos/${USER}/${REPO}/contents/code/questions`;
  const JSDELIVR_LIST_URL = `https://data.jsdelivr.com/v1/packages/gh/${USER}/${REPO}@${BRANCH}?structure=flat`;
  const BASE_URL = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/code/`;

  const CACHE_KEY = 'vroum-series-cache';
  const CACHE_TTL = 60 * 60 * 1000; // 1 h

  /* ---------- Cache ---------- */

  function lireCache(ignorerTTL) {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (!c || !Array.isArray(c.series) || !c.series.length) return null;
      if (!ignorerTTL && Date.now() - c.date > CACHE_TTL) return null;
      return c.series;
    } catch (e) { return null; }
  }

  function ecrireCache(series) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ date: Date.now(), series }));
    } catch (e) {}
  }

  /* ---------- Sources de la liste des séries ---------- */

  function listeViaApiGithub() {
    return fetch(REPO_API_URL)
      .then(res => {
        if (!res.ok) throw new Error('API GitHub ' + res.status);
        return res.json();
      })
      .then(files => {
        if (!Array.isArray(files)) throw new Error('Réponse API invalide');
        return files
          .filter(f => f.type === 'file' && f.name.endsWith('.json'))
          .map(f => 'questions/' + f.name);
      });
  }

  function listeViaJsdelivr() {
    return fetch(JSDELIVR_LIST_URL)
      .then(res => {
        if (!res.ok) throw new Error('jsDelivr ' + res.status);
        return res.json();
      })
      .then(data => {
        if (!data || !Array.isArray(data.files)) throw new Error('Réponse jsDelivr invalide');
        return data.files
          .map(f => f.name)
          .filter(n => /^\/code\/questions\/[^/]+\.json$/.test(n))
          .map(n => n.replace('/code/', ''));
      });
  }

  // Optionnel : un fichier code/questions/index.json contenant ["serie1.json", ...]
  function listeViaIndex() {
    return fetch(BASE_URL + 'questions/index.json')
      .then(res => {
        if (!res.ok) throw new Error('index.json ' + res.status);
        return res.json();
      })
      .then(arr => {
        if (!Array.isArray(arr)) throw new Error('index.json invalide');
        return arr.map(n => 'questions/' + n);
      });
  }

  function trouverSeries() {
    const cache = lireCache(false);
    if (cache) return Promise.resolve(cache);

    const sources = [listeViaApiGithub, listeViaJsdelivr, listeViaIndex];

    return sources.reduce(
      (p, source) => p.catch(() =>
        source().then(series => {
          if (!series.length) throw new Error('Liste vide');
          return series;
        })
      ),
      Promise.reject(new Error('start'))
    )
      .then(series => { ecrireCache(series); return series; })
      .catch(err => {
        const vieux = lireCache(true); // cache expiré, mieux que rien
        if (vieux) {
          console.warn('⚠️ Sources indisponibles, utilisation du cache expiré.', err);
          return vieux;
        }
        throw err;
      });
  }

  /* ---------- Traduction des questions ---------- */

  function traduireQuestions(data) {
    return data.questions.map(q => {
      const dossierImage = q.id.charAt(0);
      const imageURL = `${BASE_URL}images/${dossierImage}/${q.id}.png`;

      const isOuiNon = q.options && Object.values(q.options).some(opt =>
        opt.includes('OUI') || opt.includes('NON')
      );

      if (isOuiNon) {
        const affirmations = [];
        const keys = Object.keys(q.options);
        for (let i = 0; i < keys.length; i += 2) {
          const keyOui = keys[i];
          const texteOui = q.options[keyOui] || '';
          const cleanTexte = texteOui.replace(/\s*:\s*OUI$/i, '').replace(/\s*:\s*NON$/i, '');
          affirmations.push({
            texte: cleanTexte,
            vrai: q.reponses.includes(keyOui)
          });
        }
        return { id: q.id, type: 'oui-non', image: imageURL, alt: q.enonce, question: q.enonce, affirmations, fiche: null, explication: '' };
      } else {
        const reponses = Object.keys(q.options).map(lettre => ({
          texte: q.options[lettre],
          correcte: q.reponses.includes(lettre)
        }));
        return { id: q.id, image: imageURL, alt: q.enonce, question: q.enonce, reponses, fiche: null, explication: '' };
      }
    });
  }

  /* ---------- Chargement ---------- */

  trouverSeries()
    .then(serieFiles => {
      console.log('📁 Séries détectées :', serieFiles);
      return Promise.all(
        serieFiles.map(serie =>
          fetch(BASE_URL + serie).then(res => res.json()).catch(() => null)
        )
      );
    })
    .then(resultats => {
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
        console.warn('⚠️ Aucune question chargée.');
      }
    })
    .catch(err => console.error('❌ Erreur import GitHub :', err));
})();

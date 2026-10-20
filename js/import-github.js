/* =========================================================
   IMPORT DEPUIS GITHUB — détection automatique
   - UNE seule requête (git/trees?recursive=1) liste tout le dépôt :
     tous les .json de code/questions (peu importe leur nom) et
     toutes les images de code/images/** (peu importe le dossier).
   - Résultat mis en cache 1 h dans le localStorage : 0 requête API
     aux visites suivantes (limite GitHub : 60/h sans token).
   - Image d'une question = fichier dont le nom (sans extension) = id.
   - Si l'API est bloquée (403) : cache expiré, sinon repli sur
     A.json, B.json, C.json… et images/<1re lettre de l'id>/<id>.png
   ========================================================= */
(function () {
  const USER = 'kevinraphael95';
  const REPO = 'random-useful-stuff';
  const BRANCH = 'main';

  const TREE_URL = `https://api.github.com/repos/${USER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const BASE_URL = `https://raw.githubusercontent.com/${USER}/${REPO}/${BRANCH}/code/`;

  const CACHE_KEY = 'vroum-tree-cache';
  const CACHE_TTL = 60 * 60 * 1000; // 1 h
  const EXT_IMAGES = /\.(png|jpe?g|webp|gif|svg)$/i;

  /* ---------- Cache ---------- */

  function lireCache(ignorerTTL) {
    try {
      const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (!c || !Array.isArray(c.series) || !c.series.length || !c.images) return null;
      if (!ignorerTTL && Date.now() - c.date > CACHE_TTL) return null;
      return c;
    } catch (e) { return null; }
  }

  function ecrireCache(series, images) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ date: Date.now(), series, images }));
    } catch (e) {}
  }

  /* ---------- Détection ---------- */

  // Une requête : séries (code/questions/*.json) + images (code/images/**)
  async function detecterViaArbre() {
    const res = await fetch(TREE_URL);
    if (!res.ok) throw new Error('API GitHub ' + res.status);
    const data = await res.json();
    if (!data || !Array.isArray(data.tree)) throw new Error('Réponse API invalide');
    if (data.truncated) console.warn('⚠️ Arbre GitHub tronqué : certains fichiers peuvent manquer.');

    const series = [];
    const images = {}; // id -> chemin relatif à code/

    data.tree.forEach(item => {
      if (item.type !== 'blob') return;
      const p = item.path;

      if (/^code\/questions\/[^/]+\.json$/i.test(p)) {
        const nom = p.split('/').pop();
        if (nom.toLowerCase() !== 'index.json') series.push(p.slice('code/'.length));
      } else if (p.startsWith('code/images/') && EXT_IMAGES.test(p)) {
        const fichier = p.split('/').pop();
        const id = fichier.replace(EXT_IMAGES, '');
        images[id] = p.slice('code/'.length);
      }
    });

    if (!series.length) throw new Error('Aucune série trouvée');
    return { series, images };
  }

  // Repli sans API : teste A.json, B.json, C.json… jusqu'au premier absent
  async function detecterParEssai() {
    const series = [];
    for (const lettre of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      const chemin = `questions/${lettre}.json`;
      try {
        const res = await fetch(BASE_URL + chemin, { method: 'HEAD' });
        if (!res.ok) break;
      } catch (e) { break; }
      series.push(chemin);
    }
    return { series, images: {} };
  }

  async function detecter() {
    const cache = lireCache(false);
    if (cache) return cache;

    try {
      const r = await detecterViaArbre();
      ecrireCache(r.series, r.images);
      return r;
    } catch (err) {
      const vieux = lireCache(true);
      if (vieux) {
        console.warn('⚠️ API indisponible, utilisation du cache expiré.', err);
        return vieux;
      }
      console.warn('⚠️ API indisponible, repli sur A.json, B.json…', err);
      return detecterParEssai();
    }
  }

  /* ---------- Traduction des questions ---------- */

  function urlImage(id, images) {
    const chemin = images[id] || `images/${id.charAt(0)}/${id}.png`;
    return BASE_URL + chemin.split('/').map(encodeURIComponent).join('/');
  }

  function traduireQuestions(data, images) {
    return data.questions.map(q => {
      const imageURL = urlImage(q.id, images);

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

  detecter()
    .then(({ series, images }) => {
      console.log('📁 Séries détectées :', series);
      console.log(`🖼️ ${Object.keys(images).length} images détectées`);

      return Promise.all(
        series.map(chemin =>
          fetch(BASE_URL + chemin.split('/').map(encodeURIComponent).join('/'))
            .then(res => res.json())
            .catch(() => null)
        )
      ).then(resultats => ({ resultats, images }));
    })
    .then(({ resultats, images }) => {
      let toutesLesQuestions = [];

      resultats.forEach(data => {
        if (data && Array.isArray(data.questions)) {
          toutesLesQuestions = toutesLesQuestions.concat(traduireQuestions(data, images));
        }
      });

      if (toutesLesQuestions.length > 0) {
        window.EXAMEN_QUESTIONS = toutesLesQuestions;
        console.log(`✅ ${toutesLesQuestions.length} questions chargées depuis GitHub !`);
        if (typeof window.initExamen === 'function') {
          window.initExamen();
        }
      } else {
        console.warn('⚠️ Aucune question chargée.');
      }
    })
    .catch(err => console.error('❌ Erreur import GitHub :', err));
})();

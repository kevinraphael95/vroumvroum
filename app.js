const questionBank = [
    {
        question: "En cas de brouillard avec une visibilité inférieure à 50 m, quelle est la vitesse maximale autorisée sur autoroute ?",
        options: ["110 km/h", "90 km/h", "70 km/h", "50 km/h"],
        answer: "50 km/h",
        explanation: "Dès que la visibilité descend sous 50 m, la vitesse est limitée à 50 km/h max sur tout le réseau."
    },
    {
        question: "Quelle est la profondeur minimale légale des rainures d'un pneumatique ?",
        options: ["1,0 mm", "1,6 mm", "2,0 mm", "3,0 mm"],
        answer: "1,6 mm",
        explanation: "Le témoin d'usure indique la limite légale fixée à 1,6 mm."
    },
    {
        question: "Que permet principalement le système ABS lors d'un freinage d'urgence ?",
        options: [
            "Réduire de moitié la distance d'arrêt",
            "Conserver le contrôle de la trajectoire",
            "Stopper le véhicule automatiquement sans toucher à la pédale",
            "Allumer automatiquement les feux de détresse"
        ],
        answer: "Conserver le contrôle de la trajectoire",
        explanation: "L'ABS empêche les roues de se bloquer, ce qui permet de continuer à diriger le véhicule."
    },
    {
        question: "Quand doit être effectué le tout premier Contrôle Technique d'un véhicule neuf ?",
        options: [
            "Au bout de 2 ans",
            "Dans les 4 mois précédant son 4ᵉ anniversaire",
            "À la date exacte de ses 5 ans",
            "Tous les ans dès la première année"
        ],
        answer: "Dans les 4 mois précédant son 4ᵉ anniversaire",
        explanation: "Le premier CT a lieu dans les 4 mois qui précèdent le 4ᵉ anniversaire de la mise en circulation."
    },
    {
        question: "Sur un carrefour à sens giratoire, qui a la priorité ?",
        options: [
            "Les véhicules qui s'engagent",
            "Les véhicules déjà engagés dans l'anneau",
            "Le véhicule qui vient de la droite",
            "Les véhicules les plus lourds"
        ],
        answer: "Les véhicules déjà engagés dans l'anneau",
        explanation: "Les usagers circulant déjà sur l'anneau sont prioritaires grâce au panneau Cédez-le-passage."
    },
    {
        question: "Quelle est la vitesse maximale sur route à 2x1 voie hors agglomération par temps sec ?",
        options: ["70 km/h", "80 km/h", "90 km/h", "110 km/h"],
        answer: "80 km/h",
        explanation: "Sur les routes hors agglomération à double sens sans séparateur central, la limite est à 80 km/h."
    }
];

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// Mélange Aléatoire (Algorithme de Fisher-Yates)
function shuffle(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initQuiz() {
    // Sélectionne 5 questions aléatoires et mélange leurs options
    currentQuestions = shuffle(questionBank).slice(0, 5);
    currentQuestions.forEach(q => {
        q.shuffledOptions = shuffle(q.options);
    });

    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-box').style.display = 'block';
    document.getElementById('result-box').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('question-text').innerText = `${currentIndex + 1}/${currentQuestions.length}. ${q.question}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const feedback = document.getElementById('feedback-text');
    feedback.className = 'feedback-card';
    feedback.innerText = '';

    document.getElementById('next-btn').style.display = 'none';

    q.shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-card';
        btn.innerText = opt;
        btn.onclick = () => selectOption(opt, q.answer, q.explanation);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedOpt, correctOpt, explanation) {
    const buttons = document.querySelectorAll('.option-card');
    const feedback = document.getElementById('feedback-text');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctOpt) {
            btn.classList.add('correct');
        } else if (btn.innerText === selectedOpt) {
            btn.classList.add('wrong');
        }
    });

    if (selectedOpt === correctOpt) {
        score++;
        feedback.innerText = "Exact ! " + explanation;
        feedback.style.backgroundColor = "var(--success-bg)";
        feedback.style.color = "var(--success-text)";
    } else {
        feedback.innerText = "Incorrect. " + explanation;
        feedback.style.backgroundColor = "var(--error-bg)";
        feedback.style.color = "var(--error-text)";
    }

    feedback.classList.add('show');
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-box').style.display = 'none';
    const resultBox = document.getElementById('result-box');
    resultBox.style.display = 'block';
    document.getElementById('score-text').innerText = `Score final : ${score} / ${currentQuestions.length}`;
}

function restartQuiz() {
    initQuiz();
}

document.addEventListener('DOMContentLoaded', initQuiz);

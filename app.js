let mode = null;          // "rapide" | "infini"
let currentQuestions = []; // utilisé en mode rapide
let currentIndex = 0;
let score = 0;
let streak = 0;           // utilisé en mode infini
let lastCategory = null;

const modeSelectBox = document.getElementById('mode-select-box');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');

function showOnly(box) {
    [modeSelectBox, quizBox, resultBox].forEach(b => b.style.display = (b === box) ? 'block' : 'none');
}

function startMode(chosenMode) {
    mode = chosenMode;
    score = 0;
    streak = 0;
    currentIndex = 0;
    lastCategory = null;

    if (mode === 'rapide') {
        currentQuestions = generateQuestionSet(5);
    } else {
        currentQuestions = [generateOneQuestion()];
    }

    document.getElementById('mode-indicator').innerText =
        mode === 'rapide' ? 'Mode rapide — 5 questions' : 'Mode infini — jusqu\'à la première erreur';
    document.getElementById('streak-counter').style.display = (mode === 'infini') ? 'inline-block' : 'none';

    showOnly(quizBox);
    loadQuestion();
}

function loadQuestion() {
    const q = currentQuestions[currentIndex];
    lastCategory = q.category;

    const progress = mode === 'rapide'
        ? `${currentIndex + 1}/${currentQuestions.length}`
        : `Question ${currentIndex + 1}`;

    document.getElementById('question-category').innerText = q.category;
    document.getElementById('question-text').innerText = `${progress} — ${q.question}`;
    document.getElementById('streak-counter').innerText = `Série : ${streak}`;

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
    const isCorrect = selectedOpt === correctOpt;

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctOpt) {
            btn.classList.add('correct');
        } else if (btn.innerText === selectedOpt) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        score++;
        streak++;
        feedback.innerText = "Exact ! " + explanation;
        feedback.style.backgroundColor = "var(--success-bg)";
        feedback.style.color = "var(--success-text)";
        document.getElementById('next-btn').innerText =
            (mode === 'rapide' && currentIndex === currentQuestions.length - 1) ? 'Voir le résultat' : 'Question suivante';
    } else {
        feedback.innerText = "Incorrect. " + explanation;
        feedback.style.backgroundColor = "var(--error-bg)";
        feedback.style.color = "var(--error-text)";
        document.getElementById('next-btn').innerText =
            (mode === 'infini') ? 'Voir mon score' : 'Voir le résultat';
    }

    feedback.classList.add('show');
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('next-btn').dataset.wasCorrect = isCorrect;
}

function nextQuestion() {
    const wasCorrect = document.getElementById('next-btn').dataset.wasCorrect === 'true';

    if (mode === 'infini') {
        if (!wasCorrect) {
            showResults();
            return;
        }
        currentIndex++;
        currentQuestions.push(generateOneQuestion(lastCategory));
        loadQuestion();
        return;
    }

    // mode rapide
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showOnly(resultBox);
    if (mode === 'rapide') {
        document.getElementById('score-text').innerText = `Score final : ${score} / ${currentQuestions.length}`;
        document.getElementById('score-detail').innerText = '';
    } else {
        document.getElementById('score-text').innerText = `Série terminée à ${streak} bonne(s) réponse(s)`;
        document.getElementById('score-detail').innerText =
            streak >= 10 ? "Solide, tu maîtrises bien le programme." :
            streak >= 5 ? "Pas mal, continue à réviser les thèmes qui te bloquent." :
            "Retourne voir les fiches de cours avant de retenter.";
    }
}

function backToModeSelect() {
    showOnly(modeSelectBox);
}

document.addEventListener('DOMContentLoaded', () => showOnly(modeSelectBox));

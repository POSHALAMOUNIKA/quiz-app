const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Syntax", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "JavaScript", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement("li");
        li.innerText = answer.text;
        li.addEventListener("click", () => selectAnswer(answer.correct, li));
        answersElement.appendChild(li);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(isCorrect, element) {
    if (isCorrect) {
        element.style.backgroundColor = "lightgreen";
        score++;
    } else {
        element.style.backgroundColor = "salmon";
    }

    Array.from(answersElement.children).forEach(li => li.style.pointerEvents = "none");
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionElement.classList.add("hidden");
    answersElement.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultElement.classList.remove("hidden");
    resultElement.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>`;
}

startQuiz();

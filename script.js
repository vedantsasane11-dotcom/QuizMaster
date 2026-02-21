const questions = [
    {
        question: "Which is Fastest land animal in the world ?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Tiger", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Horse", correct: false },
        ]
    },
    {
        question: "Which is largest animal in the world ?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Lion", correct: false },
            { text: "Giraffe", correct: false },

        ]
    },
    {
        question: "Which is the largest ocean in the world ?",
        answers: [
            { text: "Pacific Ocean", correct: true },
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
        ]

    },
    {
        question: "Who is known as the Father of the Nation in India ?",
        answers: [
            { text: "Dr.B.R.Ambedkar", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Sardar Vallabhbhai Patel", correct: false },
            { text: "Jawaharlal Nehru", correct: false },
        ]
    },
    {
        question: "Which planet in our solar system is known as the Red Planet ?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },

        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        const label = String.fromCharCode(65 + index); // A, B, C, D
        button.innerHTML = `Answer ${label}: ${answer.text}`;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();



// DOM Elements 
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText and Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which data structure uses FIFO (First In First Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "Which HTTP status code means “Not Found”?",
    answers: [
      { text: "200", correct: false },
      { text: "301", correct: false },
      { text: "500", correct: false },
      { text: "404", correct: true },
    ],
  },
  {
    question: "In Java, which of the following is not a primitive data type?",
    answers: [
      { text: "int", correct: false },
      { text: "boolean", correct: false },
      { text: "String", correct: true },
      { text: "double", correct: false },
    ],
  },
  {
    question: "Which of these sorting algorithms has the best average time complexity?",
    answers: [
      { text: "Bubble Sort", correct: false },
      { text: "Selection Sort", correct: false },
      { text: "Merge Sort", correct: true },
      { text: "Insertion Sort", correct: false },
    ],
  },
];

// QUIZ STATE VARS 

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners 

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz () {
    // reset Vars 
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    // reset state 

    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${
        (currentQuestionIndex / quizQuestions.length) * 100
    }%`;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selected = event.target;
    const correct = selected.dataset.correct === "true";

    // Highlight correct/incorrect answers
    Array.from(answersContainer.children).forEach((btn) => {
        if (btn.dataset.correct === "true") {
        btn.classList.add("correct");
        } else if (btn === selected) {
        btn.classList.add("incorrect");
        }
    });

    // Update score if correct
    if (correct) {
        score++;
        scoreSpan.textContent = score;
    }

    // Move to next question or show results
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
        } else {
        showResults();
        }
    }, 1000);
}

function showResults() {

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;

    // Calculate percentage and show appropriate message
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }

    progressBar.style.width = "100%";
}


function restartQuiz () {
    resultScreen.classList.remove("active");

    startQuiz();
}


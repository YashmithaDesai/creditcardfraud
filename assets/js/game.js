const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 100; // Starting score
let questionCounter = 0;
let availableQuesions = [];

// Define your questions array with 10 MCQs
let questions = [
  {
    question: "What is a common indicator of potential credit card fraud?",
    choice1: "Large and unusual purchases",
    choice2: "Regular monthly payments",
    choice3: "Multiple account logins",
    choice4: "Exceeding credit limit",
    answer: 1
  },
  {
    question: "Which of the following is NOT a type of credit card fraud?",
    choice1: "Phishing",
    choice2: "Card skimming",
    choice3: "Identity theft",
    choice4: "Secure online payments",
    answer: 4
  },
  {
    question: "What does CVV stand for in credit card security?",
    choice1: "Card Verification Value",
    choice2: "Customer Verification Value",
    choice3: "Card Validity Value",
    choice4: "Credit Verification Value",
    answer: 1
  },
  {
    question: "What role does EMV chip technology play in reducing fraud?",
    choice1: "Encrypts cardholder data during transactions",
    choice2: "Provides card rewards to loyal customers",
    choice3: "Stores additional personal information",
    choice4: "Improves card design aesthetics",
    answer: 1
  },
  {
    question: "Which organization sets standards for credit card security?",
    choice1: "ISO",
    choice2: "PCI DSS",
    choice3: "FBI",
    choice4: "IRS",
    answer: 2
  },
  {
    question: "How can tokenization enhance credit card security?",
    choice1: "Displays transaction details on receipts",
    choice2: "Generates unique codes for transactions",
    choice3: "Shares card information with third parties",
    choice4: "Provides instant account alerts",
    answer: 2
  },
  {
    question: "What is a red flag for credit card fraud in online transactions?",
    choice1: "Customer entering CVV during checkout",
    choice2: "Billing address matching shipping address",
    choice3: "Use of secure payment gateways",
    choice4: "Password protected accounts",
    answer: 1
  },
  {
    question: "How does machine learning help detect credit card fraud?",
    choice1: "Updates transaction limits automatically",
    choice2: "Analyzes patterns in transaction data",
    choice3: "Registers new card applications",
    choice4: "Syncs card balances with bank accounts",
    answer: 2
  },
  {
    question: "What does PCI DSS compliance ensure?",
    choice1: "Protects cardholder data",
    choice2: "Provides free credit cards",
    choice3: "Prevents bank transactions",
    choice4: "Promotes online discounts",
    answer: 1
  },
  {
    question: "How can cardholders protect against credit card fraud?",
    choice1: "Sharing card details over email",
    choice2: "Storing PIN with card",
    choice3: "Regularly monitoring account statements",
    choice4: "Using the same PIN for all cards",
    answer: 3
  }
];

// CONSTANTS
const INCORRECT_TAX = 10; // Penalty for incorrect answer
const MAX_QUESTIONS = 3; // Number of questions to display

// Function to start the game
startGame = () => {
  questionCounter = 0;
  score = 100; // Reset score to 100
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      // Redirect to end page when score reaches 0
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000); // Decrease score every second
};

// Function to get and display a new question
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    // Redirect to end page when all questions are answered
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  // Update progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Select a random question from available questions
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Display choices for the current question
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove the displayed question from available questions
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true; // Allow user to select an answer
};

// Event listener for user's choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Apply correct or incorrect class based on user's answer
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // Penalize for incorrect answer
    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    // Reset class after 1 second and get a new question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Function to decrement score for wrong answers
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};

// Start the game when the script runs
startGame();

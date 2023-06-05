//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 15;
let countdown;

//Questions and Options array

const quizLv1 = [
  {
    id: "0",
    question: "`f(x) = 1/sqrt(x^3)`",
    options: [
      "`f(x) = 1/x^(3/2)`",
      "`f(x) = 1/x`",
      "`f(x) = 1/x^(3/4)`",
      "`f(x) = 1/x^(2/4)`",
    ],
    correct: "`f(x) = 1/x^(3/2)`",
  },
  {
    id: "1",
    question: "`f(x) = 1/x^(3/2)`",
    options: [
      "`f(x) = x^(-3/2)`",
      "`f(x) = x^(6/2)`",
      "`f(x) = x^(-3/4)`",
      "`f(x) = x^(-3/6)`",
    ],
    correct: "`f(x) = x^(-3/2)`",
  },
  {
    id: "2",
    question: "`f(x) = x^(-3/2)`",
    options: [
      "`f'(x) = (-3/2)*x^(-3/2-2/2)`",
      "`f'(x) = (5/2)*x^(-4/2-2/8)`",
      "`f'(x) = (-3/2)*x^(-3/3-2/2)`",
      "`f'(x) = (-3/2)*x^(-3/3+5/2)`",
    ],
    correct: "`f'(x) = (-3/2)*x^(-3/2-2/2)`",
  },
  {
    id: "3",
    question: "`f'(x) = (-3/2)*x^(-3/2-2/2)`",
    options: [
      "`f'(x) = (-3/2)*x^(-5/2)`",
      "`f'(x) = (-3/2)*x^(5/2)`",
      "`f'(x) = (3/2)*x^(-6/3)`",
      "`f'(x) = (-6/2)*x^(5/4)`",
    ],
    correct: "`f'(x) = (-3/2)*x^(-5/2)`",
  },
  {
    id: "4",
    question: "`f'(x) = (-3/2)*x^(-5/2)`",
    options: [
      "`f'(x) = (-3/2)*1/sqrt(x^5)`",
      "`f'(x) = (-3/2)*2/sqrt(x^5)`",
      "`f'(x) = (5/2)*1/sqrt(x^6)`",
      "`f'(x) = (-3/9)*1/sqrt(x^5)`",
    ],
    correct: "`f'(x) = (-3/2)*1/sqrt(x^5)`",
  },
  {
    id: "5",
    question: "`f'(x) = (-3/2)*1/sqrt(x^5)`",
    options: [
      "`f'(x) = (-3/2)*1/(x^2*sqrt(x))`",
      "`f'(x) = (2/2)*3/(x^3*sqrt(x))`",
      "`f'(x) = (-3/3)*1/(x^2*sqrt(x))`",
      "`f'(x) = (3/5)*1/(x^2*sqrt(x))`",
    ],
    correct: "`f'(x) = (-3/2)*1/(x^2*sqrt(x))`",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizLv1.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Tu puntaje es " + scoreCount + " de " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizLv1.length + " Preguntas";
      //display quiz
      quizDisplay(questionCount);
      count = 15;
      clearInterval(countdown);
      timerDisplay();
    }
    nextBtn.classList.add("disabled");
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  //quizLv1.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizLv1) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " de " + quizLv1.length + " Preguntas";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)" mathOption="${i.options[0]}">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)" mathOption="${i.options[1]}">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)" mathOption="${i.options[2]}">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)" mathOption="${i.options[3]}">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.getAttribute("mathOption");
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizLv1[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    nextBtn.classList.remove("disabled");
  } else {
    userOption.classList.add("incorrect");
    nextBtn.classList.remove("disabled");
    //For marking the correct option
    options.forEach((element) => {
      if (
        element.getAttribute("mathOption") == quizLv1[questionCount].correct
      ) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 15;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
  MathJax.typesetPromise();
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

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
let restartAlert = document.getElementById("restart-alert");
let questionCount;
let scoreCount = 0;
let count = 45;
let countdown;
let restartCount = 5;
let restartCountdown;

//Questions and Options array

const quizLv1 = [
  {
    id: "0",
    question: "Derivada de F(y,x)=x<sup>2</sup>y<sup>2</sup>",
    options: [
      "f'x=3y<sup>2</sup>x | f'y=4x<sup>2</sup>y",
      "f'x=2y<sup>2</sup>x | f'y=2x<sup>2</sup>y",
      "f'x=2y<sup>3</sup>x | f'y=2xy",
      "f'x=2y<sup>2</sup>x | f'y=2xy",
    ],
    correct: "f'x=2y<sup>2</sup>x | f'y=2x<sup>2</sup>y",
  },
  {
    id: "1",
    question: "F(y,x)=x<sup>2</sup>+y<sup>2</sup>",
    options: [
      "f'x=2x | f'y=2y",
      "f'x=2x | f'y=2y<sup>2</sup>",
      "f'x=2x<sup>2</sup> | f'y=2y",
      "f'x=2x<sup>2</sup> | f'y=2y<sup>2</sup>",
    ],
    correct: "f'x=2x | f'y=2y",
  },
  {
    id: "2",
    question: "F(x,y)=x<sup>2</sup>+y<sup>2</sup>+2y",
    options: [
      "Fx=2x | fy=2y+2",
      "Fx=2x<sup>2</sup> | fy=2y-2",
      "Fx=x<sup>2</sup> | fy=2y<sup>2</sup>+2",
      "Fx=2x | fy=2y+2x",
    ],
    correct: "Fx=2x | fy=2y+2",
  },
];

//Restart Quiz
restart.addEventListener(
  "click",
  (restartQuiz = () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
    restartAlert.classList.replace("d-block", "d-none");
  })
);

//Restart Alert Display
const restartAlertDisplay = () => {
  restartCount = 5;
  restartAlert.querySelector("span").innerHTML = `${restartCount}s`;
  restartAlert.classList.replace("d-none", "d-block");

  restartCountdown = setInterval(() => {
    restartCount--;
    restartAlert.querySelector("span").innerHTML = `${restartCount}s`;
    if (restartCount == 0) {
      clearInterval(restartCountdown);
      restartQuiz();
    }
  }, 1000);
};

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
        questionCount + 1 + " of " + quizLv1.length + " Preguntas";
      //display quiz
      quizDisplay(questionCount);
      count = 45;
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

    if (count == 5) {
      restartAlertDisplay();
    }

    if (count == 0) {
      clearInterval(countdown);
      //displayNext();
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
  quizLv1.sort(() => Math.random() - 0.5);
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
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizLv1[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    nextBtn.classList.remove("disabled");
    clearInterval(restartCountdown);
    restartAlert.classList.replace("d-block", "d-none");
  } else {
    userOption.classList.add("incorrect");
    nextBtn.classList.remove("disabled");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizLv1[questionCount].correct) {
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
  count = 45;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
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

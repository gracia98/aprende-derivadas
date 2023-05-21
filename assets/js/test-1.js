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
    question: "El valor de la derivada de una función en un punto puede interpretarse geométricamente, ya que:",
    options: ["Son figuras geométricas.", "Su punto está en el plano.", "Corresponde con la pendiente de la recta tangente a la gráfica de la función de dicho punto.", "El punto en el plano es geométrico."],
    correct: "Corresponde con la pendiente de la recta tangente a la gráfica de la función de dicho punto.",
  },
  {
    id: "1",
    question: "La derivada se aplica en aquellos casos donde:",
    options: ["Es necesario recurrir a una explicación correcta.", "Es necesario que la aplicación de una función sea correcta.", "Es necesario tener un movimiento estable.", "Es necesario medir la rapidez con que se produce el cambio de una magnitud o situación."],
    correct: "Es necesario medir la rapidez con que se produce el cambio de una magnitud o situación.",
  },
  {
    id: "2",
    question: "El concepto de derivada se define como.",
    options: ["Una medida de rapidez con la que cambia el valor de dicha función según cambia el valor de dicha función según cambie el valor de su variable dependiente.", "Es una función que se mantiene en un solo lugar.", "Una medida de la rapidez con la que cambia el valor de dicha función según cambie el valor de su variable independiente.", "Es una función que representa cambios iguales."],
    correct: "Una medida de la rapidez con la que cambia el valor de dicha función según cambie el valor de su variable independiente.",
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
        questionCount + 1 + " of " + quizLv1.length + " Preguntas";
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
  count = 15;
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

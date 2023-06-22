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
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
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
    question: "La derivada de una función f en un punto x se denota como:",
    options: ["x<sup>2</sup>", "x+2x", "f(x)+f", "f'(x)"],
    correct: "f'(x)",
  },
  {
    id: "3",
    question: "¿Cuál de las siguientes funciones es la derivada cuarta de f(x) = sen x?",
    options: ["g(x) = - sen x", "g(x) = - cos x", "g(x) = cos x", "g(x) = sen x"],
    correct: "g(x) = cos x",
  },
  {
    id: "4",
    question: "¿Cuál de las siguientes expresiones no es correcta?",
    options: ["(f + g)' = f' + g'", "(k.f)' = k.f' con k un número real", "(f - g)' = f' - g'", "(f.g)' = f' . g'"],
    correct: "(f.g)' = f' . g'",
  },
  {
    id: "5",
    question: "Sea f(x) = cosx / (x2 - 1), ¿qué vale f'(0)?",
    options: ["-1", "-2", "1", "0"],
    correct: "0",
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
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Tu puntaje es " + scoreCount + " de " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " Preguntas";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
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
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " Preguntas";
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
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
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
  count = 16;
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

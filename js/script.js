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
let count = 21;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "En que año Nacio Messi?",
        options: ["1985", "1986", "1987", "1988"],
        correct: "1987",
    },
    {
        id: "1",
        question: "En que ciudad nacio Messi?",
        options: ["Rosario", "Rafaela", "Venado Tuerto", "Reconquista"],
        correct: "Rosario",
    },
    {
        id: "2",
        question: "Cuantos años tenia cuando gano su primer Balon de Oro?",
        options: ["21 años", "22 años", "23 años", "24 años"],
        correct: "22 años",
    },
    {
        id: "3",
        question: "En que año gano la copa America?",
        options: ["2018", "2019", "2020", "2021"],
        correct: "2021",
    },
    {
        id: "4",
        question: "En que año gano la copa del Mundo?",
        options: ["2019", "2020", "2021", "2022"],
        correct: "2022",
    },
    {
        id: "5",
        question: "Cual fue el idolo de de Messi en su adolecencia?",
        options: ["Pablo Cesar Aimar", "Juan Roman Riquelme", "Diego Armando Maradona", "Ricardo Bochini"],
        correct: "Pablo Cesar Aimar",
    }, {
        id: "6",
        question: "Cual es uno de sus apodo?",
        options: ["La Pulga", "El Lince", "El Oso", "El Tigre"],
        correct: "La Pulga",
    },
    {
        id: "7",
        question: "Por que celebra sus goles señalando al cielo?",
        options: ["Por su Abuela", "Por Dios", "Por los extraterrestes", "Para las estrellas"],
        correct: "Por su Abuela",
    },
    {
        id: "8",
        question: "Que genero de musica le gusta?",
        options: ["Reggae", "Rock", "Heavy", "Electronica"],
        correct: "Reggae",
    },
    {
        id: "9",
        question: "Cual fue su primer Dorsal en la seleccion Argentina?",
        options: ["19", "10", "30", "22"],
        correct: "19",
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
                "Su puntaje es " + scoreCount + " de " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " de " + quizArray.length + " Preguntas";
            //display quiz
            quizDisplay(questionCount);
            count = 21;
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
    count = 21;
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
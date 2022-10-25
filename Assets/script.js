
var startText = document.getElementById("start-text");
var startButton = document.getElementById("start-bttn");
var nextButton = document.getElementById("next-bttn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("questions")
var choiceEl = document.getElementById("choices")
var choiceBttnEl = document.getElementById("choice-bttn")
let shuffledQuestions, currentQuestionIndex
var timeLeft = 100;
var timerSpan = document.getElementById("time-left")
var timerEl = document.getElementById("timer")
var scoresForm = document.getElementById("quiz-scores")
var saveButton = document.getElementById("saveScoreBttn")
var restart = document.getElementById("restart")

var questions = [

    {
        Q: "Which of the following data type uses true/false logic?",
        choices: [

            { choice: "String.", correct: false },
            { choice: "Number.", correct: false },
            { choice: "Array.", correct: false },
            { choice: "Boolean.", correct: true }
        ]
    },
    {
        Q: "What do you use to print data in the console?",
        choices: [

            { choice: "addEventListener.", correct: false },
            { choice: "console.log()", correct: true },
            { choice: "getElementById", correct: false },
            { choice: "Math.floor", correct: false }
        ]
    },
    {
        Q: "What word do you use to define a variable?",
        choices: [

            { choice: "var", correct: false },
            { choice: "let", correct: false },
            { choice: "const", correct: false },
            { choice: "All of the above.", correct: true }
        ]
    },
    {
        Q: "How do you store data in the user's browser?",
        choices: [

            { choice: "console.log", correct: false },
            { choice: "localStorage.setIem", correct: true },
            { choice: "localStorage.getItem", correct: false },
            { choice: "storeInfo", correct: false }
        ]
    }
]

var timer
function startTimer() {
    timer = setInterval(function () { timerCount() }, 1000);
}
function timerCount() {

    if (timeLeft > 1 && currentQuestionIndex < questions.length) {

        timerSpan.textContent = timeLeft + ' seconds left.'
        timeLeft--;


    } else {

        timerSpan.textContent = '';
        clearInterval(timer)
        endQuiz();
    }
}

var timer
function startTimer() {
    timer = setInterval(function () { timerCount() }, 1000);
}
function timerCount() {

    if (timeLeft > 1 && currentQuestionIndex < questions.length) {

        timerSpan.textContent = timeLeft + ' seconds left.'
        timeLeft--;


    } else {

        timerSpan.textContent = '';
        clearInterval(timer)
        endQuiz();
    }
}




// function to start the quiz
function startQuiz() {

    console.log("It works!");
    // add code to hide start button & start text after pressing it
    startButton.classList.add("hidden");
    startText.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    // add code to display question container element
    questionContainerEl.classList.remove("hidden");
    timerEl.classList.remove("hidden");
    startTimer();

    displayNextQuestion();

}

// function to display each question after the start button is pressed

function displayNextQuestion() {

    console.log(shuffledQuestions, currentQuestionIndex)

    displayQuestion(shuffledQuestions[currentQuestionIndex])
    questionChoices(questions.choices)

}

function displayQuestion(questions) {

    questionEl.innerText = questions.Q;

}



function questionChoices() {

    if (currentQuestionIndex > questions.length) {

        endQuiz();

    } else {

        document.getElementById("choices").innerText = ""



        for (let j = 0; j < 4; j++) {

            const choiceBttn = document.createElement("button")
            choiceBttn.classList.add("choice-bttn")
            choiceBttn.setAttribute("id", j)
            choiceBttn.innerText = questions[currentQuestionIndex].choices[j].choice
            choiceBttn.addEventListener("click", function () {


                var questionAnswer = (questions[currentQuestionIndex].choices[choiceBttn.id].correct)

                if (questionAnswer === true) {

                    let correctMsg = document.createElement("h2")
                    correctMsg.classList.add("right")
                    correctMsg.innerText = "Correct!"
                    document.getElementById("choices").appendChild(correctMsg)



                } else {

                    let incorrectMsg = document.createElement("h2")
                    incorrectMsg.classList.add("wrong")
                    incorrectMsg.innerText = "Incorrect! -10 seconds."
                    document.getElementById("choices").appendChild(incorrectMsg)
                    timeLeft -= 10

                }

                setTimeout(function () {

                    displayNextQuestion(currentQuestionIndex++);


                }, 1000)



            })
            document.getElementById("choices").appendChild(choiceBttn)
        }
    }
}






// function to end the quiz

let endGameText = document.createElement("h2")

function endQuiz() {

    // hide the quiz buttons once more
    questionContainerEl.classList.add("hidden");
    timerEl.classList.add("hidden");


    endGameText.classList.add("endScreen")
    endGameText.innerText = "Time's up!"
    document.getElementById("endScreen").appendChild(endGameText)


    displayScores();




}



// function to display user's score

let scores = document.createElement("h2")

function displayScores() {

    // when game ends display final score and have user input their intials to save score in local storage


    scores.classList.add("endScreen")
    scores.innerText = "You got " + timeLeft + " points!"
    document.getElementById("endScreen").appendChild(scores)

    scoresForm.classList.remove("hidden");



}

// save score button logic

saveButton.addEventListener('click', function (event) {
    event.preventDefault();

    var highScoreInitals = document.querySelector("#playerInitials").value;
    var highScore = timeLeft;


    localStorage.setItem("high-scores", JSON.stringify([highScore]))
    localStorage.setItem("player-initials", JSON.stringify([highScoreInitals]))

    highScores();

    // high scores page

    function highScores() {

        scores.classList.add('hidden')
        scoresForm.classList.add('hidden')
        endGameText.classList.add("hidden")
        restart.classList.remove("hidden")

        const highScores = JSON.parse(localStorage.getItem("high-scores")) || []
        const highScoresIn = JSON.parse(localStorage.getItem("player-initials")) || []

        const score = {

            score: highScores,
            name: highScoresIn
        }


        highScores.push(score)






        let highScoresList = document.createElement("ul")
        highScoresList.classList.add("end-screen")
        let highScoresListLi = document.createElement("li")
        highScoresListLi.classList.add("end-screen")
        highScoresListLi.textContent = "Score: " + highScore + " initials: " + highScoreInitals
        document.getElementById("endScreen").appendChild(highScoresList)
        document.getElementById("endScreen").appendChild(highScoresListLi)
    }

})


// eventListener to start the quiz when the button is pushed
startButton.addEventListener("click", startQuiz);

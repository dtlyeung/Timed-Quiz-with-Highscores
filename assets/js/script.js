const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["1. Hyper Tag Markup Language",
                  "2. Hyper Text Markup Language",
                  "3. Hyperlinking Text Marking Language",
                  "4. Hyperlinks Text Mark Language",
                ],
        correct: "2. Hyper Text Markup Language",    
    },
    {
        question: "Which of the following is NOT a semantic element?",
        choices: [ "1. section",
                   "2. aside",
                   "3. span",
                   "4. none of the above",
                 ],
        correct: "3.span",
    },
    {
        question: "What does CSS stand for?",
        choices: [ "1. Creative Style Sheet",
                   "2. Cascading Style Sheet",
                   "3. Creative Styling System",
                   "4. Computing Style System",
                ],
        correct: "2. Cascading Style Sheet",
    },
    {
        question: "What is the correct way to insert a single line comment in Javascript?",
        choices: ["1. //",
                  "2. /*",
                  "3. <!",
                  "4. ||",
                ],
        correct: "1. //"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        choices: ["1. booleans",
                  "2. numbers and strings",
                  "3. other arrays",
                  "4. all of the above", 
                ],
        correct: "4. all of the above",
    },
];

//Setup

const quizstart = document.getElementById('quiz-start')
const quizbox = document.getElementById('quiz-box')
const questionbox = document.getElementById('question-box')
const askquestion = document.getElementById('question')
const response = document.getElementsByClassName('response')
const messagebit = document.getElementById('message')
const scoring = document.getElementById('score')
const points = document.getElementById('points')
const initial = document.getElementById('initial')
const submit = document.getElementById('submit')
const seconds = document.getElementById('seconds')
const leaderboardButton = document.getElementById("leaderboard")
const hiscores = document.getElementById("hiscores")
const players = document.getElementById("players")
const back = document.getElementById('back')
const clear = document.getElementById('clear')

let message = ''
let score = 0
let currentquestion, availablequestions;
let counter;
let timeValue = 50


//Beginning of quiz
quizstart.addEventListener('click',() => {
    console.log("hi")
    startquiz()
})

function startquiz() {
    console.log("working so far")
    quizbox.classList.add("hide")
    currentquestion = questions.sort(() => Math.random() - 0.5)
    availablequestions = 0
    questionbox.classList.remove("hide")
    startTimer(timeValue)
    nextquestion()
}

//Question to question
function nextquestion() {
    showQuestion(currentquestion[availablequestions])
}

//Displaying question & answering
function showQuestion(questions) {
    askquestion.innerText = questions.questionText;
    for(let i=0; i < response.length; i++) {
        response[i].innerText = questions.choices[i]
        response[i].addEventListener('click',selectAnswer)
        if(questions.choices[i] === questions.answer) {
            response[i].dataset.correct = true
        }
    }
    messagebit.innerText = message
}

function selectAnswer(e) {
    const selectedButton = e.target
    if (selectedButton.dataset.correct) {
        message = 'Correct!'
        score++
    } else{
        message = "Incorrect!"
        clearInterval(counter)
        startTimer(parseInt(seconds.innerText)-10) 
    }
    availablequestions++
    if(currentquestion.length > availablequestions+1) {
        nextquestion()
    } else {
        clearInterval(counter)
        seconds.innerText = ''
        scoring.classList.remove('hide')
        questionbox.classList.add("hide")
        points.innerText = `Your final score is ${score}.`
    }
}

//Scoring
submit.addEventListener('click', () => {
    console.log("working?")
    setScore()
}) 

function setScore() {
    if(localStorage.length === 0){
        let value = initial.value
        const obj = {
            scores : [`${value} - ${score}`]
        }
        localStorage.setItem('score', JSON.stringify(obj));
        alert('Score added succesfully')
        scoring.classList.add('hide')
        quizbox.classList.remove("hide")
    } else{
        let value = initial.value
        const scores = JSON.parse(localStorage.getItem('score'));
        scores.scores.push(`${value} - ${score}`)
        localStorage.setItem('score', JSON.stringify(scores))
        alert('Score added succesfully')
        scoring.classList.add('hide')
        quizbox.classList.remove("hide")
    }
}

//Timer
function startTimer(time) {
  counter = setInterval(timer,1000)
  function timer() {
    if (time !== 0){
      seconds.innerText = time
      time--;
    } else {
      scoring.classList.remove('hide')
      questionContainerElement.classList.add("hide")
      points.innerText = `Your final score is ${score}.`
      seconds.innerText = ''
      clearInterval(counter)
    }
  }
}

//Leaderboard
leaderboardButton.addEventListener('click',viewLeaderboard)

function viewLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('score'));
  if(scores !== null){
    scores.scores.forEach(score =>{
      const li = document.createElement('li')
      li.innerText=score
      players.append(li)
    })
    quizbox.classList.add("hide")
    hiscores.classList.remove("hide")
  } else {
    alert('No high scores')
  }
}

back.addEventListener('click',() => {
  hiscores.classList.add("hide")
  quizbox.classList.remove("hide")
})

clear.addEventListener('click',() => {
  localStorage.clear()
  alert('Scores have been cleared')
  hiscores.classList.add("hide")
  quizbox.classList.remove("hide")
})
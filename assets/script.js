const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const startBtn = document.getElementById("start-btn");
const mainContainer = document.getElementById("main");
const questionContainer = document.getElementById("question-container");
const userInput = document.getElementById("user-input");
const highScoreContainer = document.getElementById("high-score");
let acceptingAnswer = false;
let index = 0;
const options = document.querySelectorAll(".options");
const question = document.getElementById("question");
const option1 = document.querySelector(".one");
const option2 = document.querySelector(".two");
const option3 = document.querySelector(".three");
const option4 = document.querySelector(".four ");
const answerStatus = document.getElementById("status");
const line = document.getElementById("line");
let counter = 50;
let time = document.getElementById("time");
const userScore = document.getElementById("score");
const submitBtn = document.querySelector(".submit");
const userName = document.getElementById("user-name");
//showing high score
const highScoreLink = document.getElementById("leaderboard");
const highScoreList = document.getElementById("highScorelist");

//initializing the local storage for storing high scores
const scores = window.localStorage;
scores.setItem("highScores",JSON.stringify([]));
let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
let marks;

//back buttons
const backBtn = document.querySelector(".back");
const resetBtn = document.querySelector(".clear");

//timer(counter)
let timer;

let userNum = 1;


function showStart(){
  time.innerHTML = '00';
  mainContainer.style.display="block";
  questionContainer.style.display="none";
  userInput.style.display="none";
  highScoreContainer.style.display="none";
}

function showQuestionContainer(){
  
  mainContainer.style.display="none";
  questionContainer.style.display="block";
  userInput.style.display="none";
  highScoreContainer.style.display="none";
}

function showInput(){
  mainContainer.style.display="none";
  questionContainer.style.display="none";
  userInput.style.display="block";
  highScoreContainer.style.display="none";
}

function showHighScore(){
  clearInterval(timer);
  time.innerHTML = "00";
  mainContainer.style.display="none";
  questionContainer.style.display="none";
  userInput.style.display="none";
  highScoreContainer.style.display="block";
  displayHighScore();
}

function start(){
    
  answerStatus.innerHTML = "";
    index = 0;
    counter = 50;
     timer = setInterval(function(){
       
        if(counter<10){
            time.innerHTML = '0'+counter;
        }
        else{
            time.innerHTML = counter;
        }
         counter--;

         
        
        if((counter+1)<=0){
        marks = counter+1;
        userScore.innerHTML = marks;
        clearInterval(timer);
        showInput();
        console.log("marks",marks);
        
    }
        
    },1000);

   
    mainContainer.style.display="none";
    questionContainer.style.display="block";
    showQuestion();
    
}
//  const options = document.querySelectorAll(".options");
function showQuestion(){
  acceptingAnswer = false;
    //loading the questions
    question.innerHTML = questions[index]['questionText'];
  option1.innerHTML = questions[index]['options'][0];
  option2.innerHTML = questions[index]['options'][1];
  option3.innerHTML = questions[index]['options'][2];
  option4.innerHTML = questions[index]['options'][3];
  acceptingAnswer = true;
 
}


function updateQuestion(){
  acceptingAnswer = false;
  // answerStatus.innerHTML = "none";
  console.log(index);
  index++;
  if(index<questions.length){
    
    question.innerHTML = questions[index]['questionText'];
    option1.innerHTML = questions[index]['options'][0];
    option2.innerHTML = questions[index]['options'][1];
    option3.innerHTML = questions[index]['options'][2];
    option4.innerHTML = questions[index]['options'][3];
    acceptingAnswer = true;
  }
  else{

    
    marks = counter + 1;
    userScore.innerHTML = marks;
    console.log(marks);
    // counter = 0;
    
    showInput();
    
    console.log(userScore);
    clearInterval(timer);
  }
  
    
}

options.forEach((option)=>{
 
  option.addEventListener("click",function (){
    
    line.style.display="block";
    // console.log(index);

     if(index<questions.length){
      if(!acceptingAnswer) return;
      // acceptingAnswer = false;
      if(option.innerHTML === questions[index].answer){
          answerStatus.innerHTML = "Correct!";
      }
      else{
        answerStatus.innerHTML = "Incorrect!";
        counter -= 10;
      }
      updateQuestion();
  }
  // else{
  //   console.log("index out of bound");
  // }

    
  });
})

//adding the user input

function userScores(){
  const score = {
        score : marks,
        userName : userName.value
      };
  highScores.push(score);
  highScores.sort((a,b)=>{
    return b.score - a.score;
  })
  highScores.splice(5);
  scores.setItem("highScores",JSON.stringify(highScores));
  console.log(highScores);
    console.log(scores);
    // console.log(userName.value);
    userNum++;
    console.log(index);
    showStart();
}

function displayHighScore(){
  // const scoreArr = scores.keys();
  // console.log(scoreArr);
  //   //THIS CODE IS NOT WORKING
  highScoreList.innerHTML = highScores.map(score=>{
    return `<li class="high-score">${score.userName} - ${score.score}</li>`;
    
})
.join("");
}

function clearHighScore(){
  console.log(highScoreList);
  const elemLi = document.querySelector(".high-score");
  console.log(elemLi);
  elemLi.innerHTML = "";
  highScores = [];
  scores.clear();
  showStart();
  
}


startBtn.addEventListener("click",start);
console.log(options);
// console.log(questions.length);

// showHighScore();

submitBtn.addEventListener("click",userScores);
// scores.clear();

highScoreLink.addEventListener("click",showHighScore);

//back events
backBtn.addEventListener("click",showStart);

//reset event
resetBtn.addEventListener("click",clearHighScore);

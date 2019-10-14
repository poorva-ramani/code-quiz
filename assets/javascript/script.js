var counter = document.getElementById("counter");
var question = document.getElementById("question");
var choiceSet = document.getElementById("choices");
var startQuiz = document.querySelector("#start-quiz");
var resultMessage = document.getElementById("result-message");
var container = document.getElementById("container");
var welcomeText = document.getElementById("welcome-text");
var buttonSet = document.getElementById("button-set");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector("#close-btn");
var closeButton = document.querySelector(".close-button");
var modalText = document.querySelector("#modal-text");
var modalSubtext = document.querySelector("#modal-subtext");
var credentials = document.querySelector("#credentials");
var initials = document.getElementById("initials");
var submit = document.querySelector("#submit");
var list = document.querySelector("#list");
var highscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var viewHighscore = document.querySelector("#view-highscore");
var goBackBtn = document.querySelector("#go-back");

var score = 0;
var i = 0;
var highScores =
{
  obj:
    [
      { name: "Poorva Ramani", score: 100},
    ]
};
localStorage.setItem('highScores', JSON.stringify(highScores));

var timer = questions.length * 15;

function toggleModal() {
  modal.classList.toggle("show-modal");
}

//starting page
function quiz() {
  startQuiz.addEventListener("click", function () {
    startTimer();
    playQuiz();
  });
}

function viewHighScore() {
  viewHighscore.addEventListener("click", function () {
    choiceSet.style.display="none";
    credentials.style.display="none";
    startQuiz.style.display="none";
    welcomeText.style.display="none";
    question.textContent="High Scores List";  
    outputScore();
  });
}

//timer/score calculator
function startTimer() {
  var timeInterval = setInterval(function () {
    if (i === questions.length - 1) {
      addScores();
      clearInterval(timeInterval);
    }
    if (timer === 0) {
      welcomeText.textContent = "Time Out!!!!";
      question.textContent = "Better Luck Next Time!!";
      setTimeout(function () {
        addScores();
    }, 2000);
      
      clearInterval(timeInterval);
    }
    counter.textContent = timer--;
  }, 1000);
}

//display highscores from local storage
function outputScore() {
  var restoredScores = JSON.parse(localStorage.getItem('highScores'));
  for (var j = 0; j < restoredScores.obj.length; j++) {
    var li = document.createElement("li");
    li.textContent = j+1 + ": " + restoredScores.obj[j].name + " : " + restoredScores.obj[j].score;
    list.appendChild(li);
  }

  highscore.style.display = "block";
  credentials.style.display = "none";
  welcomeText.style.display= "none";
  question.textContent="High Scores List";

  //clear High scores
  clear.addEventListener('click', function() {
    localStorage.clear();
    list.remove(); 
    welcomeText.style.display="none";
    question.textContent="No High Scores Available right now!!"
  });
}

//Storing high scores in Local storage 
function addScores() {
  question.textContent = "All Done!!!";
  welcomeText.textContent = "Your Final Score is " + timer;
  credentials.style.display = "block";
  submit.addEventListener("click", function (event) {
    var restoredScores = JSON.parse(localStorage.getItem('highScores'));
    restoredScores.obj.push({
      name: initials.value,
      score: timer.toString()
    });
    localStorage.setItem('highScores', JSON.stringify(restoredScores));
    outputScore();
  });
}

//Answer verification and messaging
function verifyAnswer(event, i) {
  if (event.target.textContent == questions[i].answer) {
    modalText.style.color = "green";
    modalText.textContent = "✨ Correct Answer !!  ✨";
    modalSubtext.textContent = "You get 15 more seconds in your scoretime";
    this.onclick = toggleModal();
    closeButton.addEventListener("click", toggleModal);
    closeBtn.addEventListener("click", toggleModal);
    timer = timer + 15;
  }
  else {
    modalText.style.color = "red";
    modalText.textContent = "✨ Wrong Answer !!  ✨";
    modalSubtext.textContent = 'Correct Answer is "' + questions[i].answer.toUpperCase() + '". \n You will be penalized in your scoretime by 10 seconds';
    this.onclick = toggleModal();
    closeButton.addEventListener("click", toggleModal);
    closeBtn.addEventListener("click", toggleModal);
    timer = timer - 10;
  }
}

function playQuiz() {
  welcomeText.textContent = "";
  credentials.style.display = "none";
  startQuiz.remove();
  question.textContent = questions[i].title;
  for (var j = 0; j < 4; j++) {
    var li = document.createElement("li");
    welcomeText.appendChild(li);
    li.textContent = questions[i].choices[j];
    li.addEventListener("click", function (event) {
      console.log(i);
      verifyAnswer(event, i);
      i++;
      playQuiz();
    });
  }
}

function goBack() {
  goBackBtn.addEventListener("click", function () {
    // question.style.display="block";
    // choiceSet.style.display="block";
    // startQuiz.style.display="block";
    // highscore.style.display="none";
    // // welcomeText.style.display="none";  
  });
}

viewHighScore();
goBack();
quiz();

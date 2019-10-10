var counter = document.getElementById("counter");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var startQuiz = document.getElementById("start-quiz");

var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    ///etc.
  ];

console.log(questions.title);
  
//counter
var time=0;
var timeInterval= setInterval(function(){
    counter.textContent= time++;
    if(time === 7){
        clearInterval(timeInterval);
    }
},1000);

var i=0;
//printing questions
startQuiz.addEventListener("click", function(event) {
    event.preventDefault();
    
// create user object from submission
for (i=0;i<2;i++){

var questionSet = {
      title: questions[i].title,
      choices: questions[i].choices,
      answers: questions[i].answers
};

question.textContent = questionSet.title;
for (var j=0;j<4;j++){
    console.log(questionSet.choices);
    var li = document.createElement("li");
    li.textContent=questionSet.choices[j];
    answers.appendChild(li);

    // console.log(questions.title);
    // console.log(questions.choices);
    // console.log(questions.answer);
}
}
});
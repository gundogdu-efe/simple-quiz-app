
const questionList = [
    new Question("1- Inside which HTML element do we put the JavaScript", {a: "<scripting>", b: "<javascript>", c: "<script>", d: "<js>"}, "c"),
    new Question("2- How to write an IF statement in JavaScript", {a: "if i = 5", b: "if i = 5 then", c: "if (i == 5)", d: "if i == 5 then"}, "c"),
    new Question("3- How does a FOR loop start?", {a: "for i = 1 to 5", b: "for (i = 0; i <= 5)", c: "for (i <= 5; i++)", d: "for (i = 0; i <= 5; i++)"}, "d"),
    new Question("4- What is the correct way to write a JavaScript array", {a: "var colors = ['red', 'green', 'blue']  ", b: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", c: "var colors = (1:'red', 2:'green', 3:'blue')", d: "var colors = 'red', 'green', 'blue'"}, "a")
];


const quiz = new Quiz(questionList);
const ui = new UI();

ui.btnStart.addEventListener("click", function(){
    startTimer(10);
    startTimerLine();
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.getQuestion(quiz.getQuestion());
    ui.showQuestionNumbers(quiz.questionIndex + 1, quiz.questions.length);
    ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function(){

    if(quiz.questions.length != quiz.questionIndex){
        startTimer(10);
        startTimerLine();
        ui.getQuestion(quiz.getQuestion());
        ui.showQuestionNumbers(quiz.questionIndex + 1, quiz.questions.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.showScore(quiz.correctAnswers, quiz.questions.length);
    }
});

function optionSelected(e){
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedElement = e.target;

    if(selectedElement.nodeName == "SPAN"){
        selectedElement = selectedElement.parentElement;
    }


    const answer = e.target.textContent[0];
    const question = quiz.getQuestion();

    if (question.checkAnswer(answer)){
        quiz.correctAnswers += 1;
       selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else{
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    }
    
    quiz.questionIndex += 1;

    ui.disableAllOption();
    ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function(){
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function(){
    quiz.questionIndex = 0;
    quiz.correctAnswers = 0;

    ui.btnStart.click();
    ui.scoreBox.classList.remove("active");

});

let counter;

function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0 ){
            clearInterval(counter);
            ui.timeText.textContent = "Time is up";

            ui.disableAllOption();
            quiz.soruIndex +=1;

            ui.btnNext.classList.add("show");
    }
    }

   
        
    
}

let counterLine;
function startTimerLine(){
    let line_width = 0;

    counterLine = setInterval(timer, 20);

    function timer(){
        line_width += 1;
        
        ui.timeLine.style.width = line_width + "px";

        if(line_width > 549){
            clearInterval(counterLine);
        } 
    }
        
    
}
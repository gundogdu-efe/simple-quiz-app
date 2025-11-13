function Question(questionText, answers, correctAnswer){
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    
}

Question.prototype.checkAnswer = function (answer) {
    return answer === this.correctAnswer;
};



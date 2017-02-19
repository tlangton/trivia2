function startUp(){
	// $("#questionFields").hide("fast");
};
startUp();

var gameRound = {
	answerCorrect: 0,
	answerIncorrect: 0,
	timeExp: 0
}

//  Variable that will hold our setInterval that runs the timer
var intervalId;
// var holds running state - prevents mulitple starts
var running = false;
var time = 30; //seconds to answer questions

var quizContent=[];
var answerChoice;
var questionNumber = 0;
var correctAnswer;
var vMessage;

var interactive = true;

$("#startButton").click(startButton);

function startButton(){
	$("#coverpic").fadeOut();
	$("#caption").fadeOut();
	$("#startButton").fadeOut();
	$("#message").html("");
	gameRound.answerCorrect = 0;
	gameRound.answerIncorrect = 0;
	gameRound.timeExp = 0;
	gameScore();
	setTimeout(unhideQuestions, 1000);
	resetAnswerColors()
	start();
};

function start() {
	interactive = true
	if(running == false){
		intervalId = setInterval(count,1000);
		running = true;
	}
};

function count() {
	time --;
	$("#display").html(time);
	if (time == 0) {
		clearInterval(intervalId);
		running = false;
		roundExpired();
	};
};

function gameScore(){
	$("#gameScore").text("Correct: " + gameRound.answerCorrect + " Incorrect: " + gameRound.answerIncorrect + " Time Expired: " + gameRound.timeExp);
}
gameScore()

function roundExpired() {
	$("#message").html("Time expired! Correct answer is " + correctAnswer);
	gameRound.timeExp++;
	gameScore()
	resetAnswerColors();
	setTimeout(clearRoundExpired, 2000);
}

function clearRoundExpired() {
	$("#message").html("");
	questionNumber++;
	//if questions are left?
	reset();
	start();
	popQuestion();
}


function reset() {
	clearInterval(intervalId);
	running = false;
	$("#display").html("30");
	time = 30;
};

function unhideQuestions() {
	$("#questionFields").removeClass("hidden");
	popQuestion()
};

function hideQuestions() {
	$("#questionFields").addClass("hidden");
	$("#startButton").fadeIn();
};


console.log("qc " + quizContent.length);

function popQuestion() {
	if (questionNumber <= quizContent.length) {
		$("#question").html(quizContent[questionNumber].question);
		$("#answer1").html(quizContent[questionNumber].choice1);
		$("#answer2").html(quizContent[questionNumber].choice2);
		$("#answer3").html(quizContent[questionNumber].choice3);
		$("#answer4").html(quizContent[questionNumber].choice4);
		correctAnswer = quizContent[questionNumber].correctChoice;
		$("#answerPic").html("<img class=\"center-block\" src=" + quizContent[questionNumber].image + ">");
	}
	else	{
		hideQuestions();
		$("#message").html("Game Over");
		clearInterval (intervalId);
	}
}

function clearQuestion() {
	$("#question").html("");
	$("#answer1").html("");
	$("#answer2").html("");
	$("#answer3").html("");
	$("#answer4").html("");
	$("#answerPic").html("");
}

$(".choice").click(function(){
	butID = $(this).attr('butId');
	answer();
});

function answer() {
	if (!interactive) { return }
		interactive = false

	if (butID == correctAnswer) {
		gameRound.answerCorrect ++;
		vMessage = "Congrats! ";
		gameScore();
		} else {
		gameRound.answerIncorrect ++;
		vMessage = "Wrongo!  Correct answer is " + correctAnswer;
		gameScore();
	}

	$("#message").html(vMessage);
	setAnswerColors();
	reset();

	questionNumber ++;
	if (questionNumber >= quizContent.length) {
		setTimeout(function() {
			$("#message").html("Game Over!");
			hideQuestions();
			$("#coverpic").show();
			questionNumber = 0;
		}, 2000)
		clearInterval(intervalId);
	}
	else{
		setTimeout(function(){
			popQuestion();
			$("#message").html("");
			resetAnswerColors();
			start(); },2000);
	}
}


function setAnswerColors() {
	$(".choice").removeClass("warning");
	$(".choice").addClass("danger");

	switch(correctAnswer){
		case 1:
		$("#answer1").removeClass("danger");
		$("#answer1").addClass("success");
		break;
		case 2:
		$("#answer2").removeClass("danger");
		$("#answer2").addClass("success");
		break;
		case 3:
		$("#answer3").removeClass("danger");
		$("#answer3").addClass("success");
		break;
		case 4:
		$("#answer4").removeClass("danger");
		$("#answer4").addClass("success");
		break;
	}
}


function resetAnswerColors() {
	$(".choice").removeClass("danger");
	$(".choice").addClass("warning");
}

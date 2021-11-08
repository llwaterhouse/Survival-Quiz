
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var timerElement = document.querySelector('.timer-count');
var startButton = document.querySelector('.start-button');
var questionP = document.getElementById('questionP');
var option0El = document.getElementById('option0');
var option1El = document.getElementById('option1');
var option2El = document.getElementById('option2');
var option3El = document.getElementById('option3');
var feedbackP = document.getElementById('feedbackP');
var questionAnswerBox = document.querySelector('#q-a-box');
var gameOverBox = document.querySelector('#game-over-box');
var submitInitBtnEl = document.querySelector('#submitInitBtn');
var initialsEl = document.querySelector('#initials');
var viewScoresBtnEl = document.querySelector(".view-scores-button");
var quizBtn = document.querySelector(".quiz-button");




var timerInt; // saved timer interval;
var timerCount; // how much time is left in seconds
var currentQuestionInd = 0;
var questionAnswerState = true; // if questionAnswerState then question-answer box is visible, else game-over box is visible
const SECONDS_PER_GAME = 15;



// function that switches to  Scores page and loads all saved scores
function showScores() {
	console.log("in Show scores");
	// build list of scores
	var savedScores = localStorage.getItem('Survival-Quiz-Scores');
	var savedScoresArray;
	// Read saved scores from local storage or create new array
	if (savedScores === null) {
		savedScoresArray = [];
	} else {
		savedScoresArray = JSON.parse(savedScores);
	}
	// Add <li>'s to show scores

	var li;
	var parentOl = document.querySelector(".scores-list");
console.log("savedScoresArraylen " + savedScoresArray.length);
	for (var i=0; i< savedScoresArray.length; i++) {
		console.log("savedScore: " + savedScoresArray[i].userInitials + " " + savedScoresArray[i].userScore);


		li = document.createElement('li');
		parentOl.appendChild(li);

		li.innerHTML = " " + savedScoresArray[i].userInitials + ": " + savedScoresArray[i].userScore;

	}

	// Display score page

}

// saves initials and score of user in local storage and then
// brings user to page that displays all of them.
function saveScore(event) {
	event.preventDefault();
	if (initialsEl.value === '') {
		alert('Initials cannot be blank'); 
		return;
	}

	var savedScores = localStorage.getItem('Survival-Quiz-Scores');
	var savedScoresArray;
	// Read saved scores from local storage or create new array
	if (savedScores === null) {
		savedScoresArray = [];
	} else {
		savedScoresArray = JSON.parse(savedScores);
	}
	// push this score onto savedScoresArray and then save it in local storage

	var userStorage = {
		userInitials: initialsEl.value,
		userScore: timerCount,
	}

	console.log ("saved Scores: " + savedScoresArray);

	console.log ("newUser info: " + userStorage);

	savedScoresArray.push(userStorage);

	// Must turn array into string in order to add to local storage
	var savedScoresString = JSON.stringify(savedScoresArray);
	localStorage.setItem("Survival-Quiz-Scores", savedScoresString);
	// Bring user to Scores Page
	showScores();
}

// The init function is called when the page loads
function init() {
	showScores();
}

// Calls init() so that it fires when page opened
init();



// viewScoresBtnEl.addEventListener('click', showScores);

function toQuizPage (){
	console.log("in toQuizPage");
	window.location.replace("index.html");
}

quizBtn.addEventListener('click', toQuizPage);
console.log("added toQuiz event listener");
function clearScores() {
console.log("in clear scores")
// remove local storage

//display page again
}

//clearBtn.addEventListener("click", clearScores);


// Bonus: Add reset button
// var resetButton = document.querySelector('.reset-button');

// function resetGame() {
// 	// Resets win and loss counts
// 	winCounter = 0;
// 	loseCounter = 0;
// 	// Renders win and loss counts and sets them into client storage
// 	setWins();
// 	setLosses();
// }
// Attaches event listener to button
// resetButton.addEventListener('click', resetGame);

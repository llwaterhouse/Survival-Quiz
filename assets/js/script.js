var wordBlank = document.querySelector('.word-blanks');
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
var chosenWord = '';
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;
var currentQuestion = 0;
var questionAnswerState = true; // if questionAnswerState then question-answer box is visible, else game-over box is visible

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
// var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

//questions the user will be asked with answers
var questions = [
	{
		question: 'How many days can a person survive without water?',
		options: [ '1 day', '3 days', '7 days', '12 days' ],
		answer: 1
	},
	{
		question: "If you're lost and you come to a creek or river, which way should you go to get out?",
		options: [ 'Across it', 'Upstream', 'Away from it', 'Downstream' ],
		answer: 3
	}
];

// The init function is called when the page loads
function init() {
	getWins();
	getlosses();
	var timerText = document.querySelector(".timer");
	timerText.style.color = "grey";

}

function showQuestion() {
	var curQuestion = questions[currentQuestion];
	questionP.textContent = curQuestion.question;

	for (let i = 0; i < curQuestion.options.length; i++) {
		// set text for each option
		curOption = document.getElementById('option' + i);
		curOption.innerText = curQuestion.options[i];
	}

	//Don't display feedback
	feedbackP.innerHTML = '';
}
// if state = true, make GameOver box visible, else make QuestionAnswer Box visible
function turnGameOverBoxOn(state) {
	questionAnswerBox.style.visibility = "visible";
	if (state) {
		questionAnswerBox.setAttribute("class", "hide");
		gameOverBox.removeAttribute("class");

	} else {
		questionAnswerBox.removeAttribute("class")
		gameOverBox.setAttribute("class", "hide");
	}
}

// The startGame function is called when the start button is clicked
function startGame() {
	isWin = false;
	var timerCountEl = document.querySelector(".timer-count");
	timerCount = parseInt(timerCountEl.innerHTML);

	// Prevents start button from being clicked when round is in progress
	startButton.disabled = true;
	startButton.style.color = 'grey'; //ToDo change color back to black when game ends.
	// Have question div show up and game-over container gone */
	turnGameOverBoxOn(false);
	startTimer();
	showQuestion();
	currentQuestion = 0;
}

// The winGame function is called when the win condition is met
function winGame() {
	wordBlank.textContent = 'YOU WON!!!🏆 ';
	winCounter++;
	startButton.disabled = false;
	setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
	turnGameOverBoxOn(true);
	loseCounter++;
	// re-enable Start button
	startButton.disabled = false;
	startButton.style.color = '#13293d';
	setLosses();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
	// make text look enabled
	var timerText = document.querySelector(".timer");
	timerText.style.color = "white";
	// Sets timer
	timer = setInterval(function() {
		timerCount--;
		timerElement.textContent = timerCount;
		if (timerCount >= 0) {
			// Tests if win condition is met
			if (isWin && timerCount > 0) {
				// Clears interval and stops timer
				clearInterval(timer);
				winGame();
			}
		}
		// Tests if time has run out
		if (timerCount === 0) {
			// Clears interval
			clearInterval(timer);
			loseGame();
		}
	}, 1000);
}



// Updates win count on screen and sets win count to client storage
function setWins() {
	win.textContent = winCounter;
	localStorage.setItem('winCount', winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
	lose.textContent = loseCounter;
	localStorage.setItem('loseCount', loseCounter);
}

// These functions are used by init
function getWins() {
	// Get stored value from client storage, if it exists
	var storedWins = localStorage.getItem('winCount');
	// If stored value doesn't exist, set counter to 0
	if (storedWins === null) {
		winCounter = 0;
	} else {
		// If a value is retrieved from client storage set the winCounter to that value
		winCounter = storedWins;
	}
	//Render win count to page
	win.textContent = winCounter;
}

function getlosses() {
	var storedLosses = localStorage.getItem('loseCount');
	if (storedLosses === null) {
		loseCounter = 0;
	} else {
		loseCounter = storedLosses;
	}
	lose.textContent = loseCounter;
}

function checkWin() {
	// If the word equals the blankLetters array when converted to string, set isWin to true
	if (chosenWord === blanksLetters.join('')) {
		// This value is used in the timer function to test if win condition is met
		isWin = true;
	}
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame);

function checkAnswer(num) {
	console.log('Chose answer: ' + num);
}
function choose0() {
	console.log('Chose 0');
	checkAnswer(0);
}
function choose1() {
	console.log('Chose 1');
	checkAnswer(1);
}
function choose2() {
	console.log('Chose 2');
	checkAnswer(2);
}
function choose3() {
	console.log('Chose 3');
	checkAnswer(3);
}

// Attach event listener to each option to assess whether it's the right answer or not
option0El.addEventListener('click', choose0);
option1El.addEventListener('click', choose1);
option2El.addEventListener('click', choose2);
option3El.addEventListener('click', choose3);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector('.reset-button');

function resetGame() {
	// Resets win and loss counts
	winCounter = 0;
	loseCounter = 0;
	// Renders win and loss counts and sets them into client storage
	setWins();
	setLosses();
}
// Attaches event listener to button
resetButton.addEventListener('click', resetGame);

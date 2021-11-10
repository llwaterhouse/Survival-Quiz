
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var timerElement = document.querySelector('.timer-count');
var startButton = document.querySelector('.start-button');
var questionP = document.getElementById('question-p');
var option0El = document.getElementById('option0');
var option1El = document.getElementById('option1');
var option2El = document.getElementById('option2');
var option3El = document.getElementById('option3');
var feedbackP = document.getElementById('feedbackP');
var questionAnswerBox = document.querySelector('#q-a-box');
var gameOverBox = document.querySelector('#game-over-box');
var submitInitBtnEl = document.querySelector('#save-button');
var initialsEl = document.querySelector('#initials');
var viewScoresBtnEl = document.querySelector(".view-scores-button");



var timerInt; // saved timer interval;
var timerCount; // how much time is left in seconds
var currentQuestionInd = 0;
var questionAnswerState = true; // if questionAnswerState then question-answer box is visible, else game-over box is visible
const SECONDS_PER_GAME = 65;



//questions the user will be asked with answers.  Indices of answers start with 0
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
	},
	{
		question: "Before leaving for a day hike or a camping trip, what is the most important thing you can do to ensure your safety?",
		options: [ "Take your cell phone with you", "Tell someone where you're going and when you're returning", "Take your dog with you", "Take a whistle with you" ],
		answer: 1
	},
	{
		question: "In a survival scenario, you should avoid eating insects that ____",
		options: [ "Have more than 6 legs", "Are brightly colored or pungent", "Have a hard shell", "Have stingers" ],
		answer: 1
	},
	{
		question: "Which symptom determines if you are SEVERELY dehydrated?",
		options: [ "Dizziness", "Rapid heart beat","Vomiting and diarrhea",  "Dry mouth" ],
		answer: 2
	},
	{
		question: "Why should you try to avoid sleeping directly on the ground?",
		options: [ "To keep from losing body heat", "To avoid bugs","To eliminate the risk of contracting disease",  "To avoid getting your clothes wet" ],
		answer: 0
	},
	{
		question: "Which of the following can kill you most quickly?",
		options: [ "Dehydration", "Sun Exposure","Frostbite",  "Hypothermia" ],
		answer: 3
	},
	{
		question: "Insect larvae contains a lot of protein. Where are the best places to find insect eggs?",
		options: [ "Moist areas under rocks and logs", "Animal Droppings","Attached to the insect",  "Dry river beds" ],
		answer: 0
	},
	{
		question: "If you are lost in the wilderness, what is the first rule of thumb?",
		options: [ "Keep moving", "Make a weapon","Look for something to eat",  "Stay put" ],
		answer: 3
	},
	{
		question: "What is the best material for building a signal fire?",
		options: [ "The driest wood you can find so it will burn well", "Dried animal dung","Green pine branches",  "Pine cones" ],
		answer: 0
	},
];

// The init function is called when the page loads
function init() {
	//  getWins();
	//  getlosses();
	var timerText = document.querySelector('.timer');
	timerText.style.color = 'grey';
	questionAnswerBox.style.visibility = 'visible';
	timerElement.textContent = SECONDS_PER_GAME.toString();

}

function showQuestion() {
	var curQuestionEl = questions[currentQuestionInd];
	questionP.textContent = curQuestionEl.question;

	for (let i = 0; i < curQuestionEl.options.length; i++) {
		// set text for each option
		curOption = document.getElementById('option' + i);
		curOption.innerText = curQuestionEl.options[i];
	}

}
// if state = true, make GameOver box visible, else make QuestionAnswer Box visible
function turnGameOverBoxOn(state) {
	questionAnswerBox.style.visibility = 'visible';
	if (state) {
		questionAnswerBox.setAttribute('class', 'hide');
		gameOverBox.removeAttribute('class');
	} else {
		questionAnswerBox.removeAttribute('class');
		gameOverBox.setAttribute('class', 'hide');
	}
}

// The startGame function is called when the start button is clicked
function startGame() {

	isWin = false;
	var timerCountEl = document.querySelector('.timer-count');
	timerCount = SECONDS_PER_GAME;

	// Prevents start button from being clicked when round is in progress
	startButton.disabled = true;
	startButton.style.color = 'grey'; //ToDo change color back to black when game ends.
	// Have question div show up and game-over container hide */
	turnGameOverBoxOn(false);
	startTimer();
	currentQuestionInd = 0;
	// Erase any former feedback
	feedbackP.textContent= "";
	showQuestion();
}

// The winGame function is called when the win condition is met
function winGame() {

	winCounter++;
	startButton.disabled = false;
	setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
	// update Score Text
	var yourScoreEl = document.getElementById('your-score');
	yourScoreEl.innerHTML = 'Your Final Score Is ' + timerCount + '.';

	turnGameOverBoxOn(true);
	// re-enable Start button
	startButton.disabled = false;
	startButton.style.color = '#13293d';

}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
	// make text look enabled
	var timerText = document.querySelector('.timer');
	timerText.style.color = 'white';
	// Sets timer
	timerInt = setInterval(function() {
		timerCount--;

		timerElement.textContent = timerCount;

		// Tests if time has run out
		if (timerCount === 0) {
			// Clears interval
			clearInterval(timerInt);
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


// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame);

function checkAnswer(num) {
	// See if the option user selected is the correct option
	var curQuestionEl = questions[currentQuestionInd];
	if (num == curQuestionEl.answer) {
		// TODO try a parseInt to be correct
		//They chose the correct answer!  Give them feedback and load the next question.

		feedbackP.innerHTML = 'Correct!!!';
	} else {
		//They chose wrong answer.  Let them know and subtract 10 seconds from the timer.
		feedbackP.innerHTML = 'Wrong!  Ten seconds will be subtracted from the timer';
		timerCount -= 3; // TODO change to 10!;
		timerElement.textContent = timerCount;
	
	}
	//TODO set timer to clear feedback and next question
	// see if there are any more questions to ask

	// TODO: Don't see last feedback!
	currentQuestionInd++;
	if (currentQuestionInd < questions.length) {
		showQuestion();
	} else {
		//there are no more questions, game is over
		clearInterval(timerInt);
		loseGame();
	}
}

function choose0() {
	checkAnswer(0);
}
function choose1() {
	checkAnswer(1);
}
function choose2() {
	checkAnswer(2);
}
function choose3() {
	checkAnswer(3);
}


// Attach event listener to each option to assess whether it's the right answer or not
option0El.addEventListener('click', choose0);
option1El.addEventListener('click', choose1);
option2El.addEventListener('click', choose2);
option3El.addEventListener('click', choose3);


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
	window.location.replace("scores.html");
}

// Attach event listener to save initials and score once game is over

submitInitBtnEl.addEventListener('click', saveScore);

// Calls init() so that it fires when page opened
init();



viewScoresBtnEl.addEventListener("click", function() {
	console.log ("going to scores page");
	window.location.replace('scores.html');
} )


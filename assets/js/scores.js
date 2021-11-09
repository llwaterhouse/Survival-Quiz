
var quizBtns = document.querySelectorAll(".quiz-button");
var clearBtn = document.querySelector(".clear-button");


// function that loads all saved scores
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


for (var i=0; i< quizBtns.length; i++) {
	quizBtns[i].addEventListener('click', toQuizPage);
}



function clearScores() {
console.log("in clear scores")
// remove local storage
localStorage.clear();
//remove any <li>'s
var parentOl = document.querySelector(".scores-list");
parentOl.innerHTML = "";
//display page again

showScores();
}

clearBtn.addEventListener("click", clearScores);


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

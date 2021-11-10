
var quizBtn = document.querySelector(".quiz-button");
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





function toQuizPage (){
	console.log("in toQuizPage");
	window.location.replace("index.html");
}

quizBtn.addEventListener('click', toQuizPage);



// Clears the stored scores and refreshes the page
function clearScores() {

// remove local storage
localStorage.clear();
//remove any <li>'s
var parentOl = document.querySelector(".scores-list");
parentOl.innerHTML = "";
//display page again

showScores();
}

clearBtn.addEventListener("click", clearScores);

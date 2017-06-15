/////////////////////////////////////////////////
// Get elements
/////////////////////////////////////////////////

var solveWord = document.getElementById("solveMe");
var showGuessed = document.getElementById("guessed");
var remLives = document.getElementById("remLives");

/////////////////////////////////////////////////
// Variables
/////////////////////////////////////////////////

var wordList = ["aardvark", "tom", "jack", "richard"];
var word = wordList	[Math.floor(Math.random() * wordList.length)];
var guessedLetters = [];
var uniqueLetter = false;
var validInput = false;
var correctGuesses = 0;
var incorrectGuesses = 0;
var chances = 8;
var heartbeat = chances - incorrectGuesses;
var lifeline = false;
var answerMask = [];
	for(i=0; i < word.length; i++){
		answerMask[i] = "_";
	};
var remainingLetters = word.length;
solveWord.innerHTML = answerMask.join(" ");
showGuessed.innerHTML = guessedLetters;
remLives.innerHTML = chances;

/////////////////////////////////////////////////
// Fuctions
/////////////////////////////////////////////////

// Start a new game
function newGame(){
	word = wordList [Math.floor(Math.random() * wordList.length)];
	guessedLetters.length = 0;
	uniqueLetter = false;
	validInput = false;
	correctGuesses = 0;
	incorrectGuesses = 0;
	chances = 8;
	answerMask = [];
	for(i=0; i < word.length; i++){
		answerMask[i] = "_";
	};
	remainingLetters = word.length;
	solveWord = document.getElementById("solveMe");
	solveWord.innerHTML = answerMask.join(" ");
	updateScreen();
}

function lifeline(){

}

// Creates a shorter function log() to replace console.log()
function log(str){
	console.log(str);
}

// Checks if the input is a valid character
function validateInput(input){
	var charCode = input.charCodeAt(0);
	log(charCode);
	if(charCode <= 122 && charCode >= 97){
		log(input + " is a valid guess.");
		validInput = true;
	}else{
		validInput = false;
		log(input + " is not a valid guess.");
	}
}

//Check if user hit a key that has already been tried
function uniqueInput(input){
	var temp = 0;
	for(m=0; m < guessedLetters.length; m++) {
		if (guessedLetters[m] === input){
			temp++;
			// log("Temp count: " + temp);
		}
	}
	if (temp === 0){
		uniqueLetter = true;
		// alert("First Time");
		return uniqueLetter;
		guessedLetters.push(input);
	}
	else if(temp !== 0){
		uniqueLetter = false;
		// alert("Please Pick a new letter that you have not used before.");
		return uniqueLetter;
	}
}

// Check if user input is in the answer word
function checkLetter(input){
	// Check if word has been used before
	var counter = 0; // counts how many times the letter appears in the word
	for(l=0; l< word.length; l++){
		var currentGuess = input;
		var currentCheck = word.charAt(l);
		if(currentGuess === currentCheck){
			correctGuesses++;
			counter++;
		}
	}

	if(counter === 0){
			incorrectGuesses++;
		}

	for(k=0; k < word.length; k++){
		var currentGuess = input;
		var currentCheck = word.charAt(k);
		if(input === word.charAt(k)){
			answerMask[k] = input;
			// correctGuesses++;
		}
	}
	heartbeat = chances - incorrectGuesses;
	// log("incorrectGuesses " + incorrectGuesses);
	// log("correctGuesses" + correctGuesses);

	guessedLetters.push(input);
}

function progress(){
	updateScreen();
	if(correctGuesses < word.length && incorrectGuesses <= heartbeat){
		log("Game is still going");
	}
	else if(correctGuesses === word.length){
		winner();	
	}
	else if(incorrectGuesses >= chances){
		loser();
	}
}

function winner(){
	// alert("Congradulations. You Win!");
	var ng = confirm("Congradulations. You Win! Press OK to play again.");
	if (ng === true) {
		newGame();
	}
}

function loser(){
	// alert("Better luck next time.");
	var ng = confirm("Better luck next time. Press OK to play again.");
		if (ng === true) {
		newGame();
	}
}

function updateScreen(){
	solveWord.innerHTML = answerMask.join(" ");
	guessedLetters.sort();
	showGuessed.innerHTML = guessedLetters;
	remLives.innerHTML = heartbeat;
}


/////////////////////////////////////////////////
// Events
/////////////////////////////////////////////////

// Game loop

// If key pressed
document.onkeyup = function(event) {
    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    log("Player hit " + letter);
    validateInput(letter);
    log("Was input valid: " + validInput);
    	if (validInput === true) {
    		uniqueInput(letter);
    		log("Was input unique: " + uniqueLetter);
    			if (uniqueLetter === true) {
    				checkLetter(letter);
    				progress();
    			}
    			else{
    				// alert("Please choose a letter that you have not used before.")
    			}
    	}
    	else{
    		// alert("Please choose a valid leter. (A to Z)")
    	}
}

// If button pressed
function selectLetter(event){
	var letter = String(event).toLowerCase();
    log("Player hit " + letter);
    uniqueInput(letter);
    log("Was input unique: " + uniqueLetter);
		if (uniqueLetter === true) {
			checkLetter(letter);
			progress();
		}
		else{
			alert("Please choose a letter that you have not used before.");
			log("not unique")
		}
    // 	}
    // 	else{
    // 		// alert("Please choose a valid leter. (A to Z)")
    // 	}
    // solveWord.textContent = answerMask;
    // solveWord.innerHTML = answerMask.join(" ");
}
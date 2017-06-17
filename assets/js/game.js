/////////////////////////////////////////////////
// Get/ Set elements
/////////////////////////////////////////////////

var solveWord = document.getElementById("solveMe");
var showGuessed = document.getElementById("guessed");
var remLives = document.getElementById("remLives");
var video = document.getElementById("video");



/////////////////////////////////////////////////
// Variables
/////////////////////////////////////////////////

var wordList = ["abruptly", "affix", "askew", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "bikini", "blitz", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "cobweb", "croquet", "daiquiri", "disavow", "duplex", "dwarves", "equip", "exodus", "fishhook", "fixable", "foxglove", "galaxy", "galvanize", "gazebo", "gizmo", "glowworm", "guffaw", "haiku", "haphazard", "hyphen", "icebox", "injury", "ivory", "ivy", "jaundice", "jawbreaker", "jaywalk", "jazzy", "jigsaw", "jiujitsu", "jockey", "jovial", "joyful", "juicy", "jumbo", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kiwifruit", "knapsack", "larynx", "luxury", "marquis", "megahertz", "microwave", "mystify", "nightclub", "nowadays", "numbskull", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "pixel", "pizazz", "pneumonia", "polka", "quartz", "quiz", "quorum", "razzmatazz", "rhubarb", "rickshaw", "schizophrenia", "sphinx", "spritz", "squawk", "subway", "swivel", "topaz", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "vortex", "walkway", "waltz", "wavy", "waxy", "wheezy", "whiskey", "whomever", "wimpy", "wizard", "woozy", "xylophone", "yachtsman", "yippee", "youthful", "zephyr", "zigzag", "zilch", "zodiac", "zombie"];
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
var vidTimeout = 2000
solveWord.innerHTML = answerMask.join(" ");
showGuessed.innerHTML = guessedLetters;
remLives.innerHTML = chances;

/////////////////////////////////////////////////
// Fuctions
/////////////////////////////////////////////////

// Creates a shorter function log() to replace console.log()
function log(str){
	console.log(str);
}

// Starts a new game
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
	video.currentTime = 0;
	updateScreen();
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
			playVideo();
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
			setTimeout(function() {loser()}, 3000);
	}
}

function winner(){
	// alert("Congratulations. You Win!");
	var ng = confirm("Congratulations. You Win! You figured out " + word + ". Press OK to play again.");
	if (ng === true) {
		newGame();
		updateScreen();
	}
}
// Will tell the user that the game is over, show them the word, and that they have lost and ask them if they want to play agian
function loser(){
	// alert("Better luck next time.");
	var ng = confirm("The word was " + word + ". Better luck next time. Press OK to play again.");
		if (ng === true) {
		newGame();
		updateScreen();
	}
}

// Uptdates all Get Elements to show the new information on the DOM
function updateScreen(){
	solveWord.innerHTML = answerMask.join(" ");
	guessedLetters.sort();
	showGuessed.innerHTML = guessedLetters;
	remLives.innerHTML = heartbeat;
}

// Brings up a window and if user answers correctly they will get a life, else then will lose a life
function lifeLine(){
	log("Asked for a life line.")
	var brownNoser = confirm("If you give me an A+, I will give you an extra life");
		if(brownNoser === true){
			heartbeat++;
		}
		else{
			alert("Too bad. You should have set yes. Just for that I am taking a life.");
			heartbeat--;
		}
	updateScreen();
}

function playVideo(){

	video.play();
	log("before");
	setTimeout(function() {video.pause()}, 3100);
	log("after");
}

// function playVideo(){
// 	vid.pause();
// }


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
					progress();F
				}
				else{
					alert("Please choose a letter that you have not used before.")
				}
				}
				else{
					alert("Please choose a valid leter. (A to Z)")
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
			}
		}
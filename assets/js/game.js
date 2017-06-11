//Array of words to choose from
var wordList = ["aardvark", "tom", "jack", "richard"];
//Choose random word from wordList to to use for the game
var word = wordList	[Math.floor(Math.random() * wordList.length)];
var answerArray = [];
for(i=0; i < word.length; i++){
	answerArray[i] = "_";
};
var remainingLetters = word.length;

var chances = 8;
var myLives = document.getElementById("myLives");
myLives.innerHTML = chances;

var solveWord = document.getElementById("solveMe");
solveWord.innerHTML = answerArray.join(" ");

var game = document.getElementById("game");
game.innerHTML = answerArray;



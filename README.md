**********Hangman by Corey Stagner**********

A fun game of Hangman

Pseudo Code

Variables to define
	lives
	alphabet
	guessed letters
	words

Functions to create
	check if key has been hit 
	check if letter exists in word

When you click btn Start New Game
	guessedLetters array needs to be emptied
	Computer needs to pick a word from the array
	Browser needs to display the amount of characters in the word
	Give user 8 lives

When user guesses a letter
	if lives > 0
		makes sure that the key is between a and z or A to Z
		convert the letter to lower case.
		Checks to see if letter has been used yet.
		Letter is added to guessedLetters Array
		Word is checked if letter exists within
			if exists
				Letter is uncovered in word in each spot that letter exists
			else
				User losses one life
	else
		alert Game Over
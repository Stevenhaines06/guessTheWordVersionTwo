const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInputForLetters = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessedMessages = document.querySelector(".message");
const hiddenPlayAgain = document.querySelector(".play-again hide")
const word = "Magnolia";




// Display our symbols as placeholders for the chosen word's letters
const placeholder = function(word) { 
const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
     placeholderLetters.push("●");   
    }
wordInProgress.innerText = placeholderLetters.join("");
}

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = textInputForLetters.value;
    console.log(guess);
    textInputForLetters.value = "";
});
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInputForLetters = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessedMessages = document.querySelector(".message");
const hiddenPlayAgain = document.querySelector(".play-again hide")
const word = "Magnolia";
const guessedLetters = [];





// Display our symbols as placeholders for the chosen word's letters
const placeholder = function(word) { 
const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
     placeholderLetters.push("●");   
    }
wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
   //Empty Message Paragraph
    textInputForLetters.value = "";
      // Let's grab what was entered in the input
    const guess = textInputForLetters.value; 
      // Let's make sure that it is a single letter
   const goodGuess= validateInput(guess);
    console.log(guess);

    if (goodGuess) {
        //We've got a letter! Let's guess
        makeGuess(guess);
    }
    textInputForLetters.value = "";
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === 0) {
        //is the input empty?
        guessedMessages.innerText = "Please enter a letter";

    } else if (input.length > 1) {
        //did you enter more than one letter?
        guessedMessages.innerText = "did you enter more than one letter?"
    } else if (!input.match(acceptedLetter)) {
        // Did you type a number, a special character or some other non letter thing?
        guessedMessages.innerText = "Please enter a letter from A to Z.";
      } else {
        // We finally got a single letter, omg yay
        return input;
      }
    };

    const makeGuess = function (guess) {
        guess = guess.toUpperCase();
       if (guessedLetters.includes(guess)) {
        guessedMessages.innerText = "You've already guessed that m8";
       } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
       }   
    };
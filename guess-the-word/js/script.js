const guessedLettersBox = document.querySelector(".guessed-letters");
const button = document.querySelector("button");
const guessInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesParagraphSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainHide = document.querySelector(".play-again");

//Default starting word
const word = "magnolia";
const guessedLetters = [];

//Word placeholder
const placeholder = function(word) {
    const placeholderLetters = [];
    for(const letter of word) {
       // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

//Event listener for the button

button.addEventListener("click", function(e) {
    e.preventDefault();
    //grabbing the input value(remember 'value')
   const guess = guessInput.value;
   console.log(guess);
   //to empty the input
  guessInput.value = "";
  //to empty the message paragraph
  message.innerText = "";
  //to validate whether the guess meets conditions or not
  const validation = validateGuess(guess);
  console.log(validation);
})


const validateGuess = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "That's empty";
    } else if (input.length > 1) {
       message.innerText = "Those are too many characters";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's not a character";
    } else {
        return input;
    }
}

const makeGuess = function(guess) {
   //to change letters to uppercase
    guess.toUpperCase();
    //to add to the guessed letters array
    if (guessedLetters.contains(guess)) {
        message.innerText = "We already have that letters"
    } else {
        guessedLetters.push(guess);
    }
   
}

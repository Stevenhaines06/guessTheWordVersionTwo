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
   const guess = guessInput.value;
   console.log(guess);
  guessInput.value = "";
  message.innerText = "";
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
    guess.toUpperCase();
    if (guessedLetters.contains(guess)) {
        message.innerText = "We already have that letters"
    } else {
        guessedLetters.push(guess);
    }
   
}

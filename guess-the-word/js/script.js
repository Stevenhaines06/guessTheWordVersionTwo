const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


const word = "magnolia";
const guessedLetters = [];

//Step 2 Display our symbols as placeholders for the secret word
const placeholder = function(word) {
    //Step 2 array for the placeholder letters
    const placeholderLetters = [];
    //Step 2 to iterate through each letter in the word
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    //Step 2 appending the dots to the word in progress
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault();
    //step 2 capturing the value of the input for each guess
    const guess = letterInput.value;
    message.innerText = "";
   const goodGuess = checkInput(guess);
   //Step 3Correct character so it makes the guess --remember this to make it flow--
   if (goodGuess) {
    makeGuess(guess);
   }
   letterInput.value = "";
})


const checkInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText =`It's blank`;
    } else if (input.length > 1) {
        message.innerText = `too many characters`; 
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `That's not an acceptable character`;
    } else {
        return input;
    }
}

const makeGuess = function(guess) {
   guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You've guessed that one`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li")
        li.innerText = letter;
        guessedLettersElement.append(li);
    }

};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
  };
  
const checkIfWin = function() {
    if (wordInProgress === word) {
        guessedLettersElement.classList.add(".win");
    }
}
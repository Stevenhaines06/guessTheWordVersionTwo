const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


let word = "cake";
let guessedLetters = [];
let guessesRemaining = 8;

const getWord = async function() {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}


getWord();



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
        updateGuessesRemaining(guess);
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




const updateGuessesRemaining = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Well done, ${guess} !!! that's in the word!!`
    } else if (!wordUpper.includes(guess)) {
        guessesRemaining -= 1;
        message.innerText = `So close, but ${guess} isn't in there!`
    };

    if (guessesRemaining === 0) {
        message.innerHTML= `Game over! The word was <span class="highlight">${word}</span>.`;
        remainingGuessesSpan.innerText = "";
        remainingGuessesElement.innerText = "";
        startOver();
    } else if (guessesRemaining === 1) {
        remainingGuessesSpan.innerText = `${guessesRemaining} guess`;
    } else {
        remainingGuessesSpan.innerHTML = `${guessesRemaining} guesses`;
    }
}
  
const checkIfWin = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
}

const startOver = function() {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLettersElement.innerText = "";
    guessesRemaining = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${guessesRemaining} remaining`;
    message.innerText = "";
    getWord();

    //Show the right UI elements.
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});

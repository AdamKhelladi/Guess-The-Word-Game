// Guess The Word Game

let gameName = "Guess The Word";
let msg = document.querySelector(".msg");
let hintsBtn = document.querySelector(".hints");
let hintsSpan = document.querySelector(".hints span");

addGameName();
window.onload = function () {
  generateInput();
};

let numberOfTries = 5;
let currentIndex = 1;
let numberofHints = 2;

let wordToGuess = "";
// Game Words
const words = [
  "Web",
  "Algorithm",
  "Database",
  "API",
  "Responsive",
  "Frontend",
  "Backend",
  "Framework",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let numberOfLetters = wordToGuess.length;

let guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", () => {
  console.log(wordToGuess);
  let successGuess = true;
  
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentIndex}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else if (!wordToGuess.includes(letter) && letter != "") {
      inputField.classList.add("no");
      successGuess = false;
    } else {
      successGuess = false;
    }
  }

  if (successGuess) {
    winMsg();
    playAgian();

    let allTries = document.querySelectorAll(".inputs .style-tryDiv");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));

    disabledGuessBtn();
    disabledHintsBtn();
  } else {
    manageDisable();
  }
});

hintsSpan.innerHTML = numberofHints;
hintsBtn.addEventListener("click", () => {
  if (numberofHints > 0) {
    numberofHints--;
    hintsSpan.innerHTML = numberofHints;
  }

  if (numberofHints === 0) {
    disabledHintsBtn();
  }

  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randomInput =
      emptyEnabledInputs[Math.floor(Math.random() * emptyEnabledInputs.length)];

    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
});

document.addEventListener("keydown", handleBackspace);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.classList.add("style-tryDiv");
    tryDiv.innerHTML = `<span>Try${i}</span>`;

    i != 1 ? tryDiv.classList.add("disabled-input") : tryDiv;

    let inputsDiv = document.createElement("div");

    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");

      inputsDiv.appendChild(input);
    }

    tryDiv.appendChild(inputsDiv);
    inputsContainer.appendChild(tryDiv);
  }

  inputsContainer.children[0].children[1].children[0].focus();

  disabledInputs();
  toUpperCaseAndFocusNext();
}

function addGameName() {
  document.title = gameName;
  document.querySelector(".title").innerHTML = gameName;
  document.querySelector(
    "footer"
  ).innerHTML = `${gameName} Game Created By <span>Adam Tech</span>`;
}

function disabledInputs() {
  const inputsInDisableDiv = document.querySelectorAll(".disabled-input input");
  inputsInDisableDiv.forEach((input) => {
    input.disabled = true;
  });
}

function toUpperCaseAndFocusNext() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();
      if (inputs[index + 1]) inputs[index + 1].focus();
    });

    input.addEventListener("keydown", (event) => {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        if (currentIndex + 1 < inputs.length) inputs[currentIndex + 1].focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (currentIndex > 0) inputs[currentIndex - 1].focus();
      }
    });
  });
}

function manageDisable() {
  document
    .querySelector(`.try-${currentIndex}`)
    .classList.add("disabled-input");

  let currentTryInputs = document.querySelectorAll(
    `.try-${currentIndex} > div input`
  );
  currentTryInputs.forEach((input) => {
    input.disabled = true;
  });

  let divTries = document.querySelectorAll(".style-tryDiv");
  if (currentIndex < divTries.length) {
    currentIndex++;

    let nextTryInputs = document.querySelectorAll(
      `.try-${currentIndex} > div input`
    );
    nextTryInputs.forEach((input, index) => {
      input.disabled = false;
      index === 0 ? input.focus() : input;
    });

    document
      .querySelector(`.try-${currentIndex}`)
      .classList.remove("disabled-input");
  } else {
    disabledGuessBtn();
    disabledHintsBtn();

    loseMsg();
    playAgian();
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentInputIndex = Array.from(inputs).indexOf(
      document.activeElement
    );

    if (currentInputIndex > 0) {
      let currentInput = inputs[currentInputIndex];
      let prevInput = inputs[currentInputIndex - 1];

      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

function disabledGuessBtn() {
  guessBtn.disabled = true;
  guessBtn.addEventListener("mouseout", function () {
    guessBtn.style.backgroundColor = "var(--main-color)";
    guessBtn.style.boxShadow = "0 0 0 white";
    guessBtn.style.opacity = "0.5";
  });
}

function disabledHintsBtn() {
  hintsBtn.disabled = true;
  hintsBtn.style.backgroundColor = "#444";
  hintsBtn.style.boxShadow = "0 0 0 white";
  hintsBtn.style.opacity = "0.5";
}

function winMsg() {
  document.querySelector("#success").play();
  msg.style.display = "block";
  msg.innerHTML = "Congratulations, You're doing great!";
}

function loseMsg() {
  document.querySelector("#fail").play();
  msg.style.display = "block";
  msg.innerHTML = `Game Over. The Word Is <span>[ ${wordToGuess} ]</span>`;
  msg.style.color = "red";
}

function playAgian() {
  let playAgainBtn = document.createElement("div");
  playAgainBtn.className = "again";
  playAgainBtn.innerHTML = "Play Again";

  msg.appendChild(playAgainBtn);

  playAgainBtn.addEventListener("click", () => {
    location.reload();
  });
}

























































// End Guess Word Game



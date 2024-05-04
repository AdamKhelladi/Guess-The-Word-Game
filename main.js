// Guess The Word Game

let gameName = "Guess The Word";
let msg = document.querySelector(".msg");

addGameName();
window.onload = function () {
  generateInput();
};

let numberOfTries = 5;
let numberOfLetters = 6;
let currentIndex = 1;

let wordToGuess = "";
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
numberOfLetters = wordToGuess.length;

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

const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", () => {
  console.log(wordToGuess);
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(`#guess-${currentIndex}-letter-${i}`);
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
    msg.style.display = "block";
    msg.innerHTML = "Congratulations, You're doing great!";

    playAgian();

    let allTries = document.querySelectorAll(".inputs .style-tryDiv");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));

    guessBtn.disabled = true;
  } else {
    console.log("You Lose.");
  }
});


function playAgian() {
  let playAgainBtn = document.createElement("div");
  playAgainBtn.className = "again";
  playAgainBtn.innerHTML = "Play Again";

  msg.appendChild(playAgainBtn);

  playAgainBtn.addEventListener("click", () => {
    location.reload();
  })
}

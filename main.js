// Guess The Word Game

let gameName = "Guess The Word";

addGameName();

let numberOfTries = 5;
let numberOfLetters = 6;
let currentTries = 1;

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.classList.add("style-div");
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
}

function addGameName() {
  document.title = gameName;
  document.querySelector(".title").innerHTML = gameName;
  document.querySelector(
    "footer"
  ).innerHTML = `${gameName} Game Created By <span>Adam Tech</span>`;
}

window.onload = function () {
  generateInput();
};

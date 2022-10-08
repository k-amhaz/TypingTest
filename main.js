let words = [
  "ballet",
  "cycle",
  "similar",
  "deny",
  "normal",
  "rain",
  "horn",
  "tooth",
  "flag",
  "feight",
  "fly",
  "terms",
  "fair",
  "nail",
  "habit",
  "average",
  "diplomatic",
  "float",
  "as",
  "cemetery",
];

//setting levels
const lvls = {
  Easy: 6,
  Normal: 3,
  Hard: 2,
};

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

//Catch Slectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting lvl Name + Seconds + Score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

startButton.onclick = function () {
  this.remove();
  input.focus();
  //Generate Word Function
  genWords();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get the index of random word
  let wordIndex = words.indexOf(randomWord);
  // Remove From array
  words.splice(wordIndex, 1);
  // Empty UpComing Words
  upcomingWords.innerHTML = "";
  // Show the word
  theWord.innerHTML = randomWord;
  // Generate Upcoming Words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Start play function
  startPlay();
}
function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty input
        input.value = "";
        scoreGot.innerHTML++;

        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("Congrats ! All done");
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
  saveToLocalStorage(scoreGot.innerHTML);
}

let dateNow = new Date();

function saveToLocalStorage(scoreGot) {
  localStorage.setItem(dateNow, scoreGot);
}

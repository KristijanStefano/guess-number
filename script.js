'use strict';

/////////////////////////////////////////////////////////////
// Selectors
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

const numberInput = document.querySelector('.guess');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const number = document.querySelector('.number');


/////////////////////////////////////////////////////////////
// State
const state = {
  guessNumber: 0,
  correctNumber: 0,
  score: 20,
  highscore: 0,
}

/////////////////////////////////////////////////////////////
// Helpers
const loadNumber = function (max) {
  state.correctNumber = Math.floor(Math.random() * (max - 0 + 1)) + 0;
};

const generateMessage = function (msg) {
  message.textContent = msg;
}

const generateScore = function (el, score) {
  el.textContent = score;
}

const resetState = function() {
  state.guessNumber = 0,
  state.score = 20;
  loadNumber(10);

  number.textContent = '?';
  numberInput.value = '';
  generateScore(score, state.score);
  generateMessage('Start guessing...');
};


/////////////////////////////////////////////////////////////
// Logic
const winSound = new Audio('sound/win.wav'); 
const checkNumber = function () {
  state.guessNumber = Number(numberInput.value);

  //guards
  if (state.score < 1) {
    generateMessage('You loose 😩');
    return
  }
  if (state.guessNumber < 1) {
    generateMessage('Please enter legit number 🙏🏼');
    return
  }

  // logic
  if (state.correctNumber === state.guessNumber) {
    generateMessage('Bravooo 👏🏼 your number is correct 🥳🎉');
    number.textContent = state.guessNumber;
    winSound.play();

    if (state.score > state.highscore) {
      state.highscore = state.score;
      generateScore(highscore, state.highscore)
    } 

  } else {
    generateMessage(`Your number is ${state.correctNumber > state.guessNumber ? 'low' : 'high'} 😜 try again !!!`)
    state.score--;
    generateScore(score, state.score);
  }
};

/////////////////////////////////////////////////////////////
// Events
// Load number
window.addEventListener('load', function () {
  resetState();
});

// play again
againBtn.addEventListener('click', function (e) {
  e.preventDefault();
  resetState();
});

// Check if the guess is right
checkBtn.addEventListener('click', checkNumber);

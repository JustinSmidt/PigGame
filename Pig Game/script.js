"use strict";

//Selecting elements
const score0El = document.querySelector("#score--0");
////OR
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");

const btnRoll = document.querySelector(".btn--roll");

const btnHold = document.querySelector(".btn--hold");

const current0El = document.querySelector("#current--0");

const current1El = document.querySelector("#current--1");

const player0El = document.querySelector(".player--0");

const player1El = document.querySelector(".player--1");

const winner0 = document.querySelector(".wins--0");
const winner1 = document.querySelector(".wins--1");

let scores, currentScore, activePlayer, playing;

//Functions

//initialising game
const init = function () {
  //holds total score of players
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  winner0.classList.add("hidden");
  winner1.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

//switching player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to active players total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.chek if players total score is >=100
    if (scores[activePlayer] >= 25) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.wins--${activePlayer}`)
        .classList.remove("hidden");
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

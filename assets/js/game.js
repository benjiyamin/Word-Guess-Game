"use strict";

function isLetter(x) {
  return x.length === 1 && x.match(/[a-z]/i);
}

function Game(wordChoices, maxGuesses) {
  let word = wordChoices[Math.floor(Math.random() * wordChoices.length)]
  this.letters = word.split('')
  this.maxGuesses = maxGuesses
  this.guesses = []
  this.wins = 0
  this.losses = 0

  this.guess = function (x) {
    let gameOverBeforeGuess = this.gameOver()
    if (!this.letterPicked(x) && isLetter(x) && !this.gameOver()) {
      this.guesses.push(x);
    }
    if (this.won() && !gameOverBeforeGuess) {
      this.wins += 1
    } else if (this.lost() && !gameOverBeforeGuess) {
      this.losses += 1
    }
  }

  this.letterIsValid = function (x) {
    return this.letters.indexOf(x) !== -1;
  }

  this.letterPicked = function (x) {
    return this.guesses.indexOf(x) !== -1;
  }

  this.validGuesses = function () {
    let output = [];
    this.guesses.forEach(guess => {
      if (this.letters.indexOf(guess) !== -1) {
        output.push(guess)
      }
    });
    return output;
  }

  this.remainingGuesses = function () {
    return this.maxGuesses - this.guesses.length + this.validGuesses().length;
  }

  this.displayed = function () {
    let output = [];
    let letter;
    this.letters.forEach(x => {
      if (this.letterPicked(x)) {
        letter = x
      } else {
        letter = undefined
      }
      output.push(letter)
    });
    return output
  }

  this.newGame = function (maxGuesses) {
    let word = wordChoices[Math.floor(Math.random() * wordChoices.length)]
    this.letters = word.split('')
    if (maxGuesses) {
      this.maxGuesses = maxGuesses
    }
    this.guesses = []
  }

  this.won = function () {
    return this.letters.toString() === this.displayed().toString()
  }

  this.lost = function () {
    return this.remainingGuesses() <= 0 && !this.won()
  }

  this.round = function () {
    return this.wins + this.losses + 1
  }

  this.gameOver = function () {
    return this.won() || this.lost()
  }
}
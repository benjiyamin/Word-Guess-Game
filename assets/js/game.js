"use strict";

function isLetter(x) {
  //return x.toLowerCase() != x.toUpperCase();
  return x.length === 1 && x.match(/[a-z]/i);
}

var game = {
  letters: [],
  maxGuesses: undefined,
  guesses: [],

  guess: function (x) {
    if (!this.letterPicked(x) && isLetter(x) && !this.gameOver()) {
      this.guesses.push(x);
    }
    console.log('Displayed: ' + this.displayed());
    console.log('Remaining Guesses: ' + this.remainingGuesses());
  },

  letterIsValid: function (x) {
    return this.letters.indexOf(x) !== -1;
  },

  letterPicked: function (x) {
    return this.guesses.indexOf(x) !== -1;
  },

  remainingGuesses: function () {
    return this.maxGuesses - this.guesses.length;
  },

  displayed: function () {
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
  },

  start: function (wordChoices, maxGuesses) {
    this.guesses = []
    let word = wordChoices[Math.floor(Math.random() * wordChoices.length)]
    this.letters = word.split('')
    this.maxGuesses = maxGuesses
    console.log('Reset Game')
    console.log('Picked Word: ' + word)
  },

  won: function () {
    return this.letters.toString() === this.displayed().toString()
  },

  lost: function () {
    return this.remainingGuesses() <= 0 && !this.won()
  },

  gameOver: function () {
    return this.won() || this.lost()
  },
}
"use strict";

function isLetter(x) {
  //return x.toLowerCase() != x.toUpperCase();
  return x.length === 1 && x.match(/[a-z]/i);
}

var game = {
  letters: [],
  maxGuesses: undefined,
  guesses: [],
  wins: 0,
  losses: 0,
  inProgress: true,

  guess: function (x) {
    if (!this.letterPicked(x) && isLetter(x) && !this.gameOver()) {
      this.guesses.push(x);
    }
    if (this.won() && this.inProgress) {
      this.wins += 1
      this.inProgress = false
    } else if (this.lost() && this.inProgress) {
      this.losses += 1
      this.inProgress = false
    }
    //console.log('Displayed: ' + this.displayed());
    //console.log('Remaining Guesses: ' + this.remainingGuesses());
  },

  letterIsValid: function (x) {
    // Letter within word
    return this.letters.indexOf(x) !== -1;
  },

  letterPicked: function (x) {
    // Letter has been picked
    return this.guesses.indexOf(x) !== -1;
  },

  validGuesses: function() {
    let output = [];
    this.guesses.forEach(guess => {
      if (this.letters.indexOf(guess) !== -1) {
        output.push(guess)
      }
    });
    return output;
  },

  remainingGuesses: function () {
    return this.maxGuesses - this.guesses.length + this.validGuesses().length;
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

  newGame: function (wordChoices, maxGuesses) {
    let word = wordChoices[Math.floor(Math.random() * wordChoices.length)]
    this.letters = word.split('')
    this.maxGuesses = maxGuesses
    this.guesses = []
    this.inProgress = true
    //console.log('Reset Game')
    //console.log('Picked Word: ' + word)
  },

  won: function () {
    return this.letters.toString() === this.displayed().toString()
  },

  lost: function () {
    return this.remainingGuesses() <= 0 && !this.won()
  },

  round: function () {
    return this.wins + this.losses + 1
  },

  gameOver: function () {
    return this.won() || this.lost()
  },
}
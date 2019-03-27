function Controller(model, view) {
  var self = this

  var currentText = view.getElementById('currentText'),
    remainingText = view.getElementById('remainingText'),
    guessedText = view.getElementById('guessedText'),
    messageText = view.getElementById('messageText'),
    subText = view.getElementById('subText')
  var roundText = view.getElementById('roundText'),
    winsText = view.getElementById('winsText'),
    lossesText = view.getElementById('lossesText')
  var displayWord,
    displayLetter,
    guessedString

  this.updateDisplay = function () {

    function updateWord(reveal = false) {
      displayWord = ''
      model.displayed().forEach(function (letter, i) {
        if (letter == undefined) {
          displayLetter = ' '
          if (reveal) {
            displayLetter += '<span class="text-aurora blink">'
            displayLetter += model.letters[i].toUpperCase()
            displayLetter += '</span>'
          } else {
            displayLetter += '_'
          }
        } else {
          if (model.won()) {
            displayLetter = ' '
            displayLetter += '<span class="blink">'
            displayLetter += letter.toUpperCase()
            displayLetter += '</span>'
          } else {
            displayLetter = ' ' + letter.toUpperCase()
          }
        }
        displayWord += displayLetter
      });
      currentText.innerHTML = displayWord.trim()
    }

    // Update displayed word
    if (model.lost()) {
      updateWord(reveal = true)
    } else {
      updateWord()
    }

    // Update remaining Guesses
    remainingText.textContent = model.remainingGuesses()

    // Update guessed letters
    guessedString = ''
    model.guesses.forEach(guess => {
      guessedString += ' ' + guess.toUpperCase()
    });
    guessedText.textContent = guessedString

    // Status Messages
    if (!model.gameOver()) {
      // Messages when model in progress
      if (model.guesses.length === 0) {
        roundText.textContent = model.round()
      }
      messageText.textContent = 'Guess the word!'
      subText.textContent = 'Press any key to guess a letter.'
    } else if (model.won()) {
      // Messages when model won
      winsText.textContent = model.wins
      messageText.textContent = 'Congrats! You won this round.'
      subText.textContent = 'Press any key to start a new model.'
    } else if (model.lost()) {
      // Message when model lost
      lossesText.textContent = model.losses
      messageText.textContent = 'Sorry.. You lost this time. Try again!'
      subText.textContent = 'Press any key to start a new model.'
    }
  }

  // This function is run whenever the user presses a key.
  view.onkeyup = function (event) {

    // Determines which key was pressed.
    var userKey = event.key;
    if (!game.gameOver()) {
      game.guess(userKey)
    } else {
      game.newGame(totalGuesses)
    }
    self.updateDisplay()
  };
}
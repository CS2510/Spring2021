//import * as Engine from "../../../engine/engine.js"

export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.words = ["horse", "cow", "chicken", "rooster", "sheep", "pig", "goat", "rabbit", "bunny", "chick", "snake", "dog", "cat", "louise", "dragon", "pizza", "peter", "timmy", "james", "john", "mom", "dad", "dinosaur", "star", "hashtag", "summer", "loveland", "spring", "fall", "winter", "autumn", "school", "car", "blue", "red", "green", "yellow", "pink", "white", "black"]
    this.word = this.words[Math.floor(Math.random() * this.words.length)] //Get a random word
    console.log(this.word); //For debugging
    this.guesses = []; //Letters that have been guessed
    this.booted = false;//We need to call some functions on the first update
    this.gameOver = false; //Stop taking input if the game is over
    this.maxGuesses = 9; //How many guesses the player has

    this.scoreComponent = this.gameObject.getComponent("ScoreComponent");
    this.sceneChanger = this.gameObject.getComponent("SceneChangerComponent");
    this.scoreTextComponent = this.gameObject.getComponent("ScreenTextComponent")
    this.correctTextObject = GameObject.Find("CorrectText");
    this.correctTextComponent = this.correctTextObject.getComponent("ScreenTextComponent")
    this.guessedLettersObject = GameObject.Find("GuessedLetters");
    this.guessedLettersComponent = this.guessedLettersObject.getComponent("ScreenTextComponent")

  }
  update() {
    //Update the score
    let score = this.scoreComponent.score;
    if (score >= this.maxGuesses) {
      this.sceneChanger.lose();
      this.gameOver = true;
    }

    //Draw the score
    if (this.screenTextComponent) this.screenTextComponent.string = score + "/" + this.maxGuesses;
    if (!this.booted) {
      this.booted = true;
      this.updateStrings();
    }
  }
  updateStrings() {
    //Update the guessed word
    this.scoreTextComponent.string = this.gameObject.getComponent("ScoreComponent").score + "/" + this.maxGuesses;

    let maskedString = "";
    for (let i = 0; i < this.word.length; i++) {
      let char = this.word[i];
      if (this.guesses.includes(char)) {
        maskedString += char;
      }
      else {
        maskedString += "?"
      }
    }

    this.correctTextComponent.string = maskedString;
    if (!maskedString.includes("?")) {
      this.sceneChanger.win();
      this.gameOver = true;
    }


    //Update the used letters
    this.guessedLettersComponent.string = this.guesses.join(", ")



  }
  onKeyDown(event) {
    if (this.gameOver) return;
    let keys = Object.keys(event);
    console.log(keys)
    for (let key of keys) {

      //Regex from https://stackoverflow.com/a/8653681/10047920
      if (!this.guesses.includes(key.toLowerCase()) && key.match(/^[a-zA-Z]$/)) {
        this.guesses.push(key.toLowerCase());
        if (!this.word.includes(key.toLowerCase())) {
          this.gameObject.getComponent("ScoreComponent").score++;
        }
      }
    }
    this.updateStrings()
  }

}
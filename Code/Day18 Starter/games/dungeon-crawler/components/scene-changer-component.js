////import * as Engine from "../../../engine/engine.js"

export default  class SceneChangerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.tick = 0;
    this.hasWon = false;
    this.haslost = false;
  }
  update(){
    if(this.hasWon || this.hasLost){
      this.tick++;
      if(this.tick > 50){
        if(this.hasWon) Engine.SceneManager.changeScene("WinScene");
        else Engine.SceneManager.changeScene("LoseScene")
      }
    }
  }
  next(){
    let currentSceneName = Engine.SceneManager.currentScene.name;
    if(currentSceneName == "TitleScene") Engine.SceneManager.changeScene("MainScene");
    else Engine.SceneManager.changeScene("TitleScene")
  }
  win(){
    this.hasWon = true;
  }
  lose(){
    this.hasLost = true;
  }
}
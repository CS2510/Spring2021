import * as Engine from "../../../engine/engine.js"

const SceneManager = Engine.SceneManager;

export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.hero = SceneManager.currentScene.getGameObject("Hero");
    
  }
  update() {
    this.heroX = this.hero.transform.position.x;
    this.heroY = this.hero.transform.position.y;
    console.log(this.heroX + " " + this.heroY)
    
    if(this.heroX < -320){
      //Move left
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("RedScene")
      if(SceneManager.currentScene.name == "BlueScene") return SceneManager.changeScene("MainScene")
      this.hero.transform.position.x = -320;
    }
    if(this.heroX > 320){
      //Move right
      if(SceneManager.currentScene.name == "RedScene") return SceneManager.changeScene("MainScene")
      if(SceneManager.currentScene.name == "MainScene") return SceneManager.changeScene("BlueScene")
      
      this.hero.transform.position.x = 320
    }
    if(this.heroY < -240){
      //Move up
      this.hero.transform.position.y = -240;
    }
    if(this.heroY > 240){
      //Move Down
      this.hero.transform.position.y = 240
    }
  }
  
  

}
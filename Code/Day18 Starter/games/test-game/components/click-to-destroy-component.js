//import * as Engine from "../../../engine/engine.js"

export default  class ClickToDestroyComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;

  }
  start(){
    console.log("You called start() on a ClickToDestroyComponent")
  }
  update() {
    if(Engine.Input.getMouseButtonDown(0)){
      let mousePosition = Engine.Input.getMousePosition();
      if(mousePosition.x < 100 && mousePosition.y < 200){
        Destroy(this.gameObject);
        let mainController = Engine.SceneManager.currentScene.getGameObject("MainController");
        let scoreComponent = mainController.getComponent("ScoreComponent");
        scoreComponent.score++;
      }
    }
  }

}
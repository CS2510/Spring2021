import * as Engine from "../../../engine/engine.js"

export default  class MoleMakerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.tick = 0;
  }
  update() {
    let score = this.gameObject.getComponent("ScoreComponent").score;
    let screenTextComponent = this.gameObject.getComponent("ScreenTextComponent");
    screenTextComponent.string = score;

    //Check to see if need to add another mole
    if (!Engine.SceneManager.currentScene.getGameObject("ClickToDestroy")) {
      this.tick++;
    }
    if (this.tick > 100) {
      console.log("Add another")
      this.tick = 0;
      Engine.SceneManager.currentScene.instantiate({
        prefabName: "ClickToDestroy",
        x: 0, 
        y: 0
      })
    }

  }

}
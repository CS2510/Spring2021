

export default  class ChangeSceneComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.ticks = 0;
  }
  update() {
    this.ticks++;
    if (this.ticks > 100) {
      if (Engine.SceneManager.currentScene.name == "FirstScene")
        Engine.SceneManager.changeScene("SecondScene");
      else Engine.SceneManager.changeScene("FirstScene")
    }
  }

}
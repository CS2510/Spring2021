



export default  class SceneChangerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  next(){
    let currentSceneName = Engine.SceneManager.currentScene.name;
    if(currentSceneName == "TitleScene") Engine.SceneManager.changeScene("MainScene");
    else Engine.SceneManager.changeScene("TitleScene")
  }
}
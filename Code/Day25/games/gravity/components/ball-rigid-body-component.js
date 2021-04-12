const SceneManager = Engine.SceneManager;

export default class BallRigidBodyComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {    
  }
  update() {
    let ball = SceneManager.currentScene.getGameObject("BallPrefabRigidBody")
    let camera = SceneManager.currentScene.camera;
    if(ball.transform.position.y > (SceneManager.screenHeight/2)/camera.transform.scale.y){
      Destroy(ball);
      Instantiate({
        prefabName:"BallPrefabRigidBody"
      });
    }
  }
}
export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
  }
  update() {
    //Check to see if the mouse is in collision with the wrapping asteroid
    let asteroidGameObject = Engine.SceneManager.currentScene.getGameObject("AsteroidPrefab");
    let asteroidGeometry = asteroidGameObject.getComponent("CircleGeometryComponent").asGeometry();
    let mousePosition = Input.getMousePosition();

    //Now do wrapping collision detection
    let width = Engine.SceneManager.screenWidth;
    let height = Engine.SceneManager.screenHeight;
    let collision = Geometry.Collisions.collision(
      { geometry: asteroidGeometry, matrix: asteroidGameObject.transform.worldMatrix },
      { geometry: mousePosition, matrix: Geometry.Matrix.identity }
    )
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        //if (y == 0) continue;
        collision ||= Geometry.Collisions.collision(
          { geometry: asteroidGeometry, matrix: asteroidGameObject.transform.worldMatrix },
          { geometry: mousePosition, matrix: Geometry.Matrix.identity.translate(width * x, height * y) }
        )
      }
    }

    if (Math.random() < .5)
      console.log(collision);
  }
}
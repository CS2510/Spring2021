
export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.started = false;


  }
  update() {
    if (!this.started) {
      this.started = true;
      for (let i = 0; i < 5; i++) {

        let asteroidGameObject = Instantiate({ prefabName: "AsteroidPrefab", drawLayer: "default" });
        asteroidGameObject.transform.position.x = (Math.random() * 2 - 1) * 200
        asteroidGameObject.transform.position.y = (Math.random() * 2 - 1) * 200
        asteroidGameObject.getComponent("AsteroidUpdateComponent").heading = Math.random() * 2 * Math.PI - Math.PI;

      }
      //Draw starfield
      let starCount = 100;
      for (let i = 0; i < starCount; i++) {
        let star = Instantiate(
          {
            gameObject: {
              name: "Star", components: [
                { name: "CircleGeometryComponent", args: [1] },
                { name: "DrawGeometryComponent", args: ['yellow'] },
              ]
            }, drawLayer: "default"
          }
        )
        star.transform.position.x = (Math.random() * 2 - 1) * (Engine.SceneManager.screenWidth/2/Engine.SceneManager.currentScene.camera.transform.scale.x);
        star.transform.position.y = (Math.random() * 2 - 1) * (Engine.SceneManager.screenHeight/2/Engine.SceneManager.currentScene.camera.transform.scale.y);
        console.log("hi")
      }
    }
    //Check to see if the mouse is in collision with the wrapping asteroid
    let asteroidGameObject = Engine.SceneManager.currentScene.getGameObject("AsteroidPrefab");
    if (!asteroidGameObject) return;
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




  }
}
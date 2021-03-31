
export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.score = 0;
  }
  start() {
    let point = new Engine.EngineGeometry.Vector2(0, 0);
    let circle = new Engine.EngineGeometry.Circle(0, 0, 1);
    let rectangle = new Engine.EngineGeometry.Rectangle(0, 0, 1, 1)

    let point2 = new Engine.EngineGeometry.Vector2(1, 1);
    let circle2 = new Engine.EngineGeometry.Circle(-.5, .5, 1);
    let rectangle2 = new Engine.EngineGeometry.Rectangle(2, 2, 1, 1)



    console.log(Geometry.Collisions.inCollision(point, circle)); //true
    console.log(Geometry.Collisions.inCollision(point, circle2)); //true
    console.log(Geometry.Collisions.inCollision(point, rectangle)); //true (on border)
    console.log(Geometry.Collisions.inCollision(point, rectangle2)); //false
    console.log(Geometry.Collisions.inCollision(point2, circle)); //false
    console.log(Geometry.Collisions.inCollision(point2, circle2)); //false
    console.log(Geometry.Collisions.inCollision(point2, rectangle)); //true (border)
    console.log(Geometry.Collisions.inCollision(point2, rectangle2)); //false

    console.log(Geometry.Collisions.inCollision(circle, circle2)); //true
    console.log(Geometry.Collisions.inCollision(circle, rectangle)); //true
    console.log(Geometry.Collisions.inCollision(circle, rectangle2)); //false
    console.log(Geometry.Collisions.inCollision(circle2, circle2)); //true
    console.log(Geometry.Collisions.inCollision(circle2, rectangle)); //true
    console.log(Geometry.Collisions.inCollision(circle2, rectangle2)); //false

    console.log(Geometry.Collisions.inCollision(rectangle, rectangle2)); //false;

  }
  update() {

    let circle = SceneManager.currentScene.getGameObject("CircleGameObject");
    let rectangle = SceneManager.currentScene.getGameObject("RectangleGameObject");

    let point = Input.getMousePosition();
    point.x -= SceneManager.currentScene.camera.screenWidth / 2;
    point.y -= SceneManager.currentScene.camera.screenHeight / 2;

    console.log(point);


    if (circle)
      if (Geometry.Collisions.inCollision(point, circle.getComponent("CircleGeometryComponent").asGeometry())) {
        if (Input.getMouseButtonDown(0)) {
          circle.getComponent("DrawGeometryComponent").color = "blue";
          circle.destroy();
          this.score++;
          Instantiate({

            gameObject: {
              name: "CircleGameObject",
              components: [
                { name: "DrawGeometryComponent", args: ["brown"] },
                { name: "CircleGeometryComponent", args: [100] }
              ]
            }, x: Math.random() * 500, y: Math.random() * 500

          })
        }
      }
      else {
        circle.getComponent("DrawGeometryComponent").color = "red";
      }

    if (Engine.EngineGeometry.Collisions.inCollision(point, rectangle.getComponent("RectangleGeometryComponent").asGeometry())) {
      rectangle.getComponent("DrawGeometryComponent").color = "blue";
    }
    else {
      rectangle.getComponent("DrawGeometryComponent").color = "red";
    }

    let screenText = SceneManager.currentScene.getGameObject("ScreenText");
    screenText.getComponent("ScreenTextComponent").string = "" + this.score;

  }
}
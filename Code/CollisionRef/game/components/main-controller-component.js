export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.ticks = 0;
    this.score = 0;

    let point = new Engine.EngineGeometry.Vector2(0, 0);
    let circle = new Engine.EngineGeometry.Circle(0, 0, 1);
    let rectangle = new Engine.EngineGeometry.Rectangle(0, 0, 1, 1)

    let point2 = new Engine.EngineGeometry.Vector2(1, 1);
    let circle2 = new Engine.EngineGeometry.Circle(-.5, .5, 1);
    let rectangle2 = new Engine.EngineGeometry.Rectangle(2, 2, 1, 1)



    console.log(Engine.EngineGeometry.Collisions.inCollision(point, circle)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(point, circle2)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(point, rectangle)); //true (on border)
    console.log(Engine.EngineGeometry.Collisions.inCollision(point, rectangle2)); //false
    console.log(Engine.EngineGeometry.Collisions.inCollision(point2, circle)); //false
    console.log(Engine.EngineGeometry.Collisions.inCollision(point2, circle2)); //false
    console.log(Engine.EngineGeometry.Collisions.inCollision(point2, rectangle)); //true (border)
    console.log(Engine.EngineGeometry.Collisions.inCollision(point2, rectangle2)); //false

    console.log(Engine.EngineGeometry.Collisions.inCollision(circle, circle2)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(circle, rectangle)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(circle, rectangle2)); //false
    console.log(Engine.EngineGeometry.Collisions.inCollision(circle2, circle2)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(circle2, rectangle)); //true
    console.log(Engine.EngineGeometry.Collisions.inCollision(circle2, rectangle2)); //false

    console.log(Engine.EngineGeometry.Collisions.inCollision(rectangle, rectangle2)); //false;


    this.rectangle = Engine.SceneManager.currentScene.getGameObject("RectangleGameObject");
    this.rectangleMouseFollow = Engine.SceneManager.currentScene.getGameObject("RectangleMouseFollow");
    this.circle = Engine.SceneManager.currentScene.getGameObject("CircleGameObject");
    
  }
  update() {

    this.ticks++;
    if(this.ticks == 200)
     console.log("break")

    let point = Input.getMousePosition();
    point.x -= Engine.SceneManager.currentScene.camera.screenWidth / 2
    point.y -= Engine.SceneManager.currentScene.camera.screenHeight / 2

    
    let inCollision = Engine.EngineGeometry.Collisions.inCollision(point, this.circle.getComponent("CircleGeometryComponent").asGeometry())
    if (inCollision) {
      if (Input.getMouseButtonDown(0)) {
        this.score++;
        this.circle.getComponent("DrawGeometryComponent").color = "blue";
        this.circle.destroy()

        let valid = false;


        let x;
        let y;
        do {
          x = (Math.random() - .5) * 2 * 300;
          y = (Math.random() - .5) * 2 * 300;
          if (Math.abs(x - this.circle.transform.position.x) > 100)
            if (Math.abs(y - this.circle.transform.position.y) > 100) {
              valid = true;
              break;
            }

        }while (!valid) 
        
        this.circle = Instantiate({
          gameObject: {
            name: "CircleGameObject",
            components: [
              { name: "DrawGeometryComponent", args: ["brown"] },
              { name: "CircleGeometryComponent", args: [100] }
            ]
          }, x, y
        }
        )
      }
    }
    else {
      this.circle.getComponent("DrawGeometryComponent").color = "green";
    }
    
    //Move the rectangle that follows the mouse
    this.rectangleMouseFollow.transform.position.x = point.x;
    this.rectangleMouseFollow.transform.position.y = point.y;

    let rectangleCollision = Engine.EngineGeometry.Collisions.inCollision(this.rectangle.getComponent("RectangleGeometryComponent").asGeometry(), this.rectangleMouseFollow.getComponent("RectangleGeometryComponent").asGeometry());
    if(rectangleCollision){
      this.rectangleMouseFollow.getComponent("DrawGeometryComponent").color = "green"
    }
    else{
      this.rectangleMouseFollow.getComponent("DrawGeometryComponent").color = "red"

    }

    inCollision = Engine.EngineGeometry.Collisions.inCollision(point, this.rectangle.getComponent("RectangleGeometryComponent").asGeometry())
    if (inCollision) {
      this.rectangle.getComponent("DrawGeometryComponent").color = "blue";
    }
    else {
      this.rectangle.getComponent("DrawGeometryComponent").color = "green";
    }

    Engine.SceneManager.currentScene.getGameObject("ScreenText").getComponent("ScreenTextComponent").string = "" + this.score + " / " + this.ticks

    if (this.ticks >= 1000000) {
      Engine.SceneManager.changeScene("StartScene")
    }

  }
}
export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    let point = new Engine.EngineGeometry.Vector2(0, 0);
    let circle = new Engine.EngineGeometry.Circle(0,0,1);
    let rectangle = new Engine.EngineGeometry.Rectangle(0, 0, 1, 1)

    let point2 = new Engine.EngineGeometry.Vector2(1, 1);
    let circle2 = new Engine.EngineGeometry.Circle(-.5,.5,1);
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

  }
  update() {

    let circle = Engine.SceneManager.currentScene.getGameObject("CircleGameObject");
    let rectangle = Engine.SceneManager.currentScene.getGameObject("RectangleGameObject");

    let point = Input.getMousePosition();
    point.x -= Engine.SceneManager.currentScene.camera.screenWidth/2;
    point.y -= Engine.SceneManager.currentScene.camera.screenHeight/2;

    console.log(point);


    if(Engine.EngineGeometry.Collisions.inCollision(point,circle.getComponent("CircleGeometryComponent").asGeometry())){
      circle.getComponent("DrawGeometryComponent").color = "blue";
    }
    else{
      circle.getComponent("DrawGeometryComponent").color = "red";
    }

    if(Engine.EngineGeometry.Collisions.inCollision(point,rectangle.getComponent("RectangleGeometryComponent").asGeometry())){
      rectangle.getComponent("DrawGeometryComponent").color = "blue";
    }
    else{
      rectangle.getComponent("DrawGeometryComponent").color = "red";
    }
    
  }
}
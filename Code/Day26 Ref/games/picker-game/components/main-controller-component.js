export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
  }
  update() {
    let camera = Engine.SceneManager.currentScene.camera
    let rectangle = GetGameObject("CenterSquare");
    let matrix = Engine.EngineGeometry.Matrix.identity;
    let position = new Engine.EngineGeometry.Vector2(rectangle.transform.position);
    matrix.translate(Engine.SceneManager.screenWidth/2, Engine.SceneManager.screenHeight/2)
    matrix.translate(camera.transform.position);
    matrix.scale(camera.transform.scale);
    let newLocation = matrix.multiply(position);
    GetGameObject("TransitionText").transform.position = newLocation
    GetGameObject("TransitionText").getComponent("ScreenTextComponent").string = "(0,0)"
    
  }
  onMouseMove(){
    let mousePosition = Input.getMousePosition();
    GetGameObject("ScreenLocation").getComponent("ScreenTextComponent").string = `Screen Mouse: ${mousePosition.x}, ${mousePosition.y}`

    let camera = Engine.SceneManager.currentScene.camera
    let worldSpace = new Engine.EngineGeometry.Vector2(mousePosition);
    worldSpace.minus(camera.transform.position);
    worldSpace.scale(1/camera.transform.scale.x)
    GetGameObject("WorldLocation").getComponent("ScreenTextComponent").string = `World Mouse: ${worldSpace.x}, ${worldSpace.y}`

    
  }
  onScrollWheel(){
    console.log("Mouse wheel")
  }
}
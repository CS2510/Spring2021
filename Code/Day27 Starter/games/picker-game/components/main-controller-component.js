export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {
    this.ticks = 0;
  }
  update() {
    this.ticks++;
    // let camera = Engine.SceneManager.currentScene.camera
    // camera.transform.scale = new Engine.EngineGeometry.Vector2(10 + Math.sin(this.ticks/100), 10 + Math.sin(this.ticks/100));
    // camera.transform.position = new Engine.EngineGeometry.Vector2(30 + 10*Math.sin(this.ticks/200), 100+ 10*Math.sin(this.ticks/200));


    // let rectangle = GetGameObject("CenterSquare");
    // let matrix = Engine.EngineGeometry.Matrix.identity;
    // let position = new Engine.EngineGeometry.Vector2(rectangle.transform.position);
    // matrix.translate(Engine.SceneManager.screenWidth/2, Engine.SceneManager.screenHeight/2)
    // matrix.translate(camera.transform.position);
    // matrix.scale(camera.transform.scale);
    // let newLocation = matrix.multiply(position);
    // GetGameObject("TransitionText").transform.position = newLocation
    // GetGameObject("TransitionText").getComponent("ScreenTextComponent").string = `(${rectangle.transform.position.x},${rectangle.transform.position.y})`
    
    // GetGameObject("CameraTranslate").getComponent("ScreenTextComponent").string = `Camera dx,dy: ${camera.transform.position.x}, ${camera.transform.position.y}`
    // GetGameObject("CameraScale").getComponent("ScreenTextComponent").string = `Camera dx,dy: ${camera.transform.scale.x}, ${camera.transform.scale.y}`
  }
  onMouseMove(){
    // let mousePosition = Input.getMousePosition();
    // GetGameObject("ScreenLocation").getComponent("ScreenTextComponent").string = `Screen Mouse: ${mousePosition.x}, ${mousePosition.y}`

    // let camera = Engine.SceneManager.currentScene.camera
    // let worldSpace = new Engine.EngineGeometry.Vector2(mousePosition);
    // worldSpace.minus(camera.transform.position);
    // worldSpace.scale(1/camera.transform.scale.x)
    // GetGameObject("WorldLocation").getComponent("ScreenTextComponent").string = `World Mouse: ${worldSpace.x}, ${worldSpace.y}`
    
    
  }
}
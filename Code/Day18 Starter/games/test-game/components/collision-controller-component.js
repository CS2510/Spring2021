

export default class CollisionControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.tick = 0;
  }
  start() {
    this.circle = GameObject.Find("Circle");
    this.rectangle = GameObject.Find("Rectangle");
    
  }
  update() {
    let one = Input.getMousePosition()
    if(Engine.SceneManager.Geometry.collision(
      {geometry:one, matrix:one.transform.matrix()},
      {geometry:this.circle.getCollider(), matrix:this.circle.transform.matrix()}
      ))
      {
        console.log("In Collision")
      }

    
    

  }
}
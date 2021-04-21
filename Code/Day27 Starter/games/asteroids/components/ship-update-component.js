const SceneManager = Engine.SceneManager;

export default class ShipUpdateComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() { 
    this.rigidBody = this.gameObject.getComponent("RigidBodyComponent");   
    this.rotationAcceleration = 1;
    this.acceleration = 100;
    this.deltaTime = 1/60;
    
  }
  update() {
    if (Engine.Input.getKey("ArrowLeft") || Engine.Input.getKey('a')) this.gameObject.transform.rotation -= this.rotationAcceleration * this.deltaTime;
    if (Engine.Input.getKey("ArrowRight") || Engine.Input.getKey('d')) this.gameObject.transform.rotation += this.rotationAcceleration * this.deltaTime;
    if (Engine.Input.getKey("ArrowUp") || Engine.Input.getKey('w')) 
    this.rigidBody.velocity += this.acceleration * this.deltaTime

    this.halfWidth = Engine.SceneManager.screenWidth/2;
    this.halfHeight = Engine.SceneManager.screenHeight/2;
    if(this.gameObject.transform.position.x > this.halfWidth)
      this.gameObject.transform.position.x -= this.halfWidth*2
    if(this.gameObject.transform.position.y > this.halfHeight)
      this.gameObject.transform.position.y -= this.halfHeight * 2
    if(this.gameObject.transform.position.x < -this.halfWidth)
      this.gameObject.transform.position.x += this.halfWidth*2
    if(this.gameObject.transform.position.y < -this.halfHeight)
      this.gameObject.transform.position.y += this.halfHeight * 2
  }
}
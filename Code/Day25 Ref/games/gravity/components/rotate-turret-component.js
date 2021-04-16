const SceneManager = Engine.SceneManager;

export default class RotateTurretComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {    
    this.ticks = 0;
  }
  update() {
    this.ticks++;
    if(this.ticks > 100)
    {
      this.ticks = 0;
      let circle = Instantiate({prefabName:"BallPrefabRigidBody"})
      circle.transform.position = this.gameObject.transform.position.clone()
      circle.getComponent("RigidBodyComponent").heading = this.gameObject.transform.rotation;
      circle.getComponent("RigidBodyComponent").velocity = 40;
      circle.transform.position.x += Math.cos(this.gameObject.transform.rotation) * this.gameObject.getComponent("RectangleGeometryComponent").height
      circle.transform.position.y += Math.sin(this.gameObject.transform.rotation) * this.gameObject.getComponent("RectangleGeometryComponent").height
      circle.name="TankCircle"
    }
    let rotation = 0;
    if(Input.getKey("ArrowLeft"))
      rotation = -1
    else if(Input.getKey("ArrowRight"))
      rotation = 1;

    this.gameObject.transform.rotation += rotation * 1/60;
    if(this.gameObject.transform.rotation > 0)
     this.gameObject.transform.rotation = 0;
    if(this.gameObject.transform.rotation < - Math.PI/2)
      this.gameObject.transform.rotation = -Math.PI/2
  }
}
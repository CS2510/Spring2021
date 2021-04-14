const SceneManager = Engine.SceneManager;
const Vector2 = Engine.EngineGeometry.Vector2;

export default class BallPongComponent extends Engine.Component {
  gameObject;
  rigidBody;
  constructor(gameObject) {
    super(gameObject);
    this.ticks = 0;

  }
  start() {

  }
  update() {
    if (this.ticks == 0) {
      this.gameObject = GetGameObject("BallPongPrefab")
      this.rigidBody = this.gameObject.getComponent("RigidBodyComponent");
      //this.rigidBody.heading = (Math.random() * 2 - 1) * Math.PI;
      this.rigidBody.heading = Math.PI/2;
      this.rigidBody.velocity = 10;
    }
    else {
      let vx = Math.cos(this.rigidBody.heading) 
      let vy = Math.sin(this.rigidBody.heading) 
      let velocityVector = new Vector2(vx, vy);

      let about = null;

      if (this.gameObject.transform.position.x > 10) {
        //this.rigidBody.velocity = 0;
        about = new Vector2(0, 1);
      }
      if (this.gameObject.transform.position.x < -10) {
        about = new Vector2(0, 1);
      }
      if (this.gameObject.transform.position.y > 10) {
        about = new Vector2( 1, 0);
      }
      if (this.gameObject.transform.position.y < -10) {
        about = new Vector2(1, 0);
      }
      if (about) {
        let r = Vector2.minus(Vector2.scale(about, Vector2.dot(velocityVector, about) * 2), velocityVector);
        vx = r.x;
        vy = r.y;
        this.rigidBody.heading = Math.atan2(vy, vx);
        this.rigidBody.velocity = Math.sqrt(vx ** 2 + vy ** 2)
      }
    }
    this.ticks++;


  }
}
const SceneManager = Engine.SceneManager;

export default class AsteroidUpdateComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {  
    this.heading = Math.PI /4;
    // this.heading = Math.PI * 2 * Math.random();
    this.velocity = 0;  
    this.halfWidth = 320;
    this.halfHeight = 240;
  }
  update() {
    this.gameObject.transform.position.x += Math.cos(this.heading)*this.velocity;
    this.gameObject.transform.position.y += Math.sin(this.heading)*this.velocity;
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

export default class AsteroidUpdateComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {  
    this.heading = Math.PI /4;
    // this.heading = Math.PI * 2 * Math.random();
    this.velocity = 1;  
    this.halfWidth = Engine.SceneManager.screenWidth/2;
    this.halfHeight = Engine.SceneManager.screenHeight/2;
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

    //For debugging, force the asteroid position
    //Bottom Right
    // this.gameObject.transform.position.x = Engine.SceneManager.screenWidth/2-1
    // this.gameObject.transform.position.y = Engine.SceneManager.screenHeight/2-1
    //Top Right
    // this.gameObject.transform.position.x = Engine.SceneManager.screenWidth/2-1
    // this.gameObject.transform.position.y = -Engine.SceneManager.screenHeight/2+1
    // //Bottom Left
    // this.gameObject.transform.position.x = -Engine.SceneManager.screenWidth/2+1
    // this.gameObject.transform.position.y = Engine.SceneManager.screenHeight/2-1
    //Top Left
    // this.gameObject.transform.position.x = -Engine.SceneManager.screenWidth/2+1
    // this.gameObject.transform.position.y = -Engine.SceneManager.screenHeight/2+1
  }
}
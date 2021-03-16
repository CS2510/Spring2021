
//

//


export default class KeyboardBumpComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;
  }
  onKeyDown(keys) {
    let originalPosition = new Engine.Geometry.Vector2(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
    if (keys["a"] || keys["ArrowLeft"]) {
      this.gameObject.transform.position.x -= 1 * this.speed
      this.gameObject.transform.rotation = -Math.PI/2;
    }
    if (keys["d"] || keys["ArrowRight"]) {
      this.gameObject.transform.position.x += 1 * this.speed
      this.gameObject.transform.rotation = Math.PI/2;
    }
    if (keys["w"] || keys["ArrowUp"]) {
      this.gameObject.transform.position.y -= 1 * this.speed
      this.gameObject.transform.rotation = 0;
    }
    if (keys["s"] || keys["ArrowDown"]) {
      this.gameObject.transform.position.y += 1 * this.speed
      this.gameObject.transform.rotation = -Math.PI;
    }
    if (this.gameObject.transform.position.x < -4
      || this.gameObject.transform.position.x > 4
      || this.gameObject.transform.position.y < 0
      || this.gameObject.transform.position.y > 4) {
      //We are out of bounds, so revert back
      this.gameObject.transform.position.x = originalPosition.x;
      this.gameObject.transform.position.y = originalPosition.y;
    }

  }

}
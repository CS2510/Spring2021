import * as Engine from "../../../engine/engine.js"

export default class KeyboardBumpComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;
  }
  onKeyDown(keys) {
    let originalPosition = new Engine.Vector2(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
    if (keys["a"] || keys["ArrowLeft"]) {
      this.gameObject.transform.rotation = -Math.PI/2;
      this.gameObject.transform.position.x -= 1 * this.speed;
    }
    if (keys["d"] || keys["ArrowRight"]) {
      this.gameObject.transform.rotation = Math.PI/2;
      this.gameObject.transform.position.x += 1 * this.speed
    }
    if (keys["w"] || keys["ArrowUp"]) {
      this.gameObject.transform.rotation = 0;
      this.gameObject.transform.position.y -= 1 * this.speed
    }
    if (keys["s"] || keys["ArrowDown"]) {
      this.gameObject.transform.rotation = -Math.PI;
      this.gameObject.transform.position.y += 1 * this.speed
    }
    if (this.gameObject.transform.position.x < -4
      || this.gameObject.transform.position.x > 4
      || this.gameObject.transform.position.y < -2
      || this.gameObject.transform.position.y > 2) {
      //We are out of bounds, so revert back
      this.gameObject.transform.position.x = originalPosition.x;
      this.gameObject.transform.position.y = originalPosition.y;
    }

  }

}
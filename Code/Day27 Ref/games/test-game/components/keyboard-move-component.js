export default  class KeyboardMoveComponent extends Engine.Component {
  constructor(gameObject, speed = 1) {
    super(gameObject);
    this.speed = speed;

  }
  update() {
    if (Engine.Input.getKey("ArrowLeft") || Engine.Input.getKey('a')) this.gameObject.transform.position.x -= 1 * this.speed;
    if (Engine.Input.getKey("ArrowRight") || Engine.Input.getKey('d')) this.gameObject.transform.position.x += 1 * this.speed;
    if (Engine.Input.getKey("ArrowUp") || Engine.Input.getKey('w')) this.gameObject.transform.position.y -= 1 * this.speed;
    if (Engine.Input.getKey("ArrowDown") || Engine.Input.getKey('s')) this.gameObject.transform.position.y += 1 * this.speed;
  }

}
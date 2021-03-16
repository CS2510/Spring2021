



export default class MainControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.tick = 0;
  }
  start() {
    this.unavailable = GameObject.Find("Unavailable");
  }
  update() {
    this.tick++;
    if (this.tick % 100 == 0) {
      if (this.tick % 200 == 0) {
        console.log("Disabling")
        this.unavailable.disable();
      }
      else {
        console.log("Enabling")
        this.unavailable.enable();
      }
    }

  }
}
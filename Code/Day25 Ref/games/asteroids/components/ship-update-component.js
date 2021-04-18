const SceneManager = Engine.SceneManager;

export default class ShipUpdateComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  start() {    
  }
  update() {
    this.gameObject.transform.position.x += 10 * 1/60;
  }
}
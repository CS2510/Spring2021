import Component from "../component.js"

export default class TransformComponent extends Component {
  parent;
  constructor(gameObject) {
    super(gameObject);
    this.position = { x: 0, y: 0 };
    this.scale = { x: 1, y: 1 };
    this.rotation = 0;
    this.children = [];
  }
}
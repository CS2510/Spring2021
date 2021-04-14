import Component from "../component.js"


export default class RigidBodyComponent extends Component {
  constructor(gameObject, args) {
    super(gameObject);
    this.gravity = true;
    if (args) {
      this.gravity = args.gravity;
    }
  }
  start() {
    
  }
  update() {
    
  }

}
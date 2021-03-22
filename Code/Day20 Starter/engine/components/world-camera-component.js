import Component from "../component.js"

export default class WorldCameraComponent extends Component {
  constructor(gameObject, color) {
    super(gameObject);  
    this.color = color || "black";  
  }
}
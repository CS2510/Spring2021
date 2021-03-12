import Component from "../component.js"
export default  class CircleGeometryComponent extends Component{
    constructor(gameObject, radius){
        super(gameObject);
        this.radius = radius;
        //We don't ask for the x and y because that comes from the game object
    }
}
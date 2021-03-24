import Component from "../component.js"
export default  class PolygonGeometryComponent extends Component{
    constructor(gameObject, points){
        super(gameObject);
        this.points = points;
    }
}
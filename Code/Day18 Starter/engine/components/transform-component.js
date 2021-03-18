import Component from "../component.js"
import Matrix from "../geometry/matrix.js";
import Vector2 from "../geometry/vector-2.js";

export default class TransformComponent extends Component {
    constructor(gameObject){
        super(gameObject)
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(1,1);
        this.rotation = 0;

        this.children = [];
        this.parentTransform = null;
        
    }
    get localMatrix(){
        return Matrix.identity
        .rotate(this.rotation)
        .scale(this.scale.x, this.scale.y)
        .translate(this.position.x, this.position.y)
    }
    get worldMatrix(){
        if(this.parentTransform == null){
            return this.localMatrix;
        }
        else{
            return this.parentTransform.worldMatrix().multiply(this.localMatrix);
        }
    }
    get localRotation(){
        return this.rotation;
    }
    get localScale(){
        return this.scale;
    }
    get localPosition(){
        return this.position;
    }
    get parent(){
        return this.parentTransform;
    }
    set parent(transform){
        this.parentTransform = transform;
    }
    rotate(radians){
        this.rotation += radians;
        return this;
    }
    translate(dx, dy){
        this.position.plus(new Vector2(dx,dy));
        return this;
    }
    scaleBy(sx, sy){
        this.scale.x *= sx;
        this.scale.y *= sy;
        return this;
    }

    
}
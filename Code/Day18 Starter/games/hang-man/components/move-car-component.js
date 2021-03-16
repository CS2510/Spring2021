//import * as Engine from "../../../engine/engine.js"

export default  class MoveCarComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
    }
    update(){
        this.gameObject.transform.position.x++; 
    }
}
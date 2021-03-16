////import * as Engine from "../../../engine/engine.js"

export default  class ScoreComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
        this.score = 0;
    }
}
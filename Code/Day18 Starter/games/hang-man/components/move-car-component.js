



export default  class MoveCarComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
    }
    update(){
        this.gameObject.transform.position.x++; 
    }
}
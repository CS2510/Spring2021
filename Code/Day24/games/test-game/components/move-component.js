export default  class MoveComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
    }
    update(){
        this.gameObject.transform.position.x++; 
        this.gameObject.transform.position.y++;
    }
}
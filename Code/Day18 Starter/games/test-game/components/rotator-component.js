



export default  class RotatorComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
        this.rotation = 0;
    }
    update(){
        this.rotation++;
    }
}
export default  class SleepyComponent extends Engine.Component{
    constructor(gameObject){
        super(gameObject);
        
    }
    start(){
      console.log("start()")
    }
    awake(){
      console.log("awake()")
    }
    onEnable(){
      console.log("onEnable()")
    }
    onDisable(){
      console.log("onDisable()")
    }
}
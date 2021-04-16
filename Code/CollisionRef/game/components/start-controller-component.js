export default class StartControllerComponent extends Engine.Component {
    constructor(gameObject) {
      super(gameObject);
    }
    start() {
        this.ticks = 0;
    }
    update(){
        this.ticks++;
        if(this.ticks >= 100){
            Engine.SceneManager.changeScene("CollisionScene")
        }

    }
}
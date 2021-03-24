export default class CollisionControllerComponent extends Engine.Component {
  constructor(gameObject) {
    super(gameObject);
    this.tick = 0;

  }
  start() {
    this.circle = GameObject.Find("Circle");
    this.rectangle = GameObject.Find("Rectangle");

  }
  update() {
    this.tick++;
    
    //console.log(mouse)
    let Matrix = Engine.SceneManager.Geometry.Matrix;
    

    let mouse = Input.getMousePosition()

    if (Geometry.Collisions.collision(
      { geometry: mouse, matrix: Matrix.identity },
      { geometry: this.circle.getComponent("CircleGeometryComponent").asGeometry(), matrix: this.circle.transform.worldMatrix }
    )) {
      this.circle.getComponent("DrawGeometryComponent").color = "blue"
    }
    else{
      this.circle.getComponent("DrawGeometryComponent").color = "red"
    }

    if (Geometry.Collisions.collision(
      { geometry: mouse, matrix: Matrix.identity },
      { geometry: this.rectangle.getComponent("RectangleGeometryComponent").asGeometry(), matrix: this.rectangle.transform.worldMatrix }
    )) {
      this.rectangle.getComponent("DrawGeometryComponent").color = "blue"
    }
    else{
      this.rectangle.getComponent("DrawGeometryComponent").color = "red"
    }

    this.circle.transform.localPosition = new Geometry.Vector2(Math.sin(this.tick/100)*100, Math.sin(this.tick/50)*100);
    this.circle.transform.rotate(Math.PI/100);
    this.circle.transform.localScale = new Geometry.Vector2(Math.sin(this.tick/200)+1, Math.sin(this.tick/300)+1)




  }
}
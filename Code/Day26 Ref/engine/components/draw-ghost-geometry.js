import Component from "../component.js"

export default class DrawGhostGeometry extends Component {
  constructor(gameObject, color) {
    super(gameObject);
    this.color = color;
  }
  draw(ctx) {
    let x = this.gameObject.transform.position.x;
    let y = this.gameObject.transform.position.y;

    // for (let i = -1; i <= 1; i++) {
    //   for (let j = -1; j <= 1; j++) {
    let asteroidUpdateComponent = this.gameObject.getComponent("AsteroidUpdateComponent")
    let dx = 0;
    let dy = 0;
    let heading = asteroidUpdateComponent.heading;
    while (heading > Math.PI) heading -= Math.PI * 2
    while (heading < -Math.PI) heading += Math.PI * 2
    dy = heading > 0 ? -1 : 1;
    dx = Math.abs(heading) > Math.PI / 4 ? 1 : -1

    ctx.save();

    ctx.translate(640 * dx, 480 * dy);

    let rectangleGeometry = this.gameObject.getComponent("RectangleGeometryComponent")
    if (rectangleGeometry) {
      ctx.fillStyle = this.color;
      ctx.fillRect(0 - rectangleGeometry.width / 2, 0 - rectangleGeometry.height / 2, rectangleGeometry.width, rectangleGeometry.height);
    }
    let circleGeometry = this.gameObject.getComponent("CircleGeometryComponent");
    if (circleGeometry) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, circleGeometry.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    let polygonGeometryComponent = this.gameObject.getComponent("PolygonGeometryComponent");
    if (polygonGeometryComponent) {
      if (polygonGeometryComponent.points && polygonGeometryComponent.points.length) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(polygonGeometryComponent.points[0].x, polygonGeometryComponent.points[0].y)
        for (let point of polygonGeometryComponent.points) {
          ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.fill();

      }
    }
    ctx.restore();
    //   }
    // }

  }
}
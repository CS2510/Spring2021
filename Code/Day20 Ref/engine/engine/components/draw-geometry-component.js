import Component from "../component.js"
export default class DrawGeometryComponent extends Component {
  constructor(gameObject, color) {
    super(gameObject);
    this.color = color;
  }
  draw(ctx) {
    let rectangleGeometry = this.gameObject.getComponent("RectangleGeometryComponent")
    if (rectangleGeometry) {
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, rectangleGeometry.width, rectangleGeometry.height);
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

  }
}
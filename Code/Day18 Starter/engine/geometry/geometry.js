import Vector2 from "./vector-2.js"
import Vector3 from "./vector-3.js"
import Line from "./line.js"
import Circle from "./circle.js"
import Rectangle from "./rectangle.js"
import Matrix from "./matrix.js"

export default class Geometry {

  static collision(one, two) {
    if (one.geometry instanceof Vector2) {
      if (two.geometry instanceof Vector2) {
        let _one = Matrix.multiply(one.matrix, one.geometry);
        let _two = Matrix.multiply(two.matrix, two.geometry);
        if (Vector2.closeTo(_one, _two))
          return true;
        else
          return false;
      }
      else if (two.geometry instanceof Line) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Circle) {
        let _one = Matrix.multiply(one.matrix, one.geometry);
        let _two = Matrix.multiply(two.matrix, Vector3.ZeroW).asVector2();

        let distance = Vector2.distanceBetween(_one, _two);
        if(distance <= two.geometry.radius)
          return true;
        else
          return false;


      }
      else if (two.geometry instanceof Rectangle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Rectangle) {
        console.error("Can't do that");
      }
    }
    if (one.geometry instanceof Line) {
      console.log("Line");
      if (two.geometry instanceof Vector2) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Line) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Circle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Rectangle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Polygon) {
        console.error("Can't do that");
      }
    }
    if (one.geometry instanceof Circle) {
      console.log("Circle");
      if (two.geometry instanceof Vector2) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Line) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Circle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Rectangle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Polygon) {
        console.error("Can't do that");
      }
    }
    if (one.geometry instanceof Rectangle) {
      console.log("Rectangle");
      if (two.geometry instanceof Vector2) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Line) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Circle) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Rectangle) {
        console.error("Can't do that");
      }
      else if (two.geometry instanceof Polygon) {
        console.error("Can't do that");
      }
    }
    if (one.geometry instanceof Polygon) {
      console.log("Rectangle");
      if (two.geometry instanceof Vector2) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Line) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Circle) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Rectangle) {
        return this.collision(two, one);
      }
      else if (two.geometry instanceof Polygon) {
        console.error("Can't do that");

      }
    }
  }

}
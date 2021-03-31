import Point from "./vector-2.js";
import Circle from "./circle.js";
import Rectangle from "./rectangle.js";

export default class{
  static inCollision(one, two){
    if(one instanceof Point){
      if(two instanceof Point){
        return false;
      }
      if(two instanceof Circle){
        let distance = one.distanceTo(new Point(two.x, two.y));
        if(distance < two.radius)
          return true;
        return false;
      }
      if(two instanceof Rectangle){
        return one.x >= two.x && one.y >= two.y && one.x <= two.x + two.width && one.y <= two.y + two.height;
      }
    }
    if(one instanceof Circle){
      if(two instanceof Point){
        return this.inCollision(two, one);
      }
      if(two instanceof Circle){
        let sumRadii = one.radius + two.radius
        return new Point(one.x, one.y).distanceTo(new Point(two.x, two.y)) < sumRadii;
      }
      if(two instanceof Rectangle){
        let objects = [];
        objects.push(new Circle(two.x, two.y, one.radius))
        objects.push(new Circle(two.x + two.width, two.y, one.radius))
        objects.push(new Circle(two.x+ two.width, two.y + two.height, one.radius))
        objects.push(new Circle(two.x, two.y + two.height, one.radius))
        objects.push(new Rectangle(two.x - one.radius, two.y, two.width + one.radius * 2, two.height))
        objects.push(new Rectangle(two.x , two.y - one.radius, two.width , two.height+ one.radius * 2))

        for(let object of objects){
          if(this.inCollision(new Point(one.x, one.y), object)){
            return true;
          }
        }
        return false;
      }
    }
    if(one instanceof Rectangle){
      if(two instanceof Point){
        return this.inCollision(two, one);
      }
      if(two instanceof Circle){
        return this.inCollision(two, one)
      }
      if(two instanceof Rectangle){
        let left = one.x;
        let right = one.x + one.width;
        let bottom = one.y;
        let top = one.y+one.height;
      }
    }
    return false;
  }
}
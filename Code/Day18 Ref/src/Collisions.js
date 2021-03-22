import Point from "./Point.js";
import Circle from "./Circle.js";

export default class{
  static inCollision(one, two){
    if(one instanceof Point){
      if(two instanceof Point){
        return false;
      }
      if(two instanceof Circle){
        let distance = one.distanceTo(new Point(two.x, two.y));
        if(distance < two.r)
          return true;
        return false;
      }
    }
    if(one instanceof Circle){
      if(two instanceof Point){
        return this.inCollision(two, one);
      }
      if(two instanceof Circle){
        return false;
      }
    }
    return false;
  }
}
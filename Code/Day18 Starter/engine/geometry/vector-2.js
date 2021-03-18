import Geometry from "./geometry.js"

export default  class Vector2{
  x;
  y;
  constructor(one, two){
    
    if(arguments.length == 0){
      this.x = 0; 
      this.y = 0;
      return;
    }
    if(arguments.length == 1){
      if(Array.isArray(one)){
        if(one.length != 2){
          //Bad array length
          throw "If you pass an array in as the Vector2 constructor, it must have at least two values"
        }
        this.x = one[0];
        this.y = one[1];
        return;
      }
      else{
        if((!one.x && one.x != 0) || (!one.y && one.y != 0)){
          throw "If you pass a non-array as a single arguments to the Vector2 constructor, it must have 'x' and 'y' keys";
          
        }
        this.x = one.x;
        this.y = one.y;
        return;
      }      
    }
    if(arguments.length == 2){
      this.x = one;
      this.y = two;
    }
  }

  static plus(one, two){
    return one.clone().plus(two);
  }
  static minus(one, two){
    return one.clone().minus(two);
  }
  static scale(one, scalar){
    return new Vector2(one.x * scalar, one.y * scalar);
  }

  plus(other){
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  minus(other){
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  scale(scalar){
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  length(){
    return Math.sqrt(this.lengthSquared())
  }
  lengthSquared(){
    return this.x * this.x + this.y * this.y;
  }
  static length(vector2){
    return Math.sqrt(vector2.lengthSquared())
  }
  static lengthSquared(vector2){
    return vector2.x * vector2.x + vector2.y * vector2.y;
  }

  distanceBetween(other){
    return Vector2.minus(this, other).length();
  }
  static distanceBetween(one, two){
    return one.distanceBetween(two);
  }

  clone(){
    return new Vector2(this.x, this.y);
  }
  static clone(one){
    return new Vector2(one.x, one.y);
  }


  static normalize(vector2){
    let toReturn = vector2.clone();
    toReturn.normalize();
    return toReturn;
  }

  normalize(){
    let length = this.length();
    this.x /= length;
    this.y /= length;
  }

  static equals(one, two){
    return one.x == two.x && one.y == two.y;
  }

  equals(other){
    return Vector2.equals(this, other);
  }
  closeTo(other){
    return Math.abs(this.x - other.x) < .000001 && Math.abs(this.y - other.y) < .000001
  }
  static closeTo(one, two){
    return one.closeTo(two);
  }


}
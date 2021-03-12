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
        if(one.length <= 1){
          //Bad array length
          console.error("If you pass an array in as the Vector2 constructor, it must have at least two values")
          return;
        }
        this.x = one[0];
        this.y = one[1];
        return;
      }
      else{
        if((!one.x && one.x != 0) || (!one.y && one.y != 0)){
          console.error("If you pass a non-array as a single arguments to the Vector2 constructor, it must have 'x' and 'y' keys")
          return;
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
    return new Vector2(one.x + two.x, one.y+two.y);
  }
  static minus(one, two){
    return new Vector2(one.x - two.x, one.y - two.y);
  }
  static scale(one, scalar){
    return new Vector2(one.x * scalar, one.y * scalar);
  }

  plus(other){
    this.x += other.x;
    this.y += other.y;
  }
  minus(other){
    this.x -= other.x;
    this.y -= other.y;
  }
  scale(scalar){
    this.x *= scalar;
    this.y *= scalar;
  }

  length(){
    return Math.sqrt(this.lengthSquared())
  }
  lengthSquared(){
    return this.x * this.x + this.y * this.y;
  }

  static normalize(vector2){
    let toReturn = new Vector2(vector2);
    toReturn.normalize();
    return toReturn;
  }

  normalize(){
    let length = this.getLength;
    this.x /= length;
    this.y /= length;
  }

  static equals(one, two){
    return one.x == two.x && one.y == two.y;
  }

  equals(other){
    return Vector2.equals(this, other);
  }

}
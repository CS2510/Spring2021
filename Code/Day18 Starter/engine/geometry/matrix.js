import Vector2 from "./vector-2.js"
import Vector3 from "./vector-3.js"

export default class Matrix {
  values = [];
  static identity = new Matrix();

  constructor() {
    console.log("Matrix constructor called with " + arguments.length + " arguments")
    if (arguments.length == 0) {
      //We're okay
      this.values = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    else if (arguments.length == 9) {
      this.values = arguments;
    }
    else {
      throw new "Wrong number of arguments";
    }

  }
  isIdentity() {
    this.equals(this.identity);
  }
  at(x,y){
    return this.values[3*y+x];
  }
  setAt(x,y, value){
    this.values[3*y+x] = value;
    return this;
  }
  equals(other){
    for(let i = 0; i < this.values.length; i++){
      if(other.values[i] != this.values[i]) return false;
    }
    return true;
  }
  get m11() { return this.at(0, 0) }
  get m12() { return this.at(0, 1) }
  get m13() { return this.at(0, 2) }
  get m21() { return this.at(1, 0) }
  get m22() { return this.at(1, 1) }
  get m23() { return this.at(1, 2) }
  get m31() { return this.at(2, 0) }
  get m32() { return this.at(2, 1) }
  get m33() { return this.at(2, 2) }

  row(r){
    return this.values.slice(0+3*r, 3+3*r);
  }

  multiply(other){
    if(other instanceof Vector2){
      return this.multiply(Vector3.fromVector2(other)).asVector2();

    }
    else if(other instanceof Vector3){
      let toReturn = new Vector3();
      for(let i = 0; i < 3; i++){
        let sum = 0;
        for(let j = 0; j < 3; j++){
          sum += other.asArray()[j] * this.row(i)[j];
        }
        toReturn.setAt(i, sum);
      }
      return toReturn;
    }
    else if(other instanceof Matrix){
      let toReturn = new Matrix();
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          let sum =0;
          for(let k = 0; k < 3; k++){
            sum += this.at(i,k)*other.at(k,j);
          }
          toReturn.setAt(i,j,sum);
        }

      }
      return toReturn;
    }
    else
      throw "Invalid argument to multiply."

  }


  static fromCtx(ctx) {
    let transform;
    try {
      transform = ctx.currentTransform;
    } catch (e) {
      console.error(e);
    }
    return new Matrix(transform.m11, transform.m12, transform.m14, transform.m21, transform.m22, transform.m24, 0, 0, 1)
  }
}
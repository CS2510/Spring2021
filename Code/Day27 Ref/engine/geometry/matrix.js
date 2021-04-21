import Vector2 from "./vector-2.js"
import Vector3 from "./vector-3.js"

export default class Matrix {
  values = [];
  static get identity() {
    return new Matrix();
  }

  constructor() {
    //console.log("Matrix constructor called with " + arguments.length + " arguments")
    if (arguments.length == 0) {
      //We're okay
      this.values = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    else if (arguments.length == 9) {
      this.values = [...arguments];
    }
    else {
      throw new "Wrong number of arguments";
    }

  }
  isIdentity() {
    return this.equals(Matrix.identity);
  }
  at(row, column) {
    if(row < 0 || row > 2 || column < 0 || column > 2) throw new Error("Invalid parameters")
    return this.values[3 * row + column];
  }
  setAt(row, column, value) {
    this.values[3 * row + column] = value;
    return this;
  }
  equals(other) {
    for (let i = 0; i < this.values.length; i++) {
      if (other.values[i] != this.values[i]) return false;
    }
    return true;
  }
  nearlyEquals(other) {
    let threshold = .00001;
    for (let i = 0; i < this.values.length; i++) {
      if (Math.abs(other.values[i] - this.values[i]) > threshold) return false;
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

  set m11(value) { return this.setAt(0, 0, value) }
  set m12(value) { return this.setAt(0, 1, value) }
  set m13(value) { return this.setAt(0, 2, value) }
  set m21(value) { return this.setAt(1, 0, value) }
  set m22(value) { return this.setAt(1, 1, value) }
  set m23(value) { return this.setAt(1, 2, value) }
  set m31(value) { return this.setAt(2, 0, value) }
  set m32(value) { return this.setAt(2, 1, value) }
  set m33(value) { return this.setAt(2, 2, value) }

  row(r) {
    return this.values.slice(0 + 3 * r, 3 + 3 * r);
  }

  static multiply(one, two) {
    return new Matrix(...one.values).multiply(two);
  }

  rotate(radians) {
    let other = new Matrix(
      Math.cos(radians), -Math.sin(radians), 0,
      Math.sin(radians), Math.cos(radians), 0,
      0, 0, 1
    )
    this.multiply(other);
    return this;
  }
  translate(one, two) {
    let other;
    if (!two && two != 0)
      other = new Matrix(
        1, 0, one.x,
        0, 1, one.y,
        0, 0, 1
      )
    else
      other = new Matrix(
        1, 0, one,
        0, 1, two,
        0, 0, 1
      )
    this.multiply(other);
    return this;
  }
  scale(one, two) {
    let other;
    if (!two && two != 0)
      other = new Matrix(
        one.x, 0, 0,
        0, one.y, 0,
        0, 0, 1
      );
    else
      other = new Matrix(
        one, 0, 0,
        0, two, 0,
        0, 0, 1
      );
    this.multiply(other);
    return this;
  }
  multiply(other) {
    if (other instanceof Vector2) {
      return this.multiply(Vector3.fromVector2(other)).asVector2();

    }
    else if (other instanceof Vector3) {
      let toReturn = new Vector3();
      for (let i = 0; i < 3; i++) {
        let sum = 0;
        for (let j = 0; j < 3; j++) {
          sum += other.asArray()[j] * this.row(i)[j];
        }
        toReturn.setAt(i, sum);
      }
      return toReturn;
    }
    else if (other instanceof Matrix) {
      let toReturn = new Matrix();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let sum = 0;
          for (let k = 0; k < 3; k++) {
            sum += this.at(i, k) * other.at(k, j);
          }
          toReturn.setAt(i, j, sum);
        }

      }
      this.values = toReturn.values;
      return this;
    }
    else
      throw "Invalid argument to multiply."

  }
  extractTranslation() {
    return new Vector2(this.m13, this.m23);
  }
  extractRotation() {
    //return Math.asin(this.m21);
    return Math.atan(this.m21/this.m22);

  }
  extractScale() {
    let cosineOfRotation = Math.cos(this.extractRotation());
    return new Vector2(this.m11 / cosineOfRotation, this.m22 / cosineOfRotation);
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
  inverse(){
    let a = this.m11;
    let b = this.m12;
    let c = this.m21;
    let d = this.m22;
    let dx = this.m13;
    let dy = this.m23;
    let determinantScaleRotate = 1/(a*d-b*c);
    this.m11 = determinantScaleRotate * d;
    this.m12 = determinantScaleRotate * -b;
    this.m21 = determinantScaleRotate * -c;
    this.m22 = determinantScaleRotate * a;
    this.m13 = -dx;
    this.m23 = -dy;
    return this;

  }
  static inverse(m){
    return new Matrix(m).invert();
  }
}
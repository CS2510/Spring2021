import canvas from "canvas";
import chai from "chai";
import sinon from "sinon";
import chaiAlmost from "chai-almost";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAlmost(.1));

import Matrix from "../engine/geometry/matrix.js"
import Vector2 from "../engine/geometry/vector-2.js"
import Vector3 from "../engine/geometry/vector-3.js"
import * as EngineGeometry from "../engine/geometry/engine-geometry.js"

describe("Matrix", function(){
  describe("Constructor", function(){
    it("It creates an array of values", function(){
      let matrix = new Matrix();
      expect(matrix.values).to.be.an("array");
    })
    it("It creates the identity matrix when there are no arguments", function(){
      let matrix = new Matrix();
      for(let i = 0; i < matrix.values; i++){
        if(i%3==0)
          expect(matrix.values[i]).to.equal(1);
        else
          expect(matrix.values[i]).to.equal(0);

      }
    })
    it("Throws an exception with the wrong number of arguments", function(){
      for(let i = 1; i < 9; i++){
        let array = new Array(i);
        expect(()=>new Matrix(array)).to.throw();
      }
    })
    it("Accepts nine arguments", function(){
      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      for(let i = 0; i < 9; i++){
        expect(matrix.values[i]).to.equal(i);
      }
    })
    it("Retrieves values with getters", function(){
      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      expect(matrix.m11).to.equal(0);
      expect(matrix.m12).to.equal(1);
      expect(matrix.m13).to.equal(2);
      expect(matrix.m21).to.equal(3);
      expect(matrix.m22).to.equal(4);
      expect(matrix.m23).to.equal(5);
      expect(matrix.m31).to.equal(6);
      expect(matrix.m32).to.equal(7);
      expect(matrix.m33).to.equal(8);
    })
  })

  describe("Is Identity", function(){
    it("Detects the identity matrix", function(){
      let matrix = new Matrix();
      expect(matrix.isIdentity()).to.be.true;
    })
    it("Detects a non-identity matrix", function(){
      let matrix = new Matrix(1,2,3,4,5,6,7,8,9);
      expect(matrix.isIdentity()).to.be.false;
    })
  })
  describe("at", function(){
    it("Returns the matrix value at the given position", function(){
      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      expect(matrix.at(0,0)).to.equal(0);
      expect(matrix.at(0,1)).to.equal(1);
      expect(matrix.at(0,2)).to.equal(2);
      expect(matrix.at(1,0)).to.equal(3);
      expect(matrix.at(1,1)).to.equal(4);
      expect(matrix.at(1,2)).to.equal(5);
      expect(matrix.at(2,0)).to.equal(6);
      expect(matrix.at(2,1)).to.equal(7);
      expect(matrix.at(2,2)).to.equal(8);

      expect(()=>matrix.at(-1,1)).to.throw();
      expect(()=>matrix.at(1,-1)).to.throw();
      expect(()=>matrix.at(4,1)).to.throw();
      expect(()=>matrix.at(1,4)).to.throw();
      
    })
  })
  describe("Set at", function(){
    it("Sets the correct value", function(){
      let matrix = new Matrix();
      for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
          let value = Math.random();
          matrix.setAt(row, col, value);
          expect(matrix.at(row, col)).to.equal(value);
        }
      }
    })
  })
  describe("Equals", function(){
    it("Identifies equal matrices", function(){
      expect(Matrix.identity.equals(Matrix.identity)).to.be.true;

      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      expect(matrix.equals(Matrix.identity)).to.be.false;
      expect(Matrix.identity.equals(matrix)).to.be.false;
    })
  })
  describe("Nearly Equals", function(){
    it("Identifies nearly equal matrices", function(){
      expect(Matrix.identity.nearlyEquals(Matrix.identity)).to.be.true;

      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      expect(matrix.nearlyEquals(Matrix.identity)).to.be.false;
      expect(Matrix.identity.nearlyEquals(matrix)).to.be.false;

      matrix = new Matrix();
      matrix.setAt(0,0,1.1);
      expect(matrix.nearlyEquals(Matrix.identity)).to.be.false;
      expect(Matrix.identity.nearlyEquals(matrix)).to.be.false;
      matrix.setAt(0,0,1.000009);
      expect(matrix.nearlyEquals(Matrix.identity)).to.be.true;
      expect(Matrix.identity.nearlyEquals(matrix)).to.be.true;

    })
  })
  describe("row", function(){
    it("Returns the correct row", function(){
      let matrix = new Matrix(0, 1,2,3,4,5,6,7,8);
      expect(matrix.row(0).toString()).to.equal([0,1,2].toString())
      expect(matrix.row(1).toString()).to.equal([3,4,5].toString())
      expect(matrix.row(2).toString()).to.equal([6,7,8].toString())

    })
  })
  describe("fromCtx",function(){
    it("Grabs the correct values", function(){
      let ctx = canvas.createCanvas(200, 200).getContext('2d');
      let matrix = Matrix.fromCtx(ctx);
      expect(matrix.equals(Matrix.identity)).to.be.true;
    })
  })
  describe("mulitply", function(){
    it("Multiplies by Vector2", function(){
      let vector2 = new Vector2(2,3)
      let matrix = Matrix.identity;
      let result = matrix.multiply(vector2);
      expect(result.x).to.equal(2);
      expect(result.y).to.equal(3);
      expect(result).to.be.instanceOf(Vector2);

    })
    it("Multiplies by Vector3s", function(){
      let vector3 = new Vector3(2,3,1)
      let matrix = Matrix.identity;
      let result = matrix.multiply(vector3);
      expect(result.x).to.equal(2);
      expect(result.y).to.equal(3);
      expect(result.z).to.equal(1);
      expect(result.w).to.equal(1);
      expect(result).to.be.instanceOf(Vector3);


    })
    it("Multiplies by Matrices", function(){
      let one = new Matrix();
      let two = new Matrix();
      let result = one.multiply(two);
      expect(result.equals(Matrix.identity)).to.be.true;
      expect(result).to.be.instanceOf(Matrix);

      one = new Matrix(0,1,2,3,4,5,6,7,8);
      two = new Matrix();
      result = one.multiply(two);
      expect(result.equals(new Matrix(0,1,2,3,4,5,6,7,8))).to.be.true;
      expect(result).to.be.instanceOf(Matrix);

      one = new Matrix(0,1,2,3,4,5,6,7,8);
      two = new Matrix(0,1,2,3,4,5,6,7,8);
      result = one.multiply(two);
      expect(result.equals(new Matrix(15, 18, 21, 42, 54, 66, 69, 90, 111))).to.be.true;
      expect(result).to.be.instanceOf(Matrix);

    })
  })
  describe("Rotate", function(){
    let matrix = new Matrix();
    matrix.rotate(.1);
    expect(matrix.m11).to.almost.equal(Math.cos(.1))
    expect(matrix.m12).to.almost.equal(-Math.sin(.1))
    expect(matrix.m13).to.almost.equal(0)
    expect(matrix.m21).to.almost.equal(Math.sin(.1))
    expect(matrix.m22).to.almost.equal(Math.cos(.1))
    expect(matrix.m23).to.almost.equal(0)
    expect(matrix.m31).to.almost.equal(0)
    expect(matrix.m32).to.almost.equal(0)
    expect(matrix.m33).to.almost.equal(1)
  })
  describe("Extracts", function(){
    it("Extracts the correct translation", function(){
      let matrix = new Matrix(
        1,0,1,
        0,1,2,
        0,0,1
      );
      let extracted = matrix.extractTranslation();
      expect(extracted.equals(new Vector2(1,2))).to.be.true;
    })
    it("Extracts the correct scale", function(){
      let matrix = new Matrix(
        3,0,1,
        0,4,2,
        0,0,1
      );
      let extracted = matrix.extractScale();
      expect(extracted.equals(new Vector2(3,4))).to.be.true;
    })
    it("Extracts the correct rotation", function(){
      let theta = Math.PI/2;
      let c = Math.cos(theta);
      let s = Math.sin(theta);
      let matrix = new Matrix(
        c,-s,0,
        s,c,0,
        0,0,1
      );
      let extracted = matrix.extractRotation();
      expect(extracted).to.equal(theta);
    })
    it("Extracts the correct rotation after scaling", function(){
      let thetas = [Math.PI/6];
      let scales = [[1,1], [2,3]]
      for(let theta of thetas){
        for(let scale of scales){
          let scaledRotated = Matrix.identity.scale(scale[0], scale[1]).rotate(theta)
          let extractedRotation = scaledRotated.extractRotation();
          console.log(theta + ": " + scale);
          expect(extractedRotation).to.almost.equal(theta);
          let extractedScale = scaledRotated.extractScale();
          expect(extractedScale.x).to.almost.equal(scale[0])
          expect(extractedScale.y).to.almost.equal(scale[1])
        }
      }
      
      
    })
    it("Extracts the correct scale of compound matrix", function(){
      let theta = Math.PI/2;
      let c = Math.cos(theta);
      let s = Math.sin(theta);

      let sx = 3;
      let sy = 4;
      let matrix = new Matrix(
        sx*c,sx*-s,0,
        sy*s,sy*c,0,
        0,0,1
      );
      let extracted = matrix.extractRotation();
      expect(extracted).to.equal(theta);
    })
    it("Extracts the correct rotation of compound matrix", function(){
      let theta = Math.PI/2;
      let c = Math.cos(theta);
      let s = Math.sin(theta);
      let sx = 3;
      let sy = 4
      let matrix = new Matrix(
        sx*c,sx*-s,0,
        sy*s,sy*c,0,
        0,0,1
      );
      let extracted = matrix.extractScale();
      expect(extracted.equals(new Vector2(sx, sy))).to.be.true;
    })
  })
})
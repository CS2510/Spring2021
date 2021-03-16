import canvas from "canvas";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import Matrix from "../engine/geometry/matrix.js"
import Vector2 from "../engine/geometry/vector-2.js"
import Vector3 from "../engine/geometry/vector-3.js"
import * as EngineGeometry from "../engine/geometry/engine-geometry.js"

describe("Matrix", function(){
  describe("Constructor", function(){
    it("Reports the correct number of arguments", function(){
      let matrix = new Matrix();
      expect(matrix.values).to.be.an("array");
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
})
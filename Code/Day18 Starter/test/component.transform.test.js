import chai from "chai";
const expect = chai.expect;
import TransformComponent from "../engine/components/transform-component.js"
import { GameObject } from "../engine/engine.js";
import Matrix from "../engine/geometry/matrix.js"


describe("TransformComponent", function () {

  describe("constructor", function () {
    it("Constructs properly", function () {
      let gameObject = new GameObject("No Name");
      let transform = new TransformComponent(gameObject);
      expect(transform.gameObject).to.equal(gameObject);
      expect(transform.position.x).to.equal(0);
      expect(transform.position.y).to.equal(0);
      expect(transform.scale.x).to.equal(1);
      expect(transform.scale.y).to.equal(1);
      expect(transform.rotation).to.equal(0);
    });
  });
  describe("localMatrix getter", function () {
    it("Works on identity", function () {
      let gameObject = new GameObject("No Name");
      let transform = new TransformComponent(gameObject);
      let matrix = transform.localMatrix;
      expect(matrix.equals(Matrix.identity)).to.be.true;

    })
    it("Works on translate only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.translate(1,2)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.equals(Matrix.identity.translate(1,2))).to.be.true;

    })
    it("Works on scale only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(2,3)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.equals(Matrix.identity.scale(2,3))).to.be.true;

    })
    it("Works on rotate only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.equals(Matrix.identity.rotate(Math.PI))).to.be.true;

    })
    it("Works on rotate and scale only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.scaleBy(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.rotate(Math.PI).scale(3,4))).to.be.true;
      expect(matrix.nearlyEquals(Matrix.identity.scale(3,4).rotate(Math.PI))).to.be.true;

      
      gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(3,4)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.rotate(Math.PI).scale(3,4))).to.be.true;
      expect(matrix.nearlyEquals(Matrix.identity.scale(3,4).rotate(Math.PI))).to.be.true;



    })
    it("Works on rotate and transform only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.rotate(Math.PI).translate(3,4))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.rotate(Math.PI).translate(3,4))).to.be.true;
    })
    it("Works on scale and transform only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).translate(3,4))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).translate(3,4))).to.be.true;
    })
    it("Works on scale, rotate, and  transform", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;
     
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.scale(5,6).rotate(Math.PI).translate(3,4))).to.be.true;
     


    })
  })
});
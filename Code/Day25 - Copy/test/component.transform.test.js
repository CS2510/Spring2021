import chai from "chai";
const expect = chai.expect;
import TransformComponent from "../engine/components/transform-component.js"
import { GameObject, Vector2 } from "../engine/engine.js";
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
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).rotate(Math.PI))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).rotate(Math.PI))).to.be.true;
    })
    it("Works on scale and transform only", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6))).to.be.true;
    })
    it("Works on scale, rotate, and  transform", function () {
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
      
      
      gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.translate(3,4)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;

      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.scaleBy(5,6)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
     
      gameObject = new GameObject("No Name");
      gameObject.transform.translate(3,4)
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.rotate(Math.PI)
      matrix = gameObject.transform.localMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
     


    })
  })
  describe("worldMatrix getter", function(){
    it("Works on child of scene", function(){
      let gameObject = new GameObject("No Name");
      gameObject.transform.scaleBy(5,6)
      gameObject.transform.rotate(Math.PI)
      gameObject.transform.translate(3,4)
      let matrix = gameObject.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
    })
    it("Works on child of identity", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      parent.addChild(child);
      child.transform.scaleBy(5,6)
      child.transform.rotate(Math.PI)
      child.transform.translate(3,4)
      let matrix = child.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
    })
    it("Works on identity child", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.scaleBy(5,6)
      parent.transform.rotate(Math.PI)
      parent.transform.translate(3,4)
      let matrix = child.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(3,4).scale(5,6).rotate(Math.PI))).to.be.true;
    })
    it("Works on offset parent and  child", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      child.transform.translate(5,6);
      let matrix = child.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(8,10))).to.be.true;
    })
    it("Works on offset/rotated parent and  child", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      parent.transform.rotate(Math.PI/2);
      child.transform.translate(1,0);
      let value = child.transform.worldMatrix.extractTranslation();
      expect(value.equals(new Vector2(3,5))).to.be.true;


      parent = new GameObject("Parent");
      child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      parent.transform.rotate(-Math.PI/2);
      child.transform.translate(1,0);
      value = child.transform.worldMatrix.extractTranslation();
      expect(value.equals(new Vector2(3,3))).to.be.true;


      parent = new GameObject("Parent");
      child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      parent.transform.rotate(Math.PI);
      child.transform.translate(1,0);
      value = child.transform.worldMatrix.extractTranslation();
      expect(value.equals(new Vector2(2,4))).to.be.true;

      parent = new GameObject("Parent");
      child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      parent.transform.rotate(-Math.PI);
      child.transform.translate(1,0);
      value = child.transform.worldMatrix.extractTranslation();
      expect(value.equals(new Vector2(2,4))).to.be.true;


    })
    it("Works on offset/scaled parent and  child", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      parent.addChild(child);
      parent.transform.translate(3,4)
      parent.transform.scaleBy(5,6);
      child.transform.translate(1,1);
      let value = child.transform.worldMatrix.extractTranslation();
      expect(value.equals(new Vector2(8,10))).to.be.true;
    })
    it("Works on offset parent, child, and grandchild", function(){
      let parent = new GameObject("Parent");
      let child = new GameObject("Child");
      let grandchild = new GameObject("Child");
      child.addChild(grandchild);
      parent.addChild(child);
      parent.transform.translate(3,4)
      child.transform.translate(5,6);
      grandchild.transform.translate(7,8);
      let matrix = grandchild.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(15,18))).to.be.true;

      expect(parent.transform.localPosition.equals(new Vector2(3,4))).to.be.true;
      expect(child.transform.localPosition.equals(new Vector2(5,6))).to.be.true;
      expect(grandchild.transform.localPosition.equals(new Vector2(7,8))).to.be.true;

      expect(parent.transform.worldPosition.equals(new Vector2(3,4))).to.be.true;
      expect(child.transform.worldPosition.equals(new Vector2(8,10))).to.be.true;
      expect(grandchild.transform.worldPosition.equals(new Vector2(15,18))).to.be.true;

      parent = new GameObject("Parent");
      child = new GameObject("Child");
      grandchild = new GameObject("Child");
      parent.addChild(child);
      child.addChild(grandchild);
      parent.transform.translate(3,4)
      child.transform.translate(5,6);
      grandchild.transform.translate(7,8);
      matrix = grandchild.transform.worldMatrix;
      expect(matrix.nearlyEquals(Matrix.identity.translate(15,18))).to.be.true;
    })


  })
});
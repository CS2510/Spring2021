import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import Geometry from "../engine/geometry/geometry.js"
import * as EngineGeometry from "../engine/geometry/engine-geometry.js"

describe("Geometry", function () {
  describe("Collision", function () {
    it("Handles Vector2/Vector2 collisions", function () {
      let one = {
        geometry: new EngineGeometry.Vector2(0, 0),
        matrix: EngineGeometry.Matrix.identity
      };
      let two = {
        geometry: new EngineGeometry.Vector2(0, 0),
        matrix: EngineGeometry.Matrix.identity
      };
      let three = {
        geometry: new EngineGeometry.Vector2(1, 2),
        matrix: EngineGeometry.Matrix.identity
      }
      let four = {
        geometry: new EngineGeometry.Vector2(1, 2),
        matrix: new EngineGeometry.Matrix(1, 0, -1, 0, 1, -2, 0, 0, 1)
      }

      let five = {
        geometry: new EngineGeometry.Vector2(0, 1),
        matrix: EngineGeometry.Matrix.identity
      }

      let rotationMatrix = EngineGeometry.Matrix.identity;
      rotationMatrix.rotate(Math.PI / 2);

      let six = {
        geometry: new EngineGeometry.Vector2(1, 0),
        matrix: rotationMatrix
      }



      expect(Geometry.collision(one, two)).to.be.true
      expect(Geometry.collision(one, three)).to.be.false
      expect(Geometry.collision(one, four)).to.be.true
      let r = Geometry.collision(five, six);
      expect(r).to.be.true;
    })
    it("Handles Vector2/Circle Collisions", function () {
      let one = {
        geometry: new EngineGeometry.Vector2(0, 0),
        matrix: EngineGeometry.Matrix.identity
      };
      let two = {
        geometry: new EngineGeometry.Vector2(0, 0),
        matrix: EngineGeometry.Matrix.identity.translate(1,1)
      }
      let three = {
        geometry: new EngineGeometry.Vector2(1, 1),
        matrix: EngineGeometry.Matrix.identity
      }

      let four = {
        geometry: new EngineGeometry.Vector2(9,9),
        matrix: EngineGeometry.Matrix.identity
      }

      let cOne = {
        geometry: new EngineGeometry.Circle(1),
        matrix: EngineGeometry.Matrix.identity
      }
      let cTwo = {
        geometry: new EngineGeometry.Circle(10),
        matrix: EngineGeometry.Matrix.identity.translate(10,10)
      }

      expect(Geometry.collision(one, cOne)).to.be.true;
      expect(Geometry.collision(cOne, one)).to.be.true;


      expect(Geometry.collision(two, cOne)).to.be.false
      expect(Geometry.collision(cOne, two)).to.be.false
      expect(Geometry.collision(three, cOne)).to.be.false
      expect(Geometry.collision(cOne, three)).to.be.false

      expect(Geometry.collision(one, cTwo)).to.be.false;
      expect(Geometry.collision(two, cTwo)).to.be.false;
      expect(Geometry.collision(three, cTwo)).to.be.false;
      
      expect(Geometry.collision(four, cTwo)).to.be.true;
      

    })
  })
})
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import Collisions from "../engine/geometry/collisions.js"

function quickCollision(oneGeometry, oneMatrix, twoGeometry, twoMatrix) {
  return Collisions.collision({ geometry: oneGeometry, matrix: oneMatrix }, {
    geometry: twoGeometry, matrix: twoMatrix
  })
}

describe("Collisions", function () {
  describe("Collision", function () {
    it("Handles Vector2/Vector2 collisions", function () {
      let one = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity
      };
      let two = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity
      };
      let three = {
        geometry: new Geometry.Vector2(1, 2),
        matrix: Geometry.Matrix.identity
      }
      let four = {
        geometry: new Geometry.Vector2(1, 2),
        matrix: new Geometry.Matrix(1, 0, -1, 0, 1, -2, 0, 0, 1)
      }

      let five = {
        geometry: new Geometry.Vector2(0, 1),
        matrix: Geometry.Matrix.identity
      }

      let rotationMatrix = Geometry.Matrix.identity;
      rotationMatrix.rotate(Math.PI / 2);

      let six = {
        geometry: new Geometry.Vector2(1, 0),
        matrix: rotationMatrix
      }



      expect(Collisions.collision(one, two)).to.be.true
      expect(Collisions.collision(one, three)).to.be.false
      expect(Collisions.collision(one, four)).to.be.true
      let r = Collisions.collision(five, six);
      expect(r).to.be.true;
    })
    it("Handles Vector2/Circle Collisions", function () {
      let one = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity
      };
      let two = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity.translate(1, 1)
      }
      let three = {
        geometry: new Geometry.Vector2(1, 1),
        matrix: Geometry.Matrix.identity
      }

      let four = {
        geometry: new Geometry.Vector2(9, 9),
        matrix: Geometry.Matrix.identity
      }

      let cOne = {
        geometry: new Geometry.Circle(1),
        matrix: Geometry.Matrix.identity
      }
      let cTwo = {
        geometry: new Geometry.Circle(10),
        matrix: Geometry.Matrix.identity.translate(10, 10)
      }

      expect(Collisions.collision(one, cOne)).to.be.true;
      expect(Collisions.collision(cOne, one)).to.be.true;


      expect(Collisions.collision(two, cOne)).to.be.false
      expect(Collisions.collision(cOne, two)).to.be.false
      expect(Collisions.collision(three, cOne)).to.be.false
      expect(Collisions.collision(cOne, three)).to.be.false

      expect(Collisions.collision(one, cTwo)).to.be.false;
      expect(Collisions.collision(two, cTwo)).to.be.false;
      expect(Collisions.collision(three, cTwo)).to.be.false;

      expect(Collisions.collision(four, cTwo)).to.be.true;


    })
    it("Handles advanced Vector2/Circle Collisions", function () {
      let vector2 = new Geometry.Vector2(10, 10);
      let vector2Matrix = Geometry.Matrix.identity;
      let elipse = new Geometry.Circle(1);
      let elipseMatrix = Geometry.Matrix.identity.scale(2, 1).rotate(Math.PI / 3)
      expect(quickCollision(vector2, vector2Matrix, elipse, elipseMatrix)).to.be.false;

      elipse = new Geometry.Circle(1);
      elipseMatrix = Geometry.Matrix.identity.translate(10, 10).scale(2, 1).rotate(Math.PI / 3)
      expect(quickCollision(vector2, vector2Matrix, elipse, elipseMatrix)).to.be.true;


    })
    it("Handles Vector2/Circle Collisions with scale", function () {
      let one = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity
      };
      let two = {
        geometry: new Geometry.Vector2(0, 0),
        matrix: Geometry.Matrix.identity.translate(1, 1)
      }
      let three = {
        geometry: new Geometry.Vector2(1, 1),
        matrix: Geometry.Matrix.identity
      }

      let four = {
        geometry: new Geometry.Vector2(2, 9),
        matrix: Geometry.Matrix.identity
      }

      let five = {
        geometry: new Geometry.Vector2(2, 0),
        matrix: Geometry.Matrix.identity
      }

      let six = {
        geometry: new Geometry.Vector2(0, .5),
        matrix: Geometry.Matrix.identity
      }

      let seven = {
        geometry: new Geometry.Vector2(-.1, -.1),
        matrix: Geometry.Matrix.identity
      }

      let cOne = {
        geometry: new Geometry.Circle(1),
        matrix: Geometry.Matrix.identity
      }
      let cTwo = {
        geometry: new Geometry.Circle(1),
        matrix: Geometry.Matrix.identity.scale(2, .5)
      }

      expect(Collisions.collision(one, cOne)).to.be.true;
      expect(Collisions.collision(cOne, one)).to.be.true;


      expect(Collisions.collision(two, cOne)).to.be.false
      expect(Collisions.collision(cOne, two)).to.be.false
      expect(Collisions.collision(three, cOne)).to.be.false
      expect(Collisions.collision(cOne, three)).to.be.false

      expect(Collisions.collision(one, cTwo)).to.be.true;
      expect(Collisions.collision(two, cTwo)).to.be.false;
      expect(Collisions.collision(three, cTwo)).to.be.false;

      expect(Collisions.collision(four, cTwo)).to.be.false;
      expect(Collisions.collision(five, cTwo)).to.be.true;
      expect(Collisions.collision(six, cTwo)).to.be.true;


    })
    it("Handles Vector2/Rectangle Collisions", function () {
      let one = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity };
      let r = { geometry: new Geometry.Rectangle(100, 100), matrix: Geometry.Matrix.identity };

      let result = Collisions.collision(one, r);
      expect(result).to.be.true;

      let two = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(-50, -50) };
      result = Collisions.collision(two, r);
      expect(result).to.be.true;

      let three = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(50, -50) };
      result = Collisions.collision(three, r);
      expect(result).to.be.true;

      let four = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(75, 75) };
      result = Collisions.collision(four, r);
      expect(result).to.be.false;


    })
    it("Handles Vector2/Rectangle Collisions with rotations", function () {
      let one = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity };
      let r = { geometry: new Geometry.Rectangle(100, 100), matrix: Geometry.Matrix.identity.rotate(Math.PI / 4) };

      let result = Collisions.collision(one, r);
      expect(result).to.be.true;

      let two = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(-50, -50) };
      result = Collisions.collision(two, r);
      expect(result).to.be.false;

      let three = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(50, -50) };
      result = Collisions.collision(three, r);
      expect(result).to.be.false;

      let four = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(75, 75) };
      result = Collisions.collision(four, r);
      expect(result).to.be.false;

      let five = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate((50 - .1) * Math.sqrt(2), 0) };
      result = Collisions.collision(five, r);
      expect(result).to.be.true;




    })
    it("Handles Vector2/Rectangle Collisions with offsets", function () {
      let one = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity };
      let r = { geometry: new Geometry.Rectangle(100, 100), matrix: Geometry.Matrix.identity.translate(200, 200) };

      let result = Collisions.collision(one, r);
      expect(result).to.be.false;

      let two = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(-50, -50) };
      result = Collisions.collision(two, r);
      expect(result).to.be.false;

      let three = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(50, -50) };
      result = Collisions.collision(three, r);
      expect(result).to.be.false;

      let four = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(75, 75) };
      result = Collisions.collision(four, r);
      expect(result).to.be.false;

      let five = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(200, 200) };
      result = Collisions.collision(five, r);
      expect(result).to.be.true;




    })
    it("Handles Vector2/Rectangle Collisions with scales", function () {
      let one = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity };
      let r = { geometry: new Geometry.Rectangle(100, 100), matrix: Geometry.Matrix.identity.scale(.5, .5) };

      let result = Collisions.collision(one, r);
      expect(result).to.be.true;

      let two = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(-50, -50) };
      result = Collisions.collision(two, r);
      expect(result).to.be.false;

      let three = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(25, -25) };
      result = Collisions.collision(three, r);
      expect(result).to.be.true;

      let four = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(75, 75) };
      result = Collisions.collision(four, r);
      expect(result).to.be.false;

      let five = { geometry: new Geometry.Vector2(), matrix: Geometry.Matrix.identity.translate(200, 200) };
      result = Collisions.collision(five, r);
      expect(result).to.be.false;




    })
  })
})
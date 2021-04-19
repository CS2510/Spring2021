import chai from "chai";
const expect = chai.expect;
import Vector2 from "../engine/geometry/vector-2.js"

describe("Vector2", function () {
  this.timeout(0);
  describe("length", function () {
    it("Works properly [member]", function () {
      let vector2 = new Vector2(3,4);
      expect(vector2.length()).to.equal(5);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(-3,-4);
      expect(Vector2.length(vector2)).to.equal(5);
    });
  });
  describe("lengthSquared", function () {
    it("Works properly [member]", function () {
      let vector2 = new Vector2(-3,4);
      expect(vector2.lengthSquared()).to.equal(25);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(3,-4);
      expect(Vector2.lengthSquared(vector2)).to.equal(25);
    });
  });
  describe("constructor", function () {
    it("Works properly", function () {
      let vector = new Vector2();
      expect(vector.x).to.equal(0);
      expect(vector.y).to.equal(0);

      vector = new Vector2([0, 0]);
      expect(vector.x).to.equal(0);
      expect(vector.y).to.equal(0);

      vector = new Vector2(0, 0);
      expect(vector.x).to.equal(0);
      expect(vector.y).to.equal(0);

      vector = new Vector2([1, 2]);
      expect(vector.x).to.equal(1);
      expect(vector.y).to.equal(2);


      vector = new Vector2(3, 4);
      expect(vector.x).to.equal(3);
      expect(vector.y).to.equal(4);

      vector = new Vector2({ x: 5, y: 6 });
      expect(vector.x).to.equal(5);
      expect(vector.y).to.equal(6);
    });
    it("Throws errors on bad arguments", function () {
      expect(() => new Vector2(1)).to.throw();
      expect(() => new Vector2([1])).to.throw();
      expect(() => new Vector2({ x: 1 })).to.throw();
    })
  });
  describe("plus", function () {
    it("Works properly [mutator]", function () {
      let vector2 = new Vector2(1, 2);
      let other = new Vector2(3, 4);
      vector2.plus(other);
      expect(vector2.x).to.equal(4);
      expect(vector2.y).to.equal(6);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(1, 2);
      let other = new Vector2(3, 4);
      let result = Vector2.plus(vector2, other);
      expect(result.x).to.equal(4);
      expect(result.y).to.equal(6);
    });
  });
  describe("minus", function () {
    it("Works properly [mutator]", function () {
      let vector2 = new Vector2(1, 2);
      let other = new Vector2(3, 4);
      vector2.minus(other);
      expect(vector2.x).to.equal(-2);
      expect(vector2.y).to.equal(-2);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(1, 2);
      let other = new Vector2(3, 4);
      let result = Vector2.minus(vector2, other);
      expect(result.x).to.equal(-2);
      expect(result.y).to.equal(-2);
    });
  });
  describe("scale", function () {
    it("Works properly [mutator]", function () {
      let vector2 = new Vector2(1, 2);
      vector2.scale(-1);
      expect(vector2.x).to.equal(-1);
      expect(vector2.y).to.equal(-2);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(1, 2);
      let result = Vector2.scale(vector2, -1);
      expect(result.x).to.equal(-1);
      expect(result.y).to.equal(-2);
    });
  });
  describe("normalize", function () {
    it("Works properly [mutator]", function () {
      let vector2 = new Vector2(3, 4);
      vector2.normalize();
      expect(vector2.x).to.equal(3 / 5);
      expect(vector2.y).to.equal(4 / 5);
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(3, 4);
      let result = Vector2.normalize(vector2);
      expect(result.x).to.equal(3 / 5);
      expect(result.y).to.equal(4 / 5);
    });
  });
  describe("equals", function () {
    it("Works properly [member]", function () {
      let vector2 = new Vector2(3, 4);
      let same = new Vector2(3, 4)
      let different = new Vector2(3, 5)

      expect(vector2.equals(same)).to.be.true;
      expect(vector2.equals(different)).to.be.false;
    });
    it("Works properly [static]", function () {
      let vector2 = new Vector2(3, 4);
      let same = new Vector2(3, 4)
      let different = new Vector2(3, 5)

      expect(Vector2.equals(vector2, same)).to.be.true;
      expect(Vector2.equals(vector2, different)).to.be.false;
    });
  });
});
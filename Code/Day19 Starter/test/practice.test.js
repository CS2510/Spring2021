import chai from "chai";
import Point from "../src/Point.js"
import Circle from "../src/Circle.js"
import Collisions from "../src/Collisions.js"
const expect = chai.expect;

describe("Game Collisions", function(){
  it("Collides origin point and unity spheres", function(){

    let originPoint = new Point(0,0);
    let unitCircle = new Circle(0, 0, 1);

    expect(Collisions.inCollision(originPoint, unitCircle)).to.be.true;
  })
})
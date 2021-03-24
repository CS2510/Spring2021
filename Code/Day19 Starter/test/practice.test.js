import chai from "chai";
import Point from "../src/Point.js"
import Circle from "../src/Circle.js"
import Collisions from "../src/Collisions.js"
import Rectangle from "../src/Rectangle.js";
const expect = chai.expect;

describe("Game Collisions", function(){
  it("Collides origin point and unity spheres", function(){

    let originPoint = new Point(0,0);
    let unitCircle = new Circle(0, 0, 1);
    let unitRectangle = new Rectangle(0, 0, 1, 1);

    expect(Collisions.inCollision(originPoint, unitCircle)).to.be.true;
    expect(Collisions.inCollision(originPoint, unitRectangle)).to.be.true;
    expect(Collisions.inCollision(unitCircle, unitRectangle)).to.be.true;
    expect(Collisions.inCollision(new Circle(-2,0,1), unitRectangle)).to.be.false;
    expect(Collisions.inCollision(new Circle(1.2,1.2,.33), unitRectangle)).to.be.true;
    expect(Collisions.inCollision(new Circle(.5, .5, .1), unitRectangle)).to.be.true;
    expect(Collisions.inCollision(new Circle(.5, .5, 3), unitRectangle)).to.be.true;
    expect(Collisions.inCollision(new Circle(-.4, .6, .446), unitRectangle)).to.be.true;
    expect(Collisions.inCollision(new Circle(1,1,.1), unitRectangle)).to.be.true;
    
  })
})
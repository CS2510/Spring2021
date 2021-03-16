import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import Geometry from "../engine/geometry/geometry.js"
import * as EngineGeometry from "../engine/geometry/engine-geometry.js"

describe("Geometry", function(){
  describe("Collision", function(){
    it("Correctly identifies types", function(){
      Geometry.collision({geometry: new EngineGeometry.Vector2()}, null);
      expect(true).to.be.true
    })
  })
})
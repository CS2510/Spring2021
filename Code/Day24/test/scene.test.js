import chai from "chai";
const expect = chai.expect;
import Scene from "../engine/scene.js"

import * as Scenes from "./scenes/test-scenes.js"

describe("Scene", function(){
	describe("constructor", function(){
		it("Works properly", function(){
			let scene = new Scene();
			expect(scene.children.length).to.equal(0);
		});
	});
	describe("deserializeObject", function(){
		it("Works properly", function(){
			//TODO: Add Test
		});
	});
	describe("deserialize", function(){
		it("Works properly", function(){
			let result = Scene.deserialize(Scenes.EmptyScene)
			expect(result.children.length).to.equal(0);
			expect(result.name).to.equal("Empty");
		});
	});
});
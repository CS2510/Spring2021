import chai from "chai";
const expect = chai.expect;
import Component from "../engine/component.js"
import { GameObject } from "../engine/engine.js";

describe("Component", function () {

	describe("constructor", function () {
		it("Constructs properly", function () {
			let gameObject = new GameObject();
			let component = new Component(gameObject)
			expect(component.gameObject).to.equal(gameObject);
		});
	});
});
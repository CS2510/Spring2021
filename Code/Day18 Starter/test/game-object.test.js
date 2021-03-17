import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
const expect = chai.expect;
chai.use(sinonChai);

import GameObject from "../engine/game-object.js"
import * as Engine from "../engine/engine.js"
import * as EngineComponents from "../engine/components/engine-components.js"
import * as TestGameObjects from "./game-objects/test-game-objects.js"

describe("GameObject", function(){
	
	describe("constructor", function(){
		it("Constructs properly", function(){
			let gameObject = new GameObject();
			
			expect(gameObject.components).to.be.an("array");
			expect(gameObject.components.length).to.equal(1);
			expect(gameObject.components[0]).to.be.instanceOf(EngineComponents.TransformComponent)
			expect(gameObject._enabled).to.be.true;
			expect(gameObject._awoken).to.be.false;
			expect(gameObject.enabled).to.be.true;
			expect(gameObject.transform).to.equal(gameObject.components[0])
		});
	});
	describe("enable", function(){
		it("Enables properly", function(){
			let gameObject = new GameObject();
			gameObject.enable();
			expect(gameObject._enabled).to.be.true;
			expect(gameObject.enabled).to.be.true;

		});
	});
	describe("disable", function(){
		it("Disables properly", function(){
			let gameObject = new GameObject();
			expect(gameObject._enabled).to.be.true;
			expect(gameObject.enabled).to.be.true;
			gameObject.disable();
			expect(gameObject._enabled).to.be.false;
			expect(gameObject.enabled).to.be.false;

		});
	});
	describe("awake", function(){
		it("Awakes properly", function(){
			let gameObject = new GameObject();
			gameObject.awake();
			expect(gameObject._awoken).to.be.true;

		});
	});
	describe("update", function(){
		it("Updates properly", function(){
			let gameObject = new GameObject();
			let cb = sinon.fake();
			let component = new Engine.Component();
			component.update = cb;
			gameObject.components.push(component);
			gameObject.update();
			expect(cb).to.have.been.called;

		});
	});
	describe("draw", function(){
		it("Draws properly", function(){
			let gameObject = new GameObject();
			let cb = sinon.fake();
			let component = new Engine.Component();
			component.draw = cb;
			gameObject.components.push(component);

			let ctx = {
				save:sinon.fake(),
				translate:sinon.fake(),
				rotate:sinon.fake(),
				scale:sinon.fake(),
				restore:sinon.fake()
			}

			gameObject.draw(ctx);
			expect(cb).to.have.been.called;
			expect(ctx.save).to.have.been.called;
			expect(ctx.translate).to.have.been.called;
			expect(ctx.rotate).to.have.been.called;
			expect(ctx.scale).to.have.been.called;
			expect(ctx.restore).to.have.been.called;
		});
	});
	describe("destroy", function(){
		it("Destroys properly", function(){
			let gameObject = new GameObject();
			expect(gameObject.markedDestroy).to.be.false;
			gameObject.destroy();
			expect(gameObject.markedDestroy).to.be.true;

		});
	});
	describe("getGameObjects", function(){
		it("Gets Game Objects properly", function(){
			let gameObject = new GameObject();
			expect(gameObject.getGameObject("Name")).to.be.null;
			let child = new GameObject();
			child.name = "Name";
			gameObject.transform.children.push(child)
			expect(gameObject.getGameObject("Name")).to.equal(child);

		});
	});
	describe("getComponent", function(){
		it("Gets component properly", function(){
			let gameObject = new GameObject();
			expect(gameObject.getComponent("Component")).to.be.null;
			let component = new Engine.Component(gameObject);
			component.name = "Component";
			gameObject.components.push(component)
			expect(gameObject.getComponent("Component")).to.equal(component);

		});
	});

	describe("deserialize", function(){
		it("Deserializes a simple game object", function(){
			let result = GameObject.deserialize(TestGameObjects.SimpleGameObject);
			expect(result.name).to.equal("Simple Name");
			expect(result.transform.children.length).to.equal(0);
			expect(result.components.length).to.equal(1);
			expect(result.components[0]).to.be.instanceOf(Engine.EngineComponents.TransformComponent);
		});
		it("Deserializes a definition with a component", function(){
			let result = GameObject.deserialize(TestGameObjects.OneComponentGameObject);
			expect(result.name).to.equal("One Component");
			expect(result.transform.children.length).to.equal(0);
			expect(result.components.length).to.equal(2);
			expect(result.components[0]).to.be.instanceOf(Engine.EngineComponents.TransformComponent);
			expect(result.components[1]).to.be.instanceOf(Engine.EngineComponents.CircleGeometryComponent);
		});
	});
	
	describe("Find", function(){
		it("Works properly", function(){
			//TODO: Add Test
		});
	});
});
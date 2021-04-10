export { default as Scene } from "./scene.js"
export { default as GameObject } from "./game-object.js"
export { default as Component } from "./component.js"
export { default as Input } from "./input.js"
export { default as SceneManager } from "./scene-manager.js"
export { default as Time } from "./time.js"
export { default as Vector2 } from "./geometry/vector-2.js"
export * as EngineComponents from "./components/engine-components.js"
export * as EngineGeometry from "./geometry/engine-geometry.js"
import Scene from "./scene.js"
import GameObject from "./game-object.js"
import Component from "./component.js"
import Input from "./input.js"
import SceneManager from "./scene-manager.js"
import Time from "./time.js"
import Vector2 from "./geometry/vector-2.js"
import * as EngineComponents from "./components/engine-components.js"
import * as EngineGeometry from "./geometry/engine-geometry.js"

class Engine {
  constructor() {
    globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
    globalThis.Destroy = g => g.destroy();
    globalThis.GameObject = Engine.GameObject;
    globalThis.Engine = Engine;
    globalThis.Input = Engine.Input;
    globalThis.Time = Engine.Time;
    globalThis.Geometry = EngineGeometry;
  }
  static boot(options) {
    Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(options.GameComponents).map(i => options.GameComponents[i])];
    Engine.SceneManager.allPrefabs = Object.keys(options.GamePrefabs).map(i => options.GamePrefabs[i]);
    Engine.SceneManager.allScenes = Object.keys(options.GameScenes).map(i => options.GameScenes[i]);
    Engine.SceneManager.changeScene(options.mainSceneTitle);
    Time.deltaTime = options.fps || 1000/60;//60fps

  }

}

export default new Engine();

Engine.SceneManager = SceneManager;
Engine.SceneManager.Geometry = Engine.EngineGeometry;
Engine.Scene = Scene;
Engine.GameObject = GameObject;
Engine.Component = Component;
Engine.Input = Input;
Engine.SceneManager = SceneManager;
Engine.Time = Time;
Engine.Vector2 = Vector2;
Engine.EngineComponents = EngineComponents;
Engine.EngineGeometry = EngineGeometry;
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

  static boot(document, options) {


    Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(options.GameComponents).map(i => options.GameComponents[i])];
    Engine.SceneManager.allPrefabs = Object.keys(options.GamePrefabs).map(i => options.GamePrefabs[i]);
    Engine.SceneManager.allScenes = Object.keys(options.GameScenes).map(i => options.GameScenes[i]);
    Engine.SceneManager.changeScene(options.mainSceneTitle);
    Time.deltaTime = options.fps || 1000 / 60;//60fps

    Engine.Input.attach(document);

    //This will be our default size unless it is set in the options
    let width = 640;
    let height = 480;
    if (options?.width) width = options.width;
    if (options?.height) height = options.height;
    Engine.SceneManager.screenWidth = width;
    Engine.SceneManager.screenHeight = height;
    Engine.SceneManager.screenAspectRatio = width / height;

    //Add the main canvas to the DOM
    let canvas = document.createElement("canvas");
    canvas.id = "canv";
    document.body.appendChild(canvas);
    /* Setup our canvas */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
    let ctx = canvas.getContext("2d");

    let deferredCanvas = document.createElement("canvas");
    let dctx = deferredCanvas.getContext("2d");
    dctx.name = "Default Canvas"

    let wrapCanvas = document.createElement("canvas");
    let wrapctx = wrapCanvas.getContext("2d");
    wrapctx.name = "Special Effects Canvas"

    globalThis.bufferCanvas = document.createElement("canvas");
    globalThis.bctx = bufferCanvas.getContext("2d");
    globalThis.bufferCanvas.width = 2 * Engine.SceneManager.screenWidth;
    globalThis.bufferCanvas.height = 2 * Engine.SceneManager.screenHeight;

    globalThis.blurCanvas = document.createElement("canvas");
    globalThis.bbctx = blurCanvas.getContext("2d");
    globalThis.blurCanvas.width = 2 * Engine.SceneManager.screenWidth;
    globalThis.blurCanvas.height = 2 * Engine.SceneManager.screenHeight;

    //Setup the CSS
    document.body.style.margin = 0;
    document.body.style.overflow = "hidden"

    let title = options.title;
    //Set the title the title argument or location if title is missing
    if (!options.title) title = location;
    document.title = title;



    deferredCanvas.width = width;
    deferredCanvas.height = height;

    wrapCanvas.width = width * 2;
    wrapCanvas.height = height * 2;

    let drawingLayers;
    if (options.layers) {
      drawingLayers = options.layers.map(i => {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return { name: i, ctx: canvas.getContext("2d") }
      })
    }
    else {
      drawingLayers = [
        { name: "default", ctx: dctx },
        { name: "wrap", ctx: wrapctx }
      ]
    }

    if(!drawingLayers.some(i=>i.name == "default"))
      drawingLayers.splice(0, 0, {name:"default", ctx: dctx})

    let wrap = drawingLayers.find(i => i.name == "wrap");
    if (wrap)
      wrap.ctx = wrapctx;

    /* Update and draw our game */
    function gameLoop() {
      Engine.Input.SwapArrays();
      let currentScene = Engine.SceneManager.currentScene;
      currentScene.draw(drawingLayers);
      currentScene.update();
      currentScene.cullDestroyed();

      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      let cw = ctx.canvas.width;
      let ch = ctx.canvas.height;

      let dw = dctx.canvas.width;
      let dh = dctx.canvas.height;

      ctx.fillStyle = "gray";
      ctx.fillRect(0, 0, cw, ch);



      //Draw centered and scaled to fit the window
      let dAspectRatio = dw / dh;
      let cAspectRatio = cw / ch;

      let w = cw;
      let h = ch;
      if (dAspectRatio < cAspectRatio) {
        w = h * dAspectRatio;
      }
      else {
        h = w / dAspectRatio
      }
      ctx.drawImage(deferredCanvas, (cw - w) / 2, (ch - h) / 2, w, h);
      Engine.Input.Remap = p => {
        let x = p.x;
        let y = p.y;

        x -= (cw - w) / 2;
        y -= (ch - h) / 2;

        x *= dw / w;
        y *= dh / h;
        x -= width / 2;
        y -= height / 2

        return new Vector2(x, y);
      }
    }

    let fps = 60;
    setInterval(gameLoop, 1000 / fps)


  }

}



Engine.SceneManager = SceneManager;
Engine.EngineGeometry = EngineGeometry;
Engine.SceneManager.Geometry = Engine.EngineGeometry;
Engine.Scene = Scene;
Engine.GameObject = GameObject;
Engine.Component = Component;
Engine.Input = Input;
Engine.SceneManager = SceneManager;
Engine.Time = Time;
Engine.Vector2 = Vector2;
Engine.EngineComponents = EngineComponents;

globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
globalThis.Destroy = g => g.destroy();
globalThis.GameObject = Engine.GameObject;
globalThis.Engine = Engine;
globalThis.Input = Engine.Input;
globalThis.Time = Engine.Time;
globalThis.Geometry = EngineGeometry;
globalThis.GetGameObject = (name) => Engine.SceneManager.currentScene.getGameObject(name);

export default Engine;
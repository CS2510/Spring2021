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

    let sfxCanvas = document.createElement("canvas");
    let sfxctx = sfxCanvas.getContext("2d");
    sfxctx.name = "Special Effects Canvas"

    globalThis.bufferCanvas = document.createElement("canvas");
    globalThis.bctx = bufferCanvas.getContext("2d");
    globalThis.bufferCanvas.width = 2 * Engine.SceneManager.screenWidth;
    globalThis.bufferCanvas.height = 2 * Engine.SceneManager.screenHeight;

    globalThis.blurCanvas = document.createElement("canvas");
    globalThis.bbctx = blurCanvas.getContext("2d");
    globalThis.blurCanvas.width = 2 * Engine.SceneManager.screenWidth;
    globalThis.blurCanvas.height = 2 * Engine.SceneManager.screenHeight;



    //Attach the CSS dynamically (saves a line in index.html)
    //From http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml#:~:text=To%20load%20a%20.js%20or%20.css%20file%20dynamically%2C,a%20lot%20more%20fancy%20than%20it%20really%20is.
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "../common/style.css")
    document.head.appendChild(fileref);

    let title = options.title;
    //Set the title the title argument or location if title is missing
    if (!options.title) title = location;
    document.title = title;



    deferredCanvas.width = width;
    deferredCanvas.height = height;

    sfxCanvas.width = width * 2;
    sfxCanvas.height = height * 2;

    let drawingLayers = [
      { name: "default", ctx: dctx },
      { name: "sfx", ctx: sfxctx }
    ]

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

      let drawMode = "CenterScale"

      //Stretch game to window
      if (drawMode == "Stretch") {
        ctx.drawImage(deferredCanvas, 0, 0, cw, ch);
        Engine.Input.Remap = p => new Vector2(p.x / cw * dw, p.y / ch * dh);
      }

      //Draw in upper-right
      if (drawMode == "UpperRight") {
        ctx.drawImage(deferredCanvas, 0, 0);
        Engine.Input.Remap = p => new Vector2(p.x, p.y);
      }

      //Draw centered, but not scaled
      if (drawMode == "Center") {
        ctx.drawImage(deferredCanvas, (cw - dw) / 2, (ch - dh) / 2);
        Engine.Input.Remap = p => new Vector2(p.x - (cw - dw) / 2, p.y - (ch - dh) / 2)
      }

      //Draw centered and scaled to fit the window
      if (drawMode == "CenterScale") {
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
    }

    let fps = 60;
    setInterval(gameLoop, 1000 / fps)


  }

}

export default Engine;
globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
globalThis.Destroy = g => g.destroy();
globalThis.GameObject = Engine.GameObject;
globalThis.Engine = Engine;
globalThis.Input = Engine.Input;
globalThis.Time = Engine.Time;
globalThis.Geometry = EngineGeometry;

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
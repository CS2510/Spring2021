import * as Engine from "../../engine/engine.js"

import * as GameScenes from "./scenes/game-scenes.js"
import * as GamePrefabs from "./prefabs/game-prefabs.js"
import * as EngineComponents from "../../engine/components/engine-components.js"
import * as GameComponents from "./components/game-components.js"

function boot(mainSceneName) {

  /* Attach singleton classe to global this */
 

  /* Setup our canvas */
  let canvas = document.getElementById("canv");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
  let ctx = canvas.getContext("2d");

  //Add event listeners to the page
  Engine.Input.attach(document);

  Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(GameComponents).map(i => GameComponents[i])];
  Engine.SceneManager.allPrefabs = Object.keys(GamePrefabs).map(i => GamePrefabs[i]);
  Engine.SceneManager.allScenes = Object.keys(GameScenes).map(i=>GameScenes[i]);
  Engine.SceneManager.changeScene(mainSceneName);

  /* Update and draw our game */
  function gameLoop() {
    clear();
    Engine.Input.SwapArrays();
    let currentScene = Engine.SceneManager.currentScene;
    currentScene.draw(ctx);
    currentScene.update();
    currentScene.cullDestroyed();
  }

  /* Erase what we had on the last frame */
  function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setInterval(gameLoop, 1000 / 60)
}

export default boot;
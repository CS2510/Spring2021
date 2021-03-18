import { expect } from "chai";

async function boot(options) {

  // //Dynamically import based on the folder location of each game
  let promisesOne = [
    import("../engine/engine.js"),
  ]
  let promisesTwo = [
    import(`./scenes/test-scenes.js`),
    import(`./prefabs/test-prefabs.js`),
    import(`../engine/components/engine-components.js`),
    import(`../engine/geometry/engine-geometry.js`),
    import(`./components/test-components.js`),
  ];


  let results = await Promise.all(promisesOne)
  const Engine = results[0];
  globalThis.GameObject = Engine.GameObject;
  globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
  globalThis.Destroy = g => g.destroy();
  globalThis.Engine = Engine;
  globalThis.Input = Engine.Input;

  results = await Promise.all(promisesTwo)
  const GameScenes = results[0];
  const GamePrefabs = results[1];
  const EngineComponents = results[2];
  const EngineGeometry = results[3]
  const GameComponents = results[4];

  Engine.SceneManager.Geometry = EngineGeometry;

  //Add the components, prefabs, and scenes to the SceneManager for easy access in any file
  Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(GameComponents).map(i => GameComponents[i])];
  Engine.SceneManager.allPrefabs = Object.keys(GamePrefabs).map(i => GamePrefabs[i]);
  Engine.SceneManager.allScenes = Object.keys(GameScenes).map(i => GameScenes[i]);
  //Engine.SceneManager.changeScene(mainSceneTitle);

  //This will be our default size unless it is set in the options
  let width = 640;
  let height = 480;
  if (options?.width) width = options.width;
  if (options?.height) height = options.height;

  Engine.SceneManager.screenWidth = width;
  Engine.SceneManager.screenHeight = height;
  Engine.SceneManager.screenAspectRatio = width / height;

  console.log("Done with promise")


  // .then(results => {
  //   const Engine = results[0];
  //   globalThis.GameObject = Engine.GameObject;
  //   globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
  //   globalThis.Destroy = g => g.destroy();
  //   globalThis.Engine = Engine;
  //   globalThis.Input = Engine.Input;

  //   return Promise.all(promisesTwo)
  // })
  // .then(results => {
  //   //... and then attach them to the correct values.

  // })
}




export const mochaHooks = {
  beforeAll: [ async function(){
    this.timeout(0);
    await boot({});
    expect(globalThis.Engine).to.not.be.undefined;
    console.log(globalThis.Engine);
  }
  ]
};


function boot(mainSceneTitle, location, options) {

  //Dynamically import based on the folder location of each game
  let promisesOne = [
    import("../engine/engine.js"),
  ]
 

  //Add the main canvas to the DOM
  let canvas = document.createElement("canvas");
  canvas.id = "canv";
  document.body.appendChild(canvas);


  //Attach the CSS dynamically (saves a line in index.html)
  //From http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml#:~:text=To%20load%20a%20.js%20or%20.css%20file%20dynamically%2C,a%20lot%20more%20fancy%20than%20it%20really%20is.
  var fileref = document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", "./style.css")
  document.head.appendChild(fileref);

  let title = options.title;
  //Set the title the title argument or location if title is missing
  if (!options.title) title = location;
  document.title = title;

  Promise.all(promisesOne)
    .then(results => {
      const Engine = results[0];
      globalThis.GameObject = Engine.GameObject;
      globalThis.Instantiate = i => Engine.SceneManager.currentScene.instantiate(i);
      globalThis.Destroy = g => g.destroy();
      globalThis.Engine = Engine;
      globalThis.Input = Engine.Input;

      let promisesTwo = [
        import(`./scenes/game-scenes.js`),
        import(`./prefabs/game-prefabs.js`),
        import(`../engine/components/engine-components.js`),
        import(`../engine/geometry/engine-geometry.js`),
        import(`./components/game-components.js`),
      ];

      return Promise.all(promisesTwo)
    })
    .then(results => {
      //... and then attach them to the correct values.
      const GameScenes = results[0];
      const GamePrefabs = results[1];
      const EngineComponents = results[2];
      const EngineGeometry = results[3]
      const GameComponents = results[4];

      globalThis.Geometry = EngineGeometry;

      /* Setup our canvas */
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight
      let ctx = canvas.getContext("2d");

      //Add event listeners to the page
      Engine.Input.attach(document);

      Engine.SceneManager.Geometry = EngineGeometry;

      //Add the components, prefabs, and scenes to the SceneManager for easy access in any file
      Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(GameComponents).map(i => GameComponents[i])];
      Engine.SceneManager.allPrefabs = Object.keys(GamePrefabs).map(i => GamePrefabs[i]);
      Engine.SceneManager.allScenes = Object.keys(GameScenes).map(i => GameScenes[i]);
      Engine.SceneManager.changeScene(mainSceneTitle);

      globalThis.SceneManager = Engine.SceneManager;

      

      /* Update and draw our game */
      function gameLoop() {
        Engine.Input.SwapArrays();
        let currentScene = Engine.SceneManager.currentScene;
        currentScene.draw(ctx);
        currentScene.update();
        currentScene.cullDestroyed();
      }

      let fps = 60;
      setInterval(gameLoop, 1000 / fps)
    })
    .catch(error => "Error in promises " + error);
}

export default boot;
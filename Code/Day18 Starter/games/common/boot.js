function boot(mainSceneTitle, location, title) {

  let promises = [
    import("../../engine/engine.js"),
    import(`../${location}/scenes/game-scenes.js`),
    import(`../${location}/prefabs/game-prefabs.js`),
    import(`../../engine/components/engine-components.js`),
    import(`../${location}/components/game-components.js`),
  ];

  let canvas = document.createElement("canvas");
  canvas.id = "canv";
  document.body.appendChild(canvas);

  //From http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml#:~:text=To%20load%20a%20.js%20or%20.css%20file%20dynamically%2C,a%20lot%20more%20fancy%20than%20it%20really%20is.
  var fileref = document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", "../common/style.css")
  document.head.appendChild(fileref);

  if(!title) title = location;
  document.title = title;

  Promise.all(promises)
    .then(results => {
      console.log(results)

      let Engine = results[0];
      let GameScenes = results[1];
      let GamePrefabs = results[2];
      let EngineComponents = results[3];
      let GameComponents = results[4];



      /* Setup our canvas */
      let canvas = document.getElementById("canv");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight
      let ctx = canvas.getContext("2d");

      //Add event listeners to the page
      Engine.Input.attach(document);

      Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(GameComponents).map(i => GameComponents[i])];
      Engine.SceneManager.allPrefabs = Object.keys(GamePrefabs).map(i => GamePrefabs[i]);
      Engine.SceneManager.allScenes = Object.keys(GameScenes).map(i => GameScenes[i]);
      Engine.SceneManager.changeScene(mainSceneTitle);

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
    })
    .catch(error => {
      console.error("Error loading: " + error);
    })
}

export default boot;
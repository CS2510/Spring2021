function boot(mainSceneTitle, location, options) {

  //Dynamically import based on the folder location of each game
  let promises = [
    import("../../engine/engine.js"),
    import(`../${location}/scenes/game-scenes.js`),
    import(`../${location}/prefabs/game-prefabs.js`),
    import(`../../engine/components/engine-components.js`),
    import(`../${location}/components/game-components.js`),
  ];



  //Add the main canvas to the DOCM
  let canvas = document.createElement("canvas");
  canvas.id = "canv";
  document.body.appendChild(canvas);

  let deferredCanvas = document.createElement("canvas");
  let dctx = deferredCanvas.getContext("2d");



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



  //Wait for all the import to load...
  Promise.all(promises)
    .then(results => {
      //... and then attach them to the correct values.
      const Engine = results[0];
      const GameScenes = results[1];
      const GamePrefabs = results[2];
      const EngineComponents = results[3];
      const GameComponents = results[4];

      /* Setup our canvas */
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight
      let ctx = canvas.getContext("2d");

      //Add event listeners to the page
      Engine.Input.attach(document);

      //Add the components, prefabs, and scenes to the SceneManager for easy access in any file
      Engine.SceneManager.allComponents = [...Object.keys(Engine.EngineComponents).map(i => EngineComponents[i]), ...Object.keys(GameComponents).map(i => GameComponents[i])];
      Engine.SceneManager.allPrefabs = Object.keys(GamePrefabs).map(i => GamePrefabs[i]);
      Engine.SceneManager.allScenes = Object.keys(GameScenes).map(i => GameScenes[i]);
      Engine.SceneManager.changeScene(mainSceneTitle);

      //This will be our default size unless it is set in the options
      let width = 640;
      let height = 480;
      if(options?.width) width = options.width;
      if(options?.height) height = options.height;

      Engine.SceneManager.screenWidth = width;
      Engine.SceneManager.screenHeight = height;
      Engine.SceneManager.screenAspectRatio = width / height;

      deferredCanvas.width = width;
      deferredCanvas.height = height;

      /* Update and draw our game */
      function gameLoop() {
        Engine.Input.SwapArrays();
        let currentScene = Engine.SceneManager.currentScene;
        currentScene.draw(dctx);
        currentScene.update();
        currentScene.cullDestroyed();

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //ctx.width = window.innerWidth;
        //ctx.height = window.innerHeight;

        let drawMode = "CenterScale"

        //Stretch game to window
        if (drawMode == "Stretch")
          ctx.drawImage(deferredCanvas, 0, 0, ctx.canvas.width, ctx.canvas.height);

        //Draw in upper-right
        if (drawMode == "UpperRight")
          ctx.drawImage(deferredCanvas, 0, 0);

        //Draw centered, but not scaled
        if (drawMode == "Center")
          ctx.drawImage(deferredCanvas, (ctx.canvas.width - dctx.canvas.width) / 2, (ctx.canvas.height - dctx.canvas.width) / 2);
        if(drawMode == "CenterScale"){
          let dAspectRatio = dctx.canvas.width/dctx.canvas.height;
          let cAspectRatio = ctx.canvas.width/ctx.canvas.height;

          let w = ctx.canvas.width;
          let h = ctx.canvas.height;
          if(dAspectRatio < cAspectRatio){
            h = ctx.canvas.height;
            w = h * dAspectRatio;
          }
          else{
            w = ctx.canvas.width;
            h = w / dAspectRatio
          }
          ctx.drawImage(deferredCanvas, (ctx.canvas.width - w) / 2, (ctx.canvas.height - h) / 2, w, h);
        }



        //console.log(ctx.canvas.width);
      }

      let fps = 60;
      setInterval(gameLoop, 1000 / fps)
    })
    .catch(error => {
      console.error("Error loading: " + error);
    })
}

export default boot;
import Vector2 from "../../engine/geometry/vector-2.js";
function boot(mainSceneTitle, location, options) {

  //Dynamically import based on the folder location of each game
  let promisesOne = [
    import("/engine/engine.js"),
  ]

  Promise.all(promisesOne)
    .then(results => {
      const Engine = results[0];
    
      let promisesTwo = [
        import(`../${location}/scenes/game-scenes.js`),
        import(`../${location}/prefabs/game-prefabs.js`),
        import(`../${location}/components/game-components.js`),
      ];

      return Promise.all(promisesTwo)
    })
    .then(results => {
      //... and then attach them to the correct values.
      const GameScenes = results[0];
      const GamePrefabs = results[1];
      const GameComponents = results[2];
      
      
      
      //Add event listeners to the page
      
      
      
      
    })
  //.catch(error => console.error(error));
}

export default boot;
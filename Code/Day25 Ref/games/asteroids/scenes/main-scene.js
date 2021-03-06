export default {
  name: "MainScene",
  children: [
    {
      gameObject: {
        name: "MainCamera", components: [
          { name: "WorldCameraComponent" }
        ]
      }
    },
    {
      gameObject: {
        name: "ScreenCamera", components: [
          { name: "ScreenCameraComponent" }
        ], children: [

          { 
            gameObject: { 
              name: "ScreenText", 
              components: [
                { 
                  name: "ScreenTextComponent", 
                  args: [
                    "Asteroids", 
                    { color: "white" }
                  ] 
                }
              ] 
            }, x: 100, y: 40, drawLayer:"screen" },
        ]
      }
    },
    {
      gameObject: {
        name: "MainController", components: [
          { name: "MainControllerComponent"},
        ]
      }
    },
    // {
    //   prefabName: "AsteroidPrefab", 
    //   drawLayer:"sfx"
    // },
    {
      prefabName: "ShipPrefab",
      drawLayer:"foreground"
      
    }

  ]
}
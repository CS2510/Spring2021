export default {
  name: "MainScene", //Scene name
  children: [ //Game objects in the scene
    {
      gameObject:{
        name:"MainCamera",components:[
          {name:"WorldCameraComponent"}
        ]
      }
    },
    {
      gameObject: {
        name:"ScreenCamera",components:[
          {name:"ScreenCameraComponent"}
        ],children:[
          {
            gameObject: {
        name: "ScreenText",
        components: [
          {
            name: "ScreenTextComponent",
            args: ["Main Scene", {alignment:"left", justification:"bottom"}]
          }
        ]
      },
      x: 40, y: 40
    },
        ]
      }
    },
    { prefabName: "KeyboardRectangle", x: 300, y: 300 },
    { prefabName: "KeyboardBumpRectangle", x: 50, y: 300 },
    {
      prefabName: "ClickToDestroy",
      x: 0, y: 0
    },
    
    {
      gameObject: {
        name: "MainController",
        components: [
          {
            name: "ScreenTextComponent",
            args: ["0",]
          },
          {
            name: "MoleMakerComponent",
          },
          {
            name: "ScoreComponent",
          }
        ]
      },
      x: 20, y: 40
    },
    {
      gameObject:{
        name:"Empty",
        children:[
          {
            gameObject:{
              name:"rotator",
              components:[
                {
                  name:"DrawGeometryComponent", //Name of the component
      
                },
                {
                  name:"RotatorComponent"
                }
              ]
            },x:100, y:100
          }
        ]
      }
    }
  ]
}
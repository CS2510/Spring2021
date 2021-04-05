export default {
  name: "CollisionScene", //Scene name
  children: [ //Game objects in the scene
    {
      gameObject: {
        name: "MainCamera", components: [
          { name: "WorldCameraComponent" },
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
                  args: ["Wrapping Scene", { alignment: "left", justification: "bottom" }]
                }
              ]
            },
            x: 40, y: 40
          },
        ]
      }
    },
    {
      gameObject: {
        name: "Empty",
        components: [
         {name: "MainControllerComponent"}
        ]
      }
    },
    {
      gameObject:{
        name:"CircleGameObject",
        components:[
          {name: "DrawGeometryComponent", args:["brown"]},
          {name: "CircleGeometryComponent", args:[100]}
        ]
      }
    },
    {
      gameObject:{
        name:"RectangleGameObject",
        components:[
          {name: "DrawGeometryComponent", args:["yellow"]},
          {name: "RectangleGeometryComponent", args:[50, 50]}
        ]
      },x:100,y:100
    }
  ]
}
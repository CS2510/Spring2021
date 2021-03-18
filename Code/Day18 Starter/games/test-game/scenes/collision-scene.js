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
                  args: ["Collision Scene", { alignment: "left", justification: "bottom" }]
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
        name: "Circle", components: [
          { name: "CircleGeometryComponent", args: [50] },
          { name: "DrawGeometryComponent", args: ["green"] },
        ],
        children:[
          {
            gameObject: {
              name: "Rectangle", components: [
                { name: "RectangleGeometryComponent", args: [100, 100] },
                { name: "DrawGeometryComponent", args: ["red"] },
              ]
            }, x: 150, y: 50
          },
        ]
      }, x: 0, y: 0
    },
    {
      gameObject: {
        name: "Empty",
        components: [
         {name: "CollisionControllerComponent"}
        ]
      }
    },
  ]
}
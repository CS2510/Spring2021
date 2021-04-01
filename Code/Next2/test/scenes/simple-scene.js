export default {
  name: "MainScene", //Scene name
  children: [ //Game objects in the scene
    {
      gameObject: {
        name: "Simple Rectangle", components: [
          { name: "RectangleGeometryComponent", args: [100, 100] },
          { name: "DrawGeometryComponent", args: ["red"] },
        ]
      }, 
    },
  ]
}
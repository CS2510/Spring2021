export default {
  name: "MainScene",
  children: [
    {
      gameObject: {
        name: "MainCamera", components: [
          { name: "WorldCameraComponent", args: ["white"] }
        ]
      }, x: 30, y: 100, sx: 10, sy: 10
    },
    {
      gameObject: {
        name: "ScreenCamera", components: [
          { name: "ScreenCameraComponent" }
        ], children: [
          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["Picker Test", { color: "black" }] }] }, x: 100, y: 40, drawLayer: "screen" },
          { gameObject: { name: "ScreenLocation", components: [{ name: "ScreenTextComponent", args: ["Screen Text", { color: "red", font: "10pt Arial" }] }] }, x: 100, y: 60, drawLayer: "screen" },
          { gameObject: { name: "WorldLocation", components: [{ name: "ScreenTextComponent", args: ["World Text", { color: "green", font: "10pt Arial" }] }] }, x: 100, y: 80, drawLayer: "screen" },
          { gameObject: { name: "TransitionText", components: [{ name: "ScreenTextComponent", args: ["Transition Text", { color: "blue", font: "10pt Arial" }] }] }, x: 0, y: 0, drawLayer: "transition" },
        ]
      }
    },
    {
      gameObject: {
        name: "MainController", components: [
          { name: "MainControllerComponent" },
        ]
      }
    },
    {
      gameObject: {
        name: "CenterSquare", components: [
          { name: "DrawGeometryComponent", args: ["yellow"] },
          { name: "RectangleGeometryComponent", args: [1, 1] }
        ]
      }, x: 0, y: 0, drawLayer: "main"
    },
    {
      gameObject: {
        name: "Square", components: [
          { name: "DrawGeometryComponent", args: ["red"] },
          { name: "RectangleGeometryComponent", args: [1, 1] }
        ]
      }, x: 10, y: 0, drawLayer: "main"
    },
    {
      gameObject: {
        name: "Square", components: [
          { name: "DrawGeometryComponent", args: ["green"] },
          { name: "RectangleGeometryComponent", args: [1, 1] }
        ]
      }, x: 0, y: 10, drawLayer: "main"
    },
    {
      gameObject: {
        name: "Square", components: [
          { name: "DrawGeometryComponent", args: ["pink"] },
          { name: "RectangleGeometryComponent", args: [1, 1] }
        ]
      }, x: -10, y: 0, drawLayer: "main"
    },
    {
      gameObject: {
        name: "Square", components: [
          { name: "DrawGeometryComponent", args: ["lightGreen"] },
          { name: "RectangleGeometryComponent", args: [1, 1] }
        ]
      }, x: 0, y: -10, drawLayer: "main"
    },



  ]
}
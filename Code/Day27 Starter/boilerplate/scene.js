export default {
  name: "${name}",
  children: [
    {
      gameObject: {
        name: "MainCamera", components: [
          { name: "WorldCameraComponent" }
        ]
      },sx:10,sy:10
    },
    {
      gameObject: {
        name: "ScreenCamera", components: [
          { name: "ScreenCameraComponent" }
        ], children: [

          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["${name}", { color: "white" }] }] }, x: 100, y: 40 },
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
  ]
}
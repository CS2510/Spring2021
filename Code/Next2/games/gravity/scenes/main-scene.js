export default {
  name: "MainScene",
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

          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["Gravity", { color: "white" }] }] }, x: 100, y: 40 },
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
    {
      prefabName:"BallPrefab"
    }

  ]
}
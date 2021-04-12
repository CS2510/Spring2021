export default {
  name: "PongScene",
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

          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["PongScene", { color: "white" }] }] }, x: 100, y: 40 },
        ]
      }
    },
    {
      gameObject: {
        name: "BallPong", components: [
          { name: "BallPongComponent"},
        ]
      }
    },
    {
      prefabName:"BallPongPrefab"
    }
  ]
}
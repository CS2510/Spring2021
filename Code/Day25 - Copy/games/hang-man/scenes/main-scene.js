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

          { gameObject: { name: "ScreenTextShadow", components: [{ name: "ScreenTextComponent", args: ["'Hangman' Game Example", { color: "gray" }] }] }, x: 102, y: 42 },
          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["'Hangman' Game Example", { color: "white" }] }] }, x: 100, y: 40 },
          {
            gameObject: {
              name: "CorrectText",
              components: [
                {
                  name: "ScreenTextComponent", args: ["?", { color: "white" }]
                }
              ]
            }, x: 20, y: 200
          },
          {
            gameObject: {
              name: "GuessedLetters",
              components: [
                {
                  name: "ScreenTextComponent", args: ["?", { color: "white" }]
                }
              ]
            }, x: 20, y: 400
          },
        ]
      }
    },
    {
      gameObject: {
        name: "MainController", components: [
          { name: "ScreenTextComponent", args: ["0", { color: "white" }] },
          { name: "MainControllerComponent", },
          { name: "ScoreComponent" },
          { name: "SceneChangerComponent" }
        ]
      }, x: 20, y: 40
    },

  ]
}
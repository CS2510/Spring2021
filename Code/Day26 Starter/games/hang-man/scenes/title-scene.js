export default {
  name: "TitleScene",
  children: [
    {
      gameObject:{
        name:"MainCamera",components:[
          {name:"WorldCameraComponent"}
        ]
      }
    },
    {
      gameObject:{
        name:"ScreenCamera",components:[
          {name:"ScreenCameraComponent"}
        ],children:[
    { gameObject: { name: "ScreenTextShadow", components: [{ name: "ScreenTextComponent", args: ["'Hangman' Game Example", { color: "gray" }] }] }, x: 102, y: 42 },
    { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["'Hangman' Game Example", { color: "white" }] }] }, x: 100, y: 40 },
          
        ]
      }
    },
    { gameObject: { name: "MainController", components: [{ name: "SceneChangerComponent" }, {name: "TitleSceneCountdownComponent"}] } },
  ]
}
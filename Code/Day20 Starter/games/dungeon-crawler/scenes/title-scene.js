export default {
  name: "TitleScene",
  children: [
    { gameObject: { name: "MainController", components: [{ name: "SceneChangerComponent" }, {name: "TitleSceneCountdownComponent"}] } },
    { gameObject: { name: "ScreenTextShadow", components: [{ name: "ScreenTextComponent", args: ["Dungeon Crawler Example", { color: "gray" }] }] }, x: 102, y: 42 },
    { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["Dungeon Crawler Example", { color: "white" }] }] }, x: 100, y: 40 },
    { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["Title Scene", { color: "white" }] }] }, x: 100, y: 200 },
  ]
}
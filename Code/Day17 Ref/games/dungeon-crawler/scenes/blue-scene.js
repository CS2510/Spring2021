export default {
  name: "BlueScene",
  children: [
    {
      prefabName: "MainCamera",
      sx:.5,sy:.5
    },
    {
      gameObject:{
        name:"ScreenCamera",components:[
          {name:"ScreenCameraComponent"}
        ]
      }
    },
    {
      gameObject: {
        name: "Ground",
        components: [
          { name: "DrawGeometryComponent", args: ["blue"] },
          { name: "RectangleGeometryComponent", args: [640, 480] },
        ]
      }
    },
    {
      prefabName:"MainController"
    },
    { prefabName: "Hero" },
    
  ]
}
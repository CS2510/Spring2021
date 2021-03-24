export default {
  name: "RedScene",
  children: [
    {
      gameObject: {
        name:"MainCamera",components:[
          {name:"WorldCameraComponent"}
        ]
      },sx:.5,sy:.5
    },
    {
      gameObject:{
        name:"ScreenCamera",components:[
          {name:"ScreenCameraComponent"}
        ],children:[
          
        ]
      }
    },
    {
      gameObject: {
        name: "Ground",
        components: [
          { name: "DrawGeometryComponent", args: ["pink"] },
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
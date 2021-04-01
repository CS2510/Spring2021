export default {
  name:"ClickToDestroy",
  children:[],
  components:[
    {
      name:"DrawGeometryComponent", //Name of the component
      args:["green"]
    },
    {
      name:"ClickToDestroyComponent",
      args:[2]
    },
    {
      name:"RectangleGeometryComponent", args:[100,200]
    }

  ]
}
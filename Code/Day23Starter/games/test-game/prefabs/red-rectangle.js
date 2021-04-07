export default {
  name:"RedRectangle",
  children:[],
  components:[
    {
      name:"DrawGeometryComponent", //Name of the component
      args:["red"]
    },
    {
      name:"MoveComponent"
    }
    ,
    {
      name:"RectangleGeometryComponent", args:[100,200]
    }

  ]
}
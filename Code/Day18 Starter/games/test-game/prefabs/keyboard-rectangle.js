export default {
  name:"KeyboardRectangle",
  children:[],
  components:[
    {
      name:"DrawGeometryComponent", //Name of the component
      args:["yellow"]
    },
    {
      name:"KeyboardMoveComponent",
      args:[2]
    },
    {
      name:"RectangleGeometryComponent", args:[100,200]
    }

  ]
}
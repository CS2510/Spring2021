export default {
  name:"KeyboardBumpRectangle",
  children:[],
  components:[
    {
      name:"DrawGeometryComponent", //Name of the component
      args:["white"]
    },
    {
      name:"KeyboardBumpComponent",
      args:[2]
    },
    {
      name:"RectangleGeometryComponent", args:[100,200]
    }

  ]
}
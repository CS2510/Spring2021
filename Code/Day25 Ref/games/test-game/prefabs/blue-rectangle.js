export default {
  name:"BlueRectangle", //Prefab Name
  components:[ //List of Components
    {
      name:"DrawGeometryComponent", //Name of the component
      args:["blue"] //Optional: arguments to be passed to the component constructor
    },
    {
      name:"MoveComponent",
      args:[]
    },
    {
      name:"RectangleGeometryComponent", args:[100,200]
    }
  ],
  children:[
    {
      prefabName:"RedRectangle",
      x:10,
      y:10
    }
  ]
}
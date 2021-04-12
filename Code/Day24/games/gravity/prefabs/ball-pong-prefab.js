export default {
  name: "BallPongPrefab", components:[
        {name: "DrawGeometryComponent", args: ["white"] },
        {name: "CircleGeometryComponent", args:[1]},
        {name:"RigidBodyComponent", args:[{gravity:false}]}
  ]
}
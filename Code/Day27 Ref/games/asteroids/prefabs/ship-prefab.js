export default {
  name: "ShipPrefab", components: [
    { name: "ShipUpdateComponent" },
    { name: "PolygonGeometryComponent", args: [[{x:10, y:0},{x:-10, y:-10},{x:-10, y:10}]] },
    { name: "DrawGeometryComponent", args: ["rgba(128, 128, 128, .5)", "white", 2] },
    { name: "RigidBodyComponent", args: [{gravity:false}] },
  ]
}
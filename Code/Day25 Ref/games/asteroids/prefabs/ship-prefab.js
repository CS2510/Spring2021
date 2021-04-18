export default {
  name: "ShipPrefab", components: [
    { name: "ShipUpdateComponent" },
    // { name: "CircleGeometryComponent", args: [100] },
    { name: "RectangleGeometryComponent", args: [100, 100] },
    { name: "DrawGeometryComponent", args: ['white'] },
    // { name: "DrawGhostGeometry", args: ['white'] }
  ]
}
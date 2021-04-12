export default {
  name: "AsteroidPrefab", components: [
    { name: "AsteroidUpdateComponent" },
    { name: "CircleGeometryComponent", args: [100] },
    { name: "DrawGeometryComponent", args: ['white'] },
    // { name: "DrawGhostGeometry", args: ['white'] }
  ]
}
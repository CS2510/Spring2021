export default {
  name: "AsteroidPrefab", components: [
    { name: "AsteroidUpdateComponent" },
    { name: "CircleGeometryComponent", args: [50] },
    { name: "DrawGeometryComponent", args: ['rgba(128, 128, 128, .5)', 'white', 2] },
  ]
}
export default {
  name: "frog",
  components: [
    { name: "DrawGeometryComponent", args: ["green"] },
    { name: "CircleGeometryComponent", args: [.5] },
    { name: "KeyboardBumpComponent", args: [1] }
  ],
  children: [
    {
      gameObject: {
        name: "Eye",
        components: [
          { name: "DrawGeometryComponent", args: ["white"] },
          { name: "CircleGeometryComponent", args: [.1] },
        ]
      },x:-.4, y:-.50
    }
  ]
}
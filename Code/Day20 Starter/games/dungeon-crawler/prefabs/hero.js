export default {
  name: "Hero", components: [
    {
      name: "KeyboardMoveComponent", args: [5]
    },
    { name: "DrawGeometryComponent", args: ["green"] },
    { name: "RectangleGeometryComponent", args: [75, 75] },
  ], children: [
    {
      gameObject: {
        name: "HeroHat",
        components: [
          { name: "PolygonGeometryComponent", args: [[{x:-75, y:0}, {x:75, y:0}, {x:0, y:75}]] },
          { name: "DrawGeometryComponent", args: ["brown"] }
        ]

      },sx:.5, sy:.5,x:0,y:30
    }
  ]
}
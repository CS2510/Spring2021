export default {
  name: "FallScene",
  children: [
    {
      gameObject: {
        name: "MainCamera", components: [
          { name: "WorldCameraComponent" }
        ]
      }, sx: 10, sy: 10
    },
    {
      gameObject: {
        name: "ScreenCamera", components: [
          { name: "ScreenCameraComponent" }
        ], children: [

          { gameObject: { name: "ScreenText", components: [{ name: "ScreenTextComponent", args: ["Gravity", { color: "white" }] }] }, x: 100, y: 40 },
        ]
      }
    },
    {
      gameObject: {
        name: "BallRigidBody", components: [
          { name: "BallRigidBodyComponent" },
        ]
      }
    },
    {
      prefabName: "BallPrefabRigidBody"
    },
    {
      gameObject: {
        name: "Tank", components: [
          { name: "DrawGeometryComponent", args: ["green"] },
          { name: "RectangleGeometryComponent", args: [20, 10] },
          { name: "RotateTurretComponent" }
        ]
      }, x: -25, y: 20
    }


  ]
}
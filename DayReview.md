# Day Review
This file  contains links and text after every class that you can look back to and review. Note that Zoom recordings are available in Canvas by going to the calendar option and clicking on the course day you want to watch.

# Day 1 - 2021-01-11 - History of the First Game Engines + Introduction to Layers

- Students will be able to discuss what made Doom distinct from the majority of games of the time.
- Students will be able to describe how this change affected id Software's ability to license part of the game to other companies.
- Students will be able to describe how layers used to compose a frame in a game.


# Day 2 - 2021-01-13
- Students will understand the syllabus and course requirements
- Students will know what a sprint is
- Students will understand how grading is done
- Students will be able to look at the frame of a game and assess what is drawn in each layer
- Students can describe an effectl/glow buffer
- Students can discuss how a point (e.g. the mouse) lives in both world space and in screen space.
- Activity: Identify the layers in a game using [Layers Activity](LayersActivity.pptx)

# Day 3 - 2021-01-20
- Students will be able to describe a state machine.
- Students will be able to explain the role state machines play in a game
- Students will be able to determine if a state machine transitions between scenes or is an in-game state machine.
- Students will be able to explain what a scene in a game is.
- Students will be able to explain a game representation in the "Forrest of scene trees" paradigm
- Students will be able to explain how to logical order nodes/game objects in a scene tree
- Students will be able to explain parent/child relationships in a scene tree
- Students will understand the traditional separation of screens space nodes and world nodes
- Students will be able to critical examine a game and sketch a possible scene tree for the game
- Students will understand that nodes/game objects have components
- Students will understand that components respond to draw calls, respond to update calls, and/or carry data.

# Day 4 - Snow Day

# Day 5 - 2021-01-27
- Students will be familiar with the Stack Overflow survey.
- Students will have a basic understanding of the history of HTML and browsers
- Students will have a basic understanding on HTML
- Students will have a basic inderstanding of CSS
- Students will have a basic understanding of JavaScript
- Students can explain the difference between and statically types and dynamically typed language.
- Students can differentiate between stroke and fill commands
- Students understand how to draw a rectangle on a canvas
- Students know to refresh their canvas between renders
- Students will have a basic understanding of JavaScript class syntax
- Student will be able to implement a basic GameObject instance

# Day 6 - 2021-02-01
- Students will have a basic understanding of the difference between game engine code and game code
- Students will be able to create a GameObject class
- Students will be able to create a Scene class
- Students will be able to explain the basic methods in a GameObject class
- Students will be able to explain the basic methods in a Scene class
- Students will be able to explain the basic methods in a subclass of GameObject
- Students will be able to explain teh basic methods in a subclass of Scene
- Students will have a basic understanding of the difference between an infinite loop and calling a timer on a thread
- Students will be able to create a one scene "game" with multiple game objects.

# Day 7 - 2021-02-03
- Students will understand the difference between single inheritance and multiple inheritance
- Students will understand the composition model of multiple inheritance
- Students can give an example of the problem with single inheritance in a game setting
- Students will be able to write basic components
- Students will be be able to identify components in an existing game
- Students have a basic understanding of reflection
- Students will be able to use reflection to call the correct components on a game object

# Day 8 - 2021-02-08
- Students will understand the differences between the C, C++, and C# languages.
- Students will understand the historical relationship between C++, Java, and C#.
- Students will be familiar with the major commerical game engines.
- Students will be able to discuss at a high level whether a game engine is PC/Console first, mobile first, or WebGL first.
- Students will have a basic understanding of the different licensing options for game engines
- Students can describe what a "blueprint" is in Unreal Engine
- Students will be able to explain the pros and cons of using a node-based programming system.
- Students will understand that there are many game engines that are not available commerically.

# Day 9 - 2021-02-10
- Students can describe the role of the heap in RAM
- Students can describe serialization
- Students can describe deserialization
- Students can explain the pitfalls of "by value" serialization (multiple copies of the same object).
- Students can explain the pitfalls of circular references in serialization (infinite loop).
- Students can explain the role of a prefab in a game description
- Students can destinguish the difference between a game engine component and a custom game component.

# Day 10 - 2021-02-15
- Students can explain the advantage of a text-based game description
- Students can create a text-base definition of a prefab
- Students can create a text-based defintion of a scene
- Students can create a scene definition that allows for both prefabs an one-off game objects

# Day 11 - 2021-02-17
- Students can explain how to manage multiple scenes in a game
- Students can explain the hazards of switching between scenes that have been instantiated
- Students can recursively instantiate game objects with children
- Students can correctly modify prefab game objects to maintain their children

# Day 12 - 2021-02-22
- Students understand the difference between digital and analog input
- Students can identify analogy and digital input on a gamepad
- Students understand the mechanics of a keyboard as input
- Students can explain the difference between keys and key codes in keyboard apis
- Students understand the problem with keyboard ghosting
- Students can explain the problem with repeated keys
- Students understand the role of modified keys
- Students understand the inputs available from a mouse
- Students understand the ordering of mouse buttons in modern mouse apis

# Day 13 - 2021-02-24
- Students understand how to "build" a game
- Students can explain how to destroy objects (using a marker and separate update function)
- Students understand how to instantiate a game object from code
- Students can use keyboard and mouse update events
- Students can use keyboard and mouse polling
- Students can explain why keyboard input is stored in a separate variable
- Students can explain when to use events and when to use polling

# Day 14 - 2021-03-01
- Students will understand the basics of version control systems
- Students will understand how to implement basic games using the current game engine.
- Students will be able to create state-based scene transitions
- Students will be able identify the components and scenes they need in their game.

# Day 15 - 2021-03-03
- Students will understand the difference between degrees and radians
- Students will be able to convert to/from degrees and radians
- Students will understand how to draw a circle as an arc
- Students will be able to explain what transforms are
- Students will be able to identify the three major transforms (translate, scale, rotate)
- Students will have a basic understanding of how the order of transform operations matters
- Students will be able to explain how to rotate an object about its center.

# Day 16 - 2021-03-08
- Students will understand local (model) coordinates
- Students will be able to describe the two cameras used in a scene
- Students will be able to describe the use of the transform component
- Students will write their game using cameras and transform components
- Students can describe how the camera is affected by translations, scales, and rotations
- Students can describe the changes needed to go from a 2D to 3D game engine in terms of transformations

# Day 17 - 2021-03-10
- Students will understand the difference between sibling game objects and child objects in terms of transforms
- Students can describe how to push and pop the transform stack properly inherit transforms
- Students understand how to scale, rotate, and translate child objects properly
- Students know the order in which to apply translate, scale, and rotate transforms
- Students understand the basics of how a polygon geometry is created
- Students can add child objects using JSON syntax

[Spring Break]

# Day 18 - 2021-03-22
- Students will understand the basics of collision detection
- Students can explain why collision detection is commutative
- Students can explain how to simplify their code using the commutative nature of collision detection.
- Students can explain the relative difficulty of doing collision detection with different representations
- Students can distinguish between a rectangle and an axis-aligned bounding box
- Students can distinguish between a convex and concave shape
- Students can develop unit tests for their collision detection
- Students can describe the theory used to detect the collision of a point and a circle
- Students can code and test the collision of a point and circle.

# Day 19 2021-03-24
- Students will understand colliding circles based on the sum of their radii
- Students will understand colliding circles use the inflate/deflate method
- Students will understand colliding points and rectangles using either the inside or outside tests
- Students can describe why outside can run faster than inside tests.
- Students will understand how to generate the correct geometry for colliding circles and rectangles
- Students will understand that the method shown in class does not work on rotated rectangles

# Day 20 2021-03-29
- [Activity] Looking at parallax in historic games
- Students can describe how the background, midground, and foregroud move relative to each other when a camera pans [parallax]
- Students have an understanding of parallax when the camera both moves and rotates
- Students understand the six possible cases with axis-aligned rectangle/axis-aligned rectangle collisions
- Students can implement a collision function for rectangles that handle these scenarios
- Students have a brief understanding of the separate axis theorem
- Students have a brief understanding of how to split convex pollygons into triangles using the fan method
- Students have a brief understanding of how to split concave polygons into triangles using the the ear lopping method.

# Day 21 2021-03-31
- Students will be able to integrate geometry (points, circles, and rectangles) into game components
- Students will understand how to get geometry from a game component
- Students will be able to check for collisions using polling
- Students will understand that collision detection only works if the objects are in the same space (i.e. world or screen)
- Students will understand how to use rejection sampling to instantiate new game objects

# Day 22 2021-04-05
- Students will understand the role of deferred buffering in a game
- Students will understand letterboxing and pillarboxing
- Students will understand what it means for an image to fill, stretch, or be contained in a frame
- Students will know how to center an image in a frame
- Students will know how to stretch an image in a frame
- Students will know how to center and stretch an image in a frame with altering its aspect ratio
- Students will know how to remap mouse coordinates from the screen to the world. 

# Day 23 2021-04-07
- Students will be able to implement deferred rendering
- Students understand the relationship of deferred buffering and layers
- Students understand the painters algorithm
- Students understand screen wrapping in terms of rendering
- Students understand screen wrapping in terms of collisions
- Students understand the role of a blur buffer
- Students can implement simple special effects, such as a glowing object

# Day 24 2021-04-12
- Students will be able to name Newton's three laws of motion
- Students will understand that defining units in a game is required for physics to work
- Students will remember from calculus what a derivative and an integral are
- Students will understand the relationship between position, velocity, and acceleration
- Students will know how to update velocity and position during update frames
- Students will understand the importance of including time as part of these updates
- Students will understand the difference between an instantaneous force and an instantaneous velocity.

# Day 25 2021-04-14
- Students will be able to create a rigid body component in their engines
- Students will understand how units affect physics in a game
- Students will know the difference between Euclidean and polar coordinates
- Students can name at least one benefit of using polar coordinates in physics (preservation of heading)
- Students can convert from polar coordinates to Euclidean coordinates and then back
- Students can determine the boundaries of the camera in world space.

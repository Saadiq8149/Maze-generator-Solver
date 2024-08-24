# Maze Generator and Solver

## Overview
This project is a visual implementation of a maze generator and solver using the Depth-First Search (DFS) algorithm with backtracking. The maze is generated and solved in real-time using the p5.js graphics library. The application allows users to generate a new maze and solve it interactively.

## Features
* Maze Generation: Creates a maze using DFS with backtracking.
* Maze Solving: Solves the generated maze using DFS.
* Interactive Controls: Includes buttons to regenerate the maze and to solve the maze.

## Dependencies

* [p5.js](https://p5js.org/): A JavaScript library for creative coding.

## Setup

1. Include p5.js Library.\
The project uses the p5.js library, which is imported via a CDN. Ensure that this script is loaded in your HTML:
```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.js"></script>
```
## Resources

* Maze Generation and Solving:
  * [Recursive Backtracking](https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking)
  * [Maze Generation Algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation)
  * [Maze Solving Algorithm](https://en.wikipedia.org/wiki/Maze-solving_algorithm)

# How it Works?

1. Initialization
   * Setup: Initializes the canvas, grid, and buttons. Sets up the initial state of the maze.

2. Maze Generation
   * Depth-First Search (DFS) with Backtracking: Randomly selects unvisited neighbors to create the maze. Walls are broken down to connect cells, and backtracking is used to explore all paths.

3. Maze Solving
   * Depth-First Search (DFS): Follows the path to solve the maze once it is generated. Marks the solution path in blue.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

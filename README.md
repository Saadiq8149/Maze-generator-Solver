# Maze-generator-Solver

Link to the notebook on Scribbler:
https://app.scribbler.live/?jsnb=github:Saadiq8149/Maze-generator-Solver/maze-generator-solver.jsnb

Overview
This project is a visual implementation of a maze generator and solver using the Depth-First Search (DFS) algorithm with backtracking. The maze is generated and solved in real-time using the p5.js graphics library. The application allows users to generate a new maze and solve it interactively.

Features
Maze Generation: Creates a maze using DFS with backtracking.
Maze Solving: Solves the generated maze using DFS.
Interactive Controls: Includes buttons to regenerate the maze and to solve the maze.
Dependencies
p5.js: A JavaScript library for creative coding. p5.js Library
Setup
Include p5.js Library

The project uses the p5.js library, which is imported via a CDN. Ensure that this script is loaded in your HTML:

html
Copy code
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.js"></script>
HTML Structure

The project assumes you have two buttons in your HTML with IDs resetButton and solveButton. Here's an example of the required HTML structure:

html
Copy code
<button id="resetButton">Reset Maze</button>
<button id="solveButton">Solve Maze</button>
JavaScript Code

Copy the provided JavaScript code into a file (e.g., maze.js) and include it in your HTML:

html
Copy code
<script src="maze.js"></script>
How It Works
Initialization
Setup: Initializes the canvas, grid, and buttons. Sets up the initial state of the maze.
Maze Generation
Depth-First Search (DFS) with Backtracking: Randomly selects unvisited neighbors to create the maze. Walls are broken down to connect cells, and backtracking is used to explore all paths.
Maze Solving
Depth-First Search (DFS): Follows the path to solve the maze once it is generated. Marks the solution path in blue.
Interactive Controls
Regenerate: Clears the existing maze and generates a new one.
Solve: Finds and displays the solution path for the generated maze.
Code Explanation
Global Constants: Define the size of the canvas, the grid dimensions, and wall thickness.
Node Class: Represents each cell in the maze, including its walls and visited state.
Helper Functions: Manage the maze generation and solving processes, including breaking walls, getting neighbors, and drawing nodes.
Event Listeners: Handle button clicks to regenerate and solve the maze.
Usage
Open the HTML file in a web browser.
Click "Reset Maze" to generate a new maze.
Click "Solve Maze" to find the solution path for the current maze.
Resources
Maze Generation and Solving:
Recursive Backtracking
Maze Generation Algorithm
Maze Solving Algorithm
License
This project is licensed under the MIT License. See the LICENSE file for details.

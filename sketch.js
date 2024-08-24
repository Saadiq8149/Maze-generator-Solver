  // Importing p5.js
  // scrib.loadScript("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.js")
  /*
    Maze Generator and Solver using Depth First Search with Backtracking.
    Libraries Used:
    --> Graphics library:
    https://p5js.org/
    Resources Used:
    --> Maze Generation and Maze Solving:
    https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking
    https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation
    https://en.wikipedia.org/wiki/Maze-solving_algorithm
  */

  // Global constants
  const WIDTH = 400, HEIGHT = WIDTH, WALL_THICKNESS = 3
  const rows=10, cols=rows, w=WIDTH/cols, h=HEIGHT/rows
  let grid = [], stack = [], current, destination
  let currentFromStack = false, mazeGenerated = false, mazeSolving = false
  let resetButton, solveButton

  // The setup function is a p5 function, which is for preloading/initializing stuff
  function setup() {
    createCanvas(WIDTH, HEIGHT)
    // Initializing the Grid (2D array)
    for (let i = 0; i<rows; i++) {
      grid.push([])
      for (let j = 0; j<cols; j++) {
        grid[i].push(new Node(i, j))
      }
    }
    resetButton = document.getElementById("resetButton")
    solveButton = document.getElementById("solveButton")
    current = grid[0][0]
    frameRate(20)
  }

  // The draw function is a p5 function, which is for redrawing/animating the visuals
  // every frame
  function draw() {
    background(220)

    resetButton.addEventListener("click", regenerate)
    solveButton.addEventListener("click", solve)

    // Drawing the maze Cells
    for (let i = 0; i<rows; i++) {
      for (let j = 0; j<cols; j++) {
        grid[i][j].drawNode()
      }
    }
    drawPath()

    if (mazeSolving && mazeGenerated) {
      solveMaze()
    } else if (!mazeSolving && !mazeGenerated) {
      generateMaze()
    }

  }

  // Draws the blue path which the mazeSolver follows to find the path
  function drawPath() {
    noFill()
    stroke(0, 0, 255)
    strokeWeight(5)
    beginShape()
    for (let i = 0; i<stack.length; i++) {
      vertex(stack[i].col * w + (w/2), stack[i].row * h + (h/2))
    }
    endShape()
  }

  // Maze generation algorithm (DFS with Backtracking)
  function generateMaze() {
    if (!currentFromStack) {
    // Pusing a node which is not visited yet to the queue
      stack.push(current)
      current.visited = true
    }
    if (hasUnvisitedNeighbours(current)) {
    // Selects a random neighbour from around the current cell which has not been visited
    // and breaks the wall between the current cell and the neighbour
      let neighbour = null
      const neighbours = getNeighbours(current)
      while (neighbour == null || neighbour?.visited == true) {
        neighbour = random(neighbours)
      }
      breakWalls(current, neighbour)
      current = neighbour
      currentFromStack = false
    } else {
      // If no neighbours which have already not been visited exist the we make the current
      // the last cell from the queue
      if (stack.length != 0) {
        current = stack.pop()
        currentFromStack = true
      }
    }

    if (stack.length == 0 && current == grid[0][0]) {
      mazeGenerated = true
    }
  }

  // Generates a new maze
  function regenerate() {
    if (mazeGenerated && !mazeSolving) {
      grid = []
      for (let i = 0; i<rows; i++) {
        grid.push([])
        for (let j = 0; j<cols; j++) {
          grid[i].push(new Node(i, j))
        }
      }
      current = grid[0][0]
      stack = []
      currentFromStack = false
      setTimeout(() => {mazeGenerated = false}, 1000)
    }
  }

  // Maze solving algorithm (DFS with Backtracking)
  function solveMaze() {
    if (!currentFromStack) {
    // Pusing a node which is not visited yet to the queue
      stack.push(current)
      current.visited = true
    }
    // Check if goal reached, resets grid and breaks out of loop if goal reached
    if (current == destination) {
      mazeSolving = false
      for (let i = 0; i<rows; i++) {
        for (let j = 0; j<cols; j++) {
          grid[i][j].visited = false
        }
      }
    } else {
      if (hasUnvisitedNeighbours(current)) {
      // Selects a random neighbour from around the current cell which doesnt have a wall between
      // each other and makes the neighbour the current cell
        const neighbours = getNeighbours(current)
        let index = floor(random(4))
        let neighbour = neighbours[index]
        while (current.walls[index] || neighbour?.visited == true) {
          index = floor(random(4))
          neighbour = neighbours[index]
        }
        current = neighbour
        currentFromStack = false
      } else {
        if (stack.length != 0) {
          // If no neighbours which have already not been visited exist the we make the current
          // the last cell from the queue
          current = stack.pop()
          currentFromStack = true
        }
      }
    }
  }

  // Function to trigger the maze solver
  function solve() {
    if (mazeGenerated) {
      current = grid[0][0]
      destination = grid[rows-1][cols-1]
      for (let i = 0; i<rows; i++) {
        for (let j = 0; j<rows; j++) {
          grid[i][j].visited = false
        }
      }
      stack = []
      currentFromStack = false
      mazeSolving = true
    }
  }

  // Helper function to get the neigbours around a cell which dont have walls between them
  function availableNeighnours(node) {
    let neighbours = getNeighbours(node)
    for (let i = 0; i<4; i++) {
      if (!node.walls[i] && neighbours[i]?.visited == false) {
        return true
      }
    }
    return false
  }

  class Node {
    constructor(row, col) {
      this.row = row
      this.col = col
      this.x = col*w
      this.y = row*h
      this.visited = false
      this.walls = [true, true, true, true]
    }

    // Purely graphics using p5 functions for drawing a cell of the maze
    drawNode() {
      stroke(0)
      strokeWeight(WALL_THICKNESS)
      if (this.walls[0]) {
        line(this.x, this.y, this.x+w, this.y)
      }
      if (this.walls[1]) {
        line(this.x+w, this.y, this.x+w, this.y+h)
      }
      if (this.walls[2]) {
        line(this.x, this.y+h, this.x+w, this.y+h)
      }
      if (this.walls[3]) {
        line(this.x, this.y, this.x, this.y+h)
      }
      if (this.row == current.row && this.col == current.col) {
        noStroke()
        fill(100, 100, 255, 100)
        rect(this.x, this.y, w, h)
      } else if (this.visited) {
        noStroke()
        !mazeSolving ? fill(100, 255, 100, 100) : fill(255, 100, 100, 100)
        rect(this.x, this.y, w, h)
      }
    }
  }

  // Helper function to get the neighbours around a cell which have not already been visited
  function hasUnvisitedNeighbours(node) {
    const neighbours = getNeighbours(node)
    for (let i = 0; i<neighbours.length; i++) {
      if (neighbours[i] != null && neighbours[i]?.visited == false) {
        return true
      }
    }
    return false
  }

  // Helper functions to get all neighbours of a cell
  function getNeighbours(node) {
    const neighbours = [null, null, null, null]
    if (node.row > 0) {
      neighbours[0] = grid[node.row-1][node.col]
    }
    if (node.col < (cols - 1)) {
      neighbours[1] = grid[node.row][node.col+1]
    }
    if (node.row < (rows-1)) {
      neighbours[2] = grid[node.row+1][node.col]
    }
    if (node.col > 0) {
      neighbours[3] = grid[node.row][node.col-1]
    }
    return neighbours
  }

  // Breaks walls between two cells
  function breakWalls(node, neighbour) {
    let x = (node.col - neighbour.col)
    let y = (node.row - neighbour.row)
    if (x == 1) {
      node.walls[3] = false
      neighbour.walls[1] = false
    } else if (x == -1) {
      node.walls[1] = false
      neighbour.walls[3] = false
    }
    if (y == 1) {
      node.walls[0] = false
      neighbour.walls[2] = false
    } else if (y == -1) {
      node.walls[2] = false
      neighbour.walls[0] = false
    }
  }

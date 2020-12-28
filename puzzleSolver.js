'use strict';

const blockDirection = {
  NW: 'NW',
  N: 'N',
  NE: 'NE',
  W: 'W',
  C: 'C',
  E: 'E',
  SW: 'SW',
  S: 'S',
  SE: 'SE',
}

// rowIndex 0 to 8
// Function servers 2 purposes:
// 1. Returns all unique values within a row of the puzzle
// 2. Returns false if there exists more than one identical values which indicates error
function getRowNumbers(puzzle, rowIndex) {
  const filled = [];
  for (let count = 0; count < 9; ++count) {
    const cellVal = puzzle[rowIndex][count];
    if (cellVal && filled.indexOf(cellVal) == -1) {
      filled.push(cellVal);
    }
    else if (cellVal) {
      return false;
    }
  }
  return filled.sort();
}

// colIndex 0 to 8
// Function servers 2 purposes:
// 1. Returns all unique values within a column of the puzzle
// 2. Returns false if there exists more than one identical values which indicates error
function getColumnNumbers(puzzle, colIndex) {
  const filled = [];
  for (let count = 0; count < 9; ++count) {
    const cellVal = puzzle[count][colIndex];
    if (cellVal && filled.indexOf(cellVal) == -1) {
      filled.push(cellVal);
    }
    else if (cellVal) {
      return false;
    }
  }
  return filled.sort();
}

// Each block uses the cardinal direction as the identifier
/*
____________
|NW   N   NE|
|W    C   E |
|SW   S   SE|
|___________|
*/
function getBlockIndex(block) {
  switch (block) {
    case blockDirection.NW:
      return {
        rowStart: 0,
        colStart: 0,
      };
    case blockDirection.N:
      return {
        rowStart: 0,
        colStart: 3,
      };
    case blockDirection.NE:
      return {
        rowStart: 0,
        colStart: 6,
      };
    case blockDirection.W:
      return {
        rowStart: 3,
        colStart: 0,
      };
    case blockDirection.C:
      return {
        rowStart: 3,
        colStart: 3,
      };
    case blockDirection.E:
      return {
        rowStart: 3,
        colStart: 6,
      };
    case blockDirection.SW:
      return {
        rowStart: 6,
        colStart: 0,
      };
    case blockDirection.S:
      return {
        rowStart: 6,
        colStart: 3,
      };
    case blockDirection.SE:
      return {
        rowStart: 6,
        colStart: 6,
      };
  }
}

function getBlockNumbers(puzzle, block) {
  let { rowStart, colStart } = getBlockIndex(block);
  
  const filled = [];
  for (let rowCount = 0; rowCount < 3; ++rowCount) {
    for (let colCount = 0; colCount < 3; ++colCount) {  
      const cellVal = puzzle[rowStart+rowCount][colStart+colCount];
      if (cellVal && filled.indexOf(cellVal) == -1) {
        filled.push(cellVal);
      }
      else if (cellVal) {
        return false;
      }
    }
  }
  return filled.sort();
}

function getEmptyBlockSpaces(puzzle, block) {
  let { rowStart, colStart } = getBlockIndex(block);

  const filled = [];
  for (let rowCount = 0; rowCount < 3; ++rowCount) {
    for (let colCount = 0; colCount < 3; ++colCount) {  
      const cellVal = puzzle[rowStart+rowCount][colStart+colCount];
      if (!cellVal) {
        filled.push([rowStart+rowCount, colStart+colCount]);
      }
    }
  }
  return filled;
}

function verifySudoku(puzzle) {
  for (let count = 0; count < 9; ++count) {
    if (typeof getRowNumbers(puzzle, count) == 'boolean' || typeof getColumnNumbers(puzzle, count) == 'boolean') {
      return false;
    }
  }
  return true;
}

function puzzleCompleted(puzzle) {
  for (let count = 0; count < 9; ++count) {
    if (puzzle[count].indexOf(0) >= 0) {
      return false;
    }
  }
  return true;
}

function getLocations(puzzle, emptyCells, value) {
  const possibleLocations = [];

  const iterations = emptyCells.length;
  for (let count = 0; count < iterations; ++count) {
    const currentLocation = emptyCells[count];
    const rowIndex = currentLocation[0];
    const colIndex = currentLocation[1];
    const presentRowValues = getRowNumbers(puzzle, rowIndex);
    const presentColValues = getColumnNumbers(puzzle, colIndex);
    if (presentRowValues.indexOf(value) == -1 && presentColValues.indexOf(value) == -1) {
      possibleLocations.push(currentLocation);
    }
  }
  return possibleLocations;
}

function methodOneSolve(puzzle) {
  let updateMade;

  do {
    updateMade = false;
    for (const [key, value] of Object.entries(blockDirection)) {
      puzzle = fillForBlock(puzzle, value);
    }
  } while (updateMade);

  if (puzzleCompleted(puzzle)) {
    return puzzle;
  }
  else {
    console.log('First method for solving was not enough.');
    return methodTwoSolve(puzzle);
  }

  function fillForBlock(puzzle, block) {
    let emptyCells = getEmptyBlockSpaces(puzzle, block);
    let presentNumbers = getBlockNumbers(puzzle, block);
    for (let value = 1; value <= 9; ++value) {
      if (presentNumbers.indexOf(value) == -1) {
        const possibleLocations = getLocations(puzzle, emptyCells, value);
        if (possibleLocations.length == 1) {
          console.log(`Found cell for value ${value} in ${block}.`);
          const updateRow = possibleLocations[0][0];
          const updateCol = possibleLocations[0][1];
          puzzle[updateRow][updateCol] = value;
          updateMade = true;
        }
      }
    }
    return puzzle;
  }
}

function methodTwoSolve(puzzle) {
  console.log('Puzzle received from method 1');
  console.table(puzzle);
  let updateMade;
  // Check rows
  puzzle = checkLine(puzzle, getRowNumbers);
  // Check columns
  puzzle = checkLine(puzzle, getColumnNumbers);

  if (updateMade) {
    console.log('Second method for solving found new values.');
    return methodOneSolve(puzzle);
  }
  else {
    console.log('Second method for solving was not enough.');
    return puzzle;
  }
  
  // lineFunction takes in getRowNumbers or getColumnNumbers
  // Line represents a straight line of 9 cells in the Sudoku puzzle
  function checkLine(puzzle, lineFunction) {
    let value;
    for (let index = 0; index < 9; ++index) {
      const valuesList = lineFunction(puzzle, index);
      if (valuesList.length == 8) {
        console.log('Found a line that can be completed!');
        for (let count = 1; count <= 9; ++count) {
          if (valuesList.indexOf(count) == -1) value = count;
        }
        for (let count = 0; count < 9; ++count) {
          if (!puzzle[index][count]) {
            puzzle[index][count] = value;
            updateMade = true;
          }
        }
      }
    }
    return puzzle;
  }
}

function sameRow(locations) {

}

function sameColumn(locations) {

}

function test(puzzle, block) {
  let emptyCells = getEmptyBlockSpaces(puzzle, block);
  let presentNumbers = getBlockNumbers(puzzle, block);
  for (let value = 1; value <= 9; ++value) {
    if (presentNumbers.indexOf(value) == -1) {
      const possibleLocations = getLocations(puzzle, emptyCells, value);
      if (sameRow(possibleLocations)) {

      }
      else if (sameColumn(possibleLocations)) {

      }
    }
  }
  return puzzle;
}

function initializeIndexToBlockMap() {
  const map = {};
  for (let index = 0; index < 9; ++index) {
    map[index] = [];
  }
  return map;
}

function getRowSubsections(puzzle) {
  const rowSubsections = initializeIndexToBlockMap();
  const colSubsections = initializeIndexToBlockMap();
  for (const [key, value] of Object.entries(blockDirection)) {
    const block = value;
    let emptyCells = getEmptyBlockSpaces(puzzle, block);
    let presentNumbers = getBlockNumbers(puzzle, block);
    for (let value = 1; value <= 9; ++value) {
      if (presentNumbers.indexOf(value) == -1) {
        const possibleLocations = getLocations(puzzle, emptyCells, value);
        if (possibleLocations.length < 2) {
          continue;
        }
        let sameRow = true;
        let sameCol = true;
        let rowNum, colNum, rowIndex, colIndex;
        for (const coords of possibleLocations) {
          rowIndex = coords[0];
          colIndex = coords[1];
          if (!rowNum) {
            rowNum = rowIndex;
          }
          else if (rowNum != rowIndex) {
            sameRow = false;
          }
          if (!colNum) {
            colNum = colIndex;
          }
          else if (colNum != colIndex) {
            sameCol = false;
          }
        }
        if (sameRow) {
          rowSubsections[rowIndex].push({value, block});
        }
        if (sameCol) {
          colSubsections[colIndex].push({value, block});
        }
      }
    }
  }
  console.log('yeet');
  return {
    rowSubsections,
    colSubsections,
  };
}

function analyzeSubsections(puzzle) {
  let rowSubsections = getRowSubsections(puzzle); 
  let colSubsections = getColSubsections(puzzle);
}

function complexSolve(puzzle) {
  console.log('Simple solve could not complete the puzzle.');
  console.log('Puzzle sent as: ');
  console.table(puzzle);
  console.log('Attempting complex solve...');

  const { rowSubsections, colSubsections } = analyzeSubsections(puzzle);
}

function bruteForceSolve(puzzle) {
  console.log('Complex solve could not complete the puzzle.');
  console.log('Puzzle sent as: ');
  console.table(puzzle);
  console.log('Attempting to brute force...');
}

function solve(puzzle) {
  return methodOneSolve(puzzle);
}

module.exports = { solve , puzzleCompleted , verifySudoku };

// Testing
const examplePuzzle = [
  [0, 0, 0, 0, 7, 2, 0, 0, 0],
  [6, 0, 0, 0, 3, 0, 0, 0, 0],
  [0, 2, 7, 5, 0, 9, 6, 1, 0],
  [1, 0, 5, 0, 6, 0, 4, 2, 0],
  [9, 0, 2, 0, 1, 5, 3, 0, 0],
  [0, 0, 0, 9, 0, 0, 0, 6, 1],
  [4, 0, 6, 1, 0, 0, 8, 3, 0],
  [7, 0, 0, 0, 8, 0, 1, 9, 0],
  [0, 1, 8, 0, 9, 6, 0, 4, 5],
];

const method1Fail = [
  [0, 4, 8, 0, 0, 0, 5, 0, 0],
  [0, 7, 5, 3, 8, 1, 0, 4, 9],
  [0, 3, 1, 0, 5, 0, 0, 0, 0],
  [8, 2, 3, 5, 1, 7, 4, 9, 0],
  [1, 6, 9, 0, 2, 0, 7, 5, 0],
  [7, 5, 4, 9, 0, 0, 0, 0, 0],
  [5, 1, 6, 2, 9, 0, 0, 7, 4],
  [4, 9, 2, 6, 7, 0, 1, 0, 5],
  [3, 8, 7, 1, 4, 5, 9, 0, 0],
];

async function test() {
  // console.log(verifySudoku(examplePuzzle));
  // console.table(examplePuzzle);
  console.table(methodOneSolve(method1Fail));
  
}

// test();
getRowSubsections(method1Fail);
/*
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 0 │ 0 │ 0 │ 7 │ 2 │ 0 │ 0 │ 0 │
│    1    │ 6 │ 0 │ 0 │ 0 │ 3 │ 0 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 2 │ 7 │ 5 │ 0 │ 9 │ 6 │ 1 │ 0 │
│    3    │ 1 │ 0 │ 5 │ 0 │ 6 │ 0 │ 4 │ 2 │ 0 │
│    4    │ 9 │ 0 │ 2 │ 0 │ 1 │ 5 │ 3 │ 0 │ 0 │
│    5    │ 0 │ 0 │ 0 │ 9 │ 0 │ 0 │ 0 │ 6 │ 1 │
│    6    │ 4 │ 0 │ 6 │ 1 │ 0 │ 0 │ 8 │ 3 │ 0 │ 
│    7    │ 7 │ 0 │ 0 │ 0 │ 8 │ 0 │ 1 │ 9 │ 0 │
│    8    │ 0 │ 1 │ 8 │ 0 │ 9 │ 6 │ 0 │ 4 │ 5 │ 
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┘   

Method 1 failed
From this:
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 4 │ 8 │ 0 │ 0 │ 0 │ 5 │ 0 │ 0 │
│    1    │ 0 │ 0 │ 5 │ 3 │ 8 │ 1 │ 0 │ 4 │ 9 │
│    2    │ 0 │ 0 │ 0 │ 0 │ 5 │ 0 │ 0 │ 0 │ 0 │
│    3    │ 8 │ 0 │ 3 │ 5 │ 1 │ 7 │ 4 │ 0 │ 0 │
│    4    │ 1 │ 6 │ 9 │ 0 │ 2 │ 0 │ 7 │ 0 │ 0 │
│    5    │ 0 │ 5 │ 4 │ 9 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    6    │ 5 │ 1 │ 6 │ 2 │ 9 │ 0 │ 0 │ 0 │ 4 │
│    7    │ 4 │ 0 │ 2 │ 6 │ 0 │ 0 │ 1 │ 0 │ 5 │
│    8    │ 0 │ 0 │ 0 │ 0 │ 4 │ 5 │ 9 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
To this:
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 0 │ 4 │ 8 │ 0 │ 0 │ 0 │ 5 │ 0 │ 0 │
│    1    │ 0 │ 7 │ 5 │ 3 │ 8 │ 1 │ 0 │ 4 │ 9 │
│    2    │ 0 │ 3 │ 1 │ 0 │ 5 │ 0 │ 0 │ 0 │ 0 │
│    3    │ 8 │ 2 │ 3 │ 5 │ 1 │ 7 │ 4 │ 9 │ 0 │
│    4    │ 1 │ 6 │ 9 │ 0 │ 2 │ 0 │ 7 │ 5 │ 0 │
│    5    │ 7 │ 5 │ 4 │ 9 │ 0 │ 0 │ 0 │ 0 │ 0 │
│    6    │ 5 │ 1 │ 6 │ 2 │ 9 │ 0 │ 0 │ 7 │ 4 │
│    7    │ 4 │ 9 │ 2 │ 6 │ 7 │ 0 │ 1 │ 0 │ 5 │
│    8    │ 3 │ 8 │ 7 │ 1 │ 4 │ 5 │ 9 │ 0 │ 0 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
*/

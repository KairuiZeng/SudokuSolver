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
        rowStart: 6,
        colStart: 0,
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

function fillForBlock(puzzle, block) {
  let emptyCells = getEmptyBlockSpaces(puzzle, block); // [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 1 ], [ 1, 2 ], [ 2, 0 ] ]
  let presentNumbers = getBlockNumbers(puzzle, block); // [ 2, 6, 7 ]
  for (let value = 1; value <= 9; ++value) {
    if (presentNumbers.indexOf(value) == -1) {
      const possibleLocations = getLocations(puzzle, emptyCells, value);
      if (possibleLocations.length == 1) {
        const updateRow = possibleLocations[0][0];
        const updateCol = possibleLocations[0][1];
        puzzle[updateRow][updateCol] = value;
        console.log(`Found cell for value ${value} in ${block}.`);
      }
    }
  }
  return puzzle;
}

function methodOneSweep(puzzle) {
  for (const [key, value] of Object.entries(blockDirection)) {
    puzzle = fillForBlock(puzzle, value);
  }
  return puzzle;
}

module.exports = { getRowNumbers , getColumnNumbers };

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

async function test() {
  console.log(verifySudoku(examplePuzzle));
  console.table(examplePuzzle);
  console.table(methodOneSweep(examplePuzzle));
}

test();

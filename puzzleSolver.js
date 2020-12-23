'use strict';


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
function getBlockNumbers(puzzle, block) {
  let rowStart, colStart;
  switch (block) {
    case 'NW':
      rowStart = 0;
      colStart = 0;
      break;
    case 'N':
      rowStart = 0;
      colStart = 3;
      break;
    case 'NE':
      rowStart = 6;
      colStart = 0;
      break;
    case 'W':
      rowStart = 3;
      colStart = 0;
      break;
    case 'C':
      rowStart = 3;
      colStart = 3;
      break;
    case 'E':
      rowStart = 3;
      colStart = 6;
      break;
    case 'SW':
      rowStart = 6;
      colStart = 0;
      break;
    case 'S':
      rowStart = 6;
      colStart = 3;
      break;
    case 'SE':
      rowStart = 6;
      colStart = 6;
      break;
  }
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
  let rowStart, colStart;
  switch (block) {
    case 'NW':
      rowStart = 0;
      colStart = 0;
      break;
    case 'N':
      rowStart = 0;
      colStart = 3;
      break;
    case 'NE':
      rowStart = 6;
      colStart = 0;
      break;
    case 'W':
      rowStart = 3;
      colStart = 0;
      break;
    case 'C':
      rowStart = 3;
      colStart = 3;
      break;
    case 'E':
      rowStart = 3;
      colStart = 6;
      break;
    case 'SW':
      rowStart = 6;
      colStart = 0;
      break;
    case 'S':
      rowStart = 6;
      colStart = 3;
      break;
    case 'SE':
      rowStart = 6;
      colStart = 6;
      break;
  }
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
  console.log(getBlockNumbers(examplePuzzle, 'NW'));
  console.log(getBlockNumbers(examplePuzzle, 'E'));
  console.log(getEmptyBlockSpaces(examplePuzzle, 'NW'));
  console.log(getEmptyBlockSpaces(examplePuzzle, 'E'));
}

test();

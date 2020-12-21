'use strict';

async function getFilledRowNumbers(puzzle, rowIndex) {
  const filled = [];
  for (let count = 0; count < 9; ++count) {
    const cellVal = puzzle[rowIndex][count];
    if (cellVal && filled.indexOf(cellVal) == -1) {
      filled.push(puzzle[rowIndex][count]);
    }
  }
  return filled;
}

async function getFilledColumnNumbers(puzzle, colIndex) {
  const filled = [];
  for (let count = 0; count < 9; ++count) {
    const cellVal = puzzle[count][colIndex];
    if (cellVal && filled.indexOf(cellVal) == -1) {
      filled.push(puzzle[count][colIndex]);
    }
  }
  return filled;
}

module.exports = { getFilledRowNumbers , getFilledColumnNumbers };

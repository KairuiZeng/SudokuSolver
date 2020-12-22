'use strict';

const { generateSudokuPuzzle } = require('./puzzleGenerator');
const { getFilledRowNumbers , getFilledColumnNumbers } = require('./puzzleSolver');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.log(sudokuPuzzle);
  console.table(sudokuPuzzle);
}

main();
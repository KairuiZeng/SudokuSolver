'use strict';

const { generateSudokuPuzzle } = require('./puzzleGenerator');
const { getFilledRowNumbers , getFilledColumnNumbers } = require('./puzzleSolver');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.table(sudokuPuzzle);
  console.log('Printing first column:', await getFilledColumnNumbers(sudokuPuzzle, 0));
  console.log('Printing first row:', await getFilledRowNumbers(sudokuPuzzle, 0));
}

main();
'use strict';

const { generateSudokuPuzzle } = require('./puzzleGenerator');
const { solve } = require('./puzzleSolver');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.table(sudokuPuzzle);
  console.log('Solving puzzle...');
  console.table(solve(sudokuPuzzle));
}

main();
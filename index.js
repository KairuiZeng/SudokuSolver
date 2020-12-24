'use strict';

const { generateSudokuPuzzle } = require('./puzzleGenerator');
const { solve , puzzleCompleted, verifySudoku } = require('./puzzleSolver');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.table(sudokuPuzzle);
  console.log(sudokuPuzzle);
  console.log('Solving puzzle...\n\n\n');
  const result = solve(sudokuPuzzle);
  if (puzzleCompleted(result)) {
    if (verifySudoku(puzzle)) {
      console.log('Puzzle completed!');
    }
    else {
      console.log('An error occurred during solving.');
    }
  }
  else {
    console.log('Puzzle is unfinished.');
  }
  console.table(result);
}

main();
'use strict';

const { generateSudokuPuzzle } = require('./puzzleGenerator');
const { solve , puzzleCompleted, verifySudoku } = require('./puzzleSolver');

async function main() {
  if (process.env.npm_config_browsermode) {
    console.log('Has not yet been implemented to solve in the browser.');
  }
  if (process.env.npm_config_difficulty) {
    console.log('Has not yet been implemented to change difficulty of the puzzle.');
    console.log('Difficulty would be set to:', process.env.npm_config_difficulty);
  }
  
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.table(sudokuPuzzle);
  console.log(sudokuPuzzle);
  console.log('Solving puzzle...\n\n\n');
  const result = solve(sudokuPuzzle);
  // if (puzzleCompleted(result)) {
  //   if (verifySudoku(puzzle)) {
  //     console.log('Puzzle completed!');
  //   }
  //   else {
  //     console.log('An error occurred during solving.');
  //   }
  // }
  // else {
  //   console.log('Puzzle is unfinished.');
  // }
  console.table(result);
}

main();
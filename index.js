const { generateSudokuPuzzle } = require('./puzzleGenerator');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.dir(sudokuPuzzle, {depth: 2});
}

main();
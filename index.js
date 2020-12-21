const { generateSudokuPuzzle } = require('./puzzleGenerator');

async function main() {
  const sudokuPuzzle = await generateSudokuPuzzle();
  console.table(sudokuPuzzle);
}

main();
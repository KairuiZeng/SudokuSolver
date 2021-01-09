# Sudoku AutoSolver

In progress...

This is an implementation of a Sudoku puzzle solving program.<br><br>
<h6>Run npm start {options} to use the program</h6>
<h6>Options:</h6>
<h6>--browsermode to solve the Sudoku in the sudoku.com window</h6>
<h6>--difficulty=[easy/medium/hard/expert] to toggle puzzle difficulty</h6><br><br>
The program largely depends on computations and analysis of the data stored in arrays, and also PuppeteerJS, which will fetch auto-generated Sudoku puzzles of varying difficulties from https://sudoku.com/

A variety of methods will be used for solving the Sudoku puzzles.

Method 1:
One of the most basic rules in which a row can only contain 1 of each value, the program will try to isolate a single cell within a 3x3 block for a specific value by looking at the values in other rows and columns through eliminating possible locations in which a value can be.

Method 2:
Another basic rule, the program will look for rows or columns with 8 filled in cells already, in which case the 9th can be easily found.

Method 3:
A more advanced rule, the program will look at subsections of 3x3 blocks, in which a given value can only appear in a certain row or column, in which it can be used to eliminate potential locations on other blocks affected by the row/column.
This is a more advanced concept that builds upon method 1.

Method 4:
A more advanced rule, the program will look at subsections of blocks that must contain specific values, in which they would no longer be considered for other values because there is not enough space.
i.e. A row of 3 cells could contain within it: 1, 2, 3, but the specific location is unknown. That row would then not be considered for finding the location for the value 4.

Method 5:
A more advanced rule, if a value can only appear in 2 rows/columns for 2 blocks in a row/column of blocks, the last block's value must appear in the 3rd row.

Method 5:
A brute force method completely reliant on the machine, it will determine the remaining values possibly located in a cell, and attempt to solve it with that value filled in, if successful, it will return the puzzle, if not, it will try a different value and exhaust all possible paths.
The aim is that hopefully by the time methods 1-4 are exhausted, method 5 will not have too many possible paths available.

Improvements to keep in mind:
- The first 4 methods could be combined for a strong algorithm, as of right now, it is unknown if isolating each method will be useful.

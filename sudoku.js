 document.addEventListener("DOMContentLoaded", function () {
            const container = document.getElementById("container");

            // Function to generate a random Sudoku puzzle
            function generateRandomSudoku() {
                // Placeholder function for generating a random puzzle (9x9)
                const puzzle = [
                    [5, 3, 0, 0, 7, 0, 0, 0, 0],
                    [6, 0, 0, 1, 9, 5, 0, 0, 0],
                    [0, 9, 8, 0, 0, 0, 0, 6, 0],
                    [8, 0, 0, 0, 6, 0, 0, 0, 3],
                    [4, 0, 0, 8, 0, 3, 0, 0, 1],
                    [7, 0, 0, 0, 2, 0, 0, 0, 6],
                    [0, 6, 0, 0, 0, 0, 2, 8, 0],
                    [0, 0, 0, 4, 1, 9, 0, 0, 5],
                    [0, 0, 0, 0, 8, 0, 0, 7, 9]
                ];
                return puzzle;
            }

            // Function to solve the Sudoku puzzle
            function solveSudoku(board) {
                // Placeholder function for solving Sudoku puzzle
                const solvedPuzzle = JSON.parse(JSON.stringify(board));
                solveHelper(solvedPuzzle);
                return solvedPuzzle;
            }

            // Helper function for solving Sudoku recursively
            function solveHelper(board) {
                const emptyCell = findEmptyCell(board);
                if (!emptyCell) {
                    return true; // Puzzle solved
                }

                const [row, col] = emptyCell;
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveHelper(board)) {
                            return true;
                        }
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // No valid number found for this cell
            }

            // Function to find an empty cell in the Sudoku puzzle
            function findEmptyCell(board) {
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (board[row][col] === 0) {
                            return [row, col];
                        }
                    }
                }
                return null; // No empty cell found
            }

            // Function to check if a move is valid
            function isValidMove(board, row, col, num) {
                // Check row
                for (let i = 0; i < 9; i++) {
                    if (board[row][i] === num) {
                        return false;
                    }
                }
                // Check column
                for (let i = 0; i < 9; i++) {
                    if (board[i][col] === num) {
                        return false;
                    }
                }
                // Check 3x3 grid
                const startRow = Math.floor(row / 3) * 3;
                const startCol = Math.floor(col / 3) * 3;
                for (let i = startRow; i < startRow + 3; i++) {
                    for (let j = startCol; j < startCol + 3; j++) {
                        if (board[i][j] === num) {
                            return false;
                        }
                    }
                }
                return true; // Move is valid
            }

            // Function to create the Sudoku puzzle grid
            function createSudokuGrid(puzzle) {
                container.innerHTML = '';
                puzzle.forEach((row, rowIndex) => {
                    const rowElement = document.createElement('div');
                    rowElement.classList.add('row');
                    row.forEach((cell, columnIndex) => {
                        const cellElement = document.createElement('input');
                        cellElement.classList.add('cell');
                        cellElement.classList
                            .add((rowIndex + columnIndex) % 2 === 0 ?
                                'lightBackground' : 'darkBackground');
                        cellElement.type = 'text';
                        cellElement.maxLength = 1;
                        cellElement.value = cell !== 0 ? cell : '';
                        rowElement.appendChild(cellElement);
                    });
                    container.appendChild(rowElement);
                });
            }

            // Initialize puzzle
            let initialPuzzle = generateRandomSudoku();
            let puzzle = JSON.parse(JSON.stringify(initialPuzzle));
            let solvedPuzzle = [];

            // Function to solve the puzzle
            function solvePuzzle() {
                solvedPuzzle = solveSudoku(puzzle);
                createSudokuGrid(solvedPuzzle);
            }

            // Function to reset the puzzle
            function resetPuzzle() {
                initialPuzzle = generateRandomSudoku();
                puzzle = JSON.parse(JSON.stringify(initialPuzzle));
                solvedPuzzle = [];
                createSudokuGrid(puzzle);
            }

            // Initial puzzle creation
            createSudokuGrid(puzzle);

            // Attach event listeners to buttons
            document.getElementById("solveButton")
                .addEventListener("click", solvePuzzle);
            document.getElementById("resetButton")
                .addEventListener("click", resetPuzzle);
        });

        // Assuming you have a 9x9 grid for Sudoku
const Grid = document.getElementById('sudoku-grid');  // Your grid container
let isSolved = false;  // To track if the Sudoku is solved

// Function to validate the Sudoku grid
function validateSudoku() {
  const rows = 9;
  const cols = 9;
  let isValid = true;

  // Clear any previous highlights
  clearHighlights();

  // Validate rows and columns
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.querySelector(`#cell-${row}-${col} input`);
      const value = cell.value;

      // Check if value is a valid number between 1-9
      if (value < 1 || value > 9 || isNaN(value)) {
        isValid = false;
        showErrorMessage('Invalid number! Please enter numbers between 1 and 9.');
        cell.classList.add('invalid');
      } else {
        cell.classList.remove('invalid');
      }

      // Check if there are duplicates in the row, column, and 3x3 box
      if (hasDuplicates(row, col, value)) {
        isValid = false;
        cell.classList.add('invalid');
      }
    }
  }

  // Check if the puzzle is solved
  if (isValid && isPuzzleComplete()) {
    showSuccessMessage();
  }

  return isValid;
}

// Function to check if a cell has duplicates in its row, column, or 3x3 box
function hasDuplicates(row, col, value) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && document.querySelector(`#cell-${row}-${i} input`).value === value) {
      return true;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && document.querySelector(`#cell-${i}-${col} input`).value === value) {
      return true;
    }
  }

  // Check 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;

  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      if (i !== row && j !== col && document.querySelector(`#cell-${i}-${j} input`).value === value) {
        return true;
      }
    }
  }

  return false;
}

// Function to check if the puzzle is completely solved (no empty cells)
function isPuzzleComplete() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.querySelector(`#cell-${row}-${col} input`);
      if (!cell.value) {
        return false;
      }
    }
  }
  return true;
}

// Function to show error message
function showErrorMessage(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

// Function to show success message
function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}

// Function to clear highlights (reset the grid)
function clearHighlights() {
  const cells = document.querySelectorAll('.invalid');
  cells.forEach(cell => {
    cell.classList.remove('invalid');
  });

  document.getElementById('error-message').style.display = 'none';
}

// Event listener for Sudoku inputs (you can adjust this to fit your game)
grid.addEventListener('input', validateSudoku);

// Live reload message
console.log('Live reload enabled.');

// === Timer ===
let startTime;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `Time: ${minutes}:${seconds}`;
}

// === Finish Game ===
window.finishGame = function () {
  clearInterval(timerInterval);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  alert(`You finished in ${totalTime} seconds!`);
};

// === Dark Mode Toggle ===
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return console.warn('Theme toggle button not found.');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// === New Game Button Setup ===
function setupNewGame() {
  const newGameBtn = document.getElementById('resetButton');
  if (!newGameBtn) return console.warn('New Game button not found.');
  newGameBtn.addEventListener('click', () => {
    console.log("New Game clicked");
    startTimer();

    // You can add a resetGrid() function here if needed
  });
}

// === Sudoku Validation Listener (placeholder) ===
function validateSudoku() {
  console.log("Sudoku input changed — validation goes here.");
}

// === Attach validation to the grid ===
function setupGridValidation() {
  const gridContainer = document.getElementById('container');
  if (!gridContainer) return console.warn('Grid container not found.');
  gridContainer.addEventListener('input', validateSudoku);
}

// === Init all features when DOM is ready ===
window.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupNewGame();
  setupGridValidation();
});

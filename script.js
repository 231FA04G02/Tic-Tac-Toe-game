const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  isXTurn = true;
  message.textContent = "Player X's Turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    message.textContent = `Player ${currentClass} Wins!`;
    endGame();
  } else if (isDraw()) {
    message.textContent = "It's a Draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
    message.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

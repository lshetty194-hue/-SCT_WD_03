const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let turn = 'X'; 
let board = Array(9).fill('');
let gameOver = false;

const winningPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, i) => {
  cell.addEventListener('click', () => {
    if (board[i] !== '' || gameOver) return;

    board[i] = turn;
    cell.textContent = turn;
    checkWinner();
    turn = turn === 'X' ? 'O' : 'X';
  });
});

resetBtn.addEventListener('click', resetGame);

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a] && 
      board[a] === board[b] && 
      board[b] === board[c]
    ) {
      message.textContent = `${board[a]} Wins!`;
      gameOver = true;
      return;
    }
  }
  if (!board.includes('')) {
    message.textContent = "It's a Draw!";
    gameOver = true;
  }
}

function resetGame() {
  board.fill('');
  cells.forEach(cell => (cell.textContent = ''));
  message.textContent = '';
  turn = 'X';
  gameOver = false;
}

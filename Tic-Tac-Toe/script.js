const board = document.getElementById('game-board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const winnerModal = document.getElementById('winner-modal');
const winnerMessage = document.getElementById('winner-message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'T'; // Tie
    }

    return null; // Game still in progress
}

function handleCellClick(index) {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        const winner = checkWinner();

        if (winner) {
            if (winner === 'T') {
                showModal('It\'s a tie!');
            } else {
                showModal(`Player ${winner} wins!`);
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    renderBoard();
    hideModal();
}

function showModal(result) {
    winnerMessage.textContent = result;
    winnerModal.style.display = 'flex';
}

function hideModal() {
    winnerModal.style.display = 'none';
}

renderBoard();

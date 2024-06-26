document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart-btn");
    let isPlayerOneTurn = true; // Player 1 is 'X', Player 2 is 'O'
    let boardState = Array(9).fill(null); // Initialize empty board

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (boardState[index] || checkWin()) return; // Ignore if cell is already filled or game is over

        boardState[index] = isPlayerOneTurn ? 'X' : 'O';
        cell.textContent = boardState[index];

        if (checkWin()) {
            message.textContent = `Player ${isPlayerOneTurn ? '1' : '2'} wins!`;
        } else if (boardState.every(cell => cell)) {
            message.textContent = 'It\'s a draw!';
        } else {
            isPlayerOneTurn = !isPlayerOneTurn;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function restartGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        message.textContent = '';
        isPlayerOneTurn = true;
    }
});

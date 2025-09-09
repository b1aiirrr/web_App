class TicTacToe {
    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    placeMark(row, col, mark) {
        if (row >= 0 && row <= 2 && col >= 0 && col <= 2) {
            this.board[row][col] = mark;
            return true;
        } else {
            console.log("Invalid Position!");
            return false;
        }
    }

    checkRowWin() {
        for (let i = 0; i <= 2; i++) {
            if (this.board[i][0] !== ' ' &&
                this.board[i][0] === this.board[i][1] &&
                this.board[i][1] === this.board[i][2]) {
                return true;
            }
        }
        return false;
    }

    checkColWin() {
        for (let j = 0; j <= 2; j++) {
            if (this.board[0][j] !== ' ' &&
                this.board[0][j] === this.board[1][j] &&
                this.board[1][j] === this.board[2][j]) {
                return true;
            }
        }
        return false;
    }

    checkDiagonalWin() {
        return (this.board[0][0] !== ' ' &&
            this.board[0][0] === this.board[1][1] &&
            this.board[1][1] === this.board[2][2]) ||
            (this.board[0][2] !== ' ' &&
                this.board[0][2] === this.board[1][1] &&
                this.board[1][1] === this.board[2][0]);
    }

    displayBoard() {
        let display = "-------------\n";
        for (let i = 0; i < 3; i++) {
            display += "| ";
            for (let j = 0; j < 3; j++) {
                display += this.board[i][j] + " | ";
            }
            display += "\n-------------\n";
        }
        return display;
    }
}

class HumanPlayer {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    isValidMove(row, col) {
        if (row >= 0 && row <= 2 && col >= 0 && col <= 2) {
            if (game.board[row][col] === ' ') {
                return true;
            }
        }
        return false;
    }
}

let game;
let player1;
let player2;
let currentPlayer;
let gameActive = false;

function startGame() {
    const p1Name = document.getElementById('p1-name').value || 'Player 1';
    const p1Mark = document.getElementById('p1-mark').value.toUpperCase() || 'X';
    const p2Name = document.getElementById('p2-name').value || 'Player 2';
    const p2Mark = document.getElementById('p2-mark').value.toUpperCase() || 'O';

    if (p1Mark === p2Mark) {
        alert('Players must have different marks!');
        return;
    }

    game = new TicTacToe();
    player1 = new HumanPlayer(p1Name, p1Mark);
    player2 = new HumanPlayer(p2Name, p2Mark);
    currentPlayer = player1;
    gameActive = true;

    document.getElementById('setup-form').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('game-info').style.display = 'block';

    updateDisplay();
}

function makeMove(row, col) {
    if (!gameActive) return;

    if (currentPlayer.isValidMove(row, col)) {
        game.placeMark(row, col, currentPlayer.mark);

        const cellId = `cell-${row}-${col}`;
        const cell = document.getElementById(cellId);
        cell.textContent = currentPlayer.mark;
        cell.disabled = true;

        updateDisplay();

        if (game.checkRowWin() || game.checkColWin() || game.checkDiagonalWin()) {
            document.getElementById('winner-message').textContent =
                `🎉 ${currentPlayer.name} has Won! 🎉`;
            gameActive = false;
            disableAllCells();
        } else if (isBoardFull()) {
            document.getElementById('winner-message').textContent =
                `🤝 It's a Draw! 🤝`;
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            document.getElementById('current-player').textContent =
                `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
        }
    } else {
        alert('Invalid move! That position is already taken.');
    }
}

function updateDisplay() {
    document.getElementById('current-player').textContent =
        `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
    document.getElementById('board-display').textContent = game.displayBoard();
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game.board[i][j] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function disableAllCells() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`cell-${i}-${j}`).disabled = true;
        }
    }
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = '';
            cell.disabled = false;
        }
    }

    game = new TicTacToe();
    currentPlayer = player1;
    gameActive = true;

    document.getElementById('winner-message').textContent = '';

    updateDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartButton = document.getElementById('restartButton');
    const fireworksContainer = document.getElementById('fireworks-container');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const fireworks = new Fireworks(fireworksContainer, {
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1,
        particles: 50,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: { min: 50, max: 80, decay: { min: 0.015, max: 0.03 } },
        boundaries: { x: 50, y: 50, width: fireworksContainer.clientWidth, height: fireworksContainer.clientHeight },
        sound: { enable: true, files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'], volume: { min: 4, max: 8 } },
    });

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        cell.innerText = currentPlayer;
        board[index] = currentPlayer;
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            message.innerText = `${currentPlayer} has won!`;
            gameActive = false;
            fireworks.start();
            setTimeout(() => fireworks.stop(), 5000);
            return;
        }

        const roundDraw = !board.includes('');
        if (roundDraw) {
            message.innerText = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.innerText = '');
        message.innerText = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});

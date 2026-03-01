let board = ["","","","","","","","",""];
let player = "X";
let gameOver = false;
let mode = "pvp";

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function createBoard() {
    boardDiv.innerHTML = "";
    for(let i=0;i<9;i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.onclick = () => play(i);
        boardDiv.appendChild(cell);
    }
}

function play(index) {
    if(board[index] !== "" || gameOver) return;

    board[index] = player;
    boardDiv.children[index].innerText = player;

    checkWinner();

    if(!gameOver) {
        player = player === "X" ? "O" : "X";
        statusText.innerText = "Player " + player + " Turn";
    }

    if(mode === "ai" && player === "O" && !gameOver) {
        setTimeout(aiMove, 400);
    }
}

function aiMove() {
    let empty = board
        .map((v,i) => v === "" ? i : null)
        .filter(v => v !== null);

    let move = empty[Math.floor(Math.random() * empty.length)];
    play(move);
}

function checkWinner() {
    for(let pattern of winPatterns) {
        let [a,b,c] = pattern;

        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = "🎉 Player " + board[a] + " Wins!";
            statusText.classList.add("win-message");
            gameOver = true;
            return;
        }
    }

    if(!board.includes("")) {
        statusText.innerText = "Game Draw!";
        statusText.classList.add("win-message");
        gameOver = true;
    }
}

function restart() {
    board = ["","","","","","","","",""];
    player = "X";
    gameOver = false;
    statusText.innerText = "Player X Turn";
    statusText.classList.remove("win-message");
    createBoard();
}

function setMode(m) {
    mode = m;
    restart();
}

createBoard();
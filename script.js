let mode = 'gravit'
let board;
const huPlayer = 'O';
const aiPlayer = 'X';
let current;
let availableSpots;
let reset = false;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

function startGame() {
    board = [];
    current = huPlayer;
    availableSpots = [6, 7, 8];
    document.querySelector(".endgame").style.display = "none";
    for (let i = 0; i < 9; i++) {
        board.push(document.getElementById(String(i)));
        board[i].innerHTML = "";
        board[i].classList.remove("color");
        if (mode !== 'demo')
            board[i].addEventListener('click', handleClick);
    }
}

function fall(startId, endId, player, top) {
    if (!top) {
        top = 0;
        board[startId].innerHTML = '<p class="falling">' + player + '</p>';
    }
    if (top < (endId - startId) * 100 / 3) {
        const elem = document.querySelector(`#\\3${startId}  .falling`);
        elem.style.top = top + 'px';

        setTimeout(() => fall(startId, endId, player, top + 5), 20)
    } else {
        board[startId].innerHTML = ''
        board[endId].innerHTML = player;
        checkWin(player);
    }
}

function handleClickGravity(e) {
    const cellId = Number(e.target.id);
    const col = cellId % 3;
    if (availableSpots[col] >= cellId) {
        availableSpots[col] -= 3;
        fall(cellId, availableSpots[col] + 3, current)
        setLoading();
        current = (current === huPlayer) ? aiPlayer : huPlayer;
    }
}
function handleClickNormal(e) {
    const cellId = Number(e.target.id);
    if (board[cellId].innerHTML === "") {
        board[cellId].innerHTML = current;
        checkWin(current);
        setLoading();
        current = (current === huPlayer) ? aiPlayer : huPlayer;
    }
}

function handleClickComet(e) {
    const cellId = Number(e.target.id);
    comet_caller();
    console.log("C");
    if (board[cellId].innerHTML === "") {
        board[cellId].innerHTML = current;
        checkWin(current);
        setLoading();
        current = (current === huPlayer) ? aiPlayer : huPlayer;
    }
}

function comet_caller() {
    let call = Math.floor((Math.random() * 2));
    if (call < 1) {
        let ind = Math.floor((Math.random() * 9));
        board[ind].innerHTML = "<img src=./img/fire.gif>"
        setTimeout(() => {
            board[ind].innerHTML = "";
        }, 1000)
    }
}

function handleClick(e) {
    console.log("hi")
    if (mode === 'anti-gravity') {
        return handleClickNormal(e);
    }
    else if (mode === 'gravity') {
        return handleClickGravity(e);
    }
    else if (mode === 'comet') {

        return handleClickComet(e);
    }
}

function setLoading() {
    let p = Number(current === huPlayer);
    document.querySelector(".player" + p).classList.remove("loading");
    p = 1 - p;
    document.querySelector(".player" + p).classList.add("loading");
}
function settingFalse() {
    for (let i = 0; i < 9; i++)
        board[i].removeEventListener('click', handleClick);
}
function checkWin(player, newBoard = board) {
    for (let i = 0; i < 8; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (newBoard[winCombos[i][j]].innerHTML !== player)
                win = false;
        }
        if (win) {
            settingFalse();
            declareWinner(player + " Player Wins!");
            for (let j = 0; j < 3; j++) {
                newBoard[winCombos[i][j]].classList.add('color')
            }
            return true;
        }
    }
    if (checkTie()) {
        settingFalse();
        declareWinner('Tie Game!');
    }
}
function checkTie() {
    for (let i = 0; i < 9; i++) {
        if (board[i].innerHTML === "")
            return false;
    }
    return true;
}
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function runDemo(player = aiPlayer) {

    setTimeout(() => {
        if (reset) {
            startGame();
            reset = false;
        }
        if (!checkWin((player === aiPlayer) ? huPlayer : aiPlayer) && !checkTie()) {
            let ind = -1;
            while (ind === -1 || board[ind].innerHTML !== "")
                ind = Math.floor((Math.random() * 9));

            if (board[ind].innerHTML === "") {
                board[ind].innerHTML = player
            }
            player = (player === aiPlayer) ? huPlayer : aiPlayer;
            // console.log('Play end')

            runDemo(player);
        }
        else {
            reset = true;
            runDemo();
        }
    }, 1200)
}

function setMode(m) {
    console.log("setMode")
    localStorage.setItem("pragya-mode", m);
    window.location.href = 'ticTacToe.html'
}

function setDifficulty(m) {
    localStorage.setItem("pragya-difficulty", m);
    window.location.href = 'AlienvsA.html'
}

mode = localStorage.getItem("pragya-mode") || 'demo';

if (document.querySelector('.menu-grid')) mode = 'demo'

document.querySelector('body').classList.add('mode-' + mode)

startGame();
if (mode === 'demo') runDemo();
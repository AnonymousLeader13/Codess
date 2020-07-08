let board;
const huPlayer = 'O';
const aiPlayer = 'X';
let current;
let availableSpots;
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
    availableSpots = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 9; i++) {
        board.push(document.getElementById('c' + i));
        board[i].innerHTML = "";
    }
    document.querySelector(".endgame").style.display = "none";
    play();
}

function play(player = aiPlayer) {
    // while (!checkWin((player === aiPlayer) ? huPlayer : aiPlayer) && !checkTie()){
    //     let ind = Math.floor((Math.random() * 8) + 1); 
    //     if(board[ind].innerHTML === ""){
    //         board[ind].innerHTML = player
    //     }
    //     // if(checkWin(player) || checkTie)
    //     //     return;
    //     player = (player === aiPlayer) ? huPlayer : aiPlayer;
    // }

    setTimeout(() => {
        if (!checkWin((player === aiPlayer) ? huPlayer : aiPlayer) && !checkTie()) {
            let ind = Math.floor((Math.random() * 8) + 1); 
        if(board[ind].innerHTML === ""){
            board[ind].innerHTML = player
        }
        // if(checkWin(player) || checkTie)
        //     return;
        player = (player === aiPlayer) ? huPlayer : aiPlayer;

        play(player);
        }
    }, 900)
}

// function settingFalse() {
//     for (let i = 0; i < 9; i++)
//         board[i].removeEventListener('click', handleClick);
// }
function checkWin(player, newBoard = board) {
    for (let i = 0; i < 8; i++) {
        let win = true;
        for (let j = 0; j < 3; j++) {
            if (newBoard[winCombos[i][j]].innerHTML !== player)
                win = false;
        }
        if (win) {
            // settingFalse();
            declareWinner(player + " Player Wins!");
            for (let j = 0; j < 3; j++) {
                newBoard[winCombos[i][j]].classList.add("color")
            }
            return true;
        }
    }
    return false;
}
function checkTie() {
    for (let i = 0; i < 9; i++) {
        if (board[i].innerHTML === "")
            return false;
    }
    // settingFalse();
    declareWinner('Tie Game!');
    return true;
}
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

startGame();
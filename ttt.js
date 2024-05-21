const gameBoard = document.querySelector(".gameboard");
const boxes = document.querySelectorAll(".box")

const Gameboard = (() => {
    let board = Array(9).fill(null); 
    const getBoard = () => board;
    const setBoard = (index, value) => {
        if (index >= 0 && index < board.length) {
            board[index] = value;
        }
    };
    const resetBoard = () => {
        board = Array(9).fill(null);
    };
    return { getBoard, setBoard, resetBoard};
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    let currentPlayer;
    const players = [];
    let getPlayer = () => currentPlayer;
    const startGame = (p1, p2) => {
        players.push(p1, p2);
        currentPlayer = p1;
        Gameboard.resetBoard();
    }
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }
    const checkWin = () => {
        board = Gameboard.getBoard();
        const winningCombo = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombo.some(combo => {
            const [a, b, c] = combo;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }
    const playTurn = (index) => {
        if (Gameboard.getBoard()[index] === null) {
            Gameboard.setBoard(index, currentPlayer.marker);
            switchPlayer();
        } else {
        };
        if (checkWin()){
            switchPlayer();
            const winmsg = document.querySelector(".winnermessage");
            winmsg.innerHTML = "Congrats " + currentPlayer.name + " you won!";
            switchPlayer();
        };    
    }
    return { startGame, playTurn, getPlayer, checkWin, players};
})();

const displayController = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector(".form");
        turnmsg = document.querySelector(".turnmsg");
        form.addEventListener("reset", (event) => {
            boxes.forEach(div => {
                div.innerHTML = "";
            })
            winmsg = document.querySelector(".winnermessage");
            winmsg.innerHTML = "";
            Gameboard.resetBoard();
        })
        form.addEventListener("submit", (event) => {
            gameInProgress = true;
            event.preventDefault();
            const formData = new FormData(form);
            const p1name = formData.get("player1");
            const p2name = formData.get("player2");
            const p1 = Player(p1name, "O");
            const p2 = Player(p2name, "X");
            GameController.startGame(p1, p2);
            turnmsg.innerHTML = p1.name + "'s turn";
            function playgame() {
                if (gameInProgress) {
                    const box = this;
                    const index = Array.from(boxes).indexOf(box);
                    if (GameController.getPlayer().name === p1.name) {
                        box.innerHTML = p1.marker;
                        turnmsg.innerHTML = p2.name + "'s turn";
                    } else if (GameController.getPlayer().name === p2.name){
                        box.innerHTML = p2.marker;
                        turnmsg.innerHTML = p1.name + "'s turn";
                    } else {
            }
                GameController.playTurn(index);
                if (GameController.checkWin()) {
                    turnmsg.innerHTML = "";
                    gameInProgress = false;
                    GameController.players.pop();
                    GameController.players.pop();
                    boxes.forEach((box, index) => {
                        box.removeEventListener("click", playgame)
                    })
            }
        }
            }
            boxes.forEach((box, index) => {
                box.addEventListener("click", playgame);
            
    });
    form.reset();
        })
    })
    
})();


"use strict";

const xMarkBtn = document.getElementById("xMarkBtn");
const oMarkBtn = document.getElementById("oMarkBtn");
const cells = document.querySelectorAll(".cell");

const Player = mark => {
    const getMark = () => mark;
    return { getMark };
};

const gameBoard = (() => {
    let marks = ["", "", "", "", "", "", "", "", ""];
    const marksToArray = cell => {
        marks[cell] = gameController.getCurrentPlayer().getMark();
    }
    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            marks[i] = "";
        }
    }
    const getCell = (cell) => {
        return marks[cell];
    }
    const initBoard = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", event => {
                if (event.target.textContent !== "") return;
                displayController.changeButtonColor();
                marksToArray(event.target.dataset.index);
                displayController.renderMarks();
                gameController.checkWinner(marks);
            })
        });
        xMarkBtn.style.backgroundColor = "#001233";
    }
    return { initBoard, getCell, clearBoard };
})();

const displayController = (() => {
    const board = document.getElementById("gameBoard");
    const winnerText = document.getElementById("winnerText");
    const winnerMark = document.getElementById("winnerMark");
    const outcomeText = document.getElementById("outcomeText");
    const renderMarks = () => {
        for (let i = 0; i < 9; i++) {
            cells[i].textContent = gameBoard.getCell(i);
        }
    }
    const displayWin = () => {
        winnerMark.textContent = gameController.getCurrentPlayer().getMark();
        outcomeText.textContent = "won!";
        board.classList.add("fade-away");
        winnerText.classList.add("fade-in");
    }
    const displayTie = () => {
        winnerMark.textContent = "XO";
        outcomeText.textContent = "tie!";
        board.classList.add("fade-away");
        winnerText.classList.add("fade-in");
    }
    const resetBoard = () => {
        winnerMark.textContent = "";
        outcomeText.textContent = "";
        board.classList.remove("fade-away");
        winnerText.classList.remove("fade-in");
    }
    const changeButtonColor = () => {
        if (gameController.getCurrentPlayer().getMark() === "X") {
            xMarkBtn.style.backgroundColor = "#33415c";
            oMarkBtn.style.backgroundColor = "#001233";
        } else {
            xMarkBtn.style.backgroundColor = "#001233";
            oMarkBtn.style.backgroundColor = "#33415c";
        }
    }
    return { renderMarks, changeButtonColor, displayWin, displayTie, resetBoard };
})();

const gameController = (() => {
    const playAgainBtn = document.getElementById("playAgainBtn");
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let currentPlayer = playerOne;
    let roundNumber = 1;
    const getCurrentPlayer = () => currentPlayer;
    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    const checkWinner = marks => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        const winCombination = winCondition.some(combination =>
            combination.every(index =>
                marks[index] === currentPlayer.getMark()
            )
        );
        if (winCombination === true) {
            displayController.displayWin();
        } else if (roundNumber === 9) {
            displayController.displayTie();
        }
        else {
            changePlayer();
            roundNumber++;
        }
    }
    playAgainBtn.addEventListener("click", () => {
        gameBoard.clearBoard();
        displayController.renderMarks();
        currentPlayer = playerOne;
        xMarkBtn.style.backgroundColor = "#33415c";
        oMarkBtn.style.backgroundColor = "#33415c";
        xMarkBtn.style.backgroundColor = "#001233";
        displayController.resetBoard();
        roundNumber = 1;
    });
    return { checkWinner, getCurrentPlayer, getCurrentPlayer };
})();

document.onload = gameBoard.initBoard();



"use strict";

const Player = mark => {
    const getMark = () => mark;
    return { getMark };
};

const gameBoard = (() => {
    const cells = document.querySelectorAll(".cell");
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
                gameController.changePlayer();
            })
        });
        xMarkBtn.style.backgroundColor = "#001233";
    }
    return { initBoard, getCell, clearBoard };
})();

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const renderMarks = () => {
        for (let i = 0; i < 9; i++) {
            cells[i].textContent = gameBoard.getCell(i);
        }
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
    return { renderMarks, changeButtonColor };
})();

const gameController = (() => {
    const playAgainBtn = document.getElementById("playAgainBtn");
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let currentPlayer = playerOne;
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
    }
    playAgainBtn.addEventListener("click", () => {
        gameBoard.clearBoard();
        displayController.renderMarks();
        displayController.changeButtonColor();
    });
    return { changePlayer, checkWinner, getCurrentPlayer };
})();

const xMarkBtn = document.getElementById("xMarkBtn");
const oMarkBtn = document.getElementById("oMarkBtn");
/*
xMarkBtn.addEventListener("click", () => {
    xMarkBtn.style.backgroundColor = "#001233";
    oMarkBtn.style.backgroundColor = "#33415c";
});
oMarkBtn.addEventListener("click", () => {
    oMarkBtn.style.backgroundColor = "#001233";
    xMarkBtn.style.backgroundColor = "#33415c";
});
*/
document.onload = gameBoard.initBoard();



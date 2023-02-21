"use strict";

const Player = (mark) => {
    const getMark = () => mark;
    return { getMark };
};

const gameBoard = (() => {
    const cells = document.querySelectorAll(".cell");
    let marks = ["", "", "", "", "", "", "", "", ""];
    const initBoard = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", (event) => {
                if (event.target.textContent !== "") return;
                displayController.marksToArray(event.target.dataset.index);
                displayController.renderMarks();
                displayController.changePlayer();
            })
        });
        xMarkBtn.style.backgroundColor = "#001233";
    }
    return { initBoard, marks, cells };
})();

const displayController = (() => {
    let playerOne = Player("X");
    let playerTwo = Player("O");
    let currentPlayer = playerOne;
    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    const renderMarks = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard.cells[i].textContent = gameBoard.marks[i];
        }
    }
    const marksToArray = (cell) => {
        gameBoard.marks[cell] = currentPlayer.getMark();
    }
    return { renderMarks, changePlayer, marksToArray };
})();

const xMarkBtn = document.getElementById("xMarkBtn");
const oMarkBtn = document.getElementById("oMarkBtn");
xMarkBtn.addEventListener("click", () => {
    xMarkBtn.style.backgroundColor = "#001233";
    oMarkBtn.style.backgroundColor = "#33415c";
});
oMarkBtn.addEventListener("click", () => {
    oMarkBtn.style.backgroundColor = "#001233";
    xMarkBtn.style.backgroundColor = "#33415c";
});
document.onload = gameBoard.initBoard();



const displayPlayer = document.querySelector(".display-player"); // shows which player's turn it is
const announcer = document.querySelector(".announcer"); // shows result of the game (like winner or draw)
const tiles = Array.from(document.querySelectorAll(".tile")); // gets all the tiles (boxes) in the game grid - stores all the tiles in an array
const resetButton = document.querySelector(".reset");

const xWinsOutput = document.getElementById("xWins");
const oWinsOutput = document.getElementById("oWins");
const tiesOutput = document.getElementById("ties");

let xWins = 0;
let oWins = 0;
let ties = 0;

// HW - Write comments (proper explanation) of each thing in js

let currentPlayer = "X"; // so first player is X and maintains throughout
let board = ["", "", "", "", "", "", "", "", ""]; // board array will hold the current state of the game
// it will be updated every time a player make a move

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

let isGameActive = true;

/*
winning condition is an array of arrays that holds the index of the tile that need to be occupied by the same player to win the game store all the combinations where player can win the game
*/

/*
currentPlayer is a variable that holds the value for the currentPlayer.

changePlayer is a function that changes the value of currentPlayer to the other player.

userAction is a function that takes in the tile and index as parameters, sets the innerText of the tile to the currentPlayer, adds a class to the tile for styling, and then calls changePlayer to switch to the other player.

The tiles are mapped over, and an event listener is added to each tile that calls userAction when the tile is clicked.
*/

const handleResultValidation = () => { // checks if the current player has won the game or the game is a tie
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) { // lopp through the winning conditions
        const winCondition = winningConditions[i]; // get the current winning condition and store in a,b,c variable
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        // if any one is empty then continue to the next
        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        announcer.innerText = "Player " + currentPlayer + " wins!"; // show the winner on the screen rather than in an alert box
        announcer.classList.remove("hide"); // remove the hide style so the announcer shows the winner
        if (currentPlayer === "X") {
            xWins++;
            xWinsOutput.innerText = xWins;
        }
        if (currentPlayer === "O") {
            oWins++;
            oWinsOutput.innerText = oWins;
        }
    }

    if (!board.includes("")) {
        isGameActive = false;
        announcer.innerText = "It's a tie!";
        announcer.classList.remove("hide");
        ties++;
        tiesOutput.innerText = ties;
        announcer.innerText = "It's a tie!";
        announcer.classList.remove("hide");
    }
}

const changePlayer = () => {
    displayPlayer.classList.remove("player" + currentPlayer);
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    displayPlayer.innerText = currentPlayer;
    displayPlayer.classList.add("player" + currentPlayer);
}

const userAction = (tile, index) => {
    if (isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add("player" + currentPlayer);
        board[index] = currentPlayer;
        handleResultValidation();
        changePlayer();
    }
}

tiles.map((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
})

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];

    isGameActive = true;
    if (currentPlayer === "O") {
        changePlayer();
    }
    tiles.forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO");
    });
    announcer.classList.add("hide"); // after resetting the game, then hide the announcer
});

//create a function
const myfunc = () => {
    console.log("Hello World");
}
const calculate = (a, b, operator) => {
    if (operator === "+") {
        console.log("Sum of 2 numbers are" + (a + b));
    }
    if (operator === "-") {
        console.log("Difference of 2 numbers are" + (a - b));
    }
    if (operator === "*") {
        console.log("Product of 2 numbers are" + (a * b));
    }
    if (operator === "/") {
        console.log("Quotient of 2 numbers are" + (a / b));
    }
}
// call the function
myfunc();

const a = 10;
const b = 20;
console.log(a + b);
const c = 20;
const d = 40;
console.log(c + d);


calculate(20, 40, "+");
calculate(20, 40, "-");

// Scoreboard Tracking:
// HW - Notes

// local storage.setItem ("variable name/key", "value") - can store anything
localStorage.setItem("name", "Aaron");
localStorage.setItem("a", 10);

// can break the system by clearing the cache for limits on free to use stuff. 1. local storage. 2. cookies

/*
localStorage.setItem("name", "John");
localStorage.setItem("a", 10);
*/
console.log(localStorage.getItem("name"));

let a = 1; // variable to store the count
if (localStorage.getItem("a") === null) {
    localStorage.setItem("a", a); // if not create it and set to 1
} else {
    a = parseInt(localStorage.getItem("a")) + 1;
    localStorage.setItem("a", a); // save updated value
}
console.log(localStorage.getItem("a"));

// run this code every 1 second
setInterval(() => {
    a = parseInt(localStorage.getItem("a")) + 1;
    localStorage.setItem("a", a);

    // check if value is > 100
    if (a > 100) {
        alert(" your time is up");
        localStorage.removeItem("a");

    }
}, 1000);

//localStorage.clear(); // removes all data from localStorage

// run once after 10 sec
setTimeout(() => {
    alert("10 seconds have passed");
}, 10000);

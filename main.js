//declaring various pieces of html in js
//mancalas
let mancalaOne = document.querySelector(".mancala-one");
let mancalaTwo = document.querySelector(".mancala-two");
let scoreboard = document.querySelector("#scoreboard");
//player 1 and 2s scoreboards
let scoreboardOne = document.querySelector("#scoreboard-one");
let scoreboardTwo = document.querySelector("#scoreboard-two");
//the players scores
let scoreOne = document.querySelector("#score-one");
let scoreTwo = document.querySelector("#score-two");
//the pieces
let pieces = document.querySelectorAll(".piece");
let sideOne = document.querySelector(".side-one");
let sideTwo = document.querySelector("side-two");
let body = document.querySelector("body");
//global variables for tracking players score
let countOne = 0;
let countTwo = 0;
//all the pockets of side 1 & 2 to check if they're empty
let pocketsOne = document.querySelectorAll(".side-one > div");
let pocketsTwo = document.querySelectorAll(".side-two > div");

let pocketOne = document.querySelector(".pocket-one");
let pocketTwo = document.querySelector(".pocket-two");
let pocketThree = document.querySelector(".pocket-three");
let pocketFour = document.querySelector(".pocket-four");
let pocketFive = document.querySelector(".pocket-five");
let pocketSix = document.querySelector(".pocket-six");
let pocketSeven = document.querySelector(".pocket-seven");
let pocketEight = document.querySelector(".pocket-eight");
let pocketNine = document.querySelector(".pocket-nine");
let pocketTen = document.querySelector(".pocket-ten");
let pocketEleven = document.querySelector(".pocket-eleven");
let pocketTwelve = document.querySelector(".pocket-twelve");

//function that checks who won the game
const checkWin = function () {
  let winner = document.createElement("p");
  body.style.backgroundColor = "pink";
  winner.style.borderStyle = "solid";
  body.appendChild(winner);
  if (countOne > countTwo) {
    winner.textContent = "Player 1 wins!";
    winner.style.borderColor = "blue";
  } else if (countOne < countTwo) {
    winner.textContent = "Player 2 wins!";
    winner.style.borderColor = "red";
  } else {
    winner.textContent = "Draw!";
  }
};

//function that increases each players score when they capture a piece
const checkScore = function () {
  //checks the children of mancalaOne
  for (i of mancalaOne.childNodes) {
    //checks to make sure its a div and hasnt been prebiously checked
    if (i.nodeName === "DIV" && i.classList.contains("checked") == false) {
      //increases player one's count
      countOne += 1;
      //sets scoreboard to new score
      scoreOne.textContent = countOne;
      //marks piece as checked
      i.classList.add("checked");
      //changes color of piece
      i.style.backgroundColor = "blue";
    }
  }
  //same as above loop but for mancala two
  for (i of mancalaTwo.childNodes) {
    if (i.nodeName === "DIV" && i.classList.contains("checked") == false) {
      countTwo += 1;
      scoreTwo.textContent = countTwo;
      i.classList.add("checked");
      i.style.backgroundColor = "red";
    }
  }
  //variable that checks if one side is empty
  let notEmptyOne = false;
  //iterates through each pocket on a side
  for (i of pocketsOne) {
    //checks children of pocket, sees if its a div
    for (child of i.childNodes) {
      if (child.nodeName === "DIV") {
        //as soon as it finds a div, it means that side is not empty
        notEmptyOne = true;
      }
    }
  }
  //repeat of above code for side two
  let notEmptyTwo = false;
  for (i of pocketsTwo) {
    for (child of i.childNodes) {
      if (child.nodeName === "DIV") {
        notEmptyTwo = true;
      }
    }
  }
  //if one of the sides is gone through and there are no pieces, checks who won
  if (notEmptyOne === false) {
    return checkWin();
  }
  if (notEmptyTwo === false) {
    return checkWin();
  }
};

//If any of the pockets are clicked, check the score
pocketsOne.forEach((element) => element.addEventListener("click", checkScore));
pocketsTwo.forEach((element) => element.addEventListener("click", checkScore));

//For each of the piece displays
let displayOnePieces = document.querySelector(".piece-display-one").children;
let displayTwoPieces = document.querySelector(".piece-display-two").children;

//Function to display how many pieces in each pocket and display it
const piecesInPocket = function () {
  let currentPocket = 0;
  //Check each piece in each pocket
  for (let pocket of pocketsOne) {
    let pieces = 0;
    for (let piece of pocket.children) {
      pieces++;
      displayOnePieces[currentPocket].querySelector("p").textContent =
        pieces + " Pieces";
    }
    currentPocket++;
  }
  //Reset currentPocket to be used again to check pieces for second display
  currentPocket = 0;

  for (let pocket of pocketsTwo) {
    let pieces = 0;
    for (let piece of pocket.children) {
      pieces++;
      displayTwoPieces[currentPocket].querySelector("p").textContent =
        pieces + " Pieces";
    }
    currentPocket++;
  }
};

//Call function once for when window loads
piecesInPocket();
//If any of the pockets are clicked, a turn has gone, thus check the score
pocketsOne.forEach((element) =>
  element.addEventListener("click", piecesInPocket)
);
pocketsTwo.forEach((element) =>
  element.addEventListener("click", piecesInPocket)
);

//Variales to check whose turn it is; if true its your turn
let playerOneTurn = false;
let playerTwoTurn = false;
//These are displays to see whose turn it is
let playerOneDisplay = document.querySelector(".player-one-display");
let playerTwoDisplay = document.querySelector(".player-two-display");

// Sets random player for start of game and changes colors and text of displays
const randomPlayer = function () {
  //If its less than 0.5, player one's turn, change display one style and text
  if (Math.random() < 0.5) {
    playerOneTurn = true;
    playerOneDisplay.style.background = "#9ddfd3";
    playerOneDisplay.querySelector("h1").textContent = "Player One's Turn!";
  } else {
    //If its greater than 0.5, player two's turn, change display two style and text
    playerTwoTurn = true;
    playerTwoDisplay.style.background = "#ea2c62";
    playerTwoDisplay.querySelector("h1").textContent = "Player Two's Turn!";
  }
};

let loop = [
  pocketSix,
  pocketFive,
  pocketFour,
  pocketThree,
  pocketTwo,
  pocketOne,
  mancalaOne,
  pocketSeven,
  pocketEight,
  pocketNine,
  pocketTen,
  pocketEleven,
  pocketTwelve,
  mancalaTwo,
];

const movement = function (evt) {
  let start = evt.target;
  let counter = 0;
  for (i of start.childNodes) {
    if (i.nodeName === "DIV") {
      counter += 1;
      i.remove();
    }
    console.log(counter);
  }

  let increase = 1;

  while (counter > 0) {
    let newPiece = document.createElement("div");
    newPiece.classList.add("piece");
    let nextPocket = loop.indexOf(start) + increase;
    loop[nextPocket].appendChild(newPiece);
    counter -= 1;
    if (nextPocket == 13) {
      increase = 0;
      start = pocketSix;
    } else {
      increase += 1;
    }
  }
  checkScore();
  piecesInPocket();
};
for (let i of pocketsOne) {
  i.addEventListener("click", movement);
}
for (let i of pocketsTwo) {
  i.addEventListener("click", movement);
}

randomPlayer();

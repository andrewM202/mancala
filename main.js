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
//Variales to check whose turn it is; if true its your turn
let playerOneTurn = false;
let playerTwoTurn = false;
//These are displays to see whose turn it is
let playerOneDisplay = document.querySelector(".player-one-display");
let playerTwoDisplay = document.querySelector(".player-two-display");
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
  let container = document.createElement("div");
  container.style.display = "flex";

  let winner = document.createElement("p");
  let winnerDiv = document.createElement("div");
  let playAgainYesDiv = document.createElement("div");
  let playAgainNoDiv = document.createElement("div");
  let playAgainYes = document.createElement("p");
  let playAgainNo = document.createElement("p");

  playAgainYes.textContent = "Yes!";
  playAgainNo.textContent = "No...";

  playAgainYesDiv.appendChild(playAgainYes);
  playAgainNoDiv.appendChild(playAgainNo);

  playAgainYesDiv.style.borderStyle = "solid";
  playAgainYesDiv.style.fontSize = "2.5em";
  playAgainYesDiv.style.padding = "15px";
  playAgainYesDiv.style.margin = "50px";

  playAgainNoDiv.style.borderStyle = "solid";
  playAgainNoDiv.style.fontSize = "2.5em";
  playAgainNoDiv.style.padding = "15px";
  playAgainNoDiv.style.margin = "50px";

  winnerDiv.appendChild(winner);
  winnerDiv.style.borderStyle = "solid";
  winner.style.fontSize = "2.5em";
  winner.style.padding = "15px";
  winnerDiv.style.margin = "50px";
  container.prepend(playAgainNoDiv);
  container.prepend(winnerDiv);
  container.prepend(playAgainYesDiv);
  body.prepend(container);
  if (countOne > countTwo) {
    body.style.backgroundColor = "#d2f5e3";
    winner.textContent = "Player 1 wins! Play Again?";
    winnerDiv.style.backgroundColor = "#9ddfd3";
    winnerDiv.style.borderColor = "#9ddfd3";

    playerOneDisplay.style.backgroundColor = "#e8e8e8";
    playerTwoDisplay.style.backgroundColor = "#e8e8e8";

    playAgainYesDiv.style.backgroundColor = "#9ddfd3";
    playAgainNoDiv.style.backgroundColor = "#9ddfd3";
  } else if (countOne < countTwo) {
    body.style.backgroundColor = "pink";
    winner.textContent = "Player 2 wins! Play Again?";
    winnerDiv.style.backgroundColor = "#ea2c62";
    winnerDiv.style.borderColor = "#ea2c62";

    playerOneDisplay.style.backgroundColor = "#e8e8e8";
    playerTwoDisplay.style.backgroundColor = "#e8e8e8";

    playAgainYesDiv.style.backgroundColor = "#ea2c62";
    playAgainNoDiv.style.backgroundColor = "#ea2c62";
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
    }
    displayOnePieces[currentPocket].querySelector("p").textContent =
      pieces + " Pieces";
    currentPocket++;
  }
  //Reset currentPocket to be used again to check pieces for second display
  currentPocket = 0;

  for (let pocket of pocketsTwo) {
    let pieces = 0;
    for (let piece of pocket.children) {
      pieces++;
    }
    displayTwoPieces[currentPocket].querySelector("p").textContent =
      pieces + " Pieces";
    currentPocket++;
  }
};

//Call function once for when window loads
piecesInPocket();

// Sets random player for start of game and changes colors and text of displays
const randomPlayer = function () {
  //If its less than 0.5, player one's turn, change display one style and text
  if (Math.random() < 0.5) {
    playerOneTurn = true;
    playerOneDisplay.style.background = "#9ddfd3";
    playerOneDisplay.querySelector("h1").textContent = "Player One's Turn!";
    //adds addEventListener to your side
    pocketsOne.forEach((element) =>
      element.addEventListener("click", movement)
    );
    for (pcket of pocketsOne) {
      for (pce of pcket.children) {
        pce.addEventListener("click", movement);
      }
    }
  } else {
    //If its greater than 0.5, player two's turn, change display two style and text
    playerTwoTurn = true;
    playerTwoDisplay.style.background = "#ea2c62";
    playerTwoDisplay.querySelector("h1").textContent = "Player Two's Turn!";
    pocketsTwo.forEach((element) =>
      element.addEventListener("click", movement)
    );
    for (pcket of pocketsTwo) {
      for (pce of pcket.children) {
        pce.addEventListener("click", movement);
      }
    }
  }
};

const movement = function (evt) {
  let loop = [];
  if (playerOneTurn === true) {
    //the loop doesn't include the opponents mancala
    loop = [
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
    ];
    for (let pcket of pocketsTwo) {
      pcket.removeEventListener("click", movement);
    }
  }
  if (playerTwoTurn === true) {
    loop = [
      pocketSix,
      pocketFive,
      pocketFour,
      pocketThree,
      pocketTwo,
      pocketOne,
      pocketSeven,
      pocketEight,
      pocketNine,
      pocketTen,
      pocketEleven,
      pocketTwelve,
      mancalaTwo,
    ];
    for (let pcket of pocketsOne) {
      pcket.removeEventListener("click", movement);
    }
  }
  let start = evt.target;
  //if the target is a piece, changes it to the parent pocket
  if (evt.target.classList.contains("piece") == true) {
    start = evt.target.parentNode;
  }

  let counter = 0;
  for (let i = 0; i < start.children.length; i++) {
    counter++;
  }
  for (let i = counter - 1; i > -1; i--) {
    start.children[i].remove();
  }
  //tracks what the final pocket is
  let finalPocket = null;
  let increase = 1;
  while (counter > 0) {
    let newPiece = document.createElement("div");
    newPiece.classList.add("piece");
    newPiece.addEventListener("click", movement);
    let nextPocket = loop.indexOf(start) + increase;
    loop[nextPocket].appendChild(newPiece);
    counter -= 1;
    if (nextPocket == 12) {
      increase = 0;
      start = pocketSix;
    } else {
      increase += 1;
    }
    //keeps track of what the pocket is outside of this scope
    finalPocket = nextPocket;
  }
  //checks if the final pocket was empty and not a mancala
  if (loop[finalPocket].children.length == 1) {
    if (loop[finalPocket] !== mancalaOne && loop[finalPocket] !== mancalaTwo) {
      //if you land in an empty pocket, change turns
      if (playerOneTurn === true) {
        playerOneTurn = false;
        playerTwoTurn = true;
        playerTwoDisplay.style.background = "#ea2c62";
        playerTwoDisplay.querySelector("h1").textContent = "Player Two's Turn!";
        playerOneDisplay.querySelector("h1").textContent = "Player One";
        playerOneDisplay.style.backgroundColor = "#e8e8e8";
        //remove listeners from your side and add them to opponenents
        pocketsOne.forEach((element) =>
          element.removeEventListener("click", movement)
        );
        pocketsTwo.forEach((element) =>
          element.addEventListener("click", movement)
        );
        //adds/removes listeners in the pieces
        for (pcket of pocketsOne) {
          for (pce of pcket.children) {
            pce.removeEventListener("click", movement);
          }
        }
        for (pcket of pocketsTwo) {
          for (pce of pcket.children) {
            pce.addEventListener("click", movement);
          }
        }
      } else {
        playerOneTurn = true;
        playerTwoTurn = false;
        playerOneDisplay.style.background = "#9ddfd3";
        playerOneDisplay.querySelector("h1").textContent = "Player One's Turn!";
        playerTwoDisplay.querySelector("h1").textContent = "Player Two";
        playerTwoDisplay.style.backgroundColor = "#e8e8e8";
        pocketsTwo.forEach((element) =>
          element.removeEventListener("click", movement)
        );
        pocketsOne.forEach((element) =>
          element.addEventListener("click", movement)
        );
        for (pcket of pocketsOne) {
          for (pce of pcket.children) {
            pce.addEventListener("click", movement);
          }
        }
        for (pcket of pocketsTwo) {
          for (pce of pcket.children) {
            pce.removeListener("click", movement);
          }
        }
      }
    }
    //removes listeners from pieces in mancalas
    for (pce of mancalaOne.children) {
      pce.removeEventListener("click", movement);
    }
    for (pce of mancalaTwo.children) {
      pce.removeEventListener("click", movement);
    }
  }
  checkScore();
  piecesInPocket();
  //if there's stones in the final pocket, it executes the function again
  if (
    loop[finalPocket].children.length > 0 &&
    loop[finalPocket] !== mancalaOne &&
    loop[finalPocket] !== mancalaTwo
  ) {
    loop[finalPocket].click();
  }
};

randomPlayer();

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
//to check if a winner is found to avoid duplicate win messages
let foundWinner = true;
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
  //Create container to hold the yes, no, and winner/play again divs
  let container = document.createElement("div");
  container.style.display = "flex";
  //div and p element to display who won the game
  let winner = document.createElement("p");
  let winnerDiv = document.createElement("div");
  //divs to hold p elements that hold text if someone wants to play again
  let playAgainYesDiv = document.createElement("div");
  let playAgainNoDiv = document.createElement("div");
  //p elements to hold text for whether someone wants to play again
  let playAgainYes = document.createElement("p");
  let playAgainNo = document.createElement("p");
  //playAgainYes for if someone does want to play again, playAgainNo for opposite
  playAgainYes.textContent = "Yes!";
  playAgainNo.textContent = "No...";
  playAgainYesDiv.addEventListener("click", remove);

  //Add the p elements to their container divs
  playAgainYesDiv.appendChild(playAgainYes);
  playAgainNoDiv.appendChild(playAgainNo);

  playAgainYesDiv.className = "playAgainDivs";
  playAgainNoDiv.className = "playAgainDivs";
  //Add cursor style only to playAgain Divs
  playAgainYesDiv.style.cursor = "pointer";
  playAgainNoDiv.style.cursor = "pointer";
  //Add the p element to display winner to its container div
  winnerDiv.appendChild(winner);
  winnerDiv.className = "playAgainDivs";

  //Add all the play again, winner display, and don't play again divs to its flex container
  container.prepend(playAgainNoDiv);
  container.prepend(winnerDiv);
  container.prepend(playAgainYesDiv);

  for (let pcket of pocketsOne) {
    pcket.removeEventListener("click", movement);
    for (let pce of pcket.childNodes) {
      if (pce.nodeName === "DIV") {
        pce.removeEventListener("click", movement);
      }
    }
  }
  for (let pcket of pocketsTwo) {
    pcket.removeEventListener("click", movement);
    for (let pce of pcket.childNodes) {
      if (pce.nodeName === "DIV") {
        pce.removeEventListener("click", movement);
      }
    }
  }
  container.className = "winnerContainerDiv";
  //foundWinner checks if a winner message has been added to body yet, if not, its true
  if (countOne > countTwo && foundWinner) {
    body.prepend(container);
    //change foundWinner to false, so another winner message cannot be added to body
    foundWinner = false;

    body.style.backgroundColor = "#d2f5e3";
    winner.textContent = "Player 1 wins! Play Again?";
    winnerDiv.style.backgroundColor = "#9ddfd3";
    winnerDiv.style.borderColor = "black";

    playerOneDisplay.style.backgroundColor = "#e8e8e8";
    playerTwoDisplay.style.backgroundColor = "#e8e8e8";

    playAgainYesDiv.style.backgroundColor = "#9ddfd3";
    playAgainNoDiv.style.backgroundColor = "#9ddfd3";
  } else if (countOne < countTwo && foundWinner) {
    body.prepend(container);
    //change foundWinner to false, so another winner message cannot be added to body
    foundWinner = false;

    body.style.backgroundColor = "pink";
    winner.textContent = "Player 2 wins! Play Again?";
    winnerDiv.style.backgroundColor = "#ea2c62";
    winnerDiv.style.borderColor = "black";

    playerOneDisplay.style.backgroundColor = "#e8e8e8";
    playerTwoDisplay.style.backgroundColor = "#e8e8e8";

    playAgainYesDiv.style.backgroundColor = "#ea2c62";
    playAgainNoDiv.style.backgroundColor = "#ea2c62";
  } else if (foundWinner) {
    body.prepend(container);
    //change foundWinner to false, so another winner message cannot be added to body
    foundWinner = false;
    playAgainNoDiv.style.backgroundColor = "gray";
    playAgainYesDiv.style.backgroundColor = "gray";
    winnerDiv.style.backgroundColor = "gray";

    winner.textContent = "Draw! Play Again?";
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
    playerTwoDisplay.querySelector("h1").textContent = "Player Two";
    //adds addEventListener to your side
    pocketsOne.forEach((element) =>
      element.addEventListener("click", movement)
    );
    for (pcket of pocketsOne) {
      for (pce of pcket.children) {
        pce.addEventListener("click", movement);
      }
      playerTwoDisplay.style.backgroundColor = "#e8e8e8";
    }
  } else {
    //If its greater than 0.5, player two's turn, change display two style and text
    playerTwoTurn = true;
    playerTwoDisplay.style.background = "#ea2c62";
    playerTwoDisplay.querySelector("h1").textContent = "Player Two's Turn!";
    playerOneDisplay.querySelector("h1").textContent = "Player One";
    pocketsTwo.forEach((element) =>
      element.addEventListener("click", movement)
    );
    for (pcket of pocketsTwo) {
      for (pce of pcket.children) {
        pce.addEventListener("click", movement);
      }
    }
    playerOneDisplay.style.backgroundColor = "#e8e8e8";
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
            pce.removeEventListener("click", movement);
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

  //if there's stones in the final pocket, it executes the function again
  if (
    loop[finalPocket].children.length > 1 &&
    loop[finalPocket] !== mancalaOne &&
    loop[finalPocket] !== mancalaTwo
  ) {
    loop[finalPocket].addEventListener("click", movement);
    loop[finalPocket].click();
  }
  checkScore();
  piecesInPocket();
};

const restart = function () {
  //replaces the 4 pieces in each pocket
  for (let pcket of pocketsOne) {
    //arbitrary array tp loop through
    let arr = [1, 2, 3, 4];
    for (let i of arr) {
      let newPiece = document.createElement("div");
      newPiece.classList.add("piece");
      pcket.appendChild(newPiece);
    }
  }
  for (let pcket of pocketsTwo) {
    let arr = [1, 2, 3, 4];
    for (let i of arr) {
      let newPiece = document.createElement("div");
      newPiece.classList.add("piece");
      pcket.appendChild(newPiece);
    }
  }
  //reset points to 0
  countOne = 0;
  countTwo = 0;
  scoreOne.textContent = countOne;
  scoreTwo.textContent = countTwo;
  //remove the winner div
  body.removeChild(body.children[0]);
  //restore background color
  body.style.backgroundColor = "white";
  //pick random player
  return randomPlayer();
};
//this function removes all pieces
const remove = function () {
  for (pcket of pocketsOne) {
    while (pcket.children.length > 0) {
      pcket.removeChild(pcket.lastChild);
    }
  }
  for (pcket of pocketsTwo) {
    while (pcket.children.length > 0) {
      pcket.removeChild(pcket.lastChild);
    }
  }
  while (mancalaOne.children.length > 0) {
    mancalaOne.removeChild(mancalaOne.lastChild);
  }
  while (mancalaTwo.children.length > 0) {
    mancalaTwo.removeChild(mancalaTwo.lastChild);
  }
  //restarts game
  return restart();
};

randomPlayer();

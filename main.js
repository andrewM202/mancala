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
//a button for testing things, temporary
let test = document.querySelector("#test");

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

test.addEventListener("click", checkScore);

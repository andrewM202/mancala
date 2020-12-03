let playerOneTurn = false;
let playerTwoTurn = false;

function randomPlayer() {
  if(Math.random() < 0.5) {
    playerOneTurn = true;
  } else {
    playerTwoTurn = true;
  }
}

window.onload = function() {
  randomPlayer();
  console.log(`Player One: ${playerOneTurn}`);
  console.log(`Player Two: ${playerTwoTurn}`);
}

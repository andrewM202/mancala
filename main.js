let playerOneTurn = false;
let playerTwoTurn = false;

// Sets random player for start of game and changes colors and text of displays
function randomPlayer() {
  let playerOneDisplay = document.querySelector('.player-one-display');
  let playerTwoDisplay = document.querySelector('.player-two-display');

  //If its less than 0.5, player one's turn, change display one style and text
  if(Math.random() < 0.5) {
    playerOneTurn = true;
    playerOneDisplay.style.background = '#adce74';
    playerOneDisplay.querySelector('h1').textContent = "Player One's Turn!"
  } else { //If its greater than 0.5, player two's turn, change display two style and text
    playerTwoTurn = true;
    playerTwoDisplay.style.background = '#adce74';
    playerTwoDisplay.querySelector('h1').textContent = "Player Two's Turn!"
  }
}

window.onload = function() {

  randomPlayer();
  console.log(`Player One: ${playerOneTurn}`);
  console.log(`Player Two: ${playerTwoTurn}`);
}

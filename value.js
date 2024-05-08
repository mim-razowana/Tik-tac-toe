let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function resetGame() {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}


function disableBoxes() {
  for (let box of boxes) {
    box.disabled = true;
  }
}

function enableBoxes() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}


boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    if (turnO) {
      box.innerText = 'O';
      turnO = false;
    } else {
      box.innerText = 'X';
      turnO = true;

    }
    box.disabled = true;
    count++;

    let iswinner = checkWinner();
    if (count === 9 && !iswinner) {
      gameDraw();
    }
  });



});

function gameDraw(){
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function showWinner(winner) {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide"); 
  disableBoxes();
}



function checkWinner(){
  for(let pattern of winPatterns){
    let pos1val= boxes[pattern[0]].innerText;
    let pos2val= boxes[pattern[1]].innerText;
    let pos3val=boxes[pattern[2]].innerText;

    if( pos1val!==""&&pos2val!=="" && pos3val!==""){
      if( pos1val===pos2val && pos2val===pos3val){
        showWinner();
        return true;
      }
    }
  }
}



newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

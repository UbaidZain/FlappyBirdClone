let bird = document.querySelector(".bird");
let background = document.querySelector(".background").getBoundingClientRect();

let message = document.querySelector(".message");
let scoreVal = document.querySelector(".score-value");
let scoreTitle = document.querySelector(".score-title");
let birdCords = bird.getBoundingClientRect();
let moveSpeed = 3;
let gravity = 0.5;
let birdTop = birdCords.top;
let bird_dy = 0;
let gameState = "start";
let isRunning = false;
let increaseSpeed = 0;
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let pipeSprite = Array.from(document.getElementsByClassName("pipe_sprite"));
    pipeSprite.forEach((sprite) => {
      sprite.remove();
    });
    if (gameState == "start" || gameState == "over") {
      gameState = "play";
      moveSpeed = 3;
      isRunning = true;
      message.innerHTML = "";
      scoreTitle.innerHTML = "Score :";
      scoreVal.innerHTML = "0";
      bird.style.top = "40vh";

      addGravity();
      addPipes();
      play();
    }
  }
});

function play() {
  if (gameState == "play") {
    let pipeSprite = Array.from(document.getElementsByClassName("pipe_sprite"));

    pipeSprite.forEach((element) => {
      let pipeSpriteCords = element.getBoundingClientRect();

      if (pipeSpriteCords.right <= 0) {
        element.remove();
      }
      if (
        birdCords.left < pipeSpriteCords.left + pipeSpriteCords.width &&
        birdCords.left + birdCords.width > pipeSpriteCords.left &&
        birdCords.top < pipeSpriteCords.top + pipeSpriteCords.height &&
        birdCords.top + birdCords.height > pipeSpriteCords.top
      ) {
        endGame();
      }
      if (
        birdCords.left > pipeSpriteCords.left &&
        birdCords.left < pipeSpriteCords.right + moveSpeed &&
        element.increase_score == 1
      ) {
        increaseSpeed++;
        element.increase_score = 0;
        scoreVal.innerHTML = parseInt(scoreVal.innerHTML) + 1;
      }
      element.style.left = pipeSpriteCords.left - moveSpeed + "px";
    });
    if (increaseSpeed == 5) {
      if (moveSpeed >= 5) {
        moveSpeed = 5;
      }
      moveSpeed += 0.2;
      increaseSpeed = 0;
      console.log(increaseSpeed);
    }
    requestAnimationFrame(play);
  }
}
function addGravity() {
  if (gameState === "play") {
    bird_dy += gravity;

    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUP" || e.key == " ") {
        bird_dy = -8;
      }
    });

    if (birdTop <= 0 || birdCords.bottom >= background.bottom) {
      endGame();
      return;
    }

    birdTop += bird_dy;
    bird.style.top = birdTop + "px";
    birdCords = bird.getBoundingClientRect();
    requestAnimationFrame(addGravity);
  } else {
    return;
  }
}
let pipeGap = 36;
let pipe_separation = 0;
function addPipes() {
  if (pipe_separation > 115) {
    pipe_separation = 0;
    let pipePosi = Math.floor(Math.random() * 43) + 5;
    let pipeSpriteInv = document.createElement("div");
    pipeSpriteInv.classList.add("pipe_sprite");
    pipeSpriteInv.style.top = pipePosi - 70 + "vh";
    pipeSpriteInv.style.left = "100vw";
    document.body.appendChild(pipeSpriteInv);

    let pipeSprite = document.createElement("div");
    pipeSprite.classList.add("pipe_sprite");
    pipeSprite.style.top = pipePosi + pipeGap + "vh";
    pipeSprite.style.left = "100vw";
    pipeSprite.increase_score = "1";
    document.body.appendChild(pipeSprite);
  }
  pipe_separation++;
  if (isRunning == true) {
    requestAnimationFrame(addPipes);
  }
}
function endGame() {
  gameState = "over";
  message.innerHTML = "Press enter to restart";
  moveSpeed = 3;
  isRunning = false;
}

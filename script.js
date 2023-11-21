let bird = document.querySelector(".bird");
let background = document.querySelector(".background").getBoundingClientRect();
console.log(background.bottom);

let birdCords = bird.getBoundingClientRect();
let moveSpeed = 3;
let gravity = 0.5;
let birdTop = birdCords.top;
let bird_dy = 0;
let gameState = "start";

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (gameState != "play") {
      bird.style.top = "40vh";
      gameState = "play";
      addGravity();
    }
  }
});

function addGravity() {
  if (gameState === "play") {
    bird_dy += gravity;

    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUP" || e.key == " ") {
        bird_dy = -8;
      }
    });
    if (birdTop <= 0 || birdCords.bottom >= background.bottom) {
      console.log(birdCords.bottom);
      gameState = "over";
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

function addPipes() {
  let pipePosi = Math.floor(Math.random() * 43);
  let pipeSpriteInv = document.createElement("div");
  pipeSpriteInv.classList.add("pipe_sprite");
  pipeSpriteInv.style.top = pipePosi - 70 + "vh";
  pipeSpriteInv.style.left = "90vw";
  document.body.appendChild(pipeSpriteInv);

  let pipeSprite = document.createElement("div");
  pipeSprite.classList.add("pipe_sprite");
  pipeSprite.style.top = pipePosi + pipeGap + "vh";
  pipeSprite.style.left = "90vw";
  document.body.appendChild(pipeSprite);
  requestAnimationFrame(addPipes);
}

requestAnimationFrame(addPipes);

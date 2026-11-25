const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.querySelector("#score");

const player = { x: 50, y: 50, size: 25, speed: 4 };
const star = { x: 300, y: 200, size: 12 };
const keys = {};
let score = 0;

window.addEventListener("keydown", event => {
  if (event.key.startsWith("Arrow")) event.preventDefault();
  keys[event.key] = true;
});

window.addEventListener("keyup", event => {
  keys[event.key] = false;
});

function placeStar() {
  star.x = Math.random() * (canvas.width - star.size * 2) + star.size;
  star.y = Math.random() * (canvas.height - star.size * 2) + star.size;
}

function update() {
  if (keys.ArrowUp) player.y -= player.speed;
  if (keys.ArrowDown) player.y += player.speed;
  if (keys.ArrowLeft) player.x -= player.speed;
  if (keys.ArrowRight) player.x += player.speed;

  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

  const touching =
    player.x < star.x + star.size &&
    player.x + player.size > star.x - star.size &&
    player.y < star.y + star.size &&
    player.y + player.size > star.y - star.size;

  if (touching) {
    score++;
    scoreDisplay.textContent = score;
    placeStar();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#55d6be";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  ctx.fill();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const radius = 7;
const amplitude = 300;
const frequency = 0.02;
const speed = 3;

let x = 0;

function draw() {
  ctx.clearRect(0, 0, width, height);

  const midY = height / 2;
  const upperY = midY - amplitude;
  const lowerY = midY + amplitude;

  // Draw dotted middle line
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(0, midY);
  ctx.lineTo(width, midY);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

    // Draw upper amplitude line
  ctx.beginPath();
  ctx.moveTo(0, upperY);
  ctx.lineTo(width, upperY);
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw lower amplitude line
  ctx.beginPath();
  ctx.moveTo(0, lowerY);
  ctx.lineTo(width, lowerY);
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Calculate ball position
  const y = midY + Math.sin(x * frequency) * amplitude; // IMP
  console.log(`Position of Y ${y}`);
  

  // Draw white filled ball
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Move and loop
  x += speed;
  if (x > width + radius) {
    x = -radius;
  }

  requestAnimationFrame(draw);
}

draw();

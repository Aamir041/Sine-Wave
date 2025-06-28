  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Get controls
  const amplitudeSlider = document.getElementById("amplitude");
  const frequencySlider = document.getElementById("frequency");
  const speedSlider = document.getElementById("speed");

  const ampValue = document.getElementById("ampValue");
  const freqValue = document.getElementById("freqValue");
  const speedValue = document.getElementById("speedValue");

  // Default values
  let width, height;
  let amplitude = +amplitudeSlider.value;
  let frequency = +frequencySlider.value / 1000;
  let speed = +speedSlider.value;

  let x = 0;
  const radius = 15;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const midY = height / 2;
    const upperY = midY - amplitude;
    const lowerY = midY + amplitude;

    // Draw middle dotted line
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw upper amplitude line
    ctx.beginPath();
    ctx.setLineDash([]);
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
    const y = midY + Math.sin(x * frequency) * amplitude;

    // Draw white filled ball
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    x += speed;
    if (x > width + radius) {
      x = -radius;
    }

    requestAnimationFrame(draw);
  }

  // Update values on slider input
  amplitudeSlider.addEventListener('input', () => {
    amplitude = +amplitudeSlider.value;
    ampValue.textContent = amplitude;
  });

  frequencySlider.addEventListener('input', () => {
    frequency = +frequencySlider.value / 1000;
    freqValue.textContent = frequency.toFixed(3);
  });

  speedSlider.addEventListener('input', () => {
    speed = +speedSlider.value;
    speedValue.textContent = speed;
  });

  draw();
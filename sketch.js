let img;
let circles = [];
let growthDuration = 0.5;
let totalTime;
const idleTime = 5;
const k = 2.0;
const minRadius = 1;
const maxDepth = 10;
const N_min = 3;
const N_max = 8;

function preload() {
  img = loadImage('reference_image.png');
}

function setup() {
  createCanvas(img.width, img.height);
  frameRate(60);
  img.loadPixels();
  generateCircles();
  console.log("Total circles:", circles.length);
  totalTime = (maxDepth + 1) * growthDuration;
}

function generateCircles() {
  circles = [];
  let initialCircle = { x: width / 2, y: height / 2, radius: min(width, height) / 2, depth: 0 };
  let queue = [initialCircle];

  while (queue.length > 0) {
    let circle = queue.shift();
    circles.push(circle);
    if (circle.radius > minRadius && circle.depth < maxDepth) {
      let intensity = getAverageIntensity(circle);
      let N = floor(map(intensity, 0, 1, N_max, N_min));
      N = constrain(N, N_min, N_max);
      for (let i = 0; i < N; i++) {
        let theta = TWO_PI * i / N + circle.depth * 0.1;
        let offset = circle.radius - circle.radius / k;
        let childX = circle.x + offset * cos(theta);
        let childY = circle.y + offset * sin(theta);
        let childRadius = circle.radius / k;
        queue.push({ x: childX, y: childY, radius: childRadius, depth: circle.depth + 1 });
      }
    }
  }
}

function getAverageIntensity(circle) {
  let sum = 0;
  let count = 0;
  let r = floor(circle.radius);
  let cx = floor(circle.x);
  let cy = floor(circle.y);
  for (let dy = -r; dy <= r; dy++) {
    let y = cy + dy;
    if (y < 0 || y >= height) continue;
    for (let dx = -r; dx <= r; dx++) {
      let x = cx + dx;
      if (x < 0 || x >= width) continue;
      if (dx * dx + dy * dy <= r * r) {
        let idx = (y * width + x) * 4;
        sum += img.pixels[idx] / 255;
        count++;
      }
    }
  }
  return count > 0 ? sum / count : 0;
}

function draw() {
  background(255);
  noStroke();

  let currentTime = frameCount / frameRate();
  let zoom = map(currentTime, 0, totalTime + idleTime, 1, 1.5);
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-width / 2, -height / 2);

  for (let circle of circles) {
    let birthTime = circle.depth * growthDuration;
    if (currentTime >= birthTime) {
      let age = currentTime - birthTime;
      let progress = min(1, age / growthDuration);
      let currentRadius = circle.radius * progress;
      if (currentRadius > 0) {
        let hue = map(circle.depth, 0, maxDepth, 0, 360);
        colorMode(HSB);
        fill(hue, 80, 100, 0.05);
        ellipse(circle.x, circle.y, 2 * currentRadius, 2 * currentRadius);
        colorMode(RGB);
      }
    }
  }

  if (currentTime > totalTime + idleTime) {
    noLoop();
  }
}
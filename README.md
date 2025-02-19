# Fractal Image Animation with p5.js

This project generates a smooth, high-resolution fractal animation in p5.js that transforms a grayscale image into a dynamic, Mandelbrot-inspired pattern. Starting from a single circle, the animation "unravels" into a complex arrangement of smaller circles, where their density approximates the grayscale intensity of the input image. The result is a visually striking animation blending mathematical fractals with creative coding.

## Features

- **Smooth Animation**: Runs at 60 FPS with gradual circle growth for a fluid effect.
- **High Resolution**: Deep recursion (up to 10 levels) and small minimum radius (1 pixel) for detailed patterns.
- **Customizable**: Adjustable parameters for speed, color, density, and fractal structure.
- **Image-Based**: Uses grayscale intensity to guide circle placement, mimicking the input image.
- **Browser-Based**: Built with p5.js, runs directly in the browser via HTML5 canvas.

## Demo

tbd

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox).
- A local server (e.g., Python’s `http-server`) to serve the files.
- A grayscale image file (e.g., `reference_image.png`).

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/manueltarouca/unravel-animation.git
   cd unravel-animation
   ```

2. **Project Structure**:

   ```
   unravel-animation/
   ├── index.html        # Main HTML file
   ├── sketch.js         # p5.js animation logic
   ├── reference_image.png  # Default grayscale image (replace with your own)
   └── README.md         # This file
   ```

3. **Add Your Image**:
   - Place a grayscale image named `reference_image.png` in the project directory, or update the `loadImage()` path in `sketch.js` to your image’s location.

## Usage

1. **Run a Local Server**:
   Serve the project directory using a local server:

   ```bash
   python -m http.server 8000
   ```

   Alternatively, use Node.js (`npx http-server`) or any other local server tool.

2. **Open in Browser**:
   Navigate to `http://localhost:8000` in your browser. The animation will start automatically.

3. **View the Animation**:
   - The animation begins with a single circle, unravels over ~3.3 seconds into a fractal pattern, and idles for 5 seconds before stopping.
   - Open the browser console (F12 > Console) to see debug info like circle count.

## Customization

Modify `sketch.js` to tweak the animation:

- **Speed**: Adjust `growthDuration` (e.g., `0.5` for slower growth) or add a `speedMultiplier`.

  ```javascript
  let growthDuration = 0.5; // Time per level in seconds
  let speedMultiplier = 0.5; // Slows animation by half
  let currentTime = (frameCount / frameRate()) * speedMultiplier;
  ```

- **Colors**: Change `fill()` to use dynamic colors (e.g., by depth).

  ```javascript
  let hue = map(circle.depth, 0, maxDepth, 0, 360);
  colorMode(HSB);
  fill(hue, 80, 100, 0.05); // Depth-based coloring
  ```

- **Density**: Alter `N_min` and `N_max` for more/fewer circles.

  ```javascript
  const N_min = 4; // Minimum child circles
  const N_max = 10; // Maximum child circles
  ```

- **Fractal Shape**: Modify circle positioning or add rotation.

  ```javascript
  let theta = (TWO_PI * i) / N + circle.depth * 0.1; // Rotate by depth
  let offset = circle.radius * 0.7; // Tighter clustering
  ```

- **Zoom**: Add a zoom effect over time.
  ```javascript
  let zoom = map(currentTime, 0, totalTime + idleTime, 1, 1.5);
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-width / 2, -height / 2);
  ```

See the `sketch.js` comments or the [Customization Section](#customization-options) below for more details.

## Code Overview

- **`index.html`**: Loads p5.js from CDN and links to `sketch.js`.
- **`sketch.js`**:
  - **Preload**: Loads the grayscale image.
  - **Setup**: Initializes the canvas and generates circles.
  - **GenerateCircles**: Recursively creates circles based on image intensity.
  - **Draw**: Animates circle growth at 60 FPS.

## Example Output

- **Initial State**: Single circle at center.
- **Mid-Animation**: Fractal subsets emerge, growing smoothly.
- **Final State**: Dense pattern resembling the input image, held for 5 seconds.

## Troubleshooting

- **Blank Screen**: Ensure `reference_image.png` exists and is grayscale. Check console for errors.
- **Low Detail**: Increase `maxDepth` or decrease `minRadius`, but monitor performance.
- **Lag**: Reduce `maxDepth` (e.g., to 8) or increase `minRadius` (e.g., to 2).

## Customization Options

For advanced tweaks, edit `sketch.js`:

- **Background Overlay**: Show the reference image faintly:
  ```javascript
  image(img, 0, 0, width, height);
  tint(255, 20); // Faint overlay
  ```
- **Video Export**: Add `CCapture.js` to save the animation (see [Video Export](#video-export)).

## Video Export

To save the animation as a video:

1. Add `CCapture.js` to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/ccapture.js@1.1.0/build/CCapture.all.min.js"></script>
   ```
2. Modify `sketch.js`:
   ```javascript
   let capturer = new CCapture({ format: 'webm', framerate: 60 });
   function setup() {
     /* ... */ capturer.start();
   }
   function draw() {
     /* ... */ capturer.capture(canvas);
     if (done) capturer.stop();
     capturer.save();
   }
   ```

## Contributing

Feel free to fork this repo, experiment with parameters, or add features (e.g., interactive controls, different fractal algorithms). Submit a pull request with your changes!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [p5.js](https://p5js.org/).
- Inspired by fractal visualizations and the Mandelbrot set.

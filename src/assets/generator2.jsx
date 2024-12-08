const generator2 = (p5) => {
  // Variables
  let seed = Math.random() * 100;
  let radius;
  let gradientColors = [];
  let colors = [
    "#3d3d88",
    "#a1141e",
    "#00c8fd",
    "#00aca6",
    "#7969e0",
    "#6483a9",
    "#a1141e",
    "#c15774",
    "#527f63",
    "#2fb1c1",
    "#899de4",
  ];

  let scaleFactor = p5.random(1.0, 1.5);
  let scaleDirection = -1; // 1 for growing, -1 for shrinking
  let colorTransitionProgress = 0;
  let targetColors = [];
  let baseX; // Base horizontal position
  let horizontalOffset = p5.random(-p5.windowWidth / 4, p5.windowWidth / 4); // Maximum offset for horizontal movement
  let movementSpeed = p5.random(1, 3); // Speed of horizontal movement
  let xMovement = p5.random(-p5.windowWidth / 4, p5.windowWidth / 4); // Current horizontal offset
  let distortX = p5.random(1, 2); // Horizontal distortion factor
  let distortY = p5.random(1, 3); // Vertical distortion factor

  const selectRandomColors = () => {
    while (gradientColors.length < 3) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      if (!gradientColors.includes(randomColor)) {
        gradientColors.push(randomColor); // Add only unique colors
      }
    }
  };

  const updateTargetColors = () => {
    targetColors = [];
    while (targetColors.length < 3) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      if (!targetColors.includes(randomColor)) {
        targetColors.push(randomColor); // Add only unique colors
      }
    }
  };

  // Calculate the minimum radius to cover the screen
  const calculateMinRadius = () => {
    return Math.sqrt(p5.width ** 2 + p5.height ** 2); // Diagonal length
  };

  // Setup function
  p5.setup = () => {
    p5.randomSeed(seed);
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    radius = calculateMinRadius();
    baseX = p5.width / 2;

    // Initialize gradient colors
    selectRandomColors();
    updateTargetColors();
  };

  // Draw function
  p5.draw = () => {
    p5.background(0); // Black background

    // Update gradient colors gradually
    colorTransitionProgress += 0.01;
    if (colorTransitionProgress >= 1) {
      gradientColors = [...targetColors];
      updateTargetColors();
      colorTransitionProgress = 0;
    }

    const transitioningColors = gradientColors.map((currentColor, index) =>
      p5.lerpColor(p5.color(currentColor), p5.color(targetColors[index]), colorTransitionProgress)
    );

    // Update scale factor for growing/shrinking effect
    scaleFactor += scaleDirection * 0.005; // Adjust speed of size change
    if (scaleFactor > 1.5 || scaleFactor < 1.0) {
      scaleDirection *= -1; // Reverse direction when limits are reached
    }

    // Update horizontal position
    xMovement += movementSpeed;
    if (xMovement > horizontalOffset || xMovement < -horizontalOffset) {
      movementSpeed *= -1; // Reverse direction
    }

    const currentX = baseX + xMovement; // Calculate current horizontal position
    const adjustedRadius = radius * scaleFactor; // Adjust circle size dynamically

    // Draw distorted gradient circle
    drawDistortedCircle(currentX, p5.height / 2, adjustedRadius, transitioningColors);
  };

  // Function to draw distorted circle (ellipse)
  const drawDistortedCircle = (x, y, r, colors) => {
    const steps = 200; // Number of gradient steps
    for (let i = 0; i < steps; i++) {
      const inter = i / steps;
      let color;

      if (inter < 0.5) {
        const interSegment = inter / 0.5;
        color = p5.lerpColor(colors[0], colors[1], interSegment);
      } else {
        const interSegment = (inter - 0.5) / 0.5;
        color = p5.lerpColor(colors[1], colors[2], interSegment);
      }

      // Apply distortion by scaling the radius in x and y independently
      const currentRadiusX = r * distortX * (1 - inter);
      const currentRadiusY = r * distortY * (1 - inter);

      p5.fill(color);
      p5.noStroke();
      p5.ellipse(x, y, currentRadiusX, currentRadiusY); // Draw distorted ellipse
    }
  };

  // Handle window resizing
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    radius = calculateMinRadius(); // Recalculate radius for new screen size
    baseX = p5.width / 2; // Re-center on resize
  };
};

export default generator2;

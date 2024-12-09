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

  let scaleFactor = p5.random(0.75, 2);
  let scaleDirection = -1;
  let colorTransitionProgress = 0;
  let targetColors = [];
  let baseX, baseY;
  let horizontalOffset = p5.random(-p5.windowWidth / 4, p5.windowWidth / 4);
  let movementSpeed = p5.random(0.75, 1.5);
  let xMovement = p5.random(-p5.windowWidth / 4, p5.windowWidth / 4);
  let yMovement = p5.random(-p5.windowHeight / 5, p5.windowHeight / 5);
  let verticalSpeed = p5.random(0.1, 0.75);
  let distortX = p5.random(1, 2);
  let distortY = p5.random(1, 3);

  const selectRandomColors = () => {
    while (gradientColors.length < 3) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      if (!gradientColors.includes(randomColor)) {
        gradientColors.push(randomColor);
      }
    }
  };

  const updateTargetColors = () => {
    targetColors = [];
    while (targetColors.length < 3) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      if (!targetColors.includes(randomColor)) {
        targetColors.push(randomColor);
      }
    }
  };

  const calculateMinRadius = () => {
    return Math.sqrt(p5.width ** 2 + p5.height ** 2);
  };

  p5.setup = () => {
    p5.randomSeed(seed);
    // p5.noCanvas();

    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    radius = calculateMinRadius();
    baseX = p5.width / 2;
    baseY = p5.height / 2;

    canvas.id("blurredCanvas");
    const initialBackground = p5.random(colors);
    p5.background(initialBackground);

    // Initialize gradient colors
    selectRandomColors();
    updateTargetColors();

    // If on mobile, reduce the frame rate for performance
    if (p5.windowWidth < 800) {
      p5.frameRate(25); // Lower frame rate on mobile devices
    }
  };

  p5.draw = () => {
    // p5.background(p5.random(colors));

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
    scaleFactor += scaleDirection * p5.random(0.005, 0.009);
    if (scaleFactor > 1.5 || scaleFactor < 1.0) {
      scaleDirection *= -1;
    }

    // Update horizontal position
    xMovement += movementSpeed;
    if (xMovement > horizontalOffset || xMovement < -horizontalOffset) {
      movementSpeed *= -1;
    }

    // Update vertical position
    yMovement += verticalSpeed;
    if (yMovement > p5.windowHeight / 4 || yMovement < -p5.windowHeight / 4) {
      verticalSpeed *= -1;
    }

    const currentX = baseX + xMovement;
    const currentY = baseY + yMovement;
    const adjustedRadius = radius * scaleFactor;

    // Draw distorted gradient circle
    drawDistortedCircle(currentX, currentY, adjustedRadius, transitioningColors);
  };

  const drawDistortedCircle = (x, y, r, colors) => {
    const steps = p5.width > 700 ? 200 : 15; // Reduced number of gradient steps for better performance

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

      const currentRadiusX = r * distortX * (1 - inter);
      const currentRadiusY = r * distortY * (1 - inter);

      p5.fill(color);
      p5.noStroke();
      p5.ellipse(x, y, currentRadiusX, currentRadiusY);
    }
  };

  p5.windowResized = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    radius = calculateMinRadius();
    baseX = p5.width / 2;
    baseY = p5.height / 2;

    const resizedBackground = p5.random(colors);
    p5.background(resizedBackground);
  };
};

export default generator2;

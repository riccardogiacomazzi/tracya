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

  while (gradientColors.length < 3) {
    let randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    if (!gradientColors.includes(randomColor)) {
      gradientColors.push(randomColor); // Add only unique colors
    }
  }

  // Setup function
  p5.setup = () => {
    p5.randomSeed(seed);
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // const canvas = p5.createCanvas(400, 700);

    canvas.id("blurredCanvas");
    p5.noLoop(); // Only draw once since it's static
    radius = Math.min(p5.width, p5.height * 2);
  };

  // Draw function
  p5.draw = () => {
    p5.background(0); // Black background
    // Draw gradient circle
    let centerX = p5.width / 2;
    let maxOffset = p5.random(100, 200);
    drawGradientCircle(centerX - p5.random(-maxOffset, maxOffset), p5.height / 2 - Math.random() * 5, radius * 1.5);
  };

  // Function to draw gradient circle
  const drawGradientCircle = (x, y, r) => {
    const steps = 5; //
    for (let i = 0; i < steps; i++) {
      const inter = i / steps;
      let color;

      if (inter < 0.5) {
        const interSegment = inter / 0.5;
        color = p5.lerpColor(p5.color(gradientColors[0]), p5.color(gradientColors[1]), interSegment);
      } else {
        const interSegment = (inter - 0.5) / 0.5;
        color = p5.lerpColor(p5.color(gradientColors[1]), p5.color(gradientColors[2]), interSegment);
      }

      const currentRadius = r * (1 - inter);
      p5.fill(color);
      p5.noStroke();
      p5.ellipse(x, y, currentRadius * p5.random(1, 1.75), currentRadius * p5.random(1.95, 2));
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    radius = Math.min(p5.width, p5.height) * 0.5; // Recalculate radius
  };
};

export default generator2;

const sketch = (p5) => {
  let seed = Math.random() * 9999;
  let f = 0;
  let p = [];
  let colors1 = "a4c9cc-fafdff-5aa4ae-f9f8f6-663d74-544063".split("-").map((a) => "#" + a);
  let colors2 = "a8b092-bfc096-a8b78c-c7cd8c-819d8e-5d7259".split("-").map((a) => "#" + a);
  let colorsBg = "ffffff-000000".split("-").map((a) => "#" + a);
  const pNum = p5.random(500, 2000);

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.frameRate(30);
    const a = (p5.windowWidth, p5.windowHeight);
    p5.createCanvas(a, a);
    for (let i = 0; i < pNum; i++) {
      p[i] = p5.createVector(p5.random(a), p5.random(a), p5.random(p5.cos(a) - p5.sin(a)));
    }
    p5.background(p5.random(colorsBg));
  };

  p5.draw = () => {
    for (const q of p) {
      let b = p5.noise(q.x / 50, q.y / 50) * p5.TWO_PI;
      let c = p5.random(0, 10);

      // *** main point *** //
      b = (p5.TWO_PI / c) * Math.floor((b / p5.TWO_PI) * c);

      q.add(-p5.sin(b), p5.cos(b));
      p5.strokeWeight(p5.random(0, 0.2));
      if (seed) {
        if (b > p5.PI / 2) {
          p5.stroke(p5.random(colors1));
          p5.stroke(p5.random(colors2));
        } else {
          p5.stroke(p5.random(colors2));
          p5.stroke(p5.random(colors1));
        }
      }
      p5.point(q.x, q.y);
    }
    if (f < p5.random(99, 1000)) {
      f++;
    } else {
      p5.noLoop();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(p5.random(colorsBg));
  };
};

export default sketch;

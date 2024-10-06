export default function sketchArchive(p) {
  const random = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  let seed = random * 9821;
  let mySize;
  let circle_r;
  let space;
  let m;
  let xspacing;
  let w;
  let maxwaves;
  let theta;
  let amplitude = [];
  let dx = [];
  let yvalues = [];
  let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
  let colors1 = "fef9fb-fafdff-ffffff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
  let color_1, color_2, colorbg;

  p.setup = () => {
    random(seed);
    mySize = p.min(p.windowWidth, p.windowHeight);
    p.createCanvas(p.windowWidth, p.windowHeight);
    color_1 = colors1;
    color_2 = colors0;
    colorbg = p.random(color_1);
    p.background(colorbg);
    circle_r = (mySize / 3) * 2;
    w = p.width;

    m = 0;
    xspacing = random(1, 5);
    maxwaves = random(1, 10);
    theta = 0.0;

    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(100, 20);

      let period = random(50, 500);
      dx[i] = (p.TWO_PI / period) * xspacing;
    }

    yvalues = new Array(p.floor(w / xspacing));
  };

  p.draw = () => {
    random(seed);
    p.push();
    p.noStroke();
    let color_c = p.random(color_2);
    p.fill(color_c);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.random(0, p.TAU));

    p.drawingContext.shadowColor = p.color(color_c);
    p.drawingContext.shadowOffsetX = p.random(-5, 3);

    for (let i = 0; i < xspacing * 3; i += p.int(random(2, 3))) {
      p.push();
      p.translate(i, i * m + m);
      calcWave();
      renderWave();
      p.pop();
    }
    p.pop();
    m -= p.random(0.01, 0.2);
    if (m < -p.height / 8) {
      p.noLoop();
    }
  };

  function calcWave() {
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = 0;
    }

    for (let j = 0; j < maxwaves; j++) {
      let x = theta;
      for (let i = 0; i < yvalues.length; i++) {
        if (j % 2 === 0) yvalues[i] += p.sin(x) * amplitude[j];
        else yvalues[i] += p.cos(x) * amplitude[j];
        x += dx[j];
      }
    }
    theta += p.random(0.002, 0.001);
  }

  function renderWave() {
    p.stroke(colorbg);
    p.strokeWeight(random(10, 15));
    for (let x = 0; x < yvalues.length; x++) {
      p.point(-p.width + x * xspacing, p.height / 2 + yvalues[x]);
    }
  }
}

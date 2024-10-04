export default function sketchArchive(p) {
  let ranges;
  let seed = Math.random() * 1241;
  let mySize;
  let str_wei = 0;
  let x_space;

  // colors
  let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
  let colors1 = "fef9fb-fafdff-ffffff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
  let colors2 =
    "8c75ff-c553d2-2dfd60-2788f5-23054f-f21252-8834f1-c4dd92-184fd3-f9fee2-2E294E-541388-F1E9DA-FFD400-D90368-e9baaa-ffa07a-164555-ffe1d0-acd9e7-4596c7-6d8370-e45240-21d3a4-3303f9-cd2220-173df6-244ca8-a00360-b31016"
      .split("-")
      .map((a) => "#" + a);
  let color1, color2;
  let colorselet = [];
  let plus1, plus2, margin;
  let tile_count = 10;
  let h_size;
  let plus_wei;
  let plus_dis;

  p.setup = () => {
    p.randomSeed(seed);
    mySize = Math.min(p.windowWidth, p.windowHeight);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background("#202020");
    margin = mySize / 100;
    ranges = 1 * p.random([10, 5, 25, 40]);
    color1 = p.random(colors1);
    color2 = p.random(colors2);
    plus1 = 10;
    plus2 = 0.001;
    h_size = p.int(p.random(100, 50));
    x_space = p.int(p.random(10, 15));
    plus_dis = 0.01;
    plus_wei = plus_dis;
    p.background("#202020");
  };

  p.draw = () => {
    p.background("#2020201a");
    p.randomSeed(seed);
    p.noiseSeed(seed);

    // Randomly select colors
    colorselet[0] = p.random(colors2);
    colorselet[1] = p.random(colors2);
    colorselet[2] = p.random(colors2);
    colorselet[3] = p.random(colors2);
    colorselet[4] = p.random(colors2);
    colorselet[5] = p.random(colors2);

    // Draw the two pulse waves
    PulseWave1();

    PulseWave2();
  };

  function PulseWave1() {
    // p.noFill();
    let res = p.random(0.01, 0.005);

    for (let i = 0; i < ranges; i++) {
      p.strokeWeight(str_wei);
      p.strokeCap(p.SPHERE);
      p.stroke(p.random(colorselet));

      // Add shadow for wave effect
      if (ranges % 3 === 0) {
        p.drawingContext.shadowColor = p.random(colorselet);
        p.drawingContext.shadowOffsetX = 1;
        p.drawingContext.shadowOffsetY = 1;
      } else {
        p.drawingContext.shadowColor = p.random(colorselet);
        p.drawingContext.shadowOffsetX = -1;
        p.drawingContext.shadowOffsetY = -1;
      }

      let size_xx = p.int(p.random(1, 0.1));
      let size_yy = p.int(p.random(50, 100));

      p.beginShape();
      for (let x = -p.width * 0.5; x < p.width * 1.5; x += x_space) {
        let n = p.noise(x * 0.005, i * 0.01, p.frameCount * res);
        let y = p.map(n, 0, 1, -p.height * 0.5, p.height * 2);
        p.line(
          x + size_xx * p.sin(plus1),
          y + size_yy * p.cos(plus1),
          x + size_xx * p.sin(plus1),
          y - size_yy * p.cos(plus1)
        );
      }
      p.endShape();
    }

    // Update stroke weight
    if (plus_wei === plus_dis && str_wei < 1) {
      str_wei += plus_dis;
    }
    if (plus_wei === plus_dis && str_wei >= 1) {
      plus_wei = -plus_dis;
    }
    if (plus_wei === -plus_dis) {
      str_wei += -plus_dis;
    }
    if (plus_wei === -plus_dis && str_wei <= 0.1) {
      plus_wei = plus_dis;
    }

    plus1 += p.random(0.01, 0.01);
  }

  function PulseWave2() {
    p.noFill();
    let res = p.random(0.01, 0.005);

    for (let i = 0; i < ranges; i++) {
      p.strokeWeight(str_wei);
      p.strokeCap(p.SQUARE);
      p.stroke(p.random(colorselet));

      if (ranges % 3 === 0) {
        p.drawingContext.shadowColor = p.random(colors0);
        p.drawingContext.shadowOffsetX = 10;
        p.drawingContext.shadowOffsetY = 10;
      } else {
        p.drawingContext.shadowColor = p.random(colors1);
        p.drawingContext.shadowOffsetX = -1;
        p.drawingContext.shadowOffsetY = -1;
      }

      let size_xx = p.int(p.random(1, 0.1));

      let size_yy = p.int(p.random(100, 5));

      for (let x = -p.width * 0.1; x < p.width * 1.5; x += x_space) {
        let n = p.noise(x * 0.005, i * 0.01, p.frameCount * res);
        let y = p.map(n, 0, 1, p.height * 2, -p.height * 0.5);
        p.line(
          x - size_xx * p.cos(plus2),
          y - size_yy * p.sin(plus2),
          x - size_xx * p.cos(plus2),
          y + size_yy * p.sin(plus2)
        );
      }
    }

    // Update stroke weight
    if (plus_wei === plus_dis && str_wei < 1) {
      str_wei += plus_dis;
    }
    if (plus_wei === plus_dis && str_wei >= 1) {
      plus_wei = -plus_dis;
    }
    if (plus_wei === -plus_dis) {
      str_wei += -plus_dis;
    }
    if (plus_wei === -plus_dis && str_wei <= 0.1) {
      plus_wei = plus_dis;
    }

    plus2 += p.random(0.01, 0.05);
  }
}

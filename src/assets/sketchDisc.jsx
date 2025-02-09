const sketchDisc = (p5) => {
  const random = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  // Variables
  let films;
  let seed = Math.random() * 100;
  let mySize;
  let str_wei = p5.random(0, 2);
  let colors_b = "000000-000000-000000-000000".split("-").map((a) => "#" + a);
  let colors_w = "ffffff-ffffff-ffffff".split("-").map((a) => "#" + a);
  let colorselet = [];
  let plus;
  let overAllTexture;

  // Setup function
  p5.setup = () => {
    p5.randomSeed(seed);
    mySize = seed * 0.2;
    p5.createCanvas(200, 4300);

    colorselet[0] = p5.random(colors_b);
    colorselet[1] = p5.random(colors_w);
    colorselet[2] = p5.random(colors_b);
    colorselet[3] = p5.random(colors_w);
    p5.background(p5.random(colorselet));
    films = random(1, 10);
    plus = 0;
  };

  // Draw function
  p5.draw = () => {
    p5.randomSeed(seed);
    p5.noFill();

    for (let i = 0; i < films; i++) {
      p5.strokeWeight(str_wei);
      p5.stroke(p5.random(colorselet));

      if (p5.windowWidth > 768) {
        if (films % 3 === 0) {
          p5.drawingContext.shadowColor = p5.color(p5.random(colors_b) + "1a");
          p5.drawingContext.shadowOffsetX = str_wei;
          p5.drawingContext.shadowOffsetY = str_wei;
          p5.drawingContext.shadowBlur = p5.random(0, 1);
        } else {
          p5.drawingContext.shadowColor = p5.color(p5.random(colors_w) + "1a");
          // p5.drawingContext.shadowOffsetX = str_wei;
          // p5.drawingContext.shadowOffsetY = str_wei;
        }
      } else {
        if (films % 3 === 0) {
          p5.drawingContext.shadowColor = p5.color(p5.random(colors_b) + "1a");
        } else {
          p5.drawingContext.shadowColor = p5.color(p5.random(colors_w) + "1a");
        }
      }

      let y = p5.random(p5.height * 0.1, p5.height * 0.9);
      p5.drawingContext.setLineDash([
        1,
        p5.int(p5.random(48, 24)),
        3,
        p5.int(p5.random(24, 48)),
        4,
        p5.int(p5.random(44, 22)),
        2,
      ]);

      p5.rect(
        p5.cos(1),
        p5.width * p5.random(0.15, 0.85) + (mySize / 2) * p5.sin(0.7 * p5.sin(0.5 * plus - 0.5) - 0.5),
        p5.random(100, 500),
        p5.random(1000, 40)
      );

      p5.rect(
        p5.cos(1),
        p5.width * p5.random(0.15, 0.85) + (4300 / 2) * p5.sin(0.7 * p5.sin(0.5 * plus - 0.5) - 0.5),
        p5.random(100, 500),
        p5.random(1000, 40)
      );

      p5.rect(
        p5.width * p5.random(0.85, 0.15) - (mySize / 2) * p5.sin(0.75 * p5.sin(0.7 * plus - 0.5) - 0.25),
        y - p5.random(10, 4),
        p5.random(0, 10),
        p5.random(mySize / 50, mySize / 20)
      );
    }

    if (str_wei < 0.5) {
      str_wei += 0.1;
    }

    if (plus * p5.random(200, 50) < seed / 20) {
      plus += 0.01;
      if (plus * p5.random(20, 50) < (p5.random(0.25, 0.5) * mySize) / 3) {
        if (overAllTexture) {
          p5.image(overAllTexture, 0, 0);
        }
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export default sketchDisc;

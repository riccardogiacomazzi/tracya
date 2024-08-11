import p5 from "p5";

const sketch = (p) => {
  let ito_num;
  let seed = Math.random() * 9999;
  let mySize, margin;

  // colors
  let colors0 = "281914-1a1a1a-202020-242e30".split("-").map((a) => "#" + a);
  let colors1 = "fef9fb-fafdff-ffffff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
  let colors2 = "eeeeee-aeaeae-909090-5c5c5c-383838".split("-").map((a) => "#" + a);
  let color1, color2;
  let plus;
  let overAllTexture;

  let isChanging = false;

  p.setup = () => {
    p.randomSeed(seed);
    mySize = 800;
    margin = 0;
    p.createCanvas(mySize, mySize);
    p.background(p.random(colors2));
    ito_num = p.int(p.random(20, 3));
    color1 = p.random(colors1);
    color2 = p.random(colors2);
    plus = p.random(0, 3);
    makeFilter();
  };

  p.draw = () => {
    let val = p.random(p.sin(p.random(0, 1)), 5);
    p.randomSeed(seed);

    let point_num = p.int(p.random(15, 5));

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.random(p.TAU));
    for (let i = 0; i < ito_num; i++) {
      p.push();
      p.translate(p.random(-mySize / 2, mySize / 2), p.random(-mySize / 2, mySize / 2));
      p.rotate(p.random(p.TAU) + plus / 100);
      p.rotate(p.random([0, p.PI / 2, p.PI, (p.PI / 2) * 3]));
      p.noFill();
      p.stroke(p.color(p.random(colors2) + "25"));
      p.strokeWeight(p.random(0.5, 0.1) + plus / 200);
      p.drawingContext.shadowColor = p.color(p.random(colors0) + "33");
      p.drawingContext.shadowOffsetX = p.random(1, 10);
      p.drawingContext.shadowOffsetY = 1;
      p.drawingContext.shadowBlur = p.random(0, 0.5);
      p.beginShape();
      for (let x = -p.width * 3; x < p.width * 3; x += p.width / point_num) {
        let n = p.noise(x * 0.1, i * 10, p.frameCount * 0.001);
        let y = p.map(n, 0, 1, -mySize * 0.35, mySize * 0.15);
        p.curveVertex(x + i * p.sin(p.random(0.1, 1) * plus + x * p.sin(p.random(1, 2) * plus - val) + 1.5), y - plus);

        // p.curveVertex(x + i * p.sin(p.random(0.1, 1) * plus + x * p.sin(p.random(1, 2) * plus - 12.5) + 1.5), y - plus);
      }
      p.endShape();
      p.pop();
    }

    p.pop();

    plus += p.random(2, 1) * p.random(0.01, 0.05);

    if (p.frameCount > p.random([1000])) {
      p.noLoop();
      p.blendMode(p.BLEND);
      p.image(overAllTexture, 0, 0);
      p.blendMode(p.BLEND);
      p.strokeWeight(p.random(0.1, 0.5) / 2);
      p.stroke(p.color(p.random(colors2) + "0d"));
      p.noFill();
      p.drawingContext.setLineDash([1, 4, 1, 3]);
      p.drawingContext.setLineDash([]);
      p.blendMode(p.BLEND);

      p.noFill();
      p.strokeWeight(margin);
      p.rectMode(p.CORNER);
      p.stroke("#202020");
      p.rect(0, 0, p.width, p.height);
    }
  };

  function makeFilter() {
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.drawingContext.shadowColor = p.color(0, 0, 5, 95);
    overAllTexture = p.createGraphics(p.windowWidth, p.windowHeight);
    overAllTexture.loadPixels();
    for (var i = 0; i < p.width; i++) {
      for (var j = 0; j < p.height; j++) {
        overAllTexture.set(i, j, p.color(0, 0, 99, (p.noise(i / 3, j / 3, (i * j) / 50) * p.random(5, 15)) / 2));
      }
    }
    overAllTexture.updatePixels();
  }
};

export default sketch;
